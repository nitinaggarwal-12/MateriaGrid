import { createClient } from '@/lib/supabase-client';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://materiagrid-demo.supabase.co';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ||
  'demo-service-role-key';
const supabase = createClient(supabaseUrl, supabaseKey);

export interface CRDTStateOperation {
  rubricId: string;
  doctorId: string;
  action: 'ADD' | 'REMOVE';
  timestamp: number; // Precise high-resolution epoch time
}

export interface SyncSessionMergeRequest {
  sessionId: string;
  clientOperationsLog: CRDTStateOperation[];
}

/**
 * CONCURRENT MULTI-DOCTOR CRDT MERGE MACHINE
 * Processes real-time asynchronous state mutations using Last-Write-Wins logic.
 */
export async function mergeConcurrentDoctorOperations(
  request: SyncSessionMergeRequest
) {
  try {
    console.log(
      `[CRDT MASTER] Resolving concurrent operations log for session: ${request.sessionId}`
    );

    // 1. FETCH HISTORICAL DELTA TRANSACTION BLOCK FROM STORAGE LAYER
    const { data: activeSession, error: fetchErr } = await supabase
      .from('consultation_sessions')
      .select('extracted_symptoms, committed_rubrics')
      .eq('session_id', request.sessionId)
      .single();

    if (fetchErr || !activeSession) {
      throw new Error(
        `Failed to recover baseline records for active session state node: ${fetchErr?.message}`
      );
    }

    // Pull or initialize the persistent CRDT operation log tracking ledger array
    const serverSymptomsJson = (activeSession.extracted_symptoms as any) || {};
    const serverCRDTLog: CRDTStateOperation[] = serverSymptomsJson.crdtLog || [];

    // 2. UNION INTERSECTION LOGS AND COMPUTE HIGHEST TIMESTAMP CONFLICT BREAKS
    const combinedOperationsLog = [
      ...serverCRDTLog,
      ...request.clientOperationsLog,
    ];

    // Track the definitive, highest-timestamp state mapping for each unique rubric ID
    const stateResolutionMap = new Map<
      string,
      { action: 'ADD' | 'REMOVE'; timestamp: number }
    >();

    combinedOperationsLog.forEach((op) => {
      const existing = stateResolutionMap.get(op.rubricId);
      if (!existing || op.timestamp > existing.timestamp) {
        stateResolutionMap.set(op.rubricId, {
          action: op.action,
          timestamp: op.timestamp,
        });
      }
    });

    // 3. COMPILE RESOLVED FINAL IMMUTABLE MATRICES
    const finalizedCommittedRubrics: string[] = [];
    stateResolutionMap.forEach((state, rubricId) => {
      if (state.action === 'ADD') {
        finalizedCommittedRubrics.push(rubricId);
      }
    });

    // Package back structural metadata for persistent JSON logging storage
    const updatedSymptomsPayload = {
      ...serverSymptomsJson,
      crdtLog: Array.from(stateResolutionMap.entries()).map(
        ([rubricId, state]) => ({
          rubricId,
          action: state.action,
          timestamp: state.timestamp,
          doctorId: 'SYSTEM_RESOLVED_NODE',
        })
      ),
    };

    // 4. WRITE ATOMICALLY BACK TO PRODUCTION DATABASE LAYERS
    const { error: updateErr } = await supabase
      .from('consultation_sessions')
      .update({
        extracted_symptoms: updatedSymptomsPayload,
        committed_rubrics: finalizedCommittedRubrics,
      })
      .eq('session_id', request.sessionId);

    if (updateErr) throw updateErr;

    return {
      status: 'CONCURRENCY_MERGE_SUCCESS',
      activeRubricCount: finalizedCommittedRubrics.length,
      resolvedStateTimeline: finalizedCommittedRubrics,
    };
  } catch (crdtError: any) {
    console.error(
      `[CRDT TRANSFERS FAULT] Concurrency sorting aborted: ${crdtError.message}`
    );
    return { status: 'CONFLICT_MERGE_ABORTED', error: crdtError.message };
  }
}

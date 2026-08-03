import {
  computeAsymmetricalRepertorization,
  RepertorizationRequest,
} from './repertorization';

export interface AgentRoutingPayload {
  sessionStateId: string;
  userContextInput: string;
  currentIcd11DiagnosticTags: string[];
  patientPhysicalBaselines: {
    thermal: 'Hot' | 'Chilly' | 'Ambithermal';
    thirst: 'Thirsty' | 'Thirstless';
    side: 'Left' | 'Right' | 'Alternating';
  };
}

/**
 * REPERTORY ORCHESTRATOR (ROOT NODE)
 * Dynamically coordinates execution tasks across sub-agents and logic engines.
 */
export async function executeOrchestratorPipeline(payload: AgentRoutingPayload) {
  try {
    console.log(
      `[ORCHESTRATOR] Initializing execution trace for session: ${payload.sessionStateId}`
    );

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // STEP 1: DELEGATE TO CLINICAL INTAKE AGENT (NATURAL LANGUAGE PARSING ROUTINE)
    // Streams transcript to internal route to extract Bönninghausen and Sehgal attributes
    const intakeResponse = await fetch(`${baseUrl}/api/intake`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript: payload.userContextInput }),
    });

    if (!intakeResponse.ok) {
      throw new Error(
        `[CRITICAL] clinical_intake_agent routing node execution timeout or failure.`
      );
    }

    const intakeResult = await intakeResponse.json();

    // STEP 2: VERIFY AND EXTRACT COMMITTED REPERTORY DATA INDICES
    const extractedRubricIds: string[] = (intakeResult.payload || [])
      .filter((symptom: any) => !symptom.hasHighAmbiguity)
      .flatMap((symptom: any) =>
        (symptom.candidateRubrics || []).map((r: any) => r.rubric_id)
      );

    if (extractedRubricIds.length === 0) {
      return {
        status: 'AWAITING_CLINICAL_DISAMBIGUATION',
        message:
          'AI detected overlapping symptom markers. Practitioner input required on interface panel.',
        ambiguousSymptoms: (intakeResult.payload || []).filter(
          (symptom: any) => symptom.hasHighAmbiguity
        ),
      };
    }

    // STEP 3: DELEGATE TO REPERTORIZATION ENGINE (MATHEMATICAL RECOMMENDATION LOGIC)
    const engineComputationRequest: RepertorizationRequest = {
      selectedRubricIds: extractedRubricIds,
      baselineProfile: payload.patientPhysicalBaselines,
      icd11Tags: payload.currentIcd11DiagnosticTags,
    };

    // Construct mock database context payload for engine calculation
    const coreRecommendationsMatrix = computeAsymmetricalRepertorization({
      request: engineComputationRequest,
      selectedRubricsData: [
        {
          rubricId: 'rub-1',
          chapter: 'MIND',
          fullStringPath: 'MIND - ANXIETY - night',
          embryologicalLayer: 'ECTODERM',
          remedyCount: 150,
          remedyGrades: { Acon: 4, Puls: 2, Sulph: 3 },
        },
        {
          rubricId: 'rub-2',
          chapter: 'ABDOMEN',
          fullStringPath: 'ABDOMEN - CIRRHOSIS - liver',
          embryologicalLayer: 'ENDODERM',
          remedyCount: 8,
          remedyGrades: { Chel: 4, 'Card-m': 4, Sulph: 2 },
        },
      ],
      remediesCatalog: {
        Chel: {
          remedyId: '1',
          remedyCode: 'Chel',
          fullName: 'Chelidonium majus',
          kingdom: 'Plant',
          family: 'Papaveraceae',
          thermalProfile: 'Hot',
          thirstProfile: 'Thirsty',
          lateralityPreference: 'Right',
          miasmaticClassification: ['Psoric'],
          organAffinities: ['LIVER'],
        },
        Sulph: {
          remedyId: '2',
          remedyCode: 'Sulph',
          fullName: 'Sulphur',
          kingdom: 'Mineral',
          family: 'S-Group',
          thermalProfile: 'Hot',
          thirstProfile: 'Thirsty',
          lateralityPreference: 'Left',
          miasmaticClassification: ['Psoric'],
          organAffinities: ['SKIN'],
        },
      },
      totalDatabaseRemediesCount: 2500,
    });

    // STEP 4: ASYNCHRONOUS COMPILATION TEST GUARDRAIL CHECK
    if (!coreRecommendationsMatrix || coreRecommendationsMatrix.length === 0) {
      throw new Error(
        '[FATAL] repertorization_engine calculated an empty dataset array payload.'
      );
    }

    return {
      status: 'EXECUTION_COMPLETE',
      extractedSymptomCount: extractedRubricIds.length,
      recommendations: coreRecommendationsMatrix,
    };
  } catch (pipelineException: any) {
    console.error(`[ORCHESTRATOR EXCEPTION LOOP] ${pipelineException.message}`);
    return {
      status: 'PIPELINE_ABORTED',
      error: pipelineException.message || 'Root runtime synchronization error.',
    };
  }
}

export const calculateAsymmetricalRepertorization =
  computeAsymmetricalRepertorization;

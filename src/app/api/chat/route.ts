import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { calculateAsymmetricalRepertorization } from '@/lib/engine/repertorization';
import { buildPrescriptionInsight } from '@/lib/engine/prescription_builder';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://materiagrid-demo.supabase.co';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ||
  'demo-service-role-key';
const supabase = createClient(supabaseUrl, supabaseKey);

export interface ChatbotSessionPayload {
  sessionStateId: string;
  chatHistory: { role: 'user' | 'assistant'; content: string }[];
  currentMessage: string;
  uploadedMediaUrls?: {
    type: 'IMAGE' | 'VIDEO' | 'PDF' | 'AUDIO';
    url: string;
  }[];
  patientBaselines: {
    thermal: 'Hot' | 'Chilly' | 'Ambithermal';
    thirst: 'Thirsty' | 'Thirstless';
    side: 'Left' | 'Right' | 'Alternating';
  };
}

export async function POST(request: Request) {
  try {
    const body: ChatbotSessionPayload = await request.json();

    if (!body.sessionStateId || !body.currentMessage) {
      return NextResponse.json(
        {
          error:
            'Missing session identifier tracking metadata or content strings.',
        },
        { status: 400 }
      );
    }

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // STEP 1: INITIALIZE MULTIMODAL MEDIA PROCESSING ENVELOPES IF ATTACHMENTS ARE PRESENT
    let aggregatedAttachmentObservations = '';
    if (body.uploadedMediaUrls && body.uploadedMediaUrls.length > 0) {
      for (const media of body.uploadedMediaUrls) {
        console.log(
          `[CHATBOT STREAM] Dispatched attachment directly to multimodal processing: ${media.type}`
        );
        try {
          const internalIngestResponse = await fetch(`${appUrl}/api/intake`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              transcript: `[MEDIA_ATTACHMENT_LINK: ${media.url} TYPE: ${media.type}] User message context: ${body.currentMessage}`,
            }),
          });

          if (internalIngestResponse.ok) {
            const ingestResult = await internalIngestResponse.json();
            const obs = (ingestResult.payload || [])
              .map((p: any) => p.visualObservation || p.rawTextSnippet || '')
              .filter(Boolean)
              .join(', ');
            aggregatedAttachmentObservations += `[Media Attachment Insight: ${obs}] `;
          }
        } catch (mediaErr) {
          console.warn('[MEDIA PROCESSING WARNING]', mediaErr);
        }
      }
    }

    // STEP 2: ORCHESTRATE AI REASONING SYSTEM FOR INTELLIGENT CASE-TAKING AND QUESTION GENERATION
    const chatbotSystemPrompt = `
      You are the master conversational clinical interface for the MATERIAGRID platform.
      Your task is to take a complete homeopathic case from a patient or practitioner.
      CRITICAL RULES:
      1. Be gentle, professional, and conversational. Do not ask a giant wall of questions. Ask ONE highly specific follow-up question at a time.
      2. If the user mentions a physical symptom, probe into the FOUR BÖNNINGHAUSEN COMPONENTS: Location, Sensation, Modality (what makes it better or worse), and Concomitants.
      3. If the user discusses mental stress, apply Dr. M.L. Sehgal's ROH Method: find the active, Present, Predominating, and Persisting behavioral markers.
      4. Always monitor for severe diagnostic terms.
    `;

    const contentsPayload = body.chatHistory.map((h) => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.content }],
    }));

    contentsPayload.push({
      role: 'user',
      parts: [
        {
          text: `${aggregatedAttachmentObservations}\nActive Message: ${body.currentMessage}`,
        },
      ],
    });

    const geminiApiKey = process.env.GEMINI_API_KEY;
    let assistantConversationalOutput = '';

    if (geminiApiKey) {
      const geminiChatResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${geminiApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: contentsPayload,
            systemInstruction: { parts: [{ text: chatbotSystemPrompt }] },
          }),
        }
      );

      if (!geminiChatResponse.ok) {
        throw new Error(
          `Gemini core conversational gateway error code: ${geminiChatResponse.statusText}`
        );
      }

      const chatResponseJson = await geminiChatResponse.json();
      assistantConversationalOutput =
        chatResponseJson.candidates[0].content.parts[0].text;
    } else {
      assistantConversationalOutput =
        `Thank you for sharing those symptoms. Under the Bönninghausen component analysis, I note your description. ` +
        `Could you tell me what environmental factors, temperatures, or physical movements make this discomfort significantly better or worse?`;
    }

    // STEP 3: SILENT BACKGROUND CALCULATION LOOP (PRE-RECOVERY OF TARGET REMEDIES)
    const rawConversationTrace =
      body.chatHistory.map((h) => `${h.role}: ${h.content}`).join('\n') +
      `\nuser: ${body.currentMessage}`;

    let suggestedPrescriptionBlock = null;

    try {
      const asyncExtractResponse = await fetch(`${appUrl}/api/intake`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: rawConversationTrace }),
      });

      if (asyncExtractResponse.ok) {
        const extractPayload = await asyncExtractResponse.json();
        const confirmedRubricIds: string[] = (extractPayload.payload || [])
          .filter((s: any) => !s.hasHighAmbiguity)
          .flatMap((s: any) =>
            (s.candidateRubrics || []).map((r: any) => r.rubric_id)
          );

        // Trigger our mathematical calculation engine if we have gathered a stable array of rubrics
        if (confirmedRubricIds.length >= 2) {
          const rankingRecommendations =
            await calculateAsymmetricalRepertorization({
              selectedRubricIds: confirmedRubricIds,
              baselineProfile: body.patientBaselines,
              icd11Tags: [],
            });

          if (rankingRecommendations && rankingRecommendations.length > 0) {
            const topRemedy = rankingRecommendations[0];

            // QUERY THE SYSTEM DATABASE TO RESOLVE CROSS-INDICATION FIELD PATHS FOR THE CHOSEN REMEDY
            let systematicAvenues: string[] = [];
            try {
              const { data: crossIndications } = await supabase
                .from('rubric_remedy_matrix')
                .select('rubrics(full_string_path)')
                .eq('remedy_id', topRemedy.remedyCode)
                .eq('remedy_grade', 4)
                .limit(4);

              systematicAvenues =
                crossIndications
                  ?.map((c: any) => c.rubrics?.full_string_path)
                  .filter(Boolean) || [];
            } catch (dbErr) {
              systematicAvenues = [
                `${topRemedy.remedyCode} — Keynote Mental & Physical Totality`,
                `${topRemedy.remedyCode} — Acute Modality Axis Matching`,
              ];
            }

            // STEP 4: GENERATE SUGGESTIONS, DURATION, AND COMPREHENSIVE MEDICAL FOOTPRINTS
            suggestedPrescriptionBlock = buildPrescriptionInsight(
              topRemedy,
              systematicAvenues
            );
          }
        }
      }
    } catch (calcErr) {
      console.warn('[BACKGROUND REPERTORIZATION LOOP NOTICE]', calcErr);
    }

    // STEP 5: RETURN SYNCHRONIZED MULTI-TRACK INTERACTION PAYLOAD
    return NextResponse.json(
      {
        status: 'CONVERSATION_ACTIVE',
        chatbotResponse: assistantConversationalOutput,
        repertorizationEngineInsight: suggestedPrescriptionBlock,
      },
      { status: 200 }
    );
  } catch (fatalException: any) {
    console.error(`[CHAT ROUTE EXCEPTION] ${fatalException.message}`);
    return NextResponse.json(
      {
        error:
          fatalException.message || 'Conversational pipeline loop interrupted.',
      },
      { status: 500 }
    );
  }
}

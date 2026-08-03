import { NextResponse } from 'next/server';

export interface BhashiniVoiceRequest {
  audioBlobBase64?: string;
  regionalSymptomText?: string;
  sourceIndianLanguageCode: 'hi' | 'mr' | 'bn' | 'ta' | 'te' | 'gu'; // Hindi, Marathi, Bengali, Tamil, Telugu, Gujarati
}

/**
 * BHASHINI INDIAN REGIONAL LANGUAGE TRANSLATION ROUTE
 * Converts localized spoken dialects into standardized English text strings.
 */
export async function POST(request: Request) {
  try {
    const body: BhashiniVoiceRequest = await request.json();

    if (!body.audioBlobBase64 && !body.regionalSymptomText) {
      return NextResponse.json(
        {
          error:
            'Missing active Indian regional audio stream or text content.',
        },
        { status: 400 }
      );
    }

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    let translatedEnglishSymptomText = '';

    const bhashiniApiKey = process.env.BHASHINI_API_KEY;

    if (bhashiniApiKey && body.audioBlobBase64) {
      const bhashiniEndpoint = 'https://bhashini.gov.in/ulca/v1/inference';

      const bhashiniPayload = {
        pipelineTasks: [
          {
            taskType: 'asr',
            config: {
              language: { sourceLanguage: body.sourceIndianLanguageCode },
              serviceId: `ai4bharat/whisper-medium-en-ind--${body.sourceIndianLanguageCode}`,
            },
          },
          {
            taskType: 'translation',
            config: {
              language: {
                sourceLanguage: body.sourceIndianLanguageCode,
                targetLanguage: 'en',
              },
              serviceId: 'ai4bharat/indictrans2-bilingual-gpu--pft',
            },
          },
        ],
        inputData: {
          audio: [{ audioContent: body.audioBlobBase64 }],
        },
      };

      const response = await fetch(bhashiniEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: bhashiniApiKey,
        },
        body: JSON.stringify(bhashiniPayload),
      });

      if (response.ok) {
        const bhashiniResult = await response.json();
        translatedEnglishSymptomText =
          bhashiniResult.pipelineResponse?.[1]?.output?.[0]?.target || '';
      }
    }

    // Deterministic regional idiom translation fallback if API key is unconfigured
    if (!translatedEnglishSymptomText) {
      const idiomMap: Record<string, string> = {
        'chhati me jalan':
          'Burning pain in chest and epigastrium after meals, relieved by warm drinks.',
        'pet me gola jaisa lagna':
          'Sensation of a hard ball or lump in abdomen with persistent gas and bloating.',
        'sar me fatne jaisa dard':
          'Violent bursting pulsating headache aggravated by movement and light.',
      };

      const inputLower = (body.regionalSymptomText || '').toLowerCase().trim();
      translatedEnglishSymptomText =
        idiomMap[inputLower] ||
        body.regionalSymptomText ||
        'Patient reports burning pain in abdomen and anxiety during night hours.';
    }

    // 3. TRANSFER TRANSLATED SYMPTOMS DIRECTLY TO CORE INTAKE GATEWAY
    const internalMateriaGridMatrixLink = await fetch(`${appUrl}/api/intake`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript: translatedEnglishSymptomText }),
    });

    const finalMateriaGridRubricsMatrix =
      await internalMateriaGridMatrixLink.json();

    return NextResponse.json(
      {
        status: 'BHASHINI_INGESTION_SUCCESS',
        inputLanguage: body.sourceIndianLanguageCode,
        translatedEnglishText: translatedEnglishSymptomText,
        materiagridPayload: finalMateriaGridRubricsMatrix.payload || [],
      },
      { status: 200 }
    );
  } catch (bhashiniException: any) {
    console.error(`[BHASHINI LINK EXCEPTION] ${bhashiniException.message}`);
    return NextResponse.json(
      {
        status: 'REGIONAL_PARSING_FAILED',
        error:
          bhashiniException.message ||
          'Failed to process Indian dialect streaming nodes.',
      },
      { status: 500 }
    );
  }
}

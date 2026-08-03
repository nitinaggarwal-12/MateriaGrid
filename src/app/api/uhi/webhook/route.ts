import { NextResponse } from 'next/server';

export interface UhiBookingWebhookPayload {
  transactionId: string;
  patientAbhaId: string;
  bookingTime: string;
  initialSymptomsTranscript: string;
  teleconsultationChannel: 'VIDEO' | 'AUDIO' | 'CHAT';
}

/**
 * UNIFIED HEALTH INTERFACE (UHI) TELE-CONSULTATION GATEWAY WEBHOOK
 * Routes incoming open UHI booking events directly into MateriaGrid's clinical chatbot state machine.
 */
export async function POST(request: Request) {
  try {
    const body: UhiBookingWebhookPayload = await request.json();

    if (!body.transactionId || !body.patientAbhaId) {
      return NextResponse.json(
        { error: 'Missing active UHI transaction identifier or ABHA ID.' },
        { status: 400 }
      );
    }

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    console.log(
      `[UHI GATEWAY] Accepted public tele-homeopathy booking: ${body.transactionId} for ABHA ${body.patientAbhaId}`
    );

    // Initialize an automated conversational intake session
    const chatInitResponse = await fetch(`${appUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionStateId: `uhi-${body.transactionId}`,
        chatHistory: [],
        currentMessage:
          body.initialSymptomsTranscript ||
          'Patient initiated tele-consultation via Unified Health Interface (UHI) network.',
        patientBaselines: {
          thermal: 'Ambithermal',
          thirst: 'Variable',
          side: 'Alternating',
        },
      }),
    });

    const chatbotResult = await chatInitResponse.json();

    return NextResponse.json(
      {
        status: 'UHI_BOOKING_ACCEPTED',
        uhiTransactionId: body.transactionId,
        materiagridSessionId: `uhi-${body.transactionId}`,
        initialAIResponse: chatbotResult.chatbotResponse,
      },
      { status: 200 }
    );
  } catch (uhiException: any) {
    console.error(`[UHI WEBHOOK EXCEPTION] ${uhiException.message}`);
    return NextResponse.json(
      {
        status: 'UHI_GATEWAY_ERROR',
        error: uhiException.message || 'Unified Health Interface link failed.',
      },
      { status: 500 }
    );
  }
}

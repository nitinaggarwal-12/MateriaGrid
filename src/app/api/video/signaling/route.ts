import { NextResponse } from 'next/server';

export interface WebRtcSignalingRequest {
  sessionId: string;
  action: 'CREATE_ROOM' | 'JOIN_ROOM' | 'TERMINATE_ROOM';
}

/**
 * WEBRTC SIGNALING BROKER ROUTE
 * Manages video consultation room tokens and signaling channels.
 */
export async function POST(request: Request) {
  try {
    const body: WebRtcSignalingRequest = await request.json();

    if (!body.sessionId) {
      return NextResponse.json(
        { error: 'Missing active consultation sessionId.' },
        { status: 400 }
      );
    }

    const roomToken = `webrtc-room-${body.sessionId}-${Date.now()}`;

    return NextResponse.json(
      {
        status: 'ROOM_SIGNALING_OK',
        sessionId: body.sessionId,
        webrtcRoomToken: roomToken,
        signalingServerUrl: 'wss://materiagrid-signaling.edge.workers.dev',
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed signaling setup.' },
      { status: 500 }
    );
  }
}

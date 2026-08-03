'use client';

import React, { useRef, useState } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Activity,
  Layers,
  PhoneCall,
  UserCheck,
  Globe,
} from 'lucide-react';

interface VideoConsultationHarnessProps {
  sessionId: string;
  onMediaChunkGenerated: (audioBlob: Blob, videoFrame: string) => void;
  isGaitAnalysisActive: boolean;
  theme?: 'dark' | 'light';
}

export const VideoConsultationHarness: React.FC<
  VideoConsultationHarnessProps
> = ({
  sessionId,
  onMediaChunkGenerated,
  isGaitAnalysisActive,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const [videoActive, setVideoActive] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const [callConnected, setCallConnected] = useState(false);

  const startHardwareStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      setCallConnected(true);
      setVideoActive(true);
      setAudioActive(true);
    } catch (err) {
      console.warn(
        '[TELEHEALTH NOTICE] Operating in simulated clinical consultation mode.'
      );
      setCallConnected(true);
      setVideoActive(true);
      setAudioActive(true);
    }
  };

  return (
    <div
      className={`w-full lg:w-[360px] lg:min-w-[360px] border-t lg:border-t-0 lg:border-l flex flex-col h-72 lg:h-full overflow-hidden select-none transition-colors ${
        isLight
          ? 'bg-white border-slate-200 text-slate-900'
          : 'bg-[#111317] border-[#1C1F26] text-[#E6E8EA]'
      }`}
    >
      {/* TELEHEALTH MONITOR PANEL */}
      <div
        className={`p-2 border-b flex items-center justify-between text-[11px] font-mono ${
          isLight
            ? 'bg-slate-50 border-slate-200'
            : 'bg-[#090A0C] border-[#1C1F26]'
        }`}
      >
        <div className="flex items-center space-x-1.5 text-emerald-600 font-bold">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span className="uppercase tracking-wider">
            LIVE TELE-MED STREAM
          </span>
        </div>
        {isGaitAnalysisActive && (
          <div className="flex items-center space-x-1 text-purple-600 bg-purple-50 border border-purple-200 px-1.5 py-0.5 rounded text-[10px]">
            <Layers className="w-3 h-3 animate-spin" />
            <span>GAIT RADAR ACTIVE</span>
          </div>
        )}
      </div>

      {/* VIDEO STREAMS VIEWPORT MATRIX */}
      <div
        className={`flex-1 p-2 flex flex-col space-y-2 relative ${
          isLight ? 'bg-slate-100' : 'bg-[#090A0C]'
        }`}
      >
        {/* MAIN REMOTE PATIENT INCOMING WINDOW */}
        <div
          className={`flex-1 rounded border relative overflow-hidden flex flex-col items-center justify-center ${
            isLight
              ? 'bg-slate-900 border-slate-700'
              : 'bg-[#111317] border-[#1C1F26]'
          }`}
        >
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />

          {!callConnected && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center space-y-3 bg-slate-950/60 backdrop-blur-xs">
              <span className="text-xs text-white font-mono font-bold tracking-wider">
                STANDBY — AWAITING PATIENT RTC CONNECTION
              </span>
              <button
                onClick={startHardwareStream}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded text-xs flex items-center space-x-2 shadow-lg transition-all cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Start WebRTC Video Call</span>
              </button>
            </div>
          )}

          <span className="absolute bottom-1.5 left-1.5 bg-black/60 px-1.5 py-0.5 rounded text-[10px] text-white font-mono">
            PATIENT_FEED_REMOTE
          </span>
        </div>

        {/* COMPACT FLOATING LOCAL DOCTOR VIEWPORT */}
        <div className="w-28 h-20 sm:w-32 sm:h-24 rounded border border-slate-700 bg-slate-900 absolute bottom-14 right-4 z-20 overflow-hidden shadow-xl flex flex-col items-center justify-center">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          {!videoActive && (
            <div className="flex flex-col items-center justify-center text-slate-400">
              <UserCheck className="w-5 h-5 text-emerald-500 mb-0.5" />
              <span className="text-[9px] font-mono text-slate-300">MD STANDBY</span>
            </div>
          )}
          <span className="absolute bottom-0.5 left-0.5 bg-black/70 px-1 py-0.2 rounded text-[8px] text-white font-mono">
            MD_FEED_LOCAL
          </span>
        </div>

        {/* BHASHINI SPEECH-TO-TEXT LIVE REGIONAL CAPTION TICKER */}
        <div className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs font-mono text-white flex items-center space-x-2">
          <Globe className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 animate-pulse" />
          <div className="truncate text-[10px]">
            <span className="text-emerald-400 font-bold">BHASHINI AI (HI-EN):</span>{' '}
            &ldquo;Doctor, sunlight exposure causes sudden throbbing head pain...&rdquo;
          </div>
        </div>
      </div>

      {/* STREAM CONTROL DASHBOARD INTERFACE CONTAINER */}
      <div
        className={`p-2.5 border-t flex items-center justify-center space-x-4 ${
          isLight
            ? 'bg-white border-slate-200'
            : 'bg-[#111317] border-[#1C1F26]'
        }`}
      >
        <button
          onClick={() => {
            if (!callConnected) {
              startHardwareStream();
            } else {
              const nextAudio = !audioActive;
              setAudioActive(nextAudio);
              if (localVideoRef.current && localVideoRef.current.srcObject) {
                const stream = localVideoRef.current.srcObject as MediaStream;
                stream.getAudioTracks().forEach((t) => (t.enabled = nextAudio));
              }
            }
          }}
          title={audioActive ? 'Mute Microphone' : 'Turn On Microphone'}
          className={`p-2.5 rounded-full transition-all border cursor-pointer ${
            audioActive
              ? isLight
                ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                : 'bg-[#1C1F26] border-[#2A2E38] text-gray-300 hover:bg-[#2A2E38]'
              : 'bg-rose-600 border-rose-500 text-white'
          }`}
        >
          {audioActive ? (
            <Mic className="w-4 h-4" />
          ) : (
            <MicOff className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={() => {
            if (!callConnected) {
              startHardwareStream();
            } else {
              const nextVideo = !videoActive;
              setVideoActive(nextVideo);
              if (localVideoRef.current && localVideoRef.current.srcObject) {
                const stream = localVideoRef.current.srcObject as MediaStream;
                stream.getVideoTracks().forEach((t) => (t.enabled = nextVideo));
              }
            }
          }}
          title={videoActive ? 'Turn Off Video' : 'Turn On Camera Video'}
          className={`p-2.5 rounded-full transition-all border cursor-pointer ${
            videoActive
              ? isLight
                ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                : 'bg-[#1C1F26] border-[#2A2E38] text-gray-300 hover:bg-[#2A2E38]'
              : 'bg-rose-600 border-rose-500 text-white'
          }`}
        >
          {videoActive ? (
            <Video className="w-4 h-4" />
          ) : (
            <VideoOff className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={() => {
            if (callConnected) {
              if (localVideoRef.current && localVideoRef.current.srcObject) {
                const stream = localVideoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach((t) => t.stop());
                localVideoRef.current.srcObject = null;
              }
              setCallConnected(false);
              setVideoActive(false);
              setAudioActive(false);
            } else {
              startHardwareStream();
            }
          }}
          className={`p-2.5 rounded-full border transition-all shadow-md cursor-pointer ${
            callConnected
              ? 'bg-rose-600 border-rose-500 hover:bg-rose-700 text-white'
              : 'bg-emerald-600 border-emerald-500 hover:bg-emerald-700 text-white'
          }`}
          title={
            callConnected
              ? 'Terminate Consultation Room'
              : 'Start Telehealth Consultation'
          }
        >
          <PhoneOff className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default VideoConsultationHarness;

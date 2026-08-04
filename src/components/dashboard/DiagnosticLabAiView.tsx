'use client';

import React, { useState } from 'react';
import {
  Camera,
  Activity,
  PlusCircle,
  CheckCircle2,
  Sparkles,
  Eye,
  FileSpreadsheet,
  Layers,
} from 'lucide-react';

interface DiagnosticLabAiViewProps {
  theme?: 'dark' | 'light';
  onCommitRubricToMatrix?: (rubricPath: string) => void;
}

export const DiagnosticLabAiView: React.FC<DiagnosticLabAiViewProps> = ({
  theme = 'dark',
  onCommitRubricToMatrix,
}) => {
  const isLight = theme === 'light';

  const lesionPatches = [
    {
      id: 'patch-1',
      title: 'Patch #01: Fiery Crimson Erythema & Dusky Edema',
      region: 'Right Anterior Facial Region',
      detectedColor: 'Fiery Red / Dusky Hyperemia',
      structure: 'Warm, swollen, shiny mucosal/epidermal border',
      matchedRubric: 'HEAD - PAIN - pulsating - sudden',
      secondaryRubric: 'GENERALITIES - HEAT - flushes of - sudden',
      confidence: '98.4%',
    },
    {
      id: 'patch-2',
      title: 'Patch #02: Bluish Vesicular Eruption with Intense Itching',
      region: 'Left Intercostal Dermatome',
      detectedColor: 'Dark Purplish / Bluish Vesicles',
      structure: 'Moist clustered fluid vesicles on inflamed base',
      matchedRubric: 'SKIN - ERUPTIONS - vesicular - bluish - itching',
      secondaryRubric: 'EXTREMITIES - PAIN - motion - beginning of - on',
      confidence: '96.2%',
    },
  ];

  const gaitAnalysisFrames = [
    {
      frameTime: '00:02s (Rising from Seated Position)',
      modalityDetected: 'Severe initial joint stiffness & limping when moving from rest',
      mappedRubric: 'EXTREMITIES - PAIN - motion - beginning of - on',
      indicatedRemedy: 'Rhus toxicodendron 30C (Grade 4)',
    },
    {
      frameTime: '00:08s (Continuous Walking Pace)',
      modalityDetected: 'Gradual easing of joint limping after continued motion',
      mappedRubric: 'EXTREMITIES - PAIN - motion - continued motion ameliorates',
      indicatedRemedy: 'Rhus toxicodendron (Confirmed)',
    },
  ];

  const [activePatchId, setActivePatchId] = useState<string>('patch-1');
  const [committedRubrics, setCommittedRubrics] = useState<
    Record<string, boolean>
  >({});

  const activePatch =
    lesionPatches.find((p) => p.id === activePatchId) || lesionPatches[0];

  const handleCommit = (rubricPath: string) => {
    setCommittedRubrics((prev) => ({ ...prev, [rubricPath]: true }));
    if (onCommitRubricToMatrix) {
      onCommitRubricToMatrix(rubricPath);
    }
  };

  return (
    <div
      className={`w-full h-full overflow-y-auto p-6 space-y-6 font-mono transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#05070A] text-white'
      }`}
    >
      {/* EXECUTIVE HEADER */}
      <div
        className={`p-5 rounded-2xl border shadow-xl flex flex-wrap items-center justify-between gap-4 ${
          isLight
            ? 'bg-white border-slate-200'
            : 'bg-[#0B0F19] border-[#1C1F26]'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black shadow-lg">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-black text-base uppercase tracking-wider text-cyan-400">
              MULTIMODAL VISION AI, SKIN LESION SPATIAL PARSER & GAIT MODALITY ENGINE
            </h2>
            <p className="text-xs text-gray-400">
              Gemini 2.5 Pro Multimodal Spatial Patch Vision & Time-Series Video Joint Kinematics
            </p>
          </div>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-cyan-950 border border-cyan-500/50 text-cyan-300 font-bold text-xs flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          SPATIAL PATCH PARSER ACTIVE
        </span>
      </div>

      {/* WORKBENCH GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: SKIN LESION VISION SPATIAL PATCH PARSER (7 COLUMNS) */}
        <div
          className={`lg:col-span-7 p-6 rounded-2xl border space-y-4 shadow-lg ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-[#0B0F19] border-[#1C1F26]'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-black text-sm uppercase text-cyan-400 flex items-center gap-2">
              <Eye className="w-4 h-4" /> SKIN / ERUPTION SPATIAL PATCH PARSER
            </span>
            <span className="text-xs text-gray-400">CLICK PATCH TO INSPECT</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lesionPatches.map((patch) => (
              <button
                key={patch.id}
                onClick={() => setActivePatchId(patch.id)}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  activePatch.id === patch.id
                    ? 'bg-cyan-950/40 border-cyan-500 text-white font-bold'
                    : 'bg-[#111317] border-slate-800 text-gray-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-black">
                  <span className="text-cyan-400">{patch.title}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px]">
                    {patch.confidence}
                  </span>
                </div>
                <p className="text-xs font-bold text-white mt-2">
                  Region: {patch.region}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Color: {patch.detectedColor}
                </p>
              </button>
            ))}
          </div>

          {/* ACTIVE PATCH DETAILS & ONE-CLICK RUBRIC INJECTION */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-black text-xs text-cyan-400">
                ACTIVE SPATIAL PARSE RESULT: {activePatch.title}
              </span>
            </div>
            <p className="text-xs text-gray-300">
              Structural Feature: <strong className="text-white">{activePatch.structure}</strong>
            </p>
            <div className="p-3 rounded-lg bg-emerald-950/50 border border-emerald-500/40 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[10px] text-emerald-400 font-bold">
                  DETECTED HISTORICAL REPERTORY PATH:
                </p>
                <p className="text-xs font-black text-white">
                  {activePatch.matchedRubric}
                </p>
              </div>

              <button
                onClick={() => handleCommit(activePatch.matchedRubric)}
                className={`px-4 py-2 rounded-lg font-black text-xs flex items-center space-x-1.5 transition-all cursor-pointer ${
                  committedRubrics[activePatch.matchedRubric]
                    ? 'bg-emerald-600 text-white'
                    : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                }`}
              >
                {committedRubrics[activePatch.matchedRubric] ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>COMMITTED TO MATRIX</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>+ Commit Rubric to Matrix</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: VIDEO GAIT TIMELINE & MODALITY PARSER (5 COLUMNS) */}
        <div
          className={`lg:col-span-5 p-6 rounded-2xl border space-y-4 shadow-lg ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-[#0B0F19] border-[#1C1F26]'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-black text-sm uppercase text-purple-400 flex items-center gap-2">
              <Activity className="w-4 h-4" /> VIDEO GAIT & MOTION KINEMATICS
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-purple-600 text-white">
              60 FPS PARSE
            </span>
          </div>

          <div className="space-y-3">
            {gaitAnalysisFrames.map((frame, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#111317] border border-slate-800 space-y-2"
              >
                <span className="text-xs font-black text-purple-300">
                  {frame.frameTime}
                </span>
                <p className="text-xs text-white leading-relaxed">
                  {frame.modalityDetected}
                </p>
                <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-500/40 text-xs flex items-center justify-between">
                  <span className="font-bold text-emerald-300">
                    {frame.mappedRubric}
                  </span>
                  <span className="text-[10px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded">
                    {frame.indicatedRemedy}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticLabAiView;

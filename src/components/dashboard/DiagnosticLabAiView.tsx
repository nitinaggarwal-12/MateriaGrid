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
      {/* HARMONIZED EXECUTIVE HEADER */}
      <div
        className={`p-5 rounded-2xl border shadow-sm flex flex-wrap items-center justify-between gap-4 transition-colors ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-[#0B0F19] border-[#1C1F26] text-white'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center text-white font-black shadow-md">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h2
              className={`font-black text-base uppercase tracking-wider ${
                isLight ? 'text-cyan-800' : 'text-cyan-400'
              }`}
            >
              MULTIMODAL VISION AI, SKIN LESION SPATIAL PARSER & GAIT MODALITY ENGINE
            </h2>
            <p
              className={`text-xs ${
                isLight ? 'text-slate-600' : 'text-gray-400'
              }`}
            >
              Gemini 2.5 Pro Multimodal Spatial Patch Vision & Time-Series Video Joint Kinematics
            </p>
          </div>
        </div>

        <span
          className={`px-3 py-1.5 rounded-xl border font-bold text-xs flex items-center gap-1.5 ${
            isLight
              ? 'bg-cyan-50 border-cyan-300 text-cyan-900'
              : 'bg-cyan-950 border-cyan-500/50 text-cyan-300'
          }`}
        >
          <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          SPATIAL PATCH PARSER ACTIVE
        </span>
      </div>

      {/* WORKBENCH GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: SKIN LESION VISION SPATIAL PATCH PARSER (7 COLUMNS) */}
        <div
          className={`lg:col-span-7 p-6 rounded-2xl border space-y-4 shadow-sm transition-colors ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900'
              : 'bg-[#0B0F19] border-[#1C1F26] text-white'
          }`}
        >
          <div
            className={`flex items-center justify-between border-b pb-3 ${
              isLight ? 'border-slate-200' : 'border-slate-800'
            }`}
          >
            <span
              className={`font-black text-sm uppercase flex items-center gap-2 ${
                isLight ? 'text-cyan-800' : 'text-cyan-400'
              }`}
            >
              <Eye className="w-4 h-4" /> SKIN / ERUPTION SPATIAL PATCH PARSER
            </span>
            <span
              className={`text-xs font-bold ${
                isLight ? 'text-slate-500' : 'text-gray-400'
              }`}
            >
              CLICK PATCH TO INSPECT
            </span>
          </div>

          {/* PATCH CARDS WITHOUT BLACK-BOX CLASH IN LIGHT MODE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lesionPatches.map((patch) => (
              <button
                key={patch.id}
                onClick={() => setActivePatchId(patch.id)}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  activePatch.id === patch.id
                    ? isLight
                      ? 'bg-cyan-50 border-cyan-500 text-cyan-950 font-bold shadow-xs'
                      : 'bg-cyan-950/40 border-cyan-500 text-white font-bold'
                    : isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                    : 'bg-[#111317] border-slate-800 text-gray-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-black">
                  <span
                    className={
                      isLight ? 'text-cyan-800' : 'text-cyan-400'
                    }
                  >
                    {patch.title}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-black">
                    {patch.confidence}
                  </span>
                </div>
                <p
                  className={`text-xs font-bold mt-2 ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  Region: {patch.region}
                </p>
                <p
                  className={`text-xs mt-1 ${
                    isLight ? 'text-slate-600' : 'text-gray-400'
                  }`}
                >
                  Color: {patch.detectedColor}
                </p>
              </button>
            ))}
          </div>

          {/* ACTIVE PATCH DETAILS CONTAINER WITHOUT CLASH */}
          <div
            className={`p-5 rounded-xl border space-y-3 ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-900'
                : 'bg-slate-900 border-slate-800 text-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`font-black text-xs ${
                  isLight ? 'text-cyan-800' : 'text-cyan-400'
                }`}
              >
                ACTIVE SPATIAL PARSE RESULT: {activePatch.title}
              </span>
            </div>
            <p className="text-xs">
              Structural Feature:{' '}
              <strong className={isLight ? 'text-slate-900' : 'text-white'}>
                {activePatch.structure}
              </strong>
            </p>

            <div
              className={`p-3.5 rounded-xl border flex flex-wrap items-center justify-between gap-3 ${
                isLight
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-emerald-950/50 border-emerald-500/40 text-white'
              }`}
            >
              <div>
                <p className="text-[10px] font-black text-emerald-700 dark:text-emerald-400">
                  DETECTED HISTORICAL REPERTORY PATH:
                </p>
                <p
                  className={`text-xs font-black ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {activePatch.matchedRubric}
                </p>
              </div>

              <button
                onClick={() => handleCommit(activePatch.matchedRubric)}
                className={`px-4 py-2 rounded-xl font-black text-xs flex items-center space-x-1.5 transition-all cursor-pointer ${
                  committedRubrics[activePatch.matchedRubric]
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-sm'
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
          className={`lg:col-span-5 p-6 rounded-2xl border space-y-4 shadow-sm transition-colors ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900'
              : 'bg-[#0B0F19] border-[#1C1F26] text-white'
          }`}
        >
          <div
            className={`flex items-center justify-between border-b pb-3 ${
              isLight ? 'border-slate-200' : 'border-slate-800'
            }`}
          >
            <span
              className={`font-black text-sm uppercase flex items-center gap-2 ${
                isLight ? 'text-purple-800' : 'text-purple-400'
              }`}
            >
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
                className={`p-4 rounded-xl border space-y-2.5 ${
                  isLight
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-[#111317] border-slate-800'
                }`}
              >
                <span
                  className={`text-xs font-black ${
                    isLight ? 'text-purple-800' : 'text-purple-300'
                  }`}
                >
                  {frame.frameTime}
                </span>
                <p
                  className={`text-xs font-bold leading-relaxed ${
                    isLight ? 'text-slate-800' : 'text-white'
                  }`}
                >
                  {frame.modalityDetected}
                </p>
                <div
                  className={`p-3 rounded-lg border text-xs flex flex-wrap items-center justify-between gap-2 ${
                    isLight
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-emerald-950/40 border-emerald-500/40 text-white'
                  }`}
                >
                  <span className="font-bold text-emerald-800 dark:text-emerald-300">
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

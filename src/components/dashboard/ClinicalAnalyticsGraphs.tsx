'use client';

import React from 'react';
import {
  Activity,
  BarChart3,
  Layers,
  ShieldCheck,
  Compass,
  TrendingDown,
  ArrowDownRight,
  Sparkles,
} from 'lucide-react';

interface ClinicalAnalyticsGraphsProps {
  theme?: 'dark' | 'light';
}

export const ClinicalAnalyticsGraphs: React.FC<
  ClinicalAnalyticsGraphsProps
> = ({ theme = 'light' }) => {
  const isLight = theme === 'light';

  const remedyScores = [
    { code: 'Bell', name: 'Belladonna', score: 65.2, rubrics: '7/8 Rubrics', progress: 95 },
    { code: 'Chel', name: 'Chelidonium majus', score: 58.4, rubrics: '4/8 Rubrics', progress: 85 },
    { code: 'Sulph', name: 'Sulphur', score: 52.1, rubrics: '8/8 Rubrics', progress: 76 },
    { code: 'Acon', name: 'Aconitum napellus', score: 49.3, rubrics: '6/8 Rubrics', progress: 72 },
    { code: 'Bry', name: 'Bryonia alba', score: 46.8, rubrics: '6/8 Rubrics', progress: 68 },
    { code: 'Puls', name: 'Pulsatilla nigricans', score: 44.2, rubrics: '5/8 Rubrics', progress: 64 },
  ];

  const chapters = [
    { name: 'MIND', count: '2 Rubrics', match: '85% Match' },
    { name: 'HEAD', count: '1 Rubric', match: '90% Match' },
    { name: 'ABDOMEN', count: '1 Rubric', match: '75% Match' },
    { name: 'EXTREMITIES', count: '1 Rubric', match: '80% Match' },
    { name: 'THROAT', count: '1 Rubric', match: '70% Match' },
    { name: 'STOMACH', count: '1 Rubric', match: '65% Match' },
    { name: 'GENERALITIES', count: '1 Rubric', match: '88% Match' },
  ];

  const heringVectors = [
    {
      vector: 'Vector I: From Above Downward',
      status: 'ACTIVE_CURATIVE',
      detail: 'Head throbbing pain resolving prior to stomach thirst symptoms.',
      progress: 92,
    },
    {
      vector: 'Vector II: From Within Outward',
      status: 'ACTIVE_CURATIVE',
      detail: 'Visceral liver parenchyma ameliarating towards surface cutaneous eruption.',
      progress: 88,
    },
    {
      vector: 'Vector III: Important to Less Important Organ',
      status: 'SAFEGUARDED',
      detail: 'Protected by Burnett Organopathy low-potency tissue drainage.',
      progress: 96,
    },
    {
      vector: 'Vector IV: Reverse Order of Appearance',
      status: 'ACTIVE_CURATIVE',
      detail: 'Old childhood eczema skin spots reappearing safely as internal fever subsides.',
      progress: 84,
    },
  ];

  return (
    <div
      className={`w-full h-full flex flex-col font-sans select-none overflow-y-auto transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#090A0C] text-[#E6E8EA]'
      }`}
    >
      {/* EXECUTIVE HEADER */}
      <div
        className={`p-3 border-b flex flex-wrap items-center justify-between gap-3 ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#111317] border-[#1C1F26]'
        }`}
      >
        <div className="flex items-center space-x-2.5">
          <BarChart3 className="w-5 h-5 text-emerald-600" />
          <div>
            <h2 className="font-bold text-xs uppercase tracking-wider">
              Clinical Telemetry Analytics & Miasmatic Radar Visualizer
            </h2>
            <p className="text-[10px] text-gray-500 font-mono">
              Real-Time TF-IDF Specificity Curves, Embryological Shift Vectors & Hering Law Trajectory
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-xl">
          ACTIVE MATHEMATICAL MODEL: TF-IDF ASYMMETRICAL INDEX
        </span>
      </div>

      {/* BODY DASHBOARD */}
      <div className="p-4 space-y-4 font-mono text-xs">
        {/* ROW 1: MIASMATIC BREAKDOWN & EMBRYOLOGICAL TISSUE VECTOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* ACTIVE MIASMATIC CONCENTRATION CARD */}
          <div
            className={`lg:col-span-6 border rounded-xl p-4 space-y-3 ${
              isLight
                ? 'bg-white border-slate-200 shadow-2xs'
                : 'bg-[#111317] border-[#1C1F26]'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-2 border-slate-200">
              <span className="font-bold text-xs uppercase text-emerald-600">
                ACTIVE PATIENT MIASMATIC CONCENTRATION
              </span>
              <span className="text-[10px] text-gray-400">
                Dr. Hahnemann / Vijayakar Axis
              </span>
            </div>

            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Psora (Functional / Hypersensitivity)</span>
                  <span className="text-emerald-600">45%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-emerald-600 w-[45%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Sycosis (Hypertrophy / Proliferation)</span>
                  <span className="text-purple-600">35%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-purple-600 w-[35%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Syphilis (Destructive / Necrotic)</span>
                  <span className="text-rose-600">20%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-rose-600 w-[20%]" />
                </div>
              </div>
            </div>

            <p className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-[11px] text-emerald-900 leading-relaxed font-sans">
              <strong>Clinical Interpretation:</strong> Patient presents with a primary{' '}
              <strong className="text-emerald-700">Psoric-Sycotic active axis</strong> with minor syphilitic destructive infiltration. Target simillimum must cover functional and proliferative symptom tiers.
            </p>
          </div>

          {/* EMBRYOLOGICAL TISSUE LAYER RADAR (VIJAYAKAR RADAR) */}
          <div
            className={`lg:col-span-6 border rounded-xl p-4 space-y-3 ${
              isLight
                ? 'bg-white border-slate-200 shadow-2xs'
                : 'bg-[#111317] border-[#1C1F26]'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-2 border-slate-200">
              <span className="font-bold text-xs uppercase text-purple-600 flex items-center gap-1.5">
                <Layers className="w-4 h-4" /> Embryological Tissue Layer Vector (Vijayakar Radar)
              </span>
              <span className="text-[10px] font-bold text-emerald-600">
                CURATIVE VECTOR: OUTWARD
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-lg border border-blue-200 bg-blue-50/50">
                <p className="text-[11px] font-bold text-blue-700">ECTODERM</p>
                <p className="text-2xl font-black text-slate-900 my-1">5 Rubrics</p>
                <p className="text-[10px] text-gray-500">Nervous & Skin Layer</p>
              </div>
              <div className="p-3 rounded-lg border border-purple-200 bg-purple-50/50">
                <p className="text-[11px] font-bold text-purple-700">MESODERM</p>
                <p className="text-2xl font-black text-slate-900 my-1">1 Rubric</p>
                <p className="text-[10px] text-gray-500">Musculoskeletal & Vascular</p>
              </div>
              <div className="p-3 rounded-lg border border-orange-200 bg-orange-50/50">
                <p className="text-[11px] font-bold text-orange-700">ENDODERM</p>
                <p className="text-2xl font-black text-slate-900 my-1">2 Rubrics</p>
                <p className="text-[10px] text-gray-500">Visceral & Parenchyma</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center justify-between">
              <span>
                <strong>Endoderm Liver Cirrhosis</strong> rubric present. Requires Burnett Organopathy tissue protection.
              </span>
              <span className="bg-amber-600 text-white px-2 py-0.5 rounded font-bold text-[10px]">
                SAFEGUARD ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* ROW 2: TF-IDF SPECIFICITY RANKING & CHAPTER TOTALITY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div
            className={`lg:col-span-8 border rounded-xl p-4 space-y-3 ${
              isLight
                ? 'bg-white border-slate-200 shadow-2xs'
                : 'bg-[#111317] border-[#1C1F26]'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-2 border-slate-200">
              <span className="font-bold text-xs uppercase text-emerald-600">
                HOMEOPATHIC SPECIFICITY INDEX (TF-IDF WEIGHTED RANKING)
              </span>
              <span className="text-[10px] text-gray-400">
                Top 6 Candidate Simillima
              </span>
            </div>

            <div className="space-y-2.5">
              {remedyScores.map((r) => (
                <div key={r.code} className="flex items-center space-x-3">
                  <div className="w-12 font-black text-xs text-slate-800">
                    {r.code}
                  </div>
                  <div className="w-32 text-[11px] text-gray-500 truncate">
                    {r.name}
                  </div>
                  <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-full"
                      style={{ width: `${r.progress}%` }}
                    />
                  </div>
                  <div className="w-20 text-right text-[11px] text-gray-500">
                    {r.rubrics}
                  </div>
                  <div className="w-12 text-right font-black text-xs text-emerald-600">
                    {r.score}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`lg:col-span-4 border rounded-xl p-4 space-y-3 ${
              isLight
                ? 'bg-white border-slate-200 shadow-2xs'
                : 'bg-[#111317] border-[#1C1F26]'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-2 border-slate-200">
              <span className="font-bold text-xs uppercase text-emerald-600">
                CHAPTER TOTALITY WEIGHT
              </span>
              <span className="text-[10px] text-gray-400">7 Chapters</span>
            </div>

            <div className="space-y-1.5">
              {chapters.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between py-1 border-b border-slate-100 text-xs"
                >
                  <span className="font-bold text-slate-800">{c.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-[10px]">{c.count}</span>
                    <span className="font-bold text-emerald-600">{c.match}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 3: HERING'S LAW OF CURE DIRECTIONAL TRAJECTORY VECTOR CARD */}
        <div
          className={`border rounded-xl p-4 space-y-3 ${
            isLight
              ? 'bg-white border-slate-200 shadow-2xs'
              : 'bg-[#111317] border-[#1C1F26]'
          }`}
        >
          <div className="flex items-center justify-between border-b pb-2 border-slate-200">
            <span className="font-bold text-xs uppercase text-emerald-600 flex items-center gap-1.5">
              <Compass className="w-4 h-4" /> Hering&apos;s Law of Cure Directional Trajectory Vectors
            </span>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full">
              CURATIVE TRAJECTORY CONFIRMED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {heringVectors.map((v, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">
                    {v.vector}
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {v.progress}%
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 leading-snug font-sans">
                  {v.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalAnalyticsGraphs;

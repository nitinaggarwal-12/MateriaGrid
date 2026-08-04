'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  Activity,
  Layers,
  Sparkles,
  ShieldCheck,
  Award,
  TrendingUp,
  Flame,
  Droplets,
  Compass,
  ArrowUpRight,
  Info,
} from 'lucide-react';

interface ClinicalAnalyticsGraphsProps {
  theme?: 'dark' | 'light';
}

export const ClinicalAnalyticsGraphs: React.FC<
  ClinicalAnalyticsGraphsProps
> = () => {
  const [selectedMiasm, setSelectedMiasm] = useState<string>('PSORA');

  const miasmaticDistribution = [
    {
      miasm: 'PSORA (FUNCTIONAL / SKIN)',
      percentage: 54,
      remedies: ['Sulphur', 'Calcarea carb', 'Lycopodium'],
      color: '#10B981',
      description: 'Functional irritation, nervous anxiety, cutaneous itching without structural destruction.',
    },
    {
      miasm: 'SYCOSIS (HYPERPLASIA / DISCHARGE)',
      percentage: 28,
      remedies: ['Thuja', 'Medorrhinum', 'Pulsatilla'],
      color: '#06B6D4',
      description: 'Proliferation, joint synovial effusion, slow onset, greenish discharges.',
    },
    {
      miasm: 'SYPHILIS (DESTRUCTIVE / ULCERATIVE)',
      percentage: 18,
      remedies: ['Mercurius', 'Lachesis', 'Arsenicum'],
      color: '#F43F5E',
      description: 'Cellular necrosis, deep bone tissue destruction, nocturnal aggravation 1-2 AM.',
    },
  ];

  const embryologicalLayers = [
    {
      layer: 'ECTODERM (NERVOUS SYSTEM & EPIDERMIS)',
      rubricsMatched: 11,
      topRemedies: 'Belladonna (4), Sulphur (3)',
      color: '#3B82F6',
      status: 'PRIMARY CLINICAL FOCUS',
    },
    {
      layer: 'MESODERM (JOINTS & CONNECTIVE TISSUE)',
      rubricsMatched: 5,
      topRemedies: 'Rhus-t (4), Bryonia (4)',
      color: '#A855F7',
      status: 'SECONDARY MODALITY TRACK',
    },
    {
      layer: 'ENDODERM (VISCERAL ORGAN PARENCHYMA)',
      rubricsMatched: 4,
      topRemedies: 'Chelidonium (4), Pulsatilla (3)',
      color: '#F97316',
      status: 'DRAINAGE TISSUE PROTECTED',
    },
  ];

  return (
    <div className="w-full h-full overflow-y-auto p-6 bg-[#05070A] text-white space-y-6 font-mono">
      {/* HEADER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#0B0F19] via-[#111317] to-[#0B0F19] border border-[#1C1F26] shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black shadow-lg">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-black text-base uppercase tracking-wider bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              CLINICAL ANALYTICS, RADAR & EMBRYOLOGICAL LAYER VECTORS
            </h2>
            <p className="text-xs text-gray-400">
              Dr. Vijayakar Predictive Miasmatic Tracking & Hering’s Law Direction of Cure Visualizer
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold text-xs flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> HERING'S LAW: DIRECTION OF CURE POSITIVE
          </span>
        </div>
      </div>

      {/* KPI METRIC CARDS WITH HOVER SCALE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'TOP SIMILIMUM CONFIDENCE',
            value: '94.8%',
            sub: 'Belladonna 200C / LM 0/1',
            color: 'from-emerald-600 to-teal-700',
            icon: <Award className="w-5 h-5 text-emerald-300" />,
          },
          {
            title: 'ASYMMETRICAL TF-IDF SENSITIVITY',
            value: '65.20',
            sub: 'Rare Symptom Specificity Boost',
            color: 'from-cyan-600 to-blue-700',
            icon: <Sparkles className="w-5 h-5 text-cyan-300" />,
          },
          {
            title: 'EMBRYOLOGICAL DISEASE VECTOR',
            value: 'OUTWARD',
            sub: 'Endoderm -> Mesoderm -> Ectoderm',
            color: 'from-purple-600 to-indigo-700',
            icon: <Layers className="w-5 h-5 text-purple-300" />,
          },
          {
            title: 'ORGANOPATHY DRAINAGE TRACK',
            value: 'ACTIVE',
            sub: 'Chelidonium 1X Liver Protection',
            color: 'from-orange-600 to-amber-700',
            icon: <Activity className="w-5 h-5 text-orange-300" />,
          },
        ].map((card, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-[#0B0F19] border border-[#1C1F26] hover:border-emerald-500/60 transition-all transform hover:scale-[1.02] shadow-lg group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-emerald-400 transition-colors">
                {card.title}
              </span>
              <div className={`p-2 rounded-xl bg-gradient-to-br ${card.color}`}>
                {card.icon}
              </div>
            </div>
            <p className="text-2xl font-black text-white">{card.value}</p>
            <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* MIASMATIC RADAR DISTRIBUTION & EMBRYOLOGICAL LAYER GAUGES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* MIASMATIC SPECTRUM CARDS (7 COLUMNS) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0B0F19] border border-[#1C1F26] space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-black text-sm uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <Flame className="w-4 h-4" /> PREDICTIVE MIASMATIC FOCUS SPECTRUM
            </span>
            <span className="text-xs text-gray-400">CLICK CARD TO INSPECT</span>
          </div>

          <div className="space-y-4">
            {miasmaticDistribution.map((m) => (
              <div
                key={m.miasm}
                onClick={() => setSelectedMiasm(m.miasm)}
                className="p-4 rounded-xl border border-slate-800 bg-[#111317] hover:border-emerald-500/80 transition-all cursor-pointer transform hover:scale-[1.01] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-white">{m.miasm}</span>
                  <span
                    className="px-3 py-1 rounded-full font-black text-xs text-white"
                    style={{ backgroundColor: m.color }}
                  >
                    {m.percentage}% CASE LOAD
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${m.percentage}%`, backgroundColor: m.color }}
                  />
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{m.description}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-[10px] text-gray-400 font-bold">Key Remedies:</span>
                  {m.remedies.map((r) => (
                    <span
                      key={r}
                      className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300 font-bold text-[10px]"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EMBRYOLOGICAL LAYER VECTORS (5 COLUMNS) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0B0F19] border border-[#1C1F26] space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-black text-sm uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <Layers className="w-4 h-4" /> EMBRYOLOGICAL PATHOLOGY TRACKING
            </span>
            <span className="text-xs text-gray-400">VIJAYAKAR MATRIX</span>
          </div>

          <div className="space-y-4">
            {embryologicalLayers.map((layer) => (
              <div
                key={layer.layer}
                className="p-4 rounded-xl border border-slate-800 bg-[#111317] hover:border-cyan-500/80 transition-all transform hover:scale-[1.01] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-xs text-white">{layer.layer}</span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                    {layer.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-300">
                  <span>Rubrics Matched: <strong className="text-white">{layer.rubricsMatched}</strong></span>
                  <span className="text-emerald-400 font-bold">{layer.topRemedies}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-teal-950/60 border border-emerald-500/40 text-xs space-y-2">
            <p className="font-black text-emerald-300">
              🛡️ Suppression Barrier & Direction of Cure
            </p>
            <p className="text-gray-300 leading-relaxed">
              Disease progress moving from superficial Ectoderm to deep Endoderm signals suppression. MateriaGrid flags any prescription that causes internal pathology to advance inward.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalAnalyticsGraphs;

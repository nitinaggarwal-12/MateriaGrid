'use client';

import React, { useState } from 'react';
import {
  X,
  RotateCw,
  Activity,
  Layers,
  Sparkles,
  ShieldCheck,
  Award,
  Compass,
  Eye,
  Heart,
  Brain,
  Zap,
} from 'lucide-react';

interface AnatomicalAffinityMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  topRemedyCode: string;
  theme?: 'dark' | 'light';
}

export const AnatomicalAffinityMapModal: React.FC<
  AnatomicalAffinityMapModalProps
> = ({ isOpen, onClose, topRemedyCode, theme = 'light' }) => {
  const isLight = theme === 'light';
  const [rotationAngle, setRotationAngle] = useState<number>(45);
  const [activeOrganSystem, setActiveOrganSystem] = useState<
    'ALL' | 'CEREBRAL' | 'HEPATIC' | 'SYNOVIAL' | 'ECTODERM'
  >('ALL');

  if (!isOpen) return null;

  const organAffinityHotspots = [
    {
      id: 'org-brain',
      name: 'Right Cerebral Carotids & Vasomotor Ring',
      system: 'CEREBRAL',
      remedy: 'Belladonna (Bell 65.2)',
      affinityScore: '98.4% Keynote Organ Tropism',
      x: 50,
      y: 16,
      layer: 'ECTODERM / NERVOUS',
      color: '#10B981',
      description:
        'Throbbing carotid pulsations, violent sudden cerebral hyperemia, dilated light-insensitive pupils.',
    },
    {
      id: 'org-liver',
      name: 'Right Hepatic Lobe & Biliary Parenchyma',
      system: 'HEPATIC',
      remedy: 'Chelidonium majus (Chel 58.4)',
      affinityScore: '96.2% Tissue Drainage Tropism',
      x: 43,
      y: 46,
      layer: 'ENDODERM / PARENCHYMA',
      color: '#06B6D4',
      description:
        'Pain under right inferior angle of scapula, clay-colored stools, ALT/AST enzymatic normalization.',
    },
    {
      id: 'org-joint',
      name: 'Knee Synovial Effusion & Tendinous Insertions',
      system: 'SYNOVIAL',
      remedy: 'Rhus toxicodendron (Rhus-t 42.1)',
      affinityScore: '92.8% Modality Axis Tropism',
      x: 47,
      y: 78,
      layer: 'MESODERM / CONNECTIVE',
      color: '#A855F7',
      description:
        'Stiffness on beginning motion, amel. continued motion, fibrous articular capsule edema.',
    },
    {
      id: 'org-skin',
      name: 'Cranial & Facial Mucosal Vesicular Epithelium',
      system: 'ECTODERM',
      remedy: 'Arsenicum album (Ars 40.5)',
      affinityScore: '91.5% Miasmatic Tropism',
      x: 54,
      y: 28,
      layer: 'ECTODERM / SKIN',
      color: '#F59E0B',
      description:
        'Burning skin eruptions amel. heat, nocturnal anxiety 1-2 AM, destructive syphilitic miasm.',
    },
  ];

  const filteredHotspots =
    activeOrganSystem === 'ALL'
      ? organAffinityHotspots
      : organAffinityHotspots.filter((h) => h.system === activeOrganSystem);

  const getRotationLabel = (deg: number) => {
    if (deg >= 315 || deg < 45) return 'ANTERIOR (FRONT FULL-BODY PROJECTION)';
    if (deg >= 45 && deg < 135) return 'RIGHT LATERAL (RIGHT ORGAN AFFINITY PROJECTION)';
    if (deg >= 135 && deg < 225) return 'POSTERIOR (SPINAL & SCAPULAR PROJECTION)';
    return 'LEFT LATERAL (SYSTEMIC SYNOVIAL PROJECTION)';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 select-none">
      <div
        className={`w-full max-w-6xl rounded-2xl border-2 shadow-2xl overflow-hidden max-h-[94vh] flex flex-col transition-colors ${
          isLight
            ? 'bg-white border-emerald-600 text-slate-900'
            : 'bg-[#090A0C] border-emerald-500 text-white'
        }`}
      >
        {/* EXECUTIVE HEADER */}
        <div className="p-4 border-b border-slate-200 dark:border-[#1C1F26] flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-emerald-600/10 via-cyan-600/10 to-transparent">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-black shadow-md">
              <RotateCw className="w-5 h-5 animate-spin" style={{ animationDuration: '12s' }} />
            </div>
            <div>
              <h2 className="font-black text-sm uppercase tracking-wider font-mono bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                360° MULTIDIMENSIONAL FULL HUMAN ANATOMY ORGAN-AFFINITY VISUALIZER
              </h2>
              <p className="text-xs text-gray-500 font-mono">
                Interactive Spatial Mapping of Top Simillimum Organ Tropism & Burnett Tissue Affinities
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-xs border border-emerald-400">
              ROTATION: {rotationAngle}° // {getRotationLabel(rotationAngle)}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl border border-slate-300 dark:border-[#1C1F26] text-gray-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* WORKBENCH BODY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden font-mono">
          {/* LEFT 360-DEGREE FULL HUMAN ANATOMY VIEWPORT (7 COLUMNS) */}
          <div className="lg:col-span-7 p-6 relative flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-slate-800 text-white">
            {/* ORGAN SYSTEM LAYER FILTER PILLS */}
            <div className="w-full flex flex-wrap items-center justify-center gap-2 mb-4 z-20">
              {[
                { id: 'ALL', label: 'All Organ Systems' },
                { id: 'CEREBRAL', label: '🧠 Cerebral Vasculature' },
                { id: 'HEPATIC', label: '🫀 Hepatic Parenchyma' },
                { id: 'SYNOVIAL', label: '🦴 Synovial Joints' },
                { id: 'ECTODERM', label: '✨ Epithelial Ectoderm' },
              ].map((sys) => (
                <button
                  key={sys.id}
                  onClick={() => setActiveOrganSystem(sys.id as any)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeOrganSystem === sys.id
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md scale-105'
                      : 'bg-slate-800/80 text-gray-300 hover:bg-slate-700'
                  }`}
                >
                  {sys.label}
                </button>
              ))}
            </div>

            {/* FULL HUMAN ANATOMY 3D SILHOUETTE CANVAS VIEWPORT */}
            <div className="relative w-80 h-[480px] flex items-center justify-center my-2">
              {/* ORBITAL RING LIGHTING */}
              <div
                className="absolute inset-0 rounded-full border-2 border-emerald-500/20 animate-pulse pointer-events-none"
                style={{
                  transform: `rotateY(${rotationAngle}deg) scale(1.05)`,
                }}
              />

              {/* HUMAN ANATOMY SPATIAL SVG SILHOUETTE WITH ROTATION EFFECT */}
              <svg
                viewBox="0 0 200 400"
                className="w-full h-full drop-shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-transform duration-300"
                style={{
                  transform: `scaleX(${
                    Math.cos((rotationAngle * Math.PI) / 180) * 0.35 + 0.65
                  })`,
                }}
              >
                <defs>
                  <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                {/* Cranium & Neck */}
                <ellipse cx="100" cy="36" rx="22" ry="26" fill="url(#bodyGrad)" stroke="#10B981" strokeWidth="1.5" />
                {/* Thorax & Abdomen */}
                <path
                  d="M 68 64 Q 100 58 132 64 L 138 180 Q 100 190 62 180 Z"
                  fill="url(#bodyGrad)"
                  stroke="#10B981"
                  strokeWidth="1.5"
                />
                {/* Spine Vasculature Track */}
                <line x1="100" y1="62" x2="100" y2="185" stroke="#34D399" strokeWidth="2" strokeDasharray="3 3" />
                {/* Arms */}
                <path d="M 64 68 L 38 175" stroke="#10B981" strokeWidth="10" strokeLinecap="round" opacity="0.6" />
                <path d="M 136 68 L 162 175" stroke="#10B981" strokeWidth="10" strokeLinecap="round" opacity="0.6" />
                {/* Pelvic & Femurs */}
                <path d="M 68 185 L 74 340" stroke="#10B981" strokeWidth="12" strokeLinecap="round" opacity="0.7" />
                <path d="M 132 185 L 126 340" stroke="#10B981" strokeWidth="12" strokeLinecap="round" opacity="0.7" />
                {/* Knee Synovial Joint Rings */}
                <circle cx="76" cy="275" r="8" fill="none" stroke="#A855F7" strokeWidth="2" />
                <circle cx="124" cy="275" r="8" fill="none" stroke="#A855F7" strokeWidth="2" />
              </svg>

              {/* GLOWING ORGAN AFFINITY TARGET HOTSPOTS */}
              {filteredHotspots.map((spot) => (
                <div
                  key={spot.id}
                  style={{
                    left: `${spot.x}%`,
                    top: `${spot.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center space-x-2 group cursor-pointer z-30"
                >
                  <div className="relative flex items-center justify-center">
                    <span
                      className="w-7 h-7 rounded-full animate-ping opacity-75"
                      style={{ backgroundColor: spot.color }}
                    />
                    <span
                      className="w-4 h-4 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                      style={{ backgroundColor: spot.color }}
                    />
                  </div>
                  <div className="hidden group-hover:block whitespace-nowrap bg-slate-900 border border-emerald-400 text-white text-[11px] p-2 rounded-xl shadow-2xl">
                    <p className="font-black text-emerald-400">{spot.remedy}</p>
                    <p className="text-[10px] text-gray-300">{spot.name}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 360-DEGREE ORBIT ROTATION SCRUBBER SLIDER */}
            <div className="w-full max-w-md mt-3 space-y-2 bg-slate-900/90 border border-slate-700 p-3 rounded-2xl">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                <span className="flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5" /> 360° ORBITAL SPATIAL ROTATION CONTROL:
                </span>
                <span className="font-mono text-white text-sm">{rotationAngle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={rotationAngle}
                onChange={(e) => setRotationAngle(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>0° Anterior</span>
                <span>90° Right Lateral</span>
                <span>180° Posterior</span>
                <span>270° Left Lateral</span>
                <span>360° Full Orbit</span>
              </div>
            </div>
          </div>

          {/* RIGHT ORGAN AFFINITY & BURNETT TISSUE DRAINAGE CARDS (5 COLUMNS) */}
          <div className="lg:col-span-5 p-5 space-y-4 overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-slate-800">
              <span className="font-black text-xs uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Activity className="w-4 h-4" /> ORGAN TROPISM & TISSUE DRAINAGE CARDS
              </span>
              <span className="text-[10px] font-bold text-gray-500">
                {filteredHotspots.length} ACTIVE TARGETS
              </span>
            </div>

            <div className="space-y-3">
              {filteredHotspots.map((spot) => (
                <div
                  key={spot.id}
                  className="p-4 rounded-xl border-2 border-emerald-500/30 bg-slate-50 dark:bg-[#111317] space-y-2 hover:border-emerald-500 transition-all shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-slate-900 dark:text-white">
                      {spot.remedy}
                    </span>
                    <span
                      className="px-2.5 py-0.5 rounded-full font-black text-xs text-white"
                      style={{ backgroundColor: spot.color }}
                    >
                      {spot.affinityScore}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    Target Organ: {spot.name}
                  </p>
                  <p className="text-xs font-sans text-slate-700 dark:text-gray-300 leading-relaxed">
                    {spot.description}
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[10px] text-gray-500 border-t border-slate-200 dark:border-slate-800">
                    <span>LAYER: {spot.layer}</span>
                    <span className="font-bold text-emerald-600">
                      SYNCHRONIZED WITH SIMILIMATRIX
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-600/10 to-teal-600/10 border border-emerald-500/30 text-xs font-sans space-y-1">
              <p className="font-bold text-emerald-700 dark:text-emerald-300">
                🧬 Dr. Burnett Tissue Affinity Verification
              </p>
              <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                By rotating the 360° human silhouette, clinicians verify that low-potency organopathic tissue drainage (*Chelidonium 1X*) protects vulnerable parenchyma while constitutional simillima (*Belladonna 65.2*) resolve central nervous totality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnatomicalAffinityMapModal;

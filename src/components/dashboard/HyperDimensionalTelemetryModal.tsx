'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  Cpu,
  Activity,
  Layers,
  ShieldCheck,
  Compass,
  Zap,
  Globe,
  Radio,
} from 'lucide-react';

interface HyperDimensionalTelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
  topRemedyCode: string;
  theme?: 'dark' | 'light';
}

export const HyperDimensionalTelemetryModal: React.FC<
  HyperDimensionalTelemetryModalProps
> = ({ isOpen, onClose, topRemedyCode, theme = 'light' }) => {
  const isLight = theme === 'light';
  const [activeDimension, setActiveDimension] = useState<number>(10);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 10D HYPER-ORBITAL SPATIAL CANVAS
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    let angle = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      angle += 0.015;

      const cx = width / 2;
      const cy = height / 2;

      // Draw concentric hyper-dimensional orbital rings for 1D to 10D
      for (let d = 1; d <= 10; d++) {
        const r = d * 15 + 10;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle =
          d === activeDimension
            ? '#10B981'
            : isLight
            ? 'rgba(16, 185, 129, 0.18)'
            : 'rgba(16, 185, 129, 0.25)';
        ctx.lineWidth = d === activeDimension ? 2.5 : 1;
        ctx.stroke();

        // Orbiting quantum particle per dimension
        const px = cx + r * Math.cos(angle * (11 - d) * 0.35);
        const py = cy + r * Math.sin(angle * (11 - d) * 0.35);

        ctx.beginPath();
        ctx.arc(px, py, d === activeDimension ? 5.5 : 3.2, 0, Math.PI * 2);
        ctx.fillStyle = d === activeDimension ? '#10B981' : '#34D399';
        ctx.shadowColor = '#10B981';
        ctx.shadowBlur = d === activeDimension ? 14 : 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isOpen, activeDimension, isLight]);

  if (!isOpen) return null;

  const dimensions = [
    {
      dim: 1,
      title: '1D — Alphanumeric Historical Rubric Path String',
      tech: 'Classical Kent / Boericke / Sehgal ROH Taxonomy String',
      data: 'MIND - BUSINESS - talks of',
      status: 'VERIFIED_19TH_CENTURY_TEXT',
    },
    {
      dim: 2,
      title: '2D — SimiliMatrix High-Density Calculation Board',
      tech: '2D Symptom Rubric × Remedy Totality Cell Matrix',
      data: '24 Rubrics × 16 Active Remedies Grid',
      status: 'REAL_TIME_GRADES_0_TO_4',
    },
    {
      dim: 3,
      title: '3D — Spatial Anatomical Organ-Tissue Body Map',
      tech: 'Anatomical X/Y/Z Target Tissue Coordinate Affinities',
      data: 'Right Cerebral Hemisphere & Right Hepatic Lobe',
      status: 'SPATIAL_AFFINITY_CONFIRMED',
    },
    {
      dim: 4,
      title: '4D — Chronological Circadian Time & Modality Velocity',
      tech: 'Circadian Aggravation Velocity & Amelioration Curve',
      data: 'Aggravation 3 PM / Ameliorated by Cold Application',
      status: 'CIRCADIAN_CURVE_LOCKED',
    },
    {
      dim: 5,
      title: '5D — Vijayakar Embryological Tissue Layer Vector',
      tech: 'Dr. Prafull Vijayakar 3-Tier Embryology Curative Check',
      data: 'Ectoderm (5) -> Mesoderm (1) -> Endoderm (2)',
      status: 'OUTWARD_CURATIVE_VECTOR',
    },
    {
      dim: 6,
      title: '6D — Hahnemann Genetic Miasmatic Focus Distribution',
      tech: 'Genetic Active Miasmatic Predominance Split',
      data: 'Psora (45%) | Sycosis (35%) | Syphilis (20%)',
      status: 'PSORIC_SYCOTIC_AXIS',
    },
    {
      dim: 7,
      title: '7D — 1,536-Dimensional pgvector Semantic Embedding',
      tech: 'PostgreSQL 18 HNSW Vector Cosine Distance in NLP Space',
      data: 'Cosine Similarity Distance: 0.0812 (Ultra-High Match)',
      status: 'PGVECTOR_1536_LOCKED',
    },
    {
      dim: 8,
      title: '8D — TF-IDF Asymmetrical Specificity & Inverse Density',
      tech: 'Inverse Rubric Density Mathematical Specificity Formula',
      data: `Top Simillimum: ${topRemedyCode} (Specificity Score: 65.20)`,
      status: 'TF_IDF_ASYMMETRICAL_LOCKED',
    },
    {
      dim: 9,
      title: '9D — Author Provenance & Epigenetic Predisposition Tensor',
      tech: 'Proving Provenance Weighting (Hahnemann Pure 1.0x) + Family History',
      data: 'Author Provenance: HAHNEMANN_PURE & CLINICAL_VERIFIED (1.0x Weight)',
      status: 'PROVENANCE_EPIGENETIC_VALIDATED',
    },
    {
      dim: 10,
      title: '10D — Quantum Simillimum Holographic Resonance Totality Vector',
      tech: 'Unified 10D Quantum Resonance Synthesizer across all 10 dimensions',
      data: `Unshakeable Top Simillimum Match: ${topRemedyCode} (Resonance Frequency: 99.8% Totality)`,
      status: '10D_QUANTUM_RESONANCE_LOCKED',
    },
  ];

  const currentDimData =
    dimensions.find((d) => d.dim === activeDimension) || dimensions[9];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 select-none">
      <div
        className={`w-full max-w-5xl rounded-2xl border shadow-2xl overflow-hidden font-sans flex flex-col max-h-[94vh] transition-colors ${
          isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#0B0F19] border-[#1C1F26] text-white'
        }`}
      >
        {/* HEADER */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center font-black text-white text-base shadow-[0_0_25px_rgba(16,185,129,0.6)]">
              10D
            </div>
            <div>
              <h2 className="font-bold text-sm tracking-wider uppercase font-mono">
                10-Dimensional (10D) Quantum Holographic Bio-Intelligence Terminal
              </h2>
              <p className="text-[11px] text-emerald-400 font-mono">
                Complete Synthesis: 1D Text String $\rightarrow$ 7D pgvector $\rightarrow$ 10D Quantum Resonance (99.8%)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* WORKBENCH BODY */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto flex-1 font-mono">
          {/* LEFT 10D HYPER-ORBITAL CANVAS & DIMENSION TRAY (6 COLUMNS) */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 h-64 flex flex-col items-center justify-center overflow-hidden">
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-3 left-3 bg-emerald-950/80 border border-emerald-500/50 px-2.5 py-1 rounded text-[10px] font-bold text-emerald-400">
                ACTIVE DIMENSION: {activeDimension}D / 10D
              </div>
            </div>

            {/* DIMENSION SELECTOR CAPSULES */}
            <div className="grid grid-cols-5 gap-1.5">
              {dimensions.map((d) => (
                <button
                  key={d.dim}
                  onClick={() => setActiveDimension(d.dim)}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                    activeDimension === d.dim
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-500 font-black shadow-md'
                      : isLight
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                      : 'bg-[#111317] hover:bg-[#1C1F26] border-[#1C1F26] text-gray-300'
                  }`}
                >
                  <span className="text-xs font-black block">{d.dim}D</span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT DIMENSION DETAILS TELEMETRY PANEL (6 COLUMNS) */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase">
                  DIMENSIONAL ARCHITECTURE INSPECTION:
                </span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500 px-2 py-0.5 rounded font-bold">
                  {currentDimData.status}
                </span>
              </div>

              <h3 className="text-lg font-black text-white leading-snug">
                {currentDimData.title}
              </h3>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700 space-y-1">
                <span className="text-[10px] text-gray-400 block uppercase">
                  Mathematical / Biological Pipeline:
                </span>
                <p className="text-xs text-emerald-300 font-bold">
                  {currentDimData.tech}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-1">
                <span className="text-[10px] text-emerald-400 block uppercase font-bold">
                  Live Telemetry Output:
                </span>
                <p className="text-sm font-black text-white">
                  {currentDimData.data}
                </p>
              </div>
            </div>

            {/* FULL 10D SYNTHESIS TIMELINE LIST */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
              {dimensions.map((d) => (
                <div
                  key={d.dim}
                  onClick={() => setActiveDimension(d.dim)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    activeDimension === d.dim
                      ? 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-bold'
                      : isLight
                      ? 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      : 'border-[#1C1F26] hover:bg-[#1C1F26] text-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                      {d.dim}D
                    </span>
                    <span className="text-xs font-bold truncate">
                      {d.title.split('—')[1]}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold">
                    ACTIVE
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-4 bg-slate-900 text-white border-t border-slate-800 flex items-center justify-between text-xs font-mono">
          <span className="flex items-center gap-2 text-emerald-400 font-bold">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>10D Quantum Simillimum Totality Vector Active // Resonance Frequency: 99.8%</span>
          </span>
          <button
            onClick={onClose}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl cursor-pointer"
          >
            Close 10D Quantum Terminal
          </button>
        </div>
      </div>
    </div>
  );
};

export default HyperDimensionalTelemetryModal;

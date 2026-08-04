'use client';

import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layers,
  Sparkles,
  CheckCircle2,
  XCircle,
  Activity,
  Compass,
  Award,
  ShieldCheck,
  Cpu,
  HelpCircle,
  X,
} from 'lucide-react';

interface PromptCanvasDrawIoDiagramProps {
  theme?: 'dark' | 'light';
  isModal?: boolean;
  onClose?: () => void;
}

export const PromptCanvasDrawIoDiagram: React.FC<
  PromptCanvasDrawIoDiagramProps
> = ({ theme = 'light', isModal = false, onClose }) => {
  const isLight = theme === 'light';
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [activeLayer, setActiveLayer] = useState<'ALL' | 'DECISIONS' | 'MATH'>(
    'ALL'
  );
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-4');

  const nodes = [
    {
      id: 'node-1',
      shape: 'TERMINAL_OVAL',
      label: '01. MULTIMODAL PATIENT INTAKE',
      sublabel: 'Voice Transcript (Bhashini AI) + Dermatoscopic / Blood OCR Vision',
      layer: 'INPUT',
      x: 320,
      y: 40,
    },
    {
      id: 'node-2',
      shape: 'PROCESS_RECT',
      label: '02. SEHGAL ROH & BÖNNINGHAUSEN SPLITTER',
      sublabel: 'PPP Mental Behavior Extraction + Physical Modality Components',
      layer: 'MATH',
      x: 320,
      y: 150,
    },
    {
      id: 'node-3',
      shape: 'DECISION_DIAMOND',
      label: '03. IMMUTABLE PHYSICAL BASELINE CHECK',
      sublabel: 'Thermal (HOT/CHILLY) & Thirst (THIRSTY/THIRSTLESS) Constants',
      layer: 'DECISIONS',
      x: 320,
      y: 280,
    },
    {
      id: 'node-4',
      shape: 'PROCESS_RECT',
      label: '04. ASYMMETRICAL TF-IDF SPECIFICITY INDEX',
      sublabel: 'S(remedy) = ∑ Grade_i × log2(N_total / n_rubric_i)',
      layer: 'MATH',
      x: 320,
      y: 440,
    },
    {
      id: 'node-5',
      shape: 'DECISION_DIAMOND',
      label: '05. BURNETT ORGANOPATHY & PATHOLOGY GATE',
      sublabel: 'Severe ICD-11 Tissue Degeneration Check (e.g. Cirrhosis DB90)',
      layer: 'DECISIONS',
      x: 320,
      y: 580,
    },
    {
      id: 'node-6',
      shape: 'PROCESS_RECT',
      label: '06. DUAL-TRACK SIMILLIMUM OUTPUT',
      sublabel: 'Track A: Constitutional Totality (200C/LM) + Track B: Burnett Organopathic (1X)',
      layer: 'MATH',
      x: 320,
      y: 740,
    },
    {
      id: 'node-7',
      shape: 'TERMINAL_OVAL',
      label: '07. HERING LAW TRAJECTORY & ABDM SIGNED RX',
      sublabel: 'Within -> Outward Curative Verification + Cryptographic FHIR Print',
      layer: 'OUTPUT',
      x: 320,
      y: 860,
    },
  ];

  const nodeDetails: Record<string, { title: string; reasoning: string; math: string }> = {
    'node-1': {
      title: '01. Multimodal Patient Intake Terminal',
      reasoning:
        'Captures raw patient speech via Bhashini AI in regional Indian vernacular and converts dermatoscopic lesion/blood OCR reports into structured vectors.',
      math: 'Raw Vector Input -> Tokenized Transcript + Feature Embeddings',
    },
    'node-2': {
      title: '02. Sehgal ROH & Bönninghausen Component Splitter',
      reasoning:
        'Extracts Dr. M.L. Sehgal Present, Predominating, and Persisting (PPP) behavioral states alongside Bönninghausen physical Location, Sensation, Modality, and Concomitant.',
      math: 'Taxonomy Resolution -> Classical Repertory Path Array R[]',
    },
    'node-3': {
      title: '03. Decision Gate 1: Immutable Physical Baseline Check',
      reasoning:
        'Physiological laws of Dr. Vijayakar: Thermal (Hot/Chilly) and Thirst (Thirsty/Thirstless) constants cannot be violated. Remedies contradicting patient constants are automatically suppressed.',
      math: 'YES Branch -> Proceed to TF-IDF Engine | NO Branch -> Physical Contradiction Mask',
    },
    'node-4': {
      title: '04. Asymmetrical TF-IDF Specificity Index Engine',
      reasoning:
        'Inverse Rubric Density penalizes broad polychrests (Sulphur, Lycopodium) and elevates peculiar, targeted keynote remedies matching the patient state.',
      math: 'S(remedy) = ∑ Grade_i × log2(N_total / n_remedies_in_rubric_i)',
    },
    'node-5': {
      title: '05. Decision Gate 2: Dr. Burnett Organopathy & Pathology Gate',
      reasoning:
        'Detects severe structural organ pathology. High potencies alone in degenerated organs can cause fatal aggravation. Organ-affine low potencies protect parenchymal tissue.',
      math: 'YES Branch -> Trigger Dual-Track Low-Potency Organopathic Co-Prescription',
    },
    'node-6': {
      title: '06. Dual-Track Simillimum Output Engine',
      reasoning:
        'Separates recommendations into Track A (Constitutional Totality @ LM 0/1 Liquid Sip) and Track B (Burnett Organopathic Tissue Drainage @ 1X Mother Tincture).',
      math: 'Track A: Belladonna 65.20 @ LM 0/1 | Track B: Chelidonium majus 1X',
    },
    'node-7': {
      title: '07. Hering Law Trajectory & ABDM Cryptographic Signed Rx',
      reasoning:
        'Verifies direction of cure (Above -> Downward, Within -> Outward) and issues an NHA ABDM v2.4 cryptographically signed FHIR digital prescription slip.',
      math: 'Curative Vector Status: ACTIVE_CURATIVE | ABDM Token Issued',
    },
  };

  const activeDetail = nodeDetails[selectedNodeId] || nodeDetails['node-4'];

  return (
    <div
      className={`w-full flex flex-col font-sans select-none antialiased ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#05070A] text-[#E6E8EA]'
      }`}
    >
      {/* PROMPTCANVAS DRAW.IO TOOLBAR */}
      <div
        className={`px-4 py-2.5 border-b flex flex-wrap items-center justify-between gap-3 font-mono text-xs ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#111317] border-[#1C1F26]'
        }`}
      >
        <div className="flex items-center space-x-2">
          <div className="px-2.5 py-1 rounded bg-emerald-600 text-white font-black text-[10px] tracking-wider">
            PROMPTCANVAS DRAW.IO VISUAL ENGINE
          </div>
          <span className="font-bold text-slate-800 dark:text-white">
            End-to-End Homeopathic Remedy Decision Architecture Graph
          </span>
        </div>

        {/* LAYER TOGGLES & ZOOM CONTROLS */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800 text-[10px] font-bold">
            <button
              onClick={() => setActiveLayer('ALL')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                activeLayer === 'ALL'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-500'
              }`}
            >
              All Layers
            </button>
            <button
              onClick={() => setActiveLayer('DECISIONS')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                activeLayer === 'DECISIONS'
                  ? 'bg-amber-600 text-white'
                  : 'text-gray-500'
              }`}
            >
              Decision Diamonds
            </button>
            <button
              onClick={() => setActiveLayer('MATH')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                activeLayer === 'MATH'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-500'
              }`}
            >
              TF-IDF Math
            </button>
          </div>

          <div className="flex items-center space-x-1 text-xs">
            <button
              onClick={() => setZoomLevel((z) => Math.max(75, z - 25))}
              className="p-1 rounded border border-slate-300 dark:border-slate-700 cursor-pointer"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center font-bold">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(150, z + 25))}
              className="p-1 rounded border border-slate-300 dark:border-slate-700 cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {isModal && onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded border border-slate-300 dark:border-slate-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* DRAW.IO CANVAS + REASONING SIDE INSPECTOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden min-h-[640px]">
        {/* LEFT DRAW.IO DIAGRAM CANVAS (8 COLUMNS) */}
        <div
          className="lg:col-span-8 overflow-auto relative p-6 flex justify-center items-start"
          style={{
            backgroundImage:
              'radial-gradient(circle, #334155 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        >
          <div
            className="relative transition-transform duration-200 origin-top"
            style={{
              transform: `scale(${zoomLevel / 100})`,
              width: '640px',
              height: '960px',
            }}
          >
            {/* SVG CONNECTION ARROWS & BRANCHES */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <marker
                  id="arrow-green"
                  markerWidth="8"
                  markerHeight="8"
                  refX="7"
                  refY="4"
                  orient="auto"
                >
                  <path d="M 0 0 L 8 4 L 0 8 z" fill="#10B981" />
                </marker>
                <marker
                  id="arrow-red"
                  markerWidth="8"
                  markerHeight="8"
                  refX="7"
                  refY="4"
                  orient="auto"
                >
                  <path d="M 0 0 L 8 4 L 0 8 z" fill="#EF4444" />
                </marker>
                <marker
                  id="arrow-slate"
                  markerWidth="8"
                  markerHeight="8"
                  refX="7"
                  refY="4"
                  orient="auto"
                >
                  <path d="M 0 0 L 8 4 L 0 8 z" fill="#64748B" />
                </marker>
              </defs>

              {/* Arrow 1: Node 1 -> Node 2 */}
              <line
                x1="320"
                y1="75"
                x2="320"
                y2="148"
                stroke="#10B981"
                strokeWidth="2.5"
                markerEnd="url(#arrow-green)"
              />

              {/* Arrow 2: Node 2 -> Node 3 */}
              <line
                x1="320"
                y1="205"
                x2="320"
                y2="278"
                stroke="#10B981"
                strokeWidth="2.5"
                markerEnd="url(#arrow-green)"
              />

              {/* Decision 1 YES path: Node 3 -> Node 4 */}
              <line
                x1="320"
                y1="375"
                x2="320"
                y2="438"
                stroke="#10B981"
                strokeWidth="2.5"
                markerEnd="url(#arrow-green)"
              />
              {/* Decision 1 NO suppression loop back/side */}
              <path
                d="M 445 325 Q 540 325 540 380 Q 540 435 445 440"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
                strokeDasharray="4 4"
                markerEnd="url(#arrow-red)"
              />
              <text x="460" y="315" fill="#EF4444" fontSize="10" fontWeight="bold">
                NO: Physical Constant Contradiction (Derank/Suppress)
              </text>

              {/* Arrow 4: Node 4 -> Node 5 */}
              <line
                x1="320"
                y1="495"
                x2="320"
                y2="578"
                stroke="#10B981"
                strokeWidth="2.5"
                markerEnd="url(#arrow-green)"
              />

              {/* Decision 2 YES path: Node 5 -> Node 6 */}
              <line
                x1="320"
                y1="675"
                x2="320"
                y2="738"
                stroke="#10B981"
                strokeWidth="2.5"
                markerEnd="url(#arrow-green)"
              />

              {/* Arrow 6: Node 6 -> Node 7 */}
              <line
                x1="320"
                y1="795"
                x2="320"
                y2="858"
                stroke="#10B981"
                strokeWidth="2.5"
                markerEnd="url(#arrow-green)"
              />
            </svg>

            {/* DRAW.IO INTERACTIVE NODES */}
            {nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isDecision = node.shape === 'DECISION_DIAMOND';
              const isTerminal = node.shape === 'TERMINAL_OVAL';

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  style={{
                    position: 'absolute',
                    left: `${node.x - 220}px`,
                    top: `${node.y}px`,
                    width: '440px',
                  }}
                  className={`z-20 p-3.5 transition-all duration-200 cursor-pointer font-mono border-2 shadow-lg ${
                    isTerminal
                      ? 'rounded-full text-center py-4 bg-slate-900 text-white border-emerald-500'
                      : isDecision
                      ? 'rounded-2xl border-amber-400 bg-amber-950/90 text-amber-100 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                      : isLight
                      ? 'rounded-xl border-slate-300 bg-white text-slate-900'
                      : 'rounded-xl border-emerald-500/50 bg-[#111317] text-white'
                  } ${
                    isSelected
                      ? 'ring-4 ring-emerald-500 scale-105 border-emerald-400 z-30'
                      : 'hover:scale-[1.02]'
                  }`}
                >
                  <p className="font-black text-xs tracking-wider uppercase">
                    {node.label}
                  </p>
                  <p className="text-[10px] text-emerald-400 font-sans mt-0.5">
                    {node.sublabel}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT DRAW.IO INSPECTOR & MATHEMATICAL REASONING TELEMETRY (4 COLUMNS) */}
        <div
          className={`lg:col-span-4 border-l p-5 space-y-4 font-mono text-xs flex flex-col justify-between ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-[#111317] border-[#1C1F26] text-white'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-slate-800">
              <span className="font-bold text-xs uppercase text-emerald-600 flex items-center gap-1.5">
                <Cpu className="w-4 h-4" /> DRAW.IO NODE INSPECTION PANEL
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                LIVE
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-black text-slate-900 dark:text-white leading-snug">
                {activeDetail.title}
              </h3>
              <p className="text-xs font-sans text-slate-600 dark:text-gray-300 leading-relaxed">
                {activeDetail.reasoning}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-1.5 border border-slate-700">
              <span className="text-[10px] font-bold text-emerald-400 uppercase block">
                VECTOR / MATHEMATICAL EXECUTION LOG:
              </span>
              <p className="text-xs font-bold text-emerald-300">
                {activeDetail.math}
              </p>
            </div>

            {/* CLICKABLE LIST OF ALL 7 DRAW.IO NODES */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] font-bold uppercase text-gray-500 block">
                SELECT ARCHITECTURE NODE TO FOCUS:
              </span>
              {nodes.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setSelectedNodeId(n.id)}
                  className={`w-full text-left p-2 rounded-lg text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                    selectedNodeId === n.id
                      ? 'bg-emerald-600 text-white font-bold'
                      : isLight
                      ? 'hover:bg-slate-100 text-slate-800'
                      : 'hover:bg-[#1C1F26] text-gray-300'
                  }`}
                >
                  <span className="truncate pr-2">{n.label}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/20 font-bold">
                    {n.layer}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-300 text-[11px] font-bold">
            💡 Click any oval, process block, or decision diamond on the left canvas to inspect its clinical reasoning & math.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptCanvasDrawIoDiagram;

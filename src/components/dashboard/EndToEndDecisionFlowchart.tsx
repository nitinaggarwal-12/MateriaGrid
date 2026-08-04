'use client';

import React, { useState } from 'react';
import {
  Activity,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Droplets,
  Cpu,
  ShieldCheck,
  Award,
  FileText,
  Sparkles,
  Layers,
  HelpCircle,
  X,
  Compass,
} from 'lucide-react';

interface EndToEndDecisionFlowchartProps {
  theme?: 'dark' | 'light';
  isModal?: boolean;
  onClose?: () => void;
}

export const EndToEndDecisionFlowchart: React.FC<
  EndToEndDecisionFlowchartProps
> = ({ theme = 'light', isModal = false, onClose }) => {
  const isLight = theme === 'light';
  const [selectedNode, setSelectedNode] = useState<number>(4);

  const flowchartSteps = [
    {
      id: 1,
      stepNumber: '01',
      title: 'MULTIMODAL PATIENT INTAKE',
      shape: 'TERMINAL_INPUT',
      subtitle: 'Voice Transcript & OCR Vision AI',
      detail:
        'Captures raw conversational interview in regional Indian languages via Bhashini AI + dermatoscopic lesion & blood lab OCR images.',
      reasoning:
        'Eliminates clinician transcription fatigue and preserves verbatim symptom qualifying expressions.',
      badge: 'INPUT LAYER',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    },
    {
      id: 2,
      stepNumber: '02',
      title: 'CLASSICAL METHODOLOGICAL DECONSTRUCTION',
      shape: 'PROCESS_BLOCK',
      subtitle: 'Dr. Sehgal ROH PPP & Bönninghausen Component Splitter',
      detail:
        'Splits raw conversation into: (1) Dr. Sehgal ROH Present, Predominating & Persisting mental states, and (2) Bönninghausen physical Location, Sensation, Modality & Concomitant.',
      reasoning:
        'Ensures mental keynote symptoms and qualified physical modalities are separated into standardized database paths.',
      badge: 'NLP TAXONOMY',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    },
    {
      id: 3,
      stepNumber: '03',
      title: 'DECISION 1: IMMUTABLE PHYSICAL BASELINE FILTER',
      shape: 'DECISION_DIAMOND',
      subtitle: 'Thermal (HOT/CHILLY) & Thirst (THIRSTY/THIRSTLESS) Check',
      detail:
        'Evaluates whether candidate remedies contradict the patient immutable biological constants.',
      decisionYes: 'Thermal & Thirst Compatible -> PASS to TF-IDF Engine',
      decisionNo:
        'Contradicts Immutable Physical Baseline -> Automatic Deranking / Suppression',
      reasoning:
        'Dr. Vijayakar Law: Physical constants are immutable laws of physiology. A Hot + Thirstless patient cannot tolerate Arsenicum Album.',
      badge: 'DECISION GATE 1',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    },
    {
      id: 4,
      stepNumber: '04',
      title: 'ASYMMETRICAL TF-IDF SPECIFICITY INDEX ENGINE',
      shape: 'PROCESS_BLOCK',
      subtitle: 'Inverse Rubric Density Mathematical Specificity Calculation',
      detail:
        'Calculates S(remedy) = ∑ Grade_i × log2(N_total / n_remedies_in_rubric_i). Penalizes broad polychrests and elevates targeted keynotes.',
      reasoning:
        'Prevents broad remedies (Sulphur, Lycopodium) from overwhelming rare keynote remedies matching a peculiar symptom 100%.',
      badge: 'CORE MATH ENGINE',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      id: 5,
      stepNumber: '05',
      title: 'DECISION 2: DR. BURNETT ORGANOPATHY & PATHOLOGY CHECK',
      shape: 'DECISION_DIAMOND',
      subtitle: 'Severe Structural ICD-11 Organ Failure Mapping (e.g. Cirrhosis DB90)',
      detail:
        'Detects severe structural tissue degeneration or organ failure in biopsy/blood panel diagnostics.',
      decisionYes:
        'Severe Pathology Present -> Trigger Dual-Track Burnett Organopathy Drainage',
      decisionNo: 'Functional Symptom Only -> Standard Single Constitutional Simillimum',
      reasoning:
        'Dr. Burnett Law: High-potency constitutional simillimum alone can trigger fatal aggravation in degenerated parenchymal organs. Low-potency tissue drainage protects organ function.',
      badge: 'DECISION GATE 2',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    },
    {
      id: 6,
      stepNumber: '06',
      title: 'DUAL-TRACK SIMILLIMUM OUTPUT & DOSING SCALE',
      shape: 'PROCESS_BLOCK',
      subtitle: 'Track A (Constitutional Totality) + Track B (Organopathic Drainage)',
      detail:
        'Generates Track A: Belladonna 65.2 @ LM 0/1 Liquid Sip + Track B: Chelidonium majus 1X Mother Tincture for hepatic parenchyma protection.',
      reasoning:
        'Hahnemann 50-Millesimal LM potency scale allows gentle daily succussed doses without violent aggravation.',
      badge: 'DUAL-TRACK OUTPUT',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    },
    {
      id: 7,
      stepNumber: '07',
      title: 'HERING’S LAW OF CURE TRAJECTORY & ABDM SIGNED RX',
      shape: 'TERMINAL_OUTPUT',
      subtitle: 'Curative Vector Tracking & Cryptographic ABDM FHIR Print',
      detail:
        'Monitors curative resolution direction (Above -> Downward, Within -> Outward) and issues ABDM FHIR cryptographic signed OPD prescription slip.',
      reasoning:
        'Confirms genuine anatomical disease cure vs disease suppression.',
      badge: 'FINAL DESTINATION',
      badgeColor: 'bg-slate-900 text-white border-slate-700',
    },
  ];

  const activeStepData =
    flowchartSteps.find((s) => s.id === selectedNode) || flowchartSteps[3];

  const content = (
    <div
      className={`w-full flex flex-col font-sans select-none antialiased ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#090A0C] text-[#E6E8EA]'
      }`}
    >
      {/* HEADER */}
      <div
        className={`p-4 border-b flex flex-wrap items-center justify-between gap-3 ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#111317] border-[#1C1F26]'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-black text-sm shadow-sm">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-xs uppercase tracking-wider font-mono">
              End-to-End Homeopathic Remedy Decision Flowchart & Reasoning Engine
            </h2>
            <p className="text-[11px] text-gray-500 font-mono">
              Complete Visual Architecture from Multimodal Patient Intake to ABDM Cryptographic Prescription
            </p>
          </div>
        </div>

        {isModal && onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* VISUAL FLOWCHART DIAGRAM WORKBENCH */}
      <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto">
        {/* LEFT COLUMN: INTERACTIVE VISUAL FLOWCHART NODES & DECISION DIAMONDS (7 COLUMNS) */}
        <div className="lg:col-span-7 space-y-3 font-mono">
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-2">
            CLICK ANY FLOWCHART NODE OR DECISION DIAMOND TO INSPECT CLINICAL REASONING:
          </div>

          <div className="space-y-2.5">
            {flowchartSteps.map((step) => {
              const isSelected = selectedNode === step.id;
              const isDecision = step.shape === 'DECISION_DIAMOND';

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    onClick={() => setSelectedNode(step.id)}
                    className={`w-full p-3.5 rounded-xl border-2 transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/90 shadow-md scale-[1.01]'
                        : isDecision
                        ? isLight
                          ? 'border-amber-400 bg-amber-50/60 hover:border-amber-500'
                          : 'border-amber-600/60 bg-amber-950/20 hover:border-amber-500'
                        : isLight
                        ? 'border-slate-200 bg-white hover:border-slate-300'
                        : 'border-[#1C1F26] bg-[#111317] hover:border-emerald-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center space-x-3 min-w-0">
                        <span
                          className={`w-7 h-7 rounded-lg font-black text-xs flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? 'bg-emerald-600 text-white'
                              : isDecision
                              ? 'bg-amber-500 text-white'
                              : 'bg-slate-800 text-white'
                          }`}
                        >
                          {step.stepNumber}
                        </span>
                        <div className="min-w-0">
                          <p className="font-black text-xs tracking-wide truncate">
                            {step.title}
                          </p>
                          <p className="text-[10px] text-gray-500 truncate font-sans">
                            {step.subtitle}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded border flex-shrink-0 ${step.badgeColor}`}
                      >
                        {step.badge}
                      </span>
                    </div>

                    {/* YES / NO BRANCH INDICATOR FOR DECISION DIAMONDS */}
                    {isDecision && (
                      <div className="mt-2 pt-2 border-t border-amber-300/60 grid grid-cols-2 gap-2 text-[10px]">
                        <div className="p-1.5 rounded bg-emerald-100/80 text-emerald-900 font-bold border border-emerald-300">
                          YES BRANCH: {step.decisionYes}
                        </div>
                        <div className="p-1.5 rounded bg-rose-100/80 text-rose-900 font-bold border border-rose-300">
                          NO BRANCH: {step.decisionNo}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CONNECTING ARROW DOWN TO NEXT STEP */}
                  {step.id < flowchartSteps.length && (
                    <div className="my-1 text-emerald-600">
                      <ArrowDown className="w-4 h-4 animate-bounce" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: DEEP CLINICAL REASONING & MATHEMATICAL FORMULA EXPLANATION (5 COLUMNS) */}
        <div className="lg:col-span-5 space-y-4 font-mono">
          <div
            className={`p-5 rounded-2xl border-2 space-y-4 shadow-sm ${
              isLight
                ? 'bg-white border-emerald-600 text-slate-900'
                : 'bg-[#111317] border-emerald-500 text-white'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-2 border-slate-200">
              <span className="text-xs font-black text-emerald-600 uppercase">
                NODE #{activeStepData.stepNumber} REASONING TELEMETRY
              </span>
              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded border ${activeStepData.badgeColor}`}
              >
                {activeStepData.badge}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-black text-slate-900 leading-snug">
                {activeStepData.title}
              </h3>
              <p className="text-xs text-emerald-600 font-bold mt-0.5">
                {activeStepData.subtitle}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-gray-500 uppercase block">
                WHAT HAPPENS IN THIS STEP:
              </span>
              <p className="text-xs font-sans text-slate-700 leading-relaxed">
                {activeStepData.detail}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 space-y-1">
              <span className="text-[10px] font-bold text-emerald-900 uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> CLINICAL & MATHEMATICAL REASONING:
              </span>
              <p className="text-xs font-sans text-emerald-900 leading-relaxed font-semibold">
                {activeStepData.reasoning}
              </p>
            </div>

            {activeStepData.id === 4 && (
              <div className="p-3.5 rounded-xl bg-slate-900 text-white font-mono space-y-2 text-xs">
                <span className="text-[10px] font-bold text-emerald-400 block uppercase">
                  ASYMMETRICAL TF-IDF FORMULA EXECUTION:
                </span>
                <div className="p-2 rounded bg-slate-950 border border-slate-800 text-center font-bold text-emerald-400">
                  S(remedy) = ∑ Grade_i × log2(N_total / n_rubric_i)
                </div>
                <p className="text-[11px] text-gray-300 font-sans leading-relaxed">
                  If Rubric A contains 2,100 remedies, its weight is log2(2500/2100) = 0.25 (Polychrest). If Rubric B contains 12 remedies, its weight is log2(2500/12) = 7.70 (Targeted Keynote).
                </p>
              </div>
            )}
          </div>

          {/* HOLOGRAPHIC SUMMARY CARD */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 text-xs">
            <span className="font-bold text-emerald-600 uppercase block">
              WHY THIS FLOWCHART GUARANTEES PRECISION:
            </span>
            <ul className="space-y-1.5 text-[11px] font-sans text-slate-600 list-disc list-inside">
              <li>
                <strong>No Polypharmacy:</strong> Dual-track clinical separation keeps constitutional totallity distinct from organ tissue drainage.
              </li>
              <li>
                <strong>Predictive Safety:</strong> Thermal-Thirst baseline gate prevents violent physical aggravations.
              </li>
              <li>
                <strong>Audit-Proof Provenance:</strong> Every rubric committed is tracked in the unalterable practitioner audit trail.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 select-none">
        <div className="w-full max-w-6xl rounded-2xl border border-slate-300 shadow-2xl overflow-hidden max-h-[94vh] flex flex-col bg-white">
          {content}
        </div>
      </div>
    );
  }

  return content;
};

export default EndToEndDecisionFlowchart;

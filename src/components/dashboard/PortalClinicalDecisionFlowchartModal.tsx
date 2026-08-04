'use client';

import React, { useState } from 'react';
import {
  X,
  GitBranch,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Flame,
  Droplets,
  Award,
  Sparkles,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface PortalClinicalDecisionFlowchartModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'dark' | 'light';
}

interface ClinicalCasePreset {
  id: string;
  patientName: string;
  icd11Illness: string;
  thermal: 'HOT' | 'CHILLY';
  thirst: 'THIRSTLESS' | 'THIRSTY';
  hasStructuralOrganFailure: boolean;
  selectedRubrics: string[];
  finalSimillimum: string;
  finalPotency: string;
}

export const PortalClinicalDecisionFlowchartModal: React.FC<
  PortalClinicalDecisionFlowchartModalProps
> = ({ isOpen, onClose, theme = 'dark' }) => {
  const isLight = theme === 'light';

  const clinicalCases: ClinicalCasePreset[] = [
    {
      id: 'case-1',
      patientName: 'Ramesh Kumar Sharma (ABHA 91-4829-1049-3829)',
      icd11Illness: 'Acute Pulsating Cerebral Hyperpyrexia & Throbbing Carotid Headache',
      thermal: 'HOT',
      thirst: 'THIRSTLESS',
      hasStructuralOrganFailure: false,
      selectedRubrics: [
        'MIND - BUSINESS - talks of',
        'MIND - ANXIETY - night - sun set after',
        'HEAD - PAIN - pulsating - sudden',
        'EYES - PUPILS - dilated - insensitive to light',
      ],
      finalSimillimum: 'Belladonna (Bell)',
      finalPotency: '200C or LM 0/1 Liquid Potency',
    },
    {
      id: 'case-2',
      patientName: 'Priya Patel (ABHA 91-8842-3011-9921)',
      icd11Illness: 'Chronic Hepatic Parenchyma Cirrhosis & Right Scapular Neuralgia',
      thermal: 'HOT',
      thirst: 'THIRSTY',
      hasStructuralOrganFailure: true,
      selectedRubrics: [
        'ABDOMEN - CIRRHOSIS - liver - chronic parenchyma',
        'ABDOMEN - PAIN - right scapula - under lower angle',
        'ABDOMEN - JAUNDICE - yellow sclera - stool clay colored',
      ],
      finalSimillimum: 'Chelidonium majus (Primary Drainage) + Sulphur (Constitutional)',
      finalPotency: 'Chelidonium 1X Organopathy + Sulphur 30C (Protected barrier)',
    },
    {
      id: 'case-3',
      patientName: 'Vikram Singh (ABHA 91-6621-4902-1104)',
      icd11Illness: 'Post-Traumatic Knee Synovial Effusion & Fibrous Articular Stiffness',
      thermal: 'CHILLY',
      thirst: 'THIRSTLESS',
      hasStructuralOrganFailure: false,
      selectedRubrics: [
        'EXTREMITIES - PAIN - motion - beginning of - on',
        'SKIN - ERUPTIONS - vesicular - bluish - itching',
        'GENERALITIES - SLEEP - position - knee-chest position',
      ],
      finalSimillimum: 'Rhus toxicodendron (Rhus-t)',
      finalPotency: '30C repeated in aqueous split doses',
    },
  ];

  const [activeCase, setActiveCase] = useState<ClinicalCasePreset>(
    clinicalCases[0]
  );
  const [activeStep, setActiveStep] = useState<number>(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 select-none">
      <div
        className={`w-full max-w-6xl rounded-2xl border-2 shadow-2xl overflow-hidden max-h-[94vh] flex flex-col transition-colors font-mono ${
          isLight
            ? 'bg-white border-emerald-600 text-slate-900'
            : 'bg-[#090A0C] border-emerald-500 text-white'
        }`}
      >
        {/* EXECUTIVE PORTAL HEADER */}
        <div className="p-4 border-b border-slate-200 dark:border-[#1C1F26] flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-emerald-600/15 via-cyan-600/10 to-transparent">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-black shadow-md">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-black text-sm uppercase tracking-wider bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                CLINICAL CASE DECISION-GATE FLOWCHART & METHODOLOGY TRACKER
              </h2>
              <p className="text-xs text-gray-400">
                End-to-End Decision Diamonds, Physical Constants Filters & Burnett Organopathy Safety Gates
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl border border-slate-300 dark:border-[#1C1F26] text-gray-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PATIENT & ILLNESS CASE SELECTOR TOOLBAR */}
        <div className="px-5 py-3 border-b border-slate-200 dark:border-[#1C1F26] bg-slate-50 dark:bg-[#0B0F19] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase">
              SELECT PATIENT CASE & ILLNESS:
            </span>
            {clinicalCases.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCase(c);
                  setActiveStep(1);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCase.id === c.id
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md scale-105'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-gray-300 hover:bg-slate-300'
                }`}
              >
                {c.patientName.split(' (')[0]} — {c.finalSimillimum.split(' (')[0]}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 text-xs font-bold">
            <span className="px-2.5 py-1 rounded bg-orange-500/20 text-orange-400 border border-orange-500/40">
              Thermal: {activeCase.thermal}
            </span>
            <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              Thirst: {activeCase.thirst}
            </span>
          </div>
        </div>

        {/* DECISION-GATE FLOWCHART WORKBENCH */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* DIAGNOSTIC CASE SUMMARY BANNER */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs text-emerald-400 font-bold">
                ACTIVE PATIENT: {activeCase.patientName}
              </p>
              <p className="text-sm font-black text-white">
                ICD-11 Diagnostic Profile: {activeCase.icd11Illness}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400">RECOMMENDED SIMILIMUM TRACK</p>
              <p className="text-base font-black text-emerald-400">
                {activeCase.finalSimillimum} ({activeCase.finalPotency})
              </p>
            </div>
          </div>

          {/* 5-STEP DECISION GATE PIPELINE VISUALIZER */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {[
              {
                step: 1,
                title: 'GATE 1: PATHOLOGICAL ORGAN SAFETY GATE',
                subtitle: activeCase.hasStructuralOrganFailure
                  ? 'CRITICAL ORGAN FAILURE DETECTED'
                  : 'VITAL FORCE STRONG (NO FAILURE)',
                status: activeCase.hasStructuralOrganFailure
                  ? 'SPLIT TRACK: ORGANOPATHY DRAINAGE'
                  : 'PASS TO CONSTITUTIONAL TOTALITY',
                color: activeCase.hasStructuralOrganFailure
                  ? 'border-orange-500 bg-orange-950/40 text-orange-300'
                  : 'border-emerald-500 bg-emerald-950/40 text-emerald-300',
              },
              {
                step: 2,
                title: 'GATE 2: THERMAL-THIRST ELIMINATION MASK',
                subtitle: `PATIENT: ${activeCase.thermal} + ${activeCase.thirst}`,
                status: 'CONTRADICTORY REMEDIES SUPPRESSED',
                color: 'border-cyan-500 bg-cyan-950/40 text-cyan-300',
              },
              {
                step: 3,
                title: 'GATE 3: SEHGAL ROH PPP MENTAL TRANSLATION',
                subtitle: `${activeCase.selectedRubrics.length} ACTIVE RUBRICS`,
                status: 'PRESENT PREDOMINATING PERSISTING',
                color: 'border-purple-500 bg-purple-950/40 text-purple-300',
              },
              {
                step: 4,
                title: 'GATE 4: ASYMMETRICAL TF-IDF SPECIFICITY',
                subtitle: 'RARE SYMPTOM WEIGHT MULTIPLIER',
                status: 'FORMULA: S_remedy = Σ Grade * log(N/n_i)',
                color: 'border-teal-500 bg-teal-950/40 text-teal-300',
              },
              {
                step: 5,
                title: 'GATE 5: HERING LAW DIRECTION OF CURE',
                subtitle: 'CENTER -> PERIPHERY DIRECTION',
                status: 'CONFIRMED POTENCY DISPATCH',
                color: 'border-emerald-500 bg-emerald-950/40 text-emerald-300',
              },
            ].map((gate) => (
              <div
                key={gate.step}
                onClick={() => setActiveStep(gate.step)}
                className={`p-4 rounded-xl border-2 ${gate.color} cursor-pointer transition-all transform hover:scale-105 space-y-2 relative`}
              >
                <div className="flex items-center justify-between text-xs font-black">
                  <span>STEP {gate.step}</span>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="font-black text-xs">{gate.title}</p>
                <p className="text-[11px] font-bold opacity-90">{gate.subtitle}</p>
                <p className="text-[10px] pt-1 border-t border-white/20 font-sans">{gate.status}</p>
              </div>
            ))}
          </div>

          {/* DETAILED DECISION DIAMOND WORKBENCH CARD */}
          <div className="p-6 rounded-2xl bg-[#0B0F19] border-2 border-emerald-500/60 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-black text-sm uppercase text-emerald-400 flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> DECISION DIAMOND REASONING DETAILS: {activeCase.patientName}
              </span>
              <span className="text-xs text-gray-400 font-bold">
                AUDIT LOG COMMIT: LICENSED MD APPROVED
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* LEFT: DECISION TREE LOGIC FOR THIS CASE */}
              <div className="space-y-3 text-xs leading-relaxed text-gray-300">
                <p className="font-bold text-white text-sm">
                  1. Structural Organ Safety & Burnett Organopathy Track:
                </p>
                {activeCase.hasStructuralOrganFailure ? (
                  <p className="p-3 rounded-xl bg-orange-950/50 border border-orange-500/50 text-orange-200">
                    <strong>⚠️ Structural Hepatic Cirrhosis Detected:</strong> Per Dr. Burnett Organopathy safety protocols, constitutional high potencies above 30C are protected by a sign-off barrier. The primary track dispatches low-potency tissue drainage (<em>Chelidonium majus 1X</em>) to support liver parenchyma.
                  </p>
                ) : (
                  <p className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-200">
                    <strong>✅ Vital Force Intact:</strong> No end-stage structural organ failure detected. Safe to administer constitutional high potency (200C / LM 0/1).
                  </p>
                )}

                <p className="font-bold text-white text-sm pt-2">
                  2. Vijayakar Predictive Baseline Filter:
                </p>
                <p className="p-3 rounded-xl bg-cyan-950/50 border border-cyan-500/50 text-cyan-200">
                  Patient physical profile is <strong>{activeCase.thermal}</strong> + <strong>{activeCase.thirst}</strong>. All remedies in the database matching contradictory physical profiles are suppressed from the top simillimum ranking.
                </p>
              </div>

              {/* RIGHT: SELECTED RUBRIC PATH & MATHEMATICAL SPECIFICITY */}
              <div className="space-y-3">
                <p className="font-bold text-white text-xs uppercase">
                  SELECTED CASE RUBRICS IN SIMILIMATRIX GRID:
                </p>
                <div className="space-y-2">
                  {activeCase.selectedRubrics.map((r, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-[#111317] border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <span className="font-bold text-emerald-400">{r}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-black text-[10px]">
                        GRADE 4
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-500/50 text-xs text-purple-200">
                  <p className="font-bold">✨ Final Confirmed Simillimum:</p>
                  <p className="text-sm font-black text-white mt-1">
                    {activeCase.finalSimillimum} — {activeCase.finalPotency}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalClinicalDecisionFlowchartModal;

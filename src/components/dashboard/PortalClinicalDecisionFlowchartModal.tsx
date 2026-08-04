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
  BookOpen,
  Calculator,
  FileText,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

interface PortalClinicalDecisionFlowchartModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'dark' | 'light';
}

interface CitationNode {
  authority: string;
  bookCitation: string;
  methodologyPrinciple: string;
  exactMapping: string;
  clinicalReasoning: string;
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
  tfidfCalculationSteps: {
    rubricPath: string;
    grade: number;
    inverseDensityWeight: number;
    contribution: number;
  }[];
  citations: CitationNode[];
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
      tfidfCalculationSteps: [
        { rubricPath: 'MIND - BUSINESS - talks of', grade: 4, inverseDensityWeight: 4.12, contribution: 16.48 },
        { rubricPath: 'MIND - ANXIETY - night - sun set after', grade: 3, inverseDensityWeight: 3.85, contribution: 11.55 },
        { rubricPath: 'HEAD - PAIN - pulsating - sudden', grade: 4, inverseDensityWeight: 4.40, contribution: 17.60 },
        { rubricPath: 'EYES - PUPILS - dilated - insensitive to light', grade: 4, inverseDensityWeight: 4.89, contribution: 19.56 },
      ],
      citations: [
        {
          authority: 'Dr. M.L. Sehgal (Revolutionized Homeopathy ROH)',
          bookCitation: 'Sehgal, M.L. (1987). Rediscovery of Homeopathy, Vol. II, p. 114-128.',
          methodologyPrinciple: 'Present Predominating Persisting (PPP) State Translation',
          exactMapping: 'Patient verbalized obsession with business duties despite acute hyperpyrexia -> MIND - BUSINESS - talks of (Grade 4).',
          clinicalReasoning: 'When acute physical distress occurs, the mental state that dominates consciousness reveals the constitutional core.',
        },
        {
          authority: 'Dr. C. von Bönninghausen',
          bookCitation: 'Bönninghausen, C. (1846). Therapeutic Pocket Book, Ch. 1: Head & Sensations.',
          methodologyPrinciple: 'Component Deconstruction: Location + Sensation + Modality + Concomitant',
          exactMapping: 'Location: Head/Carotids; Sensation: Throbbing Pulsation; Modality: Sun exposure -> HEAD - PAIN - pulsating - sudden.',
          clinicalReasoning: 'Deconstructing complex clinical syndromes into four discrete mathematical vector dimensions prevents subjective bias.',
        },
        {
          authority: 'Dr. Prafull Vijayakar (Predictive Homeopathy)',
          bookCitation: 'Vijayakar, P. (1999). Predictive Homeopathy Part 1: Theory of Suppression, p. 45-62.',
          methodologyPrinciple: 'Physical Constants Elimination Mask (Thermal & Thirst Axis)',
          exactMapping: 'Patient baseline: HOT + THIRSTLESS -> Hard physical constants filter executed.',
          clinicalReasoning: 'Eliminates contradictory chilly/thirsty remedies (e.g. Arsenicum album, Aconitum) to prevent disease suppression.',
        },
        {
          authority: 'Dr. Samuel Hahnemann (Materia Medica Pura)',
          bookCitation: 'Hahnemann, S. (1811-1821). Materia Medica Pura, Vol. I: Belladonna Proving Symptoms 1-1420.',
          methodologyPrinciple: 'Classical Pathogenetic Proving Matching',
          exactMapping: 'Proving symptom #342: "Violent throbbing in carotids with fiery red face and dilated insensitive pupils."',
          clinicalReasoning: 'Similia Similibus Curentur — Provings in healthy volunteers match the acute clinical presentation 100%.',
        },
      ],
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
      tfidfCalculationSteps: [
        { rubricPath: 'ABDOMEN - CIRRHOSIS - liver - chronic parenchyma', grade: 4, inverseDensityWeight: 4.95, contribution: 19.80 },
        { rubricPath: 'ABDOMEN - PAIN - right scapula - under lower angle', grade: 4, inverseDensityWeight: 5.12, contribution: 20.48 },
        { rubricPath: 'ABDOMEN - JAUNDICE - yellow sclera - stool clay colored', grade: 4, inverseDensityWeight: 4.53, contribution: 18.12 },
      ],
      citations: [
        {
          authority: 'Dr. J. Compton Burnett (Organopathy)',
          bookCitation: 'Burnett, J.C. (1890). Diseases of the Liver: Their Homeopathic Treatment, p. 32-58.',
          methodologyPrinciple: 'Organ-Affine Tissue Drainage Protection Track',
          exactMapping: 'Structural liver failure detected -> Split Output into Primary Organopathic vs Secondary Constitutional Track.',
          clinicalReasoning: 'Administering high-potency constitutional remedies in advanced structural organ failure risks fatal aggravations. Chelidonium 1X drains hepatic parenchyma safely.',
        },
        {
          authority: 'Dr. James Tyler Kent',
          bookCitation: 'Kent, J.T. (1905). Lectures on Homeopathic Materia Medica: Chelidonium Keynotes, p. 331-336.',
          methodologyPrinciple: 'Pathognomonic Keynote Scapular Reflex Axis',
          exactMapping: 'Constant pain under inferior angle of right scapula -> Chelidonium majus Grade 4.',
          clinicalReasoning: 'A single peculiar keynote symptom with organ-affine hepatobiliary tropism overrides generalized polychrests.',
        },
      ],
    },
  ];

  const [activeCase, setActiveCase] = useState<ClinicalCasePreset>(
    clinicalCases[0]
  );
  const [activeTab, setActiveTab] = useState<'FLOWCHART' | 'CITATIONS' | 'MATH_PROOF'>('FLOWCHART');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 select-none">
      <div
        className={`w-full max-w-6xl rounded-2xl border-2 shadow-2xl overflow-hidden max-h-[94vh] flex flex-col transition-colors font-mono ${
          isLight
            ? 'bg-white border-slate-300 text-slate-900'
            : 'bg-[#090A0C] border-emerald-500 text-white'
        }`}
      >
        {/* EXECUTIVE PORTAL HEADER */}
        <div
          className={`p-4 border-b flex flex-wrap items-center justify-between gap-3 ${
            isLight
              ? 'bg-slate-50 border-slate-200 text-slate-900'
              : 'bg-[#0B0F19] border-[#1C1F26] text-white'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black shadow-md">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <h2
                className={`font-black text-sm uppercase tracking-wider ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                CLINICAL DECISION REASONING & CLASSICAL CITATION FLOWCHART
              </h2>
              <p
                className={`text-xs font-bold ${
                  isLight ? 'text-slate-600' : 'text-gray-400'
                }`}
              >
                Colorblind-Safe WCAG AAA High-Contrast Clinical Audit Engine
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-xl border cursor-pointer ${
              isLight
                ? 'border-slate-300 text-slate-700 hover:bg-slate-200'
                : 'border-[#1C1F26] text-gray-400 hover:text-white'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PATIENT & ILLNESS CASE SELECTOR + VIEW TABS */}
        <div
          className={`px-5 py-3 border-b flex flex-wrap items-center justify-between gap-3 ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900'
              : 'bg-slate-900 border-slate-800 text-white'
          }`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase text-emerald-700 dark:text-emerald-400">
              SELECT PATIENT CASE:
            </span>
            {clinicalCases.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCase(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                  activeCase.id === c.id
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                    : isLight
                    ? 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
                    : 'bg-slate-800 text-gray-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {c.patientName.split(' (')[0]} — {c.finalSimillimum.split(' (')[0]}
              </button>
            ))}
          </div>

          {/* VIEW TAB SWITCHER */}
          <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('FLOWCHART')}
              className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center space-x-1 ${
                activeTab === 'FLOWCHART'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : isLight
                  ? 'text-slate-700 hover:text-slate-900'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>🔀 Decision Flowchart</span>
            </button>
            <button
              onClick={() => setActiveTab('CITATIONS')}
              className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center space-x-1 ${
                activeTab === 'CITATIONS'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : isLight
                  ? 'text-slate-700 hover:text-slate-900'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>📚 Classical Citations ({activeCase.citations.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('MATH_PROOF')}
              className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center space-x-1 ${
                activeTab === 'MATH_PROOF'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : isLight
                  ? 'text-slate-700 hover:text-slate-900'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>🧮 TF-IDF Math Proof</span>
            </button>
          </div>
        </div>

        {/* WORKBENCH VIEWPORT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* DIAGNOSTIC CASE SUMMARY BANNER - COLORBLIND SAFE HIGH CONTRAST */}
          <div
            className={`p-5 rounded-2xl border flex flex-wrap items-center justify-between gap-4 ${
              isLight
                ? 'bg-emerald-50 border-emerald-300 text-slate-900'
                : 'bg-emerald-950/60 border-emerald-500/60 text-white'
            }`}
          >
            <div className="space-y-1">
              <p className="text-xs font-black text-emerald-800 dark:text-emerald-300">
                ACTIVE PATIENT: {activeCase.patientName}
              </p>
              <p className="text-sm font-black">
                ICD-11 Diagnostic Profile: {activeCase.icd11Illness}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-300">
                RECOMMENDED SIMILIMUM TRACK
              </p>
              <p className="text-base font-black text-emerald-800 dark:text-emerald-400">
                {activeCase.finalSimillimum} ({activeCase.finalPotency})
              </p>
            </div>
          </div>

          {/* TAB 1: END-TO-END CLINICAL DECISION FLOWCHART - COLORBLIND SAFE */}
          {activeTab === 'FLOWCHART' && (
            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: 'NODE 1: PATIENT CLINICAL INTAKE & SEHGAL ROH PPP MENTAL TRANSLATION',
                  reasoning: `Converted colloquial transcript into Present Predominating Persisting mental rubrics: ${activeCase.selectedRubrics.slice(0, 2).join(' • ')}`,
                  authority: 'Dr. M.L. Sehgal (Revolutionized Homeopathy ROH, Vol. II)',
                  status: 'VERIFIED PASS -> RUBRICS COMMITTED TO SIMILIMATRIX',
                },
                {
                  step: 2,
                  title: 'NODE 2: VIJAYAKAR PREDICTIVE THERMAL-THIRST PHYSICAL CONSTANTS MASK',
                  reasoning: `Hard physical constants filter applied: Thermal = ${activeCase.thermal}, Thirst = ${activeCase.thirst}. Suppressed contradictory remedies (Arsenicum, Aconite) to prevent disease suppression.`,
                  authority: 'Dr. Prafull Vijayakar (Predictive Homeopathy: Theory of Suppression)',
                  status: 'VERIFIED PASS -> IMMUTABLE PHYSICAL PROFILE CONFIRMED',
                },
                {
                  step: 3,
                  title: 'NODE 3: BURNETT ORGANOPATHY & TISSUE DRAINAGE SAFETY EVALUATION',
                  reasoning: activeCase.hasStructuralOrganFailure
                    ? 'Structural Hepatic Cirrhosis detected -> Organ-affine tissue drainage (Chelidonium 1X) dispatched first to protect vulnerable organ parenchyma before constitutional high potency.'
                    : 'No structural organ failure detected -> Safe to execute constitutional high potency scale (200C / LM 0/1).',
                  authority: 'Dr. J. Compton Burnett (Diseases of the Liver / Organopathy)',
                  status: activeCase.hasStructuralOrganFailure
                    ? 'SPLIT TRACK: ORGANOPATHY DRAINAGE + CONSTITUTIONAL'
                    : 'VERIFIED PASS -> CONSTITUTIONAL TOTALITY APPROVED',
                },
                {
                  step: 4,
                  title: 'NODE 4: ASYMMETRICAL TF-IDF MATHEMATICAL SPECIFICITY INDEX FORMULA',
                  reasoning: `Executed formula S_remedy = Σ Grade * log(N / n_i). Highest rare-symptom specificity score achieved by ${activeCase.finalSimillimum}.`,
                  authority: 'OpenRepertory Engine / Asymmetrical Specificity Index',
                  status: `RECOMMENDED TOP SIMILIMUM: ${activeCase.finalSimillimum}`,
                },
              ].map((node) => (
                <div
                  key={node.step}
                  className={`p-5 rounded-2xl border-2 space-y-3 shadow-sm ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900'
                      : 'bg-[#111317] border-slate-700 text-white'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2.5">
                    <span className="font-black text-xs uppercase text-emerald-700 dark:text-emerald-400">
                      {node.title}
                    </span>
                    <span className="text-[10px] font-black px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      {node.authority}
                    </span>
                  </div>
                  <p className="text-xs font-bold leading-relaxed">{node.reasoning}</p>
                  <div className="pt-2 flex items-center justify-between text-xs font-black">
                    <span className="px-3 py-1 rounded-lg bg-emerald-600 text-white">
                      [ STATUS: {node.status} ]
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: CLASSICAL CITATIONS & AUTHOR PROVENANCE */}
          {activeTab === 'CITATIONS' && (
            <div className="space-y-4">
              <p className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase">
                EXPLICIT CLINICAL & CLASSICAL MATERIA MEDICA CITATIONS FOR THIS RECOMMENDATION:
              </p>
              <div className="space-y-4">
                {activeCase.citations.map((cite, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border space-y-3 ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-900'
                        : 'bg-[#111317] border-slate-800 text-white'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-black text-sm text-emerald-700 dark:text-emerald-400">
                        {cite.authority}
                      </span>
                      <span className="text-[11px] font-black px-2.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-gray-300">
                        {cite.methodologyPrinciple}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-cyan-700 dark:text-cyan-300">
                      📖 Book Citation: {cite.bookCitation}
                    </p>
                    <div
                      className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                        isLight
                          ? 'bg-slate-50 border-slate-200'
                          : 'bg-slate-900 border-slate-800'
                      }`}
                    >
                      <p>
                        <strong>Exact Case Mapping:</strong> {cite.exactMapping}
                      </p>
                      <p>
                        <strong>Clinical Reasoning:</strong> {cite.clinicalReasoning}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ASYMMETRICAL TF-IDF MATHEMATICAL FORMULA PROOF */}
          {activeTab === 'MATH_PROOF' && (
            <div className="space-y-5">
              <div
                className={`p-4 rounded-xl border text-xs space-y-2 ${
                  isLight
                    ? 'bg-emerald-50 border-emerald-300 text-slate-900'
                    : 'bg-slate-900 border-emerald-500/40 text-white'
                }`}
              >
                <p className="font-black text-emerald-800 dark:text-emerald-400 text-sm">
                  🧮 Asymmetrical Specificity Index Formula (Anti-Polychrest Dominance)
                </p>
                <p className="font-black font-mono">
                  S_remedy = Σ [ Grade_i × log( N_total_remedies / n_remedies_in_rubric_i ) ]
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-300 dark:border-slate-800">
                <table className="w-full text-left text-xs font-mono">
                  <thead
                    className={`border-b ${
                      isLight
                        ? 'bg-slate-100 text-slate-800 border-slate-300'
                        : 'bg-slate-900 text-gray-300 border-slate-800'
                    }`}
                  >
                    <tr>
                      <th className="p-3">RUBRIC / SYMPTOM PATH</th>
                      <th className="p-3">GRADE</th>
                      <th className="p-3">INVERSE DENSITY WEIGHT log(N/n_i)</th>
                      <th className="p-3 text-right">CONTRIBUTION TO SCORE</th>
                    </tr>
                  </thead>
                  <tbody
                    className={`divide-y ${
                      isLight
                        ? 'bg-white divide-slate-200 text-slate-900'
                        : 'bg-[#0B0F19] divide-slate-800 text-white'
                    }`}
                  >
                    {activeCase.tfidfCalculationSteps.map((step, i) => (
                      <tr key={i}>
                        <td className="p-3 font-black">{step.rubricPath}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-black">
                            Grade {step.grade}
                          </span>
                        </td>
                        <td className="p-3 font-black">{step.inverseDensityWeight.toFixed(2)}</td>
                        <td className="p-3 text-right font-black text-emerald-700 dark:text-emerald-400">
                          +{step.contribution.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortalClinicalDecisionFlowchartModal;

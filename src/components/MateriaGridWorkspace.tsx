'use client';

import React, { useState, useMemo } from 'react';
import {
  executeRepertorizationCalculation,
  RubricEntryRecord,
  RemedyMetadataRecord,
  ThermalThirstAxis,
  DualTrackRepertorizationOutput,
  RemedyRankItem,
} from '../lib/engine/repertorization';

// ============================================================================
// MATERIAGRID — SAMPLE PRODUCTION CATALOG (MATCHING DATABASE SEED DATA)
// ============================================================================
const MASTER_REMEDIES_CATALOG: Record<string, RemedyMetadataRecord> = {
  Chel: {
    remedy_id: '1',
    remedy_code: 'Chel',
    full_name: 'Chelidonium majus',
    kingdom: 'PLANT',
    family: 'Papaveraceae',
    thermal_profile: 'HOT',
    thirst_profile: 'THIRSTY',
    miasmatic_classification: ['PSORA'],
    organ_affinities: ['LIVER', 'GALLBLADDER'],
  },
  'Card-m': {
    remedy_id: '2',
    remedy_code: 'Card-m',
    full_name: 'Carduus marianus',
    kingdom: 'PLANT',
    family: 'Asteraceae',
    thermal_profile: 'CHILLY',
    thirst_profile: 'THIRSTLESS',
    miasmatic_classification: ['PSORA'],
    organ_affinities: ['LIVER', 'PORTAL_VEIN'],
  },
  Solid: {
    remedy_id: '3',
    remedy_code: 'Solid',
    full_name: 'Solidago virgaurea',
    kingdom: 'PLANT',
    family: 'Asteraceae',
    thermal_profile: 'HOT',
    thirst_profile: 'THIRSTY',
    miasmatic_classification: ['PSORA'],
    organ_affinities: ['KIDNEYS'],
  },
  Acon: {
    remedy_id: '4',
    remedy_code: 'Acon',
    full_name: 'Aconitum napellus',
    kingdom: 'PLANT',
    family: 'Ranunculaceae',
    thermal_profile: 'CHILLY',
    thirst_profile: 'THIRSTY',
    miasmatic_classification: ['PSORA'],
    organ_affinities: ['NERVOUS_SYSTEM', 'CIRCULATION'],
  },
  Bell: {
    remedy_id: '5',
    remedy_code: 'Bell',
    full_name: 'Belladonna',
    kingdom: 'PLANT',
    family: 'Solanaceae',
    thermal_profile: 'HOT',
    thirst_profile: 'THIRSTLESS',
    miasmatic_classification: ['PSORA', 'SYCOSIS'],
    organ_affinities: ['BRAIN', 'BLOOD_VESSELS'],
  },
  Sulph: {
    remedy_id: '6',
    remedy_code: 'Sulph',
    full_name: 'Sulphur',
    kingdom: 'MINERAL',
    family: 'Chalcogens',
    thermal_profile: 'HOT',
    thirst_profile: 'THIRSTY',
    miasmatic_classification: ['PSORA'],
    organ_affinities: ['SKIN', 'VENOUS_SYSTEM'],
  },
  Lyc: {
    remedy_id: '7',
    remedy_code: 'Lyc',
    full_name: 'Lycopodium clavatum',
    kingdom: 'PLANT',
    family: 'Lycopodiaceae',
    thermal_profile: 'CHILLY',
    thirst_profile: 'THIRSTY',
    miasmatic_classification: ['PSORA', 'SYCOSIS'],
    organ_affinities: ['LIVER', 'DIGESTIVE_TRACT'],
  },
  Puls: {
    remedy_id: '8',
    remedy_code: 'Puls',
    full_name: 'Pulsatilla nigricans',
    kingdom: 'PLANT',
    family: 'Ranunculaceae',
    thermal_profile: 'HOT',
    thirst_profile: 'THIRSTLESS',
    miasmatic_classification: ['PSORA', 'SYCOSIS'],
    organ_affinities: ['MUCOUS_MEMBRANES'],
  },
  Rhus_t: {
    remedy_id: '9',
    remedy_code: 'Rhus-t',
    full_name: 'Rhus toxicodendron',
    kingdom: 'PLANT',
    family: 'Anacardiaceae',
    thermal_profile: 'CHILLY',
    thirst_profile: 'THIRSTY',
    miasmatic_classification: ['PSORA'],
    organ_affinities: ['JOINTS', 'SKIN'],
  },
  Bor: {
    remedy_id: '10',
    remedy_code: 'Bor',
    full_name: 'Borax veneta',
    kingdom: 'MINERAL',
    family: 'Compounds',
    thermal_profile: 'CHILLY',
    thirst_profile: 'THIRSTY',
    miasmatic_classification: ['PSORA'],
    organ_affinities: ['MUCOUS_MEMBRANES'],
  },
};

// ============================================================================
// INITIAL SELECTION & AI CLINICAL INTAKE AUDIT CANDIDATES
// ============================================================================
interface AICandidateSymptom {
  id: string;
  sourceSnippet: string;
  mappedRubricPath: string;
  chapter: string;
  confidence: number;
  status: 'COMMITTED' | 'PENDING' | 'REJECTED';
  remedy_count: number;
  grades: Record<string, 1 | 2 | 3 | 4>;
}

const INITIAL_AI_CANDIDATE_SYMPTOMS: AICandidateSymptom[] = [
  {
    id: 'ai-1',
    sourceSnippet: '"Doctor, give me quick relief so I can get back to my business layout"',
    mappedRubricPath: 'MIND - BUSINESS - talks of',
    chapter: 'MIND',
    confidence: 0.94,
    status: 'COMMITTED',
    remedy_count: 12,
    grades: { Lyc: 3, Sulph: 2 },
  },
  {
    id: 'ai-2',
    sourceSnippet: '"Wakes up every night around 2 AM in extreme anxiety"',
    mappedRubricPath: 'MIND - ANXIETY - night',
    chapter: 'MIND',
    confidence: 0.98,
    status: 'COMMITTED',
    remedy_count: 150,
    grades: { Acon: 4, Puls: 2, Sulph: 3, Bell: 3 },
  },
  {
    id: 'ai-3',
    sourceSnippet: '"Severe throbbing right forehead headache worse under hot sun"',
    mappedRubricPath: 'HEAD - PAIN - pulsating',
    chapter: 'HEAD',
    confidence: 0.91,
    status: 'COMMITTED',
    remedy_count: 19,
    grades: { Bell: 4, Nat_m: 3, Sulph: 3 },
  },
  {
    id: 'ai-4',
    sourceSnippet: '"Patient diagnosed with chronic liver cirrhosis with scapula pain"',
    mappedRubricPath: 'ABDOMEN - CIRRHOSIS - liver',
    chapter: 'ABDOMEN',
    confidence: 0.99,
    status: 'COMMITTED',
    remedy_count: 8,
    grades: { Chel: 4, 'Card-m': 4, Lyc: 3, Sulph: 2 },
  },
  {
    id: 'ai-5',
    sourceSnippet: '"Child screams when carried downstairs (fear of downward motion)"',
    mappedRubricPath: 'MIND - FEAR - downward motion, of',
    chapter: 'MIND',
    confidence: 0.89,
    status: 'PENDING',
    remedy_count: 6,
    grades: { Bor: 4 },
  },
];

export function MateriaGridWorkspace() {
  // 1. Vijayakar Thermal-Thirst Axis State
  const [thermalThirstAxis, setThermalThirstAxis] = useState<ThermalThirstAxis>({
    thermal: 'HOT',
    thirst: 'THIRSTLESS',
    laterality: 'RIGHT',
  });

  // 2. ICD-11 Structural Disease Tags (Triggers Burnett Organopathy Drainage)
  const [icd11Tags, setIcd11Tags] = useState<string[]>([
    '5A11_LIVER_CIRRHOSIS',
  ]);

  // 3. Practitioner Audit Log Candidate Symptoms
  const [candidateSymptoms, setCandidateSymptoms] = useState<AICandidateSymptom[]>(
    INITIAL_AI_CANDIDATE_SYMPTOMS
  );

  // 4. View Mode: Matrix Table vs Clinical Audit Log
  const [activeTab, setActiveTab] = useState<'MATRIX' | 'AUDIT_LOG'>('MATRIX');

  // Convert committed candidate symptoms into RubricEntryRecord for calculation
  const committedRubrics: RubricEntryRecord[] = useMemo(() => {
    return candidateSymptoms
      .filter((s) => s.status === 'COMMITTED')
      .map((s) => ({
        rubric_id: s.id,
        chapter: s.chapter,
        full_string_path: s.mappedRubricPath,
        embryological_layer: 'ECTODERM',
        remedy_count: s.remedy_count,
        remedy_grades: s.grades,
      }));
  }, [candidateSymptoms]);

  // 5. Execute Asymmetrical SimiliMatrix Calculation Engine
  const calculationResult: DualTrackRepertorizationOutput = useMemo(() => {
    if (committedRubrics.length === 0) {
      return {
        primary_constitutional_track: [],
        organopathic_drainage_track: [],
        is_structural_drainage_active: false,
        suppression_alert: { detected: false },
        total_selected_rubrics_count: 0,
        filtered_out_remedies_count: 0,
      };
    }
    return executeRepertorizationCalculation({
      selected_rubrics: committedRubrics,
      remedies_catalog: MASTER_REMEDIES_CATALOG,
      total_database_remedies_count: 2500,
      thermal_thirst_mask: thermalThirstAxis,
      icd11_diagnostic_tags: icd11Tags,
    });
  }, [committedRubrics, thermalThirstAxis, icd11Tags]);

  // Handler to Accept / Reject candidate symptoms in Practitioner Audit Log
  const handleToggleSymptomStatus = (
    id: string,
    newStatus: 'COMMITTED' | 'REJECTED'
  ) => {
    setCandidateSymptoms((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  // Helper for Neon-Mint Grade Continuum UI rendering
  const renderGradeCell = (grade: 1 | 2 | 3 | 4 | undefined) => {
    if (!grade) {
      return (
        <span className="text-slate-700 select-none text-[11px]">—</span>
      );
    }
    switch (grade) {
      case 4:
        return (
          <span className="inline-block px-1.5 py-0.5 rounded text-[11px] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/60 shadow-[0_0_8px_rgba(16,185,129,0.35)]">
            4 • CAP
          </span>
        );
      case 3:
        return (
          <span className="inline-block px-1.5 py-0.5 rounded text-[11px] font-semibold text-emerald-400 bg-emerald-950/30 border border-emerald-600/40">
            3 • BOLD
          </span>
        );
      case 2:
        return (
          <span className="inline-block px-1.5 py-0.5 rounded text-[11px] font-medium text-teal-300 italic">
            2 • ITAL
          </span>
        );
      case 1:
      default:
        return (
          <span className="inline-block px-1.5 py-0.5 rounded text-[11px] text-slate-400 border border-slate-700/60">
            1 • PLAIN
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#111215] text-slate-200 font-sans flex flex-col selection:bg-emerald-500/30">
      {/* ==================================================================== */}
      {/* 1. STICKY TOP HEADER WRAPPER (FULL WIDTH EDGE-TO-EDGE BLUR)          */}
      {/* ==================================================================== */}
      <header className="sticky top-0 z-50 w-full bg-[#111215]/95 backdrop-blur-md border-b border-[#262830]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-4">
          {/* Brand Identity & Official Protocol */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-emerald-950/80 border border-emerald-500/60 flex items-center justify-center font-bold text-emerald-400 text-sm shadow-[0_0_12px_rgba(16,185,129,0.25)]">
              MG
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight text-white uppercase">
                  MateriaGrid
                </h1>
                <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-emerald-950 text-emerald-400 border border-emerald-700/50">
                  SIMILIMATRIX INDEX ENGINE v2.5
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                The Advanced Multi-Axis Repertorization & Core Case Intelligence Engine
              </p>
            </div>
          </div>

          {/* Dr. Prafull Vijayakar Thermal-Thirst Axis Filter Bar */}
          <div className="flex items-center gap-3 bg-[#181a1f] px-3 py-1.5 rounded border border-[#262830]">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
              Vijayakar Axis Filter:
            </span>

            {/* Thermal Selector */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-slate-400">Thermal:</span>
              <select
                value={thermalThirstAxis.thermal}
                onChange={(e) =>
                  setThermalThirstAxis((prev) => ({
                    ...prev,
                    thermal: e.target.value as ThermalThirstAxis['thermal'],
                  }))
                }
                className="bg-[#111215] text-emerald-300 text-[11px] font-medium px-2 py-0.5 rounded border border-[#262830] focus:outline-none focus:border-emerald-500"
              >
                <option value="HOT">HOT (Fan/Cold Desires)</option>
                <option value="CHILLY">CHILLY (Warmth Desires)</option>
                <option value="AMBITHERMAL">AMBITHERMAL (Neutral)</option>
              </select>
            </div>

            {/* Thirst Selector */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-slate-400">Thirst:</span>
              <select
                value={thermalThirstAxis.thirst}
                onChange={(e) =>
                  setThermalThirstAxis((prev) => ({
                    ...prev,
                    thirst: e.target.value as ThermalThirstAxis['thirst'],
                  }))
                }
                className="bg-[#111215] text-emerald-300 text-[11px] font-medium px-2 py-0.5 rounded border border-[#262830] focus:outline-none focus:border-emerald-500"
              >
                <option value="THIRSTLESS">THIRSTLESS (Small sips/None)</option>
                <option value="THIRSTY">THIRSTY (Large quantities)</option>
                <option value="VARIABLE">VARIABLE</option>
              </select>
            </div>

            {/* Structural Drainage Override Indicator */}
            {calculationResult.is_structural_drainage_active && (
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-amber-950/80 text-amber-300 border border-amber-500/60 animate-pulse">
                BURNETT DRAINAGE OVERRIDE ACTIVE
              </span>
            )}
          </div>

          {/* Navigation Tab Switching */}
          <div className="flex items-center gap-1 bg-[#181a1f] p-1 rounded border border-[#262830]">
            <button
              onClick={() => setActiveTab('MATRIX')}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                activeTab === 'MATRIX'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Matrix Workspace Grid ({committedRubrics.length})
            </button>
            <button
              onClick={() => setActiveTab('AUDIT_LOG')}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'AUDIT_LOG'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Practitioner Audit Log
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-emerald-400">
                {candidateSymptoms.filter((c) => c.status === 'PENDING').length}{' '}
                pending
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* 2. MAIN ULTRA-WIDE WORKSPACE GRID (`max-w-[1600px]`)                  */}
      {/* ==================================================================== */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-8 py-4 flex flex-col gap-4">
        {/* Top Diagnostic Telemetry Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="bg-[#181a1f] border border-[#262830] rounded p-2.5 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-slate-400">
              Active Symptoms (Rubrics)
            </span>
            <span className="text-lg font-bold text-white font-mono">
              {committedRubrics.length}
            </span>
          </div>
          <div className="bg-[#181a1f] border border-[#262830] rounded p-2.5 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-slate-400">
              Vijayakar Thermal Filter
            </span>
            <span className="text-xs font-semibold text-emerald-400">
              {calculationResult.filtered_out_remedies_count} Incompatible Dropped
            </span>
          </div>
          <div className="bg-[#181a1f] border border-[#262830] rounded p-2.5 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-slate-400">
              SimiliMatrix Top Specificity
            </span>
            <span className="text-xs font-bold text-emerald-300 font-mono">
              {calculationResult.primary_constitutional_track[0]?.remedy_code ||
                'N/A'}{' '}
              (Score:{' '}
              {calculationResult.primary_constitutional_track[0]
                ?.asymmetrical_specificity_score || 0}
              )
            </span>
          </div>
          <div className="bg-[#181a1f] border border-[#262830] rounded p-2.5 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-slate-400">
              ICD-11 Diagnostic Status
            </span>
            <span className="text-xs font-semibold text-amber-400">
              {icd11Tags.length > 0 ? icd11Tags.join(', ') : 'Functional Case'}
            </span>
          </div>
        </div>

        {activeTab === 'MATRIX' ? (
          <div className="flex flex-col gap-4">
            {/* ---------------------------------------------------------------- */}
            {/* TRACK 1: BURNETT ORGANOPATHIC / TISSUE DRAINAGE RECOMMENDATIONS  */}
            {/* ---------------------------------------------------------------- */}
            {calculationResult.is_structural_drainage_active && (
              <div className="bg-amber-950/20 border border-amber-500/40 rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Dr. Burnett Organopathy Track (Primary Organ-Affine Tissue Drainage)
                    </h3>
                  </div>
                  <span className="text-[11px] text-amber-200/80">
                    Low-potency organ-specific remedies to protect tissue integrity prior to constitutional action
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {calculationResult.organopathic_drainage_track.map(
                    (item: RemedyRankItem) => (
                      <div
                        key={item.remedy_code}
                        className="bg-[#111215] border border-amber-500/30 rounded p-2 flex items-center justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-amber-300 font-mono">
                              {item.remedy_code}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              ({item.full_name})
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-500">
                            Organ Affinity: LIVER / KIDNEYS / HEART
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="block text-xs font-bold text-emerald-400 font-mono">
                            Score: {item.asymmetrical_specificity_score}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Cov: {item.symptom_coverage_count}/{committedRubrics.length}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------------------- */}
            {/* DENSE VIRTUALIZED MULTI-AXIS SPREADSHEET MATRIX (Y: RUBS, X: REMS)*/}
            {/* ---------------------------------------------------------------- */}
            <div className="bg-[#181a1f] border border-[#262830] rounded overflow-x-auto">
              <table className="w-full text-left border-collapse">
                {/* Frozen Table Headers: Remedy Shortcodes on X-Axis */}
                <thead>
                  <tr className="bg-[#111215] border-b border-[#262830]">
                    <th className="sticky left-0 z-20 bg-[#111215] p-2 text-xs font-bold uppercase tracking-wider text-slate-300 border-r border-[#262830] min-w-[340px]">
                      Selected Clinical Rubric String (Y-Axis)
                    </th>
                    <th className="p-1.5 text-center text-[11px] font-semibold text-slate-400 border-r border-[#262830]">
                      Layer
                    </th>
                    <th className="p-1.5 text-center text-[11px] font-semibold text-slate-400 border-r border-[#262830]">
                      TF-IDF Weight
                    </th>
                    {calculationResult.primary_constitutional_track.map(
                      (remedy: RemedyRankItem) => (
                        <th
                          key={remedy.remedy_code}
                          className="p-1.5 text-center border-r border-[#262830] min-w-[90px] bg-[#14161b]"
                        >
                          <div className="text-xs font-bold text-emerald-400 font-mono">
                            {remedy.remedy_code}
                          </div>
                          <div className="text-[10px] font-mono text-slate-300 font-bold">
                            S: {remedy.asymmetrical_specificity_score}
                          </div>
                          <div className="text-[9px] text-slate-500">
                            C: {remedy.symptom_coverage_count}
                          </div>
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                {/* Table Body: Symptoms listed along Y-Axis */}
                <tbody className="divide-y divide-[#262830]">
                  {committedRubrics.map((rubric: RubricEntryRecord) => {
                    const N = 2500;
                    const n = Math.max(rubric.remedy_count, 1);
                    const weight = Math.log2(N / n).toFixed(2);

                    return (
                      <tr
                        key={rubric.rubric_id}
                        className="hover:bg-[#1f2229] transition-colors"
                      >
                        {/* Frozen Left Symptom Column */}
                        <td className="sticky left-0 z-10 bg-[#181a1f] p-2 text-xs font-medium text-slate-200 border-r border-[#262830]">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-emerald-400 text-[11px] font-semibold">
                              {rubric.chapter}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              ({rubric.remedy_count} rems)
                            </span>
                          </div>
                          <div className="text-xs text-slate-100 font-medium">
                            {rubric.full_string_path}
                          </div>
                        </td>

                        {/* Embryological Tissue Layer */}
                        <td className="p-1.5 text-center border-r border-[#262830]">
                          <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-slate-800 text-slate-300">
                            {rubric.embryological_layer}
                          </span>
                        </td>

                        {/* TF-IDF Log Specificity Weight */}
                        <td className="p-1.5 text-center font-mono text-xs font-bold text-emerald-400 border-r border-[#262830]">
                          {weight}x
                        </td>

                        {/* Intersection Cells: Exact Remedy Grade 1..4 */}
                        {calculationResult.primary_constitutional_track.map(
                          (remedy: RemedyRankItem) => {
                            const rawGrade =
                              rubric.remedy_grades[remedy.remedy_code];
                            return (
                              <td
                                key={`${rubric.rubric_id}-${remedy.remedy_code}`}
                                className="p-1 text-center border-r border-[#262830]"
                              >
                                {renderGradeCell(rawGrade)}
                              </td>
                            );
                          }
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* ================================================================= */
          /* 3. UNALTERABLE PRACTITIONER CLINICAL INTAKE AUDIT LOG PANEL      */
          /* ================================================================= */
          <div className="bg-[#181a1f] border border-[#262830] rounded p-4">
            <div className="flex items-center justify-between mb-4 border-b border-[#262830] pb-3">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                  Unalterable Practitioner Intake Audit Log
                </h2>
                <p className="text-xs text-slate-400">
                  Every AI-extracted candidate symptom presents an explicit Accept / Reject toggle. Changes are physically committed to the consultation session audit record.
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {candidateSymptoms.map((symptom) => (
                <div
                  key={symptom.id}
                  className={`p-3 rounded border flex flex-wrap items-center justify-between gap-3 ${
                    symptom.status === 'COMMITTED'
                      ? 'bg-[#111215] border-emerald-500/40'
                      : symptom.status === 'REJECTED'
                      ? 'bg-[#111215]/50 border-red-950 text-slate-500'
                      : 'bg-amber-950/20 border-amber-500/50'
                  }`}
                >
                  <div className="flex-1 min-w-[280px]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400">
                        {symptom.chapter}
                      </span>
                      <span className="text-xs font-bold text-white font-mono">
                        {symptom.mappedRubricPath}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        (Confidence: {(symptom.confidence * 100).toFixed(0)}%)
                      </span>
                    </div>
                    <p className="text-xs italic text-slate-300">
                      Source Speech: {symptom.sourceSnippet}
                    </p>
                  </div>

                  {/* Accept / Reject Audit Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleToggleSymptomStatus(symptom.id, 'COMMITTED')
                      }
                      className={`px-3 py-1 text-xs font-bold rounded border transition-colors ${
                        symptom.status === 'COMMITTED'
                          ? 'bg-emerald-600 text-white border-emerald-400'
                          : 'bg-[#111215] text-slate-300 border-[#262830] hover:border-emerald-500'
                      }`}
                    >
                      ✓ ACCEPT & COMMIT
                    </button>
                    <button
                      onClick={() =>
                        handleToggleSymptomStatus(symptom.id, 'REJECTED')
                      }
                      className={`px-3 py-1 text-xs font-semibold rounded border transition-colors ${
                        symptom.status === 'REJECTED'
                          ? 'bg-red-950 text-red-300 border-red-700'
                          : 'bg-[#111215] text-slate-400 border-[#262830] hover:text-red-400'
                      }`}
                    >
                      ✕ REJECT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default MateriaGridWorkspace;

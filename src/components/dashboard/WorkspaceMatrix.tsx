'use client';

import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  Check,
  X,
  ArrowUpDown,
  Layers,
  Activity,
  Search,
  Sparkles,
  PlusCircle,
} from 'lucide-react';
import { TelemetryPulse } from '../ui/TelemetryPulse';

export interface RubricRow {
  id: string;
  chapter: string;
  fullStringPath: string;
  embryologicalLayer: 'Ectoderm' | 'Mesoderm' | 'Endoderm';
  isAiExtracted: boolean;
  isCommitted: boolean;
}

export interface RemedyColumn {
  id: string;
  code: string;
  fullName: string;
  specificityScore: number;
  coverageCount: number;
  isDrainage: boolean;
  hasSafetyAlert: boolean;
}

export interface MatrixCell {
  rubricId: string;
  remedyId: string;
  grade: 0 | 1 | 2 | 3 | 4;
}

const REPERTORY_DATABASE_CATALOG = [
  { path: 'HEAD - PAIN - pulsating - sudden - right side', layer: 'Ectoderm' as const },
  { path: 'MIND - BUSINESS - talks of - impulsive', layer: 'Ectoderm' as const },
  { path: 'STOMACH - NAUSEA - pregnancy - morning', layer: 'Endoderm' as const },
  { path: 'EXTREMITIES - PAIN - joints - swelling - chronic', layer: 'Mesoderm' as const },
  { path: 'SKIN - ERUPTIONS - vesicular - bluish - itching', layer: 'Ectoderm' as const },
  { path: 'ABDOMEN - CIRRHOSIS - liver - chronic parenchyma', layer: 'Endoderm' as const },
  { path: 'GENERALITIES - SLEEP - position - knee-chest position', layer: 'Ectoderm' as const },
  { path: 'THROAT - PAIN - swallowing - liquids aggravates', layer: 'Endoderm' as const },
  { path: 'CHEST - ASTHMA - nocturnal - 1 to 2 am', layer: 'Endoderm' as const },
  { path: 'FEVER - CHILLINESS - cold wind exposure', layer: 'Ectoderm' as const },
];

interface WorkspaceMatrixProps {
  initialRubrics: RubricRow[];
  calculatedRemedies: RemedyColumn[];
  matrixPayload: MatrixCell[];
  onToggleCommitRubric: (id: string, accept: boolean) => void;
  embryologicalWarningActive: boolean;
  onSelectRemedyHeader?: (remedyCode: string) => void;
  onUpdateMatrixCellGrade?: (
    rubricId: string,
    remedyId: string,
    nextGrade: 0 | 1 | 2 | 3 | 4
  ) => void;
  onAddNewRubricToMatrix?: (rubricPath: string, layer: 'Ectoderm' | 'Mesoderm' | 'Endoderm') => void;
  theme?: 'dark' | 'light';
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const WorkspaceMatrix: React.FC<WorkspaceMatrixProps> = ({
  initialRubrics,
  calculatedRemedies,
  matrixPayload,
  onToggleCommitRubric,
  embryologicalWarningActive,
  onSelectRemedyHeader,
  onUpdateMatrixCellGrade,
  onAddNewRubricToMatrix,
  theme = 'light',
  searchQuery,
  onSearchChange,
}) => {
  const isLight = theme === 'light';
  const [sortKey, setSortKey] = useState<'specificity' | 'coverage'>(
    'specificity'
  );
  const [hoveredRemedyId, setHoveredRemedyId] = useState<string | null>(null);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [newRubricInput, setNewRubricInput] = useState('');

  const sortedRemedies = useMemo(() => {
    return [...calculatedRemedies].sort((a, b) => {
      if (sortKey === 'specificity') {
        return b.specificityScore - a.specificityScore;
      }
      return b.coverageCount - a.coverageCount;
    });
  }, [calculatedRemedies, sortKey]);

  const matrixLookup = useMemo(() => {
    const cache = new Map<string, number>();
    matrixPayload.forEach((cell) => {
      cache.set(`${cell.rubricId}_${cell.remedyId}`, cell.grade);
    });
    return cache;
  }, [matrixPayload]);

  const remedyTotals = useMemo(() => {
    const totals = new Map<string, { coverage: number; sumGrades: number }>();
    sortedRemedies.forEach((rem) => {
      let coverage = 0;
      let sumGrades = 0;
      initialRubrics.forEach((rub) => {
        const grade = matrixLookup.get(`${rub.id}_${rem.id}`) || 0;
        if (grade > 0) {
          coverage += 1;
          sumGrades += grade;
        }
      });
      totals.set(rem.id, { coverage, sumGrades });
    });
    return totals;
  }, [sortedRemedies, initialRubrics, matrixLookup]);

  const handleCellClick = (
    rubricId: string,
    remedyId: string,
    currentGrade: number
  ) => {
    if (!onUpdateMatrixCellGrade) return;
    const nextGrade = ((currentGrade + 1) % 5) as 0 | 1 | 2 | 3 | 4;
    onUpdateMatrixCellGrade(rubricId, remedyId, nextGrade);
  };

  const handleAddCatalogRubric = (path: string, layer: 'Ectoderm' | 'Mesoderm' | 'Endoderm') => {
    if (onAddNewRubricToMatrix) {
      onAddNewRubricToMatrix(path, layer);
    }
    setNewRubricInput('');
    setShowAddMenu(false);
  };

  return (
    <div
      className={`w-full h-full flex flex-col overflow-hidden font-sans select-none antialiased relative transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#05070A] text-[#E6E8EA]'
      }`}
    >
      <TelemetryPulse activeCalculationCount={initialRubrics.length} />

      {/* EXECUTIVE MICRO-GLASS COCKPIT SEARCH & PROTOCOL TOOLBAR */}
      <div
        className={`relative z-20 w-full border-b px-4 py-2 flex flex-wrap items-center justify-between gap-3 transition-colors ${
          isLight
            ? 'bg-white/90 border-slate-200/90 backdrop-blur-md shadow-2xs'
            : 'bg-[#0B0F19]/90 border-[#1C1F26] backdrop-blur-md'
        }`}
      >
        {/* RUBRIC FILTER SEARCH INPUT & INSTANT ADD BUTTON */}
        <div className="relative flex-1 max-w-xl flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Filter active rubrics... Click any matrix cell to cycle grade (0->1->2->3->4)..."
              className={`w-full rounded-xl pl-9 pr-4 py-1.5 text-xs focus:outline-none transition-all font-mono font-medium ${
                isLight
                  ? 'bg-slate-100/80 border border-slate-200/90 focus:border-emerald-600 focus:bg-white text-slate-900 placeholder-slate-400 shadow-inner'
                  : 'bg-[#111317] border border-[#1C1F26] focus:border-emerald-500 text-white placeholder-gray-500'
              }`}
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 shadow-2xs transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Add Rubric</span>
            </button>

            {/* INSTANT RUBRIC AUTOCOMPLETE DROPDOWN */}
            {showAddMenu && (
              <div
                className={`absolute left-0 top-full mt-2 w-96 rounded-xl border p-3 z-50 shadow-2xl space-y-2 backdrop-blur-xl ${
                  isLight
                    ? 'bg-white/95 border-slate-300 text-slate-800'
                    : 'bg-[#111317]/95 border-[#1C1F26] text-white'
                }`}
              >
                <div className="text-[10px] font-mono font-bold text-emerald-600 uppercase">
                  Select Repertory Rubric to Add to Matrix:
                </div>
                <div className="max-h-64 overflow-y-auto space-y-1">
                  {REPERTORY_DATABASE_CATALOG.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAddCatalogRubric(item.path, item.layer)}
                      className={`w-full text-left p-2 rounded-lg text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                        isLight
                          ? 'hover:bg-emerald-50 text-slate-800'
                          : 'hover:bg-emerald-950/60 text-gray-200'
                      }`}
                    >
                      <span className="truncate pr-2">{item.path}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold flex-shrink-0">
                        {item.layer}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CLINICAL ALERT BADGES & RANK TOGGLE */}
        <div className="flex items-center space-x-2.5">
          {embryologicalWarningActive && (
            <div className="hidden xl:flex items-center space-x-1.5 text-amber-700 bg-amber-50/90 border border-amber-300 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold shadow-xs">
              <Layers className="w-3.5 h-3.5 animate-pulse" />
              <span>Predictive Suppression Radar</span>
            </div>
          )}

          {sortedRemedies.some((r) => r.hasSafetyAlert) && (
            <div className="hidden xl:flex items-center space-x-1.5 text-rose-700 bg-rose-50/90 border border-rose-300 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold shadow-xs">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Burnett Organopathy Active</span>
            </div>
          )}

          {/* EXECUTIVE RANK PILLS */}
          <div
            className={`flex items-center p-1 rounded-xl border ${
              isLight
                ? 'bg-slate-100/90 border-slate-200'
                : 'bg-[#111317] border-[#1C1F26]'
            }`}
          >
            <button
              onClick={() => setSortKey('specificity')}
              className={`px-3 py-1 rounded-lg text-[11px] font-mono font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                sortKey === 'specificity'
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-sm'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Activity className="w-3 h-3" />
              <span>TF-IDF Index</span>
            </button>
            <button
              onClick={() => setSortKey('coverage')}
              className={`px-3 py-1 rounded-lg text-[11px] font-mono font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                sortKey === 'coverage'
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-sm'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <ArrowUpDown className="w-3 h-3" />
              <span>Coverage</span>
            </button>
          </div>
        </div>
      </div>

      {/* MATRIX HIGH-DENSITY VIRTUALIZED SPREADSHEET TABLE */}
      <div
        className={`flex-1 overflow-auto relative z-10 ${
          isLight ? 'bg-white' : 'bg-[#05070A]'
        }`}
      >
        <table className="w-full border-collapse text-left text-xs">
          {/* STICKY HEADER WITH LUXURY GLASS DEPTH */}
          <thead
            className={`sticky top-0 z-30 border-b transition-colors ${
              isLight
                ? 'bg-slate-100/95 border-slate-200/90 text-slate-700 backdrop-blur-md'
                : 'bg-[#111317]/95 border-[#1C1F26] text-gray-400 backdrop-blur-md'
            }`}
          >
            <tr>
              <th
                className={`sticky left-0 z-40 border-r px-4 py-2.5 w-[440px] min-w-[440px] max-w-[440px] ${
                  isLight
                    ? 'bg-slate-100/95 border-slate-200'
                    : 'bg-[#111317]/95 border-[#1C1F26]'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono font-bold tracking-wider">
                  <span>SELECTED RUBRICS / SYMPTOMS</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full font-bold">
                    {initialRubrics.length} RUBRICS
                  </span>
                </div>
              </th>

              {sortedRemedies.map((remedy, idx) => (
                <th
                  key={remedy.id}
                  onClick={() =>
                    onSelectRemedyHeader && onSelectRemedyHeader(remedy.code)
                  }
                  onMouseEnter={() => setHoveredRemedyId(remedy.id)}
                  onMouseLeave={() => setHoveredRemedyId(null)}
                  className={`border-r px-1.5 py-2.5 w-[70px] min-w-[70px] text-center relative group select-none transition-all cursor-pointer ${
                    isLight ? 'border-slate-200' : 'border-[#1C1F26]'
                  } ${
                    idx === 0
                      ? isLight
                        ? 'bg-emerald-50/90 border-t-2 border-t-emerald-600'
                        : 'bg-emerald-950/40 border-t-2 border-t-emerald-500'
                      : remedy.isDrainage
                      ? isLight
                        ? 'bg-teal-50/70 border-t-2 border-t-teal-600'
                        : 'bg-teal-950/30 border-t-2 border-t-teal-500'
                      : ''
                  } ${
                    hoveredRemedyId === remedy.id
                      ? isLight
                        ? 'bg-emerald-100/80'
                        : 'bg-emerald-500/15'
                      : ''
                  }`}
                >
                  <div className="flex flex-col items-center space-y-0.5">
                    <span
                      className={`font-black text-sm tracking-tight ${
                        idx === 0
                          ? 'text-emerald-600 font-mono'
                          : remedy.isDrainage
                          ? 'text-teal-700'
                          : isLight
                          ? 'text-slate-900'
                          : 'text-gray-100'
                      }`}
                    >
                      {remedy.code}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full border ${
                        idx === 0
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-2xs'
                          : isLight
                          ? 'bg-slate-200/80 text-slate-700 border-slate-300'
                          : 'bg-[#1C1F26] text-emerald-400 border-[#2A2E38]'
                      }`}
                    >
                      {sortKey === 'specificity'
                        ? remedy.specificityScore.toFixed(1)
                        : `${remedy.coverageCount}R`}
                    </span>
                  </div>

                  {/* HOVER TOOLTIP */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block border p-3 rounded-xl text-[10px] w-60 shadow-2xl text-left z-50 pointer-events-none mt-1.5 backdrop-blur-xl ${
                      isLight
                        ? 'bg-white/95 border-slate-300 text-slate-800'
                        : 'bg-[#111317]/95 border-[#1C1F26] text-white'
                    }`}
                  >
                    <p className="font-bold text-emerald-600 text-xs flex items-center justify-between">
                      <span>{remedy.fullName}</span>
                      <span className="font-mono text-[10px]">#{idx + 1}</span>
                    </p>
                    <p className="mt-1 text-gray-500">
                      Coverage: <strong className="text-slate-900">{remedy.coverageCount}</strong> Rubrics
                    </p>
                    <p className="font-mono mt-0.5">
                      Specificity Index: <strong className="text-emerald-600">{remedy.specificityScore.toFixed(2)}</strong>
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* MATRIX ROWS WITH LUXURY 4PX HOVER LEFT ACCENT BAR */}
          <tbody
            className={`divide-y ${
              isLight ? 'divide-slate-200/80 bg-white' : 'divide-[#1C1F26] bg-[#05070A]'
            }`}
          >
            {initialRubrics.map((rubric) => (
              <tr
                key={rubric.id}
                className={`group transition-all ${
                  isLight ? 'hover:bg-slate-50/90' : 'hover:bg-[#111317]/80'
                }`}
              >
                {/* SYMPTOM PATH WITH CRISP HOVER ACCENT BAR */}
                <td
                  className={`sticky left-0 z-20 border-r px-4 py-2.5 w-[440px] min-w-[440px] max-w-[440px] relative transition-all ${
                    isLight
                      ? 'bg-white border-slate-200 group-hover:bg-slate-50/90'
                      : 'bg-[#05070A] border-[#1C1F26] group-hover:bg-[#111317]'
                  }`}
                >
                  {/* Left 4px glowing accent bar on row hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-center justify-between gap-3 pl-1">
                    <div className="flex flex-col min-w-0 flex-1">
                      <span
                        className={`font-mono text-xs font-semibold truncate ${
                          isLight ? 'text-slate-900' : 'text-gray-200'
                        }`}
                        title={rubric.fullStringPath}
                      >
                        {rubric.fullStringPath}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border ${
                            rubric.embryologicalLayer === 'Ectoderm'
                              ? isLight
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-blue-950/60 text-blue-400 border-blue-500/30'
                              : rubric.embryologicalLayer === 'Mesoderm'
                              ? isLight
                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                : 'bg-purple-950/60 text-purple-400 border-purple-500/30'
                              : isLight
                              ? 'bg-orange-50 text-orange-700 border-orange-200'
                              : 'bg-orange-950/60 text-orange-400 border-orange-500/30'
                          }`}
                        >
                          {rubric.embryologicalLayer}
                        </span>
                        {rubric.isAiExtracted && (
                          <span className="text-[9px] font-mono text-emerald-600 font-bold flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" /> NLP EXTRACTED
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 flex-shrink-0">
                      <button
                        onClick={() => onToggleCommitRubric(rubric.id, true)}
                        className={`p-1 rounded-md transition-all cursor-pointer ${
                          rubric.isCommitted
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : isLight
                            ? 'bg-slate-100 text-slate-400 hover:text-emerald-600'
                            : 'bg-[#1C1F26] text-gray-500 hover:text-emerald-400'
                        }`}
                        title="Accept and Commit Symptom"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onToggleCommitRubric(rubric.id, false)}
                        className={`p-1 rounded-md transition-all cursor-pointer ${
                          !rubric.isCommitted
                            ? 'bg-rose-600 text-white'
                            : isLight
                            ? 'bg-slate-100 text-slate-400 hover:text-rose-600'
                            : 'bg-[#1C1F26] text-gray-500 hover:text-rose-400'
                        }`}
                        title="Reject Symptom"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </td>

                {/* GRADE MATRIX CELLS WITH LUXURY GLASS SPECULARITY & HOVER SCALE */}
                {sortedRemedies.map((remedy) => {
                  const grade = (matrixLookup.get(
                    `${rubric.id}_${remedy.id}`
                  ) || 0) as 0 | 1 | 2 | 3 | 4;

                  const isColumnHovered = hoveredRemedyId === remedy.id;

                  return (
                    <td
                      key={remedy.id}
                      onClick={() =>
                        handleCellClick(rubric.id, remedy.id, grade)
                      }
                      title="Click to cycle grade (0 -> 1 -> 2 -> 3 -> 4)"
                      className={`border-r p-1 text-center font-black text-xs align-middle w-[70px] min-w-[70px] select-none transition-all cursor-pointer ${
                        isLight ? 'border-slate-200' : 'border-[#1C1F26]'
                      } ${
                        isColumnHovered
                          ? isLight
                            ? 'bg-emerald-50/70'
                            : 'bg-emerald-500/[0.05]'
                          : ''
                      }`}
                    >
                      {grade > 0 ? (
                        <span
                          className={`inline-flex items-center justify-center w-8 h-7 rounded-lg font-mono font-black text-xs transition-transform duration-150 hover:scale-110 shadow-xs ${
                            grade === 4
                              ? 'bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-md border border-emerald-400'
                              : grade === 3
                              ? isLight
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-black'
                                : 'bg-[#064E3B] text-[#34D399] border border-emerald-600/70'
                              : grade === 2
                              ? isLight
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-[#022C22] text-[#6EE7B7] border border-emerald-800/60'
                              : isLight
                              ? 'bg-slate-100 text-slate-700 border border-slate-300'
                              : 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40'
                          }`}
                        >
                          {grade}
                        </span>
                      ) : (
                        <span
                          className={
                            isLight ? 'text-slate-300' : 'text-gray-700/50'
                          }
                        >
                          •
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>

          {/* STICKY TOTALITY & SUM OF GRADES FOOTER ROW WITH METALLIC ANCHOR BORDER */}
          <tfoot
            className={`sticky bottom-0 z-30 border-t-2 font-mono ${
              isLight
                ? 'bg-slate-100/95 border-emerald-600 text-slate-900 backdrop-blur-md'
                : 'bg-[#111317]/95 border-emerald-500 text-white backdrop-blur-md'
            }`}
          >
            <tr>
              <td
                className={`sticky left-0 z-40 border-r px-4 py-2.5 font-bold text-xs ${
                  isLight
                    ? 'bg-slate-100/95 border-slate-300'
                    : 'bg-[#111317]/95 border-[#1C1F26]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="uppercase tracking-wider text-emerald-600 font-black">
                    SYMPTOM TOTALITY / SUM OF GRADES
                  </span>
                  <span className="text-[10px] text-gray-500">COVERAGE / SUM</span>
                </div>
              </td>

              {sortedRemedies.map((remedy) => {
                const total = remedyTotals.get(remedy.id) || {
                  coverage: 0,
                  sumGrades: 0,
                };
                return (
                  <td
                    key={remedy.id}
                    className="border-r px-1 py-1.5 text-center align-middle"
                  >
                    <div className="font-black text-xs text-emerald-600">
                      {total.coverage}R
                    </div>
                    <div className="text-[10px] text-gray-500 font-bold">
                      ∑{total.sumGrades}
                    </div>
                  </td>
                );
              })}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default WorkspaceMatrix;

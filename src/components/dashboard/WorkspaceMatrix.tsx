'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Check,
  X,
  Sparkles,
  ArrowUpDown,
  Layers,
  ShieldAlert,
  Flame,
} from 'lucide-react';

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

interface WorkspaceMatrixProps {
  initialRubrics: RubricRow[];
  calculatedRemedies: RemedyColumn[];
  matrixPayload: MatrixCell[];
  onToggleCommitRubric: (rubricId: string, accept: boolean) => void;
  embryologicalWarningActive: boolean;
  onSelectRemedyHeader: (remedyCode: string) => void;
  onUpdateMatrixCellGrade?: (
    rubricId: string,
    remedyId: string,
    nextGrade: 0 | 1 | 2 | 3 | 4
  ) => void;
  onAddNewRubricToMatrix?: (
    path: string,
    layer: 'Ectoderm' | 'Mesoderm' | 'Endoderm'
  ) => void;
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

  const [sortKey, setSortKey] = useState<'score' | 'coverage'>('score');
  const [hoveredRemedyId, setHoveredRemedyId] = useState<string | null>(null);
  const [isHeatmapMode, setIsHeatmapMode] = useState<boolean>(true);
  const [newRubricInput, setNewRubricInput] = useState('');
  const [selectedLayerForNew, setSelectedLayerForNew] = useState<
    'Ectoderm' | 'Mesoderm' | 'Endoderm'
  >('Ectoderm');

  const matrixLookup = useMemo(() => {
    const map = new Map<string, number>();
    for (const cell of matrixPayload) {
      map.set(`${cell.rubricId}_${cell.remedyId}`, cell.grade);
    }
    return map;
  }, [matrixPayload]);

  const sortedRemedies = useMemo(() => {
    return [...calculatedRemedies].sort((a, b) => {
      if (sortKey === 'score') return b.specificityScore - a.specificityScore;
      return b.coverageCount - a.coverageCount;
    });
  }, [calculatedRemedies, sortKey]);

  const handleCellClick = (
    rubricId: string,
    remedyId: string,
    currentGrade: 0 | 1 | 2 | 3 | 4
  ) => {
    if (!onUpdateMatrixCellGrade) return;
    const nextGrade = ((currentGrade + 1) % 5) as 0 | 1 | 2 | 3 | 4;
    onUpdateMatrixCellGrade(rubricId, remedyId, nextGrade);
  };

  const handleAddRubricSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRubricInput.trim() || !onAddNewRubricToMatrix) return;
    onAddNewRubricToMatrix(newRubricInput.trim(), selectedLayerForNew);
    setNewRubricInput('');
  };

  return (
    <div
      className={`w-full h-full flex flex-col font-sans select-none overflow-hidden transition-colors ${
        isLight ? 'bg-white text-slate-900' : 'bg-[#0B0F19] text-[#E6E8EA]'
      }`}
    >
      {/* SEARCH & REPERTORY TOOLBAR */}
      <div
        className={`px-4 py-2.5 border-b flex flex-wrap items-center justify-between gap-3 ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#111317] border-[#1C1F26]'
        }`}
      >
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
          <div className="relative w-56 sm:w-64">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Filter active rubrics..."
              className={`w-full border rounded-xl pl-9 pr-3 py-1.5 text-xs font-mono font-semibold focus:outline-none transition-colors ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-900 focus:border-emerald-600'
                  : 'bg-[#090A0C] border-[#1C1F26] text-white focus:border-emerald-500'
              }`}
            />
          </div>

          {/* + ADD RUBRIC AUTOCOMPLETE FORM */}
          {onAddNewRubricToMatrix && (
            <form
              onSubmit={handleAddRubricSubmit}
              className="flex items-center space-x-1.5"
            >
              <input
                type="text"
                value={newRubricInput}
                onChange={(e) => setNewRubricInput(e.target.value)}
                placeholder="+ Add rubric (e.g. HEAD - PAIN - sun)..."
                className={`w-48 sm:w-64 border rounded-xl px-3 py-1.5 text-xs font-mono transition-colors ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900'
                    : 'bg-[#090A0C] border-[#1C1F26] text-white'
                }`}
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1.5 rounded-xl text-xs flex items-center space-x-1 cursor-pointer transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Rubric</span>
              </button>
            </form>
          )}

          {/* THERMAL HEATMAP MODE TOGGLE BUTTON */}
          <button
            onClick={() => setIsHeatmapMode((prev) => !prev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center space-x-1.5 transition-all cursor-pointer border ${
              isHeatmapMode
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400 shadow-sm'
                : isLight
                ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                : 'bg-[#111317] border-[#1C1F26] text-gray-300 hover:bg-[#1C1F26]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>
              Heatmap View: <strong>{isHeatmapMode ? 'ON' : 'OFF'}</strong>
            </span>
          </button>
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

          <div className="flex items-center space-x-1 border rounded-xl p-0.5 border-slate-300 dark:border-[#1C1F26] bg-slate-100 dark:bg-[#090A0C]">
            <button
              onClick={() => setSortKey('score')}
              className={`px-3 py-1 rounded-lg text-[11px] font-mono font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                sortKey === 'score'
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-sm'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3" />
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
          isLight ? 'bg-white' : 'bg-[#0B0F19]'
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
                className={`sticky left-0 z-40 border-r px-4 py-2.5 w-[480px] min-w-[480px] max-w-[480px] ${
                  isLight
                    ? 'bg-slate-100/95 border-slate-200'
                    : 'bg-[#111317]/95 border-[#1C1F26]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase font-bold tracking-wider">
                    SELECTED RUBRICS / SYMPTOMS
                  </span>
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full font-mono font-bold">
                    {initialRubrics.length} RUBRICS
                  </span>
                </div>
              </th>

              {sortedRemedies.map((remedy, idx) => (
                <th
                  key={remedy.id}
                  onMouseEnter={() => setHoveredRemedyId(remedy.id)}
                  onMouseLeave={() => setHoveredRemedyId(null)}
                  onClick={() => onSelectRemedyHeader(remedy.code)}
                  className={`border-r px-2 py-2.5 text-center transition-all cursor-pointer w-[70px] min-w-[70px] ${
                    idx === 0
                      ? isLight
                        ? 'bg-emerald-50/90 text-emerald-950 font-black'
                        : 'bg-emerald-950/60 text-emerald-300 font-black'
                      : isLight
                      ? 'hover:bg-slate-200/70'
                      : 'hover:bg-[#1C1F26]'
                  }`}
                  title="Click to view classical Materia Medica provings"
                >
                  <div className="flex flex-col items-center">
                    <span className="font-mono font-black text-xs">
                      {remedy.code}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold mt-0.5 ${
                        idx === 0
                          ? 'bg-emerald-600 text-white'
                          : isLight
                          ? 'bg-slate-200 text-slate-700'
                          : 'bg-[#1C1F26] text-gray-300'
                      }`}
                    >
                      {remedy.specificityScore.toFixed(1)}
                    </span>
                    <p className="font-mono mt-0.5 text-[9px] opacity-75">
                      Cov: <strong>{remedy.coverageCount}</strong>
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* MATRIX ROWS WITH LUXURY 4PX HOVER LEFT ACCENT BAR */}
          <tbody
            className={`divide-y ${
              isLight ? 'divide-slate-200/80 bg-white' : 'divide-[#1C1F26] bg-[#0B0F19]'
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
                  className={`sticky left-0 z-20 border-r px-4 py-2.5 w-[480px] min-w-[480px] max-w-[480px] relative transition-all ${
                    isLight
                      ? 'bg-white border-slate-200 group-hover:bg-slate-50/90'
                      : 'bg-[#0B0F19] border-[#1C1F26] group-hover:bg-[#111317]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 pl-1">
                    <div className="flex flex-col min-w-0 flex-1">
                      <span
                        className={`font-mono text-xs font-bold truncate ${
                          isLight ? 'text-slate-900' : 'text-white'
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
                          <span className="text-[9px] font-mono text-emerald-400 font-bold flex items-center gap-1">
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

                {/* GRADE MATRIX CELLS — HIGH-DENSITY THERMAL HEATMAP MODE */}
                {sortedRemedies.map((remedy) => {
                  const grade = (matrixLookup.get(
                    `${rubric.id}_${remedy.id}`
                  ) || 0) as 0 | 1 | 2 | 3 | 4;

                  const isColumnHovered = hoveredRemedyId === remedy.id;

                  const getHeatmapStyle = () => {
                    if (!isHeatmapMode) {
                      if (grade === 0) return 'text-gray-300 dark:text-gray-600';
                      if (grade === 4) return 'bg-emerald-600 text-white font-black rounded-lg shadow-xs';
                      if (grade === 3) return 'bg-emerald-500/80 text-white font-bold rounded-lg';
                      if (grade === 2) return 'bg-emerald-300/60 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-300 font-bold rounded-lg';
                      return 'bg-emerald-100/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 font-bold rounded-lg';
                    }

                    // THERMAL HEATMAP MODE: FULL CELL COLOR INTENSITY MATRIX
                    if (grade === 4)
                      return 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-black rounded-md shadow-sm border border-emerald-400 scale-[0.96]';
                    if (grade === 3)
                      return 'bg-emerald-500/85 text-white font-bold rounded-md border border-emerald-400/50';
                    if (grade === 2)
                      return 'bg-emerald-300/60 dark:bg-emerald-900/70 text-emerald-950 dark:text-emerald-300 font-bold rounded-md';
                    if (grade === 1)
                      return 'bg-emerald-100/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-400 font-bold rounded-md';
                    return 'text-gray-300 dark:text-gray-700';
                  };

                  return (
                    <td
                      key={remedy.id}
                      onClick={() =>
                        handleCellClick(rubric.id, remedy.id, grade)
                      }
                      title="Click to cycle grade (0 -> 1 -> 2 -> 3 -> 4)"
                      className={`border-r p-1 text-center font-black text-xs align-middle w-[70px] min-w-[70px] select-none transition-all cursor-pointer ${
                        isColumnHovered
                          ? isLight
                            ? 'bg-slate-100/70'
                            : 'bg-[#1C1F26]/70'
                          : ''
                      }`}
                    >
                      <div
                        className={`w-full py-1.5 flex items-center justify-center transition-transform hover:scale-105 ${getHeatmapStyle()}`}
                      >
                        {grade > 0 ? grade : '.'}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>

          {/* STICKY FOOTER TOTALS */}
          <tfoot
            className={`sticky bottom-0 z-30 border-t ${
              isLight
                ? 'bg-slate-100/95 border-slate-300 backdrop-blur-md'
                : 'bg-[#111317]/95 border-[#1C1F26] backdrop-blur-md'
            }`}
          >
            <tr>
              <td
                className={`sticky left-0 z-40 border-r px-4 py-2.5 font-bold text-xs w-[480px] min-w-[480px] max-w-[480px] ${
                  isLight
                    ? 'bg-slate-100/95 border-slate-300'
                    : 'bg-[#111317]/95 border-[#1C1F26]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-black uppercase text-emerald-400">
                    SYMPTOM TOTALITY / SUM OF GRADES
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">
                    COVERAGE / SUM
                  </span>
                </div>
              </td>

              {sortedRemedies.map((remedy) => {
                let totalGrades = 0;
                let matchedRubricsCount = 0;

                initialRubrics.forEach((rub) => {
                  const g = (matrixLookup.get(`${rub.id}_${remedy.id}`) ||
                    0) as number;
                  if (g > 0) {
                    matchedRubricsCount += 1;
                    totalGrades += g;
                  }
                });

                return (
                  <td
                    key={remedy.id}
                    className="border-r px-2 py-2 text-center font-mono text-xs w-[70px] min-w-[70px]"
                  >
                    <div className="flex flex-col items-center">
                      <span className="font-black text-emerald-400">
                        {matchedRubricsCount}R
                      </span>
                      <span className="text-[10px] font-bold opacity-75">
                        ∑{totalGrades}
                      </span>
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

'use client';

import React, { useState } from 'react';
import {
  Search,
  Plus,
  Check,
  X,
  Flame,
  Droplets,
  Award,
  Sparkles,
  ShieldAlert,
  Sliders,
  Eye,
  Info,
} from 'lucide-react';
import {
  INDIAN_LANGUAGE_PACKS,
  IndianLanguageCode,
} from '@/lib/i18n/indian_language_packs';

export interface RubricRow {
  id: string;
  chapter: string;
  fullStringPath: string;
  embryologicalLayer: 'Ectoderm' | 'Mesoderm' | 'Endoderm';
  isAiExtracted?: boolean;
  isCommitted?: boolean;
}

export interface RemedyColumn {
  id: string;
  code: string;
  fullName: string;
  specificityScore: number;
  coverageCount: number;
  isDrainage?: boolean;
  hasSafetyAlert?: boolean;
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
  onToggleCommitRubric?: (rubricId: string, accept: boolean) => void;
  embryologicalWarningActive?: boolean;
  onSelectRemedyHeader?: (remedyCode: string) => void;
  onUpdateMatrixCellGrade?: (
    rubricId: string,
    remedyId: string,
    nextGrade: 0 | 1 | 2 | 3 | 4
  ) => void;
  onAddNewRubricToMatrix?: (
    rubricPath: string,
    layer: 'Ectoderm' | 'Mesoderm' | 'Endoderm'
  ) => void;
  theme?: 'dark' | 'light';
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  langCode?: IndianLanguageCode;
}

export const WorkspaceMatrix: React.FC<WorkspaceMatrixProps> = ({
  initialRubrics,
  calculatedRemedies,
  matrixPayload,
  onToggleCommitRubric,
  embryologicalWarningActive = false,
  onSelectRemedyHeader,
  onUpdateMatrixCellGrade,
  onAddNewRubricToMatrix,
  theme = 'dark',
  searchQuery = '',
  onSearchChange,
  langCode = 'EN',
}) => {
  const isLight = theme === 'light';
  const langPack = INDIAN_LANGUAGE_PACKS[langCode] || INDIAN_LANGUAGE_PACKS.EN;

  const [heatmapMode, setHeatmapMode] = useState<boolean>(true);
  const [useTfidfRanking, setUseTfidfRanking] = useState<boolean>(true);
  const [newRubricInput, setNewRubricInput] = useState<string>('');
  const [isAddingRubric, setIsAddingRubric] = useState<boolean>(false);

  const getGradeValue = (rubricId: string, remedyId: string): number => {
    const found = matrixPayload.find(
      (c) => c.rubricId === rubricId && c.remedyId === remedyId
    );
    return found ? found.grade : 0;
  };

  const getRemedySum = (remedyId: string): number => {
    return matrixPayload
      .filter((c) => c.remedyId === remedyId)
      .reduce((acc, curr) => acc + curr.grade, 0);
  };

  const getRemedyCoverage = (remedyId: string): number => {
    return matrixPayload.filter(
      (c) => c.remedyId === remedyId && c.grade > 0
    ).length;
  };

  const sortedRemedies = [...calculatedRemedies].sort((a, b) => {
    if (useTfidfRanking) {
      return b.specificityScore - a.specificityScore;
    }
    return getRemedySum(b.id) - getRemedySum(a.id);
  });

  const getGradeStyle = (grade: number) => {
    if (grade === 0) return 'text-gray-500 opacity-30';
    if (grade === 1)
      return isLight
        ? 'bg-slate-200 text-slate-800 font-bold'
        : 'bg-slate-800 text-gray-200 font-bold';
    if (grade === 2)
      return 'bg-teal-500/20 text-teal-400 font-bold border border-teal-500/30';
    if (grade === 3)
      return 'bg-amber-500 text-black font-black shadow-[0_0_8px_rgba(245,158,11,0.5)]';
    if (grade === 4)
      return 'bg-red-600 text-white font-black animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.7)]';
    return '';
  };

  const handleCycleGrade = (rubricId: string, remedyId: string) => {
    if (!onUpdateMatrixCellGrade) return;
    const current = getGradeValue(rubricId, remedyId);
    const next = ((current + 1) % 5) as 0 | 1 | 2 | 3 | 4;
    onUpdateMatrixCellGrade(rubricId, remedyId, next);
  };

  const handleCreateRubric = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRubricInput.trim()) return;
    if (onAddNewRubricToMatrix) {
      onAddNewRubricToMatrix(newRubricInput.toUpperCase(), 'Ectoderm');
    }
    setNewRubricInput('');
    setIsAddingRubric(false);
  };

  // HELPER TO DISPLAY TRANSLATED RUBRIC STRING IF AVAILABLE
  const renderRubricString = (fullPath: string): string => {
    if (langPack.labels.rubricTranslations && langPack.labels.rubricTranslations[fullPath]) {
      return langPack.labels.rubricTranslations[fullPath];
    }
    return fullPath;
  };

  return (
    <div
      className={`w-full h-full flex flex-col font-mono overflow-hidden transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#05070A] text-[#E6E8EA]'
      }`}
    >
      {/* MATRIX CONTROL HEADER BAR */}
      <div
        className={`px-4 py-2.5 border-b flex flex-wrap items-center justify-between gap-3 text-xs z-20 flex-shrink-0 transition-colors ${
          isLight
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-[#0B0F19] border-[#1C1F26] text-white'
        }`}
      >
        <div className="flex items-center space-x-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-gray-400" />
            <input
              type="text"
              placeholder={langPack.labels.filterRubricsPlaceholder}
              value={searchQuery}
              onChange={(e) =>
                onSearchChange && onSearchChange(e.target.value)
              }
              className={`pl-8 pr-3 py-1 rounded-xl text-xs font-bold border outline-none ${
                isLight
                  ? 'bg-slate-50 border-slate-300 text-slate-900'
                  : 'bg-[#111317] border-slate-800 text-white'
              }`}
            />
          </div>

          <button
            onClick={() => setIsAddingRubric((prev) => !prev)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-3 py-1 rounded-xl text-xs flex items-center space-x-1 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{langPack.labels.addRubricBtn}</span>
          </button>

          <button
            onClick={() => setHeatmapMode((prev) => !prev)}
            className={`px-2.5 py-1 rounded-lg border font-bold transition-all cursor-pointer ${
              heatmapMode
                ? 'bg-teal-600/20 border-teal-500 text-teal-400'
                : isLight
                ? 'bg-slate-100 border-slate-300 text-slate-600'
                : 'bg-slate-800 border-slate-700 text-gray-400'
            }`}
          >
            {langPack.labels.heatmapOn}
          </button>
        </div>

        {/* ALERTS & ASYMMETRICAL MATH FORMULA TOGGLE */}
        <div className="flex items-center space-x-2">
          {embryologicalWarningActive && (
            <span className="px-2.5 py-1 rounded-lg bg-red-600/20 border border-red-500 text-red-400 text-[10px] font-black flex items-center space-x-1 animate-pulse">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{langPack.labels.burnettOrganopathyActive}</span>
            </span>
          )}

          <button
            onClick={() => setUseTfidfRanking((prev) => !prev)}
            className={`px-3 py-1 rounded-xl border text-xs font-black flex items-center space-x-1.5 transition-all cursor-pointer ${
              useTfidfRanking
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400 shadow-md'
                : isLight
                ? 'bg-slate-100 border-slate-300 text-slate-700'
                : 'bg-slate-800 border-slate-700 text-gray-300'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{langPack.labels.tfidfIndexBtn}</span>
          </button>
        </div>
      </div>

      {/* QUICK ADD RUBRIC INPUT DRAWER */}
      {isAddingRubric && (
        <form
          onSubmit={handleCreateRubric}
          className={`px-4 py-2 border-b flex items-center space-x-2 ${
            isLight ? 'bg-emerald-50 border-emerald-200' : 'bg-emerald-950/30 border-emerald-800'
          }`}
        >
          <input
            type="text"
            placeholder="e.g. MIND - BUSINESS - talks of"
            value={newRubricInput}
            onChange={(e) => setNewRubricInput(e.target.value)}
            className="flex-1 px-3 py-1 rounded-lg text-xs font-bold border border-emerald-500 bg-white dark:bg-[#111317] outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="px-4 py-1 rounded-lg bg-emerald-600 text-white font-black text-xs cursor-pointer"
          >
            Commit Rubric
          </button>
        </form>
      )}

      {/* VIRTUALIZED DENSE CONSULTATION MATRIX TABLE */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead
            className={`sticky top-0 z-10 border-b ${
              isLight
                ? 'bg-white border-slate-300 text-slate-900'
                : 'bg-[#0B0F19] border-[#1C1F26] text-white'
            }`}
          >
            <tr>
              <th className="p-3 font-black tracking-wider w-80 min-w-[300px]">
                <div className="flex items-center justify-between">
                  <span>{langPack.labels.selectedRubricsTitle}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-600/20 text-emerald-600 dark:text-emerald-400">
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
                  className={`p-2.5 text-center font-black border-l min-w-[76px] cursor-pointer transition-all hover:bg-emerald-500/10 ${
                    idx === 0
                      ? 'bg-emerald-600/15 border-emerald-500/50'
                      : isLight
                      ? 'border-slate-200'
                      : 'border-[#1C1F26]'
                  }`}
                  title={`Click to open Materia Medica Proving for ${remedy.fullName}`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <span
                      className={`text-sm font-black tracking-wider ${
                        idx === 0
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : isLight
                          ? 'text-slate-900'
                          : 'text-white'
                      }`}
                    >
                      {remedy.code}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      {useTfidfRanking
                        ? remedy.specificityScore
                        : getRemedySum(remedy.id)}
                    </span>
                    <span className="text-[9px] text-gray-500">
                      Cov: {getRemedyCoverage(remedy.id)}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-[#1C1F26]">
            {initialRubrics.map((rubric) => {
              const translatedPath = renderRubricString(rubric.fullStringPath);

              return (
                <tr
                  key={rubric.id}
                  className={`transition-colors ${
                    isLight
                      ? 'hover:bg-slate-100'
                      : 'hover:bg-slate-900/60'
                  }`}
                >
                  <td className="p-3 font-bold text-xs">
                    <div className="flex items-center justify-between space-x-2">
                      <div className="flex flex-col space-y-1 min-w-0">
                        <span
                          className={`font-black tracking-wide truncate ${
                            isLight ? 'text-slate-900' : 'text-white'
                          }`}
                          title={translatedPath}
                        >
                          {translatedPath}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded font-black uppercase ${
                              rubric.embryologicalLayer === 'Ectoderm'
                                ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                                : rubric.embryologicalLayer === 'Endoderm'
                                ? 'bg-orange-500/20 text-orange-600 dark:text-orange-400'
                                : 'bg-purple-500/20 text-purple-600 dark:text-purple-400'
                            }`}
                          >
                            {rubric.embryologicalLayer}
                          </span>
                          {rubric.isAiExtracted && (
                            <span className="text-[9px] text-teal-600 dark:text-teal-400 font-bold flex items-center gap-0.5">
                              <Sparkles className="w-2.5 h-2.5" /> NLP EXTRACTED
                            </span>
                          )}
                        </div>
                      </div>

                      {/* COMMIT / REJECT TOGGLE BUTTONS */}
                      <div className="flex items-center space-x-1 flex-shrink-0">
                        <button
                          onClick={() =>
                            onToggleCommitRubric &&
                            onToggleCommitRubric(rubric.id, true)
                          }
                          className={`p-1 rounded-md border transition-all cursor-pointer ${
                            rubric.isCommitted !== false
                              ? 'bg-emerald-600 border-emerald-500 text-white'
                              : isLight
                              ? 'border-slate-300 text-slate-400'
                              : 'border-slate-800 text-gray-500'
                          }`}
                          title="Commit Rubric to Matrix"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() =>
                            onToggleCommitRubric &&
                            onToggleCommitRubric(rubric.id, false)
                          }
                          className={`p-1 rounded-md border transition-all cursor-pointer ${
                            rubric.isCommitted === false
                              ? 'bg-red-600 border-red-500 text-white'
                              : isLight
                              ? 'border-slate-300 text-slate-400'
                              : 'border-slate-800 text-gray-500'
                          }`}
                          title="Reject Rubric"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* REMEDY GRADE CELLS (1, 2, 3, 4) */}
                  {sortedRemedies.map((remedy, idx) => {
                    const grade = getGradeValue(rubric.id, remedy.id);
                    const gradeStyle = getGradeStyle(grade);

                    return (
                      <td
                        key={`${rubric.id}-${remedy.id}`}
                        onClick={() =>
                          handleCycleGrade(rubric.id, remedy.id)
                        }
                        className={`p-2 text-center border-l cursor-pointer select-none transition-all ${
                          idx === 0
                            ? 'bg-emerald-500/5 border-emerald-500/20'
                            : isLight
                            ? 'border-slate-200'
                            : 'border-[#1C1F26]'
                        }`}
                        title="Click to cycle Grade (0 -> 1 -> 2 -> 3 -> 4)"
                      >
                        {grade > 0 ? (
                          <span
                            className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs ${gradeStyle}`}
                          >
                            {grade}
                          </span>
                        ) : (
                          <span className="text-gray-600 dark:text-gray-700 text-sm">
                            -
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>

          {/* FOOTER TOTALS ROW */}
          <tfoot
            className={`sticky bottom-0 z-10 border-t font-black ${
              isLight
                ? 'bg-slate-100 border-slate-300 text-slate-900'
                : 'bg-[#0B0F19] border-[#1C1F26] text-white'
            }`}
          >
            <tr>
              <td className="p-3 uppercase text-xs">
                {langPack.labels.symptomTotality}
              </td>
              {sortedRemedies.map((remedy, idx) => (
                <td
                  key={`sum-${remedy.id}`}
                  className={`p-2.5 text-center border-l ${
                    idx === 0
                      ? 'bg-emerald-600/20 text-emerald-600 dark:text-emerald-400'
                      : ''
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-black">
                      {getRemedyCoverage(remedy.id)}R
                    </span>
                    <span className="text-[10px] text-gray-500">
                      Σ{getRemedySum(remedy.id)}
                    </span>
                  </div>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default WorkspaceMatrix;

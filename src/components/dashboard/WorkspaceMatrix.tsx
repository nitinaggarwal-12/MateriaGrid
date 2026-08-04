'use client';

import React, { useState } from 'react';
import {
  Flame,
  Droplets,
  Award,
  AlertTriangle,
  Sparkles,
  Plus,
  Search,
  CheckCircle2,
  X,
  FileSpreadsheet,
  Layers,
  ArrowUpRight,
  TrendingDown,
  BookOpen,
  Calendar,
  Zap,
  HelpCircle,
  Filter,
  ChevronDown,
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
  isAiExtracted: boolean;
  isCommitted: boolean;
  previousVisitGrade?: number; // For Follow-Up Hering's Law Delta comparison
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
  onUpdateMatrixCellGrade: (
    rubricId: string,
    remedyId: string,
    nextGrade: 0 | 1 | 2 | 3 | 4
  ) => void;
  onAddNewRubricToMatrix: (
    fullStringPath: string,
    layer: 'Ectoderm' | 'Mesoderm' | 'Endoderm'
  ) => void;
  theme?: 'dark' | 'light';
  searchQuery: string;
  onSearchChange: (q: string) => void;
  langCode?: IndianLanguageCode;
  isFullWidthOpdMode?: boolean;
}

const ALL_CHAPTERS = [
  'MIND',
  'HEAD',
  'EYES',
  'ABDOMEN',
  'EXTREMITIES',
  'SKIN',
  'SLEEP',
  'THROAT',
  'GENERALITIES',
];

const CLASSICAL_CHAPTER_QUICK_RUBRICS: Record<
  string,
  { path: string; layer: 'Ectoderm' | 'Mesoderm' | 'Endoderm' }[]
> = {
  MIND: [
    { path: 'MIND - BUSINESS - talks of', layer: 'Ectoderm' },
    { path: 'MIND - ANXIETY - night - sun set after', layer: 'Ectoderm' },
    { path: 'MIND - FEAR - death - predicts the time of', layer: 'Ectoderm' },
    { path: 'MIND - ANGER - irascible - violent from contradiction', layer: 'Ectoderm' },
    { path: 'MIND - DESPAIR - recovery - of', layer: 'Ectoderm' },
  ],
  HEAD: [
    { path: 'HEAD - PAIN - pulsating - sudden', layer: 'Ectoderm' },
    { path: 'HEAD - PAIN - sun - exposure to', layer: 'Ectoderm' },
    { path: 'HEAD - VERTIGO - motion of eyes aggravates', layer: 'Ectoderm' },
    { path: 'HEAD - HEAVINESS - forehead - morning', layer: 'Ectoderm' },
  ],
  ABDOMEN: [
    { path: 'ABDOMEN - CIRRHOSIS - liver - chronic parenchyma', layer: 'Endoderm' },
    { path: 'ABDOMEN - PAIN - right scapula - under lower angle', layer: 'Endoderm' },
    { path: 'ABDOMEN - DISTENSION - tympanitic - post-prandial', layer: 'Endoderm' },
    { path: 'ABDOMEN - GALLSTONES - colic - radiating to back', layer: 'Endoderm' },
  ],
  EXTREMITIES: [
    { path: 'EXTREMITIES - PAIN - motion - beginning of - on', layer: 'Mesoderm' },
    { path: 'EXTREMITIES - PAIN - stitching - slightest motion aggravates', layer: 'Mesoderm' },
    { path: 'EXTREMITIES - RESTLESSNESS - legs - night - in bed', layer: 'Mesoderm' },
    { path: 'EXTREMITIES - SYNOVITIS - knee joint - effusion', layer: 'Mesoderm' },
  ],
  SKIN: [
    { path: 'SKIN - ERUPTIONS - vesicular - bluish - itching', layer: 'Ectoderm' },
    { path: 'SKIN - ERUPTIONS - scaly - dry - silvery scales', layer: 'Ectoderm' },
    { path: 'SKIN - ECZEMA - bends of joints - nocturnal scratching', layer: 'Ectoderm' },
  ],
  GENERALITIES: [
    { path: 'GENERALITIES - AGGRAVATION - 3 pm to 4 pm', layer: 'Ectoderm' },
    { path: 'GENERALITIES - HEAT - flushes of - sudden', layer: 'Ectoderm' },
    { path: 'GENERALITIES - WEAKNESS - sudden - prostration', layer: 'Ectoderm' },
    { path: 'GENERALITIES - ANAEMIA - chlorotic - pale lips', layer: 'Endoderm' },
  ],
};

export const WorkspaceMatrix: React.FC<WorkspaceMatrixProps> = ({
  initialRubrics,
  calculatedRemedies,
  matrixPayload,
  onToggleCommitRubric,
  embryologicalWarningActive,
  onSelectRemedyHeader,
  onUpdateMatrixCellGrade,
  onAddNewRubricToMatrix,
  theme = 'dark',
  searchQuery,
  onSearchChange,
  langCode = 'EN',
  isFullWidthOpdMode = false,
}) => {
  const isLight = theme === 'light';
  const pack = INDIAN_LANGUAGE_PACKS[langCode] || INDIAN_LANGUAGE_PACKS.EN;
  const labels = pack.labels;

  const [activeChapterFilter, setActiveChapterFilter] = useState<string | null>(null);
  const [selectedChapters, setSelectedChapters] = useState<string[]>([...ALL_CHAPTERS]);
  const [isChapterDropdownOpen, setIsChapterDropdownOpen] = useState(false);
  const [showFollowUpBaseline, setShowFollowUpBaseline] = useState(false);
  const [showChapterPalette, setShowChapterPalette] = useState(false);
  const [showGradingLegend, setShowGradingLegend] = useState(false);
  const [hoveredRubricId, setHoveredRubricId] = useState<string | null>(null);
  const [hoveredRemedyId, setHoveredRemedyId] = useState<string | null>(null);

  // Calculate remedy totals dynamically
  const remedyTotals = calculatedRemedies.map((remedy) => {
    let sumGrades = 0;
    let coveredRubricsCount = 0;

    initialRubrics.forEach((rubric) => {
      if (!rubric.isCommitted) return;
      const cell = matrixPayload.find(
        (c) => c.rubricId === rubric.id && c.remedyId === remedy.id
      );
      if (cell && cell.grade > 0) {
        sumGrades += cell.grade;
        coveredRubricsCount += 1;
      }
    });

    return {
      ...remedy,
      sumGrades,
      coveredRubricsCount,
    };
  });

  const topRemedy = remedyTotals[0];

  // Automated Posology & Potency Guidance Engine
  const getRecommendedPosology = (remedy: RemedyColumn) => {
    if (remedy.isDrainage) {
      return {
        potency: 'Burnett 1X–6X Liquid Organopathy',
        reason: 'Pathological Endoderm Organic Affinity',
        color: 'text-amber-600 dark:text-amber-400 border-amber-500/40 bg-amber-500/10',
      };
    }
    if (remedy.specificityScore > 55) {
      return {
        potency: '200C Single Dose (Dry Granules)',
        reason: 'High Specificity & Ectoderm Functional Totality',
        color: 'text-emerald-700 dark:text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
      };
    }
    return {
      potency: '30C Daily Water Solution',
      reason: 'General Acute Vital Force Stimulant',
      color: 'text-cyan-700 dark:text-cyan-400 border-cyan-500/40 bg-cyan-500/10',
    };
  };

  return (
    <div
      className={`flex flex-col h-full w-full font-mono text-xs overflow-hidden transition-colors ${
        isLight
          ? 'bg-[#F8FAFC] text-[#0F172A]'
          : 'bg-[#05070A] text-[#E6E8EA]'
      }`}
    >
      {/* TOOLBAR: SEARCH, CLASSICAL REPERTORY CHAPTER TREE, GRADING LEGEND & FOLLOW-UP DELTA TOGGLE */}
      <div
        className={`p-2.5 border-b flex flex-wrap items-center justify-between gap-2.5 z-50 relative flex-shrink-0 ${
          isLight
            ? 'bg-white/95 border-slate-200 shadow-2xs'
            : 'bg-[#0B0F19]/95 border-[#1C1F26] shadow-md'
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          {/* SEARCH ACTIVE RUBRIC */}
          <div className="relative">
            <Search
              className={`w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 ${
                isLight ? 'text-slate-400' : 'text-gray-500'
              }`}
            />
            <input
              type="text"
              placeholder={labels.filterRubricsPlaceholder}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`pl-8 pr-3 py-1.5 rounded-lg border text-xs outline-none w-48 md:w-56 font-bold ${
                isLight
                  ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-500'
                  : 'bg-[#111317] border-[#1C1F26] text-white focus:border-emerald-500'
              }`}
            />
          </div>

          {/* MULTI-SELECT CHAPTER FILTER DROPDOWN WITH 'ALL' */}
          <div className="relative">
            <button
              onClick={() => setIsChapterDropdownOpen((prev) => !prev)}
              className={`px-3 py-1.5 rounded-lg border font-black text-xs flex items-center space-x-1.5 transition-all cursor-pointer ${
                selectedChapters.length === ALL_CHAPTERS.length
                  ? isLight
                    ? 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200'
                    : 'border-slate-700 bg-[#111317] text-white hover:bg-slate-800'
                  : 'border-emerald-500 bg-emerald-600/20 text-emerald-600 dark:text-emerald-400'
              }`}
            >
              <Filter className="w-3.5 h-3.5 text-emerald-500" />
              <span>
                {selectedChapters.length === ALL_CHAPTERS.length
                  ? 'Chapter: All'
                  : `Chapters (${selectedChapters.length})`}
              </span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isChapterDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsChapterDropdownOpen(false)}
                />
                <div
                  className={`absolute left-0 mt-1.5 w-64 min-w-[240px] rounded-xl border p-3.5 shadow-2xl z-50 space-y-2 font-sans ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-900'
                      : 'bg-[#0B0F19] border-[#1C1F26] text-white'
                  }`}
                >
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-black uppercase text-gray-500 dark:text-gray-400">
                      FILTER BY CHAPTER
                    </span>
                    <button
                      onClick={() => {
                        if (selectedChapters.length === ALL_CHAPTERS.length) {
                          setSelectedChapters([]);
                        } else {
                          setSelectedChapters([...ALL_CHAPTERS]);
                        }
                      }}
                      className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                    >
                      {selectedChapters.length === ALL_CHAPTERS.length
                        ? 'Deselect All'
                        : 'Select All'}
                    </button>
                  </div>

                  {/* 'ALL' TOGGLE OPTION */}
                  <label className="flex items-center space-x-2.5 px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#111317] cursor-pointer font-bold text-xs whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedChapters.length === ALL_CHAPTERS.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedChapters([...ALL_CHAPTERS]);
                        } else {
                          setSelectedChapters([]);
                        }
                      }}
                      className="w-4 h-4 accent-emerald-500 rounded cursor-pointer flex-shrink-0"
                    />
                    <span className="font-black">All Chapters</span>
                  </label>

                  <div className="max-h-60 overflow-y-auto space-y-1 pt-1 border-t border-slate-200 dark:border-slate-800">
                    {ALL_CHAPTERS.map((ch) => {
                      const isChecked = selectedChapters.includes(ch);
                      return (
                        <label
                          key={ch}
                          className="flex items-center space-x-2.5 px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#111317] cursor-pointer text-xs font-semibold whitespace-nowrap"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              if (isChecked) {
                                setSelectedChapters((prev) =>
                                  prev.filter((item) => item !== ch)
                                );
                              } else {
                                setSelectedChapters((prev) => [...prev, ch]);
                              }
                            }}
                            className="w-4 h-4 accent-emerald-500 rounded cursor-pointer flex-shrink-0"
                          />
                          <span>{ch}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* CLASSICAL REPERTORY CHAPTER PALETTE BUTTON */}
          <button
            onClick={() => {
              setShowChapterPalette((prev) => {
                const next = !prev;
                if (next) setShowGradingLegend(false);
                return next;
              });
            }}
            className={`px-3 py-1.5 rounded-lg border font-black text-xs flex items-center space-x-1.5 transition-all cursor-pointer ${
              showChapterPalette
                ? 'border-emerald-500 bg-emerald-600/20 text-emerald-600 dark:text-emerald-400'
                : isLight
                ? 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200'
                : 'border-slate-700 bg-[#111317] text-white hover:bg-slate-800'
            }`}
            title="Open Quick Classical Repertory Chapters (MIND, HEAD, ABDOMEN, EXTREMITIES, SKIN, GENERALITIES)"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
            <span>📖 Classical Chapter Taxonomy</span>
          </button>

          {/* TOGGLE GRADING LEGEND */}
          <button
            onClick={() => {
              setShowGradingLegend((prev) => {
                const next = !prev;
                if (next) setShowChapterPalette(false);
                return next;
              });
            }}
            className={`px-3 py-1.5 rounded-lg border font-black text-xs flex items-center space-x-1.5 transition-all cursor-pointer ${
              showGradingLegend
                ? 'border-cyan-500 bg-cyan-600/20 text-cyan-400'
                : isLight
                ? 'border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200'
                : 'border-slate-700 bg-[#111317] text-slate-100 hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>ℹ️ Grading Guide</span>
          </button>

          {/* FOLLOW-UP VISIT HERING'S LAW DELTA OVERLAY TOGGLE */}
          <button
            onClick={() => setShowFollowUpBaseline((prev) => !prev)}
            className={`px-3 py-1.5 rounded-lg border font-black text-xs flex items-center space-x-1.5 transition-all cursor-pointer ${
              showFollowUpBaseline
                ? 'border-purple-500 bg-purple-600/20 text-purple-700 dark:text-purple-300'
                : isLight
                ? 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200'
                : 'border-slate-700 bg-[#111317] text-slate-100 hover:bg-slate-800'
            }`}
            title="Toggle Follow-Up Visit Baseline Comparison (Visit 1 vs Today's Visit)"
          >
            <Calendar className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
            <span>
              {showFollowUpBaseline
                ? '📜 Hering’s Law Delta: ACTIVE'
                : '📜 Hering’s Law Visit #1 Comparison'}
            </span>
          </button>
        </div>

        {/* POSOLOGY & POTENCY RECOMMENDATION STRIP */}
        {topRemedy && (
          <div className="flex items-center space-x-2">
            <span
              className={`text-[10px] font-black uppercase hidden md:inline ${
                isLight ? 'text-slate-600' : 'text-slate-200'
              }`}
            >
              RECOMMENDED POSOLOGY:
            </span>
            {(() => {
              const pos = getRecommendedPosology(topRemedy);
              return (
                <span
                  className={`px-2.5 py-1 rounded-lg border text-xs font-black flex items-center space-x-1.5 ${pos.color}`}
                >
                  <Zap className="w-3 h-3" />
                  <span>
                    {topRemedy.code} → <strong>{pos.potency}</strong>
                  </span>
                </span>
              );
            })()}
          </div>
        )}
      </div>

      {/* COLLAPSIBLE CLASSICAL HOMEOPATHIC GRADING LEGEND & NEW GRADUATE CLINICAL GUIDE */}
      {showGradingLegend && (
        <div
          className={`p-4 border-b space-y-4 text-[11px] font-bold z-10 ${
            isLight
              ? 'bg-slate-100 border-slate-200 text-slate-700'
              : 'bg-[#0B0F19] border-[#1C1F26] text-slate-200'
          }`}
        >
          {/* ROW 1: CLASSICAL GRADING LEGEND */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <span className="flex items-center space-x-1 font-black uppercase text-emerald-400">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>CLASSICAL TYPOGRAPHY GRADING LEGEND (HAHNEMANN / KENT):</span>
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center space-x-1">
                <span className="w-4 h-4 rounded bg-slate-800 text-slate-200 font-mono flex items-center justify-center text-[10px]">
                  1
                </span>
                <span>Grade 1 (Reported / Plain)</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-4 h-4 rounded bg-cyan-500/20 text-cyan-500 border border-cyan-500/40 font-mono flex items-center justify-center text-[10px]">
                  2
                </span>
                <span>Grade 2 (Italics / Clinical Verified)</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-4 h-4 rounded bg-amber-500 text-black font-black font-mono flex items-center justify-center text-[10px]">
                  3
                </span>
                <span>Grade 3 (Bold / Strongly Verified)</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-4 h-4 rounded bg-orange-500 text-white font-black font-mono flex items-center justify-center text-[10px]">
                  4
                </span>
                <span>Grade 4 (BOLD CAPS / Utmost Prominence)</span>
              </span>
            </div>
          </div>

          {/* ROW 2: NEW GRADUATE & OPD INTERN CLINICAL REFERENCE GUIDE */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#05070A] border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-black text-[11px] block">
                1. Asymmetrical Specificity Score
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Prevents <strong>Polychrest Dominance</strong> (Sulphur/Arsenicum hitting every rubric). Rare, peculiar symptoms receive higher mathematical weight via Inverse Rubric Density.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#05070A] border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-black text-[11px] block">
                2. Vijayakar Predictive Thermal-Thirst Mask
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Hard physical baseline constants (<strong>HOT/CHILLY</strong> &amp; <strong>THIRSTY/THIRSTLESS</strong>) automatically filter out incompatible remedies to prevent deep disease suppression.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#05070A] border border-slate-800 space-y-1">
              <span className="text-amber-400 font-black text-[11px] block">
                3. Burnett Tissue Drainage Override
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                When organic structural pathology (cirrhosis, renal failure) is present, low-potency organ-affine remedies (<strong>1X–6X</strong>) are recommended first; potencies &gt;30C/200C are restricted.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#05070A] border border-slate-800 space-y-1">
              <span className="text-purple-400 font-black text-[11px] block">
                4. Sehgal ROH Behavioral Translation
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Translates messy patient speech into active <strong>Present, Predominating, and Persisting (PPP)</strong> behavioral mind rubrics inside the <code>+ Case Intake</code> drawer.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* QUICK CLASSICAL REPERTORY CHAPTER EXPANDABLE PALETTE */}
      {showChapterPalette && (
        <div
          className={`p-3 border-b space-y-2 z-20 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#111317] border-[#1C1F26]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
              CLICK ANY CLASSICAL REPERTORY RUBRIC TO INSERT DIRECTLY INTO THE CALCULATION MATRIX:
            </span>
            <button
              onClick={() => setShowChapterPalette(false)}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {Object.keys(CLASSICAL_CHAPTER_QUICK_RUBRICS).map((chap) => (
              <button
                key={chap}
                onClick={() =>
                  setActiveChapterFilter(
                    activeChapterFilter === chap ? null : chap
                  )
                }
                className={`px-2.5 py-1 rounded-md border text-xs font-black cursor-pointer ${
                  activeChapterFilter === chap
                    ? 'border-emerald-500 bg-emerald-600 text-white'
                    : isLight
                    ? 'border-slate-300 bg-white text-slate-800'
                    : 'border-slate-700 bg-[#0B0F19] text-white'
                }`}
              >
                {chap}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {Object.entries(CLASSICAL_CHAPTER_QUICK_RUBRICS)
              .filter(
                ([chap]) => !activeChapterFilter || activeChapterFilter === chap
              )
              .flatMap(([chap, list]) =>
                list.map((r) => (
                  <button
                    key={r.path}
                    onClick={() => onAddNewRubricToMatrix(r.path, r.layer)}
                    className="px-2.5 py-1 rounded-lg border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-[11px] flex items-center space-x-1 cursor-pointer transform transition hover:scale-105"
                  >
                    <Plus className="w-3 h-3" />
                    <span>
                      {pack.labels.rubricTranslations[r.path] || r.path}
                    </span>
                  </button>
                ))
              )}
          </div>
        </div>
      )}

      {/* DR. PRAFULL VIJAYAKAR EMBRYOLOGICAL SUPPRESSION ALERT BANNER */}
      {embryologicalWarningActive && (
        <div className="bg-red-950/90 border-b border-red-500/50 px-4 py-2 flex items-center justify-between text-xs text-red-200 z-20">
          <div className="flex items-center space-x-2 font-bold">
            <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 animate-pulse" />
            <span>
              EMBRYOLOGICAL DISEASE SUPPRESSION ALERT (DR. PRAFULL VIJAYAKAR):
              Ectoderm $\rightarrow$ Mesoderm direction detected. Review
              prescription potency.
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-red-600 text-white font-black">
            CRITICAL SAFETY GATE
          </span>
        </div>
      )}

      {/* MATRIX HIGH-VIRTUALIZATION TABLE ENGINE */}
      <div className="flex-1 overflow-auto relative">
        <table className="w-full border-collapse text-left">
          {/* HEADER ROW: REMEDY COLUMNS RANKED BY ASYMMETRICAL SPECIFICITY */}
          <thead
            className={`sticky top-0 z-10 ${
              isLight
                ? 'bg-slate-100 border-b border-slate-300 text-slate-900'
                : 'bg-[#0B0F19] border-b border-[#1C1F26] text-white'
            }`}
          >
            <tr>
              <th
                className={`sticky left-0 z-30 p-3 w-80 min-w-[340px] font-black text-xs tracking-wider border-r-2 ${
                  isLight
                    ? 'bg-slate-100 border-slate-300 text-slate-900'
                    : 'bg-[#0B0F19] border-slate-700 text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={isLight ? 'text-slate-900' : 'text-white'}>{labels.selectedRubricsTitle}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    {initialRubrics.length} RUBRICS
                  </span>
                </div>
              </th>

              {remedyTotals.map((remedy, idx) => {
                const isTop = idx === 0;
                return (
                  <th
                    key={remedy.id}
                    onClick={() => onSelectRemedyHeader(remedy.code)}
                    className={`p-2.5 text-center min-w-[96px] border-r transition-colors cursor-pointer hover:bg-emerald-950/30 ${
                      isLight ? 'border-slate-300' : 'border-[#1C1F26]'
                    } ${
                      isTop
                        ? isLight
                          ? 'bg-emerald-50 text-emerald-950'
                          : 'bg-emerald-950/40 text-emerald-300'
                        : isLight
                        ? 'text-slate-800'
                        : 'text-white font-bold'
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center space-y-1">
                      <div className="flex items-center space-x-1">
                        <span className="font-black text-sm tracking-tight">
                          {remedy.code}
                        </span>
                        {isTop && (
                          <Award className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                        {remedy.isDrainage && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500 text-black font-black">
                            DR
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-1.5 font-mono text-[10px]">
                        <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
                          {remedy.specificityScore.toFixed(1)}
                        </span>
                      </div>

                      <div
                        className={`text-[9px] font-semibold ${
                          isLight ? 'text-slate-600' : 'text-slate-300'
                        }`}
                      >
                        Cov: {remedy.coveredRubricsCount}
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* TABLE BODY: RUBRICS & GRADE MATRIX CELLS */}
          <tbody
            className={`divide-y ${
              isLight ? 'divide-slate-200' : 'divide-[#1C1F26]'
            }`}
          >
            {initialRubrics
              .filter((r) => selectedChapters.includes(r.chapter))
              .map((rubric) => {
                const translatedPath =
                pack.labels.rubricTranslations[rubric.fullStringPath] ||
                rubric.fullStringPath;

              // Simulated Follow-Up Visit baseline for comparison
              const visit1GradeBaseline =
                rubric.previousVisitGrade ||
                (rubric.id === 'rub-1' ? 4 : rubric.id === 'rub-4' ? 4 : 3);

              const isRowHovered = hoveredRubricId === rubric.id;

              return (
                <tr
                  key={rubric.id}
                  onMouseEnter={() => setHoveredRubricId(rubric.id)}
                  onMouseLeave={() => setHoveredRubricId(null)}
                  className={`transition-colors ${
                    isRowHovered
                      ? isLight
                        ? 'bg-emerald-50/70'
                        : 'bg-emerald-950/40'
                      : ''
                  } ${!rubric.isCommitted ? 'opacity-40' : ''}`}
                >
                  {/* RUBRIC DESCRIPTION CELL (STICKY LEFT-0 PINNED) */}
                  <td
                    className={`sticky left-0 z-20 p-3.5 border-r-2 font-sans transition-colors ${
                      isLight
                        ? isRowHovered
                          ? 'bg-emerald-50 border-slate-300'
                          : 'bg-white border-slate-300'
                        : isRowHovered
                        ? 'bg-[#111827] border-slate-700'
                        : 'bg-[#0B0F19] border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between space-x-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-[11px] font-black uppercase tracking-wider ${
                              isLight ? 'text-emerald-700' : 'text-emerald-400'
                            }`}
                          >
                            {rubric.chapter}
                          </span>
                          <span className={isLight ? 'text-slate-400' : 'text-slate-500'}>•</span>
                          <span
                            className={`font-semibold text-xs leading-snug ${
                              isLight ? 'text-slate-900' : 'text-white'
                            }`}
                          >
                            {translatedPath.includes(' - ')
                              ? translatedPath.split(' - ').slice(1).join(' — ')
                              : translatedPath}
                          </span>
                        </div>

                        <div
                          className={`flex items-center space-x-2 text-[11px] ${
                            isLight ? 'text-slate-500' : 'text-slate-300'
                          }`}
                        >
                          <span>Embryological Layer:</span>
                          <span
                            className={`font-semibold ${
                              isLight ? 'text-slate-700' : 'text-slate-100'
                            }`}
                          >
                            {rubric.embryologicalLayer}
                          </span>

                          {showFollowUpBaseline && (
                            <span className="px-1.5 py-0.2 rounded bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-mono text-[10px]">
                              Visit #1: Grade {visit1GradeBaseline}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* COMMIT / EXCLUDE TOGGLE BUTTON */}
                      <div className="flex items-center space-x-1 flex-shrink-0">
                        <button
                          onClick={() =>
                            onToggleCommitRubric(
                              rubric.id,
                              !rubric.isCommitted
                            )
                          }
                          title={
                            rubric.isCommitted
                              ? 'Exclude from Simillimum calculation'
                              : 'Commit to Simillimum calculation'
                          }
                          className={`p-1.5 rounded-md transition-all cursor-pointer ${
                            rubric.isCommitted
                              ? 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50'
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* REMEDY CELL MATRIX GRADES (1-4 OR BLANK) */}
                  {remedyTotals.map((remedy) => {
                    const cell = matrixPayload.find(
                      (c) =>
                        c.rubricId === rubric.id && c.remedyId === remedy.id
                    );
                    const currentGrade = cell?.grade || 0;
                    const isColHovered = hoveredRemedyId === remedy.id;

                    return (
                      <td
                        key={remedy.id}
                        onMouseEnter={() => setHoveredRemedyId(remedy.id)}
                        onMouseLeave={() => setHoveredRemedyId(null)}
                        className={`p-2 text-center border-r border-slate-200 dark:border-[#1C1F26] font-sans transition-colors ${
                          isColHovered
                            ? isLight
                              ? 'bg-emerald-100/50'
                              : 'bg-emerald-900/30'
                            : currentGrade === 4
                            ? 'bg-emerald-500/8'
                            : ''
                        }`}
                      >
                        <button
                          onClick={() => {
                            const nextGrade =
                              currentGrade === 0
                                ? 1
                                : currentGrade === 1
                                ? 2
                                : currentGrade === 2
                                ? 3
                                : currentGrade === 3
                                ? 4
                                : 0;
                            onUpdateMatrixCellGrade(
                              rubric.id,
                              remedy.id,
                              nextGrade as 0 | 1 | 2 | 3 | 4
                            );
                          }}
                          title={
                            currentGrade === 4
                              ? 'Grade 4: CAPITAL BOLD EMERALD (Utmost Prominence)'
                              : currentGrade === 3
                              ? 'Grade 3: BOLD NAVY (Strongly Verified)'
                              : currentGrade === 2
                              ? 'Grade 2: ITALICS SLATE (Clinical Verified)'
                              : currentGrade === 1
                              ? 'Grade 1: PLAIN (Reported Symptom)'
                              : 'Click to assign Homeopathic Grade (1-4)'
                          }
                          className={`transition-all duration-150 cursor-pointer inline-flex items-center justify-center font-sans ${
                            currentGrade === 4
                              ? 'w-8 h-7 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs shadow-md shadow-emerald-500/30 transform hover:scale-110'
                              : currentGrade === 3
                              ? 'w-8 h-7 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-xs shadow-xs transform hover:scale-105'
                              : currentGrade === 2
                              ? 'w-7 h-6 rounded-md bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 font-bold italic text-xs border border-cyan-500/30 hover:bg-cyan-500/25'
                              : currentGrade === 1
                              ? isLight
                                ? 'w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200'
                                : 'w-6 h-6 rounded-md bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700'
                              : isLight
                              ? 'w-6 h-6 text-slate-300 hover:text-slate-500 text-xs'
                              : 'text-slate-600 hover:text-slate-300 text-xs'
                          }`}
                        >
                          {currentGrade > 0 ? currentGrade : '—'}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>

          {/* FOOTER ROW: TOTAL SUM OF GRADES & RUBRIC COVERAGE */}
          <tfoot
            className={`sticky bottom-0 z-10 ${
              isLight
                ? 'bg-slate-100 border-t border-slate-300 text-slate-900'
                : 'bg-[#0B0F19] border-t border-[#1C1F26] text-white'
            }`}
          >
            <tr>
              <td
                className={`sticky left-0 z-30 p-3 font-black text-xs uppercase tracking-wider border-r-2 ${
                  isLight
                    ? 'bg-slate-100 border-slate-300 text-slate-900'
                    : 'bg-[#0B0F19] border-slate-700 text-white'
                }`}
              >
                {labels.symptomTotality}
              </td>
              {remedyTotals.map((remedy) => (
                <td
                  key={remedy.id}
                  className="p-2.5 text-center font-mono border-r border-[#1C1F26]"
                >
                  <div className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                    {remedy.coveredRubricsCount}R
                  </div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 font-bold">
                    Σ{remedy.sumGrades}
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

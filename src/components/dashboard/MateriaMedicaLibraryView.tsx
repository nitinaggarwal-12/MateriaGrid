'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Sparkles,
  Flame,
  Droplets,
  PlusCircle,
  CheckCircle2,
  GitCompare,
  Award,
  ShieldCheck,
  Info,
} from 'lucide-react';

interface MateriaMedicaLibraryViewProps {
  theme?: 'dark' | 'light';
  onAddRubricToMatrix?: (rubricPath: string) => void;
}

interface RemedyProvingEntry {
  code: string;
  fullName: string;
  botanicalName: string;
  family: string;
  thermal: string;
  thirst: string;
  authorityProvenance: 'HAHNEMANN_PURE' | 'KENT_LECTURES' | 'BOERICKE' | 'VIJAYAKAR';
  keynotes: {
    rubricPath: string;
    description: string;
    provingNumber: string;
    grade: 1 | 2 | 3 | 4;
  }[];
  mentalROH: string;
  organAffinities: string[];
  safePotencyRange: string;
}

export const MateriaMedicaLibraryView: React.FC<
  MateriaMedicaLibraryViewProps
> = ({ theme = 'dark', onAddRubricToMatrix }) => {
  const isLight = theme === 'light';

  const remediesData: RemedyProvingEntry[] = [
    {
      code: 'Bell',
      fullName: 'Belladonna',
      botanicalName: 'Atropa belladonna (Deadly Nightshade)',
      family: 'Plant (Solanaceae)',
      thermal: 'HOT (Amel. by Cold application)',
      thirst: 'THIRSTLESS or small sips during fever',
      authorityProvenance: 'HAHNEMANN_PURE',
      keynotes: [
        {
          rubricPath: 'HEAD - PAIN - pulsating - sudden',
          description: 'Suddenness of manifestation and violent throbbing inflammation.',
          provingNumber: 'Hahnemann Symptom #342',
          grade: 4,
        },
        {
          rubricPath: 'EYES - PUPILS - dilated - insensitive to light',
          description: 'Glassy staring eyes with wide pupils insensitive to bright light.',
          provingNumber: 'Hahnemann Symptom #189',
          grade: 4,
        },
        {
          rubricPath: 'MIND - BUSINESS - talks of',
          description: 'Delirium with wild excitement, desire to bite, talks constantly of business.',
          provingNumber: 'Sehgal ROH Vol. II #44',
          grade: 4,
        },
      ],
      mentalROH: 'Excited, furious, sees monstrous faces, talks of business, talks fast and impulsively.',
      organAffinities: ['Cerebral Carotids', 'Mucosal Epithelium', 'Right Auditory Nerve'],
      safePotencyRange: '30C to 200C (Acute); LM 0/1 in sensitive constitutions.',
    },
    {
      code: 'Chel',
      fullName: 'Chelidonium majus',
      botanicalName: 'Chelidonium majus (Greater Celandine)',
      family: 'Plant (Papaveraceae)',
      thermal: 'HOT (Desires warm drinks)',
      thirst: 'THIRSTY for hot boiling liquids',
      authorityProvenance: 'BOERICKE',
      keynotes: [
        {
          rubricPath: 'ABDOMEN - PAIN - right scapula - under lower angle',
          description: 'Constant pathognomonic shooting pain under inferior angle of right scapula.',
          provingNumber: 'Kent Keynote #12',
          grade: 4,
        },
        {
          rubricPath: 'ABDOMEN - CIRRHOSIS - liver - chronic parenchyma',
          description: 'Enlargement and hypertrophy of liver with clay-colored stools.',
          provingNumber: 'Burnett Organopathy #04',
          grade: 4,
        },
      ],
      mentalROH: 'Domineering, dictatorial, practical, focused on liver pain relieving.',
      organAffinities: ['Hepatic Parenchyma', 'Gallbladder Bile Duct', 'Right Scapular Nerve'],
      safePotencyRange: '1X to 6X Mother Tincture for Organopathy Drainage; 30C Constitutional.',
    },
    {
      code: 'Sulph',
      fullName: 'Sulphur',
      botanicalName: 'Sulphur (Sublimed Sulphur)',
      family: 'Mineral (Elemental)',
      thermal: 'HOT (Kicks off bed covers)',
      thirst: 'THIRSTY for cold water in large quantities',
      authorityProvenance: 'KENT_LECTURES',
      keynotes: [
        {
          rubricPath: 'SKIN - ERUPTIONS - scaly - dry - silvery scales',
          description: 'Voluptuous itching aggravated by warmth of bed, washing causes burning.',
          provingNumber: 'Hahnemann Chronic Diseases #812',
          grade: 4,
        },
        {
          rubricPath: 'GENERALITIES - AGGRAVATION - 11 am - sinking at stomach',
          description: 'Empty faint gnawing hunger at 11 AM exact.',
          provingNumber: 'Kent Lectures p. 892',
          grade: 4,
        },
      ],
      mentalROH: 'Ragged philosopher, theoretical, egoistic, disdains social conventions.',
      organAffinities: ['Venous Portal Circulation', 'Epidermal Stratum Corneum', 'Mesenteric Lymphatics'],
      safePotencyRange: '200C to 10M (Antipsoric King); Avoid frequent repetitions.',
    },
  ];

  const [selectedRemedyCode, setSelectedRemedyCode] = useState<string>('Bell');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [authorityFilter, setAuthorityFilter] = useState<string>('ALL');
  const [addedRubrics, setAddedRubrics] = useState<Record<string, boolean>>({});

  const filteredRemedies = remediesData.filter((r) => {
    const matchesSearch =
      r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAuthority =
      authorityFilter === 'ALL' || r.authorityProvenance === authorityFilter;
    return matchesSearch && matchesAuthority;
  });

  const activeRemedy =
    remediesData.find((r) => r.code === selectedRemedyCode) || remediesData[0];

  const handleAddRubric = (rubricPath: string) => {
    setAddedRubrics((prev) => ({ ...prev, [rubricPath]: true }));
    if (onAddRubricToMatrix) {
      onAddRubricToMatrix(rubricPath);
    }
  };

  return (
    <div
      className={`w-full h-full overflow-hidden flex flex-col font-mono transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#05070A] text-white'
      }`}
    >
      {/* EXECUTIVE TOP BAR */}
      <div
        className={`p-4 border-b flex flex-wrap items-center justify-between gap-4 flex-shrink-0 ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-[#0B0F19] border-[#1C1F26] text-white'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-black shadow-md">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-black text-sm uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              CLASSICAL MATERIA MEDICA & PROVING DIFFERENTIAL EXPLORER
            </h2>
            <p
              className={`text-xs ${
                isLight ? 'text-slate-600' : 'text-gray-400'
              }`}
            >
              Verbatim Provenance across Hahnemann Pure Materia Medica, Kent Lectures & Vijayakar Keynotes
            </p>
          </div>
        </div>

        {/* AUTHORITY PROVENANCE FILTER TABS */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'ALL', label: 'All Provenances' },
            { id: 'HAHNEMANN_PURE', label: 'Hahnemann Pure' },
            { id: 'KENT_LECTURES', label: 'Kent Lectures' },
            { id: 'BOERICKE', label: 'Boericke Pocket' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setAuthorityFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                authorityFilter === tab.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : isLight
                  ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TWO-COLUMN EXPLORER CANVAS */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT COLUMN: REMEDY SEARCH & SELECTION TRAY */}
        <div
          className={`w-full lg:w-72 border-b lg:border-b-0 lg:border-r flex flex-col ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-[#0B0F19] border-[#1C1F26]'
          }`}
        >
          <div className="p-3 border-b border-slate-200 dark:border-slate-800">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search remedy or symptom..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-3 py-1.5 rounded-xl text-xs font-bold border outline-none ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-900'
                    : 'bg-[#111317] border-slate-800 text-white'
                }`}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
            {filteredRemedies.map((remedy) => {
              const isActive = remedy.code === activeRemedy.code;
              return (
                <button
                  key={remedy.code}
                  onClick={() => setSelectedRemedyCode(remedy.code)}
                  className={`w-full text-left p-3 rounded-xl border transition-all transform hover:scale-[1.01] cursor-pointer ${
                    isActive
                      ? isLight
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-sm'
                        : 'bg-gradient-to-r from-emerald-600/20 to-teal-600/10 border-emerald-500 text-white font-bold shadow-md'
                      : isLight
                      ? 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'
                      : 'bg-[#111317] border-slate-800 text-gray-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-emerald-600 dark:text-emerald-400">
                      {remedy.code}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-black ${
                        isLight
                          ? 'bg-slate-200 text-slate-800'
                          : 'bg-slate-800 text-gray-300'
                      }`}
                    >
                      Grade 4
                    </span>
                  </div>
                  <p
                    className={`text-xs font-bold mt-0.5 ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {remedy.fullName}
                  </p>
                  <p
                    className={`text-[10px] mt-0.5 ${
                      isLight ? 'text-slate-500' : 'text-gray-400'
                    }`}
                  >
                    {remedy.family}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: RICH INTERACTIVE PROVING CARD & CLINICAL KEYNOTES */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* REMEDY TITLE & BASELINE HEADER */}
          <div
            className={`p-6 rounded-2xl border space-y-4 shadow-xl ${
              isLight
                ? 'bg-white border-slate-200'
                : 'bg-[#0B0F19] border-[#1C1F26]'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1
                  className={`text-2xl font-black flex items-center gap-2 ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-black text-lg">
                    {activeRemedy.code}
                  </span>
                  <span>{activeRemedy.fullName}</span>
                </h1>
                <p
                  className={`text-xs mt-1.5 ${
                    isLight ? 'text-slate-600' : 'text-gray-400'
                  }`}
                >
                  Botanical / Mineral Profile:{' '}
                  <strong
                    className={isLight ? 'text-slate-900' : 'text-white'}
                  >
                    {activeRemedy.botanicalName}
                  </strong>{' '}
                  • {activeRemedy.family}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`px-3 py-1.5 rounded-xl border font-black text-xs ${
                    isLight
                      ? 'bg-orange-50 border-orange-300 text-orange-900'
                      : 'bg-orange-500/20 border-orange-500/40 text-orange-400'
                  }`}
                >
                  🔥 {activeRemedy.thermal}
                </span>
                <span
                  className={`px-3 py-1.5 rounded-xl border font-black text-xs ${
                    isLight
                      ? 'bg-cyan-50 border-cyan-300 text-cyan-900'
                      : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
                  }`}
                >
                  💧 {activeRemedy.thirst}
                </span>
              </div>
            </div>

            {/* CORE PROVING KEYNOTES WITH ONE-CLICK "ADD TO LIVE SIMILIMATRIX" */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> CORE PROVING KEYNOTES & ONE-CLICK RUBRIC INJECTION
                </span>
                <span
                  className={`text-[11px] ${
                    isLight ? 'text-slate-500' : 'text-gray-400'
                  }`}
                >
                  HOVER KEYNOTE FOR EXACT HAHNEMANN PROVING CITATION
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeRemedy.keynotes.map((keynote, idx) => {
                  const isAdded = addedRubrics[keynote.rubricPath];
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border transition-all transform hover:scale-[1.02] flex flex-col justify-between space-y-3 ${
                        isLight
                          ? 'bg-slate-50 border-slate-200'
                          : 'bg-[#111317] border-slate-800'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-600 text-white">
                            GRADE {keynote.grade}
                          </span>
                          <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold">
                            {keynote.provingNumber}
                          </span>
                        </div>
                        <p
                          className={`font-black text-xs leading-snug ${
                            isLight ? 'text-slate-900' : 'text-white'
                          }`}
                        >
                          {keynote.rubricPath}
                        </p>
                        <p
                          className={`text-xs leading-relaxed ${
                            isLight ? 'text-slate-600' : 'text-gray-300'
                          }`}
                        >
                          {keynote.description}
                        </p>
                      </div>

                      {/* ACTION BUTTON: ONE-CLICK ADD TO SIMILIMATRIX */}
                      <button
                        onClick={() => handleAddRubric(keynote.rubricPath)}
                        className={`w-full py-2 rounded-lg font-black text-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : isLight
                            ? 'bg-slate-200 hover:bg-emerald-600 text-slate-800 hover:text-white'
                            : 'bg-slate-800 hover:bg-emerald-600 text-gray-300 hover:text-white'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>ADDED TO LIVE SIMILIMATRIX</span>
                          </>
                        ) : (
                          <>
                            <PlusCircle className="w-3.5 h-3.5" />
                            <span>+ Add to Consultation Matrix</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SEHGAL ROH MENTAL AXIS & ORGAN AFFINITIES */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
              <div
                className={`p-4 rounded-xl border space-y-1.5 text-xs ${
                  isLight
                    ? 'bg-purple-50 border-purple-200 text-purple-950'
                    : 'bg-purple-950/40 border-purple-500/40 text-white'
                }`}
              >
                <span className="font-black text-purple-700 dark:text-purple-300 uppercase">
                  🧠 MENTAL & EMOTIONAL KEYNOTES (SEHGAL ROH AXIS)
                </span>
                <p
                  className={`leading-relaxed font-bold ${
                    isLight ? 'text-slate-800' : 'text-white'
                  }`}
                >
                  {activeRemedy.mentalROH}
                </p>
              </div>

              <div
                className={`p-4 rounded-xl border space-y-1.5 text-xs ${
                  isLight
                    ? 'bg-cyan-50 border-cyan-200 text-cyan-950'
                    : 'bg-cyan-950/40 border-cyan-500/40 text-white'
                }`}
              >
                <span className="font-black text-cyan-700 dark:text-cyan-300 uppercase">
                  🎯 PARTICULAR ORGAN AFFINITIES & PATHOLOGICAL TROPISM
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeRemedy.organAffinities.map((org, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 rounded font-bold ${
                        isLight
                          ? 'bg-cyan-100 text-cyan-900'
                          : 'bg-cyan-900/60 text-cyan-200'
                      }`}
                    >
                      {org}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* SAFE CLINICAL POTENCY RANGE */}
            <div
              className={`p-3.5 rounded-xl border text-xs flex flex-wrap items-center justify-between gap-2 ${
                isLight
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-emerald-950/40 border-emerald-500/40 text-white'
              }`}
            >
              <span className="font-black text-emerald-700 dark:text-emerald-300">
                🛡️ Safe Potency Range & Clinical Administration:
              </span>
              <span
                className={`font-black ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {activeRemedy.safePotencyRange}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MateriaMedicaLibraryView;

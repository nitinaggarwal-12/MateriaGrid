'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Flame,
  Droplets,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface MateriaMedicaLibraryViewProps {
  theme?: 'dark' | 'light';
}

export const MateriaMedicaLibraryView: React.FC<
  MateriaMedicaLibraryViewProps
> = ({ theme = 'light' }) => {
  const isLight = theme === 'light';
  const [selectedCode, setSelectedCode] = useState('Bell');
  const [searchQuery, setSearchQuery] = useState('');

  const remedies = [
    {
      code: 'Bell',
      name: 'Belladonna',
      botanical: 'Atropa belladonna (Deadly Nightshade)',
      family: 'Plant (Solanaceae)',
      thermal: 'HOT (Amel. by Cold application)',
      thirst: 'THIRSTLESS or small sips during fever',
      keynotes: [
        'Suddenness of manifestation and intensity of symptoms.',
        'Heat, redness, throbbing, and burning inflammation.',
        'Delirium with wild excitement and desire to bite or strike.',
        'Right-sided complaints, aggravated by light, noise, motion, or jarring.',
      ],
      sehgalRoh:
        'Excited, furious, sees monstrous faces, talks of business, talks fast and impulsively.',
      physicalGenerals:
        'Head hot with cold extremities. Pulsating carotids. Dry mouth and throat without thirst.',
      potencyRange: '30C to 200C (Acute); LM 0/1 in sensitive constitutions.',
    },
    {
      code: 'Chel',
      name: 'Chelidonium majus',
      botanical: 'Chelidonium majus (Greater Celandine)',
      family: 'Plant (Papaveraceae)',
      thermal: 'HOT (Amel. by Warmth & boiling drinks)',
      thirst: 'THIRSTY for hot drinks',
      keynotes: [
        'Constant pain under lower inner angle of right scapula.',
        'Hepatic congestion, jaundice, liver enlargement with yellow tongue.',
        'Alternating constipation and diarrhea.',
        'Aggravated by motion, change of weather, right side.',
      ],
      sehgalRoh:
        'Opinionated, practical, business talks, desires quiet but analytical.',
      physicalGenerals:
        'Yellow skin, sclera, and urine. Right-sided liver inflammation.',
      potencyRange:
        '1X Mother Tincture for organopathy; LM 0/1 for constitutional.',
    },
    {
      code: 'Sulph',
      name: 'Sulphur',
      botanical: 'Sublimed Sulphur (Brimstone)',
      family: 'Mineral (Elemental Sulphur)',
      thermal: 'HOT (Worse warmth of bed & heat)',
      thirst: 'THIRSTY for large quantities',
      keynotes: [
        'Standing is the most painful position for Sulphur patients.',
        'Burning in soles of feet and crown of head.',
        'Aversion to washing; unwashed appearance.',
        'Empty, gone feeling in stomach at 11 AM.',
      ],
      sehgalRoh:
        'Philosophical, ragpicker, values worthless items as treasures.',
      physicalGenerals:
        'Red orifices (lips, eyelids, anus). Excessive heat and itchiness.',
      potencyRange: '30C to 10M; caution in structural tuberculosis.',
    },
    {
      code: 'Acon',
      name: 'Aconitum napellus',
      botanical: 'Aconitum napellus (Monkshood)',
      family: 'Plant (Ranunculaceae)',
      thermal: 'CHILLY (Worse cold dry winds)',
      thirst: 'THIRSTY for unquenchable cold water',
      keynotes: [
        'Great fear and anxiety of mind with nervous excitability.',
        'Predicts the exact hour of death.',
        'Complaints from exposure to cold, dry wind.',
        'Sudden acute inflammatory fevers.',
      ],
      sehgalRoh:
        'Fear of death, agony, restless tossing, predicts time of death.',
      physicalGenerals:
        'Hot dry skin without perspiration. Full bounding pulse.',
      potencyRange: '30C to 200C acute administration.',
    },
    {
      code: 'Bry',
      name: 'Bryonia alba',
      botanical: 'Bryonia alba (White Bryony)',
      family: 'Plant (Cucurbitaceae)',
      thermal: 'HOT (Desires cool air & cold drinks)',
      thirst: 'THIRSTY for large quantities at long intervals',
      keynotes: [
        'Excessive dryness of all mucous membranes.',
        'Stitching pains aggravated by slightest motion.',
        'Ameliorated by firm pressure and lying on painful side.',
        'Talks of business constantly during delirium.',
      ],
      sehgalRoh:
        'MIND - BUSINESS - talks of (Grade 4 keynote), desires to go home.',
      physicalGenerals:
        'Dry parched lips, hard dark stool, joint synovial effusions.',
      potencyRange: '30C to 200C in serous inflammation.',
    },
  ];

  const filteredRemedies = remedies.filter(
    (r) =>
      r.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeRemedy =
    remedies.find((r) => r.code === selectedCode) || remedies[0];

  return (
    <div
      className={`w-full h-full flex flex-col font-sans select-none overflow-hidden transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#090A0C] text-[#E6E8EA]'
      }`}
    >
      {/* HEADER */}
      <div
        className={`p-3 border-b flex items-center justify-between sticky top-0 z-20 ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#111317] border-[#1C1F26]'
        }`}
      >
        <div className="flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <div>
            <h2 className="font-bold text-xs uppercase tracking-wider">
              Classical Materia Medica & Proving Differential Library
            </h2>
            <p className="text-[10px] text-gray-500 font-mono">
              Verbatim Reference across Boericke, J.T. Kent, Dr. Sehgal ROH, and Dr. Vijayakar Predictive Baselines
            </p>
          </div>
        </div>

        <span className="text-[10px] text-gray-500 font-mono">
          URL: <span className="text-emerald-600">/workspace?module=MATERIA_MEDICA_LIBRARY</span>
        </span>
      </div>

      {/* DUAL CANVAS: LEFT REMEDY LIST & RIGHT CLASSICAL CARD WORKBENCH */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT REMEDY SELECTOR LIST */}
        <div
          className={`w-72 min-w-[280px] border-r flex flex-col overflow-hidden ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-[#111317] border-[#1C1F26]'
          }`}
        >
          <div className="p-2.5 border-b border-slate-200 relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search remedy..."
              className={`w-full border rounded pl-8 pr-3 py-1.5 text-xs font-mono focus:outline-none focus:border-emerald-600 ${
                isLight
                  ? 'bg-slate-50 border-slate-300 text-slate-900'
                  : 'bg-[#090A0C] border-[#1C1F26] text-white'
              }`}
            />
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredRemedies.map((rem) => {
              const isSelected = rem.code === selectedCode;
              return (
                <button
                  key={rem.code}
                  onClick={() => setSelectedCode(rem.code)}
                  className={`w-full text-left p-2.5 rounded transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                      : isLight
                      ? 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                      : 'bg-[#090A0C] border-[#1C1F26] hover:bg-[#1C1F26]/60 text-gray-300'
                  }`}
                >
                  <div className="font-black text-xs">{rem.code}</div>
                  <div
                    className={`text-[11px] truncate ${
                      isSelected ? 'text-emerald-100' : 'text-gray-500'
                    }`}
                  >
                    {rem.name} ({rem.botanical.split(' ')[0]})
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT PROVING DATA CARDS */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* REMEDY BRAND BANNER */}
          <div
            className={`border rounded-lg p-4 flex flex-wrap items-center justify-between gap-4 ${
              isLight
                ? 'bg-white border-slate-200 shadow-xs'
                : 'bg-[#111317] border-[#1C1F26]'
            }`}
          >
            <div>
              <h2 className="text-xl font-black text-emerald-600 font-mono">
                {activeRemedy.name} ({activeRemedy.botanical})
              </h2>
              <p className="text-xs text-gray-500 font-mono mt-0.5">
                Family: {activeRemedy.family}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="flex items-center gap-1 bg-orange-50 border border-orange-200 text-orange-700 px-2.5 py-1 rounded font-bold">
                <Flame className="w-3.5 h-3.5" /> {activeRemedy.thermal}
              </span>
              <span className="flex items-center gap-1 bg-cyan-50 border border-cyan-200 text-cyan-700 px-2.5 py-1 rounded font-bold">
                <Droplets className="w-3.5 h-3.5" /> {activeRemedy.thirst}
              </span>
            </div>
          </div>

          {/* CORE PROVING KEYNOTES CARD */}
          <div
            className={`border rounded-lg p-4 space-y-3 ${
              isLight
                ? 'bg-white border-slate-200 shadow-xs'
                : 'bg-[#111317] border-[#1C1F26]'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-mono flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Core Proving Keynotes & Specificities
            </span>
            <ul className="list-disc list-inside space-y-1.5 text-xs leading-relaxed">
              {activeRemedy.keynotes.map((k, idx) => (
                <li key={idx} className="font-sans">
                  {k}
                </li>
              ))}
            </ul>
          </div>

          {/* SEHGAL ROH & PHYSICAL GENERALS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`border rounded-lg p-4 space-y-2 ${
                isLight
                  ? 'bg-white border-slate-200 shadow-xs'
                  : 'bg-[#111317] border-[#1C1F26]'
              }`}
            >
              <span className="text-xs font-bold uppercase text-purple-600 font-mono">
                Mental & Emotional Keynotes (Sehgal ROH Axis)
              </span>
              <p className="text-xs leading-relaxed">{activeRemedy.sehgalRoh}</p>
            </div>

            <div
              className={`border rounded-lg p-4 space-y-2 ${
                isLight
                  ? 'bg-white border-slate-200 shadow-xs'
                  : 'bg-[#111317] border-[#1C1F26]'
              }`}
            >
              <span className="text-xs font-bold uppercase text-blue-600 font-mono">
                Physical Generals & Particular Organ Affinities
              </span>
              <p className="text-xs leading-relaxed">
                {activeRemedy.physicalGenerals}
              </p>
            </div>
          </div>

          {/* SAFE POTENCY RANGE BANNER */}
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-mono flex items-center justify-between">
            <span className="flex items-center space-x-2 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safe Potency Range & Clinical Administration: {activeRemedy.potencyRange}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MateriaMedicaLibraryView;

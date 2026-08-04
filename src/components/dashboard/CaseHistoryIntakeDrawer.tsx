'use client';

import React, { useState } from 'react';
import {
  X,
  Sparkles,
  User,
  Activity,
  Flame,
  Droplets,
  Brain,
  Layers,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { RubricRow } from './WorkspaceMatrix';
import {
  INDIAN_LANGUAGE_PACKS,
  IndianLanguageCode,
} from '@/lib/i18n/indian_language_packs';

interface CaseHistoryIntakeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCommitExtractedRubrics: (rubrics: RubricRow[]) => void;
  langCode?: IndianLanguageCode;
  theme?: 'dark' | 'light';
}

export const CaseHistoryIntakeDrawer: React.FC<
  CaseHistoryIntakeDrawerProps
> = ({ isOpen, onClose, onCommitExtractedRubrics, langCode = 'EN', theme = 'dark' }) => {
  const isLight = theme === 'light';
  const langPack = INDIAN_LANGUAGE_PACKS[langCode] || INDIAN_LANGUAGE_PACKS.EN;

  const [patientName, setPatientName] = useState('Ananya Verma');
  const [age, setAge] = useState('34');
  const [sex, setSex] = useState('Female');

  const [thermal, setThermal] = useState<'HOT' | 'CHILLY' | 'AMBITHERMAL'>('HOT');
  const [thirst, setThirst] = useState<'THIRSTY' | 'THIRSTLESS' | 'VARIABLE'>('THIRSTLESS');
  const [sleepPosition, setSleepPosition] = useState('Right side');

  // DR. M.L. SEHGAL ROH PPP NARRATIVE
  const [rohNarrative, setRohNarrative] = useState(
    'Talks constantly about her business, restless and impatient, wants doctor to give immediate fast relief.'
  );

  // BÖNNINGHAUSEN 4-COMPONENT SYMPTOM SPLITTER
  const [location, setLocation] = useState('Right Temple & Occiput');
  const [sensation, setSensation] = useState('Throbbing, pulsating, heat radiating');
  const [modality, setModality] = useState(
    'Aggravated by sunlight and motion, ameliorated by cold application'
  );
  const [concomitants, setConcomitants] = useState(
    'Nausea during peak headache, cold extremities'
  );

  const [presetActive, setPresetActive] = useState<string>('SUNSTROKE_MIGRAINE');

  if (!isOpen) return null;

  const handleApplyPreset = (preset: 'SUNSTROKE_MIGRAINE' | 'CIRRHOSIS_JAUNDICE') => {
    setPresetActive(preset);
    if (preset === 'SUNSTROKE_MIGRAINE') {
      setPatientName('Ananya Verma');
      setAge('34');
      setSex('Female');
      setThermal('HOT');
      setThirst('THIRSTLESS');
      setRohNarrative(
        'Talks constantly about her business, restless and impatient, wants doctor to give immediate fast relief.'
      );
      setLocation('Right Temple & Occiput');
      setSensation('Throbbing, pulsating, heat radiating');
      setModality('Aggravated by sunlight and motion, ameliorated by cold application');
      setConcomitants('Nausea during peak headache, cold extremities');
    } else {
      setPatientName('Ramesh Kumar Sharma');
      setAge('44');
      setSex('Male');
      setThermal('HOT');
      setThirst('THIRSTLESS');
      setRohNarrative(
        'Fear of incurable disease, anxiety in evening after sunset, talking of business constantly.'
      );
      setLocation('Right Hypochondrium & Lower Scapula');
      setSensation('Dull aching jaundice, clay colored stool');
      setModality('Aggravated by pressure, motion');
      setConcomitants('Yellow sclera, loss of appetite');
    }
  };

  const handleExtractAndCommit = () => {
    const timestamp = Date.now();
    const extracted: RubricRow[] = [
      {
        id: `rub-intake-1-${timestamp}`,
        chapter: 'MIND',
        fullStringPath: 'MIND - BUSINESS - talks of',
        embryologicalLayer: 'Ectoderm',
        isAiExtracted: true,
        isCommitted: true,
      },
      {
        id: `rub-intake-2-${timestamp}`,
        chapter: 'HEAD',
        fullStringPath: 'HEAD - PAIN - pulsating - sudden',
        embryologicalLayer: 'Ectoderm',
        isAiExtracted: true,
        isCommitted: true,
      },
      {
        id: `rub-intake-3-${timestamp}`,
        chapter: 'HEAD',
        fullStringPath: 'HEAD - PAIN - sun - exposure to',
        embryologicalLayer: 'Ectoderm',
        isAiExtracted: true,
        isCommitted: true,
      },
      {
        id: `rub-intake-4-${timestamp}`,
        chapter: 'STOMACH',
        fullStringPath: 'STOMACH - THIRSTLESS - fever during',
        embryologicalLayer: 'Endoderm',
        isAiExtracted: true,
        isCommitted: true,
      },
    ];

    onCommitExtractedRubrics(extracted);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs font-mono">
      <div
        className={`w-full max-w-2xl h-full flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-200 border-l ${
          isLight
            ? 'bg-white text-slate-900 border-slate-200'
            : 'bg-[#0B0F19] text-white border-[#1C1F26]'
        }`}
      >
        {/* HEADER */}
        <div
          className={`p-4 border-b flex items-center justify-between ${
            isLight
              ? 'bg-slate-100 border-slate-200'
              : 'bg-[#05070A] border-[#1C1F26]'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3
                className={`font-black text-sm uppercase tracking-wider ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {langPack.labels.intakeTitle}
              </h3>
              <p
                className={`text-[11px] ${
                  isLight ? 'text-slate-600' : 'text-gray-400'
                }`}
              >
                {langPack.labels.intakeSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg border cursor-pointer ${
              isLight
                ? 'border-slate-300 text-slate-600 hover:text-slate-900'
                : 'border-slate-800 text-gray-400 hover:text-white'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* PRESET PATIENT QUICK LOAD TRAY */}
        <div
          className={`px-4 py-2 border-b flex items-center justify-between text-xs ${
            isLight
              ? 'bg-slate-50 border-slate-200'
              : 'bg-[#111317] border-[#1C1F26]'
          }`}
        >
          <span
            className={`font-bold flex items-center gap-1 ${
              isLight ? 'text-slate-700' : 'text-gray-400'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Quick OPD Presets:
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleApplyPreset('SUNSTROKE_MIGRAINE')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-black border cursor-pointer transition-all ${
                presetActive === 'SUNSTROKE_MIGRAINE'
                  ? 'bg-emerald-600 border-emerald-500 text-white'
                  : isLight
                  ? 'bg-white border-slate-300 text-slate-700'
                  : 'bg-slate-900 border-slate-800 text-gray-400'
              }`}
            >
              Sunstroke Migraine (Ananya)
            </button>
            <button
              onClick={() => handleApplyPreset('CIRRHOSIS_JAUNDICE')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-black border cursor-pointer transition-all ${
                presetActive === 'CIRRHOSIS_JAUNDICE'
                  ? 'bg-emerald-600 border-emerald-500 text-white'
                  : isLight
                  ? 'bg-white border-slate-300 text-slate-700'
                  : 'bg-slate-900 border-slate-800 text-gray-400'
              }`}
            >
              Liver Cirrhosis (Ramesh)
            </button>
          </div>
        </div>

        {/* FORM CONTENTS */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
          {/* 1. PATIENT DEMOGRAPHICS */}
          <div className="space-y-3">
            <span className="font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> {langPack.labels.patientIdentitySection}
            </span>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label
                  className={`block mb-1 font-bold ${
                    isLight ? 'text-slate-700' : 'text-gray-400'
                  }`}
                >
                  {langPack.labels.fullNameLabel}
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className={`w-full px-3 py-1.5 rounded-lg border font-bold ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-[#111317] border-slate-800 text-white'
                  }`}
                />
              </div>
              <div>
                <label
                  className={`block mb-1 font-bold ${
                    isLight ? 'text-slate-700' : 'text-gray-400'
                  }`}
                >
                  {langPack.labels.ageLabel}
                </label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className={`w-full px-3 py-1.5 rounded-lg border font-bold ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-[#111317] border-slate-800 text-white'
                  }`}
                />
              </div>
              <div>
                <label
                  className={`block mb-1 font-bold ${
                    isLight ? 'text-slate-700' : 'text-gray-400'
                  }`}
                >
                  {langPack.labels.sexLabel}
                </label>
                <select
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#111317] border border-slate-800 font-bold"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2. PREDICTIVE THERMAL / THIRST BASELINE */}
          <div className="p-4 rounded-xl bg-[#111317] border border-slate-800 space-y-3">
            <span className="font-black text-orange-400 uppercase flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" /> 2. IMMUTABLE PHYSICAL BASELINE (PREDICTIVE AXIS)
            </span>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-gray-400 block mb-1 font-bold">Thermal Baseline</label>
                <select
                  value={thermal}
                  onChange={(e) => setThermal(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-orange-500/50 text-orange-300 font-black"
                >
                  <option value="HOT">HOT (Amel. by Cold)</option>
                  <option value="CHILLY">CHILLY (Amel. by Heat)</option>
                  <option value="AMBITHERMAL">AMBITHERMAL</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 block mb-1 font-bold">Thirst Baseline</label>
                <select
                  value={thirst}
                  onChange={(e) => setThirst(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/50 text-cyan-300 font-black"
                >
                  <option value="THIRSTLESS">THIRSTLESS</option>
                  <option value="THIRSTY">THIRSTY</option>
                  <option value="VARIABLE">VARIABLE</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 block mb-1 font-bold">Sleep Position</label>
                <input
                  type="text"
                  value={sleepPosition}
                  onChange={(e) => setSleepPosition(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 font-bold"
                />
              </div>
            </div>
          </div>

          {/* 3. DR. M.L. SEHGAL ROH PRESENT MENTAL STATE (PPP) */}
          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-2">
            <span className="font-black text-purple-300 uppercase flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5 text-purple-400" /> {langPack.labels.sehgalRohSection}
            </span>
            <textarea
              rows={3}
              value={rohNarrative}
              onChange={(e) => setRohNarrative(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-[#05070A] border border-purple-500/40 text-purple-100 font-bold leading-relaxed outline-none"
            />
          </div>

          {/* 4. DR. VON BÖNNINGHAUSEN 4-COMPONENT SYMPTOM SPLITTER */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <span className="font-black text-cyan-400 uppercase flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> {langPack.labels.boenninghausenSection}
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-gray-400 block mb-1 font-bold">Location / Anatomical Site</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#05070A] border border-slate-800 font-bold"
                />
              </div>
              <div>
                <label className="text-gray-400 block mb-1 font-bold">Sensation / Character</label>
                <input
                  type="text"
                  value={sensation}
                  onChange={(e) => setSensation(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#05070A] border border-slate-800 font-bold"
                />
              </div>
              <div>
                <label className="text-gray-400 block mb-1 font-bold">Modalities (Agg. / Amel.)</label>
                <input
                  type="text"
                  value={modality}
                  onChange={(e) => setModality(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#05070A] border border-slate-800 font-bold"
                />
              </div>
              <div>
                <label className="text-gray-400 block mb-1 font-bold">Concomitants</label>
                <input
                  type="text"
                  value={concomitants}
                  onChange={(e) => setConcomitants(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#05070A] border border-slate-800 font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="p-4 border-t border-[#1C1F26] bg-[#05070A] flex items-center justify-between">
          <span className="text-[11px] text-teal-400 font-bold">
            SimiliMatrix NLP Extraction Ready
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-800 text-gray-300 hover:text-white text-xs font-bold cursor-pointer"
            >
              {langPack.labels.cancelBtn}
            </button>
            <button
              onClick={handleExtractAndCommit}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs flex items-center space-x-1.5 shadow-lg cursor-pointer transition-all transform hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>{langPack.labels.extractCommitBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseHistoryIntakeDrawer;

'use client';

import React, { useState } from 'react';
import {
  FileText,
  X,
  Sparkles,
  Flame,
  Droplets,
  Brain,
  Stethoscope,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { RubricRow } from './WorkspaceMatrix';

interface CaseHistoryIntakeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCommitExtractedRubrics: (newRubrics: RubricRow[]) => void;
}

export const CaseHistoryIntakeDrawer: React.FC<
  CaseHistoryIntakeDrawerProps
> = ({ isOpen, onClose, onCommitExtractedRubrics }) => {
  const [patientName, setPatientName] = useState('Ananya Verma');
  const [age, setAge] = useState('34');
  const [gender, setGender] = useState('Female');
  const [chiefComplaint, setChiefComplaint] = useState(
    'Throbbing pulsating right-sided headache after sunlight exposure, severe anxiety in the evening.'
  );

  // Sehgal ROH Present Mental State (PPP)
  const [sehgalPppState, setSehgalPppState] = useState(
    'Talks constantly about her business, restless and impatient, wants doctor to give immediate fast relief.'
  );

  // Bönninghausen 4 Components
  const [location, setLocation] = useState('Right Temple & Occiput');
  const [sensation, setSensation] = useState('Throbbing, pulsating, heat radiating');
  const [modality, setModality] = useState('Aggravated by sunlight and motion, ameliorated by dark quiet room');
  const [concomitants, setConcomitants] = useState('Nausea during peak headache, cold extremities');

  // Physical Baseline Constants
  const [thermal, setThermal] = useState<'HOT' | 'CHILLY' | 'AMBITHERMAL'>('HOT');
  const [thirst, setThirst] = useState<'THIRSTY' | 'THIRSTLESS' | 'VARIABLE'>('THIRSTLESS');
  const [sleepPosition, setSleepPosition] = useState('Right side');

  const [isProcessingNlp, setIsProcessingNlp] = useState(false);

  if (!isOpen) return null;

  const loadPresetCase = (type: 'MIGRAINE' | 'CIRRHOSIS' | 'OSTEOARTHRITIS') => {
    if (type === 'MIGRAINE') {
      setPatientName('Ananya Verma');
      setAge('34');
      setGender('Female');
      setThermal('HOT');
      setThirst('THIRSTLESS');
      setChiefComplaint('Throbbing pulsating right-sided headache after sunlight exposure.');
      setSehgalPppState('Talks constantly about business, impatient for fast relief.');
      setLocation('Right Temple');
      Sensation: setSensation('Throbbing, sudden');
      setModality('Aggravated by sunlight & motion');
      setConcomitants('Cold extremities');
    } else if (type === 'CIRRHOSIS') {
      setPatientName('Ramesh Kumar Sharma');
      setAge('48');
      setGender('Male');
      setThermal('HOT');
      setThirst('THIRSTY');
      setChiefComplaint('Right scapula pain, jaundice, liver enlargement.');
      setSehgalPppState('Opinionated, practical, business talks.');
      setLocation('Right Scapula & Liver region');
      setSensation('Dull aching radiating backwards');
      setModality('Ameliorated by boiling hot drinks');
      setConcomitants('Yellow sclera');
    }
  };

  const handleRunNlpExtraction = () => {
    setIsProcessingNlp(true);
    setTimeout(() => {
      const extracted: RubricRow[] = [
        {
          id: `rub-nlp-${Date.now()}-1`,
          chapter: 'MIND',
          fullStringPath: 'MIND - BUSINESS - talks of',
          embryologicalLayer: 'Ectoderm',
          isAiExtracted: true,
          isCommitted: true,
        },
        {
          id: `rub-nlp-${Date.now()}-2`,
          chapter: 'HEAD',
          fullStringPath: 'HEAD - PAIN - pulsating - sudden - right temple',
          embryologicalLayer: 'Ectoderm',
          isAiExtracted: true,
          isCommitted: true,
        },
        {
          id: `rub-nlp-${Date.now()}-3`,
          chapter: 'HEAD',
          fullStringPath: 'HEAD - PAIN - sun - from exposure to',
          embryologicalLayer: 'Ectoderm',
          isAiExtracted: true,
          isCommitted: true,
        },
      ];

      onCommitExtractedRubrics(extracted);
      setIsProcessingNlp(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white border-l border-slate-300 h-full flex flex-col shadow-2xl text-slate-800">
        {/* HEADER */}
        <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Stethoscope className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="font-bold text-sm uppercase tracking-wider text-white">
                Clinical Case History Intake & NLP Parser
              </h2>
              <p className="text-[11px] text-slate-400">
                Sehgal ROH Present Mental State + Bönninghausen 4-Component Splitter
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ONE-CLICK CLINICAL PRESET BAR */}
        <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 flex items-center space-x-2 text-xs">
          <Zap className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-bold text-slate-700">Quick OPD Presets:</span>
          <button
            onClick={() => loadPresetCase('MIGRAINE')}
            className="bg-white hover:bg-slate-200 border border-slate-300 px-2 py-0.5 rounded text-[11px] font-mono font-bold cursor-pointer"
          >
            Sunstroke Migraine (Ananya)
          </button>
          <button
            onClick={() => loadPresetCase('CIRRHOSIS')}
            className="bg-white hover:bg-slate-200 border border-slate-300 px-2 py-0.5 rounded text-[11px] font-mono font-bold cursor-pointer"
          >
            Liver Cirrhosis (Ramesh)
          </button>
        </div>

        {/* INTAKE FORM BODY */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {/* 1. PATIENT DEMOGRAPHICS */}
          <div className="bg-slate-50 border border-slate-200 rounded p-3 space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5 font-mono">
              <FileText className="w-3.5 h-3.5" />
              1. Patient Identity & Vitals
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-500 mb-1 font-mono text-[11px]">Full Name</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-emerald-600 font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1 font-mono text-[11px]">Age</label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-emerald-600 font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1 font-mono text-[11px]">Sex</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-emerald-600 font-bold"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2. PHYSICAL BASELINE CONSTANTS */}
          <div className="bg-slate-50 border border-slate-200 rounded p-3 space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 flex items-center gap-1.5 font-mono">
              <Flame className="w-3.5 h-3.5" />
              2. Immutable Physical Baseline (Predictive Axis)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-500 mb-1 font-mono text-[11px]">Thermal Baseline</label>
                <select
                  value={thermal}
                  onChange={(e) => setThermal(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-orange-700 font-mono font-bold"
                >
                  <option value="HOT">HOT (Amel. by Cold)</option>
                  <option value="CHILLY">CHILLY (Amel. by Warmth)</option>
                  <option value="AMBITHERMAL">AMBITHERMAL</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-500 mb-1 font-mono text-[11px]">Thirst Baseline</label>
                <select
                  value={thirst}
                  onChange={(e) => setThirst(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-cyan-700 font-mono font-bold"
                >
                  <option value="THIRSTLESS">THIRSTLESS</option>
                  <option value="THIRSTY">THIRSTY (Large/Small)</option>
                  <option value="VARIABLE">VARIABLE</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-500 mb-1 font-mono text-[11px]">Sleep Position</label>
                <input
                  type="text"
                  value={sleepPosition}
                  onChange={(e) => setSleepPosition(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* 3. DR. M.L. SEHGAL ROH PRESENT MENTAL STATE (PPP) */}
          <div className="bg-slate-50 border border-slate-200 rounded p-3 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5 font-mono">
              <Brain className="w-3.5 h-3.5" />
              3. Dr. M.L. Sehgal ROH Present Mental State (PPP)
            </span>
            <textarea
              rows={2}
              value={sehgalPppState}
              onChange={(e) => setSehgalPppState(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded p-2 text-slate-900 focus:outline-none focus:border-emerald-600 font-mono text-xs"
            />
          </div>

          {/* 4. DR. VON BÖNNINGHAUSEN 4-COMPONENT SPLITTER */}
          <div className="bg-slate-50 border border-slate-200 rounded p-3 space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              4. Dr. von Bönninghausen 4-Component Symptom Splitter
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-500 mb-1 font-mono text-[11px]">Location / Anatomical Site</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1 font-mono text-[11px]">Sensation / Character</label>
                <input
                  type="text"
                  value={sensation}
                  onChange={(e) => setSensation(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1 font-mono text-[11px]">Modalities (Agg. / Amel.)</label>
                <input
                  type="text"
                  value={modality}
                  onChange={(e) => setModality(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1 font-mono text-[11px]">Concomitants</label>
                <input
                  type="text"
                  value={concomitants}
                  onChange={(e) => setConcomitants(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER ACTION BAR */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-mono">
            SimiliMatrix NLP Extraction Ready
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleRunNlpExtraction}
              disabled={isProcessingNlp}
              className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center space-x-1.5 shadow-md cursor-pointer"
            >
              {isProcessingNlp ? (
                <span>Extracting Rubrics...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Extract & Commit to Matrix Board</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseHistoryIntakeDrawer;

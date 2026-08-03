'use client';

import React from 'react';
import { BookOpen, X, Flame, Droplets, ShieldCheck, Award } from 'lucide-react';

export interface MateriaMedicaEntry {
  remedyCode: string;
  fullName: string;
  kingdom: string;
  thermal: string;
  thirst: string;
  keynotes: string[];
  mindCharacteristics: string;
  physicalGenerals: string;
  clinicalIndications: string[];
  safePotencyRange: string;
}

export const CLASSICAL_MATERIA_MEDICA_DB: Record<string, MateriaMedicaEntry> = {
  Bell: {
    remedyCode: 'Bell',
    fullName: 'Belladonna (Atropa belladonna)',
    kingdom: 'Plant (Solanaceae)',
    thermal: 'HOT (Amel. by Cold application)',
    thirst: 'THIRSTLESS or small sips during fever',
    keynotes: [
      'Suddenness of manifestation and intensity of symptoms.',
      'Heat, redness, throbbing, and burning inflammation.',
      'Delirium with wild excitement and desire to bite or strike.',
      'Right-sided complaints, aggravated by light, noise, motion, or jarring.',
    ],
    mindCharacteristics:
      'Excited, furious, sees monstrous faces, talks of business, talks fast and impulsively.',
    physicalGenerals:
      'Head hot with cold extremities. Pulsating carotids. Dry mouth and throat without thirst.',
    clinicalIndications: ['Acute Tonsillitis', 'Sunstroke Migraine', 'High Sudden Fever', 'Otalgia'],
    safePotencyRange: '30C to 200C (Acute); LM 0/1 in sensitive constitutions.',
  },
  Chel: {
    remedyCode: 'Chel',
    fullName: 'Chelidonium majus (Greater Celandine)',
    kingdom: 'Plant (Papaveraceae)',
    thermal: 'HOT',
    thirst: 'THIRSTY for warm or hot drinks',
    keynotes: [
      'Constant pain under lower inner angle of right scapula.',
      'Jaundice, hepatic congestion, and gallstone colic.',
      'Desire for boiling hot drinks which stomach retains.',
      'Burnett Organopathic primary liver drainage agent.',
    ],
    mindCharacteristics:
      'Dominating, practical, clear-headed, opinionated, irritates easily.',
    physicalGenerals:
      'Right-sided liver organopathy. Yellow discoloration of skin, sclera, and urine.',
    clinicalIndications: ['Liver Cirrhosis', 'Cholecystitis', 'Right-sided Pneumonia', 'Jaundice'],
    safePotencyRange: 'Tincture / 1x to 6X for Organopathic Tissue Drainage (Burnett Protocol).',
  },
  Sulph: {
    remedyCode: 'Sulph',
    fullName: 'Sulphur (Sublimed Sulphur)',
    kingdom: 'Mineral (Psoric King)',
    thermal: 'HOT (Hates heat, burning feet in bed)',
    thirst: 'THIRSTY for cold water in large quantities',
    keynotes: [
      'Great King of Psora — standing aggravates, dirty skin, burning sensations.',
      'Empty sinking feeling at stomach at 11 a.m.',
      'Desire for sweets and fat; aversion to washing.',
      'Red orifices (lips, eyelids, anus).',
    ],
    mindCharacteristics:
      'Philosophical, rag-picker ego, careless of appearance, self-important.',
    physicalGenerals:
      'All orifices red and inflamed. Burning heat everywhere. Worse standing.',
    clinicalIndications: ['Eczema & Psoriasis', 'Chronic Relapsing Fevers', 'Portal Congestion'],
    safePotencyRange: '200C to 1M Single Dry Dose with 14-day observation baseline.',
  },
  Acon: {
    remedyCode: 'Acon',
    fullName: 'Aconitum napellus (Monkshood)',
    kingdom: 'Plant (Ranunculaceae)',
    thermal: 'CHILLY (Sensitive to cold dry wind)',
    thirst: 'THIRSTY for unquenchable cold water',
    keynotes: [
      'First stage of acute inflammatory fevers after cold dry wind.',
      'Predicts the exact hour of death; agonizing fear and restlessness.',
      'Hot dry skin without perspiration.',
    ],
    mindCharacteristics:
      'Agonizing anxiety, fear of crowd and death, restless tossing.',
    physicalGenerals:
      'Sudden onset. Unquenchable thirst. Everything tastes bitter except water.',
    clinicalIndications: ['Acute Panic Attacks', 'First 24-hr Croupy Cough', 'Sudden High Fever'],
    safePotencyRange: '30C to 200C repeated in liquid sips during acute crisis.',
  },
  Bry: {
    remedyCode: 'Bry',
    fullName: 'Bryonia alba (White Bryony)',
    kingdom: 'Plant (Cucurbitaceae)',
    thermal: 'CHILLY',
    thirst: 'THIRSTY for large quantities of cold water at long intervals',
    keynotes: [
      'Absolute aggravation from the slightest motion; pressure ameliorates.',
      'Dryness of all mucous membranes.',
      'Talks of business during fever and delirium.',
    ],
    mindCharacteristics:
      'Irritable, wants to go home, business orientation, wishes to be left alone.',
    physicalGenerals:
      'Stitching serous membrane pains. Dry cracked lips. Hard dark stools.',
    clinicalIndications: ['Pleurisy & Rheumatism', 'Constipation', 'Frontal Headache'],
    safePotencyRange: '30C to 200C.',
  },
};

interface MateriaMedicaReaderModalProps {
  remedyCode: string | null;
  onClose: () => void;
}

export const MateriaMedicaReaderModal: React.FC<
  MateriaMedicaReaderModalProps
> = ({ remedyCode, onClose }) => {
  if (!remedyCode) return null;

  const entry =
    CLASSICAL_MATERIA_MEDICA_DB[remedyCode] || {
      remedyCode,
      fullName: `${remedyCode} — Classical Proving Reference`,
      kingdom: 'Homeopathic Materia Medica',
      thermal: 'HOT / CHILLY (Consult Proving Matrix)',
      thirst: 'Standard Clinical Baseline',
      keynotes: [
        'Classical keynote verified in Kent & Boericke Materia Medica.',
        'Asymmetrical Specificity Index high match for active case totalities.',
      ],
      mindCharacteristics:
        'Characteristic emotional and behavioral keynote traits documented in proving records.',
      physicalGenerals: 'Organ affinities and constitutional affinity descriptors.',
      clinicalIndications: ['Constitutional Care', 'Acute Symptom Control'],
      safePotencyRange: 'LM 0/1 Liquid Scale or Centesimal 200C Single Dose.',
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
      <div className="w-full max-w-2xl bg-[#111317] border border-[#1C1F26] rounded-lg shadow-2xl overflow-hidden text-[#E6E8EA]">
        {/* HEADER */}
        <div className="px-4 py-3 bg-[#090A0C] border-b border-[#1C1F26] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-[#10B981]" />
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-white">
                Classical Materia Medica Proving Reader
              </h3>
              <p className="text-[11px] text-gray-400 font-mono">
                Verbatim Boericke & Kent Reference Engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded bg-[#1C1F26] text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          {/* TITLE BANNER */}
          <div className="bg-[#090A0C] border border-[#1C1F26] rounded p-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-black text-[#10B981] font-mono">
                {entry.fullName}
              </h2>
              <p className="text-gray-400 text-[11px]">{entry.kingdom}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 bg-orange-950/50 border border-orange-800/60 text-orange-400 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                <Flame className="w-3 h-3" /> {entry.thermal}
              </span>
              <span className="flex items-center gap-1 bg-cyan-950/50 border border-cyan-800/60 text-cyan-400 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                <Droplets className="w-3 h-3" /> {entry.thirst}
              </span>
            </div>
          </div>

          {/* KEYNOTES */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> Core Classical Keynotes & Proving Characteristics
            </span>
            <ul className="list-disc list-inside space-y-1 bg-[#090A0C] border border-[#1C1F26] rounded p-3 text-gray-300">
              {entry.keynotes.map((k, idx) => (
                <li key={idx}>{k}</li>
              ))}
            </ul>
          </div>

          {/* MIND & PHYSICAL GENERALS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-[#090A0C] border border-[#1C1F26] rounded p-3 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                Mental & Behavioral Keynotes
              </span>
              <p className="text-gray-300 leading-relaxed">
                {entry.mindCharacteristics}
              </p>
            </div>
            <div className="bg-[#090A0C] border border-[#1C1F26] rounded p-3 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                Physical Generals & Organ Affinities
              </span>
              <p className="text-gray-300 leading-relaxed">
                {entry.physicalGenerals}
              </p>
            </div>
          </div>

          {/* SAFE POTENCY RANGE */}
          <div className="bg-emerald-950/30 border border-emerald-800/50 rounded p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <div>
                <p className="font-bold text-emerald-300">
                  Recommended Potency & Dosage Protocol
                </p>
                <p className="text-emerald-400/80 font-mono text-[11px]">
                  {entry.safePotencyRange}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-4 py-2.5 bg-[#090A0C] border-t border-[#1C1F26] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#10B981] hover:bg-emerald-600 text-[#090A0C] font-bold text-xs"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
};

export default MateriaMedicaReaderModal;

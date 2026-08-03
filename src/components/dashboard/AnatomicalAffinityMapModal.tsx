'use client';

import React, { useState } from 'react';
import {
  Activity,
  X,
  Sparkles,
  Flame,
  Droplets,
  HeartPulse,
  Brain,
  ShieldCheck,
} from 'lucide-react';

interface AnatomicalAffinityMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  topRemedyCode: string;
  theme?: 'dark' | 'light';
}

export const AnatomicalAffinityMapModal: React.FC<
  AnatomicalAffinityMapModalProps
> = ({ isOpen, onClose, topRemedyCode, theme = 'light' }) => {
  const isLight = theme === 'light';
  const [selectedOrgan, setSelectedOrgan] = useState<string>('BRAIN_CEREBRAL');

  if (!isOpen) return null;

  const organAffinities = [
    {
      id: 'BRAIN_CEREBRAL',
      organName: 'Right Cerebral Hemisphere & Carotid Arteries',
      layer: 'Ectoderm',
      activeRemedy: 'Belladonna (Bell 65.2)',
      symptoms: 'Sudden violent throbbing headache, heat, redness, light sensitivity.',
      potency: '200C Liquid Sip',
      coords: 'Top Head Center',
      color: 'bg-rose-500',
    },
    {
      id: 'LIVER_HEPATIC',
      organName: 'Right Hepatic Lobe & Gallbladder Parenchyma',
      layer: 'Endoderm',
      activeRemedy: 'Chelidonium majus (Chel 58.4)',
      symptoms: 'Hepatic enlargement, jaundice, pain under right lower scapula angle.',
      potency: '1X Mother Tincture (Burnett Organopathy)',
      coords: 'Right Abdomen Upper',
      color: 'bg-amber-500',
    },
    {
      id: 'GASTRIC_MUCOSA',
      organName: 'Gastric Mucous Membrane & Mucous Orifices',
      layer: 'Endoderm',
      activeRemedy: 'Arsenicum album (Ars 40.5)',
      symptoms: 'Burning heat, unquenchable thirst for warm drinks, intense anxiety.',
      potency: '30C Centesimal',
      coords: 'Epigastric Midline',
      color: 'bg-cyan-500',
    },
    {
      id: 'SYNOVIAL_JOINTS',
      organName: 'Peripheral Synovial Joint Capsules & Tendons',
      layer: 'Mesoderm',
      activeRemedy: 'Rhus toxicodendron (Rhus-t 42.1)',
      symptoms: 'Stiffness on beginning of motion, amelioration on continued motion.',
      potency: '200C Globules',
      coords: 'Extremities Knees/Wrists',
      color: 'bg-purple-500',
    },
  ];

  const activeOrganData =
    organAffinities.find((o) => o.id === selectedOrgan) || organAffinities[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 select-none">
      <div
        className={`w-full max-w-4xl rounded-2xl border shadow-2xl overflow-hidden font-sans flex flex-col max-h-[92vh] transition-colors ${
          isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#0B0F19] border-[#1C1F26] text-white'
        }`}
      >
        {/* HEADER */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <HeartPulse className="w-5 h-5 text-emerald-400 animate-pulse" />
            <div>
              <h2 className="font-bold text-sm tracking-wider uppercase font-mono">
                3D Spatial Anatomical Organ Affinity Body-Map Visualizer
              </h2>
              <p className="text-[11px] text-emerald-400 font-mono">
                Real-Time Organ-Tissue Target Mapping for Top Simillimum ({topRemedyCode})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* WORKBENCH GRID */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto flex-1 font-mono">
          {/* LEFT 3D HUMAN ANATOMICAL SILHOUETTE MAP (5 COLUMNS) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 relative min-h-[360px]">
            {/* SPATIAL BODY SILHOUETTE */}
            <div className="w-32 h-64 border-2 border-emerald-500/40 rounded-full relative flex flex-col items-center justify-around shadow-[0_0_40px_rgba(16,185,129,0.15)]">
              {/* HEAD NODE */}
              <button
                onClick={() => setSelectedOrgan('BRAIN_CEREBRAL')}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer ${
                  selectedOrgan === 'BRAIN_CEREBRAL'
                    ? 'bg-rose-600 border-white scale-125 shadow-[0_0_15px_#EF4444]'
                    : 'bg-rose-500/30 border-rose-400 hover:scale-110'
                }`}
                title="Right Cerebral Hemisphere"
              >
                <Brain className="w-4 h-4 text-white" />
              </button>

              {/* LIVER / EPIGASTRIC NODES */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedOrgan('LIVER_HEPATIC')}
                  className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer ${
                    selectedOrgan === 'LIVER_HEPATIC'
                      ? 'bg-amber-600 border-white scale-125 shadow-[0_0_15px_#F59E0B]'
                      : 'bg-amber-500/30 border-amber-400 hover:scale-110'
                  }`}
                  title="Right Hepatic Lobe"
                >
                  <Activity className="w-4 h-4 text-white" />
                </button>

                <button
                  onClick={() => setSelectedOrgan('GASTRIC_MUCOSA')}
                  className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer ${
                    selectedOrgan === 'GASTRIC_MUCOSA'
                      ? 'bg-cyan-600 border-white scale-125 shadow-[0_0_15px_#06B6D4]'
                      : 'bg-cyan-500/30 border-cyan-400 hover:scale-110'
                  }`}
                  title="Gastric Mucous Membrane"
                >
                  <Flame className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* EXTREMITIES / JOINT NODES */}
              <button
                onClick={() => setSelectedOrgan('SYNOVIAL_JOINTS')}
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer ${
                  selectedOrgan === 'SYNOVIAL_JOINTS'
                    ? 'bg-purple-600 border-white scale-125 shadow-[0_0_15px_#A855F7]'
                    : 'bg-purple-500/30 border-purple-400 hover:scale-110'
                }`}
                title="Synovial Joint Capsules"
              >
                <Sparkles className="w-4 h-4 text-white" />
              </button>
            </div>

            <span className="text-[10px] text-emerald-400 mt-4 font-bold">
              CLICK ANY SPATIAL ANATOMICAL NODE TO INSPECT AFFINITY
            </span>
          </div>

          {/* RIGHT AFFINITY DETAILS PANEL (7 COLUMNS) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 rounded-xl border border-slate-700 bg-slate-900 text-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase">
                  SELECTED ORGAN TARGET:
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500">
                  {activeOrganData.layer}
                </span>
              </div>
              <h3 className="text-lg font-black text-white">
                {activeOrganData.organName}
              </h3>
            </div>

            <div
              className={`p-4 rounded-xl border space-y-3 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#111317] border-[#1C1F26]'
              }`}
            >
              <div>
                <span className="text-[10px] text-gray-500 block uppercase">
                  PRIMARY TARGET SIMILLIMUM:
                </span>
                <span className="text-base font-black text-emerald-600">
                  {activeOrganData.activeRemedy}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-gray-500 block uppercase">
                  CLINICAL PATHOLOGICAL SYMPTOM AFFINITY:
                </span>
                <p className="text-xs font-sans leading-relaxed text-slate-700">
                  {activeOrganData.symptoms}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center justify-between">
                <span>Recommended Clinical Potency:</span>
                <span>{activeOrganData.potency}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {organAffinities.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setSelectedOrgan(o.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedOrgan === o.id
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <p className="font-bold text-xs truncate">{o.organName}</p>
                  <p className="text-[10px] text-gray-500">{o.activeRemedy}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-3.5 bg-slate-900 text-white border-t border-slate-800 flex items-center justify-between text-xs font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4" /> Spatial Anatomical Affinity Handshake Active
          </span>
          <button
            onClick={onClose}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-1.5 rounded-lg cursor-pointer"
          >
            Close 3D Body Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnatomicalAffinityMapModal;

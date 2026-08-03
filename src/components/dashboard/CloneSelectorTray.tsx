'use client';

import React from 'react';
import { UserCheck, Sparkles, ChevronDown } from 'lucide-react';

interface CloneSelectorTrayProps {
  activeCloneName: string;
  onSelectClone: (cloneName: string) => void;
  theme?: 'dark' | 'light';
}

export const CloneSelectorTray: React.FC<CloneSelectorTrayProps> = ({
  activeCloneName,
  onSelectClone,
  theme = 'light',
}) => {
  const isLight = theme === 'light';

  const clones = [
    {
      id: 'DR_VIJAYAKAR_PREDICTIVE',
      label: 'Dr. Prafull Vijayakar (Predictive Model)',
    },
    {
      id: 'DR_SEHGAL_ROH',
      label: 'Dr. M.L. Sehgal (ROH PPP Mind State)',
    },
    {
      id: 'DR_KENT_CLASSICAL',
      label: 'Dr. J.T. Kent (Classical Totality)',
    },
  ];

  return (
    <div
      className={`border rounded-xl px-3 py-1.5 flex items-center space-x-2.5 transition-all ${
        isLight
          ? 'bg-slate-100/90 border-slate-200/90 text-slate-800 shadow-2xs'
          : 'bg-[#111317] border-[#1C1F26] text-white'
      }`}
    >
      <div className="flex items-center space-x-1.5 text-emerald-600 font-bold">
        <Sparkles className="w-3.5 h-3.5" />
        <span className="text-[10px] uppercase font-mono tracking-wider">
          CLINICAL PERSONA CLONE:
        </span>
      </div>

      <div className="relative">
        <select
          value={activeCloneName}
          onChange={(e) => onSelectClone(e.target.value)}
          className={`border rounded-lg px-2.5 py-1 text-xs font-mono font-bold appearance-none pr-7 cursor-pointer focus:outline-none ${
            isLight
              ? 'bg-white border-slate-300 text-slate-900 focus:border-emerald-600'
              : 'bg-[#090A0C] border-[#1C1F26] text-emerald-400 focus:border-emerald-500'
          }`}
        >
          {clones.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
};

export default CloneSelectorTray;

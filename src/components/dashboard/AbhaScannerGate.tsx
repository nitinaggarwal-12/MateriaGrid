'use client';

import React, { useState } from 'react';
import { ShieldCheck, QrCode, ArrowRight, CheckCircle2 } from 'lucide-react';

export interface AbhaPatientRecord {
  abhaId: string;
  fullName: string;
  age: number;
  gender: 'M' | 'F' | 'O';
  bloodGroup: string;
  mobile: string;
  consentVerified: boolean;
}

interface AbhaScannerGateProps {
  onPatientVerified: (patient: AbhaPatientRecord) => void;
  theme?: 'dark' | 'light';
}

export const AbhaScannerGate: React.FC<AbhaScannerGateProps> = ({
  onPatientVerified,
  theme = 'light',
}) => {
  const isLight = theme === 'light';
  const [abhaInput, setAbhaInput] = useState<string>('91-4829-1049-3829');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(true);

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      onPatientVerified({
        abhaId: abhaInput,
        fullName: 'Ramesh Kumar Sharma',
        age: 44,
        gender: 'M',
        bloodGroup: 'B+',
        mobile: '+91 98765 43210',
        consentVerified: true,
      });
    }, 400);
  };

  return (
    <div
      className={`border rounded-xl px-3 py-1.5 flex flex-wrap items-center justify-between gap-2.5 transition-all ${
        isLight
          ? 'bg-slate-100/90 border-slate-200/90 text-slate-800 shadow-2xs'
          : 'bg-[#111317] border-[#1C1F26] text-white'
      }`}
    >
      <div className="flex items-center space-x-2">
        <ShieldCheck
          className={`w-4 h-4 ${
            isVerified ? 'text-emerald-600' : 'text-amber-500'
          }`}
        />
        <div className="flex flex-col">
          <div className="flex items-center space-x-1.5">
            <span className="text-[10px] font-bold tracking-wider uppercase font-mono">
              ABDM / ABHA DIGITAL GATEWAY
            </span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono font-bold">
              NHA v2.4
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-1.5">
        <div className="relative">
          <input
            type="text"
            value={abhaInput}
            onChange={(e) => setAbhaInput(e.target.value)}
            placeholder="Enter ABHA ID..."
            className={`w-36 sm:w-44 border rounded-lg px-2.5 py-1 text-xs font-mono font-bold focus:outline-none transition-colors ${
              isLight
                ? 'bg-white border-slate-300 text-slate-900 focus:border-emerald-600'
                : 'bg-[#090A0C] border-[#1C1F26] text-white focus:border-emerald-500'
            }`}
          />
        </div>

        <button
          onClick={handleVerify}
          disabled={isVerifying}
          className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center space-x-1 transition-all cursor-pointer ${
            isVerified
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>{isVerifying ? 'Verifying...' : isVerified ? 'Verified & Linked' : 'Verify ABHA'}</span>
        </button>
      </div>
    </div>
  );
};

export default AbhaScannerGate;

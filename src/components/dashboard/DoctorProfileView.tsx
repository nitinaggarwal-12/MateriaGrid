'use client';

import React from 'react';
import {
  UserCheck,
  Award,
  ShieldCheck,
  Stethoscope,
  Building2,
  CheckCircle2,
  QrCode,
  FileText,
  Activity,
  Calendar,
} from 'lucide-react';

interface DoctorProfileViewProps {
  theme?: 'dark' | 'light';
}

export const DoctorProfileView: React.FC<DoctorProfileViewProps> = ({
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  return (
    <div
      className={`w-full h-full overflow-y-auto p-6 font-mono space-y-6 transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#05070A] text-white'
      }`}
    >
      {/* DOCTOR CREDENTIAL HEADER */}
      <div
        className={`p-6 rounded-2xl border flex flex-wrap items-center justify-between gap-6 shadow-md ${
          isLight
            ? 'bg-white border-slate-200'
            : 'bg-[#0B0F19] border-[#1C1F26]'
        }`}
      >
        <div className="flex items-center space-x-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 flex items-center justify-center text-white font-black text-2xl shadow-lg">
            NA
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-black text-white">
                Dr. Nitin Aggarwal, MD (Hom.)
              </h1>
              <span className="px-2.5 py-0.5 rounded bg-emerald-600 text-white text-xs font-black">
                REG: AYUSH-DEL-2026-90412
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Senior Classical Repertorist & Predictive Homeopath • National Institute of Homeopathy & AIIMS AYUSH OPD Hub
            </p>
            <p className="text-xs text-emerald-400 mt-0.5 flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> ABDM CRYPTOGRAPHIC PRESCRIPTION SIGNER KEY CERTIFIED (VALID UNTIL 2029)
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-[#111317] border border-slate-800 text-center">
            <span className="text-xl font-black text-emerald-400 block">1,420</span>
            <span className="text-[10px] text-gray-400 font-bold">PATIENTS TREATED</span>
          </div>
          <div className="p-3 rounded-xl bg-[#111317] border border-slate-800 text-center">
            <span className="text-xl font-black text-cyan-400 block">94.8%</span>
            <span className="text-[10px] text-gray-400 font-bold">HERING CURE RATE</span>
          </div>
        </div>
      </div>

      {/* METHODOLOGICAL PERSONA & CLINICAL CREDENTIALS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#111317] border border-slate-800 space-y-2">
          <span className="text-[10px] text-emerald-400 font-black uppercase">
            SEHGAL ROH PRESENT MENTAL STATE
          </span>
          <p className="text-sm font-black text-white">
            Revolutionized Homeopathy (ROH) Expert
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">
            Translates conversational present, predominating, and persisting mental states into precise mind rubrics.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#111317] border border-slate-800 space-y-2">
          <span className="text-[10px] text-cyan-400 font-black uppercase">
            VIJAYAKAR PREDICTIVE HOMEOPATHY
          </span>
          <p className="text-sm font-black text-white">
            Embryological & Genetic Profile Filtering
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">
            Applies Ectoderm / Mesoderm / Endoderm disease progression checks and thermal-thirst hard filters.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#111317] border border-slate-800 space-y-2">
          <span className="text-[10px] text-purple-400 font-black uppercase">
            DR. BURNETT ORGANOPATHY
          </span>
          <p className="text-sm font-black text-white">
            Visceral Tissue Drainage Co-Prescription
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">
            Protects organ parenchyma during high-potency constitutional simillimum administration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileView;

'use client';

import React from 'react';
import {
  Building2,
  ShieldCheck,
  Activity,
  Users,
  CheckCircle2,
  Lock,
  Radio,
  Pill,
} from 'lucide-react';

interface HospitalProfileViewProps {
  theme?: 'dark' | 'light';
}

export const HospitalProfileView: React.FC<HospitalProfileViewProps> = ({
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  return (
    <div
      className={`w-full h-full overflow-y-auto p-6 font-mono space-y-6 transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#05070A] text-white'
      }`}
    >
      {/* HOSPITAL CREDENTIAL HEADER */}
      <div
        className={`p-6 rounded-2xl border flex flex-wrap items-center justify-between gap-6 shadow-md ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-[#0B0F19] border-[#1C1F26] text-white'
        }`}
      >
        <div className="flex items-center space-x-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-lg">
            NIH
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className={`text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                National Institute of Homeopathy & ABDM UHI OPD Hub
              </h1>
              <span className="px-2.5 py-0.5 rounded bg-purple-600 text-white text-xs font-black">
                NHA FACILITY ID: IN-AYUSH-NIH-001
              </span>
            </div>
            <p className={`text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
              Ministry of AYUSH Premier Central OPD Institution & Unified Health Interface (UHI) Gateway
            </p>
            <p className="text-xs text-emerald-500 mt-0.5 flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> HIPAA • ABDM FHIR • DISHA ACT • DPDP ACT COMPLIANT INSTITUTION
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div
            className={`p-3 rounded-xl border text-center ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-900'
                : 'bg-[#111317] border-slate-800 text-white'
            }`}
          >
            <span className="text-xl font-black text-emerald-500 block">42 OPDs</span>
            <span className={`text-[10px] font-bold ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
              ACTIVE CONSULT ROOMS
            </span>
          </div>
          <div
            className={`p-3 rounded-xl border text-center ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-900'
                : 'bg-[#111317] border-slate-800 text-white'
            }`}
          >
            <span className="text-xl font-black text-purple-500 block">100% UHI</span>
            <span className={`text-[10px] font-bold ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
              DIGITAL OPD QUEUE
            </span>
          </div>
        </div>
      </div>

      {/* INSTITUTIONAL FLEET & PHARMACY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className={`p-4 rounded-xl border space-y-2 ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900 shadow-2xs'
              : 'bg-[#111317] border-slate-800 text-white'
          }`}
        >
          <span className="text-[10px] text-emerald-500 font-black uppercase">
            ABDM UHI TELEHEALTH GATEWAY
          </span>
          <p className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Unified Health Interface Active
          </p>
          <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
            Allows any patient across India to book digital AYUSH OPD slots and receive cryptographically signed FHIR prescription slips.
          </p>
        </div>

        <div
          className={`p-4 rounded-xl border space-y-2 ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900 shadow-2xs'
              : 'bg-[#111317] border-slate-800 text-white'
          }`}
        >
          <span className="text-[10px] text-cyan-500 font-black uppercase">
            LM POTENCY DISPENSARY STOCK
          </span>
          <p className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Hahnemann 50-Millesimal Stock
          </p>
          <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
            Full digital inventory of LM 0/1 through LM 0/30 liquid preparations linked to electronic hospital pharmacy dispensing.
          </p>
        </div>

        <div
          className={`p-4 rounded-xl border space-y-2 ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900 shadow-2xs'
              : 'bg-[#111317] border-slate-800 text-white'
          }`}
        >
          <span className="text-[10px] text-purple-500 font-black uppercase">
            ENTERPRISE RBAC AUDIT LEDGER
          </span>
          <p className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
            AES-256-GCM End-to-End Encryption
          </p>
          <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
            Strict role isolation separating Physician clinical controls, Patient self-service health lockers, and Hospital Admin operations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HospitalProfileView;

'use client';

import React from 'react';
import {
  User,
  ShieldCheck,
  QrCode,
  Heart,
  Flame,
  Droplets,
  FileText,
  Activity,
  Award,
  Lock,
  Calendar,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

interface PatientProfileViewProps {
  theme?: 'dark' | 'light';
}

export const PatientProfileView: React.FC<PatientProfileViewProps> = ({
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  return (
    <div
      className={`w-full h-full overflow-y-auto p-6 font-mono space-y-6 transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#05070A] text-white'
      }`}
    >
      {/* PROFILE HEADER CARD */}
      <div
        className={`p-6 rounded-2xl border flex flex-wrap items-center justify-between gap-6 shadow-md ${
          isLight
            ? 'bg-white border-slate-200'
            : 'bg-[#0B0F19] border-[#1C1F26]'
        }`}
      >
        <div className="flex items-center space-x-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white font-black text-2xl shadow-lg">
            RK
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-black text-white">
                Ramesh Kumar Sharma
              </h1>
              <span className="px-2.5 py-0.5 rounded bg-emerald-600 text-white text-xs font-black">
                ABHA: 91-4829-1049-3829
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              44 Years • Male • Blood Group: <strong className="text-emerald-400">B+ Positive</strong> • Emergency Contact: +91 98765 43210
            </p>
            <p className="text-xs text-emerald-400 mt-0.5 flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> ABDM FHIR HEALTH LOCKER CONSENT VERIFIED (HASH: 0x8F4A...C291)
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-[#111317] border border-slate-800 flex items-center space-x-3">
            <QrCode className="w-10 h-10 text-emerald-400" />
            <div className="text-left text-[10px]">
              <span className="font-black text-white block">ABHA HEALTH QR</span>
              <span className="text-gray-400">Scan at any NHA AYUSH Hospital</span>
            </div>
          </div>
        </div>
      </div>

      {/* CONSTITUTIONAL & PHYSICAL BASELINE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div
          className={`p-4 rounded-xl border ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-[#111317] border-slate-800'
          }`}
        >
          <span className="text-[10px] text-gray-400 font-black uppercase">
            THERMAL MODALITY
          </span>
          <p className="text-lg font-black text-orange-400 mt-1">🔥 HOT PATIENT</p>
          <p className="text-xs text-gray-400 mt-0.5">
            Aggravated by sun exposure, warm rooms & summer heat.
          </p>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-[#111317] border-slate-800'
          }`}
        >
          <span className="text-[10px] text-gray-400 font-black uppercase">
            THIRST MODALITY
          </span>
          <p className="text-lg font-black text-cyan-400 mt-1">
            💧 THIRSTLESS
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            Thirstless even during fever & acute cerebral hyperpyrexia.
          </p>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-[#111317] border-slate-800'
          }`}
        >
          <span className="text-[10px] text-gray-400 font-black uppercase">
            ACTIVE MIASMATIC FOCUS
          </span>
          <p className="text-lg font-black text-purple-400 mt-1">
            🛡️ PSORA (FUNCTIONAL)
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            Functional arterial hypertension & skin hypersensitivity.
          </p>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-[#111317] border-slate-800'
          }`}
        >
          <span className="text-[10px] text-gray-400 font-black uppercase">
            CONSTITUTIONAL SIMILLIMUM
          </span>
          <p className="text-lg font-black text-emerald-400 mt-1">
            🌿 Belladonna 200C / LM 0/1
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            Paired with Chelidonium 1X Organopathy liver drainage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientProfileView;

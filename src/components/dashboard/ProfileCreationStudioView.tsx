'use client';

import React, { useState } from 'react';
import {
  UserPlus,
  UserCheck,
  Building2,
  CheckCircle2,
  ShieldCheck,
  QrCode,
  Flame,
  Droplets,
  Award,
  Lock,
  Sparkles,
} from 'lucide-react';

interface ProfileCreationStudioViewProps {
  theme?: 'dark' | 'light';
  onPatientCreated?: (patient: any) => void;
}

export const ProfileCreationStudioView: React.FC<
  ProfileCreationStudioViewProps
> = ({ theme = 'light', onPatientCreated }) => {
  const isLight = theme === 'light';

  const [activeCreationType, setActiveCreationType] = useState<
    'PATIENT' | 'DOCTOR' | 'HOSPITAL'
  >('PATIENT');

  const [createdNotice, setCreatedNotice] = useState<string | null>(null);

  // Patient Creation Form State
  const [patientForm, setPatientForm] = useState({
    fullName: '',
    age: '',
    gender: 'MALE',
    mobile: '',
    aadhaarLast4: '',
    thermal: 'HOT',
    thirst: 'THIRSTLESS',
    laterality: 'RIGHT-TO-LEFT',
    miasm: 'PSORA',
  });

  // Doctor Registration Form State
  const [doctorForm, setDoctorForm] = useState({
    fullName: 'Dr. Nitin Aggarwal',
    degree: 'MD (Homoeopathy)',
    registrationNumber: 'CCH-WB-2014-4921',
    stateCouncil: 'West Bengal Council of Homoeopathy',
    consultationFee: '800',
    specialties: 'Chronic Organopathy, Pediatric ROH, Skin Lesions',
  });

  // Hospital Onboarding Form State
  const [hospitalForm, setHospitalForm] = useState({
    hospitalName: 'National Institute of Homeopathy — OPD Wing',
    hfrFacilityId: 'IN1910004921',
    address: 'Block GE, Sector V, Salt Lake, Kolkata, West Bengal 700106',
    opdBeds: '120',
    uhiEndpointUrl: 'https://uhi.materiagrid.ayush.gov.in/v1/search',
  });

  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault();
    const abhaId = `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(
      1000 + Math.random() * 9000
    )}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newPatient = {
      ...patientForm,
      abhaId,
      createdAt: new Date().toISOString(),
    };

    if (onPatientCreated) onPatientCreated(newPatient);
    setCreatedNotice(
      `✅ NEW PATIENT CREATED! ABHA ID Assigned: ${abhaId} (${patientForm.fullName})`
    );
    setTimeout(() => setCreatedNotice(null), 5000);
  };

  const handleRegisterDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    setCreatedNotice(
      `✅ PHYSICIAN CREDENTIALS REGISTERED! Reg #${doctorForm.registrationNumber} verified with Central Council of Homoeopathy.`
    );
    setTimeout(() => setCreatedNotice(null), 5000);
  };

  const handleOnboardHospital = (e: React.FormEvent) => {
    e.preventDefault();
    setCreatedNotice(
      `✅ AYUSH HOSPITAL & UHI ENDPOINT ONBOARDED! HFR Code ${hospitalForm.hfrFacilityId} activated.`
    );
    setTimeout(() => setCreatedNotice(null), 5000);
  };

  return (
    <div
      className={`w-full h-full overflow-y-auto p-6 font-mono space-y-6 transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#05070A] text-white'
      }`}
    >
      {/* HEADER BANNER */}
      <div
        className={`p-6 rounded-2xl border flex flex-wrap items-center justify-between gap-6 shadow-sm ${
          isLight
            ? 'bg-white border-slate-200'
            : 'bg-[#0B0F19] border-[#1C1F26]'
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white font-black shadow-md">
            <UserPlus className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-black tracking-tight">
                ABDM PROFILE CREATION & REGISTRATION STUDIO
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-600 text-white font-black">
                NHA COMPLIANT
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Create New ABHA Patients, Register AYUSH Physician Credentials & Onboard Institutional OPD Clinics
            </p>
          </div>
        </div>

        {/* CREATION TYPE SELECTOR PILLS */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveCreationType('PATIENT')}
            className={`px-4 py-2 rounded-xl font-black text-xs flex items-center space-x-1.5 transition-all cursor-pointer ${
              activeCreationType === 'PATIENT'
                ? 'bg-emerald-600 text-white shadow-md'
                : isLight
                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                : 'bg-[#111317] text-gray-300 hover:bg-slate-800'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Create ABHA Patient</span>
          </button>

          <button
            onClick={() => setActiveCreationType('DOCTOR')}
            className={`px-4 py-2 rounded-xl font-black text-xs flex items-center space-x-1.5 transition-all cursor-pointer ${
              activeCreationType === 'DOCTOR'
                ? 'bg-cyan-600 text-white shadow-md'
                : isLight
                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                : 'bg-[#111317] text-gray-300 hover:bg-slate-800'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>+ Register AYUSH Doctor</span>
          </button>

          <button
            onClick={() => setActiveCreationType('HOSPITAL')}
            className={`px-4 py-2 rounded-xl font-black text-xs flex items-center space-x-1.5 transition-all cursor-pointer ${
              activeCreationType === 'HOSPITAL'
                ? 'bg-purple-600 text-white shadow-md'
                : isLight
                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                : 'bg-[#111317] text-gray-300 hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>+ Onboard AYUSH Hospital</span>
          </button>
        </div>
      </div>

      {/* NOTIFICATION TOAST */}
      {createdNotice && (
        <div className="p-4 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-between shadow-lg animate-bounce">
          <span>{createdNotice}</span>
          <button
            onClick={() => setCreatedNotice(null)}
            className="text-white hover:opacity-80"
          >
            ✕
          </button>
        </div>
      )}

      {/* CREATION FORM 1: CREATE NEW PATIENT & ABHA ID */}
      {activeCreationType === 'PATIENT' && (
        <div
          className={`p-6 rounded-2xl border space-y-6 ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-[#0B0F19] border-[#1C1F26]'
          }`}
        >
          <div className="border-b pb-3 border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black uppercase text-emerald-600 dark:text-emerald-400">
                1. NEW PATIENT REGISTRATION & ABHA HEALTH LOCKER ASSIGNMENT
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Automatically generates a 14-digit National ABHA ID linked with Constitutional Thermal-Thirst Baseline
              </p>
            </div>
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
          </div>

          <form onSubmit={handleCreatePatient} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400 block mb-1">
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Mukherjee"
                  value={patientForm.fullName}
                  onChange={(e) =>
                    setPatientForm({ ...patientForm, fullName: e.target.value })
                  }
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold outline-none ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-500'
                      : 'bg-[#111317] border-[#1C1F26] text-white focus:border-emerald-500'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400 block mb-1">
                  Age (Years) *
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 34"
                  value={patientForm.age}
                  onChange={(e) =>
                    setPatientForm({ ...patientForm, age: e.target.value })
                  }
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold outline-none ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-500'
                      : 'bg-[#111317] border-[#1C1F26] text-white focus:border-emerald-500'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400 block mb-1">
                  Biological Sex *
                </label>
                <select
                  value={patientForm.gender}
                  onChange={(e) =>
                    setPatientForm({ ...patientForm, gender: e.target.value })
                  }
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold outline-none ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-[#111317] border-[#1C1F26] text-white'
                  }`}
                >
                  <option value="FEMALE">Female</option>
                  <option value="MALE">Male</option>
                  <option value="OTHER">Other / Non-Binary</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400 block mb-1">
                  Mobile Number (for ABDM OTP) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210"
                  value={patientForm.mobile}
                  onChange={(e) =>
                    setPatientForm({ ...patientForm, mobile: e.target.value })
                  }
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold outline-none ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-[#111317] border-[#1C1F26] text-white'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400 block mb-1">
                  Aadhaar Last 4 Digits (Optional verification)
                </label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="e.g. 4829"
                  value={patientForm.aadhaarLast4}
                  onChange={(e) =>
                    setPatientForm({
                      ...patientForm,
                      aadhaarLast4: e.target.value,
                    })
                  }
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold outline-none ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-[#111317] border-[#1C1F26] text-white'
                  }`}
                />
              </div>
            </div>

            {/* CONSTITUTIONAL THERMAL & THIRST PROFILE ASSIGNMENT */}
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-3">
              <span className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 block">
                CONSTITUTIONAL BASELINE (DR. VIJAYAKAR PREDICTIVE FILTER):
              </span>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="text-gray-500 dark:text-gray-400 block mb-1 font-bold">
                    Thermal Baseline
                  </label>
                  <select
                    value={patientForm.thermal}
                    onChange={(e) =>
                      setPatientForm({ ...patientForm, thermal: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#111317] border border-slate-800 text-white font-bold"
                  >
                    <option value="HOT">🔥 HOT (Warmth Aggravates)</option>
                    <option value="CHILLY">❄️ CHILLY (Cold Aggravates)</option>
                    <option value="AMBITHERMAL">⚖️ AMBITHERMAL</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-500 dark:text-gray-400 block mb-1 font-bold">
                    Thirst Baseline
                  </label>
                  <select
                    value={patientForm.thirst}
                    onChange={(e) =>
                      setPatientForm({ ...patientForm, thirst: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#111317] border border-slate-800 text-white font-bold"
                  >
                    <option value="THIRSTLESS">💧 THIRSTLESS</option>
                    <option value="THIRSTY">🚰 THIRSTY (Large Quantities)</option>
                    <option value="VARIABLE">🔄 VARIABLE</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-500 dark:text-gray-400 block mb-1 font-bold">
                    Laterality Axis
                  </label>
                  <select
                    value={patientForm.laterality}
                    onChange={(e) =>
                      setPatientForm({
                        ...patientForm,
                        laterality: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#111317] border border-slate-800 text-white font-bold"
                  >
                    <option value="RIGHT-TO-LEFT">🧭 RIGHT-TO-LEFT</option>
                    <option value="LEFT-TO-RIGHT">🧭 LEFT-TO-RIGHT</option>
                    <option value="ALTERNATING">🔄 ALTERNATING</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-500 dark:text-gray-400 block mb-1 font-bold">
                    Dominant Miasm
                  </label>
                  <select
                    value={patientForm.miasm}
                    onChange={(e) =>
                      setPatientForm({ ...patientForm, miasm: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#111317] border border-slate-800 text-white font-bold"
                  >
                    <option value="PSORA">🟢 PSORA (Functional)</option>
                    <option value="SYCOSIS">🟡 SYCOSIS (Hyperplasia)</option>
                    <option value="SYPHILIS">🔴 SYPHILIS (Destructive)</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center space-x-2 shadow-md cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Generate National ABHA ID & Create Patient Dossier</span>
            </button>
          </form>
        </div>
      )}

      {/* CREATION FORM 2: REGISTER NEW AYUSH PHYSICIAN CREDENTIALS */}
      {activeCreationType === 'DOCTOR' && (
        <div
          className={`p-6 rounded-2xl border space-y-6 ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-[#0B0F19] border-[#1C1F26]'
          }`}
        >
          <div className="border-b pb-3 border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black uppercase text-cyan-600 dark:text-cyan-400">
                2. AYUSH PHYSICIAN CREDENTIAL & MEDICAL REGISTRATION STUDIO
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Registers Central Council of Homoeopathy (CCH) / State Medical Council License & Cryptographic Signature Stamp
              </p>
            </div>
            <Award className="w-6 h-6 text-cyan-500" />
          </div>

          <form onSubmit={handleRegisterDoctor} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-500 dark:text-gray-400 font-bold block mb-1">
                  Physician Full Name & Post-Nominals *
                </label>
                <input
                  type="text"
                  required
                  value={doctorForm.fullName}
                  onChange={(e) =>
                    setDoctorForm({ ...doctorForm, fullName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111317] border border-slate-800 text-white font-bold"
                />
              </div>

              <div>
                <label className="text-gray-500 dark:text-gray-400 font-bold block mb-1">
                  Degree & Qualifications *
                </label>
                <input
                  type="text"
                  required
                  value={doctorForm.degree}
                  onChange={(e) =>
                    setDoctorForm({ ...doctorForm, degree: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111317] border border-slate-800 text-white font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-500 dark:text-gray-400 font-bold block mb-1">
                  CCH / State Registration License Number *
                </label>
                <input
                  type="text"
                  required
                  value={doctorForm.registrationNumber}
                  onChange={(e) =>
                    setDoctorForm({
                      ...doctorForm,
                      registrationNumber: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111317] border border-slate-800 text-white font-bold"
                />
              </div>

              <div>
                <label className="text-gray-500 dark:text-gray-400 font-bold block mb-1">
                  State Homoeopathic Council *
                </label>
                <input
                  type="text"
                  required
                  value={doctorForm.stateCouncil}
                  onChange={(e) =>
                    setDoctorForm({ ...doctorForm, stateCouncil: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111317] border border-slate-800 text-white font-bold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs flex items-center space-x-2 shadow-md cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>Verify & Register AYUSH Physician Credentials</span>
            </button>
          </form>
        </div>
      )}

      {/* CREATION FORM 3: ONBOARD NEW HOSPITAL / CLINIC FACILITY */}
      {activeCreationType === 'HOSPITAL' && (
        <div
          className={`p-6 rounded-2xl border space-y-6 ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-[#0B0F19] border-[#1C1F26]'
          }`}
        >
          <div className="border-b pb-3 border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black uppercase text-purple-600 dark:text-purple-400">
                3. AYUSH HOSPITAL & UHI FACILITY ONBOARDING
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Registers ABDM Health Facility Registry (HFR) Code & Unified Health Interface OPD Endpoint
              </p>
            </div>
            <Building2 className="w-6 h-6 text-purple-500" />
          </div>

          <form onSubmit={handleOnboardHospital} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-500 dark:text-gray-400 font-bold block mb-1">
                  Hospital / OPD Clinic Name *
                </label>
                <input
                  type="text"
                  required
                  value={hospitalForm.hospitalName}
                  onChange={(e) =>
                    setHospitalForm({
                      ...hospitalForm,
                      hospitalName: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111317] border border-slate-800 text-white font-bold"
                />
              </div>

              <div>
                <label className="text-gray-500 dark:text-gray-400 font-bold block mb-1">
                  ABDM HFR Facility ID *
                </label>
                <input
                  type="text"
                  required
                  value={hospitalForm.hfrFacilityId}
                  onChange={(e) =>
                    setHospitalForm({
                      ...hospitalForm,
                      hfrFacilityId: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111317] border border-slate-800 text-white font-bold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs flex items-center space-x-2 shadow-md cursor-pointer"
            >
              <Building2 className="w-4 h-4" />
              <span>Activate AYUSH Facility & UHI Gateway</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileCreationStudioView;

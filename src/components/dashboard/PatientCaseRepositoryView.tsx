'use client';

import React, { useState } from 'react';
import {
  Users,
  Search,
  UserCheck,
  FileText,
  Calendar,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Award,
  Activity,
  QrCode,
  CheckCircle2,
} from 'lucide-react';

interface PatientCaseRepositoryViewProps {
  theme?: 'dark' | 'light';
  onLoadCaseIntoMatrix?: (patient: any) => void;
}

export const PatientCaseRepositoryView: React.FC<
  PatientCaseRepositoryViewProps
> = ({ theme = 'dark', onLoadCaseIntoMatrix }) => {
  const isLight = theme === 'light';

  const patientsList = [
    {
      id: 'PAT-001',
      abhaId: '91-4829-1049-3829',
      fullName: 'Ramesh Kumar Sharma',
      ageGender: '44M',
      bloodGroup: 'B+ Positive',
      activeDiagnosis: 'Acute Pulsating Cerebral Hyperpyrexia & Throbbing Carotid Headache',
      simillimumTrack: 'Belladonna 200C / LM 0/1',
      miasmaticFocus: 'PSORA (Skin / Functional)',
      lastVisit: 'Today, 09:30 AM',
      consentStatus: 'VERIFIED NHA ABHA',
      consentHash: '0x8F4A...C291',
      vitals: { bp: '138/88 mmHg', pulse: '92 bpm', temp: '102.4 °F', spo2: '98%' },
    },
    {
      id: 'PAT-002',
      abhaId: '91-8842-3011-9921',
      fullName: 'Priya Patel',
      ageGender: '38F',
      bloodGroup: 'O+ Positive',
      activeDiagnosis: 'Chronic Hepatic Parenchyma Cirrhosis & Scapular Neuralgia',
      simillimumTrack: 'Chelidonium 1X Organopathy + Sulphur 30C',
      miasmaticFocus: 'SYCOSIS / SYPHILIS (Destructive)',
      lastVisit: 'Yesterday, 04:15 PM',
      consentStatus: 'VERIFIED NHA ABHA',
      consentHash: '0x3E1B...99A4',
      vitals: { bp: '124/80 mmHg', pulse: '76 bpm', temp: '98.6 °F', spo2: '99%' },
    },
    {
      id: 'PAT-003',
      abhaId: '91-6621-4902-1104',
      fullName: 'Vikram Singh',
      ageGender: '52M',
      bloodGroup: 'A+ Positive',
      activeDiagnosis: 'Synovial Knee Joint Effusion & Fibrous Articular Stiffness',
      simillimumTrack: 'Rhus toxicodendron 30C',
      miasmaticFocus: 'SYCOSIS (Synovial Proliferation)',
      lastVisit: '02 Aug 2026',
      consentStatus: 'VERIFIED NHA ABHA',
      consentHash: '0x7C92...110F',
      vitals: { bp: '130/84 mmHg', pulse: '80 bpm', temp: '98.8 °F', spo2: '97%' },
    },
  ];

  const [selectedPatientId, setSelectedPatientId] = useState<string>('PAT-001');
  const [searchQuery, setSearchQuery] = useState('');
  const [loadedAlert, setLoadedAlert] = useState(false);

  const activePatient =
    patientsList.find((p) => p.id === selectedPatientId) || patientsList[0];

  const filteredPatients = patientsList.filter(
    (p) =>
      p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.abhaId.includes(searchQuery)
  );

  const handleLoadCase = () => {
    setLoadedAlert(true);
    setTimeout(() => setLoadedAlert(false), 3000);
    if (onLoadCaseIntoMatrix) {
      onLoadCaseIntoMatrix(activePatient);
    }
  };

  return (
    <div
      className={`w-full h-full overflow-hidden flex flex-col font-mono transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#05070A] text-white'
      }`}
    >
      {/* EXECUTIVE TOP BAR */}
      <div
        className={`p-4 border-b flex flex-wrap items-center justify-between gap-4 flex-shrink-0 ${
          isLight
            ? 'bg-white border-slate-200'
            : 'bg-[#0B0F19] border-[#1C1F26]'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-black shadow-md">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-black text-sm uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              ABDM FHIR PATIENT EHR & CASE REPOSITORY WORKBENCH
            </h2>
            <p className="text-xs text-gray-400">
              National Health Authority (NHA) ABHA Health Locker & Instant SimiliMatrix Case Loader
            </p>
          </div>
        </div>

        {loadedAlert && (
          <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center gap-1.5 animate-pulse">
            <CheckCircle2 className="w-4 h-4" />
            CASE LOADED INTO SIMILIMATRIX CONSULTATION CANVAS!
          </span>
        )}
      </div>

      {/* TWO-COLUMN REPOSITORY CANVAS */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT COLUMN: PATIENT LIST & SEARCH */}
        <div
          className={`w-full lg:w-80 border-b lg:border-b-0 lg:border-r flex flex-col ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-[#0B0F19] border-[#1C1F26]'
          }`}
        >
          <div className="p-3 border-b border-slate-200 dark:border-slate-800">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search ABHA ID or Patient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-3 py-1.5 rounded-xl text-xs font-bold border outline-none ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-900'
                    : 'bg-[#111317] border-slate-800 text-white'
                }`}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {filteredPatients.map((patient) => {
              const isActive = patient.id === activePatient.id;
              return (
                <button
                  key={patient.id}
                  onClick={() => setSelectedPatientId(patient.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all transform hover:scale-[1.01] cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600/20 to-teal-600/10 border-emerald-500 text-white font-bold shadow-md'
                      : isLight
                      ? 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'
                      : 'bg-[#111317] border-slate-800 text-gray-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs text-emerald-600 dark:text-emerald-400">
                      ABHA: {patient.abhaId}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-black bg-emerald-600 text-white">
                      VERIFIED
                    </span>
                  </div>
                  <p className="font-black text-sm text-white mt-1">
                    {patient.fullName} ({patient.ageGender})
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                    {patient.activeDiagnosis}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: RICH INTERACTIVE PATIENT DOSSIER & ONE-CLICK LOAD */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div
            className={`p-6 rounded-2xl border space-y-6 shadow-xl ${
              isLight
                ? 'bg-white border-slate-200'
                : 'bg-[#0B0F19] border-[#1C1F26]'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-black text-white">
                    {activePatient.fullName}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-600 text-white text-xs font-black">
                    ABHA: {activePatient.abhaId}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Age/Gender: <strong className="text-white">{activePatient.ageGender}</strong> • Blood Group: <strong className="text-emerald-400">{activePatient.bloodGroup}</strong> • Last Consultation: {activePatient.lastVisit}
                </p>
              </div>

              {/* ACTION: ONE-CLICK LOAD CASE INTO SIMILIMATRIX */}
              <button
                onClick={handleLoadCase}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs flex items-center space-x-2 shadow-lg transition-all transform hover:scale-105 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>⚡ Load Patient Case into Active SimiliMatrix</span>
              </button>
            </div>

            {/* LIVE CLINICAL VITALS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'BLOOD PRESSURE', val: activePatient.vitals.bp, color: 'text-emerald-400' },
                { label: 'PULSE RATE', val: activePatient.vitals.pulse, color: 'text-cyan-400' },
                { label: 'BODY TEMPERATURE', val: activePatient.vitals.temp, color: 'text-orange-400' },
                { label: 'SPO2 SATURATION', val: activePatient.vitals.spo2, color: 'text-purple-400' },
              ].map((vital, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[#111317] border border-slate-800 space-y-1"
                >
                  <p className="text-[10px] text-gray-400 font-bold">{vital.label}</p>
                  <p className={`text-xl font-black ${vital.color}`}>{vital.val}</p>
                </div>
              ))}
            </div>

            {/* DIAGNOSTIC PROFILE & CONSTITUTIONAL SIMILLIMUM TRACK */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <span className="font-black text-emerald-400 uppercase">
                  🩺 ACTIVE CLINICAL DIAGNOSIS & ICD-11
                </span>
                <p className="text-white font-bold leading-relaxed">
                  {activePatient.activeDiagnosis}
                </p>
                <p className="text-gray-400">
                  Active Miasmatic Spectrum Focus: <strong className="text-purple-400">{activePatient.miasmaticFocus}</strong>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-2 text-xs">
                <span className="font-black text-emerald-300 uppercase">
                  ✨ CONFIRMED CONSTITUTIONAL SIMILLIMUM TRACK
                </span>
                <p className="text-lg font-black text-white">
                  {activePatient.simillimumTrack}
                </p>
                <p className="text-emerald-300">
                  Consent Hash: <strong className="font-mono">{activePatient.consentHash}</strong> (Verified ABDM Gateway)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCaseRepositoryView;

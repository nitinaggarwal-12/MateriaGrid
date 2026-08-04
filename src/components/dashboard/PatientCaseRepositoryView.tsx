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
  FileSpreadsheet,
  Clock,
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
      consultationHistory: [
        {
          date: '04 Aug 2026 (Today)',
          complaint: 'Acute pulsating headache after sun exposure',
          prescription: 'Belladonna 200C in aqueous split dose',
          heringStatus: 'Positive — Carotid throbbing reduced by 70%',
        },
        {
          date: '18 Jul 2026',
          complaint: 'Seasonal allergic rhinitis & nocturnal anxiety',
          prescription: 'Sulphur 30C (1 dose)',
          heringStatus: 'Eruption emerged on forearm (Outward Direction)',
        },
      ],
      attachedDocuments: [
        { name: 'CBC_Blood_Panel_Aug2026.pdf', type: 'LAB REPORT', date: '04 Aug 2026' },
        { name: 'ABHA_Health_Locker_Consent.fhir', type: 'ABDM FHIR', date: '04 Aug 2026' },
      ],
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
      consultationHistory: [
        {
          date: '03 Aug 2026',
          complaint: 'Scapular neuralgic pain under right shoulder',
          prescription: 'Chelidonium majus 1X Liver Drainage + Sulphur 30C',
          heringStatus: 'Jaundice bilirubin reduced from 3.2 to 1.8 mg/dL',
        },
      ],
      attachedDocuments: [
        { name: 'Liver_Function_Test_LFT.pdf', type: 'BIOCHEMISTRY', date: '03 Aug 2026' },
      ],
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
      consultationHistory: [
        {
          date: '02 Aug 2026',
          complaint: 'Severe knee joint stiffness upon rising from seat',
          prescription: 'Rhus toxicodendron 30C repeated in warm water',
          heringStatus: 'Joint mobility improved after continued motion',
        },
      ],
      attachedDocuments: [
        { name: 'Knee_MRI_Synovial_Effusion.pdf', type: 'IMAGING', date: '02 Aug 2026' },
      ],
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
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-[#0B0F19] border-[#1C1F26] text-white'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-black shadow-md">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2
              className={`font-black text-sm uppercase tracking-wider ${
                isLight ? 'text-emerald-800' : 'text-emerald-400'
              }`}
            >
              ABDM FHIR PATIENT EHR & LONGITUDINAL CLINICAL CASE REPOSITORY
            </h2>
            <p
              className={`text-xs ${
                isLight ? 'text-slate-600' : 'text-gray-400'
              }`}
            >
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
                      ? isLight
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs'
                        : 'bg-gradient-to-r from-emerald-600/20 to-teal-600/10 border-emerald-500 text-white font-bold shadow-md'
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
                  <p
                    className={`font-black text-sm mt-1 ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {patient.fullName} ({patient.ageGender})
                  </p>
                  <p
                    className={`text-xs mt-0.5 line-clamp-1 ${
                      isLight ? 'text-slate-600' : 'text-gray-400'
                    }`}
                  >
                    {patient.activeDiagnosis}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: RICH HIGH-DENSITY INTERACTIVE PATIENT DOSSIER & LONGITUDINAL TIMELINE */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div
            className={`p-6 rounded-2xl border space-y-6 shadow-sm ${
              isLight
                ? 'bg-white border-slate-200 text-slate-900'
                : 'bg-[#0B0F19] border-[#1C1F26] text-white'
            }`}
          >
            {/* PATIENT HEADER & VISIBLE NAME */}
            <div
              className={`flex flex-wrap items-center justify-between gap-4 border-b pb-4 ${
                isLight ? 'border-slate-200' : 'border-slate-800'
              }`}
            >
              <div>
                <div className="flex flex-wrap items-center space-x-2 gap-2">
                  <h1
                    className={`text-xl font-black ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {activePatient.fullName}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-600 text-white text-xs font-black">
                    ABHA: {activePatient.abhaId}
                  </span>
                </div>
                <p
                  className={`text-xs mt-1.5 ${
                    isLight ? 'text-slate-600' : 'text-gray-400'
                  }`}
                >
                  Age/Gender: <strong className={isLight ? 'text-slate-900' : 'text-white'}>{activePatient.ageGender}</strong> • Blood Group: <strong className="text-emerald-600 dark:text-emerald-400">{activePatient.bloodGroup}</strong> • Last Consultation: {activePatient.lastVisit}
                </p>
              </div>

              {/* ACTION: ONE-CLICK LOAD CASE INTO SIMILIMATRIX */}
              <button
                onClick={handleLoadCase}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs flex items-center space-x-2 shadow-md transition-all transform hover:scale-105 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>⚡ Load Patient Case into Active SimiliMatrix</span>
              </button>
            </div>

            {/* LIVE CLINICAL VITALS GRID - HARMONIZED ACROSS LIGHT & DARK */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'BLOOD PRESSURE', val: activePatient.vitals.bp, color: 'text-emerald-600 dark:text-emerald-400' },
                { label: 'PULSE RATE', val: activePatient.vitals.pulse, color: 'text-cyan-600 dark:text-cyan-400' },
                { label: 'BODY TEMPERATURE', val: activePatient.vitals.temp, color: 'text-orange-600 dark:text-orange-400' },
                { label: 'SPO2 SATURATION', val: activePatient.vitals.spo2, color: 'text-purple-600 dark:text-purple-400' },
              ].map((vital, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border space-y-1 ${
                    isLight
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-[#111317] border-slate-800'
                  }`}
                >
                  <p
                    className={`text-[10px] font-bold ${
                      isLight ? 'text-slate-500' : 'text-gray-400'
                    }`}
                  >
                    {vital.label}
                  </p>
                  <p className={`text-xl font-black ${vital.color}`}>{vital.val}</p>
                </div>
              ))}
            </div>

            {/* DIAGNOSTIC PROFILE & CONSTITUTIONAL SIMILLIMUM TRACK */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-xl border space-y-2 text-xs ${
                  isLight
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                <span className="font-black text-emerald-700 dark:text-emerald-400 uppercase">
                  🩺 ACTIVE CLINICAL DIAGNOSIS & ICD-11
                </span>
                <p
                  className={`font-bold leading-relaxed ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {activePatient.activeDiagnosis}
                </p>
                <p className={isLight ? 'text-slate-600' : 'text-gray-400'}>
                  Active Miasmatic Focus: <strong className="text-purple-600 dark:text-purple-400">{activePatient.miasmaticFocus}</strong>
                </p>
              </div>

              <div
                className={`p-4 rounded-xl border space-y-2 text-xs ${
                  isLight
                    ? 'bg-emerald-50 border-emerald-300 text-slate-900'
                    : 'bg-emerald-950/40 border-emerald-500/40 text-white'
                }`}
              >
                <span className="font-black text-emerald-700 dark:text-emerald-300 uppercase">
                  ✨ CONFIRMED CONSTITUTIONAL SIMILLIMUM TRACK
                </span>
                <p
                  className={`text-lg font-black ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {activePatient.simillimumTrack}
                </p>
                <p className="text-emerald-700 dark:text-emerald-300">
                  Consent Hash: <strong className="font-mono">{activePatient.consentHash}</strong> (Verified ABDM Gateway)
                </p>
              </div>
            </div>

            {/* LONGITUDINAL CONSULTATION & HERING'S LAW DIRECTION OF CURE TIMELINE */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> LONGITUDINAL CONSULTATION & HERING DIRECTION OF CURE TIMELINE
                </span>
                <span
                  className={`text-xs ${
                    isLight ? 'text-slate-500' : 'text-gray-400'
                  }`}
                >
                  {activePatient.consultationHistory.length} RECORDED CONSULTATIONS
                </span>
              </div>

              <div className="space-y-3">
                {activePatient.consultationHistory.map((visit, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border space-y-2 ${
                      isLight
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-[#111317] border-slate-800'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-black text-xs text-emerald-600 dark:text-emerald-400">
                        🗓️ {visit.date}
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-emerald-600 text-white">
                        {visit.prescription}
                      </span>
                    </div>
                    <p
                      className={`text-xs font-bold ${
                        isLight ? 'text-slate-800' : 'text-white'
                      }`}
                    >
                      Complaint: {visit.complaint}
                    </p>
                    <p className="text-xs text-cyan-700 dark:text-cyan-300 font-bold">
                      🛡️ Hering's Law Direction of Cure Progress: {visit.heringStatus}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ABDM FHIR HEALTH DOCUMENT LOCKER */}
            <div className="space-y-3 pt-2">
              <span className="font-black text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4" /> ABDM HEALTH LOCKER ATTACHED DOCUMENTS & DIAGNOSTICS
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activePatient.attachedDocuments.map((doc, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-xl border flex items-center justify-between ${
                      isLight
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-[#111317] border-slate-800'
                    }`}
                  >
                    <div>
                      <p
                        className={`text-xs font-black ${
                          isLight ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        📄 {doc.name}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        Type: {doc.type} • Date: {doc.date}
                      </p>
                    </div>
                    <span className="text-[10px] font-black px-2 py-1 rounded bg-purple-600 text-white">
                      VERIFIED FHIR
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCaseRepositoryView;

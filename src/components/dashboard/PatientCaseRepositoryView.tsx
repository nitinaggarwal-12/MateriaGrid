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
  GitCommit,
  ArrowDownRight,
  TrendingUp,
  Lock,
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
      encounterChain: [
        {
          encounterId: 'ENC-2026-0804-02 (Current)',
          hash: '0x8F4A992C291B',
          parentHash: '0x3E1B440199A4',
          doctorReg: 'AYUSH-DEL-2026-90412 (Dr. Nitin Aggarwal, MD Hom.)',
          date: '04 Aug 2026, 09:30 AM',
          chiefComplaint: 'Acute pulsating headache after sun exposure & carotid throbbing',
          rubricsMatched: [
            'MIND - BUSINESS - talks of',
            'HEAD - PAIN - pulsating - sudden',
            'HEAD - PAIN - sun - exposure to',
          ],
          prescriptionGiven: 'Belladonna LM 0/1 Liquid Sip + Chelidonium 1X Organopathy',
          heringLawOutcome: 'Positive Cure Vector: Carotid throbbing reduced by 70% within 45 mins. Bilirubin stabilized.',
          thermalThirstShift: 'Thermal: HOT -> HOT | Thirst: THIRSTLESS (Unchanged)',
        },
        {
          encounterId: 'ENC-2026-0718-01 (Baseline)',
          hash: '0x3E1B440199A4',
          parentHash: '0x000000000000 (GENESIS ENCOUNTER)',
          doctorReg: 'AYUSH-DEL-2026-90412 (Dr. Nitin Aggarwal, MD Hom.)',
          date: '18 Jul 2026, 05:15 PM',
          chiefComplaint: 'Seasonal allergic rhinitis & nocturnal anxiety after sunset',
          rubricsMatched: [
            'MIND - ANXIETY - night - sun set after',
            'STOMACH - THIRSTLESS - fever during',
          ],
          prescriptionGiven: 'Sulphur 30C (Single Dose Aqueous)',
          heringLawOutcome: 'Hering Direction of Cure: Internal anxiety eliminated; mild superficial forearm skin eruption emerged (Within -> Outward).',
          thermalThirstShift: 'Thermal: HOT | Thirst: THIRSTLESS',
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
      encounterChain: [
        {
          encounterId: 'ENC-2026-0803-01',
          hash: '0x3E1B...99A4',
          parentHash: '0x000000000000',
          doctorReg: 'AYUSH-DEL-2026-90412',
          date: '03 Aug 2026, 04:15 PM',
          chiefComplaint: 'Scapular neuralgic pain under right shoulder & jaundice',
          rubricsMatched: [
            'ABDOMEN - PAIN - right scapula - under lower angle',
            'ABDOMEN - CIRRHOSIS - liver - chronic parenchyma',
          ],
          prescriptionGiven: 'Chelidonium majus 1X Liver Drainage + Sulphur 30C',
          heringLawOutcome: 'Bilirubin reduced from 3.2 to 1.8 mg/dL.',
          thermalThirstShift: 'Thermal: HOT | Thirst: THIRSTY for hot drinks',
        },
      ],
      attachedDocuments: [
        { name: 'Liver_Function_Test_LFT.pdf', type: 'BIOCHEMISTRY', date: '03 Aug 2026' },
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
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2
              className={`font-black text-sm uppercase tracking-wider ${
                isLight ? 'text-emerald-800' : 'text-emerald-400'
              }`}
            >
              CRYPTOGRAPHIC PHYSICIAN-PATIENT ENCOUNTER CHAIN & HERING LONGITUDINAL AUDIT
            </h2>
            <p
              className={`text-xs ${
                isLight ? 'text-slate-600' : 'text-gray-400'
              }`}
            >
              Unalterable SHA-256 Prescription Encounter Blockchain Linking Improvements, Potency Changes & Habit Shifts
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
                      {patient.encounterChain.length} ENCOUNTERS
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

        {/* RIGHT COLUMN: LONGITUDINAL ENCOUNTER CHAIN & HERING DIRECTION OF CURE GRAPH */}
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
                  Age/Gender: <strong className={isLight ? 'text-slate-900' : 'text-white'}>{activePatient.ageGender}</strong> • Blood Group: <strong className="text-emerald-600 dark:text-emerald-400">{activePatient.bloodGroup}</strong> • Verified Consent Hash: <strong className="font-mono text-emerald-500">{activePatient.consentHash}</strong>
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

            {/* LONGITUDINAL PHYSICIAN-PATIENT ENCOUNTER CRYPTOGRAPHIC BLOCKCHAIN TREE */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-black text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <GitCommit className="w-4 h-4" /> LONGITUDINAL PHYSICIAN-PATIENT ENCOUNTER CHAIN (HERING AUDIT LEDGER)
                </span>
                <span
                  className={`text-xs ${
                    isLight ? 'text-slate-500' : 'text-gray-400'
                  }`}
                >
                  SHA-256 PARENT-CHILD ENCOUNTER LINKING
                </span>
              </div>

              <div className="space-y-4 relative pl-4 border-l-2 border-emerald-500/40">
                {activePatient.encounterChain.map((enc, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border space-y-3 transition-all relative ${
                      isLight
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-[#111317] border-slate-800'
                    }`}
                  >
                    {/* ENCOUNTER CRYPTOGRAPHIC HEADER */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2.5">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white text-xs font-black">
                          {enc.encounterId}
                        </span>
                        <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-black">
                          HASH: {enc.hash}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">
                          (PARENT: {enc.parentHash})
                        </span>
                      </div>
                      <span
                        className={`text-xs font-bold ${
                          isLight ? 'text-slate-700' : 'text-gray-300'
                        }`}
                      >
                        🗓️ {enc.date} • {enc.doctorReg}
                      </span>
                    </div>

                    {/* CLINICAL COMPLAINT & RUBRICS LINKED */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1.5">
                        <p className="font-black text-emerald-700 dark:text-emerald-400">
                          Chief Complaint & Symptom Totality:
                        </p>
                        <p className={isLight ? 'text-slate-800' : 'text-white'}>
                          {enc.chiefComplaint}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {enc.rubricsMatched.map((r, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-gray-300"
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <p className="font-black text-cyan-600 dark:text-cyan-400">
                          Prescription & Potency Prescribed:
                        </p>
                        <p className="font-black text-sm text-emerald-600 dark:text-emerald-400">
                          {enc.prescriptionGiven}
                        </p>
                        <p
                          className={`text-xs font-bold pt-1 ${
                            isLight ? 'text-slate-700' : 'text-gray-300'
                          }`}
                        >
                          🧭 {enc.thermalThirstShift}
                        </p>
                      </div>
                    </div>

                    {/* HERING DIRECTION OF CURE & CLINICAL OUTCOME VECTOR */}
                    <div
                      className={`p-3.5 rounded-xl border flex items-start space-x-2.5 text-xs ${
                        isLight
                          ? 'bg-emerald-50 border-emerald-300 text-slate-900'
                          : 'bg-emerald-950/30 border-emerald-500/40 text-white'
                      }`}
                    >
                      <TrendingUp className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-emerald-700 dark:text-emerald-300 uppercase block font-black">
                          HERING'S LAW DIRECTION OF CURE & LONGITUDINAL OUTCOME:
                        </strong>
                        <p className="mt-0.5 font-bold leading-relaxed">
                          {enc.heringLawOutcome}
                        </p>
                      </div>
                    </div>
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

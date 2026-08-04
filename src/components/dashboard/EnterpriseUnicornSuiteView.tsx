'use client';

import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  FileCheck2,
  Truck,
  Activity,
  Award,
  CheckCircle2,
  Lock,
  Globe,
  TrendingUp,
  CreditCard,
  BarChart3,
  Server,
  Key,
  Eye,
  RefreshCw,
} from 'lucide-react';

interface EnterpriseUnicornSuiteViewProps {
  theme?: 'dark' | 'light';
}

export const EnterpriseUnicornSuiteView: React.FC<
  EnterpriseUnicornSuiteViewProps
> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';
  const [activeSubTab, setActiveSubTab] = useState<
    'FLEET_RBAC' | 'RWE_PHARMA' | 'UHI_CLAIMS' | 'EDI_SUPPLY'
  >('FLEET_RBAC');

  const hospitalBranches = [
    {
      id: 'DELHI_MAX_OPD',
      name: 'Max Super Speciality — New Delhi Ayush OPD',
      doctors: 18,
      activeCases: 412,
      compliance: 'SOC2 TYPE II VERIFIED',
      status: 'ONLINE',
      latency: '8ms',
    },
    {
      id: 'MUMBAI_APOLLO',
      name: 'Apollo Hospital — Mumbai Holistic Center',
      doctors: 24,
      activeCases: 689,
      compliance: 'HIPAA & ABDM v2.4',
      status: 'ONLINE',
      latency: '11ms',
    },
    {
      id: 'BENGALURU_AYUSH',
      name: 'National Institute of Ayush — Bengaluru Hub',
      doctors: 35,
      activeCases: 1240,
      compliance: 'GOVT CCRH AUDITED',
      status: 'ONLINE',
      latency: '9ms',
    },
  ];

  const rwePharmaTrials = [
    {
      remedy: 'Belladonna 200C vs Standard Analgesic',
      pathology: 'ICD-11 8A80 Migraine & Acute Vasomotor Headache',
      patients: '3,420 Cohort',
      recoveryRate: '94.2% Amelioration',
      sponsor: 'Schwabe India / AYUSH RWE Consortium',
    },
    {
      remedy: 'Chelidonium majus 1X Tissue Drainage',
      pathology: 'ICD-11 DB90 Hepatic Parenchymal Degeneration',
      patients: '2,150 Cohort',
      recoveryRate: '89.6% ALT/AST Normalization',
      sponsor: 'SBL Pharmaceutical Research',
    },
    {
      remedy: 'Arsenicum album 30C Prophylaxis',
      pathology: 'ICD-11 CA40 Upper Respiratory Mucosal Inflammation',
      patients: '5,800 Cohort',
      recoveryRate: '91.8% Immunity Resilience',
      sponsor: 'National CCRH Clinical Trial Repository',
    },
    {
      remedy: 'Rhus toxicodendron 200C Synovial Track',
      pathology: 'ICD-11 FA00 Chronic Inflammatory Synovitis',
      patients: '4,100 Cohort',
      recoveryRate: '93.1% Joint Mobility Restored',
      sponsor: 'Hahnemann Publishing Co. Proving Registry',
    },
  ];

  const auditLogs = [
    {
      timestamp: '00:00:14 IST',
      action: 'SOC2 AES-256 FHIR Record Encryption Handshake',
      actor: 'System Autonomous Guard',
      status: 'VERIFIED',
    },
    {
      timestamp: '23:59:42 IST',
      action: 'ABDM ABHA Patient Identity Verification Token #91-4829-1049-3829',
      actor: 'Dr. Prafull Vijayakar Clone',
      status: 'VERIFIED',
    },
    {
      timestamp: '23:58:11 IST',
      action: 'Automated UHI Insurance e-RUPI Claim Adjudication ₹1,500',
      actor: 'NHA Gateway Worker',
      status: 'ADJUDICATED',
    },
  ];

  return (
    <div
      className={`w-full h-full flex flex-col font-sans select-none overflow-y-auto transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#090A0C] text-[#E6E8EA]'
      }`}
    >
      {/* ENTERPRISE HEADER */}
      <div
        className={`p-3.5 border-b flex flex-wrap items-center justify-between gap-3 ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#111317] border-[#1C1F26]'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white font-black text-sm shadow-sm">
            $1B
          </div>
          <div>
            <h2 className="font-bold text-xs uppercase tracking-wider font-mono">
              MateriaGrid Enterprise Unicorn Command Suite
            </h2>
            <p className="text-[10px] text-gray-500 font-mono">
              Multi-Clinic Fleet RBAC, RWE Pharma Discovery, UHI Insurance Claims & EDI Supply Chain
            </p>
          </div>
        </div>

        {/* ENTERPRISE PILLAR SWITCHER */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveSubTab('FLEET_RBAC')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSubTab === 'FLEET_RBAC'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🏢 Hospital Fleet & RBAC
          </button>
          <button
            onClick={() => setActiveSubTab('RWE_PHARMA')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSubTab === 'RWE_PHARMA'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📊 RWE Pharma Analytics
          </button>
          <button
            onClick={() => setActiveSubTab('UHI_CLAIMS')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSubTab === 'UHI_CLAIMS'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            💳 UHI Claims & e-RUPI
          </button>
          <button
            onClick={() => setActiveSubTab('EDI_SUPPLY')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSubTab === 'EDI_SUPPLY'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🚚 EDI LM Pharmacy Stock
          </button>
        </div>
      </div>

      {/* BODY WORKBENCH (FULL VIEWPORT COVERAGE) */}
      <div className="p-4 space-y-4 font-mono text-xs flex-1">
        {/* SUBTAB 1: HOSPITAL FLEET & RBAC SECURITY */}
        {activeSubTab === 'FLEET_RBAC' && (
          <div className="space-y-4">
            {/* TOP 4 EXECUTIVE TELEMETRY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
                <span className="text-[10px] text-gray-500 block uppercase">
                  ENTERPRISE HOSPITAL CHAINS
                </span>
                <span className="text-2xl font-black text-slate-900 my-1 block">
                  14 Groups
                </span>
                <span className="text-[10px] text-emerald-600 font-bold">
                  Apollo, Max, Fortis, AYUSH Network
                </span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
                <span className="text-[10px] text-gray-500 block uppercase">
                  ACTIVE CLINICIAN LICENSES
                </span>
                <span className="text-2xl font-black text-slate-900 my-1 block">
                  4,280 MDs
                </span>
                <span className="text-[10px] text-emerald-600 font-bold">
                  ABDM Verified Practitioner IDs
                </span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
                <span className="text-[10px] text-gray-500 block uppercase">
                  SECURITY & AUDIT CERTIFICATION
                </span>
                <span className="text-2xl font-black text-emerald-600 my-1 block">
                  SOC2 TYPE II
                </span>
                <span className="text-[10px] text-gray-500">
                  ISO 27001 & HIPAA Encrypted
                </span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
                <span className="text-[10px] text-gray-500 block uppercase">
                  MONTHLY ENTERPRISE ARR
                </span>
                <span className="text-2xl font-black text-purple-600 my-1 block">
                  ₹84.2 Crore
                </span>
                <span className="text-[10px] text-emerald-600 font-bold">
                  +184% YoY Institutional Growth
                </span>
              </div>
            </div>

            {/* MIDDLE ROW: ACTIVE FLEET NODES & ROLE-BASED ACCESS PERMISSION MATRIX */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-7 border rounded-xl bg-white p-4 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between border-b pb-2 border-slate-200">
                  <span className="font-bold text-xs uppercase text-purple-600 flex items-center gap-1.5">
                    <Server className="w-4 h-4" /> ACTIVE HOSPITAL FLEET NODES & RBAC HIERARCHY
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold">
                    CLOUDTOP PG CLUSTER: ONLINE
                  </span>
                </div>

                <div className="space-y-2.5">
                  {hospitalBranches.map((b) => (
                    <div
                      key={b.id}
                      className="p-3 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <p className="font-black text-slate-900">{b.name}</p>
                        <p className="text-[10px] text-gray-500">
                          {b.doctors} MD Practicing Clinicians // {b.activeCases} Active OPD Cohort
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px]">
                          Latency: {b.latency}
                        </span>
                        <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          {b.compliance}
                        </span>
                        <span className="px-2 py-1 rounded bg-slate-900 text-white font-bold text-[10px]">
                          {b.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ENTERPRISE RBAC PERMISSION MATRIX CARD */}
              <div className="lg:col-span-5 border rounded-xl bg-white p-4 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between border-b pb-2 border-slate-200">
                  <span className="font-bold text-xs uppercase text-purple-600 flex items-center gap-1.5">
                    <Key className="w-4 h-4" /> ROLE-BASED ACCESS CONTROL (RBAC) MATRIX
                  </span>
                  <span className="text-[10px] text-gray-400">SOC2 POLICIES</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800">Chief Medical Officer (CMO)</span>
                    <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                      FULL ENTERPRISE AUDIT & EHR ACCESS
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800">Attending OPD Physician</span>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      PATIENT INTAKE + SIMILIMATRIX GRADE CYCLE
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800">Dispensing Pharmacist</span>
                    <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded">
                      LIQUID LM POTENCY STOCK & RX BARCODE
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800">UHI Insurance Auditor</span>
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      READ-ONLY ICD-11 & e-RUPI ADJUDICATION
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* LOWER ROW: REAL-TIME SOC2 AES-256 AUDIT LOG TRAIL */}
            <div className="border rounded-xl bg-white p-4 space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between border-b pb-2 border-slate-200">
                <span className="font-bold text-xs uppercase text-emerald-600 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> LIVE REAL-TIME SOC2 TYPE II CRYPTOGRAPHIC AUDIT LOG TRAIL
                </span>
                <span className="text-[10px] text-gray-400">UNALTERABLE LEDGER</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {auditLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-500 font-mono">{log.timestamp}</span>
                      <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                        {log.status}
                      </span>
                    </div>
                    <p className="font-bold text-xs text-slate-800 leading-snug">{log.action}</p>
                    <p className="text-[10px] text-gray-500">Actor: {log.actor}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: REAL-WORLD EVIDENCE (RWE) PHARMA DISCOVERY */}
        {activeSubTab === 'RWE_PHARMA' && (
          <div className="space-y-4">
            <div className="border rounded-xl bg-white p-4 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between border-b pb-2 border-slate-200">
                <span className="font-bold text-xs uppercase text-purple-600">
                  REAL-WORLD EVIDENCE (RWE) PHARMACEUTICAL CLINICAL PROVING REPOSITORY
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full font-bold">
                  N=15,470 VERIFIED PATIENT COHORT
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {rwePharmaTrials.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs text-slate-900">
                        {t.remedy}
                      </span>
                      <span className="font-black text-xs text-emerald-600">
                        {t.recoveryRate}
                      </span>
                    </div>
                    <p className="text-xs font-sans text-slate-700">
                      {t.pathology}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Sample Size: <strong>{t.patients}</strong> // B2B Sponsor:{' '}
                      <strong>{t.sponsor}</strong>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: UHI INSURANCE CLAIMS & e-RUPI */}
        {activeSubTab === 'UHI_CLAIMS' && (
          <div className="border rounded-xl bg-white p-4 space-y-3 shadow-2xs">
            <span className="font-bold text-xs uppercase text-purple-600">
              NATIONAL HEALTH AUTHORITY UHI INSURED OPD CLAIM ADJUDICATION
            </span>
            <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/70 space-y-2">
              <p className="font-bold text-emerald-900 text-xs">
                Automated ICD-11 Clinical Claim Submission Ready
              </p>
              <p className="text-xs font-sans text-emerald-800">
                Patient Ramesh Kumar Sharma (ABHA: 91-4829-1049-3829) is pre-approved for NHA e-RUPI Digital OPD Healthcare Voucher ₹1,500. Direct payout settlement to Max Super Speciality OPD Pharmacy account.
              </p>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-1.5 rounded-lg text-xs cursor-pointer">
                Submit Cryptographic UHI Insurance Claim Now
              </button>
            </div>
          </div>
        )}

        {/* SUBTAB 4: EDI PHARMACY SUPPLY CHAIN */}
        {activeSubTab === 'EDI_SUPPLY' && (
          <div className="border rounded-xl bg-white p-4 space-y-3 shadow-2xs">
            <span className="font-bold text-xs uppercase text-purple-600">
              AUTOMATED EDI LIQUID LM POTENCY REPLENISHMENT DISPATCH
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-slate-200">
                <p className="font-bold text-xs">Dr. Willmar Schwabe India EDI Hub</p>
                <p className="text-[10px] text-gray-500">
                  Automated Liquid LM 0/1 to LM 0/12 glass vial dispatch API active.
                </p>
              </div>
              <div className="p-3 rounded-lg border border-slate-200">
                <p className="font-bold text-xs">SBL Pharmaceuticals Laboratory</p>
                <p className="text-[10px] text-gray-500">
                  Mother Tincture & 1X tissue drainage order synchronization active.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnterpriseUnicornSuiteView;

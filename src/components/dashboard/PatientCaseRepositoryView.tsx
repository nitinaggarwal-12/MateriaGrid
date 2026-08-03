'use client';

import React, { useState } from 'react';
import {
  Users,
  Search,
  Download,
  ShieldCheck,
  FileText,
  ExternalLink,
} from 'lucide-react';

interface PatientCaseRepositoryViewProps {
  theme?: 'dark' | 'light';
}

export const PatientCaseRepositoryView: React.FC<
  PatientCaseRepositoryViewProps
> = ({ theme = 'light' }) => {
  const isLight = theme === 'light';
  const [searchQuery, setSearchQuery] = useState('');

  const patients = [
    {
      id: 'P-1001',
      name: 'Ramesh Kumar Sharma',
      abhaId: '91-4829-1049-3829',
      icd11: 'DB90 Liver Cirrhosis & Hepatic Congestion',
      simillimum: 'Belladonna 200C + Chelidonium 1X',
      miasm: 'Syphilitic / Destructive',
      status: 'VERIFIED_ABDM_FHIR',
    },
    {
      id: 'P-1002',
      name: 'Ananya Verma',
      abhaId: '91-8821-4402-9912',
      icd11: '8A80 Migraine Disorders (Sunstroke)',
      simillimum: 'Belladonna 200C Liquid Sip',
      miasm: 'Acute Psoric',
      status: 'VERIFIED_ABDM_FHIR',
    },
    {
      id: 'P-1003',
      name: 'Vikramaditya Rao',
      abhaId: '91-1029-5511-7788',
      icd11: 'FA00 Joint Synovitis Knee',
      simillimum: 'Rhus toxicodendron 200C',
      miasm: 'Sycotic',
      status: 'VERIFIED_ABDM_FHIR',
    },
    {
      id: 'P-1004',
      name: 'Meenakshi Iyer',
      abhaId: '91-7712-4409-1120',
      icd11: 'DD90 Acute Gastroenteritis',
      simillimum: 'Arsenicum album 30C',
      miasm: 'Psoro-Syphilitic',
      status: 'VERIFIED_ABDM_FHIR',
    },
    {
      id: 'P-1005',
      name: 'Siddharth Deshmukh',
      abhaId: '91-5512-8802-3311',
      icd11: 'CA23 Bronchial Asthma',
      simillimum: 'Pulsatilla nigricans LM 0/1',
      miasm: 'Tubercular',
      status: 'VERIFIED_ABDM_FHIR',
    },
    {
      id: 'P-1006',
      name: 'Priyanka Banerjee',
      abhaId: '91-9921-3344-7712',
      icd11: 'GA10 Chronic Pelvic Inflammatory',
      simillimum: 'Lachesis mutus 200C',
      miasm: 'Syphilitic',
      status: 'VERIFIED_ABDM_FHIR',
    },
    {
      id: 'P-1007',
      name: 'Gurpreet Singh',
      abhaId: '91-6621-1102-4490',
      icd11: 'EA80 Psoriasis Scaly Plaque',
      simillimum: 'Sulphur 30C Centesimal',
      miasm: 'Psoric Keynote',
      status: 'VERIFIED_ABDM_FHIR',
    },
    {
      id: 'P-1008',
      name: 'Kavita Patel',
      abhaId: '91-4412-7709-8812',
      icd11: '8A91 Trigeminal Neuralgia',
      simillimum: 'Aconitum napellus 200C',
      miasm: 'Acute Psoric',
      status: 'VERIFIED_ABDM_FHIR',
    },
    {
      id: 'P-1009',
      name: 'Harishchandra Mohanty',
      abhaId: '91-2210-9902-5512',
      icd11: 'GB61 Renal Nephrolithiasis',
      simillimum: 'Berberis vulgaris Mother Tincture',
      miasm: 'Sycotic',
      status: 'VERIFIED_ABDM_FHIR',
    },
    {
      id: 'P-1010',
      name: 'Shalini Nambiar',
      abhaId: '91-3341-8891-2201',
      icd11: '5A11 Type 2 Diabetes Mellitus',
      simillimum: 'Syzygium jambolanum 1X',
      miasm: 'Sycotic / Endoderm',
      status: 'VERIFIED_ABDM_FHIR',
    },
  ];

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.abhaId.includes(searchQuery) ||
      p.icd11.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`w-full h-full flex flex-col font-sans select-none overflow-hidden transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#090A0C] text-[#E6E8EA]'
      }`}
    >
      {/* HEADER */}
      <div
        className={`p-3 border-b flex flex-wrap items-center justify-between gap-3 ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#111317] border-[#1C1F26]'
        }`}
      >
        <div className="flex items-center space-x-2.5">
          <Users className="w-5 h-5 text-emerald-600" />
          <div>
            <h2 className="font-bold text-xs uppercase tracking-wider">
              Patient EHR & ABDM ABHA FHIR Clinical Repository
            </h2>
            <p className="text-[10px] text-gray-500 font-mono">
              National Health Authority (NHA) v2.4 Cryptographically Signed Case Records
            </p>
          </div>
        </div>

        <button
          onClick={() => alert('Exporting all 10 verified ABDM FHIR bundles...')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-2 shadow-sm transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export All FHIR Bundles</span>
        </button>
      </div>

      {/* SEARCH TOOLBAR */}
      <div
        className={`px-4 py-2.5 border-b flex items-center justify-between ${
          isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-[#090A0C] border-[#1C1F26]'
        }`}
      >
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Patient Name, ABHA Digital Health ID, or ICD-11 Diagnosis..."
            className={`w-full rounded-xl pl-9 pr-4 py-1.5 text-xs font-mono focus:outline-none ${
              isLight
                ? 'bg-white border border-slate-300 text-slate-900 focus:border-emerald-600'
                : 'bg-[#111317] border border-[#1C1F26] text-white focus:border-emerald-500'
            }`}
          />
        </div>

        <span className="text-xs font-mono text-emerald-600 font-bold">
          {filteredPatients.length} Verified ABHA FHIR Records Loaded
        </span>
      </div>

      {/* BODY TABLE */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs">
        <div
          className={`border rounded-xl overflow-hidden ${
            isLight ? 'bg-white border-slate-200 shadow-2xs' : 'bg-[#111317] border-[#1C1F26]'
          }`}
        >
          <table className="w-full text-left">
            <thead
              className={`border-b text-[11px] ${
                isLight
                  ? 'bg-slate-100 border-slate-200 text-slate-700'
                  : 'bg-[#090A0C] border-[#1C1F26] text-gray-400'
              }`}
            >
              <tr>
                <th className="px-4 py-2.5">PATIENT ID & NAME</th>
                <th className="px-4 py-2.5">ABHA DIGITAL HEALTH ID</th>
                <th className="px-4 py-2.5">ICD-11 DIAGNOSIS</th>
                <th className="px-4 py-2.5">PRESCRIBED SIMILLIMUM</th>
                <th className="px-4 py-2.5">MIASMATIC FOCUS</th>
                <th className="px-4 py-2.5">ABDM STATUS</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                isLight ? 'divide-slate-200' : 'divide-[#1C1F26]'
              }`}
            >
              {filteredPatients.map((p, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    isLight ? 'hover:bg-slate-50' : 'hover:bg-[#1C1F26]/50'
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className="font-bold text-emerald-600 block text-xs">
                      {p.id}
                    </span>
                    <span className="font-bold text-slate-900 text-xs">
                      {p.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs">{p.abhaId}</td>
                  <td className="px-4 py-3 font-bold text-xs">{p.icd11}</td>
                  <td className="px-4 py-3 font-black text-emerald-700 text-xs">
                    {p.simillimum}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{p.miasm}</td>
                  <td className="px-4 py-3">
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit">
                      <ShieldCheck className="w-3 h-3" /> VERIFIED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientCaseRepositoryView;

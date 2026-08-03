'use client';

import React from 'react';
import { GitCompare, Sparkles, CheckCircle2 } from 'lucide-react';

interface DifferentialWorkbenchViewProps {
  theme?: 'dark' | 'light';
}

export const DifferentialWorkbenchView: React.FC<
  DifferentialWorkbenchViewProps
> = ({ theme = 'light' }) => {
  const isLight = theme === 'light';

  const rows = [
    {
      parameter: '1. TF-IDF SPECIFICITY SCORE',
      bell: '65.20 (Top Keynote Simillimum)',
      bry: '46.80 (#5 Rank)',
      ars: '40.50 (#8 Rank)',
    },
    {
      parameter: '2. THERMAL BASELINE',
      bell: 'HOT (Amel. Cold air & applications)',
      bry: 'HOT (Worse warmth of bed)',
      ars: 'CHILLY (Worse cold air & uncovering)',
    },
    {
      parameter: '3. THIRST PROFILE',
      bell: 'THIRSTLESS during fever / small sips',
      bry: 'THIRSTY for large quantities infrequent',
      ars: 'THIRSTY for warm drinks / frequent sips',
    },
    {
      parameter: '4. LATERALITY & DIRECTION',
      bell: 'RIGHT-SIDED (Right carotids/head)',
      bry: 'RIGHT-SIDED (Right liver/chest)',
      ars: 'LEFT-SIDED / ALTERNATING',
    },
    {
      parameter: '5. HEADACHE MODALITY',
      bell: 'Throbbing, sudden, worse sunlight',
      bry: 'Stitching, worse slightest motion',
      ars: 'Burning, unquenchable, worse 1-2 AM',
    },
    {
      parameter: '6. SEHGAL ROH PPP MIND STATE',
      bell: 'MIND - BUSINESS - talks of (Grade 3)',
      bry: 'MIND - BUSINESS - talks of (Grade 4)',
      ars: 'MIND - ANXIETY - death of - nocturnal',
    },
    {
      parameter: '7. EMBRYOLOGICAL LAYER AFFINITY',
      bell: 'ECTODERM (Cerebral congestion & skin)',
      bry: 'MESODERM / SEROUS (Synovial effusions)',
      ars: 'ENDODERM & ECTODERM (Mucous erosion)',
    },
    {
      parameter: '8. MIASMATIC PREDOMINANCE',
      bell: 'ACUTE PSORIC / CONGESTIVE SYCOSIS',
      bry: 'PSORO-SYCOTIC (Effusion & stiffness)',
      ars: 'SYPHILITIC / DESTRUCTIVE (Ulcerative)',
    },
    {
      parameter: '9. AGGRAVATION TIME',
      bell: '3 PM / Sudden afternoon congestion',
      bry: '9 AM / First motion of the morning',
      ars: '1 AM to 2 AM (Midnight aggravation)',
    },
    {
      parameter: '10. COMPLEMENTARY FOLLOW-UP',
      bell: 'Calcarea carbonica (Deep chronic roots)',
      bry: 'Alumina / Kali-carb / Nat-m',
      ars: 'Thuja occidentalis / Sulphur',
    },
    {
      parameter: '11. INIMICAL REMEDIES (NEVER FOLLOW)',
      bell: 'Aceticum acidum (Antidotes acute Bell)',
      bry: 'Do not repeat rapidly in effusions',
      ars: 'Nux vomica antidotes chronic overdose',
    },
    {
      parameter: '12. SAFE POTENCY RECOMMENDATION',
      bell: 'Belladonna 200C in Liquid Sip Doses',
      bry: 'Bryonia 30C Centesimal or LM 0/1',
      ars: 'Arsenicum 200C (High constitutional)',
    },
  ];

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
          <GitCompare className="w-5 h-5 text-emerald-600" />
          <div>
            <h2 className="font-bold text-xs uppercase tracking-wider">
              Classical Tri-Remedy Comparative Differential Workbench
            </h2>
            <p className="text-[10px] text-gray-500 font-mono">
              Side-by-Side Diagnostic Parameter Matrix Synchronized with Active SimiliMatrix Top 3
            </p>
          </div>
        </div>

        <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-xl font-mono font-bold">
          SYNCHRONIZED WITH ACTIVE SIMILIMATRIX TOP 3
        </span>
      </div>

      {/* DIFFERENTIAL MATRIX TABLE */}
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
                <th className="px-4 py-3 w-[260px]">CLINICAL PARAMETER</th>
                <th className="px-4 py-3 text-emerald-600 font-black">
                  1. Belladonna (Bell 65.2) — TOP SIMILLIMUM
                </th>
                <th className="px-4 py-3 text-purple-600 font-black">
                  2. Bryonia alba (Bry 46.8)
                </th>
                <th className="px-4 py-3 text-blue-600 font-black">
                  3. Arsenicum album (Ars 40.5)
                </th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                isLight ? 'divide-slate-200' : 'divide-[#1C1F26]'
              }`}
            >
              {rows.map((r, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    isLight ? 'hover:bg-slate-50' : 'hover:bg-[#1C1F26]/50'
                  }`}
                >
                  <td className="px-4 py-3 font-bold text-slate-700">
                    {r.parameter}
                  </td>
                  <td className="px-4 py-3 font-bold text-emerald-800 bg-emerald-50/40">
                    {r.bell}
                  </td>
                  <td className="px-4 py-3 text-slate-800">{r.bry}</td>
                  <td className="px-4 py-3 text-slate-800">{r.ars}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DifferentialWorkbenchView;

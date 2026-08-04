'use client';

import React, { useState } from 'react';
import {
  FlaskConical,
  PackageCheck,
  Plus,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface PharmacyDispensaryViewProps {
  theme?: 'dark' | 'light';
}

export const PharmacyDispensaryView: React.FC<
  PharmacyDispensaryViewProps
> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';

  const [inventory, setInventory] = useState([
    {
      id: 'inv-1',
      remedy: 'Belladonna LM 0/1 (30ml Aqueous Succussion Bottle)',
      stockVials: 42,
      minThreshold: 10,
      batchNo: 'BATCH-2026-BELL-LM01',
      expiry: 'Dec 2029',
    },
    {
      id: 'inv-2',
      remedy: 'Chelidonium majus 1X Organopathy Mother Tincture (100ml)',
      stockVials: 28,
      minThreshold: 8,
      batchNo: 'BATCH-2026-CHEL-1X',
      expiry: 'Nov 2028',
    },
    {
      id: 'inv-3',
      remedy: 'Sulphur 200C Globules (Size 30 Cane Sugar Pellets)',
      stockVials: 18,
      minThreshold: 15,
      batchNo: 'BATCH-2026-SULP-200C',
      expiry: 'Aug 2030',
    },
    {
      id: 'inv-4',
      remedy: 'Rhus toxicodendron 30C (Aqueous Liquid Potency 15ml)',
      stockVials: 5,
      minThreshold: 10,
      batchNo: 'BATCH-2026-RHUS-30C',
      expiry: 'May 2029',
    },
  ]);

  const [dispatchedAlert, setDispatchedAlert] = useState<string | null>(null);

  const handleDispatch = (id: string, remedyName: string) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, stockVials: Math.max(0, item.stockVials - 1) }
          : item
      )
    );
    setDispatchedAlert(`Dispatched 1 Bottle of ${remedyName} to OPD Cabin 1!`);
    setTimeout(() => setDispatchedAlert(null), 3000);
  };

  return (
    <div
      className={`w-full h-full overflow-y-auto p-6 space-y-6 font-mono transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#05070A] text-white'
      }`}
    >
      {/* EXECUTIVE HEADER */}
      <div
        className={`p-5 rounded-2xl border shadow-sm flex flex-wrap items-center justify-between gap-4 transition-colors ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-[#0B0F19] border-[#1C1F26] text-white'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-black shadow-md">
            <FlaskConical className="w-6 h-6" />
          </div>
          <div>
            <h2
              className={`font-black text-base uppercase tracking-wider ${
                isLight ? 'text-emerald-800' : 'text-emerald-400'
              }`}
            >
              PHARMACY & CLASSICAL LIQUID LM POTENCY DISPENSARY INVENTORY
            </h2>
            <p
              className={`text-xs ${
                isLight ? 'text-slate-600' : 'text-gray-400'
              }`}
            >
              50-Millesimal (LM 0/1 to LM 0/30) Aqueous Succussion & Centesimal (C) Dispensing Track
            </p>
          </div>
        </div>

        {dispatchedAlert && (
          <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-4 h-4" />
            {dispatchedAlert}
          </span>
        )}
      </div>

      {/* INVENTORY TABLE & ACTIONS */}
      <div
        className={`p-6 rounded-2xl border space-y-4 shadow-sm transition-colors ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-[#0B0F19] border-[#1C1F26] text-white'
        }`}
      >
        <div
          className={`flex items-center justify-between border-b pb-3 ${
            isLight ? 'border-slate-200' : 'border-slate-800'
          }`}
        >
          <span
            className={`font-black text-sm uppercase ${
              isLight ? 'text-emerald-800' : 'text-emerald-400'
            }`}
          >
            CLASSICAL PHARMACY STOCK & LM POTENCY VIAL STOCK
          </span>
          <span
            className={`text-xs ${
              isLight ? 'text-slate-500' : 'text-gray-400'
            }`}
          >
            CLICK DISPATCH TO ISSUE VIAL
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inventory.map((item) => {
            const isLowStock = item.stockVials <= item.minThreshold;
            return (
              <div
                key={item.id}
                className={`p-5 rounded-xl border space-y-3 transition-all ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 hover:border-emerald-500'
                    : 'bg-[#111317] border-slate-800 hover:border-emerald-500/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-black text-xs ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {item.remedy}
                  </span>
                  {isLowStock ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-orange-600 text-white">
                      LOW STOCK ALERT
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-600 text-white">
                      IN STOCK
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span
                    className={
                      isLight ? 'text-slate-600' : 'text-gray-400'
                    }
                  >
                    Batch: {item.batchNo}
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-black text-sm">
                    {item.stockVials} Vials Left
                  </span>
                </div>

                <button
                  onClick={() => handleDispatch(item.id, item.remedy)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <PackageCheck className="w-4 h-4" />
                  <span>🚀 Dispatch Prescription Vial to Patient</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PharmacyDispensaryView;

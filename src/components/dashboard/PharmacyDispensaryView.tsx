'use client';

import React, { useState } from 'react';
import {
  FlaskConical,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  Plus,
  PackageCheck,
} from 'lucide-react';

interface PharmacyDispensaryViewProps {
  theme?: 'dark' | 'light';
}

interface StockItem {
  id: string;
  remedyName: string;
  code: string;
  potencyScale: string;
  vehicle: string;
  stockLevel: number;
  unit: string;
  status: 'STOCK_OPTIMAL' | 'REORDER_NEEDED' | 'DISPENSING_ACTIVE';
  expiryBatch: string;
}

export const PharmacyDispensaryView: React.FC<PharmacyDispensaryViewProps> = ({
  theme = 'light',
}) => {
  const isLight = theme === 'light';
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanningQr, setIsScanningQr] = useState(false);
  const [dispensedCount, setDispensedCount] = useState(14);

  const [stock, setStock] = useState<StockItem[]>([
    {
      id: 'STK-01',
      remedyName: 'Belladonna',
      code: 'Bell',
      potencyScale: 'LM 0/1 to LM 0/6 Liquid',
      vehicle: '20% Ethanol Pure Spring Water',
      stockLevel: 42,
      unit: 'Bottles (100ml)',
      status: 'STOCK_OPTIMAL',
      expiryBatch: 'BATCH-2027-B01',
    },
    {
      id: 'STK-02',
      remedyName: 'Chelidonium majus',
      code: 'Chel',
      potencyScale: '1X Mother Tincture / LM 0/1',
      vehicle: 'Liquid Hydro-Alcoholic Organopathy',
      stockLevel: 18,
      unit: 'Bottles (100ml)',
      status: 'STOCK_OPTIMAL',
      expiryBatch: 'BATCH-2027-C04',
    },
    {
      id: 'STK-03',
      remedyName: 'Sulphur',
      code: 'Sulph',
      potencyScale: '30C & 200C Centesimal Globules',
      vehicle: 'Cane Sugar Pellets #40',
      stockLevel: 65,
      unit: 'Phials (30g)',
      status: 'STOCK_OPTIMAL',
      expiryBatch: 'BATCH-2028-S12',
    },
    {
      id: 'STK-04',
      remedyName: 'Aconitum napellus',
      code: 'Acon',
      potencyScale: '1M Single Dose High Potency',
      vehicle: 'Lactose Dry Powder Dose',
      stockLevel: 12,
      unit: 'Phials (15g)',
      status: 'REORDER_NEEDED',
      expiryBatch: 'BATCH-2026-A09',
    },
    {
      id: 'STK-05',
      remedyName: 'Bryonia alba',
      code: 'Bry',
      potencyScale: 'LM 0/1 Liquid & 200C Globules',
      vehicle: 'Liquid & Cane Pellets',
      stockLevel: 34,
      unit: 'Bottles (100ml)',
      status: 'STOCK_OPTIMAL',
      expiryBatch: 'BATCH-2027-BR2',
    },
    {
      id: 'STK-06',
      remedyName: 'Pulsatilla nigricans',
      code: 'Puls',
      potencyScale: '30C & 200C Centesimal',
      vehicle: 'Cane Sugar Pellets #40',
      stockLevel: 28,
      unit: 'Phials (30g)',
      status: 'STOCK_OPTIMAL',
      expiryBatch: 'BATCH-2028-P05',
    },
    {
      id: 'STK-07',
      remedyName: 'Rhus toxicodendron',
      code: 'Rhus-t',
      potencyScale: '200C & 1M High Potency',
      vehicle: 'Cane Sugar Pellets #40',
      stockLevel: 9,
      unit: 'Phials (30g)',
      status: 'REORDER_NEEDED',
      expiryBatch: 'BATCH-2026-RT8',
    },
    {
      id: 'STK-08',
      remedyName: 'Arsenicum album',
      code: 'Ars',
      potencyScale: 'LM 0/1 to LM 0/3 Liquid',
      vehicle: '20% Ethanol Pure Spring Water',
      stockLevel: 51,
      unit: 'Bottles (100ml)',
      status: 'STOCK_OPTIMAL',
      expiryBatch: 'BATCH-2028-AR1',
    },
  ]);

  const handleDispenseBottle = (id: string) => {
    setStock((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, stockLevel: Math.max(0, s.stockLevel - 1) } : s
      )
    );
    setDispensedCount((prev) => prev + 1);
  };

  const handleScanBarcodeQr = () => {
    setIsScanningQr(true);
    setTimeout(() => {
      setIsScanningQr(false);
      handleDispenseBottle('STK-01');
    }, 600);
  };

  const filteredStock = stock.filter(
    (s) =>
      s.remedyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase())
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
          <FlaskConical className="w-5 h-5 text-emerald-600" />
          <div>
            <h2 className="font-bold text-xs uppercase tracking-wider">
              Classical Homeopathic Pharmacy & Liquid LM Potency Dispensary
            </h2>
            <p className="text-[10px] text-gray-500 font-mono">
              Hahnemannian LM Liquid Dilution Control, Stock Audit & Barcode QR Dispatch
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-xl">
            TODAY DISPENSED: {dispensedCount} BOTTLES
          </span>

          <button
            onClick={handleScanBarcodeQr}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-2 shadow-sm transition-all cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>{isScanningQr ? 'Scanning Barcode...' : 'Scan Prescription Barcode QR'}</span>
          </button>
        </div>
      </div>

      {/* SEARCH & FILTERS TOOLBAR */}
      <div
        className={`px-4 py-2.5 border-b flex flex-wrap items-center justify-between gap-3 ${
          isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-[#090A0C] border-[#1C1F26]'
        }`}
      >
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search remedy by name or classical code (Bell, Chel, Sulph)..."
            className={`w-full rounded-xl pl-9 pr-4 py-1.5 text-xs font-mono focus:outline-none ${
              isLight
                ? 'bg-white border border-slate-300 text-slate-900 focus:border-emerald-600'
                : 'bg-[#111317] border border-[#1C1F26] text-white focus:border-emerald-500'
            }`}
          />
        </div>

        <div className="flex items-center space-x-2 text-[11px] font-mono">
          <span className="text-gray-500">LM Liquid Dispensing Standard:</span>
          <span className="font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg">
            10 Successions per Sip Bottle
          </span>
        </div>
      </div>

      {/* DISPENSARY INVENTORY TABLE */}
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
                <th className="px-4 py-2.5">REMEDY CODE & NAME</th>
                <th className="px-4 py-2.5">POTENCY SCALE & VEHICLE</th>
                <th className="px-4 py-2.5">AVAILABLE STOCK LEVEL</th>
                <th className="px-4 py-2.5">BATCH & EXPIRY</th>
                <th className="px-4 py-2.5">STOCK STATUS</th>
                <th className="px-4 py-2.5 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                isLight ? 'divide-slate-200' : 'divide-[#1C1F26]'
              }`}
            >
              {filteredStock.map((s) => (
                <tr
                  key={s.id}
                  className={`transition-colors ${
                    isLight ? 'hover:bg-slate-50' : 'hover:bg-[#1C1F26]/50'
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className="font-black text-emerald-600 text-xs block">
                      {s.code}
                    </span>
                    <span className="font-bold text-slate-800 text-xs">
                      {s.remedyName}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-bold block">{s.potencyScale}</span>
                    <span className="text-[10px] text-gray-500">
                      {s.vehicle}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-black text-sm">
                    {s.stockLevel} <span className="text-xs font-normal text-gray-500">{s.unit}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {s.expiryBatch}
                  </td>
                  <td className="px-4 py-3">
                    {s.status === 'STOCK_OPTIMAL' ? (
                      <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                        STOCK OPTIMAL
                      </span>
                    ) : (
                      <span className="bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                        REORDER NEEDED
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDispenseBottle(s.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      Dispense 1 Unit
                    </button>
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

export default PharmacyDispensaryView;

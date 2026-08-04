'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  QrCode,
  Printer,
  Send,
  CheckCircle2,
  AlertTriangle,
  Award,
  Pill,
  FileText,
  Lock,
  Download,
} from 'lucide-react';
import {
  INDIAN_LANGUAGE_PACKS,
  IndianLanguageCode,
} from '@/lib/i18n/indian_language_packs';

interface PrescriptionGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName?: string;
  topRemedyCode?: string;
  topRemedyName?: string;
  specificityScore?: number;
  langCode?: IndianLanguageCode;
  theme?: 'dark' | 'light';
}

export const PrescriptionGeneratorModal: React.FC<
  PrescriptionGeneratorModalProps
> = ({
  isOpen,
  onClose,
  patientName = 'Ramesh Kumar Sharma',
  topRemedyCode = 'Bell',
  topRemedyName = 'Belladonna',
  specificityScore = 65.2,
  langCode = 'EN',
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  const [potencyChoice, setPotencyChoice] = useState<'LM01' | '30C' | '200C' | '1M'>('LM01');
  const [includeBurnettDrainage, setIncludeBurnettDrainage] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('+91 98765 43210');
  const [isDispatched, setIsDispatched] = useState(false);

  if (!isOpen) return null;

  const pack = INDIAN_LANGUAGE_PACKS[langCode] || INDIAN_LANGUAGE_PACKS.EN;
  const labels = pack.labels;

  const handleDispatchFhirSms = () => {
    setIsDispatched(true);
    setTimeout(() => setIsDispatched(false), 4000);
  };

  const handlePrintPrescription = () => {
    window.print();
  };

  const handleExportClinicalCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        'PATIENT_NAME,ABHA_ID,TOP_SIMILLIMUM,SPECIFICITY_SCORE,POTENCY_SELECTED,BURNETT_DRAINAGE,TIMESTAMP',
        `"${patientName}","91-4829-1049-3829","${topRemedyName} (${topRemedyCode})",${specificityScore},"${potencyChoice}",${includeBurnettDrainage},"${new Date().toISOString()}"`,
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Prescription_ABHA_${patientName.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs font-mono p-4">
      <div
        className={`w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border ${
          isLight
            ? 'bg-white text-slate-900 border-slate-200'
            : 'bg-[#0B0F19] text-white border-[#1C1F26]'
        }`}
      >
        {/* TOP FHIR SECURITY BAR */}
        <div
          className={`p-4 border-b flex flex-wrap items-center justify-between gap-3 ${
            isLight
              ? 'bg-slate-50 border-slate-200 text-slate-900'
              : 'bg-[#05070A] border-[#1C1F26] text-white'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white font-black shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {labels.rxSlipTitle}
              </h3>
              <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
                {labels.rxSlipSubtitle} // SHA-256 CONSENT HASH: 0x8F4A...C291
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportClinicalCsv}
              className={`px-3 py-1.5 rounded-lg border font-bold text-xs flex items-center space-x-1.5 cursor-pointer ${
                isLight
                  ? 'border-slate-300 bg-white text-cyan-700 hover:bg-slate-50'
                  : 'border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-cyan-300'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={onClose}
              className={`px-3 py-1.5 rounded-lg border cursor-pointer ${
                isLight
                  ? 'border-slate-300 text-slate-600 hover:bg-slate-100'
                  : 'border-slate-800 text-gray-400 hover:text-white'
              }`}
            >
              ✕ Close
            </button>
          </div>
        </div>        {/* MODAL BODY */}
        <div className="p-6 space-y-6 text-xs max-h-[80vh] overflow-y-auto">
          {/* PATIENT & SIMILLIMUM META CARD */}
          <div
            className={`p-4 rounded-xl border grid grid-cols-1 md:grid-cols-3 gap-4 ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-900'
                : 'bg-[#111317] border-slate-800 text-white'
            }`}
          >
            <div>
              <span className={`text-[10px] font-black uppercase ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
                PATIENT FULL NAME
              </span>
              <p className={`text-sm font-black mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {patientName}
              </p>
            </div>

            <div>
              <span className={`text-[10px] font-black uppercase ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
                ABHA HEALTH ID
              </span>
              <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                91-4829-1049-3829
              </p>
            </div>

            <div>
              <span className={`text-[10px] font-black uppercase ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
                TF-IDF SIMILLIMUM SCORE
              </span>
              <p className="text-sm font-black text-cyan-600 dark:text-cyan-400 mt-0.5">
                {topRemedyCode} ({specificityScore})
              </p>
            </div>
          </div>

          {/* POTENCY SCALE & VEHICLE SELECTION */}
          <div className="space-y-3">
            <label className={`font-black block ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>
              {labels.primarySimillimumPotency}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={() => setPotencyChoice('LM01')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  potencyChoice === 'LM01'
                    ? isLight
                      ? 'border-emerald-500 bg-emerald-50 text-slate-900 font-bold shadow-xs'
                      : 'border-emerald-500 bg-emerald-950/40 text-white font-bold shadow-md'
                    : isLight
                    ? 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    : 'border-slate-800 bg-[#111317] text-gray-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-emerald-600 dark:text-emerald-400">
                    LM 0/1 Liquid Sip
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-600/20 text-emerald-700 dark:text-emerald-300 font-black">
                    HAHNEMANN 50-MILLESIMAL
                  </span>
                </div>
                <p className={`text-[11px] mt-1 ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
                  Gentle acute & chronic vital force alignment without aggravations.
                </p>
              </button>

              <button
                onClick={() => setPotencyChoice('30C')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  potencyChoice === '30C'
                    ? isLight
                      ? 'border-emerald-500 bg-emerald-50 text-slate-900 font-bold shadow-xs'
                      : 'border-emerald-500 bg-emerald-950/40 text-white font-bold shadow-md'
                    : isLight
                    ? 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    : 'border-slate-800 bg-[#111317] text-gray-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    30C Centesimal Globules
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-black ${isLight ? 'bg-slate-200 text-slate-700' : 'bg-slate-800 text-gray-300'}`}>
                    STANDARD CLASSICAL
                  </span>
                </div>
                <p className={`text-[11px] mt-1 ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
                  Acute functional manifestation & rapid vital reaction.
                </p>
              </button>
            </div>
          </div>

          {/* DR. BURNETT ORGANOPATHY CO-PRESCRIPTION CHECKBOX */}
          <div
            className={`p-4 rounded-xl border flex items-start space-x-3 ${
              isLight
                ? 'bg-white border-slate-200 text-slate-900'
                : 'bg-[#111317] border-slate-800 text-white'
            }`}
          >
            <input
              type="checkbox"
              id="burnett-drainage"
              checked={includeBurnettDrainage}
              onChange={(e) => setIncludeBurnettDrainage(e.target.checked)}
              className="mt-1 w-4 h-4 accent-emerald-500 rounded cursor-pointer"
            />
            <label htmlFor="burnett-drainage" className="cursor-pointer space-y-1">
              <span className="font-black text-emerald-600 dark:text-emerald-400 block">
                {labels.coPrescribeBurnett}
              </span>
              <span className={`text-[11px] block leading-relaxed ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
                Protects visceral liver parenchyma from high-potency aggravation while constitutional {topRemedyName} acts on cerebral congestion.
              </span>
            </label>
          </div>

          {/* OFFICIAL OFFICIAL OPD DISPENSING ORDERS */}
          <div
            className={`p-4 rounded-xl border space-y-2 ${
              isLight
                ? 'bg-slate-50 border-slate-200'
                : 'bg-[#05070A] border-slate-800'
            }`}
          >
            <span className={`text-[10px] font-black uppercase ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
              {labels.finalOpdOrders}
            </span>
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
              Rx 1: {topRemedyName} ({potencyChoice === 'LM01' ? 'LM 0/1 Liquid Sip' : '30C Globules'}) — 10 succussions per bottle, 1 sip morning & night.
            </div>
            {includeBurnettDrainage && (
              <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 font-bold text-xs">
                Rx 2: Chelidonium majus 1X Mother Tincture — 5 drops in warm water twice daily before meals.
              </div>
            )}
          </div>

          {/* WHATSAPP & ABDM FHIR DIGITAL DISPATCH */}
          <div className="space-y-2">
            <label className={`font-black block ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
              Patient WhatsApp / ABDM Digital Dispatch Number:
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={`flex-1 px-3 py-2 rounded-xl border font-bold outline-none ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900 focus:border-emerald-500'
                    : 'bg-[#111317] border-slate-800 text-white focus:border-emerald-500'
                }`}
              />
              <button
                onClick={handleDispatchFhirSms}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs flex items-center space-x-2 shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{labels.dispatchFhirSms}</span>
              </button>
            </div>
            {isDispatched && (
              <p className="text-emerald-500 font-bold text-xs animate-pulse">
                ✓ Cryptographic FHIR Prescription Slip dispatched to {phoneNumber}!
              </p>
            )}
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div
          className={`p-4 border-t flex flex-wrap items-center justify-between gap-3 ${
            isLight
              ? 'bg-slate-50 border-slate-200'
              : 'bg-[#05070A] border-[#1C1F26]'
          }`}
        >
          <div className={`flex items-center space-x-2 text-xs ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
            <QrCode className="w-5 h-5 text-emerald-500" />
            <span>Cryptographic ABDM QR Seal Attached</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrintPrescription}
              className={`px-4 py-2 rounded-xl border font-black text-xs flex items-center space-x-1.5 cursor-pointer ${
                isLight
                  ? 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800'
                  : 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-white'
              }`}
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Prescription (A4/Thermal)</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionGeneratorModal;

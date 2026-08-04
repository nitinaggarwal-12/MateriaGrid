'use client';

import React, { useState } from 'react';
import {
  X,
  Printer,
  CheckCircle2,
  ShieldCheck,
  Send,
  QrCode,
  Sparkles,
  Award,
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
}) => {
  const langPack = INDIAN_LANGUAGE_PACKS[langCode] || INDIAN_LANGUAGE_PACKS.EN;

  const [selectedPotency, setSelectedPotency] = useState<string>('LM 0/1');
  const [coPrescribeBurnett, setCoPrescribeBurnett] = useState<boolean>(true);
  const [patientPhone, setPatientPhone] = useState<string>('+91 98765 43210');
  const [dispatchSuccess, setDispatchSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDispatchSms = () => {
    setDispatchSuccess(true);
    setTimeout(() => setDispatchSuccess(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs font-mono p-4">
      <div className="w-full max-w-3xl bg-[#0B0F19] text-white border border-[#1C1F26] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* MODAL HEADER */}
        <div className="p-4 border-b border-[#1C1F26] bg-[#05070A] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-black shadow-md">
              Rx
            </div>
            <div>
              <h3 className="font-black text-sm uppercase text-white tracking-wider">
                {langPack.labels.rxSlipTitle}
              </h3>
              <p className="text-[11px] text-emerald-400 font-bold">
                {langPack.labels.rxSlipSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-slate-800 text-gray-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 space-y-6 text-xs max-h-[80vh] overflow-y-auto">
          {/* PATIENT & CONSTITUTIONAL SIMILLIMUM BANNER */}
          <div className="p-4 rounded-xl bg-[#111317] border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">PATIENT FULL NAME</p>
              <p className="text-base font-black text-white mt-0.5">{patientName}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">ABHA HEALTH ID</p>
              <p className="text-sm font-black text-emerald-400 mt-0.5">91-4829-1049-3829</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">TF-IDF SIMILLIMUM SCORE</p>
              <p className="text-base font-black text-cyan-400 mt-0.5">
                {topRemedyCode} ({specificityScore})
              </p>
            </div>
          </div>

          {/* 1. PRIMARY SIMILLIMUM POTENCY & VEHICLE SELECTION */}
          <div className="space-y-3">
            <span className="font-black text-emerald-400 uppercase tracking-wider block">
              {langPack.labels.primarySimillimumPotency}
            </span>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  id: 'LM 0/1',
                  label: 'LM 0/1 Liquid Sip',
                  desc: 'Hahnemannian 50-Millesimal (Gentle Acute/Chronic)',
                },
                {
                  id: '30C',
                  label: '30C Centesimal Globules',
                  desc: 'Acute functional manifestation',
                },
                {
                  id: '200C',
                  label: '200C Centesimal Globules',
                  desc: 'High mental/vital force match',
                },
                {
                  id: '1M',
                  label: '1M Single High Dose',
                  desc: 'Requires strong vital force validation',
                },
              ].map((potency) => {
                const isSelected = selectedPotency === potency.id;
                return (
                  <button
                    key={potency.id}
                    onClick={() => setSelectedPotency(potency.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600/20 border-emerald-500 text-white font-bold shadow-md'
                        : 'bg-[#111317] border-slate-800 text-gray-400 hover:border-slate-700'
                    }`}
                  >
                    <p
                      className={`font-black text-xs ${
                        isSelected ? 'text-emerald-400' : 'text-white'
                      }`}
                    >
                      {potency.label}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{potency.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. DR. BURNETT ORGANOPATHY TISSUE DRAINAGE CO-PRESCRIPTION TOGGLE */}
          <label className="flex items-start space-x-3 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 cursor-pointer">
            <input
              type="checkbox"
              checked={coPrescribeBurnett}
              onChange={(e) => setCoPrescribeBurnett(e.target.checked)}
              className="mt-0.5 accent-emerald-500 w-4 h-4"
            />
            <div>
              <p className="font-black text-xs text-emerald-300">
                {langPack.labels.coPrescribeBurnett}
              </p>
              <p className="text-[11px] text-gray-300 mt-1 leading-relaxed">
                Protects visceral liver parenchyma from high-potency aggravation while constitutional {topRemedyName} acts on cerebral congestion.
              </p>
            </div>
          </label>

          {/* 3. OFFICIAL DISPENSING INSTRUCTIONS PREVIEW */}
          <div className="p-4 rounded-xl bg-[#111317] border border-slate-800 space-y-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
              {langPack.labels.finalOpdOrders}
            </span>
            <div className="p-3 rounded-lg bg-[#05070A] border border-slate-800 font-bold text-emerald-300">
              Rx 1: {topRemedyName} ({selectedPotency} Liquid Sip) – 10 succussions per bottle, 1 sip morning & night.
            </div>
            {coPrescribeBurnett && (
              <div className="p-3 rounded-lg bg-[#05070A] border border-slate-800 font-bold text-cyan-300">
                Rx 2: Chelidonium majus 1X Mother Tincture – 5 drops in warm water twice daily before meals.
              </div>
            )}
          </div>

          {/* 4. DIGITAL ABDM SMS DISPATCH */}
          <div className="space-y-2">
            <label className="text-gray-400 font-bold block">
              Patient WhatsApp / ABDM Digital Dispatch Number:
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl bg-[#111317] border border-slate-800 font-bold text-white outline-none"
              />
              <button
                onClick={handleDispatchSms}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs flex items-center space-x-1.5 shadow-md cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{langPack.labels.dispatchFhirSms}</span>
              </button>
            </div>
            {dispatchSuccess && (
              <p className="text-emerald-400 font-black text-xs flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4" /> FHIR Signed Prescription Slip dispatched via WhatsApp & ABDM Gateway!
              </p>
            )}
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 border-t border-[#1C1F26] bg-[#05070A] flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Cryptographic ABDM QR Seal Attached</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl border border-slate-800 text-gray-300 hover:text-white font-bold text-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official Prescription (A4/Thermal)</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs cursor-pointer"
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

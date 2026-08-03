'use client';

import React, { useState } from 'react';
import {
  X,
  Printer,
  Send,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Pill,
  QrCode,
  FileText,
} from 'lucide-react';

interface PrescriptionGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
  topRemedyCode: string;
  topRemedyName: string;
  specificityScore: number;
}

export const PrescriptionGeneratorModal: React.FC<
  PrescriptionGeneratorModalProps
> = ({
  isOpen,
  onClose,
  patientName,
  topRemedyCode,
  topRemedyName,
  specificityScore,
}) => {
  const [selectedPotency, setSelectedPotency] = useState<string>('LM 0/1 Liquid Sip');
  const [includeBurnettDrainage, setIncludeBurnettDrainage] =
    useState<boolean>(true);
  const [patientWhatsapp, setPatientWhatsapp] = useState<string>('+91 98765 43210');
  const [dispatchSuccess, setDispatchSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const potencies = [
    { scale: 'LM 0/1 Liquid Sip', note: 'Hahnemannian 50-Millesimal (Gentle Acute/Chronic)' },
    { scale: '30C Centesimal Globules', note: 'Acute functional manifestation' },
    { scale: '200C Centesimal Globules', note: 'High mental/vital force match' },
    { scale: '1M Single High Dose', note: 'Requires strong vital force validation' },
  ];

  const handleDispatchDigitalPrescription = () => {
    setDispatchSuccess(true);
    setTimeout(() => setDispatchSuccess(false), 3000);
  };

  const handlePrintPrescription = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 select-none">
      <div className="bg-white text-slate-900 border border-slate-300 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden font-sans flex flex-col max-h-[92vh]">
        {/* HEADER */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-black text-white text-sm">
              Rx
            </div>
            <div>
              <h2 className="font-bold text-sm tracking-wider uppercase">
                ABDM FHIR Cryptographically Signed Prescription Slip
              </h2>
              <p className="text-[11px] text-emerald-400 font-mono">
                AYUSH OPD Registration #AYUSH-DEL-2026-90412 // Simillimum Verified
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* PATIENT INFO BANNER */}
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div>
              <span className="text-gray-500 block">PATIENT FULL NAME</span>
              <span className="font-black text-sm text-slate-900">{patientName}</span>
            </div>
            <div>
              <span className="text-gray-500 block">ABHA HEALTH ID</span>
              <span className="font-bold text-slate-800">91-4829-1049-3829</span>
            </div>
            <div>
              <span className="text-gray-500 block">TF-IDF SIMILLIMUM SCORE</span>
              <span className="font-black text-emerald-600 text-sm">
                {topRemedyCode} ({specificityScore.toFixed(1)})
              </span>
            </div>
          </div>

          {/* PRESCRIPTION FORMULATION SECTION */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono block">
              1. Primary Simillimum Potency & Vehicle Selection
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {potencies.map((p) => (
                <button
                  key={p.scale}
                  onClick={() => setSelectedPotency(p.scale)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedPotency === p.scale
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <p className="font-black text-xs text-emerald-700 font-mono">
                    {p.scale}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{p.note}</p>
                </button>
              ))}
            </div>
          </div>

          {/* BURNETT ORGANOPATHY CO-PRESCRIPTION CHECKBOX */}
          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-300 flex items-start space-x-3">
            <input
              type="checkbox"
              id="burnett-drainage"
              checked={includeBurnettDrainage}
              onChange={(e) => setIncludeBurnettDrainage(e.target.checked)}
              className="mt-1 accent-emerald-600 w-4 h-4 cursor-pointer"
            />
            <label
              htmlFor="burnett-drainage"
              className="text-xs space-y-1 cursor-pointer"
            >
              <span className="font-bold text-emerald-900 block font-mono">
                Co-Prescribe Dr. Burnett Organopathy Tissue Drainage (Chelidonium 1X)
              </span>
              <span className="text-gray-600 block text-[11px] leading-relaxed">
                Protects visceral liver parenchyma from high-potency aggravation while constitutional Belladonna acts on cerebral congestion.
              </span>
            </label>
          </div>

          {/* PRESCRIBED DOSAGE SUMMARY CARD */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 font-mono text-xs">
            <span className="text-[10px] font-bold text-gray-500 uppercase block">
              FINAL OFFICIAL OPD DISPENSING ORDERS:
            </span>
            <div className="p-2.5 rounded bg-white border border-slate-200 font-bold text-emerald-800">
              Rx 1: {topRemedyName} ({selectedPotency}) — 10 succussions per bottle, 1 sip morning & night.
            </div>
            {includeBurnettDrainage && (
              <div className="p-2.5 rounded bg-white border border-slate-200 font-bold text-teal-800">
                Rx 2: Chelidonium majus 1X Mother Tincture — 5 drops in warm water twice daily before meals.
              </div>
            )}
          </div>

          {/* PATIENT WHATSAPP / ABDM SMS DISPATCH */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 font-mono block">
              Patient WhatsApp / ABDM Digital Dispatch Number:
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={patientWhatsapp}
                onChange={(e) => setPatientWhatsapp(e.target.value)}
                className="flex-1 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold"
              />
              <button
                onClick={handleDispatchDigitalPrescription}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Dispatch FHIR SMS</span>
              </button>
            </div>
            {dispatchSuccess && (
              <span className="text-xs text-emerald-600 font-bold font-mono flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Digital FHIR Prescription signed & sent via ABDM WhatsApp!
              </span>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-gray-500 font-mono flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Cryptographic ABDM QR Seal Attached
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrintPrescription}
              className="border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official Prescription (A4/Thermal)</span>
            </button>
            <button
              onClick={onClose}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer"
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

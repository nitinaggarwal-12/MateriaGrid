'use client';

import React, { useState } from 'react';
import {
  Users,
  Clock,
  PhoneCall,
  Video,
  Plus,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  UserPlus,
} from 'lucide-react';

interface OpdQueueManagerViewProps {
  theme?: 'dark' | 'light';
}

interface QueuePatient {
  token: string;
  name: string;
  abhaId: string;
  type: 'IN_PERSON_OPD' | 'UHI_TELEHEALTH_RTC';
  chiefComplaint: string;
  waitTime: string;
  status: 'IN_CONSULTATION' | 'WAITING' | 'TRIAGED';
}

export const OpdQueueManagerView: React.FC<OpdQueueManagerViewProps> = ({
  theme = 'light',
}) => {
  const isLight = theme === 'light';

  const [queue, setQueue] = useState<QueuePatient[]>([
    {
      token: 'OPD-101',
      name: 'Ramesh Kumar Sharma',
      abhaId: '91-4829-1049-3829',
      type: 'IN_PERSON_OPD',
      chiefComplaint: 'Liver Cirrhosis & Scapula Pain (Chelidonium)',
      waitTime: '0 min (Active)',
      status: 'IN_CONSULTATION',
    },
    {
      token: 'OPD-102',
      name: 'Ananya Verma',
      abhaId: '91-8821-4402-9912',
      type: 'UHI_TELEHEALTH_RTC',
      chiefComplaint: 'Throbbing Sun Migraine & Business Talks',
      waitTime: '6 min',
      status: 'TRIAGED',
    },
    {
      token: 'OPD-103',
      name: 'Vikramaditya Rao',
      abhaId: '91-1029-5511-7788',
      type: 'UHI_TELEHEALTH_RTC',
      chiefComplaint: 'Chronic Synovitis Knee & Worse Beginning Motion',
      waitTime: '12 min',
      status: 'WAITING',
    },
    {
      token: 'OPD-104',
      name: 'Meenakshi Iyer',
      abhaId: '91-7712-4409-1120',
      type: 'IN_PERSON_OPD',
      chiefComplaint: 'Acute Gastroenteritis & Burning Unquenchable Thirst',
      waitTime: '18 min',
      status: 'WAITING',
    },
    {
      token: 'OPD-105',
      name: 'Siddharth Deshmukh',
      abhaId: '91-5512-8802-3311',
      type: 'UHI_TELEHEALTH_RTC',
      chiefComplaint: 'Asthmatic Dyspnea Ameliorated Knee-Chest Position',
      waitTime: '25 min',
      status: 'WAITING',
    },
    {
      token: 'OPD-106',
      name: 'Priyanka Banerjee',
      abhaId: '91-9921-3344-7712',
      type: 'IN_PERSON_OPD',
      chiefComplaint: 'Left-Sided Ovaritis & Ameliorated Cold Application',
      waitTime: '32 min',
      status: 'WAITING',
    },
    {
      token: 'OPD-107',
      name: 'Gurpreet Singh',
      abhaId: '91-6621-1102-4490',
      type: 'IN_PERSON_OPD',
      chiefComplaint: 'Eczema Scaly Fissured & Worse Winter Cold',
      waitTime: '39 min',
      status: 'WAITING',
    },
    {
      token: 'OPD-108',
      name: 'Kavita Patel',
      abhaId: '91-4412-7709-8812',
      type: 'UHI_TELEHEALTH_RTC',
      chiefComplaint: 'Pulsating Neuralgic Facial Pain & Sudden Aggravation',
      waitTime: '44 min',
      status: 'WAITING',
    },
  ]);

  const [uhiSlots, setUhiSlots] = useState([
    { time: '10:00 AM - 10:15 AM', patient: 'Ananya Verma (ABHA verified)', status: 'BOOKED_UHI' },
    { time: '10:15 AM - 10:30 AM', patient: 'Vikramaditya Rao (ABHA verified)', status: 'BOOKED_UHI' },
    { time: '10:30 AM - 10:45 AM', patient: 'Siddharth Deshmukh', status: 'BOOKED_UHI' },
    { time: '10:45 AM - 11:00 AM', patient: 'Kavita Patel', status: 'BOOKED_UHI' },
    { time: '11:00 AM - 11:15 AM', patient: 'Available UHI Video Slot', status: 'OPEN_SLOT' },
    { time: '11:15 AM - 11:30 AM', patient: 'Available UHI Video Slot', status: 'OPEN_SLOT' },
  ]);

  const handleCallToken = (token: string) => {
    setQueue((prev) =>
      prev.map((q) =>
        q.token === token
          ? { ...q, status: 'IN_CONSULTATION', waitTime: '0 min (Active)' }
          : q
      )
    );
  };

  const handleAddWalkInPatient = () => {
    const nextTokenNum = 101 + queue.length;
    const newPatient: QueuePatient = {
      token: `OPD-${nextTokenNum}`,
      name: `New Walk-In Patient #${nextTokenNum}`,
      abhaId: `91-0000-${nextTokenNum}-0000`,
      type: 'IN_PERSON_OPD',
      chiefComplaint: 'Acute Consultation Walk-In',
      waitTime: 'Just Checked In',
      status: 'WAITING',
    };
    setQueue((prev) => [...prev, newPatient]);
  };

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
              Corporate OPD Waiting Queue & UHI Appointment Manager
            </h2>
            <p className="text-[10px] text-gray-500 font-mono">
              Unified Health Interface (UHI) Live Consultation Token Dispatch & Digital Queue
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs">
          <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-xl font-bold">
            LIVE OPD TRIAGE ACTIVE ({queue.length} PATIENTS IN QUEUE)
          </span>

          <button
            onClick={handleAddWalkInPatient}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Check-In Walk-In OPD Patient</span>
          </button>
        </div>
      </div>

      {/* SPLIT COCKPIT WORKBENCH */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 overflow-y-auto font-mono text-xs">
        {/* LEFT COLUMN: LIVE OPD PATIENT QUEUE (8 COLUMNS) */}
        <div className="lg:col-span-7 flex flex-col space-y-3">
          <div
            className={`border rounded-xl overflow-hidden flex flex-col flex-1 ${
              isLight ? 'bg-white border-slate-200 shadow-2xs' : 'bg-[#111317] border-[#1C1F26]'
            }`}
          >
            <div className="p-3 border-b flex items-center justify-between">
              <span className="font-bold text-xs uppercase text-emerald-600 tracking-wider">
                LIVE PATIENT TOKEN QUEUE ({queue.length} REGISTERED)
              </span>
              <span className="text-[10px] text-gray-500">
                Sorted by Wait Time & Triage Priority
              </span>
            </div>

            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-left">
                <thead
                  className={`border-b text-[11px] sticky top-0 z-10 ${
                    isLight
                      ? 'bg-slate-100 border-slate-200 text-slate-700'
                      : 'bg-[#090A0C] border-[#1C1F26] text-gray-400'
                  }`}
                >
                  <tr>
                    <th className="px-3.5 py-2.5">OPD TOKEN</th>
                    <th className="px-3.5 py-2.5">PATIENT NAME & ABHA ID</th>
                    <th className="px-3.5 py-2.5">CHIEF COMPLAINT</th>
                    <th className="px-3.5 py-2.5">CONSULTATION MODE</th>
                    <th className="px-3.5 py-2.5">STATUS</th>
                    <th className="px-3.5 py-2.5 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y ${
                    isLight ? 'divide-slate-200' : 'divide-[#1C1F26]'
                  }`}
                >
                  {queue.map((q) => (
                    <tr
                      key={q.token}
                      className={`transition-colors ${
                        isLight ? 'hover:bg-slate-50' : 'hover:bg-[#1C1F26]/50'
                      }`}
                    >
                      <td className="px-3.5 py-3 font-black text-emerald-600 text-xs">
                        {q.token}
                      </td>
                      <td className="px-3.5 py-3">
                        <span className="font-bold text-slate-900 block text-xs">
                          {q.name}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          {q.abhaId}
                        </span>
                      </td>
                      <td className="px-3.5 py-3 text-xs">{q.chiefComplaint}</td>
                      <td className="px-3.5 py-3">
                        {q.type === 'IN_PERSON_OPD' ? (
                          <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded text-[10px] font-bold">
                            PHYSICAL OPD
                          </span>
                        ) : (
                          <span className="bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 w-fit">
                            <Video className="w-3 h-3" /> UHI TELEHEALTH
                          </span>
                        )}
                      </td>
                      <td className="px-3.5 py-3">
                        {q.status === 'IN_CONSULTATION' ? (
                          <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full text-[10px] font-bold">
                            ACTIVE CONSULTATION
                          </span>
                        ) : q.status === 'TRIAGED' ? (
                          <span className="bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full text-[10px] font-bold">
                            NEXT IN LINE
                          </span>
                        ) : (
                          <span className="bg-slate-100 text-slate-700 border border-slate-300 px-2 py-0.5 rounded-full text-[10px] font-bold">
                            WAITING ROOM
                          </span>
                        )}
                      </td>
                      <td className="px-3.5 py-3 text-right">
                        <button
                          onClick={() => handleCallToken(q.token)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1 rounded-lg text-[11px] transition-colors cursor-pointer"
                        >
                          Call Token
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: UHI UNIFIED HEALTH INTERFACE VIDEO SLOT SCHEDULER (5 COLUMNS) */}
        <div className="lg:col-span-5 flex flex-col space-y-3">
          <div
            className={`border rounded-xl p-4 space-y-4 ${
              isLight
                ? 'bg-white border-slate-200 shadow-2xs'
                : 'bg-[#111317] border-[#1C1F26]'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-2.5 border-slate-200">
              <span className="font-bold text-xs uppercase text-purple-600 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> UHI Telehealth Video Slot Scheduler
              </span>
              <span className="text-[10px] bg-purple-100 text-purple-800 border border-purple-300 px-2 py-0.5 rounded font-bold">
                NHA UHI v1.2
              </span>
            </div>

            <div className="space-y-2">
              {uhiSlots.map((slot, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border flex items-center justify-between ${
                    slot.status === 'BOOKED_UHI'
                      ? isLight
                        ? 'bg-purple-50/50 border-purple-200'
                        : 'bg-purple-950/30 border-purple-500/30'
                      : isLight
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-[#090A0C] border-[#1C1F26]'
                  }`}
                >
                  <div>
                    <span className="font-bold text-xs block text-slate-800">
                      {slot.time}
                    </span>
                    <span className="text-[11px] text-gray-500">
                      {slot.patient}
                    </span>
                  </div>

                  {slot.status === 'BOOKED_UHI' ? (
                    <span className="bg-purple-100 text-purple-800 border border-purple-300 px-2 py-0.5 rounded text-[10px] font-bold">
                      CONFIRMED UHI
                    </span>
                  ) : (
                    <button
                      onClick={() =>
                        alert(`Booked UHI Video Consultation slot for ${slot.time}`)
                      }
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1 rounded text-xs cursor-pointer"
                    >
                      + Book Slot
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpdQueueManagerView;

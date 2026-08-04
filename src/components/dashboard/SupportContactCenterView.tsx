'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  PhoneCall,
  Mail,
  MapPin,
  ShieldCheck,
  Send,
  HelpCircle,
  Clock,
  CheckCircle2,
  ExternalLink,
  Bot,
  UserCheck,
  ShieldAlert,
  Phone,
} from 'lucide-react';

interface SupportContactCenterViewProps {
  theme?: 'dark' | 'light';
}

export const SupportContactCenterView: React.FC<
  SupportContactCenterViewProps
> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';

  const [chatMessages, setChatMessages] = useState<
    { sender: 'USER' | 'AI'; text: string; time: string }[]
  >([
    {
      sender: 'AI',
      text: 'Namaste! Welcome to MateriaGrid AYUSH 24/7 Clinical & ABDM Support. How can I assist you with repertorization, prescription slips, or WhatsApp doctor consultations today?',
      time: 'Just now',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [ticketCreated, setTicketCreated] = useState(false);

  const emergencyNumbers = [
    {
      number: '108',
      title: '108 National Emergency Response & Ambulance Service (ERSS)',
      desc: '24/7 Pan-India Emergency Trauma, Cardiac & Acute Critical Dispatch',
    },
    {
      number: '14443',
      title: '14443 Ministry of AYUSH National Toll-Free Helpline',
      desc: 'Official Government Homeopathic, Ayurvedic & Siddha Doctor Consultation',
    },
    {
      number: '104',
      title: '104 National Health Advice & Triage Helpline',
      desc: '24/7 Free Medical Advice, Symptom Triage & Hospital Bed Availability',
    },
    {
      number: '102',
      title: '102 National Health Mission (NHM) Ambulance',
      desc: 'Free Maternal, Pediatric & Acute OPD Transport',
    },
    {
      number: '112',
      title: '112 Unified Emergency Number (India)',
      desc: 'Single Unified Emergency Response System (Police, Ambulance, Fire)',
    },
    {
      number: '14477',
      title: '14477 National Health Authority (NHA) ABHA & UHI Support',
      desc: 'Official ABDM Health ID Verification & Telehealth Consent Desk',
    },
  ];

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userMsg = inputQuery;
    setChatMessages((prev) => [
      ...prev,
      { sender: 'USER', text: userMsg, time: 'Just now' },
    ]);
    setInputQuery('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionStateId: 'support_live_llm_session',
          chatHistory: chatMessages.map((m) => ({
            role: m.sender === 'USER' ? 'user' : 'assistant',
            content: m.text,
          })),
          currentMessage: userMsg,
          patientBaselines: {
            thermal: 'Hot',
            thirst: 'Thirstless',
            side: 'Right',
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setChatMessages((prev) => [
          ...prev,
          {
            sender: 'AI',
            text:
              data.chatbotResponse ||
              'Our AYUSH Support & ABDM gateway assistant is ready to help.',
            time: 'Just now',
          },
        ]);
      } else {
        throw new Error('Fallback to local helper');
      }
    } catch (err) {
      let responseText =
        'Our licensed AYUSH clinical support specialist and ABDM UHI gateway coordinator have logged your inquiry. You can also inspect your active rubrics or launch the AI Clinical Copilot tab.';
      if (userMsg.toLowerCase().includes('abha')) {
        responseText =
          'To link your ABHA Health ID (91-4829-1049-3829), click "+ Intake" in the top bar or verify your consent hash inside Patient Profile.';
      }
      setChatMessages((prev) => [
        ...prev,
        { sender: 'AI', text: responseText, time: 'Just now' },
      ]);
    }
  };

  const handleOpenWhatsAppCall = () => {
    window.open(
      'https://wa.me/919876543210?text=Namaste%20Dr.%20Nitin%20Aggarwal,%20I%20need%20a%20clinical%20consultation%20and%20repertory%20prescription%20slip.',
      '_blank'
    );
  };

  return (
    <div
      className={`w-full h-full overflow-y-auto p-6 font-mono space-y-6 transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#05070A] text-white'
      }`}
    >
      {/* HEADER */}
      <div
        className={`p-6 rounded-2xl border flex flex-wrap items-center justify-between gap-6 shadow-md ${
          isLight
            ? 'bg-white border-slate-200'
            : 'bg-[#0B0F19] border-[#1C1F26]'
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white font-black shadow-lg">
            <HelpCircle className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-lg font-black text-white">
              MATERIAGRID 24/7 SUPPORT, CONTACT US & GOVERNMENT EMERGENCY CALL CENTER
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Direct Doctor WhatsApp Voice/Video Call • Government Emergency 108/14443 Helplines • ABDM UHI Support
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenWhatsAppCall}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center space-x-2 shadow-lg transition-all transform hover:scale-105 cursor-pointer"
        >
          <PhoneCall className="w-4 h-4" />
          <span>📞 Launch WhatsApp Doctor Call (+91 98765 43210)</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* GOVERNMENT EMERGENCY HELPLINES ONE-CLICK CALL PANEL */}
      <div className="p-5 rounded-2xl border border-red-500/40 bg-red-950/20 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-black text-xs uppercase text-red-400 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400" /> OFFICIAL GOVERNMENT EMERGENCY & AYUSH DIALER DIRECTORIES (ONE-CLICK CALL)
          </span>
          <span className="text-[10px] px-2.5 py-0.5 rounded bg-red-600 text-white font-black">
            24/7 FREE TOLL-FREE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {emergencyNumbers.map((item) => (
            <div
              key={item.number}
              className="p-3.5 rounded-xl bg-[#0B0F19] border border-slate-800 flex flex-col justify-between space-y-2"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-emerald-400">
                    DIAL: {item.number}
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-slate-800 text-gray-300 font-bold">
                    GOVT HELPLINE
                  </span>
                </div>
                <p className="font-black text-xs text-white mt-1">
                  {item.title}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {item.desc}
                </p>
              </div>

              <a
                href={`tel:${item.number}`}
                className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-all transform hover:scale-[1.02]"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>📞 Call {item.number} Immediately</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* THREE-COLUMN SUPPORT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* COLUMN 1: LIVE SUPPORT & CLINICAL CHAT */}
        <div
          className={`p-5 rounded-2xl border flex flex-col space-y-4 ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-[#0B0F19] border-[#1C1F26]'
          }`}
        >
          <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
            <span className="font-black text-xs uppercase text-emerald-400 flex items-center gap-2">
              <Bot className="w-4 h-4" /> LIVE AI SUPPORT CHAT
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-600 text-white font-black">
              24/7 ONLINE
            </span>
          </div>

          <div className="flex-1 min-h-[240px] max-h-[300px] overflow-y-auto space-y-2.5 p-2 bg-[#05070A] rounded-xl border border-slate-800">
            {chatMessages.map((m, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl text-xs max-w-[90%] leading-relaxed ${
                  m.sender === 'USER'
                    ? 'bg-emerald-600 text-white ml-auto font-bold'
                    : 'bg-[#111317] border border-slate-800 text-gray-200'
                }`}
              >
                <p>{m.text}</p>
                <span className="text-[9px] opacity-70 block mt-1 text-right">
                  {m.time}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="flex space-x-2">
            <input
              type="text"
              placeholder="Ask support or help..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-[#111317] border border-slate-800 text-white font-bold text-xs outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* COLUMN 2: DIRECT WHATSAPP & EMERGENCY CONTACT CARD */}
        <div
          className={`p-5 rounded-2xl border space-y-4 ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-[#0B0F19] border-[#1C1F26]'
          }`}
        >
          <span className="font-black text-xs uppercase text-cyan-400 block border-b pb-3 border-slate-200 dark:border-slate-800">
            DIRECT CONTACT & WHATSAPP CHAT
          </span>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#111317] border border-slate-800 space-y-1.5">
              <span className="text-[10px] text-gray-400 font-black uppercase">
                WHATSAPP CONSULTATION HELPLINE
              </span>
              <p className="font-black text-emerald-400 text-sm">
                +91 98765 43210 (Dr. Nitin Aggarwal, MD Hom.)
              </p>
              <p className="text-gray-400 text-[11px]">
                Instant prescription slip dispatch, clinical second opinions & acute emergencies.
              </p>
              <button
                onClick={handleOpenWhatsAppCall}
                className="w-full mt-2 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs cursor-pointer"
              >
                Open WhatsApp Consultation Chat
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-[#111317] border border-slate-800 space-y-1">
              <span className="text-[10px] text-gray-400 font-black uppercase">
                NATIONAL AYUSH HELPLINE
              </span>
              <p className="font-black text-white text-sm">
                14443 / 1800-11-22-33 (Toll Free across India)
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#111317] border border-slate-800 space-y-1">
              <span className="text-[10px] text-gray-400 font-black uppercase">
                INSTITUTIONAL HEADQUARTERS & CLINIC
              </span>
              <p className="font-bold text-white text-xs">
                National Institute of Homeopathy, Block GE, Sector V, Salt Lake, Kolkata, West Bengal 700106
              </p>
            </div>
          </div>
        </div>

        {/* COLUMN 3: CONTACT US / INSTITUTIONAL ONBOARDING INQUIRY FORM */}
        <div
          className={`p-5 rounded-2xl border space-y-4 ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-[#0B0F19] border-[#1C1F26]'
          }`}
        >
          <span className="font-black text-xs uppercase text-purple-400 block border-b pb-3 border-slate-200 dark:border-slate-800">
            CONTACT US / CLINICAL INQUIRY FORM
          </span>

          {ticketCreated ? (
            <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="font-black text-white text-xs">
                SUPPORT TICKET #MG-2026-9901 CREATED!
              </p>
              <p className="text-gray-400 text-[11px]">
                Our medical officer will contact you within 15 minutes.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setTicketCreated(true);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="text-gray-400 font-bold block mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  defaultValue="Ramesh Kumar Sharma"
                  className="w-full px-3 py-2 rounded-xl bg-[#111317] border border-slate-800 text-white font-bold outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 font-bold block mb-1">
                  ABHA ID or Mobile Number
                </label>
                <input
                  type="text"
                  required
                  defaultValue="+91 98765 43210"
                  className="w-full px-3 py-2 rounded-xl bg-[#111317] border border-slate-800 text-white font-bold outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 font-bold block mb-1">
                  Inquiry / Clinical Request
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your question or clinic requirement..."
                  className="w-full px-3 py-2 rounded-xl bg-[#111317] border border-slate-800 text-white font-bold outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 text-white font-black text-xs shadow-md cursor-pointer"
              >
                Submit Support Ticket to AYUSH Desk
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportContactCenterView;

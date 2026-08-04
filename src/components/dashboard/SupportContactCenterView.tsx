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

  const [isAiTyping, setIsAiTyping] = useState(false);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userMsg = inputQuery.trim();
    setChatMessages((prev) => [
      ...prev,
      { sender: 'USER', text: userMsg, time: 'Just now' },
    ]);
    setInputQuery('');
    setIsAiTyping(true);

    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      let responseText =
        'Namaste! Our AYUSH Clinical & ABDM Support desk is active. How can I assist you with SimiliMatrix repertorization, prescription slips, or ABHA health records?';

      if (
        lower === 'hi' ||
        lower === 'hello' ||
        lower === 'hey' ||
        lower === 'namaste'
      ) {
        responseText =
          'Namaste! Welcome to MateriaGrid 24/7 Clinical Support. I can help you navigate repertorization totalities, verify ABHA IDs, export digital prescriptions, or connect with Dr. Nitin Aggarwal on WhatsApp. What would you like to do?';
      } else if (lower.includes('abha') || lower.includes('id')) {
        responseText =
          'To verify or link a patient ABHA ID (e.g. 91-4829-1049-3829), click "+ Create Profile & ABDM Studio" in the left sidebar under Clinic Admin, or inspect active consents inside Patient Case Repository.';
      } else if (lower.includes('rubric') || lower.includes('repertory') || lower.includes('matrix')) {
        responseText =
          'SimiliMatrix currently features 68 classical Kent & Synthesis rubrics across all 33 chapters. You can filter by active chapters using the Chapter Multi-Select Dropdown or use the Gemini AI Clinical Copilot tab for Sehgal ROH mental rubric extraction.';
      } else if (lower.includes('whatsapp') || lower.includes('call') || lower.includes('doctor')) {
        responseText =
          'You can initiate a direct WhatsApp Voice/Video consultation with Dr. Nitin Aggarwal (MD Hom.) by clicking the green "Launch WhatsApp Doctor Call" button in the top banner (+91 98765 43210).';
      } else if (lower.includes('prescription') || lower.includes('rx')) {
        responseText =
          'To generate an ABDM-compliant digital prescription slip for the top simillimum (e.g. Belladonna 200C), open the "⚡ Clinical Actions" dropdown in the top-right corner and select "Top Simillimum Rx".';
      } else {
        responseText = `Thank you for your message regarding "${userMsg}". Our AYUSH clinical coordinator has logged this inquiry under session #MG-2026. You can also reach our 24/7 National AYUSH Helpline at 14443.`;
      }

      setChatMessages((prev) => [
        ...prev,
        { sender: 'AI', text: responseText, time: 'Just now' },
      ]);
      setIsAiTyping(false);
    }, 450);
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
            <h1
              className={`text-lg font-black ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              MATERIAGRID 24/7 SUPPORT, CONTACT US & GOVERNMENT EMERGENCY CALL CENTER
            </h1>
            <p
              className={`text-xs mt-0.5 ${
                isLight ? 'text-slate-600' : 'text-gray-400'
              }`}
            >
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

      {/* GOVERNMENT EMERGENCY HELPLINES & LIVE AI CHATBOX TOP ROW */}
      <div
        className={`p-5 rounded-2xl border space-y-4 ${
          isLight
            ? 'bg-red-50/70 border-red-200'
            : 'bg-red-950/20 border-red-500/40'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-black text-xs uppercase text-red-600 dark:text-red-400 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-500" /> OFFICIAL GOVERNMENT EMERGENCY & AYUSH DIALER DIRECTORIES + LIVE AI SUPPORT CHAT
          </span>
          <span className="text-[10px] px-2.5 py-0.5 rounded bg-red-600 text-white font-black">
            24/7 FREE TOLL-FREE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* CARD 1: DIAL 108 */}
          {emergencyNumbers.slice(0, 2).map((item) => (
            <div
              key={item.number}
              className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 ${
                isLight
                  ? 'bg-white border-slate-200 shadow-xs'
                  : 'bg-[#0B0F19] border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                    DIAL: {item.number}
                  </span>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded font-bold ${
                      isLight
                        ? 'bg-slate-100 text-slate-700'
                        : 'bg-slate-800 text-gray-300'
                    }`}
                  >
                    GOVT HELPLINE
                  </span>
                </div>
                <p
                  className={`font-black text-xs mt-1 ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {item.title}
                </p>
                <p
                  className={`text-[11px] mt-0.5 ${
                    isLight ? 'text-slate-600' : 'text-gray-400'
                  }`}
                >
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

          {/* CARD 3 (3RD CARD ON TOP ROW): LIVE AI SUPPORT CHATBOX */}
          <div
            className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 lg:row-span-2 ${
              isLight
                ? 'bg-white border-slate-200 shadow-xs'
                : 'bg-[#0B0F19] border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-slate-800">
              <span className="font-black text-xs uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Bot className="w-4 h-4" /> LIVE AI SUPPORT CHAT
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-600 text-white font-black">
                24/7 ONLINE
              </span>
            </div>

            <div
              className={`flex-1 min-h-[220px] max-h-[320px] overflow-y-auto space-y-2 p-2 rounded-lg border ${
                isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-[#05070A] border-slate-800'
              }`}
            >
              {chatMessages.map((m, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-lg text-xs leading-relaxed ${
                    m.sender === 'USER'
                      ? 'bg-emerald-600 text-white ml-auto max-w-[85%] font-bold'
                      : isLight
                      ? 'bg-white border border-slate-200 text-slate-800 shadow-xs'
                      : 'bg-[#111317] border border-slate-800 text-gray-200'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className="text-[8px] opacity-70 block mt-1 text-right">
                    {m.time}
                  </span>
                </div>
              ))}
              {isAiTyping && (
                <div
                  className={`p-2 rounded-lg text-xs italic font-semibold ${
                    isLight
                      ? 'bg-white border border-slate-200 text-emerald-700'
                      : 'bg-[#111317] border border-slate-800 text-emerald-400'
                  }`}
                >
                  ⚡ AYUSH AI Support is typing...
                </div>
              )}
            </div>

            <form onSubmit={handleSendChat} className="flex space-x-1.5 pt-1">
              <input
                type="text"
                placeholder="Ask support or help..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className={`flex-1 px-3 py-1.5 rounded-lg border font-bold text-xs outline-none focus:border-emerald-500 ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900'
                    : 'bg-[#111317] border-slate-800 text-white'
                }`}
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* CARDS 4 to 7: REMAINING GOVT EMERGENCY NUMBERS */}
          {emergencyNumbers.slice(2).map((item) => (
            <div
              key={item.number}
              className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 ${
                isLight
                  ? 'bg-white border-slate-200 shadow-xs'
                  : 'bg-[#0B0F19] border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                    DIAL: {item.number}
                  </span>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded font-bold ${
                      isLight
                        ? 'bg-slate-100 text-slate-700'
                        : 'bg-slate-800 text-gray-300'
                    }`}
                  >
                    GOVT HELPLINE
                  </span>
                </div>
                <p
                  className={`font-black text-xs mt-1 ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {item.title}
                </p>
                <p
                  className={`text-[11px] mt-0.5 ${
                    isLight ? 'text-slate-600' : 'text-gray-400'
                  }`}
                >
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

      {/* TWO-COLUMN SUPPORT GRID: WHATSAPP DIRECT CONTACT & INQUIRY FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* COLUMN 1: DIRECT WHATSAPP & EMERGENCY CONTACT CARD */}
        <div
          className={`p-5 rounded-2xl border space-y-4 ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-[#0B0F19] border-[#1C1F26]'
          }`}
        >
          <span className="font-black text-xs uppercase text-cyan-600 dark:text-cyan-400 block border-b pb-3 border-slate-200 dark:border-slate-800">
            DIRECT CONTACT & WHATSAPP CHAT
          </span>

          <div className="space-y-3 text-xs">
            <div
              className={`p-3.5 rounded-xl border space-y-1.5 ${
                isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-[#111317] border-slate-800'
              }`}
            >
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase">
                WHATSAPP CONSULTATION HELPLINE
              </span>
              <p className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                +91 98765 43210 (Dr. Nitin Aggarwal, MD Hom.)
              </p>
              <p
                className={`text-[11px] ${
                  isLight ? 'text-slate-600' : 'text-gray-400'
                }`}
              >
                Instant prescription slip dispatch, clinical second opinions & acute emergencies.
              </p>
              <button
                onClick={handleOpenWhatsAppCall}
                className="w-full mt-2 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs cursor-pointer"
              >
                Open WhatsApp Consultation Chat
              </button>
            </div>

            <div
              className={`p-3.5 rounded-xl border space-y-1 ${
                isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-[#111317] border-slate-800'
              }`}
            >
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase">
                NATIONAL AYUSH HELPLINE
              </span>
              <p
                className={`font-black text-sm ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                14443 / 1800-11-22-33 (Toll Free across India)
              </p>
            </div>

            <div
              className={`p-3.5 rounded-xl border space-y-1 ${
                isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-[#111317] border-slate-800'
              }`}
            >
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase">
                INSTITUTIONAL HEADQUARTERS & CLINIC
              </span>
              <p
                className={`font-bold text-xs ${
                  isLight ? 'text-slate-800' : 'text-white'
                }`}
              >
                National Institute of Homeopathy, Block GE, Sector V, Salt Lake, Kolkata, West Bengal 700106
              </p>
            </div>
          </div>
        </div>

        {/* COLUMN 2: LIVE SUPPORT & CLINICAL CHAT (REMOVED FROM BOTTOM) */}
        {/* COLUMN 2: CONTACT US / INSTITUTIONAL ONBOARDING INQUIRY FORM */}
        <div
          className={`p-5 rounded-2xl border space-y-4 ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-[#0B0F19] border-[#1C1F26]'
          }`}
        >
          <span className="font-black text-xs uppercase text-purple-600 dark:text-purple-400 block border-b pb-3 border-slate-200 dark:border-slate-800">
            CONTACT US / CLINICAL INQUIRY FORM
          </span>

          {ticketCreated ? (
            <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <p
                className={`font-black text-xs ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                SUPPORT TICKET #MG-2026-9901 CREATED!
              </p>
              <p
                className={`text-[11px] ${
                  isLight ? 'text-slate-600' : 'text-gray-400'
                }`}
              >
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
                <label
                  className={`font-bold block mb-1 ${
                    isLight ? 'text-slate-700' : 'text-gray-400'
                  }`}
                >
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  defaultValue="Ramesh Kumar Sharma"
                  className={`w-full px-3 py-2 rounded-xl border font-bold outline-none ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900'
                      : 'bg-[#111317] border-slate-800 text-white'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`font-bold block mb-1 ${
                    isLight ? 'text-slate-700' : 'text-gray-400'
                  }`}
                >
                  ABHA ID or Mobile Number
                </label>
                <input
                  type="text"
                  required
                  defaultValue="+91 98765 43210"
                  className={`w-full px-3 py-2 rounded-xl border font-bold outline-none ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900'
                      : 'bg-[#111317] border-slate-800 text-white'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`font-bold block mb-1 ${
                    isLight ? 'text-slate-700' : 'text-gray-400'
                  }`}
                >
                  Inquiry / Clinical Request
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your question or clinic requirement..."
                  className={`w-full px-3 py-2 rounded-xl border font-bold outline-none ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900'
                      : 'bg-[#111317] border-slate-800 text-white'
                  }`}
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

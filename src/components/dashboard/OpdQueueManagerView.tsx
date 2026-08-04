'use client';

import React, { useState } from 'react';
import {
  Users,
  Video,
  Clock,
  CheckCircle2,
  PhoneCall,
  UserPlus,
  Calendar,
  ShieldCheck,
  Award,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  INDIAN_LANGUAGE_PACKS,
  IndianLanguageCode,
} from '@/lib/i18n/indian_language_packs';

interface OpdQueueManagerViewProps {
  theme?: 'dark' | 'light';
  langCode?: IndianLanguageCode;
}

export const OpdQueueManagerView: React.FC<OpdQueueManagerViewProps> = ({
  theme = 'dark',
  langCode = 'EN',
}) => {
  const isLight = theme === 'light';
  const pack = INDIAN_LANGUAGE_PACKS[langCode] || INDIAN_LANGUAGE_PACKS.EN;
  const labels = pack.labels;

  const getLocalizedQueue = (code: string) => {
    if (code === 'TE') {
      return [
        {
          token: 'OPD-101',
          patientName: 'రమేష్ కుమార్ శర్మ',
          ageGender: '44 పురుషుడు',
          chiefComplaint: 'తీవ్రమైన స్పందన జ్వరం & కరోటిడ్ ధమని కొట్టుకోవడం',
          status: 'IN_CONSULTATION',
          waitTime: '0 నిమిషాలు',
          abhaStatus: 'VERIFIED',
        },
        {
          token: 'OPD-102',
          patientName: 'ప్రియా పటేల్',
          ageGender: '38 స్త్రీ',
          chiefComplaint: 'దీర్ఘకాలిక లివర్ సిర్రోసిస్ & భుజం నరం నొప్పి',
          status: 'NEXT_IN_QUEUE',
          waitTime: '8 నిమిషాలు',
          abhaStatus: 'VERIFIED',
        },
        {
          token: 'OPD-103',
          patientName: 'విక్రమ్ సింగ్',
          ageGender: '52 పురుషుడు',
          chiefComplaint: 'మోకాలి శ్లేష్మ ద్రవం వాపు & దృఢత్వం',
          status: 'WAITING',
          waitTime: '15 నిమిషాలు',
          abhaStatus: 'VERIFIED',
        },
        {
          token: 'OPD-104',
          patientName: 'అనన్య వర్మ',
          ageGender: '29 స్త్రీ',
          chiefComplaint: 'నుదుటి తీవ్ర మైగ్రేన్ నొప్పి & వెలుతురు భయం',
          status: 'WAITING',
          waitTime: '22 నిమిషాలు',
          abhaStatus: 'VERIFIED',
        },
      ];
    }
    if (code === 'MR') {
      return [
        {
          token: 'OPD-101',
          patientName: 'रमेश कुमार शर्मा',
          ageGender: '44 पुरुष',
          chiefComplaint: 'तीव्र स्पंदनशील ताप आणि कॅरोटिड नाडीची धडधड',
          status: 'IN_CONSULTATION',
          waitTime: '0 मिनिटे',
          abhaStatus: 'VERIFIED',
        },
        {
          token: 'OPD-102',
          patientName: 'प्रिया पटेल',
          ageGender: '38 महिला',
          chiefComplaint: 'जुनाट यकृत सिरोसिस आणि खांद्याच्या खालील भागात वेदना',
          status: 'NEXT_IN_QUEUE',
          waitTime: '8 मिनिटे',
          abhaStatus: 'VERIFIED',
        },
        {
          token: 'OPD-103',
          patientName: 'विक्रम सिंह',
          ageGender: '52 पुरुष',
          chiefComplaint: 'गुडघ्याच्या सांध्यात द्रव साचणे आणि जकडणे',
          status: 'WAITING',
          waitTime: '15 मिनिटे',
          abhaStatus: 'VERIFIED',
        },
        {
          token: 'OPD-104',
          patientName: 'अनन्या वर्मा',
          ageGender: '29 महिला',
          chiefComplaint: 'कपाळाचा तीव्र मायग्रेन आणि प्रकाशाची भीती',
          status: 'WAITING',
          waitTime: '22 मिनिटे',
          abhaStatus: 'VERIFIED',
        },
      ];
    }
    if (code === 'GU') {
      return [
        {
          token: 'OPD-101',
          patientName: 'રમેશ કુમાર શર્મા',
          ageGender: '44 પુરુષ',
          chiefComplaint: 'તીવ્ર ધબકતો તાવ અને કેરોટિડ ધમનીનો ધબકારો',
          status: 'IN_CONSULTATION',
          waitTime: '0 મિનિટ',
          abhaStatus: 'VERIFIED',
        },
        {
          token: 'OPD-102',
          patientName: 'પ્રિયા પટેલ',
          ageGender: '38 મહિલા',
          chiefComplaint: 'ક્રોનિક લિવર સિરોસિસ અને ખભાના નીચેના ભાગમાં દુખાવો',
          status: 'NEXT_IN_QUEUE',
          waitTime: '8 મિનિટ',
          abhaStatus: 'VERIFIED',
        },
        {
          token: 'OPD-103',
          patientName: 'વિક્રમ સિંહ',
          ageGender: '52 પુરુષ',
          chiefComplaint: 'ઘૂંટણના સાંધામાં પ્રવાહીનો સોજો અને સખતતા',
          status: 'WAITING',
          waitTime: '15 મિનિટ',
          abhaStatus: 'VERIFIED',
        },
        {
          token: 'OPD-104',
          patientName: 'અનન્યા વર્મા',
          ageGender: '29 મહિલા',
          chiefComplaint: 'કપાળનો તીવ્ર આધાશીશીનો દુખાવો અને પ્રકાશ પ્રત્યે અસહિષ્ણુતા',
          status: 'WAITING',
          waitTime: '22 મિનિટ',
          abhaStatus: 'VERIFIED',
        },
      ];
    }
    if (code === 'KN') {
      return [
        {
          token: 'OPD-101',
          patientName: 'ರಮೇಶ್ ಕುಮಾರ್ ಶರ್ಮಾ',
          ageGender: '44 ಪುರುಷ',
          chiefComplaint: 'ತೀವ್ರ ತುಡಿಯುವ ಜ್ವರ ಮತ್ತು ಶಿರೋಧಮನಿ ನರ ತುಡಿತ',
          status: 'IN_CONSULTATION',
          waitTime: '0 ನಿಮಿಷ',
          abhaStatus: 'VERIFIED',
        },
        {
          token: 'OPD-102',
          patientName: 'ಪ್ರಿಯಾ ಪಟೇಲ್',
          ageGender: '38 ಮಹಿಳೆ',
          chiefComplaint: 'ದೀರ್ಘಕಾಲದ ಯಕೃತ್ತಿನ ಸಿರೋಸಿಸ್ ಮತ್ತು ಹೆಗಲ ಕೆಳಗಿನ ನೋವು',
          status: 'NEXT_IN_QUEUE',
          waitTime: '8 ನಿಮಿಷ',
          abhaStatus: 'VERIFIED',
        },
        {
          token: 'OPD-103',
          patientName: 'ವಿಕ್ರಮ್ ಸಿಂಗ್',
          ageGender: '52 ಪುರುಷ',
          chiefComplaint: 'ಮೊಣಕಾಲಿನ ಕೀಲಿನ ದ್ರವ ಊತ ಮತ್ತು ಬಿಗಿತ',
          status: 'WAITING',
          waitTime: '15 ನಿಮಿಷ',
          abhaStatus: 'VERIFIED',
        },
        {
          token: 'OPD-104',
          patientName: 'ಅನನ್ಯಾ ವರ್ಮಾ',
          ageGender: '29 ಮಹಿಳೆ',
          chiefComplaint: 'ಹಣೆಯ ತೀವ್ರ ಅರ್ಧತಲೆನೋವು ಮತ್ತು ಬೆಳಕಿನ ಭಯ',
          status: 'WAITING',
          waitTime: '22 ನಿಮಿಷ',
          abhaStatus: 'VERIFIED',
        },
      ];
    }
    if (code === 'TA') {
      return [
        {
          token: 'OPD-101',
          patientName: 'ரமேஷ் குமார் சர்மா',
          ageGender: '44 ஆண்',
          chiefComplaint: 'கடுமையான துடிக்கும் காய்ச்சல் & கரோடிட் தமனி அதிர்வு',
          status: 'IN_CONSULTATION',
          waitTime: '0 mins',
          abhaStatus: 'VERIFIED',
        },
        {
          token: 'OPD-102',
          patientName: 'பிரியா படேல்',
          ageGender: '38 பெண்',
          chiefComplaint: 'நாள்பட்ட கல்லீரல் தழும்புநோய் & தோள்பட்டை நரம்பு வலி',
          status: 'NEXT_IN_QUEUE',
          waitTime: '8 mins',
          abhaStatus: 'VERIFIED',
        },
        {
          token: 'OPD-103',
          patientName: 'விக்ரம் சிங்',
          ageGender: '52 ஆண்',
          chiefComplaint: 'முழங்கால் மூட்டு நீர்வீக்கம் & விறைப்பு',
          status: 'WAITING',
          waitTime: '15 mins',
          abhaStatus: 'VERIFIED',
        },
        {
          token: 'OPD-104',
          patientName: 'அனன்யா வர்மா',
          ageGender: '29 பெண்',
          chiefComplaint: 'துடிக்கும் நெற்றி ஒற்றைத்தலைவலி & வெளிச்சக்கூச்சம்',
          status: 'WAITING',
          waitTime: '22 mins',
          abhaStatus: 'VERIFIED',
        },
      ];
    }
    if (code === 'HI') {
      return [
        {
          token: 'OPD-101',
          patientName: 'रमेश कुमार शर्मा',
          ageGender: '44 पुरुष',
          chiefComplaint: 'तीव्र स्पंदनशील तेज बुखार और कैरोटिड नाड़ी की धड़कन',
          status: 'IN_CONSULTATION',
          waitTime: '0 mins',
          abhaStatus: 'VERIFIED',
        },
        {
          token: 'OPD-102',
          patientName: 'प्रिया पटेल',
          ageGender: '38 महिला',
          chiefComplaint: 'पुरानी यकृत सिरोसिस और कंधे के निचले हिस्से में दर्द',
          status: 'NEXT_IN_QUEUE',
          waitTime: '8 mins',
          abhaStatus: 'VERIFIED',
        },
        {
          token: 'OPD-103',
          patientName: 'विक्रम सिंह',
          ageGender: '52 पुरुष',
          chiefComplaint: 'घुटने के जोड़ में सूजन और जकड़न',
          status: 'WAITING',
          waitTime: '15 mins',
          abhaStatus: 'VERIFIED',
        },
        {
          token: 'OPD-104',
          patientName: 'अनन्या वर्मा',
          ageGender: '29 महिला',
          chiefComplaint: 'तीव्र कनपटी का माइग्रेन और धूप से संवेदनशीलता',
          status: 'WAITING',
          waitTime: '22 mins',
          abhaStatus: 'VERIFIED',
        },
      ];
    }
    if (code === 'BN') {
      return [
        {
          token: 'OPD-101',
          patientName: 'রমেশ কুমার শর্মা',
          ageGender: '44 পুরুষ',
          chiefComplaint: 'তীব্র স্পন্দনশীল ধড়ফড় জ্বর ও ক্যারোটিড ধমনি ধুকপুক',
          status: 'IN_CONSULTATION',
          waitTime: '0 mins',
          abhaStatus: 'VERIFIED',
        },
        {
          token: 'OPD-102',
          patientName: 'প্রিয়া প্যাটেল',
          ageGender: '38 মহিলা',
          chiefComplaint: 'দীর্ঘস্থায়ী লিভার সিরোসিস ও কাঁধের হাড়ের তলায় ব্যথা',
          status: 'NEXT_IN_QUEUE',
          waitTime: '8 mins',
          abhaStatus: 'VERIFIED',
        },
        {
          token: 'OPD-103',
          patientName: 'বিক্রম সিং',
          ageGender: '52 পুরুষ',
          chiefComplaint: 'হাঁটুর জয়েন্টে তরল সঞ্চয় ও শক্ত ভাব',
          status: 'WAITING',
          waitTime: '15 mins',
          abhaStatus: 'VERIFIED',
        },
        {
          token: 'OPD-104',
          patientName: 'অনন্যা বর্মা',
          ageGender: '29 মহিলা',
          chiefComplaint: 'কপালের তীব্র মাইগ্রেন ও আলো সহ্য করতে না পারা',
          status: 'WAITING',
          waitTime: '22 mins',
          abhaStatus: 'VERIFIED',
        },
      ];
    }
    return [
      {
        token: 'OPD-101',
        patientName: 'Ramesh Kumar Sharma',
        ageGender: '44M',
        chiefComplaint: 'Acute Pulsating Hyperpyrexia & Carotid Throbbing',
        status: 'IN_CONSULTATION',
        waitTime: '0 mins',
        abhaStatus: 'VERIFIED',
      },
      {
        token: 'OPD-102',
        patientName: 'Priya Patel',
        ageGender: '38F',
        chiefComplaint: 'Chronic Hepatic Parenchyma Cirrhosis & Scapular Neuralgia',
        status: 'NEXT_IN_QUEUE',
        waitTime: '8 mins',
        abhaStatus: 'VERIFIED',
      },
      {
        token: 'OPD-103',
        patientName: 'Vikram Singh',
        ageGender: '52M',
        chiefComplaint: 'Synovial Knee Joint Effusion & Fibrous Stiffness',
        status: 'WAITING',
        waitTime: '15 mins',
        abhaStatus: 'VERIFIED',
      },
      {
        token: 'OPD-104',
        patientName: 'Ananya Verma',
        ageGender: '29F',
        chiefComplaint: 'Throbbing Temporal Migraine & Photophobia',
        status: 'WAITING',
        waitTime: '22 mins',
        abhaStatus: 'VERIFIED',
      },
    ];
  };

  const opdQueue = getLocalizedQueue(langCode);

  const uhiVideoSlots = [
    {
      time: '10:00 AM – 10:15 AM',
      patientName: langCode === 'TE' ? 'అనన్య వర్మ' : langCode === 'TA' ? 'அனன்யா வர்மா' : langCode === 'HI' ? 'अनन्या वर्मा' : 'Ananya Verma',
      status: labels.confirmedUhi,
      isBooked: true,
    },
    {
      time: '10:15 AM – 10:30 AM',
      patientName: langCode === 'TE' ? 'విక్రమాదిత్య రావు' : langCode === 'TA' ? 'விக்ரமாதித்யா ராவ்' : langCode === 'HI' ? 'विक्रमादित्य राव' : 'Vikramaditya Rao',
      status: labels.confirmedUhi,
      isBooked: true,
    },
    {
      time: '10:30 AM – 10:45 AM',
      patientName: langCode === 'TE' ? 'సిద్ధార్థ్ దేశ్‌ముఖ్' : langCode === 'TA' ? 'சித்தார்த் தேஷ்முக்' : langCode === 'HI' ? 'सिद्धार्थ देशमुख' : 'Siddharth Deshmukh',
      status: labels.confirmedUhi,
      isBooked: true,
    },
    {
      time: '10:45 AM – 11:00 AM',
      patientName: langCode === 'TE' ? 'కవితా పటేల్' : langCode === 'TA' ? 'கவிதா படேல்' : langCode === 'HI' ? 'कविता पटेल' : 'Kavita Patel',
      status: labels.confirmedUhi,
      isBooked: true,
    },
    {
      time: '11:00 AM – 11:15 AM',
      patientName: labels.availableSlot,
      status: labels.availableSlot,
      isBooked: false,
    },
    {
      time: '11:15 AM – 11:30 AM',
      patientName: labels.availableSlot,
      status: labels.availableSlot,
      isBooked: false,
    },
  ];

  return (
    <div
      className={`w-full h-full overflow-y-auto p-6 space-y-6 font-mono transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#05070A] text-white'
      }`}
    >
      {/* EXECUTIVE HEADER BAR */}
      <div
        className={`flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl border shadow-xl ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-[#0B0F19] border-[#1C1F26] text-white'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-black shadow-lg">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-black text-base uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {labels.opdQueueManagerTitle}
            </h2>
            <p
              className={`text-xs ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              {labels.opdQueueManagerSub}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center gap-1.5 shadow-sm">
            {labels.liveOpdTriageActive}
          </span>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs flex items-center space-x-1.5 shadow-md transition-all transform hover:scale-105 cursor-pointer">
            <UserPlus className="w-4 h-4" />
            <span>{labels.checkInWalkInPatient}</span>
          </button>
        </div>
      </div>

      {/* TWO-COLUMN WORKBENCH: LIVE OPD TOKEN QUEUE + NHA UHI VIDEO SCHEDULER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: LIVE PHYSICAL OPD TOKEN QUEUE (7 COLUMNS) */}
        <div
          className={`lg:col-span-7 p-6 rounded-2xl border space-y-4 shadow-lg ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-[#0B0F19] border-[#1C1F26]'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="font-black text-sm uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <Users className="w-4 h-4" /> {labels.physicalOpdTokenQueue}
            </span>
            <span className="text-xs font-bold text-gray-500 dark:text-slate-300">
              {labels.realTimeAuditLog}
            </span>
          </div>

          <div className="space-y-3">
            {opdQueue.map((item) => (
              <div
                key={item.token}
                className={`p-4 rounded-xl border transition-all transform hover:scale-[1.01] flex flex-wrap items-center justify-between gap-4 ${
                  item.status === 'IN_CONSULTATION'
                    ? isLight
                      ? 'bg-emerald-50 border-emerald-400'
                      : 'bg-emerald-950/40 border-emerald-500/70'
                    : isLight
                    ? 'bg-slate-50 border-slate-200 hover:border-emerald-400'
                    : 'bg-[#111317] border-slate-800 hover:border-emerald-500/60'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`px-3 py-2 rounded-xl font-black text-xs border ${
                      item.status === 'IN_CONSULTATION'
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                        : isLight
                        ? 'bg-white text-slate-800 border-slate-300'
                        : 'bg-slate-900 text-gray-200 border-slate-800'
                    }`}
                  >
                    {item.token}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm">{item.patientName}</span>
                      <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">
                        ({item.ageGender})
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-black border border-emerald-500/30">
                        {labels.verifiedAbha}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-gray-400 mt-0.5 font-medium">
                      {item.chiefComplaint}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {item.status === 'IN_CONSULTATION' ? (
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center gap-1.5 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {labels.inOpdCabin}
                    </span>
                  ) : (
                    <button className="px-3.5 py-1.5 rounded-xl bg-emerald-600/15 hover:bg-emerald-600 hover:text-white text-emerald-600 dark:text-emerald-400 font-black text-xs border border-emerald-500/30 flex items-center space-x-1.5 cursor-pointer transition-all">
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{labels.callToken}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: NHA UHI TELEHEALTH VIDEO SLOT SCHEDULER (5 COLUMNS) */}
        <div
          className={`lg:col-span-5 p-6 rounded-2xl border space-y-4 shadow-lg ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-[#0B0F19] border-[#1C1F26]'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="font-black text-sm uppercase text-purple-600 dark:text-purple-400 flex items-center gap-2">
              <Video className="w-4 h-4" /> {labels.uhiVideoSlotsTitle}
            </span>
            <span className="text-xs font-bold text-gray-500 dark:text-slate-300">
              {labels.liveWebRtcRooms}
            </span>
          </div>

          <div className="space-y-2.5">
            {uhiVideoSlots.map((slot, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border flex items-center justify-between ${
                  slot.isBooked
                    ? isLight
                      ? 'bg-purple-50/70 border-purple-200'
                      : 'bg-purple-950/20 border-purple-500/30'
                    : isLight
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-[#111317] border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-purple-500" />
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-300">
                      {slot.time}
                    </span>
                  </div>
                  <p className="font-bold text-xs mt-1">{slot.patientName}</p>
                </div>

                <div>
                  {slot.isBooked ? (
                    <span className="px-2.5 py-1 rounded-lg bg-purple-600 text-white font-black text-[10px] uppercase shadow-2xs">
                      {slot.status}
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-gray-400 font-bold text-[10px] uppercase">
                      {slot.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpdQueueManagerView;

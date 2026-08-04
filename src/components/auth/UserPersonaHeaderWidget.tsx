'use client';

import React, { useState, useRef } from 'react';
import {
  User,
  UserCheck,
  Building2,
  ShieldAlert,
  Settings,
  LogOut,
  LogIn,
  Sun,
  Moon,
  ChevronDown,
  CheckCircle2,
  Lock,
  Globe,
  Bell,
  Eye,
  Award,
  Stethoscope,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { useRbac } from '@/lib/auth/rbac_context';
import {
  INDIAN_LANGUAGE_PACKS,
  IndianLanguageCode,
} from '@/lib/i18n/indian_language_packs';

export type RbacRole =
  | 'PHYSICIAN'
  | 'PATIENT'
  | 'HOSPITAL_ADMIN'
  | 'SYSTEM_ADMIN';

interface UserPersonaHeaderWidgetProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onSelectTab?: (tab: any) => void;
  langCode?: string;
  onSelectLanguage?: (code: any) => void;
}

export const UserPersonaHeaderWidget: React.FC<
  UserPersonaHeaderWidgetProps
> = ({ theme, onToggleTheme, onSelectTab, langCode = 'EN', onSelectLanguage }) => {
  const isLight = theme === 'light';
  const pack = INDIAN_LANGUAGE_PACKS[(langCode as IndianLanguageCode)] || INDIAN_LANGUAGE_PACKS.EN;
  const labels = pack.labels;
  const { currentUser, switchRole, setIsLoginModalOpen } = useRbac();
  const [isOpen, setIsOpen] = useState(false);
  const [defaultPotency, setDefaultPotency] = useState('200C (Constitutional)');
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const ALL_LANGUAGES = [
    { code: 'EN', label: 'English (EN)', flag: '🇬🇧' },
    { code: 'HI', label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'TA', label: 'தமிழ் (Tamil)', flag: '🇮🇳' },
    { code: 'BN', label: 'বাংলা (Bengali)', flag: '🇮🇳' },
    { code: 'MR', label: 'मराठी (Marathi)', flag: '🇮🇳' },
    { code: 'GU', label: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
    { code: 'TE', label: 'తెలుగు (Telugu)', flag: '🇮🇳' },
    { code: 'KN', label: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' },
    { code: 'ML', label: 'മലയാളം (Malayalam)', flag: '🇮🇳' },
    { code: 'OR', label: 'ଓଡ଼ିଆ (Odia)', flag: '🇮🇳' },
    { code: 'PA', label: 'ਪੰਜਾਬੀ (Punjabi)', flag: '🇮🇳' },
    { code: 'UR', label: 'اردو (Urdu)', flag: '🇮🇳' },
    { code: 'DE', label: 'Deutsch (German)', flag: '🇩🇪' },
    { code: 'FR', label: 'Français (French)', flag: '🇫🇷' },
    { code: 'ES', label: 'Español (Spanish)', flag: '🇪🇸' },
    { code: 'PT', label: 'Português (Portuguese)', flag: '🇧🇷' },
    { code: 'RU', label: 'Русский (Russian)', flag: '🇷🇺' },
    { code: 'AR', label: 'العربية (Arabic)', flag: '🇸🇦' },
  ];

  // LOCALIZED PERSONAS & ROLES ACROSS ALL 18 LANGUAGES
  const getLocalizedPersonas = (code: string) => {
    const personaMap: Record<
      string,
      {
        docName: string;
        docRole: string;
        docSub: string;
        patName: string;
        patRole: string;
        patSub: string;
        adminName: string;
        adminRole: string;
        adminSub: string;
        sysName: string;
        sysRole: string;
        sysSub: string;
      }
    > = {
      TA: {
        docName: 'டாக்டர் நிதின் அகர்வால்',
        docRole: 'மருத்துவர்',
        docSub: 'MD Hom. • ஆயுஷ் சான்றளிக்கப்பட்டது',
        patName: 'ரமேஷ் குமார் சர்மா',
        patRole: 'நோயாளி',
        patSub: 'ஆபா கணக்கு: 91-4829-1049-3829',
        adminName: 'டாக்டர் எஸ். கே. பானர்ஜி',
        adminRole: 'நிர்வாகி',
        adminSub: 'OPD இயக்குநர் • NIH கொல்கத்தா',
        sysName: 'ஆயுஷ் ஒழுங்குமுறை தணிக்கையாளர்',
        sysRole: 'தணிக்கையாளர்',
        sysSub: 'ஆயுஷ் அமைச்சக நுழைவாயில்',
      },
      HI: {
        docName: 'डॉ. नितिन अग्रवाल',
        docRole: 'चिकित्सक',
        docSub: 'MD Hom. • सीसीएच प्रमाणित',
        patName: 'रमेश कुमार शर्मा',
        patRole: 'रोगी',
        patSub: 'आभा संख्या: 91-4829-1049-3829',
        adminName: 'डॉ. एस. के. बनर्जी',
        adminRole: 'अस्पताल निदेशक',
        adminSub: 'ओपीडी निदेशक • एनआईएच कोलकाता',
        sysName: 'आयुष नियामक लेखा परीक्षक',
        sysRole: 'सिस्टम ऑडिटर',
        sysSub: 'आयुष मंत्रालय गेटवे',
      },
      BN: {
        docName: 'ডঃ নিতিন আগরওয়াল',
        docRole: 'চিকিৎসক',
        docSub: 'MD Hom. • সিসিএইচ সিএইচও',
        patName: 'রমেশ কুমার শর্মা',
        patRole: 'রোগী',
        patSub: 'আভা সংখ্যা: 91-4829-1049-3829',
        adminName: 'ডঃ এস. কে. ব্যানার্জী',
        adminRole: 'হাসপাতাল অধিকর্তা',
        adminSub: 'ওপিডি অধিকর্তা • এনআইএইচ কলকাতা',
        sysName: 'আয়ুশ নিয়ন্ত্রণ কর্মকর্তা',
        sysRole: 'অডিট কর্মকর্তা',
        sysSub: 'আয়ুশ মন্ত্রক গেটওয়ে',
      },
      TE: {
        docName: 'డాక్టర్ నితిన్ అగర్వాల్',
        docRole: 'వైద్యుడు',
        docSub: 'MD Hom. • ఆయుష్ ప్రామాణీకరించబడింది',
        patName: 'రమేష్ కుమార్ శర్మ',
        patRole: 'రోగి',
        patSub: 'ఆభా సంఖ్య: 91-4829-1049-3829',
        adminName: 'డాక్టర్ ఎస్. కే. బెనర్జీ',
        adminRole: 'ఆసుపత్రి డైరెక్టర్',
        adminSub: 'OPD డైరెక్టర్ • NIH కోల్‌కతా',
        sysName: 'ఆయుష్ నియంత్రణ ఆడిటర్',
        sysRole: 'సిస్టమ్ ఆడిటర్',
        sysSub: 'ఆయుష్ మంత్రిత్వ శాఖ గేట్‌వే',
      },
      ML: {
        docName: 'ഡോ. നിതിൻ അഗർവാൾ',
        docRole: 'ഡോക്ടർ',
        docSub: 'MD Hom. • ആയുഷ് അംഗീകൃത ഡോക്ടർ',
        patName: 'രമേഷ് കുമാർ ശർമ്മ',
        patRole: 'രോഗി',
        patSub: 'ആഭ നമ്പർ: 91-4829-1049-3829',
        adminName: 'ഡോ. എസ്. കെ. ബാനർജി',
        adminRole: 'ആശുപത്രി ഡയറക്ടർ',
        adminSub: 'ഒപിഡി ഡയറക്ടർ • എഐഎച്ച് കൊൽക്കത്ത',
        sysName: 'ആയുഷ് റെഗുലേറ്ററി ഓഡിറ്റർ',
        sysRole: 'സിസ്റ്റം ഓഡിറ്റർ',
        sysSub: 'ആയുഷ് മന്ത്രാലയ പോർട്ടൽ',
      },
      MR: {
        docName: 'डॉ. नितीन अग्रवाल',
        docRole: 'वैद्य / चिकित्सक',
        docSub: 'MD Hom. • सीसीसी प्रमाणित',
        patName: 'रमेश कुमार शर्मा',
        patRole: 'रुग्ण',
        patSub: 'आभा आयडी: 91-4829-1049-3829',
        adminName: 'डॉ. एस. के. बॅनर्जी',
        adminRole: 'रुग्णालय संचालक',
        adminSub: 'ओपीडी संचालक • एनआयएच कोलकाता',
        sysName: 'आयुष नियमन लेखापरीक्षक',
        sysRole: 'सिस्टम ऑडीटर',
        sysSub: 'आयुष मंत्रालय गेटवे',
      },
      GU: {
        docName: 'ડૉ. નિતિન અગ્રવાલ',
        docRole: 'ચિકિત્સક',
        docSub: 'MD Hom. • સીસીએચ પ્રમાણિત',
        patName: 'રમેશ કુમાર શર્મા',
        patRole: 'દર્દી',
        patSub: 'આભા આઈડી: 91-4829-1049-3829',
        adminName: 'ડૉ. એસ. કે. બેનર્જી',
        adminRole: 'હોસ્પિટલ ડિરેક્ટર',
        adminSub: 'ઓપીડી ડિરેક્ટર • એનઆઈએચ કોલકાતા',
        sysName: 'આયુષ નિયામક ઓડિટર',
        sysRole: 'સિસ્ટમ ઓડિટર',
        sysSub: 'આયુષ મંત્રાલય ગેટવે',
      },
      KN: {
        docName: 'ಡಾ. ನಿತಿನ್ ಅಗರ್ವಾಲ್',
        docRole: 'ವೈದ್ಯರು',
        docSub: 'MD Hom. • ಆಯುಷ್ ಪ್ರಮಾಣೀಕೃತ',
        patName: 'ರಮೇಶ್ ಕುಮಾರ್ ಶರ್ಮಾ',
        patRole: 'ರೋಗಿ',
        patSub: 'ಆಭಾ ಸಂಖ್ಯೆ: 91-4829-1049-3829',
        adminName: 'ಡಾ. ಎಸ್. ಕೆ. ಬ್ಯಾನರ್ಜಿ',
        adminRole: 'ಆಸ್ಪತ್ರೆ ನಿರ್ದೇಶಕರು',
        adminSub: 'OPD ನಿರ್ದೇಶಕರು • NIH ಕೋಲ್ಕತ್ತಾ',
        sysName: 'ಆಯುಷ್ ನಿಯಂತ್ರಣ ಆಡಿಟರ್',
        sysRole: 'ಸಿಸ್ಟಮ್ ಆಡಿಟರ್',
        sysSub: 'ಆಯುಷ್ ಸಚಿವಾಲಯ ಗೇಟ್‌ವೇ',
      },
      OR: {
        docName: 'ଡଃ ନିତିନ୍ ଅଗ୍ରୱାଲ',
        docRole: 'ଚିକିତ୍ସକ',
        docSub: 'MD Hom. • ଆୟୁଷ ପ୍ରମାଣିତ',
        patName: 'ରମେଶ କୁମାର ଶର୍ମା',
        patRole: 'ରୋଗୀ',
        patSub: 'ଆଭା ଆଇଡି: 91-4829-1049-3829',
        adminName: 'ଡଃ ଏସ. କେ. ବାନାର୍ଜୀ',
        adminRole: 'ହସ୍ପିଟାଲ ନିର୍ଦ୍ଦେଶକ',
        adminSub: 'ଓପିଡି ନିର୍ଦ୍ଦେଶକ • ଏନଆଇଏଚ କୋଲକାତା',
        sysName: 'ଆୟୁଷ ନିୟାମକ ଅଡିଟର',
        sysRole: 'ସିଷ୍ଟମ ଅଡିଟର',
        sysSub: 'ଆୟୁଷ ମନ୍ତ୍ରଣାଳୟ ଗେଟୱେ',
      },
      PA: {
        docName: 'ਡਾ. ਨਿਤਿਨ ਅਗਰਵਾਲ',
        docRole: 'ਡਾਕਟਰ',
        docSub: 'MD Hom. • ਆਯੁਸ਼ ਪ੍ਰਮਾਣਿਤ',
        patName: 'ਰਮੇਸ਼ ਕੁਮਾਰ ਸ਼ਰਮਾ',
        patRole: 'ਮਰੀਜ਼',
        patSub: 'ਆਭਾ ਆਈਡੀ: 91-4829-1049-3829',
        adminName: 'ਡਾ. ਐਸ. ਕੇ. ਬੈਨਰਜੀ',
        adminRole: 'ਹਸਪਤਾਲ ਨਿਰਦੇਸ਼ਕ',
        adminSub: 'ਓਪੀਡੀ ਨਿਰਦੇਸ਼ਕ • ਐਨਆਈਐਚ ਕੋਲਕਾਤਾ',
        sysName: 'ਆਯੁਸ਼ ਰੈਗੂਲੇਟਰੀ ਆਡੀਟਰ',
        sysRole: 'ਸਿਸਟਮ ਆਡੀਟਰ',
        sysSub: 'ਆਯੁਸ਼ ਮੰਤਰਾਲਾ ਗੇਟਵੇ',
      },
      UR: {
        docName: 'ڈاکٹر نتن اگروال',
        docRole: 'معالج / ڈاکٹر',
        docSub: 'MD Hom. • آیوش تصدیق شدہ',
        patName: 'رمیش کمار شرما',
        patRole: 'مریض',
        patSub: 'آبھا آئی ڈی: 91-4829-1049-3829',
        adminName: 'ڈاکٹر ایس۔ کے۔ بنرجی',
        adminRole: 'ہسپتال ڈائریکٹر',
        adminSub: 'او پی ڈی ڈائریکٹر • این آئی ایچ کولکتہ',
        sysName: 'آیوش ریگولیٹری آڈیٹر',
        sysRole: 'سسٹم آڈیٹر',
        sysSub: 'وزارت آیوش گیٹ وے',
      },
      DE: {
        docName: 'Dr. Nitin Aggarwal',
        docRole: 'ARZT',
        docSub: 'MD (Hom.) • Hahnemann-Approbiert',
        patName: 'Ramesh Kumar Sharma',
        patRole: 'PATIENT',
        patSub: 'Gesundheits-ID: 91-4829-1049-3829',
        adminName: 'Dr. S. K. Banerjee',
        adminRole: 'KLINIK-ADMIN',
        adminSub: 'Ambulanz-Direktor • NIH Kolkata',
        sysName: 'AYUSH Regulierungs-Auditor',
        sysRole: 'SYSTEM-AUDITOR',
        sysSub: 'Gesundheitsministerium Gateway',
      },
      FR: {
        docName: 'Dr. Nitin Aggarwal',
        docRole: 'MÉDECIN',
        docSub: 'MD (Hom.) • Certifié AYUSH',
        patName: 'Ramesh Kumar Sharma',
        patRole: 'PATIENT',
        patSub: 'ID Santé: 91-4829-1049-3829',
        adminName: 'Dr. S. K. Banerjee',
        adminRole: 'ADMIN HÔPITAL',
        adminSub: 'Directeur OPD • NIH Kolkata',
        sysName: 'Auditeur Réglementaire AYUSH',
        sysRole: 'AUDITEUR SYSTÈME',
        sysSub: 'Portail Ministère AYUSH',
      },
      ES: {
        docName: 'Dr. Nitin Aggarwal',
        docRole: 'MÉDICO',
        docSub: 'MD (Hom.) • Certificado AYUSH',
        patName: 'Ramesh Kumar Sharma',
        patRole: 'PACIENTE',
        patSub: 'ID Salud: 91-4829-1049-3829',
        adminName: 'Dr. S. K. Banerjee',
        adminRole: 'ADMIN HOSPITAL',
        adminSub: 'Director OPD • NIH Kolkata',
        sysName: 'Auditor Regulatorio AYUSH',
        sysRole: 'AUDITOR SISTEMA',
        sysSub: 'Portal Ministerio AYUSH',
      },
      PT: {
        docName: 'Dr. Nitin Aggarwal',
        docRole: 'MÉDICO',
        docSub: 'MD (Hom.) • Certificado AYUSH',
        patName: 'Ramesh Kumar Sharma',
        patRole: 'PACIENTE',
        patSub: 'ID Saúde: 91-4829-1049-3829',
        adminName: 'Dr. S. K. Banerjee',
        adminRole: 'ADMIN HOSPITAL',
        adminSub: 'Diretor OPD • NIH Kolkata',
        sysName: 'Auditor Regulatorio AYUSH',
        sysRole: 'AUDITOR SISTEMA',
        sysSub: 'Portal Ministério AYUSH',
      },
      RU: {
        docName: 'Д-р Нитин Аггарвал',
        docRole: 'ВРАЧ',
        docSub: 'MD (Hom.) • Лицензированный гомеопат',
        patName: 'Рамеш Кумар Шарма',
        patRole: 'ПАЦИЕНТ',
        patSub: 'ID пациента: 91-4829-1049-3829',
        adminName: 'Д-р С. К. Банерджи',
        adminRole: 'АДМИН КЛИНИКИ',
        adminSub: 'Директор амбулатории • NIH Колката',
        sysName: 'Аудитор регулятора AYUSH',
        sysRole: 'АУДИТОР СИСТЕМЫ',
        sysSub: 'Шлюз Министерства AYUSH',
      },
      AR: {
        docName: 'د. نيتين أغاروال',
        docRole: 'طبيب معالج',
        docSub: 'طبيب 동종معالج • معتمد رسمياً',
        patName: 'راميش كومار شارما',
        patRole: 'مريض',
        patSub: 'الهوية الصحية: 91-4829-1049-3829',
        adminName: 'د. س. ك. بانيرجي',
        adminRole: 'مدير المستشفى',
        adminSub: 'مدير العيادات الخارجية • NIH كولكاتا',
        sysName: 'مدقق تدقيق جودة AYUSH',
        sysRole: 'مدقق النظام',
        sysSub: 'بوابة وزارة AYUSH',
      },
    };

    const d = personaMap[code] || {
      docName: 'Dr. Nitin Aggarwal',
      docRole: 'PHYSICIAN',
      docSub: 'MD (Hom.) • CCH-WB-2014-4921',
      patName: 'Ramesh Kumar Sharma',
      patRole: 'PATIENT',
      patSub: 'ABHA: 91-4829-1049-3829',
      adminName: 'Dr. S. K. Banerjee',
      adminRole: 'HOSPITAL ADMIN',
      adminSub: 'OPD Director • NIH Kolkata',
      sysName: 'AYUSH Regulatory Auditor',
      sysRole: 'SYSTEM ADMIN',
      sysSub: 'Ministry of AYUSH Gateway',
    };

    return [
      {
        role: 'PHYSICIAN' as RbacRole,
        roleDisplay: d.docRole,
        name: d.docName,
        sub: d.docSub,
        icon: Stethoscope,
        badgeBg: 'bg-emerald-500/15 border-emerald-500/30',
        badgeText: 'text-emerald-600 dark:text-emerald-400',
        avatarGradient: 'from-emerald-600 to-teal-600',
      },
      {
        role: 'PATIENT' as RbacRole,
        roleDisplay: d.patRole,
        name: d.patName,
        sub: d.patSub,
        icon: User,
        badgeBg: 'bg-cyan-500/15 border-cyan-500/30',
        badgeText: 'text-cyan-600 dark:text-cyan-400',
        avatarGradient: 'from-cyan-600 to-blue-600',
      },
      {
        role: 'HOSPITAL_ADMIN' as RbacRole,
        roleDisplay: d.adminRole,
        name: d.adminName,
        sub: d.adminSub,
        icon: Building2,
        badgeBg: 'bg-purple-500/15 border-purple-500/30',
        badgeText: 'text-purple-600 dark:text-purple-400',
        avatarGradient: 'from-purple-600 to-indigo-600',
      },
      {
        role: 'SYSTEM_ADMIN' as RbacRole,
        roleDisplay: d.sysRole,
        name: d.sysName,
        sub: d.sysSub,
        icon: ShieldAlert,
        badgeBg: 'bg-amber-500/15 border-amber-500/30',
        badgeText: 'text-amber-600 dark:text-amber-400',
        avatarGradient: 'from-amber-600 to-orange-600',
      },
    ];
  };

  const personas = getLocalizedPersonas(langCode);
  const currentPersona =
    personas.find((p) => p.role === currentUser.role) || personas[0];

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const handleSwitchPersona = (role: RbacRole) => {
    switchRole(role);
    if (onSelectTab) {
      if (role === 'PATIENT') onSelectTab('PATIENT_PROFILE');
      if (role === 'PHYSICIAN') onSelectTab('MATRIX_TELEHEALTH');
      if (role === 'HOSPITAL_ADMIN') onSelectTab('HOSPITAL_PROFILE');
    }
    setIsOpen(false);
  };

  return (
    <div
      className="relative font-sans text-xs z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* TOP-RIGHT USER PERSONA BADGE */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center space-x-3 px-3.5 py-2 rounded-xl border transition-all duration-150 transform hover:scale-[1.02] cursor-pointer shadow-sm ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900 hover:border-emerald-500 hover:bg-slate-50'
            : 'bg-[#0B0F19] border-[#1C1F26] text-white hover:border-emerald-500 hover:bg-slate-900'
        }`}
      >
        <div className="relative">
          <div
            className={`w-8 h-8 rounded-xl bg-gradient-to-br ${currentPersona.avatarGradient} flex items-center justify-center text-white font-black text-xs shadow-md`}
          >
            {currentPersona.name.charAt(0)}
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0B0F19] absolute -bottom-0.5 -right-0.5" />
        </div>

        <div className="hidden sm:block text-left">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xs leading-tight tracking-tight">
              {currentPersona.name}
            </span>
            <span
              className={`text-[9px] px-2 py-0.5 rounded-md font-black border uppercase tracking-wider ${currentPersona.badgeBg} ${currentPersona.badgeText}`}
            >
              {currentPersona.roleDisplay}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-gray-400 truncate max-w-[170px] mt-0.5 font-medium">
            {currentPersona.sub}
          </p>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-emerald-500' : ''
          }`}
        />
      </button>

      {/* EXECUTIVE ACCOUNT & PERSONA CONTROLS POPOVER DRAWER */}
      {isOpen && (
        <div
          className={`fixed right-4 sm:right-6 top-[76px] w-88 max-h-[82vh] overflow-y-auto rounded-2xl border p-4 shadow-2xl z-[999999] space-y-4 transition-all ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900 shadow-slate-400/40'
              : 'bg-[#0B0F19] border-[#1C1F26] text-white shadow-black/95'
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* TOP COLLAPSE HEADER TOOLBAR */}
          <div className="flex items-center justify-between border-b pb-2.5 border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {labels.hoverExpandedCollapsible}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-600 dark:text-gray-300 font-black text-[10px] flex items-center space-x-1 cursor-pointer transition-colors"
              title="Click to collapse profile menu"
            >
              <X className="w-3 h-3" />
              <span>{labels.collapseBtn}</span>
            </button>
          </div>

          {/* ACTIVE LOGGED-IN SESSION CARD */}
          <div
            className={`p-3.5 rounded-xl border space-y-2.5 ${
              isLight
                ? 'bg-slate-50 border-slate-200'
                : 'bg-[#05070A] border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-slate-500 dark:text-gray-400 tracking-wider">
                {labels.activeSessionVerification}
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-600 text-white font-black shadow-2xs flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> {labels.abdmSigned}
              </span>
            </div>

            <div className="flex items-center space-x-3 pt-0.5">
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${currentPersona.avatarGradient} flex items-center justify-center text-white font-black text-sm shadow-md flex-shrink-0`}
              >
                {currentPersona.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-xs truncate">{currentPersona.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-gray-400 truncate">
                  {currentPersona.sub}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> {currentPersona.roleDisplay}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* VIEW AS PERSONA SWITCHER SECTION */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-black uppercase text-slate-500 dark:text-gray-400 tracking-wider flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-cyan-500" /> {labels.viewAsPersonaSimulation}
              </span>
            </div>

            <div className="space-y-1.5">
              {personas.map((p) => {
                const Icon = p.icon;
                const isSelected = currentUser.role === p.role;
                return (
                  <button
                    key={p.role}
                    onClick={() => handleSwitchPersona(p.role)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? isLight
                          ? 'border-emerald-500 bg-emerald-50/90 shadow-2xs'
                          : 'border-emerald-500/80 bg-emerald-950/40 shadow-xs'
                        : isLight
                        ? 'border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-800'
                        : 'border-transparent hover:border-slate-800 hover:bg-[#111317] text-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : isLight
                            ? 'bg-slate-100 text-slate-600'
                            : 'bg-slate-800 text-gray-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold truncate">
                            {p.name}
                          </span>
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded font-black border ${p.badgeBg} ${p.badgeText}`}
                          >
                            {p.roleDisplay}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-gray-400 truncate">
                          {p.sub}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* PREFERENCES & CLINIC SETTINGS */}
          <div
            className={`p-3.5 rounded-xl border space-y-3 text-xs ${
              isLight
                ? 'bg-slate-50 border-slate-200'
                : 'bg-[#05070A] border-slate-800'
            }`}
          >
            <span className="text-[10px] font-black uppercase text-slate-500 dark:text-gray-400 block tracking-wider">
              {labels.userPreferencesClinicSettings}
            </span>

            {/* LIGHT / DARK THEME TOGGLE */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700 dark:text-gray-300">
                {labels.visualAppearance}
              </span>
              <button
                onClick={onToggleTheme}
                className={`px-3 py-1.5 rounded-lg border font-bold text-[11px] flex items-center space-x-1.5 cursor-pointer transition-all ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100 shadow-2xs'
                    : 'bg-[#111317] border-slate-700 text-white hover:bg-slate-800'
                }`}
              >
                {isLight ? (
                  <>
                    <Moon className="w-3.5 h-3.5 text-purple-600" />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Light Mode</span>
                  </>
                )}
              </button>
            </div>

            {/* GLOBAL INTERFACE & RUBRIC LANGUAGE SELECTOR */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700 dark:text-gray-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-500" />
                <span>Language / भाषा</span>
              </span>
              <select
                value={langCode}
                onChange={(e) => onSelectLanguage && onSelectLanguage(e.target.value)}
                className={`px-2.5 py-1 rounded-lg border font-bold text-xs cursor-pointer outline-none ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900'
                    : 'bg-[#111317] border-slate-700 text-white'
                }`}
              >
                {ALL_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="text-slate-900">
                    {lang.flag} {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* DEFAULT SIMILLIMUM POTENCY */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700 dark:text-gray-300">
                {labels.defaultRxPotency}
              </span>
              <select
                value={defaultPotency}
                onChange={(e) => setDefaultPotency(e.target.value)}
                className={`px-2.5 py-1 rounded-lg border font-bold text-xs cursor-pointer outline-none ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900'
                    : 'bg-[#111317] border-slate-700 text-white'
                }`}
              >
                <option value="30C">30C (Acute Low)</option>
                <option value="200C (Constitutional)">200C (Constitutional)</option>
                <option value="1M">1M (Deep Neural)</option>
                <option value="LM1">LM1 (Organopathy Water)</option>
              </select>
            </div>
          </div>

          {/* LOGIN & LOGOUT OPTIONS */}
          <div className="flex items-center space-x-2 pt-1">
            <button
              onClick={() => {
                setIsOpen(false);
                setIsLoginModalOpen(true);
              }}
              className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 cursor-pointer border transition-all ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                  : 'bg-[#111317] hover:bg-slate-800 text-gray-200 border-slate-800'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{labels.switchRbacLogin}</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                setIsLoginModalOpen(true);
              }}
              className="py-2.5 px-3.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-bold text-xs flex items-center justify-center space-x-1.5 cursor-pointer transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{labels.logOut}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPersonaHeaderWidget;

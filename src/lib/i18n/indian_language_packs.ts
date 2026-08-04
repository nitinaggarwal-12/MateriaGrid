export type IndianLanguageCode = 'EN' | 'HI' | 'TA' | 'BN' | 'MR' | 'GU';

export interface LanguagePack {
  code: IndianLanguageCode;
  nativeName: string;
  englishName: string;
  labels: {
    topSimillimum: string;
    intake: string;
    decisionGates: string;
    rxSlip: string;
    hot: string;
    chilly: string;
    thirstless: string;
    thirsty: string;
    rightToLeft: string;
    vitalForceStrong: string;
    verifiedAbha: string;
    similiMatrixEngine: string;
    clinicalAnalytics: string;
    aiCopilot: string;
    patientEhr: string;
    materiaMedica: string;
    opdQueue: string;
    pharmacy: string;
    differentialWorkbench: string;
  };
}

export const INDIAN_LANGUAGE_PACKS: Record<IndianLanguageCode, LanguagePack> = {
  EN: {
    code: 'EN',
    nativeName: 'English',
    englishName: 'English',
    labels: {
      topSimillimum: 'Top Simillimum',
      intake: '+ Intake',
      decisionGates: '🔀 Decision Gates',
      rxSlip: 'Rx Slip',
      hot: 'HOT',
      chilly: 'CHILLY',
      thirstless: 'THIRSTLESS',
      thirsty: 'THIRSTY',
      rightToLeft: 'RIGHT-TO-LEFT',
      vitalForceStrong: 'Vital Force: STRONG',
      verifiedAbha: 'VERIFIED',
      similiMatrixEngine: 'SIMILIMATRIX ENGINE',
      clinicalAnalytics: 'Clinical Analytics & Radar',
      aiCopilot: 'AI Clinical Copilot',
      patientEhr: 'Patient EHR & ABHA Database',
      materiaMedica: 'Materia Medica Library',
      opdQueue: 'OPD Waiting Queue & UHI',
      pharmacy: 'Pharmacy & LM Dispensary',
      differentialWorkbench: 'Tri-Remedy Differential Table',
    },
  },
  HI: {
    code: 'HI',
    nativeName: 'हिन्दी',
    englishName: 'Hindi',
    labels: {
      topSimillimum: 'शीर्ष समिलिमम (Simillimum)',
      intake: '+ रोगी केस',
      decisionGates: '🔀 निर्णय द्वार (Gates)',
      rxSlip: 'दवा पर्चा (Rx)',
      hot: 'उष्ण (HOT)',
      chilly: 'शीत (CHILLY)',
      thirstless: 'पिपासाहीन (THIRSTLESS)',
      thirsty: 'प्यासा (THIRSTY)',
      rightToLeft: 'दाएं से बाएं (R->L)',
      vitalForceStrong: 'प्राण शक्ति: प्रबल (STRONG)',
      verifiedAbha: 'सत्यापित ABHA',
      similiMatrixEngine: 'समिलिमैट्रिक्स इंजन',
      clinicalAnalytics: 'क्लिनिकल एनालिटिक्स एवं मियास्म',
      aiCopilot: 'AI क्लिनिकल कोपायलट',
      patientEhr: 'रोगी EHR एवं ABHA डेटाबेस',
      materiaMedica: 'मटेरिया मेडिका पुस्तकालय',
      opdQueue: 'OPD प्रतीक्षा सूची (UHI)',
      pharmacy: 'फार्मेसी एवं LM पोटेंसी स्टॉक',
      differentialWorkbench: 'त्रिकोणीय तुलनात्मक तालिका',
    },
  },
  TA: {
    code: 'TA',
    nativeName: 'தமிழ்',
    englishName: 'Tamil',
    labels: {
      topSimillimum: 'முதன்மை சிமில்லிமம்',
      intake: '+ நோயாளி பதிவு',
      decisionGates: '🔀 முடிவெடுக்கும் கதவுகள்',
      rxSlip: 'மருந்து சீட்டு',
      hot: 'சூடான (HOT)',
      chilly: 'குளிர்ந்த (CHILLY)',
      thirstless: 'தாகமற்ற',
      thirsty: 'தாகமுள்ள',
      rightToLeft: 'வலமிருந்து இடம்',
      vitalForceStrong: 'உயிர் சக்தி: வலுவான',
      verifiedAbha: 'சரிபார்க்கப்பட்டது',
      similiMatrixEngine: 'சிமில்லிமேட்ரிக்ஸ் இயந்திரம்',
      clinicalAnalytics: 'கிளினிக்கல் அனலிட்டிக்ஸ்',
      aiCopilot: 'AI மருத்துவ உதவி',
      patientEhr: 'நோயாளி EHR & ABHA',
      materiaMedica: 'மெட்டீரியா மெடிகா',
      opdQueue: 'OPD காத்திருப்பு வரிசை',
      pharmacy: 'மருந்தகம் & LM போடென்சி',
      differentialWorkbench: 'ஒப்பீட்டு அட்டவணை',
    },
  },
  BN: {
    code: 'BN',
    nativeName: 'বাংলা',
    englishName: 'Bengali',
    labels: {
      topSimillimum: 'শীর্ষ সিমিলিমাম',
      intake: '+ রোগী কেস',
      decisionGates: '🔀 সিদ্ধান্ত দ্বার',
      rxSlip: 'প্রেসক্রিপশন',
      hot: 'গরম (HOT)',
      chilly: 'ঠান্ডা (CHILLY)',
      thirstless: 'তৃষ্ণাহীন',
      thirsty: 'তৃষ্ণার্ত',
      rightToLeft: 'ডান থেকে বাম',
      vitalForceStrong: 'প্রাণ শক্তি: শক্তিশালী',
      verifiedAbha: 'যাচাইকৃত ABHA',
      similiMatrixEngine: 'সিমিলিম্যাট্রিক্স ইঞ্জিন',
      clinicalAnalytics: 'ক্লিনিকাল অ্যানালিটিক্স',
      aiCopilot: 'AI ক্লিনিকাল কোপাইলট',
      patientEhr: 'রোগী EHR ও ABHA',
      materiaMedica: 'মেটেরিয়া মেডিকা',
      opdQueue: 'OPD অপেক্ষমাণ সারি',
      pharmacy: 'ফার্মেসি ও LM পোটেন্সি',
      differentialWorkbench: 'তুলনামূলক টেবিল',
    },
  },
  MR: {
    code: 'MR',
    nativeName: 'मराठी',
    englishName: 'Marathi',
    labels: {
      topSimillimum: 'शीर्ष सिमिलीमम',
      intake: '+ केस नोंदणी',
      decisionGates: '🔀 निर्णयद्वारे',
      rxSlip: 'औषध चिठ्ठी',
      hot: 'उष्ण (HOT)',
      chilly: 'थंड (CHILLY)',
      thirstless: 'तहान नाही',
      thirsty: 'तहानलेला',
      rightToLeft: 'उजवीकडून डावीकडे',
      vitalForceStrong: 'प्राण शक्ती: प्रबळ',
      verifiedAbha: 'सत्यापित ABHA',
      similiMatrixEngine: 'सिमिलीमॅट्रिक्स इंजिन',
      clinicalAnalytics: 'क्लिनिकल ॲनालिटिक्स',
      aiCopilot: 'AI क्लिनिकल सहाय्यक',
      patientEhr: 'रुग्ण EHR व ABHA',
      materiaMedica: 'मटेरिया मेडिका ग्रंथालय',
      opdQueue: 'OPD प्रतीक्षा यादी',
      pharmacy: 'फार्मसी व LM पोटेंसी',
      differentialWorkbench: 'तुलनात्मक तक्ता',
    },
  },
  GU: {
    code: 'GU',
    nativeName: 'ગુજરાતી',
    englishName: 'Gujarati',
    labels: {
      topSimillimum: 'ટોચનું સિમિલીમમ',
      intake: '+ કેસ નોંધણી',
      decisionGates: '🔀 નિર્ણય દ્વાર',
      rxSlip: 'પ્રિસ્ક્રિપ્શન',
      hot: 'ગરમ (HOT)',
      chilly: 'ઠંડુ (CHILLY)',
      thirstless: 'તરસ વગરનું',
      thirsty: 'તરસ્યું',
      rightToLeft: 'જમણેથી ડાબે',
      vitalForceStrong: 'પ્રાણ શક્તિ: મજબૂત',
      verifiedAbha: 'ચકાસાયેલ ABHA',
      similiMatrixEngine: 'સિમિલીમેટ્રિક્સ એન્જિન',
      clinicalAnalytics: 'ક્લિનિકલ એનાલિટિક્સ',
      aiCopilot: 'AI ક્લિનિકલ મદદનીશ',
      patientEhr: 'દર્દી EHR અને ABHA',
      materiaMedica: 'મેટેરિયા મેડિકા',
      opdQueue: 'OPD વેઇટિંગ લીસ્ટ',
      pharmacy: 'ફાર્મસી અને LM પોટેન્સી',
      differentialWorkbench: 'તુલનાત્મક કોષ્ટક',
    },
  },
};

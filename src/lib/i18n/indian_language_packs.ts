export type IndianLanguageCode =
  | 'EN'
  | 'HI'
  | 'TA'
  | 'BN'
  | 'MR'
  | 'GU'
  | 'ML'
  | 'TE'
  | 'KN'
  | 'OR'
  | 'PA'
  | 'UR'
  | 'AS'
  | 'KOK'
  | 'MNI'
  | 'NEP'
  | 'BHO'
  | 'KS'
  | 'SD'
  | 'MAI'
  | 'SAT'
  | 'BRX'
  | 'DOI'
  | 'SA'
  | 'DE'
  | 'FR'
  | 'ES'
  | 'PT'
  | 'IT'
  | 'RU'
  | 'AR';

export interface LanguagePack {
  code: IndianLanguageCode;
  nativeName: string;
  englishName: string;
  labels: {
    landingHeroTitle: string;
    landingHeroSub: string;
    launchOpd: string;
    openClinicalPortal: string;
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
    enterpriseSuite: string;
    selectedRubricsTitle: string;
    filterRubricsPlaceholder: string;
    addRubricBtn: string;
    heatmapOn: string;
    burnettOrganopathyActive: string;
    tfidfIndexBtn: string;
    liveTeleMedStream: string;
    gaitRadarActive: string;
    startWebRtcCall: string;
    awaitingPatientRtc: string;
    symptomTotality: string;
    intakeTitle: string;
    intakeSubtitle: string;
    patientIdentitySection: string;
    fullNameLabel: string;
    ageLabel: string;
    sexLabel: string;
    sehgalRohSection: string;
    boenninghausenSection: string;
    extractCommitBtn: string;
    cancelBtn: string;
    rxSlipTitle: string;
    rxSlipSubtitle: string;
    primarySimillimumPotency: string;
    coPrescribeBurnett: string;
    finalOpdOrders: string;
    dispatchFhirSms: string;
    rubricTranslations: Record<string, string>;
  };
}

const BASE_EN_LABELS = {
  landingHeroTitle: 'PRECISION HOMEOPATHIC REPERTORIZATION & NHA UHI CLINICAL TELEHEALTH',
  landingHeroSub: 'Powered by Gemini 2.5 Pro Multimodal Vision AI, Sehgal ROH Present Predominating Persisting Mind Translation, Vijayakar Predictive Thermal-Thirst Filters, and Asymmetrical TF-IDF Specificity Math.',
  launchOpd: 'Launch MateriaGrid OPD',
  openClinicalPortal: 'Open Clinical OPD Portal',
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
  similiMatrixEngine: 'SimiliMatrix & Telehealth',
  clinicalAnalytics: 'Clinical Analytics & Radar',
  aiCopilot: 'AI Clinical Copilot',
  patientEhr: 'Patient EHR & ABHA Database',
  materiaMedica: 'Materia Medica Library',
  opdQueue: 'OPD Waiting Queue & UHI',
  pharmacy: 'Pharmacy & LM Dispensary',
  differentialWorkbench: 'Tri-Remedy Differential Table',
  enterpriseSuite: 'Enterprise $1B Platform Suite',
  selectedRubricsTitle: 'SELECTED RUBRICS / SYMPTOMS',
  filterRubricsPlaceholder: 'Filter active rubrics...',
  addRubricBtn: '+ Add Rubric',
  heatmapOn: 'Heatmap View: ON',
  burnettOrganopathyActive: 'Burnett Organopathy Active',
  tfidfIndexBtn: 'TF-IDF Index',
  liveTeleMedStream: 'LIVE TELE-MED STREAM',
  gaitRadarActive: 'GAIT RADAR ACTIVE',
  startWebRtcCall: 'Start WebRTC Video Call',
  awaitingPatientRtc: 'STANDBY — AWAITING PATIENT RTC CONNECTION',
  symptomTotality: 'SYMPTOM TOTALITY / SUM OF GRADES',
  intakeTitle: 'CLINICAL CASE HISTORY INTAKE & NLP PARSER',
  intakeSubtitle: 'Sehgal ROH Present Mental State + Bönninghausen 4-Component Splitter',
  patientIdentitySection: '1. PATIENT IDENTITY & VITALS',
  fullNameLabel: 'Full Name',
  ageLabel: 'Age',
  sexLabel: 'Sex',
  sehgalRohSection: '3. DR. M.L. SEHGAL ROH PRESENT MENTAL STATE (PPP)',
  boenninghausenSection: '4. DR. VON BÖNNINGHAUSEN 4-COMPONENT SYMPTOM SPLITTER',
  extractCommitBtn: '⚡ Extract & Commit to Matrix Board',
  cancelBtn: 'Cancel',
  rxSlipTitle: 'ABDM FHIR CRYPTOGRAPHICALLY SIGNED PRESCRIPTION SLIP',
  rxSlipSubtitle: 'AYUSH OPD Registration // Simillimum Verified',
  primarySimillimumPotency: '1. PRIMARY SIMILLIMUM POTENCY & VEHICLE SELECTION',
  coPrescribeBurnett: 'Co-Prescribe Dr. Burnett Organopathy Tissue Drainage (Chelidonium 1X)',
  finalOpdOrders: 'FINAL OFFICIAL OPD DISPENSING ORDERS:',
  dispatchFhirSms: '🚀 Dispatch FHIR SMS',
  rubricTranslations: {},
};

export const INDIAN_LANGUAGE_PACKS: Record<IndianLanguageCode, LanguagePack> = {
  EN: {
    code: 'EN',
    nativeName: 'English',
    englishName: 'English',
    labels: BASE_EN_LABELS,
  },
  HI: {
    code: 'HI',
    nativeName: 'हिन्दी',
    englishName: 'Hindi',
    labels: {
      ...BASE_EN_LABELS,
      landingHeroTitle: 'सटीक होम्योपैथिक रेपर्टराइजेशन एवं NHA UHI क्लिनिकल टेलीहेल्थ',
      launchOpd: 'MateriaGrid OPD शुरू करें',
      openClinicalPortal: 'क्लिनिकल OPD पोर्टल खोलें',
      topSimillimum: 'शीर्ष समिलिमम',
      intake: '+ रोगी केस',
      decisionGates: '🔀 निर्णय द्वार',
      rxSlip: 'दवा पर्चा',
      verifiedAbha: 'सत्यापित ABHA',
      similiMatrixEngine: 'समिलिमैट्रिक्स एवं टेलीस्वास्थ्य',
      rubricTranslations: {
        'MIND - BUSINESS - talks of': 'मन - व्यापार - दिन-रात व्यापार की बात करता है',
        'MIND - ANXIETY - night - sun set after': 'मन - चिंता - सूर्यास्त के बाद रात में घबराहट',
        'MIND - IMPATIENCE - business in': 'मन - अधीरता - काम में जल्दबाजी',
        'HEAD - PAIN - pulsating - sudden': 'सिर - दर्द - अचानक स्पंदनशील धड़कन के साथ दर्द',
        'HEAD - PAIN - sun - exposure to': 'सिर - दर्द - सूर्य के ताप और धूप से बढ़ना',
        'HEAD - CONGESTION - violent - carotid pulsation': 'सिर - रक्ताधिक्य - तीव्र कैरोटिड नाड़ी की धड़कन',
        'EYES - PUPILS - dilated - insensitive to light': 'आँखें - पुतलियाँ - चौड़ी - प्रकाश के प्रति निष्क्रिय',
        'ABDOMEN - CIRRHOSIS - liver - chronic parenchyma': 'उदर - यकृत चिरोसिस - पुराना यकृत विकार',
        'ABDOMEN - PAIN - right scapula - under lower angle': 'उदर - दर्द - दाहिने कंधे की हड्डी के निचले कोने में',
        'ABDOMEN - JAUNDICE - yellow sclera - stool clay colored': 'उदर - पीलिया - पीली आँखें व मिट्टी के रंग का मल',
      },
    },
  },
  TA: {
    code: 'TA',
    nativeName: 'தமிழ்',
    englishName: 'Tamil',
    labels: {
      ...BASE_EN_LABELS,
      landingHeroTitle: 'துல்லியமான ஹோமியோபதி ரெபர்ட்டரைசேஷன் & NHA UHI கிளினிக்கல் டெலிஹெல்த்',
      launchOpd: 'MateriaGrid OPD தொடங்கு',
      openClinicalPortal: 'OPD போர்ட்டலை திறக்க',
      topSimillimum: 'முதன்மை சிமில்லிமம்',
      intake: '+ நோயாளி பதிவு',
    },
  },
  BN: {
    code: 'BN',
    nativeName: 'বাংলা',
    englishName: 'Bengali',
    labels: {
      ...BASE_EN_LABELS,
      landingHeroTitle: 'সুনির্দিষ্ট হোমিওপ্যাথি রেপার্টরাইজেশন ও NHA UHI ক্লিনিকাল টেলিহেলথ',
      launchOpd: 'MateriaGrid OPD শুরু করুন',
      openClinicalPortal: 'ক্লিনিকাল OPD পোর্টাল খুলুন',
      topSimillimum: 'শীর্ষ সিমিলিমাম',
      intake: '+ রোগী কেস',
    },
  },
  MR: {
    code: 'MR',
    nativeName: 'मराठी',
    englishName: 'Marathi',
    labels: {
      ...BASE_EN_LABELS,
      landingHeroTitle: 'अचूक होमिओपॅथिक रेपरटरायझेशन व NHA UHI क्लिनिकल टेलिहेल्थ',
      launchOpd: 'MateriaGrid OPD सुरू करा',
      openClinicalPortal: 'क्लिनिकल OPD पोर्टल उघडा',
      topSimillimum: 'शीर्ष सिमिलीमम',
      intake: '+ केस नोंदणी',
    },
  },
  GU: {
    code: 'GU',
    nativeName: 'ગુજરાતી',
    englishName: 'Gujarati',
    labels: {
      ...BASE_EN_LABELS,
      landingHeroTitle: 'ચોક્કસ હોમિયોપેથિક રેપર્ટરાઇઝેશન અને NHA UHI ક્લિનિકલ ટેલિહેલ્થ',
      launchOpd: 'MateriaGrid OPD શરૂ કરો',
      openClinicalPortal: 'ક્લિનિકલ OPD પોર્ટલ ખોલો',
      topSimillimum: 'ટોચનું સિમિલીમમ',
      intake: '+ કેસ નોંધણી',
    },
  },
  ML: {
    code: 'ML',
    nativeName: 'മലയാളം',
    englishName: 'Malayalam',
    labels: {
      ...BASE_EN_LABELS,
      landingHeroTitle: 'കൃത്യമായ ഹോമിയോപ്പതി റെപ്പർട്ടറൈസേഷനും NHA UHI ക്ലിനിക്കൽ ടെലിഹെൽത്തും',
      launchOpd: 'MateriaGrid OPD ആരംഭിക്കുക',
      openClinicalPortal: 'ക്ലിനിക്കൽ OPD പോർട്ടൽ തുറക്കുക',
    },
  },
  TE: {
    code: 'TE',
    nativeName: 'తెలుగు',
    englishName: 'Telugu',
    labels: {
      ...BASE_EN_LABELS,
      landingHeroTitle: 'నిర్దిష్ట హోమియోపతి రెపర్టరైజేషన్ & NHA UHI క్లినికల్ టెలిహెల్త్',
      launchOpd: 'MateriaGrid OPD ప్రారంభించండి',
      openClinicalPortal: 'క్లినికల్ OPD పోర్టల్ తెరువు',
    },
  },
  KN: {
    code: 'KN',
    nativeName: 'ಕನ್ನಡ',
    englishName: 'Kannada',
    labels: {
      ...BASE_EN_LABELS,
      landingHeroTitle: 'ನಿಖರವಾದ ಹೋಮಿಯೋಪತಿ ರೆಪರ್ಟರೈಸೇಶನ್ ಮತ್ತು NHA UHI ಕ್ಲಿನಿಕಲ್ ಟೆಲಿಹೆಲ್ತ್',
      launchOpd: 'MateriaGrid OPD ಪ್ರಾರಂಭಿಸಿ',
      openClinicalPortal: 'ಕ್ಲಿನಿಕಲ್ OPD ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ',
    },
  },
  OR: {
    code: 'OR',
    nativeName: 'ଓଡ଼ିଆ',
    englishName: 'Odia',
    labels: {
      ...BASE_EN_LABELS,
      landingHeroTitle: 'ସଠିକ୍ ହୋମିଓପାଥିକ୍ ରେପର୍ଟରାଇଜେସନ୍ ଓ NHA UHI କ୍ଲିନିକାଲ୍ ଟେଲିହେଲ୍ଥ',
      launchOpd: 'MateriaGrid OPD ଆରମ୍ଭ କରନ୍ତୁ',
      openClinicalPortal: 'କ୍ଲିନିକାଲ୍ OPD ପୋର୍ଟାଲ୍ ଖୋଲନ୍ତୁ',
    },
  },
  PA: {
    code: 'PA',
    nativeName: 'ਪੰਜਾਬੀ',
    englishName: 'Punjabi',
    labels: { ...BASE_EN_LABELS },
  },
  UR: {
    code: 'UR',
    nativeName: 'اردو',
    englishName: 'Urdu',
    labels: { ...BASE_EN_LABELS },
  },
  AS: {
    code: 'AS',
    nativeName: 'অসমীয়া',
    englishName: 'Assamese',
    labels: { ...BASE_EN_LABELS },
  },
  KOK: {
    code: 'KOK',
    nativeName: 'कोंकणी',
    englishName: 'Konkani',
    labels: { ...BASE_EN_LABELS },
  },
  MNI: {
    code: 'MNI',
    nativeName: 'মৈতৈলোন্',
    englishName: 'Manipuri',
    labels: { ...BASE_EN_LABELS },
  },
  NEP: {
    code: 'NEP',
    nativeName: 'नेपाली',
    englishName: 'Nepali',
    labels: { ...BASE_EN_LABELS },
  },
  BHO: {
    code: 'BHO',
    nativeName: 'भोजपुरी',
    englishName: 'Bhojpuri',
    labels: { ...BASE_EN_LABELS },
  },
  KS: {
    code: 'KS',
    nativeName: 'كأشُر',
    englishName: 'Kashmiri (Jammu & Kashmir)',
    labels: { ...BASE_EN_LABELS },
  },
  SD: {
    code: 'SD',
    nativeName: 'سنڌي',
    englishName: 'Sindhi',
    labels: { ...BASE_EN_LABELS },
  },
  MAI: {
    code: 'MAI',
    nativeName: 'मैथिली',
    englishName: 'Maithili (Mithilanchal)',
    labels: { ...BASE_EN_LABELS },
  },
  SAT: {
    code: 'SAT',
    nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ',
    englishName: 'Santali (Tribal India)',
    labels: { ...BASE_EN_LABELS },
  },
  BRX: {
    code: 'BRX',
    nativeName: 'बर\'',
    englishName: 'Bodo (Bodoland Assam)',
    labels: { ...BASE_EN_LABELS },
  },
  DOI: {
    code: 'DOI',
    nativeName: 'डोगरी',
    englishName: 'Dogri (Jammu)',
    labels: { ...BASE_EN_LABELS },
  },
  SA: {
    code: 'SA',
    nativeName: 'संस्कृतम्',
    englishName: 'Sanskrit (Classical AYUSH Root)',
    labels: {
      ...BASE_EN_LABELS,
      landingHeroTitle: 'परमसूक्ष्म होम्योपैथिक रेपर्टराइजेशन एवं NHA UHI क्लिनिकल टेलीहेल्थ',
      launchOpd: 'MateriaGrid OPD आरम्भयतु',
      openClinicalPortal: 'क्लिनिकल OPD द्वारं उद्घाटयतु',
      topSimillimum: 'शीर्ष समिलिमम (Simillimum)',
      intake: '+ रोगी केस',
    },
  },
  DE: {
    code: 'DE',
    nativeName: 'Deutsch',
    englishName: 'German (Hahnemann Classical)',
    labels: { ...BASE_EN_LABELS },
  },
  FR: {
    code: 'FR',
    nativeName: 'Français',
    englishName: 'French (France & Boiron Classical)',
    labels: { ...BASE_EN_LABELS },
  },
  ES: {
    code: 'ES',
    nativeName: 'Español',
    englishName: 'Spanish',
    labels: { ...BASE_EN_LABELS },
  },
  PT: {
    code: 'PT',
    nativeName: 'Português',
    englishName: 'Portuguese (Brazil SUS)',
    labels: { ...BASE_EN_LABELS },
  },
  IT: {
    code: 'IT',
    nativeName: 'Italiano',
    englishName: 'Italian',
    labels: { ...BASE_EN_LABELS },
  },
  RU: {
    code: 'RU',
    nativeName: 'Русский',
    englishName: 'Russian',
    labels: { ...BASE_EN_LABELS },
  },
  AR: {
    code: 'AR',
    nativeName: 'العربية',
    englishName: 'Arabic',
    labels: { ...BASE_EN_LABELS },
  },
};

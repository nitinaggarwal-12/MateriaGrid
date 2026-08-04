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
  | 'RAJ'
  | 'CHH'
  | 'HAR'
  | 'TCY'
  | 'GBR'
  | 'KUM'
  | 'MAG'
  | 'MIZ'
  | 'KHA'
  | 'GRT'
  | 'NAG'
  | 'LBJ'
  | 'KFV'
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
    patientProfile: string;
    doctorProfile: string;
    hospitalProfile: string;
    supportHelp: string;
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
  patientProfile: 'Patient Profile & ABHA',
  doctorProfile: 'Physician Credentials',
  hospitalProfile: 'Hospital & OPD Fleet',
  supportHelp: '24/7 Support & WhatsApp',
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
  EN: { code: 'EN', nativeName: 'English', englishName: 'English', labels: BASE_EN_LABELS },
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
      patientProfile: 'रोगी प्रोफ़ाइल एवं ABHA',
      doctorProfile: 'चिकित्सक साख एवं AYUSH',
      hospitalProfile: 'अस्पताल एवं OPD फ़्लीट',
      supportHelp: '24/7 सहायता एवं व्हाट्सऐप्प',
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
      decisionGates: '🔀 முடிவெடுக்கும் கதவுகள்',
      rxSlip: 'மருந்து சீட்டு',
      verifiedAbha: 'சரிபார்க்கப்பட்டது',
      similiMatrixEngine: 'சிமில்லிமேட்ரிக்ஸ் & டெலிஹெல்த்',
      opdQueue: 'OPD காத்திருப்பு வரிசை',
      pharmacy: 'மருந்தகம் & LM போடென்சி',
      differentialWorkbench: 'ஒப்பீட்டு அட்டவணை',
      patientProfile: 'நோயாளி சுயவிவரம் & ABHA',
      doctorProfile: 'மருத்துவர் சான்றுகள்',
      hospitalProfile: 'மருத்துவமனை & OPD நெட்வொர்க்',
      supportHelp: '24/7 உதவி & வாட்ஸ்அப்',
      rubricTranslations: {
        'MIND - BUSINESS - talks of': 'மனம் - வியாபாரம் - இரவும் பகலும் வியாபாரம் பேசுகிறார்',
        'MIND - ANXIETY - night - sun set after': 'மனம் - கவலை - சூரிய அஸ்தமனத்திற்குப் பிறகு இரவில் பதற்றம்',
        'MIND - IMPATIENCE - business in': 'மனம் - அவசரம் - வேலையில் அவசரம்',
        'HEAD - PAIN - pulsating - sudden': 'தலை - வலி - திடீர் துடிக்கும் வலி',
        'HEAD - PAIN - sun - exposure to': 'தலை - வலி - வெயில் மற்றும் சூரிய வெப்பத்தால் அதிகரிப்பு',
        'HEAD - CONGESTION - violent - carotid pulsation': 'தலை - ரத்த ஓட்டம் - கரோடிட் நாடி தீவிர துடிப்பு',
        'EYES - PUPILS - dilated - insensitive to light': 'கண்கள் - கண்மணி - விரிவடைந்தது - வெளிச்சத்தில் மாற்றம் இல்லை',
        'ABDOMEN - CIRRHOSIS - liver - chronic parenchyma': 'வயிறு - கல்லீரல் சுருக்கம் - நாள்பட்ட கல்லீரல் நோய்',
        'ABDOMEN - PAIN - right scapula - under lower angle': 'வயிறு - வலி - வலது தோள்பட்டை எலும்பின் கீழ்',
        'ABDOMEN - JAUNDICE - yellow sclera - stool clay colored': 'வயிறு - மஞ்சள் காமாலை - மஞ்சள் கண் & களிமண் மலம',
      },
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
      decisionGates: '🔀 সিদ্ধান্ত দ্বার',
      rxSlip: 'প্রেসক্রিপশন',
      verifiedAbha: 'যাচাইকৃত ABHA',
      similiMatrixEngine: 'সিমিলিম্যাট্রিক্স ও টেলিহেলথ',
      patientProfile: 'রোগী প্রোফাইল ও ABHA',
      doctorProfile: 'চিকিৎসক শংসাপত্র',
      hospitalProfile: 'হাসপাতাল ও OPD নেটওয়ার্ক',
      supportHelp: '২৪/৭ সহায়তা ও হোয়াটসঅ্যাপ',
      rubricTranslations: {
        'MIND - BUSINESS - talks of': 'মন - ব্যবসা - দিনরাত ব্যবসার কথা বলে',
        'MIND - ANXIETY - night - sun set after': 'মন - উদ্বেগ - সূর্যাস্তের পর রাতে ভয় ও উদ্বেগ',
        'HEAD - PAIN - pulsating - sudden': 'মাথা - ব্যথা - হঠাৎ তীব্র স্পন্দনশীল ব্যথা',
      },
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
      decisionGates: '🔀 निर्णयद्वारे',
      rxSlip: 'औषध चिठ्ठी',
      verifiedAbha: 'सत्यापित ABHA',
      similiMatrixEngine: 'सिमिलीमॅट्रिक्स व टेलिहेल्थ',
      patientProfile: 'रुग्ण प्रोफाइल व ABHA',
      doctorProfile: 'डॉक्टर प्रमाणपत्रे',
      hospitalProfile: 'रुग्णालय व OPD नेटवर्क',
      supportHelp: '२४/७ मदत व व्हॉट्सॲप',
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
      decisionGates: '🔀 નિર્ણય દ્વાર',
      rxSlip: 'પ્રિસ્ક્રિપ્શન',
      verifiedAbha: 'ચકાસાયેલ ABHA',
      similiMatrixEngine: 'સિમિલીમેટ્રિક્સ અને ટેલિહેલ્થ',
      patientProfile: 'દર્દી પ્રોફાઇલ અને ABHA',
      doctorProfile: 'ડોક્ટર લાયકાત',
      hospitalProfile: 'હોસ્પિટલ અને OPD ફ્લીટ',
      supportHelp: '24/7 સપોર્ટ અને વોટ્સએપ',
    },
  },
  ML: { code: 'ML', nativeName: 'മലയാളം', englishName: 'Malayalam', labels: BASE_EN_LABELS },
  TE: { code: 'TE', nativeName: 'తెలుగు', englishName: 'Telugu', labels: BASE_EN_LABELS },
  KN: { code: 'KN', nativeName: 'ಕನ್ನಡ', englishName: 'Kannada', labels: BASE_EN_LABELS },
  OR: { code: 'OR', nativeName: 'ଓଡ଼ିଆ', englishName: 'Odia', labels: BASE_EN_LABELS },
  PA: { code: 'PA', nativeName: 'ਪੰਜਾਬੀ', englishName: 'Punjabi', labels: BASE_EN_LABELS },
  UR: { code: 'UR', nativeName: 'اردو', englishName: 'Urdu', labels: BASE_EN_LABELS },
  AS: { code: 'AS', nativeName: 'অসমীয়া', englishName: 'Assamese', labels: BASE_EN_LABELS },
  KOK: { code: 'KOK', nativeName: 'कोंकणी', englishName: 'Konkani', labels: BASE_EN_LABELS },
  MNI: { code: 'MNI', nativeName: 'মৈতৈলোন্', englishName: 'Manipuri', labels: BASE_EN_LABELS },
  NEP: { code: 'NEP', nativeName: 'नेपाली', englishName: 'Nepali', labels: BASE_EN_LABELS },
  BHO: { code: 'BHO', nativeName: 'भोजपुरी', englishName: 'Bhojpuri', labels: BASE_EN_LABELS },
  RAJ: { code: 'RAJ', nativeName: 'मारवाड़ी', englishName: 'Marwari', labels: BASE_EN_LABELS },
  CHH: { code: 'CHH', nativeName: 'छत्तीसगढ़ी', englishName: 'Chhattisgarhi', labels: BASE_EN_LABELS },
  HAR: { code: 'HAR', nativeName: 'हरियाणवी', englishName: 'Haryanvi', labels: BASE_EN_LABELS },
  TCY: { code: 'TCY', nativeName: 'ತುಳು', englishName: 'Tulu', labels: BASE_EN_LABELS },
  GBR: { code: 'GBR', nativeName: 'गढ़वाली', englishName: 'Garhwali', labels: BASE_EN_LABELS },
  KUM: { code: 'KUM', nativeName: 'कुमाऊँनी', englishName: 'Kumaoni', labels: BASE_EN_LABELS },
  MAG: { code: 'MAG', nativeName: 'मगही', englishName: 'Magahi', labels: BASE_EN_LABELS },
  MIZ: { code: 'MIZ', nativeName: 'Mizo', englishName: 'Mizo', labels: BASE_EN_LABELS },
  KHA: { code: 'KHA', nativeName: 'Khasi', englishName: 'Khasi', labels: BASE_EN_LABELS },
  GRT: { code: 'GRT', nativeName: 'Garo', englishName: 'Garo', labels: BASE_EN_LABELS },
  NAG: { code: 'NAG', nativeName: 'Nagamese', englishName: 'Nagamese', labels: BASE_EN_LABELS },
  LBJ: { code: 'LBJ', nativeName: 'ལ་དྭགས་སྐད།', englishName: 'Ladakhi', labels: BASE_EN_LABELS },
  KFV: { code: 'KFV', nativeName: 'కొడవ තක්ක්', englishName: 'Kodava', labels: BASE_EN_LABELS },
  KS: { code: 'KS', nativeName: 'كأشُر', englishName: 'Kashmiri', labels: BASE_EN_LABELS },
  SD: { code: 'SD', nativeName: 'سنڌي', englishName: 'Sindhi', labels: BASE_EN_LABELS },
  MAI: { code: 'MAI', nativeName: 'मैथिली', englishName: 'Maithili', labels: BASE_EN_LABELS },
  SAT: { code: 'SAT', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ', englishName: 'Santali', labels: BASE_EN_LABELS },
  BRX: { code: 'BRX', nativeName: 'बर\'', englishName: 'Bodo', labels: BASE_EN_LABELS },
  DOI: { code: 'DOI', nativeName: 'डोगरी', englishName: 'Dogri', labels: BASE_EN_LABELS },
  SA: { code: 'SA', nativeName: 'संस्कृतम्', englishName: 'Sanskrit', labels: BASE_EN_LABELS },
  DE: { code: 'DE', nativeName: 'Deutsch', englishName: 'German', labels: BASE_EN_LABELS },
  FR: { code: 'FR', nativeName: 'Français', englishName: 'French', labels: BASE_EN_LABELS },
  ES: { code: 'ES', nativeName: 'Español', englishName: 'Spanish', labels: BASE_EN_LABELS },
  PT: { code: 'PT', nativeName: 'Português', englishName: 'Portuguese', labels: BASE_EN_LABELS },
  IT: { code: 'IT', nativeName: 'Italiano', englishName: 'Italian', labels: BASE_EN_LABELS },
  RU: { code: 'RU', nativeName: 'Русский', englishName: 'Russian', labels: BASE_EN_LABELS },
  AR: { code: 'AR', nativeName: 'العربية', englishName: 'Arabic', labels: BASE_EN_LABELS },
};

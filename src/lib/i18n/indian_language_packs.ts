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
  | 'DE'
  | 'ES';

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
      clinicalAnalytics: 'क्लिनिकल एनालिटिक्स एवं मियास्म',
      aiCopilot: 'AI क्लिनिकल कोपायलट',
      patientEhr: 'रोगी EHR एवं ABHA डेटाबेस',
      materiaMedica: 'मटेरिया मेडिका पुस्तकालय',
      opdQueue: 'OPD प्रतीक्षा सूची एवं UHI',
      pharmacy: 'फार्मेसी एवं LM पोटेंसी स्टॉक',
      differentialWorkbench: 'त्रिकोणीय तुलनात्मक तालिका',
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
        'EXTREMITIES - PAIN - motion - beginning of - on': 'अंग - दर्द - चलने या हिलने की शुरुआत में अधिक',
        'EXTREMITIES - PAIN - stitching - slightest motion aggravates': 'अंग - दर्द - सुई चुभने जैसा - जरा से हिलने से वृद्धि',
        'THROAT - PAIN - swallowing - liquids aggravates': 'गला - दर्द - निगलने में - तरल पदार्थ से दर्द बढ़ना',
        'STOMACH - THIRST - large quantities - infrequent': 'अमाशय - प्यास - अधिक मात्रा में पानी - कभी-कभी',
        'STOMACH - THIRSTLESS - fever during': 'अमाशय - पिपासाहीन - बुखार के दौरान प्यास न लगना',
        'SKIN - ERUPTIONS - vesicular - bluish - itching': 'त्वचा - दाने - नीले रंग के छाले - खुजली के साथ',
        'SKIN - ERUPTIONS - scaly - dry - silvery scales': 'त्वचा - दाने - सूखी पपड़ीदार चाँदी जैसी परत',
        'GENERALITIES - SLEEP - position - knee-chest position': 'सामान्य - नींद - घुटना-छाती स्थिति में सोना',
        'GENERALITIES - HEAT - flushes of - sudden': 'सामान्य - गर्मी - अचानक चेहरे पर गर्मी के थपेड़े',
        'GENERALITIES - AGGRAVATION - 3 pm to 4 pm': 'सामान्य - दर्द बढ़ना - दोपहर 3 से 4 बजे के बीच',
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
      topSimillimum: 'പ്രധാന സിമില്ലിമം',
      intake: '+ രോഗി രജിസ്ട്രേഷൻ',
      decisionGates: '🔀 തീരുമാന ഗേറ്റുകൾ',
      rxSlip: 'മരുന്ന് കുറിപ്പ്',
      verifiedAbha: 'സ്ഥിരീകരിച്ച ABHA',
      similiMatrixEngine: 'സിമില്ലിമാട്രിക്സ് & ടെലിഹെൽത്ത്',
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
      topSimillimum: 'ప్రధాన సిమిల్లిమమ్',
      intake: '+ రోగి కేస్',
      decisionGates: '🔀 నిర్ణయ ద్వారాలు',
      rxSlip: 'మందుల చీటీ',
      verifiedAbha: 'ధృవీకరించబడిన ABHA',
      similiMatrixEngine: 'సిమిల్లిమాట్రిక్స్ & టెలిహెల్త్',
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
      topSimillimum: 'ಮುಖ್ಯ ಸಿಮಿಲ್ಲಿಮಮ್',
      intake: '+ ರೋಗಿ ನೋಂದಣಿ',
      decisionGates: '🔀 ನಿರ್ಣಯ ದ್ವಾರಗಳು',
      rxSlip: 'ಔಷಧ ಚೀಟಿ',
      verifiedAbha: 'ದೃಢೀಕೃತ ABHA',
      similiMatrixEngine: 'ಸಿಮಿಲ್ಲಿಮ್ಯಾಟ್ರಿಕ್ಸ್ & ಟೆಲಿಹೆಲ್ತ್',
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
      topSimillimum: 'ଶୀର୍ଷ ସିମିଲିମମ୍',
      intake: '+ ରୋଗୀ କେସ୍',
      decisionGates: '🔀 ନିର୍ଣ୍ଣୟ ଦ୍ୱାର',
      rxSlip: 'ଔଷଧ ଚିଠା',
      verifiedAbha: 'ଯାଞ୍ଚିତ ABHA',
      similiMatrixEngine: 'ସିମିଲିମାଟ୍ରିକ୍ସ ଓ ଟେଲିହେଲ୍ଥ',
    },
  },
  PA: {
    code: 'PA',
    nativeName: 'ਪੰਜਾਬੀ',
    englishName: 'Punjabi',
    labels: {
      ...BASE_EN_LABELS,
      landingHeroTitle: 'ਸਟੀਕ ਹੋਮਿਓਪੈਥਿਕ ਰੇਪਰਟਰਾਈਜ਼ੇਸ਼ਨ ਅਤੇ NHA UHI ਕਲੀਨਿਕਲ ਟੈਲੀਹੈਲਥ',
      launchOpd: 'MateriaGrid OPD ਸ਼ੁਰੂ ਕਰੋ',
      openClinicalPortal: 'ਕਲੀਨਿਕਲ OPD ਪੋਰਟਲ ਖੋਲ੍ਹੋ',
      topSimillimum: 'ਸਿਖਰਲਾ ਸਿਮਿਲਿਮਮ',
      intake: '+ ਮਰੀਜ਼ ਕੇਸ',
      decisionGates: '🔀 ਫੈਸਲਾ ਦੁਆਰ',
      rxSlip: 'ਦਵਾਈ ਪਰਚੀ',
      verifiedAbha: 'ਪ੍ਰਮਾਣਿਤ ABHA',
      similiMatrixEngine: 'ਸਿਮਿਲਿਮੈਟ੍ਰਿਕਸ ਅਤੇ ਟੈਲੀਹੈਲਥ',
    },
  },
  UR: {
    code: 'UR',
    nativeName: 'اردو',
    englishName: 'Urdu',
    labels: {
      ...BASE_EN_LABELS,
      landingHeroTitle: 'سائنسی ہومیوپیتھک ریپرٹرائزیشن اور NHA UHI کلینیکل ٹیلی ہیلتھ',
      launchOpd: 'MateriaGrid OPD شروع کریں',
      openClinicalPortal: 'کلینیکل OPD پورٹل کھولیں',
      topSimillimum: 'سیملیمم (Simillimum)',
      intake: '+ مریض کیس',
      decisionGates: '🔀 فیصلہ کے ابواب',
      rxSlip: 'نسخہ (Rx)',
      verifiedAbha: 'تصدیق شدہ ABHA',
      similiMatrixEngine: 'سیملی میٹرکس اور ٹیلی ہیلتھ',
    },
  },
  AS: {
    code: 'AS',
    nativeName: 'অসমীয়া',
    englishName: 'Assamese (Assam & North-East)',
    labels: {
      ...BASE_EN_LABELS,
      landingHeroTitle: 'ସଠିକ୍ ହୋମିଓପାଥିକ୍ ରେପର୍ଟରାଇଜେସନ୍ ଓ NHA UHI କ୍ଲିନିକାଲ୍ ଟେଲିହେଲ୍ଥ',
      landingHeroSub: 'Gemini 2.5 Pro মাল্টিমোডেল ভিশন AI আৰু Sehgal ROH মানসিক স্থিতি অনুবাদৰ দ্বাৰা পৰিচালিত।',
      launchOpd: 'MateriaGrid OPD আৰম্ভ কৰক',
      openClinicalPortal: 'ক্লিনিকাল OPD পোৰ্টেল খোলক',
      topSimillimum: 'শীৰ্ষ চি মিলিমাম',
      intake: '+ ৰোগী কেছ',
      decisionGates: '🔀 সিদ্ধান্ত দ্বাৰ',
      rxSlip: 'প্ৰেছক্ৰিপচন',
      verifiedAbha: 'સચોટ ABHA',
      similiMatrixEngine: 'চি মিলিম্যাট্ৰিক্স আৰু টেলিস্বাস্থ্য',
    },
  },
  KOK: {
    code: 'KOK',
    nativeName: 'कोंकणी',
    englishName: 'Konkani (Goa & Coastal Karnataka)',
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
    },
  },
  MNI: {
    code: 'MNI',
    nativeName: 'মৈতৈলোন্',
    englishName: 'Manipuri / Meiteilon (Manipur)',
    labels: {
      ...BASE_EN_LABELS,
      landingHeroTitle: 'PRECISION HOMEOPATHIC REPERTORIZATION & NHA UHI CLINICAL TELEHEALTH',
      launchOpd: 'MateriaGrid OPD হৌদোকউ',
      openClinicalPortal: 'OPD પોર્ટેલ હાংদোকউ',
      topSimillimum: 'Top Simillimum',
      intake: '+ পেশেন্ত কেস',
      decisionGates: '🔀 Decision Gates',
      rxSlip: 'Rx Slip',
      verifiedAbha: 'VERIFIED ABHA',
      similiMatrixEngine: 'SimiliMatrix & Telehealth',
    },
  },
  NEP: {
    code: 'NEP',
    nativeName: 'नेपाली',
    englishName: 'Nepali (Sikkim & Himalayan Belt)',
    labels: {
      ...BASE_EN_LABELS,
      landingHeroTitle: 'सटीक होम्योपैथिक रेपर्टराइजेशन एवं NHA UHI क्लिनिकल टेलीहेल्थ',
      launchOpd: 'MateriaGrid OPD सुरु गर्नुहोस्',
      openClinicalPortal: 'क्लिनिकल OPD पोर्टल खोल्नुहोस्',
      topSimillimum: 'शीर्ष समिलिमम',
      intake: '+ बिरामी केस',
      decisionGates: '🔀 निर्णय द्वार',
      rxSlip: 'औषधि पर्चा',
      verifiedAbha: 'सत्यापित ABHA',
      similiMatrixEngine: 'समिलिमैट्रिक्स एवं टेलीस्वास्थ्य',
    },
  },
  DE: {
    code: 'DE',
    nativeName: 'Deutsch',
    englishName: 'German (Hahnemann Classical)',
    labels: {
      ...BASE_EN_LABELS,
      landingHeroTitle: 'PRÄZISIONS-HOMÖOPATHISCHE REPERTORISATION & NHA UHI CLINICAL TELEHEALTH',
      landingHeroSub: 'Basiert auf Samuel Hahnemanns Organon der Heilkunst, Sehgal ROH Geistessymptomen und Asymmetrischer TF-IDF Mathematischer Spezifität.',
      launchOpd: 'MateriaGrid OPD Starten',
      openClinicalPortal: 'Klinisches OPD Portal Öffnen',
      topSimillimum: 'Top Simillimum',
      intake: '+ Patientenaufnahme',
      decisionGates: '🔀 Entscheidungstore',
      rxSlip: 'Rezept / Dispensiervorlage',
      verifiedAbha: 'VERIFIZIERT',
      similiMatrixEngine: 'SimiliMatrix & Telemedizin',
      clinicalAnalytics: 'Klinische Analytik & Radar',
      aiCopilot: 'KI Klinischer Kopilot',
      patientEhr: 'Patienten EHR & ABHA Datenbank',
      materiaMedica: 'Materia Medica Bibliothek (Organon)',
      opdQueue: 'OPD Warteschlange & UHI',
      pharmacy: 'Apotheke & LM-Potenzen (Q-Potenzen)',
      differentialWorkbench: 'Differential-Diagnostik Tabelle',
    },
  },
  ES: {
    code: 'ES',
    nativeName: 'Español',
    englishName: 'Spanish (Latin America & Spain)',
    labels: {
      ...BASE_EN_LABELS,
      landingHeroTitle: 'REPERTORIZACIÓN HOMOPÁTICA DE PRECISIÓN Y TELESALUD CLÍNICA NHA UHI',
      launchOpd: 'Iniciar MateriaGrid OPD',
      openClinicalPortal: 'Abrir Portal Clínico OPD',
      topSimillimum: 'Top Simillimum',
      intake: '+ Caso Clínico',
      decisionGates: '🔀 Puertas de Decisión',
      rxSlip: 'Receta Médica',
      verifiedAbha: 'VERIFICADO',
      similiMatrixEngine: 'SimiliMatrix y Telesalud',
      clinicalAnalytics: 'Analítica Clínica y Radar',
      aiCopilot: 'AI Copiloto Clínico',
      patientEhr: 'EHR del Paciente y ABDM',
      materiaMedica: 'Biblioteca Materia Médica',
      opdQueue: 'Cola OPD e UHI',
      pharmacy: 'Farmacia y Potencias LM',
      differentialWorkbench: 'Tabla Comparativa Diferencial',
    },
  },
};

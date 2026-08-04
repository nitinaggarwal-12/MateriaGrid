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
    similiMatrixSub: string;
    clinicalAnalytics: string;
    clinicalAnalyticsSub: string;
    aiCopilot: string;
    aiCopilotSub: string;
    aiDiagnosticLab: string;
    aiDiagnosticLabSub: string;
    patientEhr: string;
    materiaMedica: string;
    materiaMedicaSub: string;
    clinicalAcademy: string;
    clinicalAcademySub: string;
    ayushResearchHub: string;
    ayushResearchHubSub: string;
    discussionBlogs: string;
    discussionBlogsSub: string;
    opdQueue: string;
    opdQueueSub: string;
    pharmacy: string;
    pharmacySub: string;
    differentialWorkbench: string;
    differentialWorkbenchSub: string;
    enterpriseSuite: string;
    enterpriseSuiteSub: string;
    patientProfile: string;
    patientProfileSub: string;
    patientRepository: string;
    patientRepositorySub: string;
    doctorProfile: string;
    doctorProfileSub: string;
    hospitalProfile: string;
    hospitalProfileSub: string;
    supportHelp: string;
    supportHelpSub: string;
    opdCareSuite: string;
    aiAnalyticsSuite: string;
    materiaMedicaAcademySuite: string;
    clinicAdminEnterpriseSuite: string;
    opdQueueManagerTitle: string;
    opdQueueManagerSub: string;
    checkInWalkInPatient: string;
    physicalOpdTokenQueue: string;
    inOpdCabin: string;
    callToken: string;
    hoverExpandedCollapsible: string;
    activeSessionVerification: string;
    viewAsPersonaSimulation: string;
    userPreferencesClinicSettings: string;
    visualAppearance: string;
    defaultRxPotency: string;
    switchRbacLogin: string;
    logOut: string;
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
  similiMatrixSub: 'SimiliMatrix Grid & Video OPD',
  clinicalAnalytics: 'Clinical Analytics & Radar',
  clinicalAnalyticsSub: 'Miasmatic & Layer Vectors',
  aiCopilot: 'AI Clinical Copilot',
  aiCopilotSub: 'Gemini 2.5 Pro Differential',
  aiDiagnosticLab: 'AI Diagnostic Lab & OCR',
  aiDiagnosticLabSub: 'Lesion, Blood OCR & Gait',
  patientEhr: 'Patient EHR & ABHA Database',
  materiaMedica: 'Materia Medica Library',
  materiaMedicaSub: 'Allen & Boericke Reference',
  clinicalAcademy: 'BHMS & MD Clinical Academy',
  clinicalAcademySub: '360° Anatomy & Viva Exam',
  ayushResearchHub: 'AYUSH Clinical Research Hub',
  ayushResearchHubSub: 'Peer-Reviewed Case Studies',
  discussionBlogs: 'Clinical Discussion Blogs',
  discussionBlogsSub: 'ROH & Burnett Practitioner Q&A',
  opdQueue: 'OPD Waiting Queue & UHI',
  opdQueueSub: 'Waiting Room & Video Slots',
  pharmacy: 'Pharmacy & LM Dispensary',
  pharmacySub: 'Classical Liquid Potency Stock',
  differentialWorkbench: 'Tri-Remedy Differential Table',
  differentialWorkbenchSub: 'Comparative Modality Grid',
  enterpriseSuite: 'Enterprise Platform Suite',
  enterpriseSuiteSub: 'Hospital Fleet & ABDM Billing',
  patientProfile: 'ABHA Patient Identity & Health Locker',
  patientProfileSub: 'ABDM Health Locker & Profile',
  patientRepository: 'Longitudinal Case Chain & Audit Ledger',
  patientRepositorySub: 'Tamper-Proof Longitudinal Visit Chain',
  doctorProfile: 'Physician Credentials',
  doctorProfileSub: 'AYUSH Registration & License',
  hospitalProfile: 'Hospital & OPD Fleet',
  hospitalProfileSub: 'Department & Token Flow',
  supportHelp: '24/7 Support & WhatsApp',
  supportHelpSub: 'Clinical Desk Help',
  opdCareSuite: 'OPD & PATIENT CARE SUITE',
  aiAnalyticsSuite: 'AI DIFFERENTIAL & ANALYTICS',
  materiaMedicaAcademySuite: 'MATERIA MEDICA & ACADEMY',
  clinicAdminEnterpriseSuite: 'CLINIC ADMIN & ENTERPRISE',
  opdQueueManagerTitle: 'OPD WAITING QUEUE MANAGER & NHA UHI TELEHEALTH SLOT SCHEDULER',
  opdQueueManagerSub: 'Unified Health Interface (UHI v1.2) ABDM Patient Flow & Token Dispatch Engine',
  checkInWalkInPatient: '+ Check-In Walk-In OPD Patient',
  physicalOpdTokenQueue: 'CLINIC PHYSICAL OPD TOKEN QUEUE',
  inOpdCabin: 'IN OPD CABIN',
  callToken: 'Call Token',
  hoverExpandedCollapsible: 'HOVER EXPANDED • COLLAPSIBLE BY DEFAULT',
  activeSessionVerification: 'ACTIVE SESSION VERIFICATION',
  viewAsPersonaSimulation: 'VIEW AS PERSONA (ROLE SIMULATION):',
  userPreferencesClinicSettings: 'USER PREFERENCES & CLINIC SETTINGS',
  visualAppearance: 'Visual Appearance',
  defaultRxPotency: 'Default Rx Potency',
  switchRbacLogin: 'Switch RBAC Login',
  logOut: 'Log Out',
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

export const INDIAN_LANGUAGE_PACKS: Record<string, LanguagePack> = {
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
      similiMatrixEngine: 'समिलिमैट्रिक्स एवं दूरस्थ चिकित्सा',
      similiMatrixSub: 'रेपर्टरी ग्रिड एवं वीडियो परामर्श',
      opdQueue: 'बाह्यरोगी प्रतीक्षा कतार एवं यूएचआई',
      opdQueueSub: 'प्रतीक्षा कक्ष एवं वीडियो परामर्श समय',
      patientRepository: 'दीर्घकालिक केस इतिहास एवं लेखा बही',
      patientRepositorySub: 'अपरिवर्तनीय दीर्घकालिक परामर्श इतिहास',
      patientProfile: 'आभा रोगी पहचान एवं स्वास्थ्य लॉकर',
      patientProfileSub: 'आयुष्मान भारत डिजिटल स्वास्थ्य रिकॉर्ड',
      pharmacy: 'औषधालय एवं एलएम पोटेंसी भंडार',
      pharmacySub: 'शास्त्रीय तरल एवं ठोस औषधि भण्डारण',
      clinicalAnalytics: 'नैदानिक विश्लेषिकी एवं चित्रांकन',
      clinicalAnalyticsSub: 'मियास्म एवं भ्रूणीय परत विश्लेषण',
      aiCopilot: 'कृत्रिम बुद्धिमत्ता क्लिनिकल सहायक',
      aiCopilotSub: 'जेमिनी २.५ प्रो अंतर निदानात्मक',
      aiDiagnosticLab: 'एआई निदानात्मक प्रयोगशाला व ओसीआर',
      aiDiagnosticLabSub: 'त्वचा विकार, रक्त रिपोर्ट व चाल विश्लेषण',
      patientEhr: 'रोगी स्वास्थ्य रिकॉर्ड व आभा डेटाबेस',
      materiaMedica: 'होम्योपैथिक मटेरिया मेडिका पुस्तकालय',
      materiaMedicaSub: 'एलन व बोरिक प्रामाणिक ग्रंथ',
      clinicalAcademy: 'बीएचएमएस एवं एमडी क्लिनिकल अकादमी',
      clinicalAcademySub: '३६०° मानव शरीर रचना व मौखिक परीक्षा',
      ayushResearchHub: 'आयुष क्लिनिकल शोध केंद्र',
      ayushResearchHubSub: 'समकक्ष-समीक्षित उपचार केस अध्ययन',
      discussionBlogs: 'चिकित्सकीय चर्चा ब्लॉग व केस विनिमय',
      discussionBlogsSub: 'सेहगल व बर्नेट कार्यप्रणाली प्रश्नोत्तरी',
      differentialWorkbench: 'त्रि-औषधि तुलनात्मक कार्यमंच',
      differentialWorkbenchSub: 'तुलनात्मक मोडैलिटी ग्रिड तालिका',
      enterpriseSuite: 'संस्थागत चिकित्सालय मंच सुइट',
      enterpriseSuiteSub: 'अस्पताल नेटवर्क व बिलिंग प्रबंधन',
      doctorProfile: 'चिकित्सक साख एवं आयुष पंजीकरण',
      doctorProfileSub: 'पंजीकरण संख्या व लाइसेंस विवरण',
      hospitalProfile: 'अस्पताल व बाह्यरोगी विभाग नेटवर्क',
      hospitalProfileSub: 'विभाग व टोकन प्रवाह प्रबंधन',
      supportHelp: '२४/७ सहायता एवं व्हाट्सऐप्प डेस्क',
      supportHelpSub: 'क्लिनिकल सहायता केंद्र',
      opdCareSuite: 'बाह्यरोगी एवं रोगी देखभाल सेवा',
      aiAnalyticsSuite: 'एआई अंतर निदानात्मक व विश्लेषिकी',
      materiaMedicaAcademySuite: 'मटेरिया मेडिका व बीएचएमएस अकादमी',
      clinicAdminEnterpriseSuite: 'चिकित्सालय प्रशासन व संस्थागत तंत्र',
      opdQueueManagerTitle: 'बाह्यरोगी प्रतीक्षा कतार प्रबंधक एवं एकीकृत स्वास्थ्य प्रणाली',
      opdQueueManagerSub: 'राष्ट्रीय स्वास्थ्य प्राधिकरण (NHA UHI v1.2) रोगी प्रवाह एवं टोकन प्रेषण प्रणाली',
      checkInWalkInPatient: '+ नया वाक-इन रोगी पंजीकृत करें',
      physicalOpdTokenQueue: 'चिकित्सालय भौतिक टोकन कतार',
      inOpdCabin: 'परामर्श कक्ष में सक्रिय',
      callToken: 'टोकन बुलाएं',
      hoverExpandedCollapsible: 'होवर पर विस्तारित • स्वतः संकुचन',
      activeSessionVerification: 'सक्रिय सत्र सत्यापन',
      viewAsPersonaSimulation: 'भूमिका अनुकरण द्वारा देखें:',
      userPreferencesClinicSettings: 'उपयोगकर्ता प्राथमिकताएं एवं क्लीनिक सेटिंग्स',
      visualAppearance: 'दृश्य स्वरूप (थीम)',
      defaultRxPotency: 'मानक पर्चा पोटेंसी',
      switchRbacLogin: 'उपयोगकर्ता भूमिका बदलें',
      logOut: 'सत्र समाप्त करें (लॉग आउट)',
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
      intake: '+ রোগী নিবন্ধন',
      decisionGates: '🔀 সিদ্ধান্ত গেট',
      rxSlip: 'প্রেসক্রিপশন স্লিপ',
      verifiedAbha: 'সত্যাপিত ABHA',
      similiMatrixEngine: 'সিমিলিম্যাট্রিক্স ও টেলিহেলথ',
      opdQueue: 'OPD অপেক্ষা সারি ও UHI',
      pharmacy: 'ফার্মেসি ও LM পোটেন্সি',
      differentialWorkbench: 'পার্থক্যমূলক সারণী',
      patientProfile: 'রোগীর প্রোফাইল ও ABHA',
      doctorProfile: 'চিকিৎসক শংসাপত্র',
      hospitalProfile: 'হাসপাতাল ও OPD নেটওয়ার্ক',
      supportHelp: '২৪/৭ সহায়তা ও হোয়াটসঅ্যাপ',
      rubricTranslations: {
        'MIND - BUSINESS - talks of': 'মন - ব্যবসা - দিনরাত ব্যবসার কথা বলে',
        'MIND - ANXIETY - night - sun set after': 'মন - উদ্বেগ - সূর্যাস্তের পর রাতে অস্বস্তি',
        'MIND - IMPATIENCE - business in': 'মন - অধৈর্য্য - কাজে তাড়াহুড়া',
        'HEAD - PAIN - pulsating - sudden': 'মাথা - ব্যথা - হঠাৎ স্পন্দনশীল ব্যথা',
        'HEAD - PAIN - sun - exposure to': 'মাথা - ব্যথা - রোদের তাপে বৃদ্ধি',
        'HEAD - CONGESTION - violent - carotid pulsation': 'মাথা - রক্তসঞ্চালন - তীব্র ক্যারোটিড ধমনি স্পন্দন',
        'EYES - PUPILS - dilated - insensitive to light': 'চোখ - তারারন্ধ্র - প্রসারিত - আলোতে নিষ্প্রভ',
        'ABDOMEN - CIRRHOSIS - liver - chronic parenchyma': 'পেট - লিভার সিরোসিস - দীর্ঘস্থায়ী যকৃৎ রোগ',
        'ABDOMEN - PAIN - right scapula - under lower angle': 'পেট - ব্যথা - ডান কাঁধের হাড়ের নিচে',
        'ABDOMEN - JAUNDICE - yellow sclera - stool clay colored': 'পেট - জন্ডিস - হলুদ চোখ ও মাটির রঙের মল',
      },
    },
  },
};

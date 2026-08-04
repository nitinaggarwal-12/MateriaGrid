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
    realTimeAuditLog: string;
    liveOpdTriageActive: string;
    uhiVideoSlotsTitle: string;
    liveWebRtcRooms: string;
    confirmedUhi: string;
    availableSlot: string;
    startVideoConsultation: string;
    inOpdCabin: string;
    callToken: string;
    abdmSigned: string;
    collapseBtn: string;
    clinicalActions: string;
    nextPatient: string;
    suitesTree: string;
    expandAll: string;
    collapseAll: string;
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
  realTimeAuditLog: 'REAL-TIME UHI AUDIT LOG',
  liveOpdTriageActive: 'LIVE OPD TRIAGE ACTIVE (8 PATIENTS IN QUEUE)',
  uhiVideoSlotsTitle: 'NHA UHI TELEHEALTH VIDEO SLOTS',
  liveWebRtcRooms: 'LIVE WEBRTC CLINICAL ROOMS',
  confirmedUhi: 'CONFIRMED UHI',
  availableSlot: 'AVAILABLE SLOT',
  startVideoConsultation: 'Start Video Call',
  inOpdCabin: 'IN OPD CABIN',
  callToken: 'Call Token',
  abdmSigned: 'ABDM SIGNED',
  collapseBtn: 'Collapse',
  clinicalActions: 'Clinical Actions',
  nextPatient: 'Next Patient →',
  suitesTree: 'SUITES TREE',
  expandAll: 'Expand All',
  collapseAll: 'Collapse All',
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
      realTimeAuditLog: 'वास्तविक समय यूएचआई ऑडिट लॉग',
      liveOpdTriageActive: 'सक्रिय ओपीडी प्राथमिकता (८ रोगी प्रतीक्षा में)',
      uhiVideoSlotsTitle: 'एनएचए यूएचआई दूरस्थ चिकित्सा वीडियो स्लॉट',
      liveWebRtcRooms: 'लाइव वीडियो परामर्श कक्ष',
      confirmedUhi: 'पुष्टित (UHI)',
      availableSlot: 'उपलब्ध समय',
      startVideoConsultation: 'वीडियो परामर्श शुरू करें',
      inOpdCabin: 'परामर्श कक्ष में सक्रिय',
      callToken: 'टोकन बुलाएं',
      abdmSigned: 'ABDM हस्ताक्षरित',
      collapseBtn: 'संक्षिप्त करें',
      clinicalActions: 'चिकित्सकीय कार्रवाई',
      nextPatient: 'अगला रोगी →',
      suitesTree: 'सुइट्स ट्री',
      expandAll: 'सभी विस्तार करें',
      collapseAll: 'सभी संकुचित करें',
      hoverExpandedCollapsible: 'होवर पर विस्तारित • स्वतः संकुचन',
      activeSessionVerification: 'सक्रिय सत्र सत्यापन',
      viewAsPersonaSimulation: 'भूमिका अनुकरण द्वारा देखें:',
      userPreferencesClinicSettings: 'उपयोगकर्ता प्राथमिकताएं एवं क्लीनिक सेटिंग्स',
      visualAppearance: 'दृश्य स्वरूप (थीम)',
      defaultRxPotency: 'मानक पर्चा पोटेंसी',
      switchRbacLogin: 'उपयोगकर्ता भूमिका बदलें',
      logOut: 'सत्र समाप्त करें (लॉग आउट)',
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
      similiMatrixSub: 'ரெபர்ட்டரி கட்டம் & வீடியோ ஆலோசனை',
      opdQueue: 'வெளிநோயாளி (OPD) காத்திருப்பு வரிசை & UHI',
      opdQueueSub: 'காத்திருப்பு அறை & வீடியோ இடங்கள்',
      patientRepository: 'நீண்டகால நோயாளி வழக்கு வரலாறு',
      patientRepositorySub: 'மாற்ற முடியாத மருத்துவப் பதிவுகள்',
      patientProfile: 'நோயாளி சுயவிவரம் & ABHA',
      patientProfileSub: 'டிஜிட்டல் சுகாதார சுயவிவரம்',
      pharmacy: 'மருந்தகம் & LM போடென்சி',
      pharmacySub: 'பாரம்பரிய திரவ மற்றும் திட மருந்துகள்',
      clinicalAnalytics: 'மருத்துவ பகுப்பாய்வு & திசையன்கள்',
      clinicalAnalyticsSub: 'மியாஸ்மாடிக் மற்றும் அடுக்கு பகுப்பாய்வு',
      aiCopilot: 'AI மருத்துவ உதவியாளர் (Gemini 2.5)',
      aiCopilotSub: 'வேறுபட்ட நோய் கண்டறிதல் துணையாளர்',
      aiDiagnosticLab: 'AI கண்டறிதல் ஆய்வகம் & படம்',
      aiDiagnosticLabSub: 'தோல் காயங்கள், ரத்த அறிக்கை & நடை',
      patientEhr: 'நோயாளி சுகாதார தரவுத்தளம்',
      materiaMedica: 'மெட்டீரியா மெடிகா நூலகம்',
      materiaMedicaSub: 'ஹேனிமேன், கென்ட் & போரிக் குறிப்பு',
      clinicalAcademy: 'ஹோமியோபதி மருத்துவ அகாடமி',
      clinicalAcademySub: '360° உடற்கூறியல் & தேர்வு மாதிரி',
      ayushResearchHub: 'ஆயுஷ் மருத்துவ ஆராய்ச்சி மையம்',
      ayushResearchHubSub: 'ஆராய்ச்சி கட்டுரைகள் & கணித குறியீடு',
      discussionBlogs: 'மருத்துவ கலந்துரையாடல் விவாதம்',
      discussionBlogsSub: 'வழக்கு ஆய்வுகள் & மருத்துவ பயிற்சி',
      differentialWorkbench: 'ஒப்பீட்டு அட்டவணை',
      differentialWorkbenchSub: 'முறைகள் ஒப்பீட்டு கட்டம்',
      enterpriseSuite: 'மருத்துவமனை நிர்வாக தொகுப்பு',
      enterpriseSuiteSub: 'பல மருத்துவர் கிளினிக் & கட்டணம்',
      doctorProfile: 'மருத்துவர் சான்றுகள் & பதிவு',
      doctorProfileSub: 'மருத்துவ உரிமம் & தகுதி',
      hospitalProfile: 'மருத்துவமனை & OPD நெட்வொர்க்',
      hospitalProfileSub: 'துறைகள் & நோயாளி ஓட்டம்',
      supportHelp: '24/7 மருத்துவ உதவி & வாட்ஸ்அப்',
      supportHelpSub: 'மருத்துவ உதவி மையம்',
      opdCareSuite: 'வெளிநோயாளி (OPD) & நோயாளி பராமரிப்பு சேவை',
      aiAnalyticsSuite: 'செயற்கை நுண்ணறிவு & பகுப்பாய்வு',
      materiaMedicaAcademySuite: 'மெட்டீரியா மெடிகா & அகாடமி',
      clinicAdminEnterpriseSuite: 'கிளினிக் நிர்வாகம் & என்டர்பிரைஸ்',
      opdQueueManagerTitle: 'வெளிநோயாளி (OPD) காத்திருப்பு வரிசை மேலாளர் & UHI தொலைமருத்துவத் திட்டம்',
      opdQueueManagerSub: 'தேசிய சுகாதார ஆணையம் (NHA UHI v1.2) நோயாளி ஓட்டம் & டோக்கன் இயந்திரம்',
      checkInWalkInPatient: '+ நேரடியாக வந்த OPD நோயாளியை பதிவு செய்',
      physicalOpdTokenQueue: 'கிளினிக் நேரிடை OPD டோக்கன் வரிசை',
      realTimeAuditLog: 'நிகழ்நேர UHI தணிக்கைப் பதிவு',
      liveOpdTriageActive: 'நேரலை OPD முன்னுரிமை வரிசை (8 நோயாளிகள் காத்திருப்பில்)',
      uhiVideoSlotsTitle: 'NHA UHI தொலைமருத்துவ வீடியோ இடங்கள்',
      liveWebRtcRooms: 'நேரலை WebRTC மருத்துவ அறைகள்',
      confirmedUhi: 'உறுதிசெய்யப்பட்டது (UHI)',
      availableSlot: 'கிடைக்கும் நேரம்',
      startVideoConsultation: 'வீடியோ ஆலோசனையைத் தொடங்கு',
      inOpdCabin: 'OPD அறைக்குள்',
      callToken: 'டோக்கனை அழை',
      abdmSigned: 'ABDM சான்றளிக்கப்பட்டது',
      collapseBtn: 'சுருக்கு (Collapse)',
      clinicalActions: 'மருத்துவ நடவடிக்கைகள்',
      nextPatient: 'அடுத்த நோயாளி →',
      suitesTree: 'தொகுப்பு மரம்',
      expandAll: 'அனைத்தையும் விரிவாக்கு',
      collapseAll: 'அனைத்தையும் சுருக்கு',
      hoverExpandedCollapsible: 'சுட்டி வைத்தால் விரிவடையும் • தானாக சுருங்கும்',
      activeSessionVerification: 'செயலில் உள்ள மருத்துவ அமர்வு',
      viewAsPersonaSimulation: 'பங்கு மாதிரி:',
      userPreferencesClinicSettings: 'பயனர் விருப்பங்கள் & கிளினிக் அமைப்புகள்',
      visualAppearance: 'தோற்றம் (தீம்)',
      defaultRxPotency: 'இயல்புநிலை மருந்து ஆற்றல்',
      switchRbacLogin: 'பயனர் பங்கு உள்நுழைவை மாற்று',
      logOut: 'வெளியேறு (Log Out)',
    },
  },
  BN: {
    code: 'BN',
    nativeName: 'বাংলা',
    englishName: 'Bengali',
    labels: {
      ...BASE_EN_LABELS,
      landingHeroTitle: 'সঠিক হোমিওপ্যাথি রেপার্টরাইজেশন ও এনএইচএ ইউএইচআই ডিজিটাল স্বাস্থ্য পরিষেবা',
      launchOpd: 'মেটেরিয়াগ্রিড বহির্বিভাগ (OPD) শুরু করুন',
      openClinicalPortal: 'চিকিৎসা বিভাগীয় পোর্টাল খুলুন',
      topSimillimum: 'প্রধান সিমিলিমাম ওষুধ',
      intake: '+ নতুন রোগী কেস ইতিহাস',
      decisionGates: '🔀 ক্লিনিকাল সিদ্ধান্ত স্তর',
      rxSlip: 'অফিসিয়াল প্রেসক্রিপশন স্লিপ',
      verifiedAbha: 'সত্যাপিত আভা ডিজিটাল আইডি',
      similiMatrixEngine: 'সিমিলিম্যাট্রিক্স ও দূরবর্তী পরামর্শ',
      similiMatrixSub: 'রেপার্টরি গ্রিড ও ভিডিও বহির্বিভাগ',
      opdQueue: 'বহির্বিভাগ অপেক্ষা সারি ও ইউএইচআই',
      opdQueueSub: 'অপেক্ষালয় ও ভিডিও পরামর্শ সময়সূচী',
      patientRepository: 'রোগীর দীর্ঘমেয়াদী কেস ইতিহাস ও অডিট খাতা',
      patientRepositorySub: 'অপরিবর্তনীয় দীর্ঘমেয়াদী পরামর্শ রেকর্ড',
      patientProfile: 'আভা রোগীর পরিচয় ও স্বাস্থ্য লকার',
      patientProfileSub: 'ডিজিটাল স্বাস্থ্য প্রোফাইল ও রেকর্ড',
      pharmacy: 'ফার্মেসি ও এলএম পোটেন্সি ল্যাব',
      pharmacySub: 'ক্লাসিক্যাল তরল ও কঠিন পোটেন্সি স্টক',
      clinicalAnalytics: 'ক্লিনিকাল বিশ্লেষণ ও মেটেরিয়া ভেক্টর',
      clinicalAnalyticsSub: 'মিয়াজমেটিক ও এম্ব্রিওনিক লেয়ার ভিজিউয়াল',
      aiCopilot: 'ক্লিনিকাল এআই সহকারী (Gemini 2.5 Pro)',
      aiCopilotSub: 'ডিফারেনশিয়াল ডায়াগনোসিস কো-পাইলট',
      aiDiagnosticLab: 'এআই ডায়াগনস্টিক ল্যাব ও ওসিআর',
      aiDiagnosticLabSub: 'ত্বকের ক্ষত, রক্ত রিপোর্ট ও হাঁটার ধরণ',
      patientEhr: 'রোগীর ইএইচআর ও আভা ডেটাবেস',
      materiaMedica: 'হোমিওপ্যাথিক মেটেরিয়া মেডিকা লাইব্রেরি',
      materiaMedicaSub: 'হ্যানিম্যান, কেন্ট ও বোরিক রেফারেন্স',
      clinicalAcademy: 'বিএইচএমএস ও এমডি ক্লিনিকাল একাডেমি',
      clinicalAcademySub: '৩৬০° অ্যানাটমি ও ভাইভা পরীক্ষা',
      ayushResearchHub: 'আয়ুশ গবেষণা কেন্দ্র ও ট্রায়াল',
      ayushResearchHubSub: 'পিয়ার-রিভিউ কেস ও স্পেসিফিসিটি ইনডেক্স',
      discussionBlogs: 'ক্লিনিকাল আলোচনা ব্লগ ও কেস বিনিময়',
      discussionBlogsSub: 'সেহগল ও বার্নেট পদ্ধতি প্রশ্নোত্তর',
      differentialWorkbench: 'তুলনামূলক ডিফারেনশিয়াল ওয়ার্কবেঞ্চ',
      differentialWorkbenchSub: 'মড্যালিটি তুলনামূলক গ্রিড',
      enterpriseSuite: 'হাসপাতাল নেটওয়ার্ক ও এন্টারপ্রাইজ সুট',
      enterpriseSuiteSub: 'বহু-ডাক্তার ক্লিনিক ও বিলিং ব্যবস্থাপনা',
      doctorProfile: 'চিকিৎসকের শংসাপত্র ও রেজিস্ট্রেশন',
      doctorProfileSub: 'চিকিৎসা লাইসেন্স ও বিবরণ',
      hospitalProfile: 'হাসপাতাল ও বহির্বিভাগ ফ্লিট',
      hospitalProfileSub: 'বিভাগ ও টোকেন প্রবাহ ব্যবস্থা',
      supportHelp: '২৪/৭ বিশেষজ্ঞ সহায়তা ও হোয়াটসঅ্যাপ',
      supportHelpSub: 'ক্লিনিকাল সাহায্য ডেস্ক',
      opdCareSuite: 'বহির্বিভাগ (OPD) ও রোগী সেবা সুট',
      aiAnalyticsSuite: 'এআই ডিফারেনশিয়াল ও বিশ্লেষণ সুট',
      materiaMedicaAcademySuite: 'মেটেরিয়া মেডিকা ও বিএইচএমএস একাডেমি',
      clinicAdminEnterpriseSuite: 'ক্লিনিক প্রশাসন ও এন্টারপ্রাইজ সুট',
      opdQueueManagerTitle: 'বহির্বিভাগ অপেক্ষা সারি ব্যবস্থাপক ও ইউএইচআই টেলিকনসাল্ট ক্যালের্ডার',
      opdQueueManagerSub: 'জাতীয় স্বাস্থ্য কর্তৃপক্ষ (NHA UHI v1.2) টোকেন প্রেরণ ইঞ্জিন',
      checkInWalkInPatient: '+ নতুন ওয়াক-ইন রোগী নথিভুক্ত করুন',
      physicalOpdTokenQueue: 'ক্লিনিক ভৌত টোকেন অপেক্ষা সারি',
      realTimeAuditLog: 'রিয়েল-টাইম UHI অডিট লগ',
      liveOpdTriageActive: 'লাইভ OPD ট্রায়াজ সক্রিয় (৮ জন রোগী অপেক্ষায়)',
      uhiVideoSlotsTitle: 'NHA UHI টেলিহেলথ ভিডিও স্লট',
      liveWebRtcRooms: 'লাইভ ভিডিও ঘর',
      confirmedUhi: 'নিশ্চিত UHI',
      availableSlot: 'উপলব্ধ স্লট',
      startVideoConsultation: 'ভিডিও পরামর্শ শুরু করুন',
      inOpdCabin: 'চিকিৎসকের ঘরে সক্রিয়',
      callToken: 'টোকেন ডাকুন',
      abdmSigned: 'ABDM হস্তাক্ষরিত',
      collapseBtn: 'সংকুচিত করুন',
      clinicalActions: 'ক্লিনিকাল পদক্ষেপ',
      nextPatient: 'পরবর্তী রোগী →',
      suitesTree: 'সুটের তালিকা',
      expandAll: 'সব প্রসারিত করুন',
      collapseAll: 'সব সংকুচিত করুন',
      hoverExpandedCollapsible: 'হভার করলে প্রসারিত • স্বয়ংক্রিয়ভাবে সংকুচিত',
      activeSessionVerification: 'সক্রিয় অধিবেশন যাচাইকৃত',
      viewAsPersonaSimulation: 'ভূমিকা অনুযায়ী দেখুন (সিমুলেশন):',
      userPreferencesClinicSettings: 'ব্যবহারকারীর পছন্দ ও ক্লিনিক সেটিংস',
      visualAppearance: 'দৃশ্যমান রূপ (থিম)',
      defaultRxPotency: 'ডিফল্ট ওষুধ পোটেন্সি',
      switchRbacLogin: 'ব্যবহারকারীর ভূমিকা পরিবর্তন',
      logOut: 'সেশন শেষ করুন (লগ আউট)',
    },
  },
  DE: {
    code: 'DE',
    nativeName: 'Deutsch',
    englishName: 'German (Hahnemann Organon)',
    labels: {
      ...BASE_EN_LABELS,
      landingHeroTitle: 'PRÄZISIONS-HOMÖOPATHISCHE REPERTORISATION & NHA UHI TELEMEDIZIN',
      launchOpd: 'MateriaGrid Ambulanz starten',
      openClinicalPortal: 'Klinisches Ambulanz-Portal',
      topSimillimum: 'Top-Simillimum',
      intake: '+ Neue Fallaufnahme',
      decisionGates: '🔀 Hahnemann Decision Gates',
      rxSlip: 'Rezept / Verordnung',
      verifiedAbha: 'Verifizierte Identität',
      similiMatrixEngine: 'SimiliMatrix & Telemedizin',
      similiMatrixSub: 'Repertorium-Raster & Video-Sprechstunde',
      opdQueue: 'Warteschlange & Terminplaner',
      opdQueueSub: 'Warteraum & Video-Termine',
      patientRepository: 'Longitudinale Fallhistorie',
      patientRepositorySub: 'Unveränderliches Behandlungsprotokoll',
      patientProfile: 'Patientenakte & Digitaler Ausweis',
      patientProfileSub: 'Gesundheitsakte & Profil',
      pharmacy: 'Apotheke & LM-Potenzen',
      pharmacySub: 'Klassische Flüssigpotenzen & Vorrat',
      clinicalAnalytics: 'Klinische Analytik & Vektoren',
      clinicalAnalyticsSub: 'Miasmatische & Keimblatt-Analyse',
      aiCopilot: 'KI-Klinik-Assistent (Gemini 2.5)',
      aiCopilotSub: 'Differentialdiagnostischer KI-Partner',
      aiDiagnosticLab: 'KI-Diagnostiklabor & Bildanalyse',
      aiDiagnosticLabSub: 'Hautbefunde, Blutwerte & Gangbild',
      patientEhr: 'Patienten-EHR & Datenbank',
      materiaMedica: 'Materia Medica Bibliothek',
      materiaMedicaSub: 'Hahnemann, Allen & Boericke',
      clinicalAcademy: 'Homöopathische Akademie',
      clinicalAcademySub: '360° Anatomie & Prüfungssimulation',
      ayushResearchHub: 'Klinische Forschung & Studien',
      ayushResearchHubSub: 'Peerreviews & Spezifitätsindex',
      discussionBlogs: 'Klinischer Fachaustausch',
      discussionBlogsSub: 'Fallbesprechungen & Materia Medica',
      differentialWorkbench: 'Vergleichs-Differentialtabelle',
      differentialWorkbenchSub: 'Modalitäten-Vergleichsraster',
      enterpriseSuite: 'Klinik-Verwaltungs-Suite',
      enterpriseSuiteSub: 'Mehrärzte-Praxis & Abrechnung',
      doctorProfile: 'Arztprofil & Approbation',
      doctorProfileSub: 'Zulassung & Facharztqualifikation',
      hospitalProfile: 'Klinik- & Ambulanzverbund',
      hospitalProfileSub: 'Abteilungen & Patientenfluss',
      supportHelp: '24/7 Ärztlicher Support',
      supportHelpSub: 'Klinischer Helpdesk & Chat',
      opdCareSuite: 'AMBULANZ & PATIENTENVERSORGUNG',
      aiAnalyticsSuite: 'KI-DIAGNOSTIK & ANALYTIK',
      materiaMedicaAcademySuite: 'MATERIA MEDICA & AKADEMIE',
      clinicAdminEnterpriseSuite: 'PRAXIS-VERWALTUNG & ENTERPRISE',
      opdQueueManagerTitle: 'AMBULANZ-WARTESCHLANGE & TELEMEDIZIN-TERMINPLANER',
      opdQueueManagerSub: 'Nationales Gesundheitsportal (UHI v1.2) Patientenfluss-Steuerung',
      checkInWalkInPatient: '+ Akut-Patient einchecken',
      physicalOpdTokenQueue: 'Physische Ambulanz-Aufrufschlange',
      realTimeAuditLog: 'Echtzeit-UHI-Prüfprotokoll',
      liveOpdTriageActive: 'Live-Triage aktiv (8 Patienten warten)',
      uhiVideoSlotsTitle: 'NHA UHI Telemedizin-Videosprechstunden',
      liveWebRtcRooms: 'Live-WebRTC-Klinikräume',
      confirmedUhi: 'Bestätigt (UHI)',
      availableSlot: 'Freier Termin',
      startVideoConsultation: 'Videosprechstunde starten',
      inOpdCabin: 'In Behandlung',
      callToken: 'Aufrufen',
      abdmSigned: 'ABDM Verifiziert',
      collapseBtn: 'Einklappen',
      clinicalActions: 'Klinische Aktionen',
      nextPatient: 'Nächster Patient →',
      suitesTree: 'Modulbaum',
      expandAll: 'Alle ausklappen',
      collapseAll: 'Alle einklappen',
      hoverExpandedCollapsible: 'Hover-Erweiterung • Automatisch einklappbar',
      activeSessionVerification: 'AKTIVE ARZTSITZUNG VERIFIZIERT',
      viewAsPersonaSimulation: 'Rollen-Simulation:',
      userPreferencesClinicSettings: 'BENUTZER-EINSTELLUNGEN & PRAXIS-KONFIGURATION',
      visualAppearance: 'Erscheinungsbild (Theme)',
      defaultRxPotency: 'Standard-Potenzierung',
      switchRbacLogin: 'Benutzerrolle wechseln',
      logOut: 'Abmelden',
    },
  },
  FR: {
    code: 'FR',
    nativeName: 'Français',
    englishName: 'French',
    labels: {
      ...BASE_EN_LABELS,
      landingHeroTitle: 'RÉPERTORISATION HOMÉOPATHIQUE DE PRÉCISION & TÉLÉMÉDECINE NHA UHI',
      launchOpd: 'Lancer MateriaGrid Consultation',
      openClinicalPortal: 'Portail de Consultation Clinique',
      topSimillimum: 'Simillimum Principal',
      intake: '+ Nouvelle Anamnèse',
      decisionGates: '🔀 Portes de Décision Clinique',
      rxSlip: 'Ordonnance Homéopathique',
      verifiedAbha: 'Identité Vérifiée',
      similiMatrixEngine: 'SimiliMatrix & Télésanté',
      similiMatrixSub: 'Grille de Répertorisation & Vidéo',
      opdQueue: 'File d’Attente & Créneaux Vidéo',
      opdQueueSub: 'Salle d’Attente & Téléconsultation',
      patientRepository: 'Historique Longitudinal du Patient',
      patientRepositorySub: 'Registre Infalsifiable des Consultations',
      patientProfile: 'Dossier Patient & Profil Santé',
      patientProfileSub: 'Identité Santé & Carnet Digital',
      pharmacy: 'Pharmacie & Potences LM',
      pharmacySub: 'Stock Liquide & Souches Classiques',
      clinicalAnalytics: 'Analytique Clinique & Vecteurs',
      clinicalAnalyticsSub: 'Analyse Miasmatique & Embryologique',
      aiCopilot: 'Assistant IA Clinique (Gemini 2.5)',
      aiCopilotSub: 'Co-Pilote de Diagnostic Différentiel',
      aiDiagnosticLab: 'Laboratoire IA & Analyse d’Images',
      aiDiagnosticLabSub: 'Lésions Cutanées, Sang & Démarche',
      patientEhr: 'Base de Données Patient EHR',
      materiaMedica: 'Bibliothèque de Matière Médicale',
      materiaMedicaSub: 'Hahnemann, Kent & Boericke',
      clinicalAcademy: 'Académie de Homéopathie',
      clinicalAcademySub: 'Anatomie 360° & Simulation de Cas',
      ayushResearchHub: 'Centre de Recherche Clinique',
      ayushResearchHubSub: 'Études Révisées & Indice de Spécificité',
      discussionBlogs: 'Forums & Discussions Cliniques',
      discussionBlogsSub: 'Études de Cas & Pratique Médicale',
      differentialWorkbench: 'Tableau Différentiel Comparatif',
      differentialWorkbenchSub: 'Grille Comparative des Modalités',
      enterpriseSuite: 'Suite de Gestion Hospitalière',
      enterpriseSuiteSub: 'Équipe Médicale & Facturation',
      doctorProfile: 'Profil Médecin & Numéro RPPS',
      doctorProfileSub: 'Licence Exercice & Spécialité',
      hospitalProfile: 'Réseau Hospitalier & Centres',
      hospitalProfileSub: 'Départements & Flux de Patients',
      supportHelp: 'Assistance Médicale 24/7',
      supportHelpSub: 'Support Clinique & WhatsApp',
      opdCareSuite: 'CONSULTATIONS & SOINS PATIENTS',
      aiAnalyticsSuite: 'INTELLIGENCE ARTIFICIELLE & ANALYTIQUE',
      materiaMedicaAcademySuite: 'MATIÈRE MÉDICALE & ACADÉMIE',
      clinicAdminEnterpriseSuite: 'ADMINISTRATION & ENTREPRISE',
      opdQueueManagerTitle: 'GESTIONNAIRE DE FILE D’ATTENTE & TÉLÉCANDIDATURE',
      opdQueueManagerSub: 'Interface de Santé Unifiée (UHI v1.2) Flux Patient',
      checkInWalkInPatient: '+ Enregistrer Patient Sans Rendez-Vous',
      physicalOpdTokenQueue: 'File d’Attente Physique du Cabinet',
      realTimeAuditLog: 'Journal d’Audit UHI Temps Réel',
      liveOpdTriageActive: 'Triage OPD Actif (8 patients en attente)',
      uhiVideoSlotsTitle: 'Créneaux Vidéo Télémédecine NHA UHI',
      liveWebRtcRooms: 'Salles Cliniques WebRTC',
      confirmedUhi: 'Confirmé (UHI)',
      availableSlot: 'Créneau Disponible',
      startVideoConsultation: 'Démarrer la Téléconsultation',
      inOpdCabin: 'En Consultation',
      callToken: 'Appeler le Suivant',
      abdmSigned: 'ABDM Signé',
      collapseBtn: 'Réduire',
      clinicalActions: 'Actions Cliniques',
      nextPatient: 'Patient Suivant →',
      suitesTree: 'Arborescence',
      expandAll: 'Tout Développer',
      collapseAll: 'Tout Réduire',
      hoverExpandedCollapsible: 'Survol Élargi • Repliable Automatiquement',
      activeSessionVerification: 'SESSION MÉDICALE VÉRIFIÉE',
      viewAsPersonaSimulation: 'Simulation de Rôle:',
      userPreferencesClinicSettings: 'PRÉFÉRENCES & PARAMÈTRES DU CABINET',
      visualAppearance: 'Apparence Visuelle (Thème)',
      defaultRxPotency: 'Dilution / Potence par Défaut',
      switchRbacLogin: 'Changer de Rôle Médecin',
      logOut: 'Se Déconnecter',
    },
  },
  ES: {
    code: 'ES',
    nativeName: 'Español',
    englishName: 'Spanish',
    labels: {
      ...BASE_EN_LABELS,
      landingHeroTitle: 'REPERTORIZACIÓN HOMEOPÁTICA DE PRECISIÓN & TELEMEDICINA NHA UHI',
      launchOpd: 'Iniciar MateriaGrid Consulta',
      openClinicalPortal: 'Portal Clínico de Consulta',
      topSimillimum: 'Simillimum Principal',
      intake: '+ Nueva Historia Clínica',
      decisionGates: '🔀 Puertas de Decisión Clínica',
      rxSlip: 'Receta Médica Homeopática',
      verifiedAbha: 'Identidad Verificada',
      similiMatrixEngine: 'SimiliMatrix & Telemedicina',
      similiMatrixSub: 'Matriz de Repertorio & Videoconsulta',
      opdQueue: 'Cola de Espera & Citas Video',
      opdQueueSub: 'Sala de Espera & Telemedicina',
      patientRepository: 'Historial Longitudinal del Paciente',
      patientRepositorySub: 'Registro Inalterable de Consultas',
      patientProfile: 'Expediente del Paciente & Salud',
      patientProfileSub: 'Identidad Digital & Perfil',
      pharmacy: 'Farmacia Homeopática & Potencias LM',
      pharmacySub: 'Stock Líquido Classico & Potencias',
      clinicalAnalytics: 'Analítica Clínica & Vectores',
      clinicalAnalyticsSub: 'Análisis Miasmático & Capas Embriológicas',
      aiCopilot: 'Asistente de IA Clínica (Gemini 2.5)',
      aiCopilotSub: 'Co-Piloto de Diagnóstico Diferencial',
      aiDiagnosticLab: 'Laboratorio de IA & Análisis de Imágenes',
      aiDiagnosticLabSub: 'Lesiones de Piel, Sangre & Marcha',
      patientEhr: 'Base de Datos de Pacientes EHR',
      materiaMedica: 'Biblioteca de Materia Médica',
      materiaMedicaSub: 'Hahnemann, Kent & Boericke',
      clinicalAcademy: 'Academia Médica Homeopática',
      clinicalAcademySub: 'Anatomía 360° & Simulación Clínica',
      ayushResearchHub: 'Centro de Investigación Clínica',
      ayushResearchHubSub: 'Estudios Arbitrados & Índice Matemático',
      discussionBlogs: 'Discusión Clínica & Foros',
      discussionBlogsSub: 'Estudios de Caso & Práctica Médica',
      differentialWorkbench: 'Tabla Comparativa Diferencial',
      differentialWorkbenchSub: 'Matriz Comparativa de Modalidades',
      enterpriseSuite: 'Suite de Gestión Hospitalaria',
      enterpriseSuiteSub: 'Clínica Multimédica & Facturación',
      doctorProfile: 'Perfil del Médico & Cédula',
      doctorProfileSub: 'Licencia Médica & Especialidad',
      hospitalProfile: 'Red Hospitalaria & Centros',
      hospitalProfileSub: 'Departamentos & Flujo de Pacientes',
      supportHelp: 'Soporte Médico 24/7',
      supportHelpSub: 'Mesa de Ayuda Clínica & WhatsApp',
      opdCareSuite: 'CONSULTAS & ATENCIÓN AL PACIENTE',
      aiAnalyticsSuite: 'INTELIGENCIA ARTIFICIAL & ANALÍTICA',
      materiaMedicaAcademySuite: 'MATERIA MÉDICA & ACADEMIA',
      clinicAdminEnterpriseSuite: 'ADMINISTRACIÓN DE CLÍNICA & EMPRESA',
      opdQueueManagerTitle: 'GESTOR DE COLA DE ESPERA & TELEMEDICINA',
      opdQueueManagerSub: 'Interfaz de Salud Unificada (UHI v1.2) Flujo de Pacientes',
      checkInWalkInPatient: '+ Registrar Paciente Sin Cita',
      physicalOpdTokenQueue: 'Cola Física del Consultorio',
      realTimeAuditLog: 'Registro de Auditoría UHI Tiempo Real',
      liveOpdTriageActive: 'Triage de Consulta Activo (8 pacientes en espera)',
      uhiVideoSlotsTitle: 'Turnos Video Telemedicina NHA UHI',
      liveWebRtcRooms: 'Salas Clínicas WebRTC En Vivo',
      confirmedUhi: 'Confirmado (UHI)',
      availableSlot: 'Turno Disponible',
      startVideoConsultation: 'Iniciar Videoconsulta',
      inOpdCabin: 'En Consulta Activa',
      callToken: 'Llamar Siguiente',
      abdmSigned: 'ABDM Firmado',
      collapseBtn: 'Colapsar',
      clinicalActions: 'Acciones Clínicas',
      nextPatient: 'Siguiente Paciente →',
      suitesTree: 'Árbol de Módulos',
      expandAll: 'Expandir Todo',
      collapseAll: 'Colapsar Todo',
      hoverExpandedCollapsible: 'Expandir al Pasar Cursor • Plegable Automáticamente',
      activeSessionVerification: 'SESIÓN MÉDICA VERIFICADA',
      viewAsPersonaSimulation: 'Simulación de Rol:',
      userPreferencesClinicSettings: 'PREFERENCIAS DE USUARIO & CONFIGURACIÓN',
      visualAppearance: 'Aspecto Visual (Tema)',
      defaultRxPotency: 'Potencia Predeterminada de Receta',
      switchRbacLogin: 'Cambiar Rol de Usuario',
      logOut: 'Cerrar Sesión',
    },
  },
  PT: {
    code: 'PT',
    nativeName: 'Português',
    englishName: 'Portuguese',
    labels: {
      ...BASE_EN_LABELS,
      landingHeroTitle: 'REPERTORIZAÇÃO HOMEOPÁTICA DE PRECISÃO & TELEMEDICINA NHA UHI',
      launchOpd: 'Iniciar MateriaGrid Consulta',
      openClinicalPortal: 'Portal Clínico de Consulta',
      topSimillimum: 'Simillimum Principal',
      intake: '+ Nova Histórico Clínico',
      decisionGates: '🔀 Portas de Decisão Clínica',
      rxSlip: 'Receita Médica Homeopática',
      verifiedAbha: 'Identidade Verificada',
      similiMatrixEngine: 'SimiliMatrix & Telemedicina',
      similiMatrixSub: 'Matriz de Repertório & Vídeo',
      opdQueue: 'Fila de Espera & Consultas Vídeo',
      opdQueueSub: 'Sala de Espera & Telemedicina',
      patientRepository: 'Histórico Longitudinal do Paciente',
      patientRepositorySub: 'Registro Inalterável de Consultas',
      patientProfile: 'Prontuário do Paciente & Saúde',
      patientProfileSub: 'Identidade Digital & Perfil',
      pharmacy: 'Farmácia Homeopática & Potências LM',
      pharmacySub: 'Estoque Líquido Clássico & Potências',
      clinicalAnalytics: 'Analítica Clínica & Vetores',
      clinicalAnalyticsSub: 'Análise Miasmática & Camadas Embriológicas',
      aiCopilot: 'Assistente de IA Clínica (Gemini 2.5)',
      aiCopilotSub: 'Co-Piloto de Diagnóstico Diferencial',
      aiDiagnosticLab: 'Laboratório de IA & Análise de Imagens',
      aiDiagnosticLabSub: 'Lesões de Pele, Sangue & Marcha',
      patientEhr: 'Banco de Dados de Pacientes EHR',
      materiaMedica: 'Biblioteca de Matéria Médica',
      materiaMedicaSub: 'Hahnemann, Kent & Boericke',
      clinicalAcademy: 'Academia Médica Homeopática',
      clinicalAcademySub: 'Anatomia 360° & Simulação Clínica',
      ayushResearchHub: 'Centro de Pesquisa Clínica',
      ayushResearchHubSub: 'Estudos Revisados & Índice Matemático',
      discussionBlogs: 'Discussão Clínica & Fóruns',
      discussionBlogsSub: 'Estudos de Caso & Prática Médica',
      differentialWorkbench: 'Tabela Comparativa Diferencial',
      differentialWorkbenchSub: 'Matriz Comparativa de Modalidades',
      enterpriseSuite: 'Suite de Gestão Hospitalar',
      enterpriseSuiteSub: 'Clínica Multimédica & Faturamento',
      doctorProfile: 'Perfil do Médico & CRM',
      doctorProfileSub: 'Licença Médica & Especialidade',
      hospitalProfile: 'Rede Hospitalar & Centros',
      hospitalProfileSub: 'Departamentos & Fluxo de Pacientes',
      supportHelp: 'Suporte Médico 24/7',
      supportHelpSub: 'Central de Ajuda Clínica & WhatsApp',
      opdCareSuite: 'CONSULTAS & ATENDIMENTO AO PACIENTE',
      aiAnalyticsSuite: 'INTELIGÊNCIA ARTIFICIAL & ANALÍTICA',
      materiaMedicaAcademySuite: 'MATÉRIA MÉDICA & ACADEMIA',
      clinicAdminEnterpriseSuite: 'ADMINISTRAÇÃO DE CLÍNICA & EMPRESA',
      opdQueueManagerTitle: 'GESTOR DE FILA DE ESPERA & TELEMEDICINA',
      opdQueueManagerSub: 'Interface de Saúde Unificada (UHI v1.2) Fluxo de Pacientes',
      checkInWalkInPatient: '+ Registrar Paciente Sem Consulta',
      physicalOpdTokenQueue: 'Fila Física do Consultório',
      realTimeAuditLog: 'Registro de Auditoria UHI Tempo Real',
      liveOpdTriageActive: 'Triagem Ativa de Consultas (8 pacientes em espera)',
      uhiVideoSlotsTitle: 'Horários Vídeo Telemedicina NHA UHI',
      liveWebRtcRooms: 'Salas Clínicas WebRTC Ao Vivo',
      confirmedUhi: 'Confirmado (UHI)',
      availableSlot: 'Horário Disponível',
      startVideoConsultation: 'Iniciar Videoconsulta',
      inOpdCabin: 'Em Consulta Ativa',
      callToken: 'Chamar Próximo',
      abdmSigned: 'ABDM Assinado',
      collapseBtn: 'Recolher',
      clinicalActions: 'Ações Clínicas',
      nextPatient: 'Próximo Paciente →',
      suitesTree: 'Árvore de Módulos',
      expandAll: 'Expandir Tudo',
      collapseAll: 'Recolher Tudo',
      hoverExpandedCollapsible: 'Expandir ao Passar Cursor • Dobrável Automaticamente',
      activeSessionVerification: 'SESSÃO MÉDICA VERIFICADA',
      viewAsPersonaSimulation: 'Simulação de Papel:',
      userPreferencesClinicSettings: 'PREFERÊNCIAS DO USUÁRIO & CONFIGURAÇÕES',
      visualAppearance: 'Aparência Visual (Tema)',
      defaultRxPotency: 'Potência Padrão de Receita',
      switchRbacLogin: 'Mudar Papel de Usuário',
      logOut: 'Sair da Conta',
    },
  },
};

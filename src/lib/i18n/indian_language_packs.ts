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
  EN: { code: 'EN', nativeName: 'English', englishName: 'English', labels: BASE_EN_LABELS },
  HI: { code: 'HI', nativeName: 'हिन्दी', englishName: 'Hindi', labels: { ...BASE_EN_LABELS, landingHeroTitle: 'सटीक होम्योपैथिक रेपर्टराइजेशन एवं NHA UHI क्लिनिकल टेलीहेल्थ' } },
  TA: { code: 'TA', nativeName: 'தமிழ்', englishName: 'Tamil', labels: BASE_EN_LABELS },
  BN: { code: 'BN', nativeName: 'বাংলা', englishName: 'Bengali', labels: BASE_EN_LABELS },
  MR: { code: 'MR', nativeName: 'मराठी', englishName: 'Marathi', labels: BASE_EN_LABELS },
  GU: { code: 'GU', nativeName: 'ગુજરાતી', englishName: 'Gujarati', labels: BASE_EN_LABELS },
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
  RAJ: { code: 'RAJ', nativeName: 'मारवाड़ी', englishName: 'Marwari / Rajasthani', labels: { ...BASE_EN_LABELS, launchOpd: 'MateriaGrid OPD शुरू करो' } },
  CHH: { code: 'CHH', nativeName: 'छत्तीसगढ़ी', englishName: 'Chhattisgarhi', labels: BASE_EN_LABELS },
  HAR: { code: 'HAR', nativeName: 'हरियाणवी', englishName: 'Haryanvi', labels: BASE_EN_LABELS },
  TCY: { code: 'TCY', nativeName: 'ತುಳು', englishName: 'Tulu (Coastal Karnataka)', labels: BASE_EN_LABELS },
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

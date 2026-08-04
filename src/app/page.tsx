'use client';

import React, { useState, useEffect } from 'react';
import { LandingPage } from '@/components/landing/LandingPage';
import {
  WorkspaceMatrix,
  RubricRow,
  RemedyColumn,
  MatrixCell,
} from '@/components/dashboard/WorkspaceMatrix';
import { VideoConsultationHarness } from '@/components/dashboard/VideoConsultationHarness';
import {
  AbhaScannerGate,
  AbhaPatientRecord,
} from '@/components/dashboard/AbhaScannerGate';
import { CloneSelectorTray } from '@/components/dashboard/CloneSelectorTray';
import { CaseHistoryIntakeDrawer } from '@/components/dashboard/CaseHistoryIntakeDrawer';
import { MateriaMedicaReaderModal } from '@/components/dashboard/MateriaMedicaReaderModal';
import { PrescriptionGeneratorModal } from '@/components/dashboard/PrescriptionGeneratorModal';
import {
  SidebarNav,
  ActiveWorkspaceTab,
} from '@/components/dashboard/SidebarNav';
import { ClinicalAnalyticsGraphs } from '@/components/dashboard/ClinicalAnalyticsGraphs';
import { AiClinicalChatbotPanel } from '@/components/dashboard/AiClinicalChatbotPanel';
import { PatientCaseRepositoryView } from '@/components/dashboard/PatientCaseRepositoryView';
import { MateriaMedicaLibraryView } from '@/components/dashboard/MateriaMedicaLibraryView';
import { DiagnosticLabAiView } from '@/components/dashboard/DiagnosticLabAiView';
import { AyushResearchHubView } from '@/components/dashboard/AyushResearchHubView';
import { OpdQueueManagerView } from '@/components/dashboard/OpdQueueManagerView';
import { PharmacyDispensaryView } from '@/components/dashboard/PharmacyDispensaryView';
import { DifferentialWorkbenchView } from '@/components/dashboard/DifferentialWorkbenchView';
import { EnterpriseUnicornSuiteView } from '@/components/dashboard/EnterpriseUnicornSuiteView';
import { AnatomicalAffinityMapModal } from '@/components/dashboard/AnatomicalAffinityMapModal';
import { HyperDimensionalTelemetryModal } from '@/components/dashboard/HyperDimensionalTelemetryModal';
import { PortalClinicalDecisionFlowchartModal } from '@/components/dashboard/PortalClinicalDecisionFlowchartModal';
import { MateriaGridSyncQueue } from '@/lib/engine/sync_queue';
import { mergeConcurrentDoctorOperations } from '@/lib/engine/crdt_session_handler';
import {
  INDIAN_LANGUAGE_PACKS,
  IndianLanguageCode,
} from '@/lib/i18n/indian_language_packs';
import {
  Flame,
  Droplets,
  Compass,
  Award,
  Pill,
  FileText,
  Printer,
  Menu,
  Sun,
  Moon,
  Globe,
  Sparkles,
  ShieldCheck,
  Activity,
  UserCheck,
  GitBranch,
} from 'lucide-react';

const INITIAL_REMEDIES: RemedyColumn[] = [
  { id: 'rem-bell', code: 'Bell', fullName: 'Belladonna', specificityScore: 65.2, coverageCount: 18, isDrainage: false, hasSafetyAlert: false },
  { id: 'rem-chel', code: 'Chel', fullName: 'Chelidonium majus', specificityScore: 58.4, coverageCount: 12, isDrainage: true, hasSafetyAlert: true },
  { id: 'rem-sulph', code: 'Sulph', fullName: 'Sulphur', specificityScore: 52.1, coverageCount: 22, isDrainage: false, hasSafetyAlert: false },
  { id: 'rem-acon', code: 'Acon', fullName: 'Aconitum napellus', specificityScore: 49.3, coverageCount: 16, isDrainage: false, hasSafetyAlert: false },
  { id: 'rem-bry', code: 'Bry', fullName: 'Bryonia alba', specificityScore: 46.8, coverageCount: 17, isDrainage: false, hasSafetyAlert: false },
  { id: 'rem-puls', code: 'Puls', fullName: 'Pulsatilla nigricans', specificityScore: 44.2, coverageCount: 15, isDrainage: false, hasSafetyAlert: false },
  { id: 'rem-rhust', code: 'Rhus-t', fullName: 'Rhus toxicodendron', specificityScore: 42.1, coverageCount: 14, isDrainage: false, hasSafetyAlert: false },
  { id: 'rem-ars', code: 'Ars', fullName: 'Arsenicum album', specificityScore: 40.5, coverageCount: 16, isDrainage: false, hasSafetyAlert: false },
  { id: 'rem-lyc', code: 'Lyc', fullName: 'Lycopodium clavatum', specificityScore: 39.8, coverageCount: 19, isDrainage: false, hasSafetyAlert: false },
  { id: 'rem-nuxv', code: 'Nux-v', fullName: 'Nux vomica', specificityScore: 38.4, coverageCount: 17, isDrainage: false, hasSafetyAlert: false },
  { id: 'rem-calc', code: 'Calc', fullName: 'Calcarea carbonica', specificityScore: 37.1, coverageCount: 18, isDrainage: false, hasSafetyAlert: false },
  { id: 'rem-phos', code: 'Phos', fullName: 'Phosphorus', specificityScore: 36.2, coverageCount: 16, isDrainage: false, hasSafetyAlert: false },
  { id: 'rem-natm', code: 'Nat-m', fullName: 'Natrum muriaticum', specificityScore: 35.5, coverageCount: 15, isDrainage: false, hasSafetyAlert: false },
  { id: 'rem-sep', code: 'Sep', fullName: 'Sepia officinalis', specificityScore: 34.1, coverageCount: 14, isDrainage: false, hasSafetyAlert: false },
  { id: 'rem-lach', code: 'Lach', fullName: 'Lachesis mutus', specificityScore: 33.4, coverageCount: 13, isDrainage: false, hasSafetyAlert: false },
  { id: 'rem-merc', code: 'Merc', fullName: 'Mercurius solubilis', specificityScore: 32.8, coverageCount: 13, isDrainage: false, hasSafetyAlert: false },
];

const INITIAL_RUBRICS: RubricRow[] = [
  { id: 'rub-1', chapter: 'MIND', fullStringPath: 'MIND - BUSINESS - talks of', embryologicalLayer: 'Ectoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-2', chapter: 'MIND', fullStringPath: 'MIND - ANXIETY - night - sun set after', embryologicalLayer: 'Ectoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-3', chapter: 'MIND', fullStringPath: 'MIND - IMPATIENCE - business in', embryologicalLayer: 'Ectoderm', isAiExtracted: false, isCommitted: true },
  { id: 'rub-4', chapter: 'HEAD', fullStringPath: 'HEAD - PAIN - pulsating - sudden', embryologicalLayer: 'Ectoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-5', chapter: 'HEAD', fullStringPath: 'HEAD - PAIN - sun - exposure to', embryologicalLayer: 'Ectoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-6', chapter: 'HEAD', fullStringPath: 'HEAD - CONGESTION - violent - carotid pulsation', embryologicalLayer: 'Ectoderm', isAiExtracted: false, isCommitted: true },
  { id: 'rub-7', chapter: 'EYES', fullStringPath: 'EYES - PUPILS - dilated - insensitive to light', embryologicalLayer: 'Ectoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-8', chapter: 'ABDOMEN', fullStringPath: 'ABDOMEN - CIRRHOSIS - liver - chronic parenchyma', embryologicalLayer: 'Endoderm', isAiExtracted: false, isCommitted: true },
  { id: 'rub-9', chapter: 'ABDOMEN', fullStringPath: 'ABDOMEN - PAIN - right scapula - under lower angle', embryologicalLayer: 'Endoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-10', chapter: 'ABDOMEN', fullStringPath: 'ABDOMEN - JAUNDICE - yellow sclera - stool clay colored', embryologicalLayer: 'Endoderm', isAiExtracted: false, isCommitted: true },
  { id: 'rub-11', chapter: 'EXTREMITIES', fullStringPath: 'EXTREMITIES - PAIN - motion - beginning of - on', embryologicalLayer: 'Mesoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-12', chapter: 'EXTREMITIES', fullStringPath: 'EXTREMITIES - PAIN - stitching - slightest motion aggravates', embryologicalLayer: 'Mesoderm', isAiExtracted: false, isCommitted: true },
  { id: 'rub-13', chapter: 'THROAT', fullStringPath: 'THROAT - PAIN - swallowing - liquids aggravates', embryologicalLayer: 'Endoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-14', chapter: 'STOMACH', fullStringPath: 'STOMACH - THIRST - large quantities - infrequent', embryologicalLayer: 'Endoderm', isAiExtracted: false, isCommitted: true },
  { id: 'rub-15', chapter: 'STOMACH', fullStringPath: 'STOMACH - THIRSTLESS - fever during', embryologicalLayer: 'Endoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-16', chapter: 'SKIN', fullStringPath: 'SKIN - ERUPTIONS - vesicular - bluish - itching', embryologicalLayer: 'Ectoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-17', chapter: 'SKIN', fullStringPath: 'SKIN - ERUPTIONS - scaly - dry - silvery scales', embryologicalLayer: 'Ectoderm', isAiExtracted: false, isCommitted: true },
  { id: 'rub-18', chapter: 'SLEEP', fullStringPath: 'GENERALITIES - SLEEP - position - knee-chest position', embryologicalLayer: 'Ectoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-19', chapter: 'GENERALITIES', fullStringPath: 'GENERALITIES - HEAT - flushes of - sudden', embryologicalLayer: 'Ectoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-20', chapter: 'GENERALITIES', fullStringPath: 'GENERALITIES - AGGRAVATION - 3 pm to 4 pm', embryologicalLayer: 'Ectoderm', isAiExtracted: false, isCommitted: true },
];

const INITIAL_MATRIX_CELLS: MatrixCell[] = [
  { rubricId: 'rub-1', remedyId: 'rem-bry', grade: 4 },
  { rubricId: 'rub-1', remedyId: 'rem-bell', grade: 3 },
  { rubricId: 'rub-1', remedyId: 'rem-nuxv', grade: 4 },
  { rubricId: 'rub-1', remedyId: 'rem-lyc', grade: 3 },
  { rubricId: 'rub-2', remedyId: 'rem-acon', grade: 4 },
  { rubricId: 'rub-2', remedyId: 'rem-ars', grade: 4 },
  { rubricId: 'rub-2', remedyId: 'rem-bell', grade: 3 },
  { rubricId: 'rub-2', remedyId: 'rem-puls', grade: 3 },
  { rubricId: 'rub-3', remedyId: 'rem-bell', grade: 4 },
  { rubricId: 'rub-3', remedyId: 'rem-nuxv', grade: 3 },
  { rubricId: 'rub-4', remedyId: 'rem-bell', grade: 4 },
  { rubricId: 'rub-4', remedyId: 'rem-acon', grade: 3 },
  { rubricId: 'rub-4', remedyId: 'rem-sulph', grade: 2 },
  { rubricId: 'rub-4', remedyId: 'rem-bry', grade: 2 },
  { rubricId: 'rub-5', remedyId: 'rem-bell', grade: 4 },
  { rubricId: 'rub-5', remedyId: 'rem-glonoine', grade: 4 } as any,
  { rubricId: 'rub-5', remedyId: 'rem-natm', grade: 3 },
  { rubricId: 'rub-6', remedyId: 'rem-bell', grade: 4 },
  { rubricId: 'rub-6', remedyId: 'rem-acon', grade: 3 },
  { rubricId: 'rub-7', remedyId: 'rem-bell', grade: 4 },
  { rubricId: 'rub-8', remedyId: 'rem-chel', grade: 4 },
  { rubricId: 'rub-8', remedyId: 'rem-sulph', grade: 3 },
  { rubricId: 'rub-8', remedyId: 'rem-lyc', grade: 3 },
  { rubricId: 'rub-9', remedyId: 'rem-chel', grade: 4 },
  { rubricId: 'rub-9', remedyId: 'rem-lyc', grade: 2 },
  { rubricId: 'rub-10', remedyId: 'rem-chel', grade: 4 },
  { rubricId: 'rub-10', remedyId: 'rem-merc', grade: 3 },
  { rubricId: 'rub-11', remedyId: 'rem-rhust', grade: 4 },
  { rubricId: 'rub-11', remedyId: 'rem-bry', grade: 3 },
  { rubricId: 'rub-12', remedyId: 'rem-bry', grade: 4 },
  { rubricId: 'rub-13', remedyId: 'rem-bell', grade: 4 },
  { rubricId: 'rub-13', remedyId: 'rem-lach', grade: 4 },
  { rubricId: 'rub-14', remedyId: 'rem-bry', grade: 4 },
  { rubricId: 'rub-14', remedyId: 'rem-sulph', grade: 3 },
  { rubricId: 'rub-15', remedyId: 'rem-bell', grade: 3 },
  { rubricId: 'rub-15', remedyId: 'rem-puls', grade: 3 },
  { rubricId: 'rub-16', remedyId: 'rem-rhust', grade: 4 },
  { rubricId: 'rub-16', remedyId: 'rem-lach', grade: 3 },
  { rubricId: 'rub-17', remedyId: 'rem-sulph', grade: 4 },
  { rubricId: 'rub-17', remedyId: 'rem-ars', grade: 3 },
  { rubricId: 'rub-18', remedyId: 'rem-puls', grade: 3 },
  { rubricId: 'rub-18', remedyId: 'rem-sulph', grade: 2 },
  { rubricId: 'rub-19', remedyId: 'rem-bell', grade: 4 },
  { rubricId: 'rub-19', remedyId: 'rem-sulph', grade: 3 },
  { rubricId: 'rub-20', remedyId: 'rem-bell', grade: 4 },
];

export default function MateriaGridMasterWorkspace() {
  const [currentView, setCurrentView] = useState<'WORKSPACE' | 'LANDING'>(
    'WORKSPACE'
  );
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const isLight = theme === 'light';

  const [langCode, setLangCode] = useState<IndianLanguageCode>('EN');
  const langPack = INDIAN_LANGUAGE_PACKS[langCode];

  const [activeTab, setActiveTab] =
    useState<ActiveWorkspaceTab>('MATRIX_TELEHEALTH');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [sessionId] = useState<string>('sess_2026_production_alpha_01');
  const [rubrics, setRubrics] = useState<RubricRow[]>(INITIAL_RUBRICS);
  const [remedies, setRemedies] = useState<RemedyColumn[]>(INITIAL_REMEDIES);
  const [matrixData, setMatrixData] =
    useState<MatrixCell[]>(INITIAL_MATRIX_CELLS);
  const [isGaitActive] = useState<boolean>(true);
  const [suppressionAlert, setSuppressionAlert] = useState<boolean>(false);
  const [activePatient, setActivePatient] = useState<AbhaPatientRecord | null>(
    null
  );
  const [activeCloneName, setActiveCloneName] = useState<string>(
    'DR_VIJAYAKAR_PREDICTIVE'
  );
  const [thermalProfile, setThermalProfile] = useState<'HOT' | 'CHILLY' | 'AMBITHERMAL'>('HOT');
  const [thirstProfile, setThirstProfile] = useState<'THIRSTLESS' | 'THIRSTY' | 'VARIABLE'>('THIRSTLESS');
  const [isCaseDrawerOpen, setIsCaseDrawerOpen] = useState(false);
  const [isAnatomicalMapOpen, setIsAnatomicalMapOpen] = useState(false);
  const [isHyper8dOpen, setIsHyper8dOpen] = useState(false);
  const [isDecisionFlowchartOpen, setIsDecisionFlowchartOpen] = useState(false);
  const [selectedRemedyForReader, setSelectedRemedyForReader] = useState<
    string | null
  >(null);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAbhaPopover, setShowAbhaPopover] = useState(false);

  // RESTORE STATE FROM URL ON INITIAL MOUNT (REFRESH-SAFE)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang') as IndianLanguageCode;
      if (urlLang && INDIAN_LANGUAGE_PACKS[urlLang]) {
        setLangCode(urlLang);
      }
      const urlModule = params.get('module') as ActiveWorkspaceTab;
      if (urlModule) {
        setActiveTab(urlModule);
      }
      const urlModal = params.get('modal');
      if (urlModal === 'INTAKE_DRAWER') setIsCaseDrawerOpen(true);
      if (urlModal === 'DECISION_GATES') setIsDecisionFlowchartOpen(true);
      if (urlModal === 'PRESCRIPTION_SLIP') setIsPrescriptionModalOpen(true);
    }
  }, []);

  // SYNCHRONIZE ACTIVE STATE TO URL QUERY PARAMS FOR UNIQUE REFRESH-SAFE DEEP LINK
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (currentView === 'WORKSPACE') {
        url.searchParams.set('module', activeTab);
        url.searchParams.set('lang', langCode);

        if (isCaseDrawerOpen) {
          url.searchParams.set('modal', 'INTAKE_DRAWER');
        } else if (isDecisionFlowchartOpen) {
          url.searchParams.set('modal', 'DECISION_GATES');
        } else if (isPrescriptionModalOpen) {
          url.searchParams.set('modal', 'PRESCRIPTION_SLIP');
        } else {
          url.searchParams.delete('modal');
        }
      } else {
        url.searchParams.delete('module');
        url.searchParams.delete('modal');
      }
      window.history.replaceState({}, '', url.toString());
    }
  }, [
    activeTab,
    currentView,
    langCode,
    isCaseDrawerOpen,
    isDecisionFlowchartOpen,
    isPrescriptionModalOpen,
  ]);

  if (currentView === 'LANDING') {
    return (
      <LandingPage
        onLaunchWorkspace={() => setCurrentView('WORKSPACE')}
        theme={theme}
        langCode={langCode}
        onSelectLangCode={setLangCode}
      />
    );
  }

  const filteredRubrics = rubrics.filter((r) =>
    r.fullStringPath.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleCycleThermal = () => {
    setThermalProfile((prev) =>
      prev === 'HOT' ? 'CHILLY' : prev === 'CHILLY' ? 'AMBITHERMAL' : 'HOT'
    );
  };

  const handleCycleThirst = () => {
    setThirstProfile((prev) =>
      prev === 'THIRSTLESS' ? 'THIRSTY' : prev === 'THIRSTY' ? 'VARIABLE' : 'THIRSTLESS'
    );
  };

  const handleUpdateMatrixCellGrade = (
    rubricId: string,
    remedyId: string,
    nextGrade: 0 | 1 | 2 | 3 | 4
  ) => {
    setMatrixData((prev) => {
      const filtered = prev.filter(
        (c) => !(c.rubricId === rubricId && c.remedyId === remedyId)
      );
      if (nextGrade === 0) return filtered;
      return [...filtered, { rubricId, remedyId, grade: nextGrade }];
    });
  };

  const handleCommitAiRubricToMatrix = (rubricPath: string) => {
    const exists = rubrics.some((r) => r.fullStringPath === rubricPath);
    if (!exists) {
      const newRubric: RubricRow = {
        id: `rub-ai-${Date.now()}`,
        chapter: rubricPath.split(' - ')[0] || 'MIND',
        fullStringPath: rubricPath,
        embryologicalLayer: 'Ectoderm',
        isAiExtracted: true,
        isCommitted: true,
      };
      setRubrics((prev) => [newRubric, ...prev]);
    }
    setActiveTab('MATRIX_TELEHEALTH');
  };

  const handleLiveMediaChunkStream = async (
    audioBlob: Blob,
    videoFrameBase64: string
  ) => {
    try {
      if (audioBlob.size > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = ((reader.result as string) || '').split(',')[1];
          if (!base64Audio) return;

          const response = await fetch('/api/bhashini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              audioBlobBase64: base64Audio,
              sourceIndianLanguageCode: 'hi',
            }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.materiagridPayload && data.materiagridPayload.rubrics) {
              refreshCalculationMatrix(data.materiagridPayload);
            }
          }
        };
      }
    } catch (err) {
      MateriaGridSyncQueue.enqueueTransaction({
        idempotencyToken: crypto.randomUUID(),
        sessionId: sessionId,
        action: 'PUSH_SYMPTOM',
        payload: { message: 'Media stream backup intercept snapshot' },
      });
    }
  };

  const refreshCalculationMatrix = (payload: any) => {
    if (payload.rubrics) setRubrics(payload.rubrics);
    if (payload.remedies) setRemedies(payload.remedies);
    if (payload.matrixCells) setMatrixData(payload.matrixCells);
    if (typeof payload.embryologicalWarningActive === 'boolean') {
      setSuppressionAlert(payload.embryologicalWarningActive);
    }
  };

  const handleToggleCommitRubric = async (rubricId: string, accept: boolean) => {
    setRubrics((prev) =>
      prev.map((r) => (r.id === rubricId ? { ...r, isCommitted: accept } : r))
    );

    const operationLog = [
      {
        rubricId,
        doctorId: 'DOC_IN_CHARGE_OPD',
        action: accept ? ('ADD' as const) : ('REMOVE' as const),
        timestamp: Date.now(),
      },
    ];

    try {
      await mergeConcurrentDoctorOperations({
        sessionId,
        clientOperationsLog: operationLog,
      });
    } catch (crdtErr) {
      console.warn('[CRDT OPTIMISTIC FALLBACK ACTIVE]');
    }
  };

  const handleSelectDoctorClone = (cloneName: string) => {
    setActiveCloneName(cloneName);
    if (cloneName === 'DR_SEHGAL_ROH') {
      setRemedies((prev) =>
        prev
          .map((r) => ({
            ...r,
            specificityScore: Number(
              (r.code === 'Bell'
                ? 82.5
                : r.code === 'Acon'
                ? 76.1
                : r.specificityScore
              ).toFixed(1)
            ),
          }))
          .sort((a, b) => b.specificityScore - a.specificityScore)
      );
    } else {
      setRemedies(INITIAL_REMEDIES);
    }
  };

  return (
    <div
      className={`flex flex-col lg:flex-row w-full h-screen overflow-hidden font-sans antialiased transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#05070A] text-[#E6E8EA]'
      }`}
    >
      {/* MOBILE / TABLET TOP NAVIGATION BAR (< 1024PX) */}
      <div
        className={`flex lg:hidden items-center justify-between px-3 py-2 border-b z-30 ${
          isLight
            ? 'bg-white/90 border-slate-200'
            : 'bg-[#111317]/90 border-[#1C1F26]'
        }`}
      >
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-1.5 rounded-lg border border-slate-300 text-slate-700 cursor-pointer"
          >
            <Menu className="w-4 h-4" />
          </button>
          <span className="font-black tracking-wider text-xs uppercase font-mono">
            MATERIAGRID OPD
          </span>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => setCurrentView('LANDING')}
            className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-300 text-[10px] font-bold cursor-pointer"
          >
            3D Showcase
          </button>
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg border border-slate-300 text-slate-700 cursor-pointer"
          >
            {isLight ? (
              <Moon className="w-3.5 h-3.5" />
            ) : (
              <Sun className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* HARMONIZED EXECUTIVE LEFT SIDEBAR NAVIGATION WITH LANGPACK TRANSLATION */}
      <SidebarNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        theme={theme}
        onToggleTheme={toggleTheme}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onOpenLandingPage={() => setCurrentView('LANDING')}
        langCode={langCode}
      />

      {/* RIGHT MAIN VIEWPORT */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* AMBIENT BIO-EMERALD VOLUMETRIC LIGHT FIELDS (DARK MODE ONLY) */}
        {!isLight && (
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]" />
            <div className="absolute bottom-10 left-1/3 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[160px]" />
          </div>
        )}

        {/* ULTRA-COMPACT SINGLE-ROW EXECUTIVE COMMAND BRIDGE HUD (56px) WITH UNIFIED THEME */}
        <div
          className={`px-4 py-2 border-b flex flex-wrap items-center justify-between gap-3 text-xs z-30 flex-shrink-0 transition-colors ${
            isLight
              ? 'bg-white/95 border-slate-200/90 text-slate-800 shadow-2xs backdrop-blur-md'
              : 'bg-[#05070A]/95 border-[#1C1F26] text-white shadow-xl backdrop-blur-2xl'
          }`}
        >
          {/* ZONE 1: PATIENT ABHA IDENTITY & CLINICAL PERSONA CLONE */}
          <div className="flex items-center space-x-2.5 relative">
            <div className="relative group">
              <button
                onClick={() => setShowAbhaPopover((prev) => !prev)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border font-mono font-bold cursor-pointer transition-all transform hover:scale-105 ${
                  isLight
                    ? 'border-emerald-300 bg-emerald-50/80 text-emerald-950 hover:bg-emerald-100/90'
                    : 'border-emerald-500/50 bg-[#0B0F19] text-emerald-300 hover:bg-emerald-950/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                }`}
                title="Click to inspect ABHA Patient Record & EHR"
              >
                <UserCheck
                  className={`w-3.5 h-3.5 ${
                    isLight ? 'text-emerald-700' : 'text-emerald-400'
                  }`}
                />
                <span>
                  ABHA:{' '}
                  <strong className={isLight ? 'text-slate-900' : 'text-white'}>
                    {activePatient ? activePatient.abhaId : '91-4829-1049-3829'}
                  </strong>
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-600 text-white font-black">
                  {langPack.labels.verifiedAbha}
                </span>
              </button>
            </div>

            {/* + NEW CASE INTAKE */}
            <button
              onClick={() => setIsCaseDrawerOpen(true)}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 shadow-sm transition-all transform hover:scale-105 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{langPack.labels.intake}</span>
            </button>

            {/* CASE DECISION-GATE FLOWCHART TRIGGER BUTTON */}
            <button
              onClick={() => setIsDecisionFlowchartOpen(true)}
              className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 shadow-sm transition-all transform hover:scale-105 cursor-pointer"
              title="Inspect interactive Decision-Gate Flowchart & YES/NO gates for each illness"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>{langPack.labels.decisionGates}</span>
            </button>

            {/* INDIAN MULTI-LANGUAGE PACK SWITCHER DROPDOWN */}
            <div className="flex items-center space-x-1 border rounded-xl px-2 py-1 bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-800">
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <select
                value={langCode}
                onChange={(e) => setLangCode(e.target.value as IndianLanguageCode)}
                className="bg-transparent text-xs font-black outline-none cursor-pointer text-slate-800 dark:text-white"
              >
                {Object.values(INDIAN_LANGUAGE_PACKS).map((pack) => (
                  <option
                    key={pack.code}
                    value={pack.code}
                    className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    🌐 {pack.nativeName} ({pack.englishName})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ZONE 2: SIMILIMATRIX SIMILLIMUM & SPATIAL AI ACTIONS */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative group">
              <button
                onClick={() => setIsPrescriptionModalOpen(true)}
                className={`flex items-center space-x-1.5 border px-3.5 py-1.5 rounded-xl transition-all transform hover:scale-105 cursor-pointer ${
                  isLight
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-950 font-black shadow-2xs'
                    : 'border-emerald-500/60 bg-emerald-950/80 text-emerald-300 font-black shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>
                  {langPack.labels.topSimillimum}:{' '}
                  <strong className={isLight ? 'text-emerald-700' : 'text-white'}>
                    {remedies[0]?.code || 'Bell'} ({remedies[0]?.specificityScore || 65.2})
                  </strong>
                </span>
              </button>
            </div>

            <button
              onClick={() => setIsPrescriptionModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1 transition-all transform hover:scale-105 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{langPack.labels.rxSlip}</span>
            </button>
          </div>

          {/* ZONE 3: INLINE CONSTITUTIONAL TELEMETRY CHIPS */}
          <div className="hidden xl:flex items-center space-x-2 font-mono text-[11px]">
            <button
              onClick={handleCycleThermal}
              title="Click to cycle Thermal profile"
              className={`px-2.5 py-1 rounded-lg border font-black cursor-pointer transition-all transform hover:scale-105 ${
                isLight
                  ? 'border-orange-300 bg-orange-50 text-orange-900'
                  : 'border-orange-500/60 bg-orange-950/40 text-orange-300'
              }`}
            >
              🔥 <strong>{thermalProfile === 'HOT' ? langPack.labels.hot : langPack.labels.chilly}</strong>
            </button>

            <button
              onClick={handleCycleThirst}
              title="Click to cycle Thirst profile"
              className={`px-2.5 py-1 rounded-lg border font-black cursor-pointer transition-all transform hover:scale-105 ${
                isLight
                  ? 'border-cyan-300 bg-cyan-50 text-cyan-900'
                  : 'border-cyan-500/60 bg-cyan-950/40 text-cyan-300'
              }`}
            >
              💧 <strong>{thirstProfile === 'THIRSTLESS' ? langPack.labels.thirstless : langPack.labels.thirsty}</strong>
            </button>

            <span
              className={`px-2.5 py-1 rounded-lg border font-black ${
                isLight
                  ? 'border-purple-300 bg-purple-50 text-purple-900'
                  : 'border-purple-500/60 bg-purple-950/40 text-purple-300'
              }`}
            >
              🧭 <strong>{langPack.labels.rightToLeft}</strong>
            </span>

            <span
              className={`px-2.5 py-1 rounded-lg border font-black ${
                isLight
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                  : 'border-emerald-500/60 bg-emerald-950/50 text-emerald-300'
              }`}
            >
              🛡️ <strong>{langPack.labels.vitalForceStrong}</strong>
            </span>
          </div>
        </div>

        {/* DYNAMIC WORKSPACE MODULE CONTENTS BELOW PERSISTENT EXECUTIVE COMMAND HEADER */}
        <div className="flex-1 flex flex-col w-full h-full overflow-hidden">
          {/* VIEW 1: SIMILIMATRIX & TELEHEALTH WORKSPACE */}
          {activeTab === 'MATRIX_TELEHEALTH' && (
            <div className="flex flex-col lg:flex-row flex-1 w-full h-full overflow-hidden">
              {/* LEFT CANVAS: DENSE HIGH-VIRTUALIZATION TABLE ENGINE */}
              <div className="flex-1 h-full overflow-hidden flex flex-col relative">
                <div className="flex-1 overflow-hidden relative">
                  <WorkspaceMatrix
                    initialRubrics={filteredRubrics}
                    calculatedRemedies={remedies}
                    matrixPayload={matrixData}
                    onToggleCommitRubric={handleToggleCommitRubric}
                    embryologicalWarningActive={suppressionAlert}
                    onSelectRemedyHeader={(code) =>
                      setSelectedRemedyForReader(code)
                    }
                    onUpdateMatrixCellGrade={handleUpdateMatrixCellGrade}
                    onAddNewRubricToMatrix={(path, layer) => {
                      const newRub: RubricRow = {
                        id: `rub-${Date.now()}`,
                        chapter: path.split(' - ')[0] || 'MIND',
                        fullStringPath: path,
                        embryologicalLayer: layer,
                        isAiExtracted: false,
                        isCommitted: true,
                      };
                      setRubrics((prev) => [newRub, ...prev]);
                    }}
                    theme={theme}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    langCode={langCode}
                  />
                </div>
              </div>

              {/* RIGHT CANVAS: LIVE TELEHEALTH WEBRTC SCREEN STREAM */}
              <VideoConsultationHarness
                sessionId={sessionId}
                onMediaChunkGenerated={handleLiveMediaChunkStream}
                isGaitAnalysisActive={isGaitActive}
                theme={theme}
              />
            </div>
          )}

          {/* VIEW 2: CLINICAL ANALYTICS, GRAPHS & MIASMATIC RADAR VISUALIZER */}
          {activeTab === 'ANALYTICS_GRAPHS' && (
            <ClinicalAnalyticsGraphs theme={theme} />
          )}

          {/* VIEW 3: AI CLINICAL DECISION COPILOT & CHATBOT SUITE */}
          {activeTab === 'AI_CHATBOT' && (
            <AiClinicalChatbotPanel
              onCommitRubricToMatrix={handleCommitAiRubricToMatrix}
            />
          )}

          {/* VIEW 4: PATIENT CASE MANAGEMENT & ABHA EHR REPOSITORY */}
          {activeTab === 'PATIENT_REPOSITORY' && (
            <PatientCaseRepositoryView theme={theme} />
          )}

          {/* VIEW 5: CLASSICAL MATERIA MEDICA LIBRARY & PROVING REFERENCE */}
          {activeTab === 'MATERIA_MEDICA_LIBRARY' && (
            <MateriaMedicaLibraryView theme={theme} />
          )}

          {/* VIEW 6: DIAGNOSTIC LAB & VISION AI */}
          {activeTab === 'DIAGNOSTIC_LAB_AI' && (
            <DiagnosticLabAiView
              theme={theme}
              onCommitRubricToMatrix={handleCommitAiRubricToMatrix}
            />
          )}

          {/* VIEW 7: AYUSH ACADEMIC RESEARCH HUB */}
          {activeTab === 'AYUSH_RESEARCH_HUB' && (
            <AyushResearchHubView theme={theme} />
          )}

          {/* VIEW 8: OPD WAITING QUEUE & UHI SLOT MANAGER */}
          {activeTab === 'OPD_QUEUE_MANAGER' && (
            <OpdQueueManagerView theme={theme} />
          )}

          {/* VIEW 9: PHARMACY & LM DISPENSARY */}
          {activeTab === 'PHARMACY_DISPENSARY' && (
            <PharmacyDispensaryView theme={theme} />
          )}

          {/* VIEW 10: TRI-REMEDY COMPARATIVE DIFFERENTIAL WORKBENCH */}
          {activeTab === 'DIFFERENTIAL_WORKBENCH' && (
            <DifferentialWorkbenchView theme={theme} />
          )}

          {/* VIEW 11: ENTERPRISE $1B PLATFORM SUITE (FLEET RBAC, RWE & UHI CLAIMS) */}
          {activeTab === 'ENTERPRISE_SUITE' && (
            <EnterpriseUnicornSuiteView theme={theme} />
          )}
        </div>
      </main>

      {/* CASE HISTORY INTAKE & SEHGAL ROH / BÖNNINGHAUSEN DRAWER */}
      <CaseHistoryIntakeDrawer
        isOpen={isCaseDrawerOpen}
        onClose={() => setIsCaseDrawerOpen(false)}
        onCommitExtractedRubrics={(newRubrics) => {
          setRubrics((prev) => [...newRubrics, ...prev]);
        }}
        langCode={langCode}
      />

      {/* INTERACTIVE CLINICAL CASE DECISION-GATE FLOWCHART MODAL FOR PORTAL */}
      <PortalClinicalDecisionFlowchartModal
        isOpen={isDecisionFlowchartOpen}
        onClose={() => setIsDecisionFlowchartOpen(false)}
        theme={theme}
      />

      {/* CLASSICAL MATERIA MEDICA PROVING READER MODAL */}
      <MateriaMedicaReaderModal
        remedyCode={selectedRemedyForReader}
        onClose={() => setSelectedRemedyForReader(null)}
      />

      {/* 3D SPATIAL ANATOMICAL ORGAN AFFINITY BODY MAP MODAL */}
      <AnatomicalAffinityMapModal
        isOpen={isAnatomicalMapOpen}
        onClose={() => setIsAnatomicalMapOpen(false)}
        topRemedyCode={remedies[0]?.code || 'Bell'}
        theme={theme}
      />

      {/* 8D/10D HYPER-DIMENSIONAL QUANTUM TELEMETRY MODAL */}
      <HyperDimensionalTelemetryModal
        isOpen={isHyper8dOpen}
        onClose={() => setIsHyper8dOpen(false)}
        topRemedyCode={remedies[0]?.code || 'Bell'}
        theme={theme}
      />

      {/* DIGITAL PRESCRIPTION & PHARMACY DISPENSING SLIP MODAL */}
      <PrescriptionGeneratorModal
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
        patientName={
          activePatient ? activePatient.fullName : 'Ramesh Kumar Sharma'
        }
        topRemedyCode={remedies[0]?.code || 'Bell'}
        topRemedyName={remedies[0]?.fullName || 'Belladonna'}
        specificityScore={remedies[0]?.specificityScore || 65.2}
        langCode={langCode}
      />
    </div>
  );
}

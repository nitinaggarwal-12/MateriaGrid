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
import { PatientProfileView } from '@/components/dashboard/PatientProfileView';
import { DoctorProfileView } from '@/components/dashboard/DoctorProfileView';
import { HospitalProfileView } from '@/components/dashboard/HospitalProfileView';
import { SupportContactCenterView } from '@/components/dashboard/SupportContactCenterView';
import { ProfileCreationStudioView } from '@/components/dashboard/ProfileCreationStudioView';
import { ClinicalDiscussionBlogsView } from '@/components/dashboard/ClinicalDiscussionBlogsView';
import { BhmsClinicalAcademyView } from '@/components/dashboard/BhmsClinicalAcademyView';
import { UserPersonaHeaderWidget } from '@/components/auth/UserPersonaHeaderWidget';
import { AnatomicalAffinityMapModal } from '@/components/dashboard/AnatomicalAffinityMapModal';
import { HyperDimensionalTelemetryModal } from '@/components/dashboard/HyperDimensionalTelemetryModal';
import { PortalClinicalDecisionFlowchartModal } from '@/components/dashboard/PortalClinicalDecisionFlowchartModal';
import { RbacProvider, useRbac } from '@/lib/auth/rbac_context';
import { RbacLoginModal } from '@/components/auth/RbacLoginModal';
import { SearchableLanguagePicker } from '@/components/dashboard/SearchableLanguagePicker';
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
  Lock,
  CheckCircle2,
  Monitor,
  Video,
  Users,
  ChevronDown,
  ArrowRight,
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
  { id: 'rub-21', chapter: 'BACK', fullStringPath: 'BACK - PAIN - lumbar region - motion aggravates', embryologicalLayer: 'Mesoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-22', chapter: 'BACK', fullStringPath: 'BACK - stiffness - cervical region - morning on waking', embryologicalLayer: 'Mesoderm', isAiExtracted: false, isCommitted: true },
  { id: 'rub-23', chapter: 'CHILL', fullStringPath: 'CHILL - CHILLINESS - nervous excitation, from', embryologicalLayer: 'Ectoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-24', chapter: 'FEVER', fullStringPath: 'FEVER - BURNING HEAT - uncontainable restlessness during', embryologicalLayer: 'Ectoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-25', chapter: 'PERSPIRATION', fullStringPath: 'PERSPIRATION - PROFUSE - nocturnal - cold clammy forehead', embryologicalLayer: 'Endoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-26', chapter: 'VERTIGO', fullStringPath: 'VERTIGO - MOTION - turning head quickly aggravates', embryologicalLayer: 'Ectoderm', isAiExtracted: false, isCommitted: true },
  { id: 'rub-27', chapter: 'CHEST', fullStringPath: 'CHEST - OPPRESSION - dyspnoea midnight after', embryologicalLayer: 'Mesoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-28', chapter: 'COUGH', fullStringPath: 'COUGH - DRY - barking, croupy - worse night', embryologicalLayer: 'Endoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-29', chapter: 'RESPIRATION', fullStringPath: 'RESPIRATION - ASTHMATIC - humid - damp weather aggravates', embryologicalLayer: 'Endoderm', isAiExtracted: false, isCommitted: true },
  { id: 'rub-30', chapter: 'BLADDER', fullStringPath: 'BLADDER - URGENCY - sudden, irrepressible desire to urinate', embryologicalLayer: 'Endoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-31', chapter: 'VISION', fullStringPath: 'VISION - SPARKS - fiery sparks before eyes during migraine', embryologicalLayer: 'Ectoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-32', chapter: 'EARS', fullStringPath: 'EARS - PAIN - pulsating, throbbing - midnight aggravates', embryologicalLayer: 'Ectoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-33', chapter: 'HEARING', fullStringPath: 'HEARING - IMPAIRED - catarrhal Eustachian tube obstruction', embryologicalLayer: 'Ectoderm', isAiExtracted: false, isCommitted: true },
  { id: 'rub-34', chapter: 'NOSE', fullStringPath: 'NOSE - CORYZA - fluent, acrid discharge burning upper lip', embryologicalLayer: 'Ectoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-35', chapter: 'FACE', fullStringPath: 'FACE - NEURALGIA - right side - tearing, shooting pains', embryologicalLayer: 'Ectoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-36', chapter: 'MOUTH', fullStringPath: 'MOUTH - ULCERS - painful, aphthous - bleeding on touch', embryologicalLayer: 'Endoderm', isAiExtracted: false, isCommitted: true },
  { id: 'rub-37', chapter: 'TEETH', fullStringPath: 'TEETH - PAIN - throbbing - warm drinks aggravates', embryologicalLayer: 'Ectoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-38', chapter: 'RECTUM', fullStringPath: 'RECTUM - HAEMORRHOIDS - painful, protruding like grapes', embryologicalLayer: 'Endoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-39', chapter: 'STOOL', fullStringPath: 'STOOL - DIARRHOEA - watery, involuntary - rotten egg odor', embryologicalLayer: 'Endoderm', isAiExtracted: false, isCommitted: true },
  { id: 'rub-40', chapter: 'KIDNEYS', fullStringPath: 'KIDNEYS - INFLAMMATION - acute nephritis with albuminuria', embryologicalLayer: 'Endoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-41', chapter: 'URINE', fullStringPath: 'URINE - BURNING - during micturition - drop by drop', embryologicalLayer: 'Endoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-42', chapter: 'GENITALIA MALE', fullStringPath: 'GENITALIA MALE - ORCHITIS - right testis swollen and painful', embryologicalLayer: 'Mesoderm', isAiExtracted: false, isCommitted: true },
  { id: 'rub-43', chapter: 'GENITALIA FEMALE', fullStringPath: 'GENITALIA FEMALE - DYSMENORRHOEA - violent uterine colic', embryologicalLayer: 'Mesoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-44', chapter: 'EYES', fullStringPath: 'EYES - LACHRYMATION - acrid, scalding - coryza during', embryologicalLayer: 'Ectoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-45', chapter: 'VISION', fullStringPath: 'VISION - HALOS - rainbow colors around candlelight', embryologicalLayer: 'Ectoderm', isAiExtracted: false, isCommitted: true },
  { id: 'rub-46', chapter: 'EARS', fullStringPath: 'EARS - OTITIS MEDIA - acute, suppuration - swelling behind ear', embryologicalLayer: 'Ectoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-47', chapter: 'HEARING', fullStringPath: 'HEARING - RINGING - buzzing, roaring in ears - night', embryologicalLayer: 'Ectoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-48', chapter: 'NOSE', fullStringPath: 'NOSE - EPISTAXIS - bright red blood - morning on washing face', embryologicalLayer: 'Ectoderm', isAiExtracted: false, isCommitted: true },
  { id: 'rub-49', chapter: 'FACE', fullStringPath: 'FACE - DISCOLORATION - bluish, dusky around lips', embryologicalLayer: 'Ectoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-50', chapter: 'MOUTH', fullStringPath: 'MOUTH - SALIVATION - profuse, metallic taste - night', embryologicalLayer: 'Endoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-51', chapter: 'TEETH', fullStringPath: 'TEETH - TOOTHACHE - cold water relieves temporarily', embryologicalLayer: 'Ectoderm', isAiExtracted: false, isCommitted: true },
  { id: 'rub-52', chapter: 'THROAT', fullStringPath: 'THROAT - TONSILLITIS - dark red, swollen - right to left', embryologicalLayer: 'Endoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-53', chapter: 'STOMACH', fullStringPath: 'STOMACH - NAUSEA - constant - empty vomiting does not relieve', embryologicalLayer: 'Endoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-54', chapter: 'RECTUM', fullStringPath: 'RECTUM - FISSURE - burning pain after stool for hours', embryologicalLayer: 'Endoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-55', chapter: 'STOOL', fullStringPath: 'STOOL - CONSTIPATION - hard, knotty, dark balls like sheep dung', embryologicalLayer: 'Endoderm', isAiExtracted: false, isCommitted: true },
  { id: 'rub-56', chapter: 'BLADDER', fullStringPath: 'BLADDER - TENESMUS - painful urging after micturition', embryologicalLayer: 'Endoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-57', chapter: 'KIDNEYS', fullStringPath: 'KIDNEYS - COLIC - renal calculus - cutting pain along ureter', embryologicalLayer: 'Endoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-58', chapter: 'URINE', fullStringPath: 'URINE - SEDIMENT - red brick-dust uric acid crystals', embryologicalLayer: 'Endoderm', isAiExtracted: false, isCommitted: true },
  { id: 'rub-59', chapter: 'GENITALIA MALE', fullStringPath: 'GENITALIA MALE - PROSTATITIS - acute enlargement - urging to urinate', embryologicalLayer: 'Mesoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-60', chapter: 'GENITALIA FEMALE', fullStringPath: 'GENITALIA FEMALE - LEUCORRHOEA - thick, yellow, acrid itching', embryologicalLayer: 'Mesoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-61', chapter: 'RESPIRATION', fullStringPath: 'RESPIRATION - DYSPNOEA - lying down aggravates - propped up relieves', embryologicalLayer: 'Endoderm', isAiExtracted: false, isCommitted: true },
  { id: 'rub-62', chapter: 'COUGH', fullStringPath: 'COUGH - WHOOPING - violent paroxysms - vomiting after', embryologicalLayer: 'Endoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-63', chapter: 'CHEST', fullStringPath: 'CHEST - PAIN - stitching - right side of chest - motion aggravates', embryologicalLayer: 'Mesoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-64', chapter: 'SLEEP', fullStringPath: 'SLEEP - NIGHTMARES - terrifying dreams of death and drowning', embryologicalLayer: 'Ectoderm', isAiExtracted: false, isCommitted: true },
  { id: 'rub-65', chapter: 'CHILL', fullStringPath: 'CHILL - INTERNAL - icy coldness in blood vessels - shivering', embryologicalLayer: 'Ectoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-66', chapter: 'FEVER', fullStringPath: 'FEVER - CHILLS & HEAT - alternating flashes of chill and heat', embryologicalLayer: 'Ectoderm', isAiExtracted: true, isCommitted: true },
  { id: 'rub-67', chapter: 'PERSPIRATION', fullStringPath: 'PERSPIRATION - SWEAT - offensive sour odor - night', embryologicalLayer: 'Endoderm', isAiExtracted: false, isCommitted: true },
  { id: 'rub-68', chapter: 'VERTIGO', fullStringPath: 'VERTIGO - HIGH PLACES - looking down from height aggravates', embryologicalLayer: 'Ectoderm', isAiExtracted: true, isCommitted: true },
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
  { rubricId: 'rub-21', remedyId: 'rem-bry', grade: 4 },
  { rubricId: 'rub-21', remedyId: 'rem-rhust', grade: 4 },
  { rubricId: 'rub-22', remedyId: 'rem-rhust', grade: 4 },
  { rubricId: 'rub-22', remedyId: 'rem-nuxv', grade: 3 },
  { rubricId: 'rub-23', remedyId: 'rem-acon', grade: 4 },
  { rubricId: 'rub-23', remedyId: 'rem-ars', grade: 3 },
  { rubricId: 'rub-24', remedyId: 'rem-acon', grade: 4 },
  { rubricId: 'rub-24', remedyId: 'rem-ars', grade: 4 },
  { rubricId: 'rub-24', remedyId: 'rem-bell', grade: 3 },
  { rubricId: 'rub-25', remedyId: 'rem-ars', grade: 4 },
  { rubricId: 'rub-25', remedyId: 'rem-merc', grade: 4 },
  { rubricId: 'rub-26', remedyId: 'rem-bell', grade: 4 },
  { rubricId: 'rub-26', remedyId: 'rem-bry', grade: 3 },
  { rubricId: 'rub-27', remedyId: 'rem-ars', grade: 4 },
  { rubricId: 'rub-27', remedyId: 'rem-acon', grade: 3 },
  { rubricId: 'rub-28', remedyId: 'rem-acon', grade: 4 },
  { rubricId: 'rub-28', remedyId: 'rem-bell', grade: 3 },
  { rubricId: 'rub-29', remedyId: 'rem-natm', grade: 4 },
  { rubricId: 'rub-29', remedyId: 'rem-ars', grade: 3 },
  { rubricId: 'rub-30', remedyId: 'rem-bell', grade: 4 },
  { rubricId: 'rub-30', remedyId: 'rem-canth', grade: 4 } as any,
  { rubricId: 'rub-31', remedyId: 'rem-bell', grade: 4 },
  { rubricId: 'rub-31', remedyId: 'rem-sulph', grade: 3 },
  { rubricId: 'rub-32', remedyId: 'rem-bell', grade: 4 },
  { rubricId: 'rub-32', remedyId: 'rem-puls', grade: 3 },
  { rubricId: 'rub-33', remedyId: 'rem-puls', grade: 4 },
  { rubricId: 'rub-33', remedyId: 'rem-merc', grade: 3 },
  { rubricId: 'rub-34', remedyId: 'rem-ars', grade: 4 },
  { rubricId: 'rub-34', remedyId: 'rem-nuxv', grade: 3 },
  { rubricId: 'rub-35', remedyId: 'rem-bell', grade: 4 },
  { rubricId: 'rub-35', remedyId: 'rem-bry', grade: 3 },
  { rubricId: 'rub-36', remedyId: 'rem-merc', grade: 4 },
  { rubricId: 'rub-36', remedyId: 'rem-sulph', grade: 3 },
  { rubricId: 'rub-37', remedyId: 'rem-puls', grade: 4 },
  { rubricId: 'rub-37', remedyId: 'rem-bry', grade: 3 },
  { rubricId: 'rub-38', remedyId: 'rem-nuxv', grade: 4 },
  { rubricId: 'rub-38', remedyId: 'rem-sulph', grade: 4 },
  { rubricId: 'rub-39', remedyId: 'rem-ars', grade: 4 },
  { rubricId: 'rub-40', remedyId: 'rem-ars', grade: 4 },
  { rubricId: 'rub-41', remedyId: 'rem-bell', grade: 4 },
  { rubricId: 'rub-42', remedyId: 'rem-puls', grade: 4 },
  { rubricId: 'rub-43', remedyId: 'rem-puls', grade: 4 },
  { rubricId: 'rub-43', remedyId: 'rem-bell', grade: 3 },
  { rubricId: 'rub-44', remedyId: 'rem-bell', grade: 4 },
  { rubricId: 'rub-44', remedyId: 'rem-puls', grade: 3 },
  { rubricId: 'rub-45', remedyId: 'rem-bell', grade: 4 },
  { rubricId: 'rub-46', remedyId: 'rem-bell', grade: 4 },
  { rubricId: 'rub-46', remedyId: 'rem-puls', grade: 3 },
  { rubricId: 'rub-47', remedyId: 'rem-puls', grade: 4 },
  { rubricId: 'rub-48', remedyId: 'rem-bry', grade: 4 },
  { rubricId: 'rub-49', remedyId: 'rem-lach', grade: 4 },
  { rubricId: 'rub-50', remedyId: 'rem-merc', grade: 4 },
  { rubricId: 'rub-51', remedyId: 'rem-puls', grade: 4 },
  { rubricId: 'rub-52', remedyId: 'rem-lyc', grade: 4 },
  { rubricId: 'rub-53', remedyId: 'rem-ars', grade: 4 },
  { rubricId: 'rub-54', remedyId: 'rem-nitac', grade: 4 } as any,
  { rubricId: 'rub-55', remedyId: 'rem-nuxv', grade: 4 },
  { rubricId: 'rub-56', remedyId: 'rem-canth', grade: 4 } as any,
  { rubricId: 'rub-57', remedyId: 'rem-berb', grade: 4 } as any,
  { rubricId: 'rub-58', remedyId: 'rem-lyc', grade: 4 },
  { rubricId: 'rub-59', remedyId: 'rem-puls', grade: 4 },
  { rubricId: 'rub-60', remedyId: 'rem-puls', grade: 4 },
  { rubricId: 'rub-61', remedyId: 'rem-ars', grade: 4 },
  { rubricId: 'rub-62', remedyId: 'rem-bell', grade: 4 },
  { rubricId: 'rub-63', remedyId: 'rem-bry', grade: 4 },
  { rubricId: 'rub-64', remedyId: 'rem-ars', grade: 4 },
  { rubricId: 'rub-65', remedyId: 'rem-ars', grade: 4 },
  { rubricId: 'rub-66', remedyId: 'rem-acon', grade: 4 },
  { rubricId: 'rub-67', remedyId: 'rem-merc', grade: 4 },
  { rubricId: 'rub-68', remedyId: 'rem-argn', grade: 4 } as any,
];

function MasterWorkspaceInner() {
  const { currentUser, setIsLoginModalOpen } = useRbac();

  // HYDRATION-SAFE STATE INITIALIZERS (MATCHES SSR HTML DETERMINISTICALLY)
  const [currentView, setCurrentView] = useState<'WORKSPACE' | 'LANDING'>('LANDING');
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const isLight = theme === 'light';

  const [langCode, setLangCode] = useState<IndianLanguageCode>('EN');
  const langPack =
    INDIAN_LANGUAGE_PACKS[langCode] || INDIAN_LANGUAGE_PACKS.EN;

  const [activeTab, setActiveTab] = useState<ActiveWorkspaceTab>('MATRIX_TELEHEALTH');
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
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAbhaPopover, setShowAbhaPopover] = useState(false);
  const [langSwitchNotice, setLangSwitchNotice] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // DOCTOR WORKFLOW UPGRADE: IN-PERSON OPD WORKSPACE MODE (100% MATRIX WIDTH BY DEFAULT)
  const [isFullWidthOpdMode, setIsFullWidthOpdMode] = useState(true);

  // DOCTOR WORKFLOW UPGRADE: QUICK FLOATING OPD TOKEN QUEUE SWITCHER
  const [currentOpdToken, setCurrentOpdToken] = useState({
    token: 'TOKEN #04',
    patientName: 'Ramesh Kumar Sharma',
  });

  const handleSelectLanguage = (newCode: IndianLanguageCode) => {
    setLangCode(newCode);
    const pack =
      INDIAN_LANGUAGE_PACKS[newCode] || INDIAN_LANGUAGE_PACKS.EN;
    setLangSwitchNotice(`🌐 ${pack.nativeName} (${pack.englishName})`);
    setTimeout(() => setLangSwitchNotice(null), 3000);
  };

  const handleCallNextPatientInOpd = () => {
    const nextPatients = [
      { token: 'TOKEN #05', patientName: 'Priya Verma (ABHA: 91-8842-1102)' },
      { token: 'TOKEN #06', patientName: 'Suresh Iyer (ABHA: 91-3312-9904)' },
      { token: 'TOKEN #07', patientName: 'Anita Das (ABHA: 91-7721-4431)' },
    ];
    const randomNext =
      nextPatients[Math.floor(Math.random() * nextPatients.length)];
    setCurrentOpdToken(randomNext);
    setLangSwitchNotice(`📋 Called ${randomNext.token} (${randomNext.patientName}) into OPD Consultation Room 1`);
    setTimeout(() => setLangSwitchNotice(null), 3500);
  };

  // RESTORE WORKSPACE STATE FROM URL QUERY PARAMS AFTER CLIENT HYDRATION
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlView = params.get('view');
      const urlModule = params.get('module') as ActiveWorkspaceTab;
      if (urlView === 'WORKSPACE' || urlModule) {
        setCurrentView('WORKSPACE');
      }
      if (urlModule) {
        setActiveTab(urlModule);
      }
      const urlLang = params.get('lang') as IndianLanguageCode;
      if (urlLang && INDIAN_LANGUAGE_PACKS[urlLang]) {
        setLangCode(urlLang);
      }
      const urlModal = params.get('modal');
      if (urlModal === 'INTAKE_DRAWER') setIsCaseDrawerOpen(true);
      if (urlModal === 'DECISION_GATES') setIsDecisionFlowchartOpen(true);
      if (urlModal === 'PRESCRIPTION_SLIP') setIsPrescriptionModalOpen(true);
    }
  }, []);

  // SYNCHRONIZE ACTIVE STATE TO URL QUERY PARAMS FOR UNIQUE REFRESH-SAFE DEEP LINK
  useEffect(() => {
    if (!isMounted) return;
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (currentView === 'WORKSPACE') {
        url.searchParams.set('view', 'WORKSPACE');
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
        url.search = '';
      }
      window.history.replaceState({}, '', url.toString());
    }
  }, [
    isMounted,
    activeTab,
    currentView,
    langCode,
    isCaseDrawerOpen,
    isDecisionFlowchartOpen,
    isPrescriptionModalOpen,
  ]);

  if (currentView === 'LANDING') {
    return (
      <>
        <LandingPage
          onLaunchWorkspace={() => setCurrentView('WORKSPACE')}
          onNavigateToTab={(tab) => {
            setCurrentView('WORKSPACE');
            setActiveTab(tab);
          }}
          onOpenLoginModal={() => setIsLoginModalOpen(true)}
          theme={theme}
          langCode={langCode}
          onSelectLangCode={handleSelectLanguage}
        />
        <RbacLoginModal />
      </>
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
        {/* EXECUTIVE CLINICAL ENCOUNTER HEADER - STICKY FLOATING TOP BAR */}
        <div
          className={`sticky top-0 z-40 border-b flex-shrink-0 transition-colors shadow-xs ${
            isLight
              ? 'bg-white/95 border-slate-200/90 text-slate-800 backdrop-blur-md'
              : 'bg-[#05070A]/95 border-[#1C1F26] text-white backdrop-blur-2xl'
          }`}
        >
          <div className="px-5 py-2 flex items-center justify-between gap-4 text-xs w-full">
            {/* LEFT: ACTIVE OPD PATIENT TOKEN */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex items-center space-x-2 border rounded-xl px-3 py-1.5 bg-emerald-500/10 border-emerald-500/40">
                <span className="font-black text-emerald-700 dark:text-emerald-400 font-mono text-xs whitespace-nowrap">
                  {currentOpdToken.token}: {currentOpdToken.patientName}
                </span>
                <button
                  onClick={handleCallNextPatientInOpd}
                  className="ml-2 px-2.5 py-0.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[10px] cursor-pointer whitespace-nowrap"
                  title="Call Next Patient in OPD Queue"
                >
                  {INDIAN_LANGUAGE_PACKS[langCode]?.labels.nextPatient || 'Next Patient →'}
                </button>
              </div>
            </div>

            {/* FAR TOP-RIGHT CORNER: CONSOLIDATED CLINICAL ACTIONS DROPDOWN & USER PROFILE */}
            <div className="ml-auto flex items-center space-x-2.5 font-mono flex-shrink-0 z-50">
              {/* CONSOLIDATED CLINICAL ACTIONS DROPDOWN */}
              <div className="relative">
                <button
                  onClick={() => setIsToolsDropdownOpen((prev) => !prev)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border font-black text-xs transition-all transform hover:scale-105 cursor-pointer shadow-xs ${
                    isLight
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950 hover:bg-emerald-100'
                      : 'bg-[#111317] border-emerald-500/40 text-emerald-400 hover:bg-emerald-950/40'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  <span>⚡ {INDIAN_LANGUAGE_PACKS[langCode]?.labels.clinicalActions || 'Clinical Actions'}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      isToolsDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isToolsDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsToolsDropdownOpen(false)}
                    />
                    <div
                      className={`absolute right-0 mt-2 w-72 rounded-2xl border p-2.5 shadow-2xl z-50 space-y-1.5 font-sans ${
                        isLight
                          ? 'bg-white border-slate-200 text-slate-900'
                          : 'bg-[#0B0F19] border-[#1C1F26] text-white'
                      }`}
                    >
                      {/* TOP SIMILLIMUM ACTION */}
                      <button
                        onClick={() => {
                          setIsToolsDropdownOpen(false);
                          setIsPrescriptionModalOpen(true);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                          isLight
                            ? 'bg-emerald-50 border-emerald-300 hover:bg-emerald-100'
                            : 'bg-emerald-950/30 border-emerald-500/40 hover:bg-emerald-950/60'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <Award className="w-4 h-4 text-emerald-500" />
                          <div>
                            <p className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                              {INDIAN_LANGUAGE_PACKS[langCode]?.labels.topSimillimum || 'Top Simillimum Rx'}
                            </p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400">
                              {remedies[0]?.code || 'Bell'} (Score:{' '}
                              {remedies[0]?.specificityScore || 65.2})
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                      </button>

                      {/* + CASE INTAKE ACTION */}
                      <button
                        onClick={() => {
                          setIsToolsDropdownOpen(false);
                          setIsCaseDrawerOpen(true);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                          isLight
                            ? 'border-slate-200 hover:bg-slate-100'
                            : 'border-slate-800 hover:bg-[#111317]'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <FileText className="w-4 h-4 text-cyan-500" />
                          <div>
                            <p className="text-xs font-black">
                              {INDIAN_LANGUAGE_PACKS[langCode]?.labels.intake || '+ Case Intake & Sehgal ROH'}
                            </p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400">
                              {INDIAN_LANGUAGE_PACKS[langCode]?.labels.intakeSubtitle || 'Extract Rubrics from Narrative'}
                            </p>
                          </div>
                        </div>
                      </button>

                      {/* DECISION GATES ACTION */}
                      <button
                        onClick={() => {
                          setIsToolsDropdownOpen(false);
                          setIsDecisionFlowchartOpen(true);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                          isLight
                            ? 'border-slate-200 hover:bg-slate-100'
                            : 'border-slate-800 hover:bg-[#111317]'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <GitBranch className="w-4 h-4 text-orange-500" />
                          <div>
                            <p className="text-xs font-black">
                              {INDIAN_LANGUAGE_PACKS[langCode]?.labels.decisionGates || 'Clinical Decision Gates'}
                            </p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400">
                              Burnett & Vijayakar Flowchart
                            </p>
                          </div>
                        </div>
                      </button>

                      {/* OPD GRID / TELEHEALTH VIEW TOGGLE */}
                      {activeTab === 'MATRIX_TELEHEALTH' && (
                        <button
                          onClick={() => {
                            setIsToolsDropdownOpen(false);
                            setIsFullWidthOpdMode((prev) => !prev);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                            isLight
                              ? 'border-slate-200 hover:bg-slate-100'
                              : 'border-slate-800 hover:bg-[#111317]'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            {isFullWidthOpdMode ? (
                              <Video className="w-4 h-4 text-purple-500" />
                            ) : (
                              <Monitor className="w-4 h-4 text-cyan-500" />
                            )}
                            <div>
                              <p className="text-xs font-black">
                                {isFullWidthOpdMode
                                  ? INDIAN_LANGUAGE_PACKS[langCode]?.labels.similiMatrixEngine || 'Switch to Telehealth Split Video'
                                  : INDIAN_LANGUAGE_PACKS[langCode]?.labels.opdQueue || 'Switch to 100% Full OPD Grid'}
                              </p>
                              <p className="text-[10px] text-gray-500 dark:text-gray-400">
                                {INDIAN_LANGUAGE_PACKS[langCode]?.labels.similiMatrixSub || 'Toggle Matrix Workspace Layout'}
                              </p>
                            </div>
                          </div>
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* TOP-RIGHT USER PROFILE/SETTINGS */}
              <UserPersonaHeaderWidget
                theme={theme}
                onToggleTheme={toggleTheme}
                onSelectTab={setActiveTab}
                langCode={langCode}
                onSelectLanguage={handleSelectLanguage}
              />
            </div>
          </div>
        </div>

        {/* DYNAMIC WORKSPACE MODULE CONTENTS BELOW PERSISTENT EXECUTIVE COMMAND HEADER */}
        <div className="flex-1 flex flex-col w-full h-full overflow-hidden">
          {/* VIEW 1: SIMILIMATRIX & TELEHEALTH WORKSPACE */}
          {activeTab === 'MATRIX_TELEHEALTH' && (
            <div className="flex flex-col lg:flex-row flex-1 w-full h-full overflow-hidden">
              {/* LEFT CANVAS: DENSE HIGH-VIRTUALIZATION TABLE ENGINE (EXPANDS TO 100% IN IN-PERSON OPD MODE) */}
              <div
                className={`h-full overflow-hidden flex flex-col relative transition-all duration-300 ${
                  isFullWidthOpdMode ? 'w-full flex-1' : 'flex-1'
                }`}
              >
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
                        id: `rub-ai-${Date.now()}`,
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
                    isFullWidthOpdMode={isFullWidthOpdMode}
                  />
                </div>
              </div>

              {/* RIGHT CANVAS: LIVE TELEHEALTH WEBRTC SCREEN STREAM (HIDDEN IN 100% IN-PERSON OPD MODE) */}
              {!isFullWidthOpdMode && (
                <VideoConsultationHarness
                  sessionId={sessionId}
                  onMediaChunkGenerated={handleLiveMediaChunkStream}
                  isGaitAnalysisActive={isGaitActive}
                  theme={theme}
                />
              )}
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
              theme={theme}
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
            <OpdQueueManagerView theme={theme} langCode={langCode} />
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

          {/* VIEW 12: DEDICATED PATIENT PROFILE & ABHA HEALTH LOCKER */}
          {activeTab === 'PATIENT_PROFILE' && (
            <PatientProfileView theme={theme} />
          )}

          {/* VIEW 13: DEDICATED PHYSICIAN CREDENTIALS & AYUSH REGISTRATION */}
          {activeTab === 'DOCTOR_PROFILE' && (
            <DoctorProfileView theme={theme} />
          )}

          {/* VIEW 14: DEDICATED HOSPITAL INSTITUTIONAL & UHI GATEWAY PROFILE */}
          {activeTab === 'HOSPITAL_PROFILE' && (
            <HospitalProfileView theme={theme} />
          )}

          {/* VIEW 15: SUPPORT, CONTACT US & WHATSAPP CLINICAL CALL HUB */}
          {activeTab === 'SUPPORT_HELP' && (
            <SupportContactCenterView theme={theme} />
          )}

          {/* VIEW 16: PROFILE CREATION & ABDM REGISTRATION STUDIO */}
          {activeTab === 'PROFILE_CREATION' && (
            <ProfileCreationStudioView theme={theme} />
          )}

          {/* VIEW 17: CLINICAL DISCUSSION BLOGS & CASE STUDY EXCHANGE */}
          {activeTab === 'DISCUSSION_BLOGS' && (
            <ClinicalDiscussionBlogsView theme={theme} />
          )}

          {/* VIEW 18: BHMS / MD (HOM.) INTERACTIVE CLINICAL ACADEMY & OPD SIMULATION */}
          {activeTab === 'CLINICAL_ACADEMY' && (
            <BhmsClinicalAcademyView theme={theme} />
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
        theme={theme}
      />

      {/* HIPAA, ABDM FHIR & DPDP ACT AUTHENTICATION & ROLE-BASED ACCESS CONTROL MODAL */}
      <RbacLoginModal />
    </div>
  );
}

export default function MateriaGridMasterWorkspace() {
  return (
    <RbacProvider>
      <MasterWorkspaceInner />
    </RbacProvider>
  );
}

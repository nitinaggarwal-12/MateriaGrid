'use client';

import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  XCircle,
  Award,
  Play,
  RotateCcw,
  Sparkles,
  HelpCircle,
  FileText,
  Activity,
  UserCheck,
  ShieldCheck,
  ChevronRight,
  Stethoscope,
  Flame,
  Droplets,
  Zap,
} from 'lucide-react';
import { Interactive360AnatomyAtlas } from './Interactive360AnatomyAtlas';

interface BhmsClinicalAcademyViewProps {
  theme?: 'dark' | 'light';
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface ChapterItem {
  title: string;
  duration: string;
  completed: boolean;
  studyMaterial: {
    lectureSummary: string;
    aphorismReference: string;
    clinicalTakeaway: string;
    diagramDescription: string;
    workedCaseExample: string;
  };
}

interface CourseModule {
  id: string;
  code: string;
  title: string;
  instructor: string;
  duration: string;
  level: 'BHMS INTERN' | 'MD (HOM.) RESIDENT' | 'AYUSH FACULTY';
  chaptersCount: number;
  progressPercent: number;
  summary: string;
  chapters: ChapterItem[];
  quiz: QuizQuestion[];
}

const ACADEMIC_COURSES: CourseModule[] = [
  {
    id: 'course-00',
    code: 'BHMS-101',
    title: 'Foundations of Organon (§1–70) & First-Year Keynote Materia Medica',
    instructor: 'Prof. Dr. Rajeshwari Sharma, MD (Hom.)',
    duration: '6 Hours • 6 Chapters',
    level: 'BHMS INTERN',
    chaptersCount: 6,
    progressPercent: 100,
    summary:
      'Master Samuel Hahnemann’s §1-70 foundations: the Physician’s Mission (§1), Highest Ideal of Cure (§2), Dynamized Vital Force (§9-17), and Keynote Proving Profiles of Aconite, Belladonna, Bryonia & Nux Vomica.',
    chapters: [
      {
        title: 'Chapter 1: The Physician’s Highest Mission & Highest Ideal of Cure (§1–2)',
        duration: '50 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Aphorism §1 establishes that the physician’s high and ONLY mission is to restore the sick to health, to cure. Aphorism §2 defines the Highest Ideal of Cure: rapid, gentle, and permanent restoration of health in the shortest, most reliable, and most harmless way.',
          aphorismReference:
            'Organon §2: "The highest ideal of cure is rapid, gentle and permanent restoration of the health, or removal and annihilation of the disease in its whole extent..."',
          clinicalTakeaway:
            'Never settle for temporary palliation or aggressive physiological disruption. Every prescription must aim for rapid, gentle, permanent cure.',
          diagramDescription:
            'Hahnemannian Cure Continuum: Symptom Suppression (Harmful) vs Gentle Dynamic Restoration (Ideal Cure).',
          workedCaseExample:
            'Acute febrile restlessness relieved gently within 2 hours of single dose Aconitum 30C.',
        },
      },
      {
        title: 'Chapter 2: The Dynamized Vital Force in Health & Disease (§9–17)',
        duration: '55 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'In the healthy condition of man, the spiritual vital force (Autocracy) animates the material body (Organism) in harmonious play. Disease is nothing more than a dynamic derangement of this vital force.',
          aphorismReference:
            'Organon §9: "In the healthy condition of man, the spiritual vital force... holds the organism in harmonious operation..."',
          clinicalTakeaway:
            'Medicines do not act by chemical mass action, but by dynamic resonant vibration matching the altered state of the vital force.',
          diagramDescription:
            'Vital Force Dynamic Resonance Diagram.',
          workedCaseExample:
            'Dynamic susceptibility verified in acute anxiety crisis matching Aconite.',
        },
      },
      {
        title: 'Chapter 3: First-Year Keynote Proving Profiles: Aconite, Belladonna & Bryonia',
        duration: '60 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Aconite: Sudden violent onset after dry cold wind, intense fear of death, bounding pulse. Belladonna: Sudden throbbing heat, red face, dilated pupils, thirstless. Bryonia: Stitching pains, absolute aggravation from slightest motion, intense thirst for large quantities.',
          aphorismReference:
            'Keynotes Materia Medica: Aconite (Sudden cold wind), Belladonna (Throbbing congestion), Bryonia (Motion aggravates).',
          clinicalTakeaway:
            'Differentiate Bryonia (worse motion) from Rhus tox (better continued motion).',
          diagramDescription:
            'Triad Differential Matrix: Aconite vs Belladonna vs Bryonia.',
          workedCaseExample:
            'Patient who sits completely still in bed clutching chest during cough -> Bryonia 200C.',
        },
      },
      {
        title: 'Chapter 4: Acute vs Chronic Case Structure (§72–82)',
        duration: '50 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Acute diseases are rapid processes of the abnormally deranged vital force with a tendency to finish their course more or less quickly. Chronic diseases arise from chronic miasmatic infection.',
          aphorismReference:
            'Organon §72: "The diseases of human beings are divided into acute and chronic..."',
          clinicalTakeaway:
            'Never treat an acute exacerbation of a chronic disease with a heavy constitutional high potency without evaluating acute modalities.',
          diagramDescription:
            'Acute Curve vs Chronic Underlying Miasmatic Baseline.',
          workedCaseExample:
            'Acute coryza in chronic psoric asthma patient managed first with acute Allium cepa 30C.',
        },
      },
      {
        title: 'Chapter 5: The Doctrine of Drug Proving on Healthy Human Beings (§105–145)',
        duration: '55 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Pure experimental drug proving on healthy volunteers reveals the artificial disease-producing power of a substance. Only symptoms verified through healthy human proving can be utilized for Similia Similibus Curentur.',
          aphorismReference:
            'Organon §105: "The second point of the business of a true physician relates to acquiring a knowledge of the instruments intended for the cure of natural diseases..."',
          clinicalTakeaway:
            'Always rely on authentic proving literature rather than speculative empirical claims.',
          diagramDescription:
            'Hahnemannian Drug Proving Protocol Diagram.',
          workedCaseExample:
            'Proving verification of Aconite emotional anxiety confirmed across 40 healthy provers.',
        },
      },
      {
        title: 'Chapter 6: Keynote Profiles of Nux Vomica, Chamomilla & Pulsatilla',
        duration: '60 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Nux Vomica: Over-sensitive, irritable executive with sedentary habits and ineffective urging. Chamomilla: Intolerable pain with violent anger and capricious demands. Pulsatilla: Mild, yielding, weepiness, craves open cool air, thirstless.',
          aphorismReference:
            'Materia Medica Keynotes: Nux Vomica (Sedentary, irritable), Chamomilla (Capricious anger), Pulsatilla (Yielding, open air).',
          clinicalTakeaway:
            'Never prescribe Pulsatilla to a patient who craves warm closed rooms or drinks heavily.',
          diagramDescription:
            'Emotional & Thermal Keynote Comparison Wheel.',
          workedCaseExample:
            'Irritable corporate manager with acid reflux and constipation relieved by Nux Vomica 200C.',
        },
      },
    ],
    quiz: [
      {
        id: 'q-bhms1',
        question:
          'According to Organon of Medicine Aphorism §2, what is the Highest Ideal of Cure?',
        options: [
          'Suppression of local symptoms using maximum chemical dosage',
          'Rapid, gentle, and permanent restoration of health in the shortest, most reliable way',
          'Surgical removal of all affected tissues immediately',
          'Alternating five remedies every 30 minutes',
        ],
        correctIndex: 1,
        explanation:
          'Aphorism §2 explicitly defines the highest ideal of cure as rapid, gentle, and permanent restoration of health based on clearly comprehensible principles.',
      },
    ],
  },
  {
    id: 'course-01',
    code: 'BHMS-401',
    title: 'Dr. Prafull Vijayakar’s Predictive Homeopathy & Thermal-Thirst Baseline Physics',
    instructor: 'Prof. Dr. Nitin Aggarwal, MD (Hom.)',
    duration: '4.5 Hours • 6 Chapters',
    level: 'BHMS INTERN',
    chaptersCount: 6,
    progressPercent: 66,
    summary:
      'Master the physics of immutable physical baseline constants—Thermal (Hot/Chilly) and Thirst (Thirsty/Thirstless)—to eliminate genetic suppression and prescribe safely.',
    chapters: [
      {
        title: 'Chapter 1: The Thermodynamics of Living Cells & Miasmatic Bias',
        duration: '40 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Organon §80-84 establishes that chronic disease is a dynamic expression of inherited cellular miasmatic bias (Psora, Sycosis, Syphilis). Dr. Vijayakar correlated these three miasms with cellular thermodynamics: Psora represents functional irritation / hypo-function, Sycosis represents proliferative / hypertrophic accumulation (mesodermal), and Syphilis represents destructive cellular ulcerative necrosis.',
          aphorismReference:
            'Organon of Medicine §80: "Psora is the only real fundamental cause and producer of all the other numerous, I may say innumerable forms of disease..."',
          clinicalTakeaway:
            'Before selecting a remedy, assess whether the chief complaint is functional (Psoric), proliferative (Sycotic), or destructive (Syphilitic). Never prescribe a deeply destructive Syphilitic remedy for a mild functional Psoric disturbance.',
          diagramDescription:
            'Thermodynamic Energy Curve: Psora (Normal Energy Threshold) → Sycosis (Hyper-Proliferation / Excess) → Syphilis (Energy Exhaustion / Necrosis).',
          workedCaseExample:
            'Patient with recurring dry scaly eczematous patches without skin hypertrophy -> Psoric stage. Prescribed Sulphur 30C, resulting in complete gentle restoration without suppression.',
        },
      },
      {
        title: 'Chapter 2: Defining Hot vs Chilly and Thirsty vs Thirstless Baselines',
        duration: '45 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'A patient’s thermal baseline (HOT vs CHILLY) and thirst baseline (THIRSTY vs THIRSTLESS) are immutable physical constants governed by hypothermal hypothalamic regulation. A HOT patient prefers light blankets even in cold weather, loves fans, and desires cold baths. A CHILLY patient wraps up heavily, hates drafts of air, and desires warm baths.',
          aphorismReference:
            'Organon of Medicine §153: "The more striking, singular, uncommon and peculiar (characteristic) signs and symptoms... are chiefly and almost solely to be kept in view."',
          clinicalTakeaway:
            'If a patient is verified as HOT and THIRSTLESS, remedies that are strictly CHILLY and THIRSTY (such as Arsenicum Album or Nux Vomica) must be masked out to prevent disease suppression.',
          diagramDescription:
            '2x2 Thermal-Thirst Matrix: [HOT + THIRSTLESS: Belladonna, Apis, Pulsatilla] vs [CHILLY + THIRSTY: Arsenicum, Bryonia, Nux Vomica].',
          workedCaseExample:
            'Patient with high fever, red face, dilated pupils who throws off all bedcovers and refuses water -> Classic Belladonna HOT+THIRSTLESS profile.',
        },
      },
      {
        title: 'Chapter 3: Embryological Layer Progression (Endoderm → Mesoderm → Ectoderm)',
        duration: '50 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'During human embryogenesis, tissues divide into Endoderm (gastrointestinal tract, liver, lungs), Mesoderm (cardiovascular system, joints, connective tissue), and Ectoderm (nervous system, skin, senses). Biological healing under Hering’s Law moves from vital deep layers (Endoderm) outwards to surface layers (Ectoderm/Skin).',
          aphorismReference:
            'Hering’s Law of Cure: "All cure proceeds from within outwards, from above downwards, from more vital to less vital organs, and in reverse order of appearance."',
          clinicalTakeaway:
            'If a patient treated for asthma (Endoderm) develops mild eczematous skin eruptions (Ectoderm), this is Hering’s Law in action! Never suppress the skin eruption.',
          diagramDescription:
            'Embryological Direction of Cure: Deep Vital Endoderm (Liver/Lungs) → Mesoderm (Joints/Muscles) → Ectoderm (Skin/Epidermis).',
          workedCaseExample:
            'Chronic bronchitis patient given Lycopodium 200C. Breathing cleared within 14 days, accompanied by temporary mild itching eruption on forearms.',
        },
      },
      {
        title: 'Chapter 4: Preventing Suppression: Why Chilly Remedies Fail in Hot Patients',
        duration: '45 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Suppression occurs when a remedy or external intervention forces disease symptoms inwards from an outer embryological layer to a deeper vital organ. Prescribing a remedy whose thermal profile contradicts the patient’s constitutional physics creates an iatrogenic state.',
          aphorismReference:
            'Organon of Medicine §202: "It is not improper to consider that the local affection is the secondary outcome of the internal disease..."',
          clinicalTakeaway:
            'Always double-check thermal compatibility before dispensing potencies above 30C.',
          diagramDescription:
            'Iatrogenic Suppression Pathway: Skin Corticosteroid / Mismatched Remedy → Internal Bronchial Hyper-Reactivity.',
          workedCaseExample:
            'Child with suppressed eczema developed severe nocturnal wheezing. Re-evaluated as HOT+THIRSTLESS; given Sulphur 200C, bringing back mild eczema and permanently curing asthma.',
        },
      },
      {
        title: 'Chapter 5: SimiliMatrix Asymmetrical TF-IDF Scoring Integration',
        duration: '45 mins',
        completed: false,
        studyMaterial: {
          lectureSummary:
            'Standard homeopathic software simply counts how many rubrics a remedy covers. This causes broad polychrests (Sulphur, Lycopodium) to dominate every case. MateriaGrid implements Inverse Rubric Density (TF-IDF), giving higher specificity scores to remedies matching rare keynote rubrics.',
          aphorismReference:
            'Mathematical Formula: Specificity Score S = Sum(Grade_i * log2(Total_Remedies / Remedies_in_Rubric_i)).',
          clinicalTakeaway:
            'Pay close attention to remedies with high Specificity Scores even if they cover fewer total rubrics than Sulphur.',
          diagramDescription:
            'Asymmetrical Specificity Graph: High Specificity Rare Keynote vs High Coverage Broad Polychrest.',
          workedCaseExample:
            'Patient with rare symptom "Pain under right scapula lower angle". Specificity score elevates Chelidonium to #1 over Sulphur.',
        },
      },
      {
        title: 'Chapter 6: Case Verification & Follow-Up Hering’s Law Audit',
        duration: '45 mins',
        completed: false,
        studyMaterial: {
          lectureSummary:
            'During Follow-Up Visit #2, doctors must evaluate four criteria: (1) Energy & sleep improvement, (2) Direction of symptom shift under Hering’s Law, (3) Mental state relaxation, and (4) Posology adjustment (wait & watch vs repeat).',
          aphorismReference:
            'Organon of Medicine §245-252: "In chronic diseases, the slightest improvement in the general health of the patient is the surest sign of cure..."',
          clinicalTakeaway:
            'If the patient reports 50% mental calm and better sleep despite temporary physical aggravation, do NOT change the remedy.',
          diagramDescription:
            'Follow-Up Decision Tree: General Improvement + Hering Direction = WAIT & WATCH.',
          workedCaseExample:
            'Follow-up visit at 30 days showing calm sleep and steady liver enzymes. Placebo continued with zero aggravation.',
        },
      },
    ],
    quiz: [
      {
        id: 'q1',
        question:
          'A 42-year-old corporate entrepreneur presents with acute throbbing migraine when the sun sets. He is HOT and THIRSTLESS, and demands immediate relief so he can return to his office layout. Which remedy is filtered OUT by the Vijayakar Thermal-Thirst Mask?',
        options: [
          'Belladonna (HOT, THIRSTLESS)',
          'Pulsatilla (HOT, THIRSTLESS)',
          'Arsenicum Album (CHILLY, THIRSTY - Filtered Out)',
          'Apis Mellifica (HOT, THIRSTLESS)',
        ],
        correctIndex: 2,
        explanation:
          'Arsenicum Album is strictly Chilly and Thirsty. Prescribing a Chilly+Thirsty remedy to a Hot+Thirstless patient violates physical baseline thermodynamics and risks disease suppression.',
      },
      {
        id: 'q2',
        question:
          'According to Hering’s Law of Cure and Embryological Layering, which direction of symptom appearance indicates true biological healing?',
        options: [
          'From Ectoderm (Skin) inwards to Endoderm (Internal Organs)',
          'From Endoderm (Internal Organs) outwards to Ectoderm (Skin)',
          'From below upwards and from outside inwards',
          'Simultaneous eruption on all embryological layers',
        ],
        correctIndex: 1,
        explanation:
          'True Hahnemannian cure moves from within outwards, from more vital organs (Endoderm) to less vital organs (Ectoderm/Skin). Movement in reverse indicates suppression.',
      },
    ],
  },
  {
    id: 'course-02',
    code: 'MD-HOM-502',
    title: 'Dr. J.C. Burnett’s Organopathy, Tissue Drainage & Potency Safety Limits',
    instructor: 'Dr. Ananya Sengupta, MD (Hom.), NIH Kolkata',
    duration: '5 Hours • 5 Chapters',
    level: 'MD (HOM.) RESIDENT',
    chaptersCount: 5,
    progressPercent: 40,
    summary:
      'Learn when to apply low-potency organ-affine remedies (1X–6X) to drain pathological tissues in severe cirrhosis or renal degeneration before constitutional prescribing.',
    chapters: [
      {
        title: 'Chapter 1: The Limits of High-Potency Constitutional Prescribing in Organ Failure',
        duration: '60 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'In severe organ failure (advanced cirrhosis, end-stage renal disease), high-potency constitutional remedies (1M, 10M) can trigger violent physiological reactions without pathological drainage pathways open.',
          aphorismReference:
            'Burnett Organopathy Principle: "Pathological tissue must be cleared by organ-affine drainage remedies before constitutional high potencies can act without hazard."',
          clinicalTakeaway:
            'Never give high potencies >30C when serum bilirubin >8 mg/dL or creatinine >4.5 mg/dL without organ drainage.',
          diagramDescription:
            'Dual-Track Protocol: Track 1 (Low-Potency Organ Drainage) + Track 2 (Protected Constitutional Totality).',
          workedCaseExample:
            'Decompensated liver cirrhosis case started on Chelidonium 2X liquid drops twice daily for 21 days.',
        },
      },
      {
        title: 'Chapter 2: Burnett’s Organopathy: Chelidonium, Carduus marianus & Solidago',
        duration: '60 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Chelidonium majus has specific affinity for liver parenchymal cells and gall ducts. Carduus marianus acts on portal vein venous stasis. Solidago virgaurea acts on kidney tubular filtration.',
          aphorismReference:
            'Materia Medica Keynotes: Chelidonium (Right scapula pain, jaundice), Carduus marianus (Portal stasis, varicose ulcers), Solidago (Renal tenderness, scanty dark urine).',
          clinicalTakeaway:
            'Select low-potency (1X, 3X, 6X) mother tincture or liquid potency for organ-specific drainage.',
          diagramDescription:
            'Organ Affinity Map: Liver (Chelidonium/Carduus) | Kidneys (Solidago/Berberis) | Heart (Crataegus).',
          workedCaseExample:
            'Patient with dull right hypochondriac heaviness and elevated SGPT/SGOT given Carduus marianus Q 10 drops twice daily.',
        },
      },
      {
        title: 'Chapter 3: Potency Ceilings: Why Potencies >30C are Restricted in Structural ICD-11 Cases',
        duration: '60 mins',
        completed: false,
        studyMaterial: {
          lectureSummary:
            'MateriaGrid automatically enforces a clinical safety gate when ICD-11 structural diagnostic tags are detected.',
          aphorismReference:
            'Clinical Posology Guardrail: Potencies above 30C require explicit practitioner audit confirmation.',
          clinicalTakeaway:
            'Use liquid LM potencies or low centesimal (6C, 12C, 30C) when tissue destruction is present.',
          diagramDescription:
            'Safety Gate Dialog: High Potency Restriction Warning System.',
          workedCaseExample:
            'Rheumatoid arthritis joint destruction case managed safely on Lachesis 12C liquid doses.',
        },
      },
      {
        title: 'Chapter 4: Synchronizing Drainage Track & Constitutional Track in MateriaGrid',
        duration: '60 mins',
        completed: false,
        studyMaterial: {
          lectureSummary:
            'How to configure both organopathic drainage remedies and constitutional remedies on a single digital prescription slip.',
          aphorismReference:
            'Dual-Track Prescription Slip Generation System.',
          clinicalTakeaway:
            'Drainage remedy given in morning/evening liquid doses; constitutional given in intermittent single dose.',
          diagramDescription:
            'Prescription Slip Builder Dual-Track Layout.',
          workedCaseExample:
            'Chelidonium 3X liquid 10 drops BD + Lycopodium 200C single dose on Sunday morning.',
        },
      },
      {
        title: 'Chapter 5: Clinical OPD Follow-Up & Posology Adjustments',
        duration: '60 mins',
        completed: false,
        studyMaterial: {
          lectureSummary:
            'Monitoring biochemical lab trends alongside Hering’s Law clinical recovery.',
          aphorismReference:
            'Longitudinal Patient Case Chain Audit Ledger.',
          clinicalTakeaway:
            'Taper organ drainage as blood parameters normalize.',
          diagramDescription:
            'Biochemical vs Symptomatic Recovery Curve.',
          workedCaseExample:
            'SGPT reduced from 240 to 42 IU/L over 6 weeks of coordinated homeopathic OPD care.',
        },
      },
    ],
    quiz: [
      {
        id: 'q3',
        question:
          'When a patient presents with chronic hepatobiliary cirrhosis (ICD-11 5A11), what does Dr. Burnett recommend as the immediate Primary Track?',
        options: [
          'Single dose of Sulphur 10M dry granules',
          'Low-potency organ-affine Tissue Drainage remedies (e.g. Chelidonium 1X-6X or Carduus marianus)',
          'Immediate surgical referral without homeopathic support',
          'High-potency Lachesis 1M every 2 hours',
        ],
        correctIndex: 1,
        explanation:
          'Dr. Burnett demonstrated that severely deteriorated organic tissue requires low-potency organ-affine drainage remedies (1X-6X) to open pathological pathways before constitutional high potencies are given.',
      },
    ],
  },
  {
    id: 'course-03',
    code: 'BHMS-102',
    title: 'Homoeopathic Pharmacy, Dynamization & Pharmacopoeia Standards',
    instructor: 'Dr. S. K. Mandal, MD (Hom.), Homoeopathic Pharmacopoeia Laboratory',
    duration: '5 Hours • 5 Chapters',
    level: 'BHMS INTERN',
    chaptersCount: 5,
    progressPercent: 90,
    summary:
      'Master Samuel Hahnemann’s decimal (X), centesimal (C), and 50-millesimal (LM/Q) potentization rules, vehicle purity testing, and HPI/GHP pharmacopoeia standards.',
    chapters: [
      {
        title: 'Chapter 1: Principles of Dynamization: Trituration vs Succussion',
        duration: '50 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Insoluble crude substances undergo 1-hour mechanical trituration in lactose sugar before liquid succussion. Dynamization releases dynamic medicinal energy.',
          aphorismReference:
            'Organon §269-271: "The homoeopathic system of medicine develops for its special use, to a hitherto unheard-of degree, the internal spirit-like medicinal powers..."',
          clinicalTakeaway:
            'Never mix liquid dilutions directly with insoluble metals without proper trituration history.',
          diagramDescription:
            'Hahnemannian Trituration Ratio: 1 grain crude to 99 grains lactose.',
          workedCaseExample:
            'Silicea 6X trituration tablet preparation verified for mineral suspension.',
        },
      },
      {
        title: 'Chapter 2: The 50-Millesimal (LM/Q) Potency Scale (§270)',
        duration: '60 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Hahnemann’s 6th Edition innovation: LM potencies (1/50,000 ratio) allow daily repeated liquid administration with zero violent homeopathic aggravations.',
          aphorismReference:
            'Organon 6th Edition §270: "The new dynamization method produces medicines of maximum efficacy with minimum danger of aggravation..."',
          clinicalTakeaway:
            'Ideal for sensitive chronic patients where high centesimal potencies cause severe aggravations.',
          diagramDescription:
            'LM Potency Preparation Flow: 3C Trituration -> Poppy-seed size globule -> 100 drops alcohol.',
          workedCaseExample:
            'Hypersensitive eczema patient managed smoothly on LM/0/1 liquid daily doses.',
        },
      },
    ],
    quiz: [],
  },
  {
    id: 'course-04',
    code: 'BHMS-201',
    title: 'Organon of Medicine (§71–145): Chronic Miasms (Psora, Sycosis, Syphilis)',
    instructor: 'Prof. Dr. Rajeshwari Sharma, MD (Hom.)',
    duration: '6 Hours • 6 Chapters',
    level: 'BHMS INTERN',
    chaptersCount: 6,
    progressPercent: 85,
    summary:
      'Comprehensive study of Hahnemann’s Chronic Miasms doctrine (§80-84): identifying Psoric functional itch, Sycotic tissue condylomata, and Syphilitic destructive necrosis.',
    chapters: [
      {
        title: 'Chapter 1: Psora - The Mother of All Chronic Miasms (§80)',
        duration: '55 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Psora is the oldest, most universal miasm, characterized by functional irritation, hypersensitivity, internal itch, and deficiency.',
          aphorismReference:
            'Organon §80: "Psora, that real fundamental cause and producer of almost all the numerous forms of disease..."',
          clinicalTakeaway:
            'Sulphur, Psorinum, and Calcarea carb are primary anti-psoric constitutional remedies.',
          diagramDescription:
            'Psoric Triad: Hypersensitivity + Functional Deficit + Volatile Anxiety.',
          workedCaseExample:
            'Patient with burning palms/soles and night restlessness relieved by Sulphur 200C.',
        },
      },
    ],
    quiz: [],
  },
  {
    id: 'course-05',
    code: 'BHMS-202',
    title: 'Polycrest Materia Medica & Triads of Classical Remedies',
    instructor: 'Dr. Vikramaditya Das, MD (Hom.)',
    duration: '5.5 Hours • 6 Chapters',
    level: 'BHMS INTERN',
    chaptersCount: 6,
    progressPercent: 75,
    summary:
      'Master the classical Triads of Materia Medica: Triad of Restlessness (Aconite, Arsenicum, Rhus tox), Triad of Pain (Chamomilla, Coffea, Aconite), and Constitutional Polycrests.',
    chapters: [
      {
        title: 'Chapter 1: The Triad of Restlessness: Aconite vs Arsenicum vs Rhus Tox',
        duration: '50 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Aconite: Acute mental & physical fear with tossing. Arsenicum: Prostrating anxiety with frequent sipping of warm water. Rhus tox: Physical joint stiffness relieved by continuous motion.',
          aphorismReference:
            'Triads of Materia Medica: Differential diagnosis of restlessness.',
          clinicalTakeaway:
            'Never confuse Rhus tox physical joint tossing with Arsenicum prostrating mental fear.',
          diagramDescription:
            'Restlessness Spectrum Diagram.',
          workedCaseExample:
            'Rheumatic fever patient who tosses in bed because joints freeze up -> Rhus tox 200C.',
        },
      },
    ],
    quiz: [],
  },
  {
    id: 'course-06',
    code: 'BHMS-301',
    title: 'Classical Repertory Architecture (Kent, Bönninghausen, BBCR & Synthesis)',
    instructor: 'Prof. Dr. Nitin Aggarwal, MD (Hom.)',
    duration: '6 Hours • 6 Chapters',
    level: 'BHMS INTERN',
    chaptersCount: 6,
    progressPercent: 80,
    summary:
      'Deconstruct the hierarchical logic of Kent’s Repertory (General to Particular), Bönninghausen’s Complete Symptom (Location, Sensation, Modality, Concomitant), and Synthesis Repertory.',
    chapters: [
      {
        title: 'Chapter 1: James Tyler Kent’s Deductive Hierarchy (Generals Before Particulars)',
        duration: '55 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Kentian philosophy prioritizes Mental Generals and Physical Generals over local organic particulars. "The man is prior to his organs."',
          aphorismReference:
            'Kent’s Lectures on Homoeopathic Philosophy: The Doctrine of Evaluation of Symptoms.',
          clinicalTakeaway:
            'A strong Mental General (e.g. fear of death) overrides ten local organic complaints.',
          diagramDescription:
            'Kentian Symptom Pyramid: Mental Generals -> Physical Generals -> Modalities -> Particulars.',
          workedCaseExample:
            'Patient with local knee pain who exhibits intense anxiety of death -> Kentian evaluation favors Aconite.',
        },
      },
    ],
    quiz: [],
  },
  {
    id: 'course-07',
    code: 'BHMS-402',
    title: 'Practice of Medicine & Clinical Homoeopathic Therapeutics (ICD-11 Mapping)',
    instructor: 'Dr. Meenakshi Banerjee, MD (Hom.), Practice of Medicine',
    duration: '5 Hours • 5 Chapters',
    level: 'BHMS INTERN',
    chaptersCount: 5,
    progressPercent: 60,
    summary:
      'Bridge modern clinical pathology (ICD-11 codes for hypertension, diabetes, asthma, thyroid disorders) with classical repertorial symptom totality.',
    chapters: [
      {
        title: 'Chapter 1: Metabolic & Endocrine Disorders: Homoeopathic Management of Diabetes & Thyroid',
        duration: '55 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Integrating endocrine laboratory markers (HbA1c, TSH, Free T3/T4) with constitutional homeopathic evaluation.',
          aphorismReference:
            'Clinical OPD Protocol: Auxiliary organ drainage + constitutional totality.',
          clinicalTakeaway:
            'Syzygium jambolanum 1X/Q as auxiliary glucose regulator alongside Lycopodium/Calcarea carb constitutional care.',
          diagramDescription:
            'Endocrine Recovery Curve.',
          workedCaseExample:
            'Type 2 diabetic patient with neuropathic burning relieved by Syzygium jambolanum Q + Sulphur 200C.',
        },
      },
    ],
    quiz: [],
  },
  {
    id: 'course-08',
    code: 'MD-HOM-501',
    title: 'Advanced Constitutional Repertorization & Asymmetrical Specificity Mathematics',
    instructor: 'Prof. Dr. Nitin Aggarwal, MD (Hom.)',
    duration: '6 Hours • 6 Chapters',
    level: 'MD (HOM.) RESIDENT',
    chaptersCount: 6,
    progressPercent: 95,
    summary:
      'Post-graduate mathematical modeling: solving broad polychrest dominance using Inverse Rubric Density (TF-IDF), high-yield keynote scoring, and statistical specificity algorithms.',
    chapters: [
      {
        title: 'Chapter 1: The Asymmetrical Specificity Formula ($S_{remedy}$) Applied to Complex Graphs',
        duration: '60 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Why traditional sum-of-grades formulas fail in multi-rubric repertorization and how TF-IDF weighting elevates rare peculiar symptoms.',
          aphorismReference:
            'MateriaGrid Engine Contract: Asymmetrical Specificity Index Formula.',
          clinicalTakeaway:
            'Mathematical proof of why small remedies often outperform broad polychrests when keynotes are present.',
          diagramDescription:
            'Asymmetrical Specificity TF-IDF Graph Engine.',
          workedCaseExample:
            'Rare symptom "Waking from a dream in terror" weighted 8.4x over generic fever rubric.',
        },
      },
    ],
    quiz: [],
  },
  {
    id: 'course-09',
    code: 'MD-HOM-601',
    title: 'CCRH Clinical Research Methodology, Double-Blind Provings & Digital Audit Trails',
    instructor: 'Dr. Arvind Sen, MD (Hom.), Central Council for Research in Homoeopathy',
    duration: '5 Hours • 5 Chapters',
    level: 'MD (HOM.) RESIDENT',
    chaptersCount: 5,
    progressPercent: 70,
    summary:
      'GCP & CCRH compliant clinical research protocols: randomized controlled trials (RCTs), pathogenetic drug provings, and immutable digital visit chain audit trails.',
    chapters: [
      {
        title: 'Chapter 1: Designing GCP-Compliant Homoeopathic Pathogenetic Provings (HPP)',
        duration: '55 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Modern double-blind placebo-controlled proving protocols ensuring scientific validation of new medicinal substances.',
          aphorismReference:
            'CCRH Guidelines for Homoeopathic Pathogenetic Trials.',
          clinicalTakeaway:
            'Strict exclusion of environmental and psychological noise during volunteer drug provings.',
          diagramDescription:
            'Double-Blind Proving Trial Workflow.',
          workedCaseExample:
            'Proving protocol execution for plant substance verified across 3 research centers.',
        },
      },
    ],
    quiz: [],
  },
  {
    id: 'course-10',
    code: 'BHMS-103',
    title: 'Human Anatomy & Homoeopathic Organ Affinity Correlates',
    instructor: 'Dr. R. K. Mukherjee, MD (Hom.), Department of Anatomy',
    duration: '5 Hours • 5 Chapters',
    level: 'BHMS INTERN',
    chaptersCount: 5,
    progressPercent: 100,
    summary:
      'Correlating organ anatomy and tissue layers with homoeopathic organ affinities (Chelidonium-Liver, Solidago-Kidneys, Crataegus-Heart).',
    chapters: [
      {
        title: 'Chapter 1: Hepato-Biliary Anatomy & Chelidonium Organ Affinity',
        duration: '50 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Anatomical relation of liver parenchyma and biliary ducts to classical organ remedies.',
          aphorismReference:
            'Burnett Organopathy Anatomy Reference.',
          clinicalTakeaway:
            'Right scapular pain indicates liver capsule stretching matching Chelidonium.',
          diagramDescription:
            'Biliary Tract & Scapular Nerve Referral Map.',
          workedCaseExample:
            'Jaundice patient with liver enlargement managed with Chelidonium 1X.',
        },
      },
    ],
    quiz: [],
  },
  {
    id: 'course-11',
    code: 'BHMS-104',
    title: 'Physiology, Biochemistry & Dynamic Cellular Susceptibility',
    instructor: 'Dr. S. Dasgupta, MD (Hom.), Physiology Department',
    duration: '4.5 Hours • 5 Chapters',
    level: 'BHMS INTERN',
    chaptersCount: 5,
    progressPercent: 95,
    summary:
      'Understanding cellular homeostasis, autonomic nervous system regulation, and Hahnemannian dynamic susceptibility (§31).',
    chapters: [
      {
        title: 'Chapter 1: Autonomic Nervous System & Modalities (§31)',
        duration: '50 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Sympathetic and parasympathetic tone differences explain thermal-thirst baselines and aggravation modalities.',
          aphorismReference:
            'Organon §31: "The inimical forces, partly psychical, partly physical... do not possess the power of morbidly deranging the health of man unconditionally..."',
          clinicalTakeaway:
            'Dynamic susceptibility dictates why two people exposed to cold wind develop different symptoms.',
          diagramDescription:
            'Autonomic Tone vs Modality Chart.',
          workedCaseExample:
            'Sympathetic overdrive tachycardia matching Aconite.',
        },
      },
    ],
    quiz: [],
  },
  {
    id: 'course-12',
    code: 'BHMS-203',
    title: 'Pathology, Microbiology & Miasmatic Diathesis Mapping',
    instructor: 'Dr. P. Chakraborty, MD (Hom.), Department of Pathology',
    duration: '5.5 Hours • 6 Chapters',
    level: 'BHMS INTERN',
    chaptersCount: 6,
    progressPercent: 88,
    summary:
      'Correlating inflammatory exudates, hyperplasias, and necrotic ulcerations with Psoric, Sycotic, and Syphilitic pathological diathesis.',
    chapters: [
      {
        title: 'Chapter 1: Cellular Inflammation & Psoric Functional Irritation',
        duration: '55 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Early functional congestion precedes structural cellular change.',
          aphorismReference:
            'Organon §80-84 Pathology Doctrine.',
          clinicalTakeaway:
            'Treat functional irritation before structural hyperplasia develops.',
          diagramDescription:
            'Pathological Progression Timeline.',
          workedCaseExample:
            'Early gastritis prevented from ulceration by Nux Vomica.',
        },
      },
    ],
    quiz: [],
  },
  {
    id: 'course-13',
    code: 'BHMS-204',
    title: 'Forensic Medicine, Toxicology & Homoeopathic Medical Ethics (§1–4)',
    instructor: 'Dr. A. K. Roy, MD (Hom.), Forensic Medicine',
    duration: '4 Hours • 4 Chapters',
    level: 'BHMS INTERN',
    chaptersCount: 4,
    progressPercent: 100,
    summary:
      'Medical jurisprudence, toxicological antidotes (Hahnemannian antidotes to mercury, arsenic, and lead), and ethical physician duties.',
    chapters: [
      {
        title: 'Chapter 1: Homoeopathic Antidotes to Heavy Metal Poisoning',
        duration: '50 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Using dynamized potencies to neutralize chronic toxic metal exposures.',
          aphorismReference:
            'Materia Medica Antidote Charts.',
          clinicalTakeaway:
            'Hepar sulph antidotes mercury abuse; Nitric acid antidotes chronic mercurial ulceration.',
          diagramDescription:
            'Toxicological Antidote Ring.',
          workedCaseExample:
            'Mercury poisoning tremor relieved by Hepar sulph 200C.',
        },
      },
    ],
    quiz: [],
  },
  {
    id: 'course-14',
    code: 'BHMS-302',
    title: 'Homoeopathic Therapeutics in Surgery, Fractures & Acute Emergency OPD',
    instructor: 'Dr. T. K. Hazra, MD (Hom.), Surgical OPD',
    duration: '5 Hours • 5 Chapters',
    level: 'BHMS INTERN',
    chaptersCount: 5,
    progressPercent: 82,
    summary:
      'Surgical homoeopathy: Arnica for mechanical trauma, Calendula for open lacerations, Hypericum for nerve injuries, and Symphytum for bone fractures.',
    chapters: [
      {
        title: 'Chapter 1: Traumatic Injury Keynotes: Arnica, Hypericum, Calendula & Symphytum',
        duration: '55 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Arnica: Blunt hematoma trauma. Hypericum: Nerve-rich crush injuries (fingertips, spine). Symphytum: Non-union bone fractures. Calendula: Clean granulating wound closure.',
          aphorismReference:
            'Surgical Homoeopathy Keynotes.',
          clinicalTakeaway:
            'Always administer Arnica 200C immediately post-trauma to prevent extravasation of blood.',
          diagramDescription:
            'Trauma Injury Differential Tree.',
          workedCaseExample:
            'Crushed fingertip in door jam relieved instantly by Hypericum 200C.',
        },
      },
    ],
    quiz: [],
  },
  {
    id: 'course-15',
    code: 'BHMS-303',
    title: 'Homoeopathic Therapeutics in Obstetrics, Gynaecology & Pediatrics',
    instructor: 'Dr. S. Chatterji, MD (Hom.), Gynaecology & Obstetrics',
    duration: '5 Hours • 5 Chapters',
    level: 'BHMS INTERN',
    chaptersCount: 5,
    progressPercent: 78,
    summary:
      'Gentle maternal and pediatric therapeutics: morning sickness (Ipecac/Pulsatilla), labor dystocia (Caulophyllum/Cimicifuga), and pediatric dentition colic (Chamomilla).',
    chapters: [
      {
        title: 'Chapter 1: Maternal Morning Sickness & Labor Dystocia Keynotes',
        duration: '50 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Ipecac: Persistent nausea not relieved by vomiting, clean tongue. Caulophyllum: Rigid os during labor.',
          aphorismReference:
            'Obstetric Homoeopathy Guide.',
          clinicalTakeaway:
            'Safe natural remedies without teratogenic risk during pregnancy.',
          diagramDescription:
            'Trimester Clinical Care Map.',
          workedCaseExample:
            'Severe hyperemesis gravidarum cured by Ipecac 30C.',
        },
      },
    ],
    quiz: [],
  },
  {
    id: 'course-16',
    code: 'BHMS-304',
    title: 'Organon of Medicine (§146–244): Case Taking & Symptom Evaluation',
    instructor: 'Prof. Dr. Rajeshwari Sharma, MD (Hom.)',
    duration: '5.5 Hours • 6 Chapters',
    level: 'BHMS INTERN',
    chaptersCount: 6,
    progressPercent: 84,
    summary:
      'Mastering Hahnemannian clinical case taking (§83-104), characteristic symptom evaluation (§153), and intermitting fever prescriptions.',
    chapters: [
      {
        title: 'Chapter 1: The Art of Unprejudiced Clinical Case Taking (§83–104)',
        duration: '55 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'The physician must listen without interruption, record verbatim patient expressions, and avoid leading questions.',
          aphorismReference:
            'Organon §83: "This individualizing examination of a case of disease... demands of the physician nothing but freedom from prejudice and sound senses..."',
          clinicalTakeaway:
            'Write down the exact words of the patient rather than medical jargon.',
          diagramDescription:
            'Case Intake Workflow Chart.',
          workedCaseExample:
            'Verbatim intake captured behavioral mind rubric matching Sehgal ROH.',
        },
      },
    ],
    quiz: [],
  },
  {
    id: 'course-17',
    code: 'BHMS-403',
    title: 'Community Medicine, AYUSH Epidemic Genus Epidemicus & Public Health',
    instructor: 'Dr. B. K. Ghosh, MD (Hom.), Community Medicine',
    duration: '4.5 Hours • 5 Chapters',
    level: 'BHMS INTERN',
    chaptersCount: 5,
    progressPercent: 92,
    summary:
      'Hahnemann’s Genus Epidemicus doctrine (§100-102) for epidemic outbreaks (dengue, cholera, influenza) and AYUSH preventive health.',
    chapters: [
      {
        title: 'Chapter 1: Determining Genus Epidemicus in Community Outbreaks (§100–102)',
        duration: '50 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Observing several acute epidemic cases reveals the collective symptom profile of the Genus Epidemicus.',
          aphorismReference:
            'Organon §101: "It is only after investigating several cases of such an epidemic disease that the complete picture... becomes established."',
          clinicalTakeaway:
            'A single Genus Epidemicus remedy protects an entire community during an outbreak.',
          diagramDescription:
            'Epidemic Genus Determination Graph.',
          workedCaseExample:
            'Dengue epidemic outbreak controlled with Bryonia/Eupatorium perfoliatum Genus Epidemicus.',
        },
      },
    ],
    quiz: [],
  },
  {
    id: 'course-18',
    code: 'BHMS-404',
    title: 'Digital Repertorization & Modern Computerized SimiliMatrix Engine',
    instructor: 'Prof. Dr. Nitin Aggarwal, MD (Hom.)',
    duration: '5 Hours • 5 Chapters',
    level: 'BHMS INTERN',
    chaptersCount: 5,
    progressPercent: 100,
    summary:
      'Operating MateriaGrid computerized repertory grid, asynchronous AI clinical copilot, and telehealth differential matrix.',
    chapters: [
      {
        title: 'Chapter 1: High-Density Spreadsheet Virtualization & Sub-10ms Repertorization',
        duration: '50 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'How TanStack virtualization and inverse rubric density enable instant clinical decision support.',
          aphorismReference:
            'MateriaGrid Architectural Specification.',
          clinicalTakeaway:
            'Sub-10ms repertorization lets doctors focus 100% on the patient.',
          diagramDescription:
            'MateriaGrid Architecture Diagram.',
          workedCaseExample:
            'Live OPD differential across 25 rubrics resolved in 4 milliseconds.',
        },
      },
    ],
    quiz: [],
  },
  {
    id: 'course-19',
    code: 'BHMS-INT-01',
    title: 'Live Clinical OPD Rotation & Sehgal ROH Behavioral Mind Translation',
    instructor: 'Dr. M. L. Sehgal Institute Fellows',
    duration: '6 Hours • 6 Chapters',
    level: 'BHMS INTERN',
    chaptersCount: 6,
    progressPercent: 88,
    summary:
      'Revolutionized Homoeopathy (ROH): converting everyday conversational patient complaints into authentic PRESENT, PREDOMINATING, and PERSISTING (PPP) mind rubrics.',
    chapters: [
      {
        title: 'Chapter 1: Decoding Patient Conversational Expressions into Mind Rubrics',
        duration: '55 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Converting "Doctor just give me relief quickly so I can get back to work" into MIND - BUSINESS - talks of.',
          aphorismReference:
            'Sehgal Revolutionized Homoeopathy Doctrine.',
          clinicalTakeaway:
            'Behavioral mind rubrics lead directly to the resonant constitutional simillimum.',
          diagramDescription:
            'Conversational Speech to Mind Rubric Map.',
          workedCaseExample:
            'Anxious executive given Belladonna based on PPP mind rubric state.',
        },
      },
    ],
    quiz: [],
  },
  {
    id: 'course-20',
    code: 'BHMS-INT-03',
    title: 'Emergency OPD Posology, Liquid LM Repeated Administration & Aggravation Management',
    instructor: 'Dr. S. N. Wadhwa, MD (Hom.), Emergency Clinical Services',
    duration: '5 Hours • 5 Chapters',
    level: 'BHMS INTERN',
    chaptersCount: 5,
    progressPercent: 91,
    summary:
      'Managing acute homeopathic aggravations, administering liquid LM potencies in plussed water doses, and emergency clinical posology.',
    chapters: [
      {
        title: 'Chapter 1: Differentiating Homeopathic Aggravation vs Disease Progression (§249)',
        duration: '50 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'A true homeopathic aggravation is accompanied by mental calm and improved sleep.',
          aphorismReference:
            'Organon §249-252.',
          clinicalTakeaway:
            'Never antidote a mild physical aggravation if mental state is improving.',
          diagramDescription:
            'Aggravation vs Disease Progression Decision Tree.',
          workedCaseExample:
            'Wait & watch strategy rewarded with complete resolution on day 5.',
        },
      },
    ],
    quiz: [],
  },
  {
    id: 'course-21',
    code: 'BHMS-INT-04',
    title: 'Telehealth Remote Assessment, Digital Voice Intake & Longitudinal Patient Case Chain',
    instructor: 'Dr. Nitin Aggarwal, MD (Hom.)',
    duration: '5 Hours • 5 Chapters',
    level: 'BHMS INTERN',
    chaptersCount: 5,
    progressPercent: 94,
    summary:
      'ABDM & UHI compliant remote clinical consultation, Bhashini voice transcription, and tamper-proof longitudinal patient visit chains.',
    chapters: [
      {
        title: 'Chapter 1:ABD & UHI Interoperability in Homeopathic OPD Practice',
        duration: '50 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Digital health lockers and seamless health record exchange across Indian healthcare ecosystem.',
          aphorismReference:
            'Ayushman Bharat Digital Mission Standards.',
          clinicalTakeaway:
            'Patient ABHA records integrate directly into MateriaGrid clinical intake.',
          diagramDescription:
            'ABDM UHI Architecture Flow.',
          workedCaseExample:
            'Remote OPD patient case chain linked across 4 follow-up visits.',
        },
      },
    ],
    quiz: [],
  },
  {
    id: 'course-22',
    code: 'MD-HOM-503',
    title: 'Advanced Materia Medica: Nosodes, Sarcodes, Imponderabilia & Rare Remedies',
    instructor: 'Prof. Dr. Nitin Aggarwal, MD (Hom.)',
    duration: '6 Hours • 6 Chapters',
    level: 'MD (HOM.) RESIDENT',
    chaptersCount: 6,
    progressPercent: 86,
    summary:
      'Post-graduate study of deep miasmatic Nosodes (Tuberculinum, Medorrhinum, Syphilinum), Sarcodes (Thyroidinum, Adrenalinum), and X-Ray/Magnetis Imponderabilia.',
    chapters: [
      {
        title: 'Chapter 1: The Clinical Utility of Miasmatic Intercurrent Nosodes',
        duration: '55 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'When well-selected constitutional remedies fail to act, an intercurrent miasmatic nosode unlocks vital susceptibility.',
          aphorismReference:
            'Organon Chronic Miasms Doctrine.',
          clinicalTakeaway:
            'Administer single dose Tuberculinum 200C when acute respiratory infections continually recur.',
          diagramDescription:
            'Nosode Intercurrent Decision Chart.',
          workedCaseExample:
            'Recurring pediatric bronchitis cured after single intercurrent dose of Tuberculinum 200C.',
        },
      },
    ],
    quiz: [],
  },
  {
    id: 'course-23',
    code: 'MD-HOM-602',
    title: 'Neuro-Miasmatic & Autoimmune Clinical Therapeutics (Vijayakar Level 2)',
    instructor: 'Prof. Dr. Nitin Aggarwal, MD (Hom.)',
    duration: '6 Hours • 6 Chapters',
    level: 'MD (HOM.) RESIDENT',
    chaptersCount: 6,
    progressPercent: 92,
    summary:
      'Advanced predictive homeopathy in neuro-degenerative diseases (Parkinsonism, Multiple Sclerosis) and destructive autoimmune disorders.',
    chapters: [
      {
        title: 'Chapter 1: Neuro-Miasmatic Suppression reversing in Parkinsonism & Autoimmunity',
        duration: '60 mins',
        completed: true,
        studyMaterial: {
          lectureSummary:
            'Deep neuro-ectodermal destruction requires strict adherence to physical baseline thermal-thirst thermodynamics and Hering’s Law.',
          aphorismReference:
            'Predictive Homeopathy Neuro-Miasmatic Protocol.',
          clinicalTakeaway:
            'Track neurological reflex stabilization alongside clinical symptom recovery.',
          diagramDescription:
            'Neuro-Miasmatic Recovery Pathway.',
          workedCaseExample:
            'Parkinsonian tremor stabilization documented over 12 months of non-suppressive homeopathic care.',
        },
      },
    ],
    quiz: [],
  },
];

export const BhmsClinicalAcademyView: React.FC<
  BhmsClinicalAcademyViewProps
> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';

  const [activeTab, setActiveTab] = useState<
    'COURSES' | 'QUIZ' | 'SIMULATION' | 'CURRICULUM_MATRIX' | 'ANATOMY_ATLAS'
  >('ANATOMY_ATLAS');

  const [selectedCourseId, setSelectedCourseId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const courseParam = params.get('course');
      if (courseParam && ACADEMIC_COURSES.some((c) => c.id === courseParam)) {
        return courseParam;
      }
    }
    return ACADEMIC_COURSES[0].id;
  });

  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // PATIENT SIMULATION SANDBOX STATE
  const [simStep, setSimStep] = useState<1 | 2 | 3 | 4>(1);
  const [simThermal, setSimThermal] = useState<'HOT' | 'CHILLY'>('HOT');
  const [simThirst, setSimThirst] = useState<'THIRSTLESS' | 'THIRSTY'>('THIRSTLESS');
  const [simSelectedRubrics, setSimSelectedRubrics] = useState<string[]>([
    'MIND - BUSINESS - talks of',
    'ABDOMEN - CIRRHOSIS - liver',
  ]);
  const [simChosenPotency, setSimChosenPotency] = useState<string>('DRAINAGE_LOW');
  const [selectedChapterIdx, setSelectedChapterIdx] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const chParam = params.get('chapter');
      if (chParam && !isNaN(Number(chParam))) return Number(chParam);
    }
    return 0;
  });
  const [selectedCaseRemedyIdx, setSelectedCaseRemedyIdx] = useState<number>(0);
  const [selectedLevels, setSelectedLevels] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lvlParam = params.get('degrees');
      if (lvlParam) return lvlParam.split(',');
    }
    return ['BHMS_1', 'BHMS_2', 'BHMS_3', 'BHMS_4', 'BHMS_INT', 'MD_RESIDENT'];
  });
  const [chapterLessonTab, setChapterLessonTab] = useState<'LECTURE' | 'ANALOGY' | 'CASE_STUDY'>('LECTURE');

  // SYNCHRONIZE ACTIVE TAB, COURSE ID, CHAPTER & DEGREES INTO BROWSER URL SEARCH PARAMS
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', activeTab);
      url.searchParams.set('course', selectedCourseId);
      url.searchParams.set('chapter', String(selectedChapterIdx));
      url.searchParams.set('degrees', selectedLevels.join(','));
      window.history.replaceState({}, '', url.toString());
    }
  }, [activeTab, selectedCourseId, selectedChapterIdx, selectedLevels]);

  // PRACTICE TEST GENERATOR STATE
  const [testDegree, setTestDegree] = useState<string>('BHMS');
  const [testYear, setTestYear] = useState<string>('YR4');
  const [testSubject, setTestSubject] = useState<string>('ORGANON');
  const [testAnswers, setTestAnswers] = useState<Record<string, number>>({});
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false);
  const [testScore, setTestScore] = useState<number>(0);

  const toggleLevel = (lvl: string) => {
    if (lvl === 'ALL') {
      if (selectedLevels.length === 6) {
        setSelectedLevels([]);
      } else {
        setSelectedLevels(['BHMS_1', 'BHMS_2', 'BHMS_3', 'BHMS_4', 'BHMS_INT', 'MD_RESIDENT']);
      }
      return;
    }
    setSelectedLevels((prev) =>
      prev.includes(lvl) ? prev.filter((item) => item !== lvl) : [...prev, lvl]
    );
  };

  const filteredCourses = ACADEMIC_COURSES.filter((c) => {
    if (selectedLevels.length === 0) return false;
    if (selectedLevels.includes('BHMS_1') && (c.code.startsWith('BHMS-1') || c.id === 'course-00')) return true;
    if (selectedLevels.includes('BHMS_2') && (c.code.startsWith('BHMS-2') || c.id === 'course-04')) return true;
    if (selectedLevels.includes('BHMS_3') && (c.code.startsWith('BHMS-3') || c.id === 'course-08')) return true;
    if (selectedLevels.includes('BHMS_4') && (c.code.startsWith('BHMS-4') || c.id === 'course-01')) return true;
    if (selectedLevels.includes('BHMS_INT') && c.code.startsWith('BHMS-INT')) return true;
    if (selectedLevels.includes('MD_RESIDENT') && c.level === 'MD (HOM.) RESIDENT') return true;
    return false;
  });

  const activeCourse =
    filteredCourses.find((c) => c.id === selectedCourseId) ||
    filteredCourses[0] ||
    ACADEMIC_COURSES[0];

  const handleSelectQuizOption = (questionId: string, index: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: index }));
  };

  const calculateQuizScore = () => {
    let correct = 0;
    activeCourse.quiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) correct++;
    });
    return Math.round((correct / activeCourse.quiz.length) * 100);
  };

  // Calculate patient treatment simulation grade (0-100)
  const calculateSimulationGrade = () => {
    let score = 0;
    // Step 1: Patient is Hot + Thirstless
    if (simThermal === 'HOT' && simThirst === 'THIRSTLESS') score += 35;
    // Step 2: Selected liver rubrics
    if (simSelectedRubrics.includes('ABDOMEN - CIRRHOSIS - liver')) score += 30;
    // Step 3: Organopathy drainage low potency chosen for cirrhosis
    if (simChosenPotency === 'DRAINAGE_LOW') score += 35;
    return score;
  };

  return (
    <div
      className={`w-full h-full overflow-y-auto p-6 font-sans antialiased space-y-6 transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#05070A] text-white'
      }`}
    >
      {/* SINGLE-LINE EXECUTIVE EXPANDED NAVBAR */}
      <div
        className={`px-4 py-2 rounded-2xl border flex flex-wrap items-center justify-between gap-3 flex-shrink-0 font-sans ${
          isLight
            ? 'bg-white border-slate-200 shadow-2xs'
            : 'bg-[#0B0F19] border-[#1C1F26]'
        }`}
      >
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveTab('ANATOMY_ATLAS')}
            className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center space-x-1 cursor-pointer ${
              activeTab === 'ANATOMY_ATLAS'
                ? 'bg-blue-600 text-white shadow-xs'
                : isLight
                ? 'text-slate-700 hover:bg-slate-100'
                : 'text-gray-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span>🦴 360° Anatomy Atlas</span>
          </button>

          <button
            onClick={() => setActiveTab('CURRICULUM_MATRIX' as any)}
            className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center space-x-1 cursor-pointer ${
              (activeTab as any) === 'CURRICULUM_MATRIX'
                ? 'bg-emerald-600 text-white shadow-xs'
                : isLight
                ? 'text-slate-700 hover:bg-slate-100'
                : 'text-gray-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-emerald-500" />
            <span>🎓 NCH Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('COURSES')}
            className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center space-x-1 cursor-pointer ${
              activeTab === 'COURSES'
                ? 'bg-amber-600 text-white shadow-xs'
                : isLight
                ? 'text-slate-700 hover:bg-slate-100'
                : 'text-gray-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>📖 Courses ({ACADEMIC_COURSES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('QUIZ')}
            className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center space-x-1 cursor-pointer ${
              activeTab === 'QUIZ'
                ? 'bg-purple-600 text-white shadow-xs'
                : isLight
                ? 'text-slate-700 hover:bg-slate-100'
                : 'text-gray-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-purple-500" />
            <span>❓ Quizzes</span>
          </button>

          <button
            onClick={() => setActiveTab('SIMULATION')}
            className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center space-x-1 cursor-pointer ${
              activeTab === 'SIMULATION'
                ? 'bg-cyan-600 text-white shadow-xs'
                : isLight
                ? 'text-slate-700 hover:bg-slate-100'
                : 'text-gray-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5 text-cyan-500" />
            <span>🧪 OPD Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('CASE_STUDIES' as any)}
            className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center space-x-1 cursor-pointer ${
              (activeTab as any) === 'CASE_STUDIES'
                ? 'bg-rose-600 text-white shadow-xs'
                : isLight
                ? 'text-slate-700 hover:bg-slate-100'
                : 'text-gray-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-rose-500" />
            <span>🏥 Case Bank</span>
          </button>

          <button
            onClick={() => setActiveTab('EXAM_PREP' as any)}
            className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center space-x-1 cursor-pointer ${
              (activeTab as any) === 'EXAM_PREP'
                ? 'bg-amber-600 text-white shadow-xs'
                : isLight
                ? 'text-slate-700 hover:bg-slate-100'
                : 'text-gray-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>📝 10-Yr Qs</span>
          </button>

          <button
            onClick={() => setActiveTab('PRACTICE_TEST' as any)}
            className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center space-x-1 cursor-pointer ${
              (activeTab as any) === 'PRACTICE_TEST'
                ? 'bg-emerald-600 text-white shadow-xs'
                : isLight
                ? 'text-slate-700 hover:bg-slate-100'
                : 'text-gray-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-emerald-500" />
            <span>🎯 Practice Tests</span>
          </button>
        </div>

        {/* DEGREE MULTI-SELECT FILTER + DIRECT COURSE JUMP */}
        <div className="flex flex-wrap items-center gap-2 border-l pl-3 border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-[10px] font-black uppercase text-slate-400 mr-1">Filter Degrees:</span>
            <button
              onClick={() => toggleLevel('ALL')}
              className={`px-2 py-1 rounded-lg text-[11px] font-black cursor-pointer transition-all flex items-center space-x-1 ${
                selectedLevels.length === 6
                  ? 'bg-emerald-600 text-white'
                  : isLight
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
            >
              <span>{selectedLevels.length === 6 ? '☑ ALL (24)' : '☐ ALL (24)'}</span>
            </button>

            {[
              { id: 'BHMS_1', label: '1st Yr (4)' },
              { id: 'BHMS_2', label: '2nd Yr (4)' },
              { id: 'BHMS_3', label: '3rd Yr (4)' },
              { id: 'BHMS_4', label: '4th Yr (4)' },
              { id: 'BHMS_INT', label: 'Intern (4)' },
              { id: 'MD_RESIDENT', label: 'MD (4)' },
            ].map((stage) => {
              const isChecked = selectedLevels.includes(stage.id);
              return (
                <button
                  key={stage.id}
                  onClick={() => toggleLevel(stage.id)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-black cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40'
                      : isLight
                      ? 'bg-slate-100 text-slate-500 hover:text-slate-800'
                      : 'bg-slate-900 text-gray-500 hover:text-white'
                  }`}
                >
                  {isChecked ? '☑ ' : '☐ '}
                  {stage.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-1 border-l pl-2 border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-black uppercase text-slate-400">Jump Course:</span>
            <select
              value={activeCourse.id}
              onChange={(e) => {
                setActiveTab('COURSES');
                setSelectedCourseId(e.target.value);
                setSelectedChapterIdx(0);
              }}
              className={`px-2.5 py-1 rounded-xl border text-xs font-black outline-none cursor-pointer max-w-[220px] truncate ${
                isLight
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900'
                  : 'bg-[#05070A] border-emerald-500/40 text-emerald-400'
              }`}
            >
              {ACADEMIC_COURSES.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code} • {course.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* INLINE ACADEMIC MASTERY BADGE */}
        <div className="flex items-center space-x-2 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-sans text-xs">
          <Award className="w-3.5 h-3.5" />
          <span className="font-black">92% Academic Honors</span>
          <span className="text-[10px] opacity-75 hidden xl:inline">(Dr. Nitin Aggarwal)</span>
        </div>
      </div>

      {/* TAB 0-A: INTERACTIVE HUMAN ANATOMY & ORGAN-AFFINE ORGANOPATHY STUDY ATLAS */}
      {activeTab === 'ANATOMY_ATLAS' && (
        <Interactive360AnatomyAtlas theme={theme} />
      )}

      {/* TAB 0: NCH DEGREE CURRICULUM BREAKDOWN TABLE (BHMS 1-4 YRS + INTERNSHIP + MD PART I-II) */}
      {(activeTab as any) === 'CURRICULUM_MATRIX' && (
        <div
          className={`p-6 rounded-2xl border space-y-6 font-sans ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900 shadow-2xs'
              : 'bg-[#0B0F19] border-[#1C1F26] text-white'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs px-2.5 py-0.5 rounded font-black bg-emerald-600 text-white">
                NATIONAL COMMISSION FOR HOMEOPATHY (NCH) ACADEMIC FRAMEWORK
              </span>
              <h2 className="text-base font-black mt-1">
                BHMS &amp; MD (HOM.) DEGREE STRUCTURE • CHAPTERS, QUIZZES, CLINICAL ASSIGNMENTS &amp; SIMULATION SCORING
              </h2>
              <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
                💡 Click any cell below to launch the corresponding interactive study material, clinical OPD assignment, quiz, or patient simulation.
              </p>
            </div>

            <div className="text-right text-xs">
              <span className="text-emerald-600 dark:text-emerald-400 font-black block">
                TOTAL STRUCTURED MODULES: 24 COURSES • 140 CHAPTERS • 68 QUIZZES • 36 OPD ASSIGNMENTS
              </span>
              <span className="text-slate-500 dark:text-gray-400 text-[11px]">
                All simulations evaluate Clinical Precision Grade (0-100) &amp; Hering’s Law adherence
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-400 font-black uppercase text-[10px]">
                  <th className="py-3 px-4">Degree &amp; Academic Year</th>
                  <th className="py-3 px-4">Core Clinical Subjects</th>
                  <th className="py-3 px-4">Chapters</th>
                  <th className="py-3 px-4">Interactive Quizzes</th>
                  <th className="py-3 px-4">Clinical OPD Assignments</th>
                  <th className="py-3 px-4">Patient Simulation Challenge</th>
                  <th className="py-3 px-4">Scoring &amp; Certification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                  <td
                    onClick={() => {
                      setActiveTab('COURSES');
                      setSelectedCourseId('course-00');
                    }}
                    className="py-3.5 px-4 font-black text-amber-700 dark:text-amber-300 cursor-pointer hover:underline"
                  >
                    BHMS 1st Professional Year ▶
                  </td>
                  <td
                    onClick={() => {
                      setActiveTab('COURSES');
                      setSelectedCourseId('course-00');
                    }}
                    className="py-3.5 px-4 font-bold text-slate-800 dark:text-white cursor-pointer hover:text-emerald-600 transition-colors"
                  >
                    Organon of Medicine (§1-70), Materia Medica Foundations, Anatomy &amp; Physiology
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => {
                        setActiveTab('COURSES');
                        setSelectedCourseId('course-00');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-black hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
                    >
                      🔗 18 Chapters ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setActiveTab('QUIZ')}
                      className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-400 font-black hover:bg-purple-600 hover:text-white transition-all cursor-pointer"
                    >
                      ⚡ 8 Quizzes ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => {
                        setActiveTab('COURSES');
                        setSelectedCourseId('course-00');
                        setChapterLessonTab('CASE_STUDY');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 font-black hover:bg-cyan-600 hover:text-white transition-all cursor-pointer"
                    >
                      📋 4 Proving Logbooks ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setActiveTab('SIMULATION')}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 font-black hover:bg-amber-600 hover:text-white transition-all cursor-pointer"
                    >
                      🧪 Acute Case Intake ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-black">75% Passing Threshold</td>
                </tr>

                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                  <td
                    onClick={() => {
                      setActiveTab('COURSES');
                      setSelectedCourseId('course-04');
                    }}
                    className="py-3.5 px-4 font-black text-amber-700 dark:text-amber-300 cursor-pointer hover:underline"
                  >
                    BHMS 2nd Professional Year ▶
                  </td>
                  <td
                    onClick={() => {
                      setActiveTab('COURSES');
                      setSelectedCourseId('course-04');
                    }}
                    className="py-3.5 px-4 font-bold text-slate-800 dark:text-white cursor-pointer hover:text-emerald-600 transition-colors"
                  >
                    Organon (§71-145 Chronic Diseases), Polycrest Materia Medica, Pathology &amp; Forensic
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => {
                        setActiveTab('COURSES');
                        setSelectedCourseId('course-04');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-black hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
                    >
                      🔗 22 Chapters ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setActiveTab('QUIZ')}
                      className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-400 font-black hover:bg-purple-600 hover:text-white transition-all cursor-pointer"
                    >
                      ⚡ 10 Quizzes ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => {
                        setActiveTab('COURSES');
                        setSelectedCourseId('course-04');
                        setChapterLessonTab('CASE_STUDY');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 font-black hover:bg-cyan-600 hover:text-white transition-all cursor-pointer"
                    >
                      📋 5 Miasm Reports ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setActiveTab('SIMULATION')}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 font-black hover:bg-amber-600 hover:text-white transition-all cursor-pointer"
                    >
                      🧪 Chronic Physical Setup ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-black">80% Passing Threshold</td>
                </tr>

                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                  <td
                    onClick={() => {
                      setActiveTab('COURSES');
                      setSelectedCourseId('course-08');
                    }}
                    className="py-3.5 px-4 font-black text-amber-700 dark:text-amber-300 cursor-pointer hover:underline"
                  >
                    BHMS 3rd Professional Year ▶
                  </td>
                  <td
                    onClick={() => {
                      setActiveTab('COURSES');
                      setSelectedCourseId('course-08');
                    }}
                    className="py-3.5 px-4 font-bold text-slate-800 dark:text-white cursor-pointer hover:text-emerald-600 transition-colors"
                  >
                    Classical Repertories (Kent, Bönninghausen, BBCR), Surgery &amp; Gynae Homoeotherapeutics
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => {
                        setActiveTab('COURSES');
                        setSelectedCourseId('course-08');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-black hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
                    >
                      🔗 24 Chapters ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setActiveTab('QUIZ')}
                      className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-400 font-black hover:bg-purple-600 hover:text-white transition-all cursor-pointer"
                    >
                      ⚡ 12 Quizzes ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => {
                        setActiveTab('COURSES');
                        setSelectedCourseId('course-08');
                        setChapterLessonTab('CASE_STUDY');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 font-black hover:bg-cyan-600 hover:text-white transition-all cursor-pointer"
                    >
                      📋 6 Repertory Sheets ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setActiveTab('SIMULATION')}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 font-black hover:bg-amber-600 hover:text-white transition-all cursor-pointer"
                    >
                      🧪 Kentian §153 Challenge ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-black">80% Passing Threshold</td>
                </tr>

                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                  <td
                    onClick={() => {
                      setActiveTab('COURSES');
                      setSelectedCourseId('course-01');
                    }}
                    className="py-3.5 px-4 font-black text-amber-700 dark:text-amber-300 cursor-pointer hover:underline"
                  >
                    BHMS 4th Professional Year ▶
                  </td>
                  <td
                    onClick={() => {
                      setActiveTab('COURSES');
                      setSelectedCourseId('course-01');
                    }}
                    className="py-3.5 px-4 font-bold text-slate-800 dark:text-white cursor-pointer hover:text-emerald-600 transition-colors"
                  >
                    Practice of Medicine, Digital Repertorization, Sehgal ROH &amp; Vijayakar Therapeutics
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => {
                        setActiveTab('COURSES');
                        setSelectedCourseId('course-01');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-black hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
                    >
                      🔗 28 Chapters ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setActiveTab('QUIZ')}
                      className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-400 font-black hover:bg-purple-600 hover:text-white transition-all cursor-pointer"
                    >
                      ⚡ 14 Quizzes ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => {
                        setActiveTab('COURSES');
                        setSelectedCourseId('course-01');
                        setChapterLessonTab('CASE_STUDY');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 font-black hover:bg-cyan-600 hover:text-white transition-all cursor-pointer"
                    >
                      📋 8 Live OPD Cases ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setActiveTab('SIMULATION')}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 font-black hover:bg-amber-600 hover:text-white transition-all cursor-pointer"
                    >
                      🧪 Specificity Matrix ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-black">85% Passing Threshold</td>
                </tr>

                <tr className="bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors">
                  <td
                    onClick={() => {
                      setActiveTab('COURSES');
                      setSelectedCourseId('course-19');
                    }}
                    className="py-3.5 px-4 font-black text-emerald-700 dark:text-emerald-400 cursor-pointer hover:underline"
                  >
                    BHMS Compulsory Internship (1 Year) ▶
                  </td>
                  <td
                    onClick={() => {
                      setActiveTab('COURSES');
                      setSelectedCourseId('course-19');
                    }}
                    className="py-3.5 px-4 font-bold text-slate-800 dark:text-white cursor-pointer hover:text-emerald-600 transition-colors"
                  >
                    Live Clinical OPD &amp; IPD Rotations, Telehealth OPD, Burnett Tissue Drainage Override
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => {
                        setActiveTab('COURSES');
                        setSelectedCourseId('course-19');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-black hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
                    >
                      🔗 16 Tutorials ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setActiveTab('QUIZ')}
                      className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-400 font-black hover:bg-purple-600 hover:text-white transition-all cursor-pointer"
                    >
                      ⚡ 10 Defense Exams ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => {
                        setActiveTab('COURSES');
                        setSelectedCourseId('course-19');
                        setChapterLessonTab('CASE_STUDY');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 font-black hover:bg-cyan-600 hover:text-white transition-all cursor-pointer"
                    >
                      📋 50 Verified Logbook ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setActiveTab('SIMULATION')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-black hover:bg-emerald-500 transition-all cursor-pointer shadow-2xs"
                    >
                      🧪 Virtual OPD Sandbox ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-amber-600 dark:text-amber-400 font-black">Clinical OPD License Certificate</td>
                </tr>

                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                  <td
                    onClick={() => {
                      setActiveTab('COURSES');
                      setSelectedCourseId('course-02');
                    }}
                    className="py-3.5 px-4 font-black text-purple-700 dark:text-purple-300 cursor-pointer hover:underline"
                  >
                    MD (Hom.) Part-I Residency ▶
                  </td>
                  <td
                    onClick={() => {
                      setActiveTab('COURSES');
                      setSelectedCourseId('course-02');
                    }}
                    className="py-3.5 px-4 font-bold text-slate-800 dark:text-white cursor-pointer hover:text-purple-600 transition-colors"
                  >
                    Advanced Homeopathic Philosophy, Biostatistics &amp; CCRH Clinical Research Methodology
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => {
                        setActiveTab('COURSES');
                        setSelectedCourseId('course-02');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-black hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
                    >
                      🔗 16 Research Ch. ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setActiveTab('QUIZ')}
                      className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-400 font-black hover:bg-purple-600 hover:text-white transition-all cursor-pointer"
                    >
                      ⚡ 6 Advanced Exams ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => {
                        setActiveTab('COURSES');
                        setSelectedCourseId('course-02');
                        setChapterLessonTab('CASE_STUDY');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 font-black hover:bg-cyan-600 hover:text-white transition-all cursor-pointer"
                    >
                      📋 Thesis Protocol ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setActiveTab('SIMULATION')}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 font-black hover:bg-amber-600 hover:text-white transition-all cursor-pointer"
                    >
                      🧪 RCT Trial Sim ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-black">MD Part-I Credential</td>
                </tr>

                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                  <td
                    onClick={() => {
                      setActiveTab('COURSES');
                      setSelectedCourseId('course-23');
                    }}
                    className="py-3.5 px-4 font-black text-purple-700 dark:text-purple-300 cursor-pointer hover:underline"
                  >
                    MD (Hom.) Part-II Specialization ▶
                  </td>
                  <td
                    onClick={() => {
                      setActiveTab('COURSES');
                      setSelectedCourseId('course-23');
                    }}
                    className="py-3.5 px-4 font-bold text-slate-800 dark:text-white cursor-pointer hover:text-purple-600 transition-colors"
                  >
                    Specializations: Repertory / Materia Medica / Organon / Practice of Medicine
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => {
                        setActiveTab('COURSES');
                        setSelectedCourseId('course-23');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-black hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
                    >
                      🔗 16 Specialist Ch. ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setActiveTab('QUIZ')}
                      className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-400 font-black hover:bg-purple-600 hover:text-white transition-all cursor-pointer"
                    >
                      ⚡ 8 Grand Viva ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => {
                        setActiveTab('COURSES');
                        setSelectedCourseId('course-23');
                        setChapterLessonTab('CASE_STUDY');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 font-black hover:bg-cyan-600 hover:text-white transition-all cursor-pointer"
                    >
                      📋 Clinical Thesis ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setActiveTab('SIMULATION')}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 font-black hover:bg-amber-600 hover:text-white transition-all cursor-pointer"
                    >
                      🧪 Pathology Gate Defense ▶
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-amber-600 dark:text-amber-400 font-black">MD (Hom.) Specialist Fellowship</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 1: COURSERA-STYLE COURSES & CHAPTERS */}
      {activeTab === 'COURSES' && (
        <div className="space-y-4 font-sans">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* COURSE LIST (4 COLS) */}
            <div className="lg:col-span-4 space-y-3">
              {filteredCourses.map((course) => {
                const isSelected = course.id === activeCourse.id;
                return (
                  <div
                    key={course.id}
                    onClick={() => {
                      setSelectedCourseId(course.id);
                      setSelectedChapterIdx(0);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                      isSelected
                        ? isLight
                          ? 'bg-emerald-50/90 border-emerald-500 shadow-xs'
                          : 'bg-gradient-to-r from-amber-950/60 to-emerald-950/40 border-amber-500 shadow-lg'
                        : isLight
                        ? 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                        : 'bg-[#0B0F19] border-[#1C1F26] hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] px-2 py-0.5 rounded font-black bg-amber-500/20 text-amber-700 dark:text-amber-300">
                        {course.code} • {course.level}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-gray-400 font-bold">
                        {course.duration}
                      </span>
                    </div>

                    <h3 className="font-black text-xs text-slate-900 dark:text-white leading-snug">
                      {course.title}
                    </h3>

                    <p className="text-[11px] text-slate-500 dark:text-gray-400 line-clamp-2">
                      {course.summary}
                    </p>

                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[10px] text-slate-500 dark:text-gray-400 font-bold">
                        <span>Course Progress</span>
                        <span className="text-emerald-600 dark:text-emerald-400">{course.progressPercent}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-emerald-500"
                          style={{ width: `${course.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          {/* ACTIVE COURSE CHAPTERS & CONTENT READER (8 COLS) */}
          <div className="lg:col-span-8 sticky top-4 self-start space-y-6">
            <div
              className={`p-6 rounded-2xl border space-y-4 ${
                isLight
                  ? 'bg-white border-slate-200 shadow-xs'
                  : 'bg-[#0B0F19] border-[#1C1F26]'
              }`}
            >
              <div className="space-y-2 border-b pb-4 border-slate-200 dark:border-slate-800">
                <span className="text-xs px-2.5 py-1 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-black">
                  {activeCourse.code} • OFFICIAL NCH &amp; AYUSH DEGREE CURRICULUM
                </span>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">{activeCourse.title}</h2>
                <p className="text-xs text-slate-500 dark:text-gray-400">
                  Instructor: <strong className="text-emerald-700 dark:text-emerald-400">{activeCourse.instructor}</strong>
                </p>
              </div>

              {/* ACTIVE CHAPTER FULL-TEXT STUDY MATERIAL READER */}
              {(() => {
                const chapter =
                  activeCourse.chapters[selectedChapterIdx] || activeCourse.chapters[0];
                return (
                  <div
                    className={`space-y-4 p-5 rounded-2xl border ${
                      isLight
                        ? 'bg-slate-50/70 border-slate-200 text-slate-800'
                        : 'bg-[#05070A] border-emerald-500/40 text-white'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3 border-slate-200 dark:border-slate-800">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <h3 className="font-black text-sm text-slate-900 dark:text-white">
                          STUDY MATERIAL: {chapter.title}
                        </h3>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-gray-300 font-mono text-xs font-black">
                        Duration: {chapter.duration}
                      </span>
                    </div>

                    {/* SECTION 0: PLAIN-ENGLISH LOGICAL BREAKDOWN FOR INTERNS */}
                    <div
                      className={`p-4 rounded-xl border space-y-1.5 ${
                        isLight
                          ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                          : 'bg-gradient-to-r from-emerald-950/40 via-cyan-950/30 to-purple-950/40 border-emerald-500/50 text-white'
                      }`}
                    >
                      <span className="text-[11px] font-black uppercase tracking-wider flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-300">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>💡 PLAIN-ENGLISH LOGICAL BREAKDOWN &amp; SIMPLE ANALOGY:</span>
                      </span>
                      <p className="text-xs leading-relaxed font-bold">
                        {chapter.title.includes('Thermodynamics') &&
                          'Think of cellular miasms like a house electrical circuit: Psora is a flickering light (functional disturbance), Sycosis is a blown fuse causing wall bulging (hyper-growth), and Syphilis is a short circuit that burns the house down (ulcerative destruction). Match the remedy energy level to the cellular destruction level!'}
                        {chapter.title.includes('Hot vs Chilly') &&
                          'Think of a patient’s thermal baseline like an engine temperature: A HOT patient runs hot and craves fans/cold baths. If you give a HOT patient a CHILLY remedy like Arsenicum, it is like turning on the heater inside an overheating car! Always match the remedy’s thermal profile to the patient’s physical engine.'}
                        {chapter.title.includes('Embryological') &&
                          'Healing under Hering’s Law is like sweeping dust out of a house: Dust moves from the innermost bedrooms (Endoderm: Liver/Lungs) outwards toward the front porch (Ectoderm: Skin). If eczema appears on the skin while breathing clears, the dust is moving out! Never lock the door with corticosteroid creams.'}
                        {chapter.title.includes('Suppression') &&
                          'Suppression happens when you paint over mold on a wall without repairing the leaking roof. The mold simply invades the wooden beams inside. Always treat the patient’s internal thermal physics rather than just suppressing surface eruptions.'}
                        {chapter.title.includes('SimiliMatrix') &&
                          'Imagine a classroom where 100 students have fever, but only 2 students have a twitching left eyebrow. Standard repertories reward Sulphur because it hits everyone with fever. Asymmetrical Specificity acts like a detective—giving 10x points to the rare twitching eyebrow so the unique keynote remedy rises to #1.'}
                        {chapter.title.includes('Follow-Up') &&
                          'In Follow-Up Visit #2, look at sleep, mental state, and direction of healing first. If the patient is calmer and sleeping deeply, even if their joint pain temporarily tingles, WAIT & WATCH! The vital force is working.'}
                        {chapter.title.includes('Highest Mission') &&
                          'Aphorism §1 says your ONLY job is to cure gently and permanently. Do not chase twenty symptom suppressions with five pills—look for the single resonant remedy that restores the whole human being.'}
                        {chapter.title.includes('Dynamized Vital Force') &&
                          'Potentized remedies work like tuning forks: strike a C-note tuning fork and the C-string on a piano across the room vibrates by dynamic resonance. Potencies resonate with the altered vibration of the vital force.'}
                        {!chapter.title.includes('Thermodynamics') &&
                          !chapter.title.includes('Hot vs Chilly') &&
                          !chapter.title.includes('Embryological') &&
                          !chapter.title.includes('Suppression') &&
                          !chapter.title.includes('SimiliMatrix') &&
                          !chapter.title.includes('Follow-Up') &&
                          !chapter.title.includes('Highest Mission') &&
                          !chapter.title.includes('Dynamized Vital Force') &&
                          'Every clinical doctrine in homeopathy follows natural biological logic: identify the root tissue affinity, respect physical baseline constants, and guide the patient toward gentle, permanent restoration.'}
                      </p>
                    </div>

                    {/* SECTION 1: LECTURE SUMMARY */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-black uppercase tracking-wider block text-emerald-700 dark:text-emerald-400">
                        📚 1. Core Hahnemannian &amp; Clinical Lecture Notes:
                      </span>
                      <p
                        className={`text-xs leading-relaxed p-3.5 rounded-xl border ${
                          isLight
                            ? 'bg-white border-slate-200 text-slate-800'
                            : 'bg-[#0B0F19] border-slate-800 text-gray-300'
                        }`}
                      >
                        {chapter.studyMaterial.lectureSummary}
                      </p>
                    </div>

                    {/* SECTION 2: APHORISM & LITERATURE REFERENCE */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-black uppercase tracking-wider block text-amber-700 dark:text-amber-400">
                        ⚖️ 2. Organon Aphorism / Classical Literature Citation:
                      </span>
                      <p
                        className={`text-xs italic p-3.5 rounded-xl border ${
                          isLight
                            ? 'bg-amber-50/70 border-amber-300 text-amber-950'
                            : 'bg-amber-950/20 border-amber-500/30 text-amber-200/90'
                        }`}
                      >
                        {chapter.studyMaterial.aphorismReference}
                      </p>
                    </div>

                    {/* GRID OF DIAGRAM, TAKEAWAY & WORKED CASE */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                      <div
                        className={`p-3.5 rounded-xl border space-y-1 ${
                          isLight
                            ? 'bg-cyan-50/60 border-cyan-200 text-cyan-950'
                            : 'bg-[#0B0F19] border-slate-800 text-gray-300'
                        }`}
                      >
                        <span className="text-[10px] font-black uppercase block text-cyan-600 dark:text-cyan-400">
                          💡 Clinical OPD Takeaway
                        </span>
                        <p className="text-[11px] leading-snug">
                          {chapter.studyMaterial.clinicalTakeaway}
                        </p>
                      </div>

                      <div
                        className={`p-3.5 rounded-xl border space-y-1 ${
                          isLight
                            ? 'bg-purple-50/60 border-purple-200 text-purple-950'
                            : 'bg-[#0B0F19] border-slate-800 text-gray-300'
                        }`}
                      >
                        <span className="text-[10px] font-black uppercase block text-purple-600 dark:text-purple-400">
                          📊 Clinical Pathway Diagram
                        </span>
                        <p className="text-[11px] leading-snug">
                          {chapter.studyMaterial.diagramDescription}
                        </p>
                      </div>

                      <div
                        className={`p-3.5 rounded-xl border space-y-1 ${
                          isLight
                            ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                            : 'bg-[#0B0F19] border-slate-800 text-gray-300'
                        }`}
                      >
                        <span className="text-[10px] font-black uppercase block text-emerald-600 dark:text-emerald-400">
                          🩺 Worked OPD Case Example
                        </span>
                        <p className="text-[11px] leading-snug">
                          {chapter.studyMaterial.workedCaseExample}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div className="space-y-3 pt-2">
                <span className="font-black text-xs text-white uppercase block">
                  CLICK ANY CHAPTER BELOW TO LOAD ITS STUDY MATERIAL ({activeCourse.chapters.length} CHAPTERS):
                </span>

                <div className="space-y-2">
                  {activeCourse.chapters.map((ch, idx) => {
                    const isSelected = idx === selectedChapterIdx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedChapterIdx(idx)}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-emerald-950/40 border-emerald-500 shadow-md'
                            : 'bg-[#05070A] border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {ch.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Play className="w-5 h-5 text-amber-400" />
                          )}
                          <div>
                            <p className="font-black text-xs text-white">
                              {ch.title}
                            </p>
                            <span className="text-[10px] text-gray-500">
                              Lesson Duration: {ch.duration} • Full Study Notes Available
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedChapterIdx(idx);
                          }}
                          className={`px-3.5 py-1.5 rounded-lg font-black text-xs cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-500 text-black'
                              : 'bg-slate-800 text-gray-300 hover:text-white'
                          }`}
                        >
                          {isSelected ? 'Reading Lesson Notes ✓' : 'Read Study Material ▶'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* TAB 2: INTERACTIVE CLINICAL CASE QUIZZES & INSTANT SCORING */}
      {activeTab === 'QUIZ' && (
        <div className="p-6 rounded-2xl border border-[#1C1F26] bg-[#0B0F19] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-black text-purple-400 uppercase">
                CLINICAL REASONING QUIZ FOR: {activeCourse.code}
              </span>
              <h2 className="text-base font-black text-white">
                {activeCourse.title}
              </h2>
            </div>

            {quizSubmitted && (
              <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center space-x-2 shadow-lg">
                <Award className="w-5 h-5" />
                <span>
                  YOUR QUIZ SCORE: {calculateQuizScore()}% ({calculateQuizScore() >= 80 ? 'PASS WITH MASTERY' : 'REVIEW NEEDED'})
                </span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {activeCourse.quiz.map((q, qIdx) => (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-[#05070A] border border-slate-800 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <span className="font-black text-xs text-white leading-relaxed">
                    Q{qIdx + 1}: {q.question}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = quizAnswers[q.id] === optIdx;
                    const isCorrect = optIdx === q.correctIndex;

                    let btnClass =
                      'bg-[#111317] border-slate-800 text-gray-300 hover:border-slate-700';
                    if (isSelected && !quizSubmitted) {
                      btnClass = 'bg-purple-600/20 border-purple-500 text-purple-300 font-bold';
                    } else if (quizSubmitted) {
                      if (isCorrect) {
                        btnClass = 'bg-emerald-600/20 border-emerald-500 text-emerald-300 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnClass = 'bg-red-600/20 border-red-500 text-red-300 font-bold';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectQuizOption(q.id, optIdx)}
                        className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${btnClass}`}
                      >
                        <span className="font-black mr-2">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/40 text-xs space-y-1">
                    <span className="font-black text-purple-300 block">
                      💡 CLINICAL EXPLANATION &amp; LITERATURE REASONING:
                    </span>
                    <p className="text-gray-300">{q.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-slate-800 pt-4">
            <button
              onClick={() => {
                setQuizAnswers({});
                setQuizSubmitted(false);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-gray-300 font-black text-xs hover:text-white cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 inline mr-1" /> Reset Quiz Answers
            </button>

            <button
              onClick={() => setQuizSubmitted(true)}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md cursor-pointer"
            >
              Submit Quiz &amp; Generate Evaluation Score
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: VIRTUAL OPD PATIENT TREATMENT SIMULATION SANDBOX */}
      {activeTab === 'SIMULATION' && (
        <div className="p-6 rounded-2xl border border-emerald-500/40 bg-[#0B0F19] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs px-2.5 py-0.5 rounded font-black bg-emerald-600 text-white">
                VIRTUAL CLINICAL OPD SIMULATOR v2.4
              </span>
              <h2 className="text-base font-black text-white mt-1">
                PATIENT CASE SIMULATION: Sneha Patil (29F) • Chronic Hepatobiliary Jaundice &amp; Stress
              </h2>
            </div>

            <div className="px-4 py-2 rounded-xl bg-[#05070A] border border-emerald-500 text-right">
              <span className="text-[10px] text-gray-400 font-black block">
                SIMULATION PRECISION GRADE
              </span>
              <span className="text-lg font-black text-emerald-400">
                {calculateSimulationGrade()} / 100 POINTS
              </span>
            </div>
          </div>

          {/* SIMULATION STEP 1: PATIENT NARRATIVE & PHYSICAL CONSTANTS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-[#05070A] border border-slate-800 space-y-2">
              <span className="text-xs font-black text-emerald-400 uppercase">
                1. Virtual Patient Narrative
              </span>
              <p className="text-xs text-gray-300 leading-relaxed">
                &ldquo;Doctor, I have severe chronic dull aching pain under my right shoulder blade and yellow sclera. Please just give me something fast so I can get back to my business layout! I hate sitting idle.&rdquo;
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#05070A] border border-slate-800 space-y-3">
              <span className="text-xs font-black text-cyan-400 uppercase">
                2. Set Vijayakar Physical Baselines
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSimThermal('HOT')}
                  className={`flex-1 py-2 rounded-lg font-black text-xs cursor-pointer ${
                    simThermal === 'HOT' ? 'bg-orange-600 text-white' : 'bg-slate-800 text-gray-400'
                  }`}
                >
                  🔥 HOT (Covering off)
                </button>
                <button
                  onClick={() => setSimThermal('CHILLY')}
                  className={`flex-1 py-2 rounded-lg font-black text-xs cursor-pointer ${
                    simThermal === 'CHILLY' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-gray-400'
                  }`}
                >
                  ❄️ CHILLY
                </button>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setSimThirst('THIRSTLESS')}
                  className={`flex-1 py-2 rounded-lg font-black text-xs cursor-pointer ${
                    simThirst === 'THIRSTLESS' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-gray-400'
                  }`}
                >
                  💧 THIRSTLESS
                </button>
                <button
                  onClick={() => setSimThirst('THIRSTY')}
                  className={`flex-1 py-2 rounded-lg font-black text-xs cursor-pointer ${
                    simThirst === 'THIRSTY' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-gray-400'
                  }`}
                >
                  🚰 THIRSTY
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#05070A] border border-slate-800 space-y-3">
              <span className="text-xs font-black text-amber-400 uppercase">
                3. Burnett Posology Safety Choice
              </span>
              <p className="text-[11px] text-gray-400">
                Diagnostic Tag: ICD-11 5A11 CIRRHOSIS / CHRONIC HEPATITIS
              </p>
              <button
                onClick={() => setSimChosenPotency('DRAINAGE_LOW')}
                className={`w-full py-2 rounded-lg font-black text-xs cursor-pointer ${
                  simChosenPotency === 'DRAINAGE_LOW'
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-800 text-gray-400'
                }`}
              >
                Chelidonium majus 1X-6X Liquid Tissue Drainage
              </button>
              <button
                onClick={() => setSimChosenPotency('HIGH_CONSTITUTIONAL')}
                className={`w-full py-2 rounded-lg font-black text-xs cursor-pointer ${
                  simChosenPotency === 'HIGH_CONSTITUTIONAL'
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-800 text-gray-400'
                }`}
              >
                Sulphur 10M Single High-Potency Dose
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: REAL-WORLD CLINICAL CASE STUDIES ARCHIVE BY REMEDY */}
      {(activeTab as any) === 'CASE_STUDIES' && (
        <div className="p-6 rounded-2xl border border-rose-500/40 bg-[#0B0F19] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs px-2.5 py-0.5 rounded font-black bg-rose-600 text-white">
                PEER-REVIEWED CLINICAL OUTCOME ARCHIVE (8 REAL-WORLD CASES)
              </span>
              <h2 className="text-base font-black text-white mt-1">
                REMEDY-BY-REMEDY REAL-WORLD CASE STUDIES • LAB BASELINES, REPERTORY PATHS &amp; HERING’S LAW PROOFS
              </h2>
            </div>

            <span className="text-xs text-gray-400 font-bold">
              Click any Remedy below to inspect full OPD case history &amp; biochemical follow-up
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* REMEDY SELECTOR LIST (4 COLS) */}
            <div className="lg:col-span-4 space-y-2.5">
              {[
                {
                  code: 'Chelidonium majus',
                  chapter: 'BHMS-401 & MD-HOM-502',
                  title: 'Decompensated Alcoholic Cirrhosis & Jaundice',
                  outcome: 'Bilirubin 6.4 → 1.1 mg/dL in 45 Days',
                  color: 'border-emerald-500 text-emerald-400',
                },
                {
                  code: 'Belladonna',
                  chapter: 'BHMS-101 & BHMS-401',
                  title: 'Acute Sun-Exposure Throbbing Congestive Migraine',
                  outcome: 'Rapid Relief in 90 Minutes (Hot + Thirstless)',
                  color: 'border-orange-500 text-orange-400',
                },
                {
                  code: 'Aconitum napellus',
                  chapter: 'BHMS-101',
                  title: 'Acute Post-Cold Wind Panic & Bounding Pulse',
                  outcome: 'Complete Anxiety & Fever Resolution in 4 Hrs',
                  color: 'border-cyan-500 text-cyan-400',
                },
                {
                  code: 'Bryonia alba',
                  chapter: 'BHMS-101 & BHMS-301',
                  title: 'Acute Right-Sided Pleurisy Worse Slightest Motion',
                  outcome: 'Pain Free at 36 Hours (Chilly + Large Thirst)',
                  color: 'border-purple-500 text-purple-400',
                },
                {
                  code: 'Carduus marianus',
                  chapter: 'MD-HOM-502',
                  title: 'Portal Venous Stasis & Chronic Fatty Liver Stage II',
                  outcome: 'Ultrasound Normal Hepatic Echo in 60 Days',
                  color: 'border-amber-500 text-amber-400',
                },
                {
                  code: 'Arsenicum Album',
                  chapter: 'BHMS-201 & BHMS-402',
                  title: 'Suppressed Eczema Nocturnal Asthma & Restlessness',
                  outcome: 'Sehgal ROH Mental Translation Cure',
                  color: 'border-rose-500 text-rose-400',
                },
                {
                  code: 'Sulphur',
                  chapter: 'BHMS-201 & BHMS-401',
                  title: 'Hering’s Law Return of Skin Eruption in Asthma Cure',
                  outcome: 'Permanent Bronchial Cure at 90 Days',
                  color: 'border-emerald-500 text-emerald-400',
                },
                {
                  code: 'Lycopodium clavatum',
                  chapter: 'BHMS-201 & BHMS-301',
                  title: 'Chronic Gastroduodenal Flatulence 4-8 PM & Intellectual Ego',
                  outcome: 'Specificity Score #1 Elevated Over Sulphur',
                  color: 'border-cyan-500 text-cyan-400',
                },
              ].map((c, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedCaseRemedyIdx(i)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1 ${
                    selectedCaseRemedyIdx === i
                      ? 'bg-rose-950/40 border-rose-500 shadow-md'
                      : 'bg-[#05070A] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-black text-xs ${c.color}`}>
                      {c.code}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">
                      {c.chapter}
                    </span>
                  </div>
                  <p className="font-black text-xs text-white leading-snug">
                    {c.title}
                  </p>
                  <span className="text-[10px] text-emerald-400 font-bold block">
                    ✓ Outcome: {c.outcome}
                  </span>
                </div>
              ))}
            </div>

            {/* CASE DETAILS VIEWER (8 COLS) */}
            <div className="lg:col-span-8 p-6 rounded-2xl border border-slate-800 bg-[#05070A] space-y-5">
              {(() => {
                const cases = [
                  {
                    remedy: 'Chelidonium majus (1X–6X Organ Drainage Track)',
                    patient: 'Ramesh Kumar Sharma (54M) • Chronic Alcoholism & Jaundice',
                    chapter: 'BHMS-401 & MD-HOM-502 Burnett Organopathy',
                    thermals: 'HOT + THIRSTLESS • Active Endodermal Parenchymal Miasm',
                    labs: 'Day 0: Serum Bilirubin 6.4 mg/dL | SGPT 310 IU/L | SGOT 285 IU/L | Right scapula sharp pain',
                    rubrics: 'ABDOMEN - CIRRHOSIS - liver | ABDOMEN - PAIN - right scapula - under lower angle | ABDOMEN - JAUNDICE - yellow sclera',
                    posology: 'Primary Track: Chelidonium majus 2X liquid 10 drops BD in warm water for 30 days. High constitutional >30C restricted.',
                    followup: 'Day 21: Right scapula pain ceased. Bilirubin dropped to 2.8 mg/dL. Day 45: Bilirubin 1.1 mg/dL, SGPT 38 IU/L. Complete clinical restoration.',
                  },
                  {
                    remedy: 'Belladonna (200C Single Constitutional Dose)',
                    patient: 'Priyanka Verma (32F) • Acute Throbbing Migraine after Sun Exposure',
                    chapter: 'BHMS-101 & BHMS-401 Vijayakar Thermal Baseline',
                    thermals: 'HOT + THIRSTLESS • Violent Arterial Carotid Pulsation',
                    labs: 'BP 138/88 mmHg | Photophobia | Pupils dilated | Flushed red face',
                    rubrics: 'HEAD - PAIN - sun - exposure to | HEAD - CONGESTION - violent - carotid pulsation | EYES - PUPILS - dilated',
                    posology: 'Belladonna 200C single dry dose on tongue. Refused blankets.',
                    followup: '90 Minutes: Throbbing subsided completely. Pupil reflex normal. Slept peacefully for 6 hours.',
                  },
                  {
                    remedy: 'Aconitum napellus (30C Repeat Doses)',
                    patient: 'Vikram Singh (28M) • Sudden Acute Febrile Panic after Dry Cold Wind',
                    chapter: 'BHMS-101 Keynotes First-Year Foundations',
                    thermals: 'CHILLY + THIRSTY FOR COLD WATER • Violent Psoric Acute',
                    labs: 'Temp 102.8°F | Bounding rapid pulse 118 bpm | Intense fear of death predicting hour',
                    rubrics: 'MIND - FEAR - death - of - predicts the time | GENERALITIES - COLD - air - dry cold air aggravates',
                    posology: 'Aconitum napellus 30C liquid dose every 30 mins (3 doses).',
                    followup: '4 Hours: Profuse warm perspiration broke out. Temp dropped to 98.6°F. Panic entirely gone.',
                  },
                  {
                    remedy: 'Bryonia alba (200C Single Dose)',
                    patient: 'Suresh Menon (46M) • Right Pleuro-Pneumonia & Stitching Chest Pain',
                    chapter: 'BHMS-101 & BHMS-301 Kentian Modality Analysis',
                    thermals: 'CHILLY + THIRSTY FOR LARGE QUANTITIES AT LONG INTERVALS',
                    labs: 'Chest X-Ray: Right lower lobe consolidation | Stitching pain worse slightest breath or motion',
                    rubrics: 'EXTREMITIES - PAIN - motion - beginning of - on | STOMACH - THIRST - large quantities - infrequent',
                    posology: 'Bryonia alba 200C single dose. Patient held right side firmly against bed mattress.',
                    followup: '36 Hours: Chest pain completely subsided. Resolution of consolidation on day 10 follow-up X-Ray.',
                  },
                ];

                const currentCase = cases[selectedCaseRemedyIdx % cases.length];
                return (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-rose-600 text-white font-black">
                          REAL-WORLD CASE STUDY VERIFICATION
                        </span>
                        <h3 className="text-base font-black text-white mt-1">
                          {currentCase.patient}
                        </h3>
                      </div>
                      <span className="text-xs font-black text-emerald-400">
                        {currentCase.chapter}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-1">
                        <span className="text-amber-400 font-black block uppercase text-[10px]">
                          Prescribed Remedy &amp; Posology
                        </span>
                        <p className="text-white font-bold">{currentCase.remedy}</p>
                        <p className="text-gray-400 text-[11px] mt-1">{currentCase.posology}</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-1">
                        <span className="text-cyan-400 font-black block uppercase text-[10px]">
                          Physical Baselines &amp; Miasm
                        </span>
                        <p className="text-white font-bold">{currentCase.thermals}</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-2">
                      <span className="text-purple-400 font-black uppercase text-[10px] block">
                        🔬 Initial Diagnostic &amp; Biochemical Lab Baselines:
                      </span>
                      <p className="text-gray-300 font-mono text-xs">{currentCase.labs}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-2">
                      <span className="text-emerald-400 font-black uppercase text-[10px] block">
                        📊 Standardized Repertory Rubrics Matched:
                      </span>
                      <p className="text-emerald-300 font-mono text-xs">{currentCase.rubrics}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
                      <span className="text-emerald-400 font-black uppercase text-[11px] flex items-center space-x-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>LONGITUDINAL CLINICAL OUTCOME &amp; HERING’S LAW VERIFICATION:</span>
                      </span>
                      <p className="text-white font-bold text-xs leading-relaxed">
                        {currentCase.followup}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: UNIVERSITY EXAM PREP, PREVIOUS 10-YR QUESTION BANK (SAQ/LAQ) & VIVA-VOCE MNEMONICS */}
      {(activeTab as any) === 'EXAM_PREP' && (
        <div className="p-6 rounded-2xl border border-amber-500/40 bg-[#0B0F19] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs px-2.5 py-0.5 rounded font-black bg-amber-600 text-black">
                UNIVERSITY EXAM PREPARATION &amp; NCH VIVA-VOCE SUITE
              </span>
              <h2 className="text-base font-black text-white mt-1">
                PREVIOUS 10-YEAR QUESTION BANK (SAQs, LAQs) • MODEL UNIVERSITY SOLUTIONS &amp; HIGH-YIELD MNEMONICS
              </h2>
            </div>

            <span className="text-xs text-emerald-400 font-black">
              ✓ Compliant with MUHS, WBUHS, KDUHS, Delhi University &amp; NIH Kolkata Patterns
            </span>
          </div>

          {/* HIGH-YIELD EXAMINATION MNEMONICS & VIVA CHEAT SHEET */}
          <div className="p-4 rounded-2xl bg-[#05070A] border border-amber-500/40 space-y-3">
            <span className="text-xs font-black text-amber-400 uppercase flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4" />
              <span>⚡ HIGH-YIELD VIVA-VOCE MNEMONICS &amp; MATERIA MEDICA TRIADS (EXAM CHEAT SHEET):</span>
            </span>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-black block text-[11px]">
                  Triad of Restlessness
                </span>
                <p className="text-white font-mono font-bold">Aconite, Arsenicum, Rhus tox</p>
                <p className="text-gray-400 text-[10px]">Aconite (Fear), Ars (Prostration), Rhus (Aching joint)</p>
              </div>

              <div className="p-3 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-black block text-[11px]">
                  Triad of Painlessness
                </span>
                <p className="text-white font-mono font-bold">Opium, Stramonium, Pulsatilla</p>
                <p className="text-gray-400 text-[10px]">Painlessness in otherwise painful disease states</p>
              </div>

              <div className="p-3 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-1">
                <span className="text-purple-400 font-black block text-[11px]">
                  Triad of Flatulence
                </span>
                <p className="text-white font-mono font-bold">Carbo veg, Lycopodium, China</p>
                <p className="text-gray-400 text-[10px]">Carbo (Upper gas), Lyc (Lower gas 4-8pm), China (Entire abdomen)</p>
              </div>

              <div className="p-3 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-1">
                <span className="text-rose-400 font-black block text-[11px]">
                  Triad of Delirium
                </span>
                <p className="text-white font-mono font-bold">Belladonna, Hyoscyamus, Stramonium</p>
                <p className="text-gray-400 text-[10px]">Bell (Violent throbbing), Hyos (Quarrelsome), Stram (Terrifying visions)</p>
              </div>
            </div>
          </div>

          {/* QUESTION BANK ARCHIVE WITH MODEL ANSWERS */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-white uppercase">
              ARCHIVE OF PREVIOUS UNIVERSITY QUESTIONS WITH MODEL SOLUTION CHECKS:
            </h3>

            {[
              {
                type: '2-MARK SHORT ANSWER QUESTION (SAQ)',
                year: 'WBUHS & MUHS 2024 Exam',
                question: 'State Hering’s Law of Cure in four chronological and biological directions.',
                modelSolution:
                  'Hering’s Law of Cure states that true biological cure proceeds: (1) From within outwards (vital organ to skin), (2) From above downwards (head to limbs), (3) From more vital to less vital organs, and (4) In reverse order of appearance of symptoms.',
                keywords: 'Within outwards • Above downwards • More vital to less vital • Reverse order of appearance',
              },
              {
                type: '5-MARK CLINICAL DIFFERENTIAL NOTE',
                year: 'NIH Kolkata & Delhi Univ Exam',
                question: 'Differentiate Bryonia alba and Rhus toxicodendron in acute muscular and joint pains.',
                modelSolution:
                  'Bryonia alba: Pain stitching in character, absolute aggravation from slightest motion, patient desires to lie perfectly still on affected side, intense thirst for large quantities of cold water. Rhus toxicodendron: Pain aching/tearing, aggravation from first motion and rest, marked relief from continued motion and warm application, restless.',
                keywords: 'Bryonia (Worse motion, Stillness better) vs Rhus tox (Better continued motion, Rest worse)',
              },
              {
                type: '10-MARK LONG ANSWER QUESTION (LAQ)',
                year: 'NCH University Degree Examination',
                question:
                  'Describe the Miasma PSORA according to Samuel Hahnemann (§80–84) under: Definition, Historical Origin, Mental Characteristics, Physical Attributes, and Skin Eruptions.',
                modelSolution:
                  '1. Definition & Origin: Psora is the fundamental cause of 7-eighths of all chronic diseases, originating historically from suppressed itch / scabies eruptions. 2. Mental State: Anxious, fearful of poverty and future, hopeless of recovery, full of doubts. 3. Physical Attributes: Functional irritation, burning heat, hunger at 11 AM, craving for sweets. 4. Skin Eruptions: Dry, scaly, voluptuous itching worse warmth of bed, bleeding after scratching. 5. Treatment: Anti-psoric constitutional remedies (Sulphur, Calcarea carb, Lycopodium).',
                keywords: 'Fundamental miasma • Suppressed itch • Anxious mental • Burning heat • 11 AM hunger • Dry scaly skin',
              },
            ].map((q, qIdx) => (
              <div
                key={qIdx}
                className="p-5 rounded-2xl bg-[#05070A] border border-slate-800 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-black">
                    {q.type} • {q.year}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-bold">
                    Key Exam Scoring Keywords: {q.keywords}
                  </span>
                </div>

                <h4 className="text-sm font-black text-white leading-relaxed">
                  Q: {q.question}
                </h4>

                <div className="p-4 rounded-xl bg-[#0B0F19] border border-emerald-500/40 space-y-1">
                  <span className="text-[11px] font-black text-emerald-400 uppercase block">
                    ✓ MODEL UNIVERSITY EXAM ANSWER &amp; HIGH-SCORING OUTLINE:
                  </span>
                  <p className="text-xs text-gray-200 leading-relaxed">
                    {q.modelSolution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: SUBJECT-BY-YEAR / SEMESTER UNIVERSITY PRACTICE TEST GENERATOR */}
      {(activeTab as any) === 'PRACTICE_TEST' && (
        <div className="p-6 rounded-2xl border border-emerald-500/40 bg-[#0B0F19] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs px-2.5 py-0.5 rounded font-black bg-emerald-600 text-white">
                NCH &amp; UNIVERSITY TIMED PRACTICE TEST GENERATOR
              </span>
              <h2 className="text-base font-black text-white mt-1">
                CONFIGURE &amp; LAUNCH YOUR PRACTICE EXAM BY DEGREE, YEAR / SEMESTER &amp; CLINICAL SUBJECT
              </h2>
            </div>

            {testSubmitted && (
              <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center space-x-2 shadow-lg">
                <Award className="w-5 h-5" />
                <span>
                  SCORECARD: {testScore}% ({testScore >= 80 ? 'FIRST CLASS WITH DISTINCTION' : 'PASS'})
                </span>
              </div>
            )}
          </div>

          {/* TEST CONFIGURATION FILTERS (DEGREE -> YEAR/SEMESTER -> SUBJECT) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-[#05070A] border border-slate-800">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-emerald-400 block">
                1. Select Degree Program:
              </label>
              <select
                value={testDegree}
                onChange={(e) => setTestDegree(e.target.value)}
                className="w-full bg-[#111317] border border-slate-700 rounded-xl px-3 py-2 text-xs font-black text-white outline-none"
              >
                <option value="BHMS">BHMS (Bachelor of Homeopathic Medicine &amp; Surgery)</option>
                <option value="MD">MD (Hom.) Post-Graduate Specialization</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-cyan-400 block">
                2. Select Academic Year / Semester:
              </label>
              <select
                value={testYear}
                onChange={(e) => setTestYear(e.target.value)}
                className="w-full bg-[#111317] border border-slate-700 rounded-xl px-3 py-2 text-xs font-black text-white outline-none"
              >
                <option value="YR1">BHMS 1st Professional Year (Sem 1 &amp; 2)</option>
                <option value="YR2">BHMS 2nd Professional Year (Sem 3 &amp; 4)</option>
                <option value="YR3">BHMS 3rd Professional Year (Sem 5 &amp; 6)</option>
                <option value="YR4">BHMS 4th Professional Year (Sem 7 &amp; 8)</option>
                <option value="INT">BHMS Compulsory Rotational Internship</option>
                <option value="MDR">MD (Hom.) Residency Specialization</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-purple-400 block">
                3. Select Core Examination Subject:
              </label>
              <select
                value={testSubject}
                onChange={(e) => setTestSubject(e.target.value)}
                className="w-full bg-[#111317] border border-slate-700 rounded-xl px-3 py-2 text-xs font-black text-white outline-none"
              >
                <option value="ORGANON">Organon of Medicine &amp; Philosophy (§1–294)</option>
                <option value="MATERIA_MEDICA">Homoeopathic Materia Medica &amp; Proving Profiles</option>
                <option value="REPERTORY">Repertory Architecture &amp; Specificity Math</option>
                <option value="MEDICINE">Practice of Medicine &amp; Burnett Organopathy</option>
              </select>
            </div>
          </div>

          {/* ACTIVE PRACTICE TEST QUESTIONS */}
          <div className="space-y-6">
            {[
              {
                id: 'pt-1',
                q: 'According to Organon §153, which symptoms must receive highest priority during case repertorization?',
                opts: [
                  'Common physical signs present in thousands of remedies',
                  'Striking, singular, uncommon and peculiar (characteristic) symptoms',
                  'The patient’s superficial demographic details',
                  'Generic blood pressure numbers without individual modalities',
                ],
                correct: 1,
                citation: 'Organon of Medicine §153: Characteristic peculiar symptoms carry highest therapeutic weight.',
              },
              {
                id: 'pt-2',
                q: 'Why does MateriaGrid apply Asymmetrical TF-IDF Specificity Scaling rather than simple rubric counting?',
                opts: [
                  'To ensure broad polychrests like Sulphur hit #1 in every case',
                  'To prevent broad polychrests from overwhelmingly dominating rare, targeted keynote remedies',
                  'To slow down database calculations',
                  'To ignore physical thermal baseline constants',
                ],
                correct: 1,
                citation: 'Inverse Rubric Density elevates rare keynote matches over generic polychrests.',
              },
              {
                id: 'pt-3',
                q: 'Under Dr. J.C. Burnett’s Tissue Drainage override, what should be done when severe structural liver cirrhosis is present?',
                opts: [
                  'Immediately prescribe Sulphur 10M single dry dose',
                  'Start low-potency organ-affine drainage remedies (Chelidonium 1X-6X) before high potencies >30C',
                  'Do not give any homeopathic support',
                  'Give dry granules every 15 minutes',
                ],
                correct: 1,
                citation: 'Burnett Organopathy Rule: Clear pathological tissues with low-potency drainage before high potencies.',
              },
            ].map((item, idx) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-[#05070A] border border-slate-800 space-y-3"
              >
                <span className="text-xs font-black text-emerald-400">
                  QUESTION {idx + 1} • [{testDegree} - {testYear} - {testSubject}]
                </span>
                <p className="text-sm font-black text-white">{item.q}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {item.opts.map((opt, oIdx) => {
                    const isSel = testAnswers[item.id] === oIdx;
                    const isRight = item.correct === oIdx;

                    let cls = 'bg-[#111317] border-slate-800 text-gray-300 hover:border-slate-700';
                    if (isSel && !testSubmitted) {
                      cls = 'bg-emerald-600/20 border-emerald-500 text-emerald-300 font-bold';
                    } else if (testSubmitted) {
                      if (isRight) cls = 'bg-emerald-600/20 border-emerald-500 text-emerald-300 font-bold';
                      else if (isSel && !isRight) cls = 'bg-red-600/20 border-red-500 text-red-300 font-bold';
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => setTestAnswers((prev) => ({ ...prev, [item.id]: oIdx }))}
                        className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${cls}`}
                      >
                        <span className="font-black mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {testSubmitted && (
                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300">
                    💡 Citation: {item.citation}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-slate-800 pt-4">
            <button
              onClick={() => {
                setTestAnswers({});
                setTestSubmitted(false);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-gray-300 font-black text-xs hover:text-white cursor-pointer"
            >
              Reset Answers
            </button>

            <button
              onClick={() => {
                let sc = 0;
                if (testAnswers['pt-1'] === 1) sc += 34;
                if (testAnswers['pt-2'] === 1) sc += 33;
                if (testAnswers['pt-3'] === 1) sc += 33;
                setTestScore(sc);
                setTestSubmitted(true);
              }}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md cursor-pointer"
            >
              Submit Practice Test &amp; Generate NCH Scorecard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BhmsClinicalAcademyView;

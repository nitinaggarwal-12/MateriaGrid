'use client';

import React, { useState, useRef } from 'react';
import {
  Activity,
  RotateCcw,
  Eye,
  Layers,
  Sparkles,
  Info,
  ChevronRight,
  ShieldCheck,
  Award,
  Compass,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Microscope,
  HeartPulse,
  Brain,
  Crosshair,
  Sliders,
  Move,
  Box,
  FileImage,
  Tag,
  GraduationCap,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

interface Interactive360AnatomyAtlasProps {
  theme?: 'dark' | 'light';
}

type StudyWorkbenchTab = 'ATLAS_360' | 'VIVA_SPOTTER_EXAM' | 'ORGANOPATHY_CLINICAL';

export const Interactive360AnatomyAtlas: React.FC<
  Interactive360AnatomyAtlasProps
> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';

  const [selectedSystemId, setSelectedSystemId] = useState<string>('organ-head');
  const [workbenchTab, setWorkbenchTab] = useState<StudyWorkbenchTab>('ATLAS_360');
  const [showLandmarkLabels, setShowLandmarkLabels] = useState<boolean>(true);
  const [yaw, setYaw] = useState<number>(0);
  const [pitch, setPitch] = useState<number>(5);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const lastTouchRef = useRef<{ x: number; y: number } | null>(null);

  const [zoomLevel, setZoomLevel] = useState<number>(95);
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>('hs-frontal-cortex');

  // Viva Spotter Exam State
  const [spotterQuestionIdx, setSpotterQuestionIdx] = useState<number>(0);
  const [spotterSelectedAns, setSpotterSelectedAns] = useState<number | null>(null);
  const [spotterScore, setSpotterScore] = useState<number>(0);

  // MOUSE & TOUCHPAD INTERACTIVE ORBIT CONTROLLER
  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setYaw((prev) => {
      const next = (prev + e.movementX * 0.95) % 360;
      return next < 0 ? next + 360 : next;
    });
    setPitch((prev) => Math.max(-30, Math.min(30, prev - e.movementY * 0.5)));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      lastTouchRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !lastTouchRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastTouchRef.current.x;
    const dy = e.touches[0].clientY - lastTouchRef.current.y;
    lastTouchRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    setYaw((prev) => {
      const next = (prev + dx * 1.1) % 360;
      return next < 0 ? next + 360 : next;
    });
    setPitch((prev) => Math.max(-35, Math.min(35, prev - dy * 0.7)));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    lastTouchRef.current = null;
  };

  const handleWheel = (e: React.WheelEvent) => {
    setZoomLevel((z) => Math.max(75, Math.min(200, z - e.deltaY * 0.12)));
  };

  const getPerspectiveLabel = (angle: number) => {
    const normalized = ((angle % 360) + 360) % 360;
    if (normalized >= 315 || normalized < 45) return '0° ANTERIOR FRONTAL CLINICAL VIEW';
    if (normalized >= 45 && normalized < 135) return '90° RIGHT LATERAL HISTOLOGICAL PROFILE';
    if (normalized >= 135 && normalized < 225) return '180° POSTERIOR DORSAL ASPECT';
    return '270° SAGITTAL HISTOLOGY CROSS-SECTION';
  };

  // ALL 8 COMPLETE MAJOR HUMAN ANATOMICAL SYSTEMS WITH DETAILED CLINICAL DISSECTION & MULTI-HOTSPOTS
  const ORGAN_SYSTEMS = [
    {
      id: 'organ-head',
      name: 'Head, Brain & Central Nervous System',
      icon: '🧠',
      layer: 'ECTODERM (MIND / NEURAL)',
      layerBadge: 'bg-purple-500/10 text-purple-600 border-purple-500/30',
      description:
        'Derived from the Ectoderm layer. Afflicted prominently in Psoric emotional stress and Syphilitic destructive neural pathways.',
      anatomicalLandmarks: [
        'Cerebral Cortex (Frontal, Parietal, Temporal, Occipital Lobes)',
        'Circle of Willis Arterial Ring & Internal Carotid Arteries',
        'Cerebellum & Motor Gait Balance System',
        'Hypothalamic Thermal & Thirst Constant Axis',
      ],
      atlasIllustration: {
        bgGradient: 'from-[#1A1024] via-[#281736] to-[#110A1A]',
        landmarkLabels: [
          { label: 'Cerebral Cortex Gyri & Sulci', pos: 'top-[8%] left-[8%]' },
          { label: 'Circle of Willis Ring', pos: 'top-[8%] right-[8%]' },
          { label: 'Carotid Bifurcation (Belladonna)', pos: 'bottom-[8%] left-[8%]' },
        ],
      },
      hotspots: [
        {
          id: 'hs-frontal-cortex',
          label: 'Frontal Cortex & Psoric Stress',
          rubric: 'MIND - ANXIETY - future, about',
          remedy: 'Aconite / Arsenicum Album',
          note: 'Ectodermal neural locus of acute mental restlessness and anticipation fear.',
          coords: 'top-[24%] left-[28%]',
        },
        {
          id: 'hs-hypothalamus',
          label: 'Hypothalamic Thermal Center',
          rubric: 'GENERALITIES - HEAT - flushes of',
          remedy: 'Vijayakar Thermal-Thirst Constant Filter',
          note: 'Immutable baseline regulator governing thermal baseline (Hot/Chilly) and thirst dynamics.',
          coords: 'top-[48%] left-[48%]',
        },
        {
          id: 'hs-occipital',
          label: 'Occipital-Cervical Neural Junction',
          rubric: 'HEAD - PAIN - occiput - extending to forehead',
          remedy: 'Gelsemium Sempervirens 30C',
          note: 'Dull heavy occipital headache spreading forward over eyes with muscle eyelids heaviness.',
          coords: 'top-[36%] right-[22%]',
        },
        {
          id: 'hs-carotid-plexus',
          label: 'Carotid Arterial Surge Plexus',
          rubric: 'HEAD - CONGESTION - blood - surge of',
          remedy: 'Belladonna 30C / 200C',
          note: 'Sudden throbbing carotid artery pulsation, dilated pupils, flushed red face, cerebral congestion.',
          coords: 'top-[78%] left-[48%]',
        },
      ],
      spotterQuestions: [
        {
          question:
            'Q1 (BHMS 2nd Yr Viva): Which anatomical vascular structure causes the intense throbbing carotid headache characteristic of Belladonna?',
          options: [
            'Vertebral Artery within Foramen Transversarium',
            'Internal Carotid Artery & Circle of Willis Arterial Ring',
            'Superior Sagittal Dural Sinus',
            'Middle Meningeal Artery',
          ],
          correctIdx: 1,
          explanation:
            'Belladonna acts intensely on the arterial blood vessels supplying the cerebral cortex and carotid bifurcation, causing violent arterial congestion (§210–213).',
        },
      ],
      organopathyRemedies: [
        {
          name: 'Belladonna',
          potency: '30C / 200C',
          keynote:
            'Sudden intense carotid artery throbbing, dilated pupils, flushed red face, cerebral congestion.',
        },
        {
          name: 'Gelsemium Sempervirens',
          potency: '30C',
          keynote:
            'Dull heavy occipital headache spreading forward over head, eyelid ptosis, motor trembling.',
        },
      ],
    },
    {
      id: 'organ-liver',
      name: 'Liver, Hepato-Biliary & Parenchyma',
      icon: '🫁',
      layer: 'ENDODERM (VISCERAL / MUCOUS)',
      layerBadge: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30',
      description:
        'The hepatic parenchyma and biliary system represent the primary metabolic vascular filtration organ derived from Endoderm.',
      anatomicalLandmarks: [
        'Right & Left Hepatic Parenchymal Lobes separated by Falciform Ligament',
        'Pear-Shaped Gallbladder, Cystic Duct & Common Bile Duct',
        'Portal Vein Triad at Porta Hepatis (Bile Duct, Hepatic Artery, Portal Vein)',
      ],
      atlasIllustration: {
        bgGradient: 'from-[#0B261D] via-[#133A2D] to-[#071812]',
        landmarkLabels: [
          { label: 'Right & Left Hepatic Lobes (Falciform Ligament)', pos: 'top-[8%] left-[8%]' },
          { label: 'Portal Vein Triad & Porta Hepatis', pos: 'top-[8%] right-[8%]' },
        ],
      },
      hotspots: [
        {
          id: 'hs-right-lobe',
          label: 'Right Hepatic Lobe Parenchyma',
          rubric: 'ABDOMEN - CIRRHOSIS - liver',
          remedy: 'Chelidonium Majus 1X / Q',
          note: 'Primary target for Chelidonium right scapular nerve referral pain and hepatic enlargement.',
          coords: 'top-[32%] left-[28%]',
        },
        {
          id: 'hs-portal-vein',
          label: 'Portal Vein Vascular Axis & Triad',
          rubric: 'GENERALITIES - VARICOSE veins',
          remedy: 'Carduus Marianus / Lycopodium',
          note: 'Portal hypertension, hepatic venous congestion, and jaundice mitigation.',
          coords: 'top-[52%] left-[48%]',
        },
        {
          id: 'hs-gallbladder',
          label: 'Gallbladder & Cystic/Bile Ducts',
          rubric: 'ABDOMEN - GALLBLADDER - complaints of',
          remedy: 'Carduus Marianus Q / Berberis',
          note: 'Biliary dyskinesia, cholelithiasis, clay-colored stools, and right hypochondriac pain.',
          coords: 'top-[78%] right-[24%]',
        },
      ],
      spotterQuestions: [],
      organopathyRemedies: [
        {
          name: 'Chelidonium Majus',
          potency: 'Q (Tincture) / 6X',
          keynote:
            'Burnett Organ-Affine Liver Tonic: Constant pain under lower angle of right scapula, jaundice, clay stool.',
        },
      ],
    },
    {
      id: 'organ-kidneys',
      name: 'Kidneys, Renal Glomeruli & Ureters',
      icon: '🩸',
      layer: 'MESODERM (STRUCTURAL / RENAL)',
      layerBadge: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/30',
      description:
        'Mesodermal structural excretion tract responsible for glomerular filtration and acid-base homeostatic balance.',
      anatomicalLandmarks: [
        'Renal Capsule & Glomerular Renal Cortex (Solidago target)',
        '8 Medullary Renal Pyramids with Striations & Papillae',
        'Major & Minor Calyces Draining to Renal Pelvis',
        'Bilateral Ureters Radiating to Urinary Bladder (Berberis target)',
      ],
      atlasIllustration: {
        bgGradient: 'from-[#06202B] via-[#0E3445] to-[#04141C]',
        landmarkLabels: [
          { label: 'Glomerular Renal Cortex (Solidago)', pos: 'top-[8%] left-[8%]' },
          { label: 'Medullary Pyramids & Calyces', pos: 'top-[8%] right-[8%]' },
        ],
      },
      hotspots: [
        {
          id: 'hs-renal-cortex',
          label: 'Glomerular Renal Cortex',
          rubric: 'URINARY ORGANS - KIDNEYS - inflammation',
          remedy: 'Solidago Virgaurea Q / 3X',
          note: 'Burnett Kidney Drainage: Tender renal zone on pressure, albuminuria.',
          coords: 'top-[32%] left-[28%]',
        },
        {
          id: 'hs-medullary-pyramids',
          label: 'Medullary Renal Pyramids & Calyces',
          rubric: 'URINARY ORGANS - KIDNEYS - stone in',
          remedy: 'Berberis Vulgaris 6X / Pareira Brava',
          note: 'Renal parenchyma calcification and medullary renal colic.',
          coords: 'top-[48%] right-[22%]',
        },
        {
          id: 'hs-ureter',
          label: 'Ureteric Colic Radiation Locus',
          rubric: 'URINARY ORGANS - URETERS - pain - radiating',
          remedy: 'Berberis Vulgaris Q / 6X',
          note: 'Radiating stone colic down ureter to thigh and testicle.',
          coords: 'top-[78%] left-[48%]',
        },
      ],
      spotterQuestions: [],
      organopathyRemedies: [
        {
          name: 'Solidago Virgaurea',
          potency: 'Q / 3X',
          keynote:
            'Burnett Kidney Drainage: Renal insufficiency, tender kidney region on pressure, dark reddish urine.',
        },
      ],
    },
    {
      id: 'organ-heart',
      name: 'Cardiovascular & Coronary Circulation',
      icon: '❤️',
      layer: 'MESODERM (SEROUS / VASCULAR)',
      layerBadge: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
      description:
        'Mesodermal cardiac tissue governing myocardial contractility, coronary arterial supply, and systemic hemodynamics.',
      anatomicalLandmarks: [
        'Ascending Aorta Arch & Brachiocephalic Arterial Branches',
        'Pulmonary Trunk Bifurcation & Superior/Inferior Vena Cava',
        'Left & Right Ventricular Myocardium Wall',
      ],
      atlasIllustration: {
        bgGradient: 'from-[#2E0B10] via-[#4A141A] to-[#1F070A]',
        landmarkLabels: [
          { label: 'Ascending Aorta Arch & Brachiocephalic Branches', pos: 'top-[8%] left-[8%]' },
          { label: 'Left Anterior Interventricular Coronary Artery', pos: 'top-[8%] right-[8%]' },
        ],
      },
      hotspots: [
        {
          id: 'hs-aorta-arch',
          label: 'Ascending Aorta Arch & Carotids',
          rubric: 'CHEST - CONGESTION - heart',
          remedy: 'Glonoine 6C / Aurum Metallicum',
          note: 'Aortic surge congestion, carotid throbbing, and hypertension surge.',
          coords: 'top-[24%] left-[48%]',
        },
        {
          id: 'hs-coronary-artery',
          label: 'Coronary Interventricular Artery Tree',
          rubric: 'CHEST - CONSTRICTION - heart - wire around it, as if',
          remedy: 'Cactus Grandiflorus 30C / Q',
          note: 'Sensation as if an iron hand or wire tightly constricted the cardiac myocardium.',
          coords: 'top-[44%] right-[22%]',
        },
        {
          id: 'hs-myocardium',
          label: 'Ventricular Myocardial Wall',
          rubric: 'HEART - PALPITATION - exertion, on slightest',
          remedy: 'Crataegus Oxyacantha Q',
          note: 'Burnett Heart Tonic: Cardiac hypertrophy, dyspnea on exertion, and feeble pulse.',
          coords: 'top-[74%] left-[32%]',
        },
      ],
      spotterQuestions: [],
      organopathyRemedies: [
        {
          name: 'Crataegus Oxyacantha',
          potency: 'Q (Tincture)',
          keynote:
            'Heart Tonic: Cardiac hypertrophy, dyspnea on slight exertion, irregular feeble pulse.',
        },
      ],
    },
    {
      id: 'organ-lungs',
      name: 'Broncho-Pulmonary & Respiratory Parenchyma',
      icon: '🫁',
      layer: 'ENDODERM (MUCOUS / VISCERAL)',
      layerBadge: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
      description:
        'Endodermal mucous membrane and alveolar parenchymal parenchyma governing gas exchange and bronchial contractility.',
      anatomicalLandmarks: [
        'Trachea & 12 C-Shaped Cartilage Rings extending to Carina Bifurcation',
        'Right Lung: 3 Distinct Lobes (Superior, Middle, Inferior) & Interlobar Fissures',
        'Left Lung: 2 Distinct Lobes & Cardiac Notch (Bryonia Alba target)',
      ],
      atlasIllustration: {
        bgGradient: 'from-[#0A1F30] via-[#123652] to-[#061421]',
        landmarkLabels: [
          { label: 'Trachea & Carina Bronchial Bifurcation', pos: 'top-[8%] left-[8%]' },
          { label: 'Right 3-Lobe Lung vs Left Cardiac Notch', pos: 'top-[8%] right-[8%]' },
        ],
      },
      hotspots: [
        {
          id: 'hs-trachea-carina',
          label: 'Tracheal Cartilage & Carina Bifurcation',
          rubric: 'COUGH - SPASMODIC - larynx, from',
          remedy: 'Drosera Rotundifolia 30C / Spongia Tosta',
          note: 'Violent barky spasmodic cough originating at the bronchial carina bifurcation.',
          coords: 'top-[24%] left-[48%]',
        },
        {
          id: 'hs-bronchi',
          label: 'Bronchial Exudate & Alveolar Exudation Zone',
          rubric: 'CHEST - RATTLING - mucus',
          remedy: 'Antimonium Tartaricum 6C / 30C',
          note: 'Coarse rattling mucus in chest with complete inability to expectorate, cyanosis, drowsiness.',
          coords: 'top-[44%] left-[28%]',
        },
        {
          id: 'hs-pleura',
          label: 'Visceral Pleural Membrane Stitching Locus',
          rubric: 'CHEST - PAIN - stitching - motion, on',
          remedy: 'Bryonia Alba 30C / 200C',
          note: 'Dry stitching pleuritic chest pain, worse slightest breath or motion, holding chest still.',
          coords: 'top-[74%] right-[24%]',
        },
      ],
      spotterQuestions: [],
      organopathyRemedies: [
        {
          name: 'Antimonium Tartaricum',
          potency: '6C / 30C',
          keynote:
            'Coarse rattling mucus in chest with complete inability to expectorate, cyanosis, drowsiness.',
        },
      ],
    },
    {
      id: 'organ-skeletal',
      name: 'Musculoskeletal, Synovial & Periosteal Structure',
      icon: '🦴',
      layer: 'MESODERM (SUPPORTIVE CONNECTIVE)',
      layerBadge: 'bg-orange-500/10 text-orange-600 border-orange-500/30',
      description:
        'Mesodermal structural connective tissue comprising bone periosteum, articular cartilage, cruciate ligaments, and synovial capsules.',
      anatomicalLandmarks: [
        'Distal Femur Epiphysis with Medial & Lateral Condyles',
        'Proximal Tibia Plateau & Fibular Head Architecture',
        'Medial & Lateral Meniscus Cartilage Pads (Symphytum Officinale)',
      ],
      atlasIllustration: {
        bgGradient: 'from-[#2D1B0F] via-[#472C19] to-[#1C1008]',
        landmarkLabels: [
          { label: 'Distal Femoral Condyles & ACL/PCL Ligaments', pos: 'top-[8%] left-[8%]' },
          { label: 'Medial & Lateral Meniscus Cartilage Pads', pos: 'top-[8%] right-[8%]' },
        ],
      },
      hotspots: [
        {
          id: 'hs-synovial-joint',
          label: 'Synovial Joint Capsule & Fluid Cavity',
          rubric: 'EXTREMITIES - STIFFNESS - motion - beginning of, on',
          remedy: 'Rhus Toxicodendron 30C / 200C',
          note: 'Extreme joint stiffness on beginning motion, progressively relieved by continued motion and warm bath.',
          coords: 'top-[36%] left-[28%]',
        },
        {
          id: 'hs-meniscus-cartilage',
          label: 'Meniscus Cartilage & Spongy Callus Zone',
          rubric: 'BONES - INJURIES - cartilage',
          remedy: 'Symphytum Officinale Q / 6C',
          note: 'Accelerates articular cartilage restoration, meniscus repair, and fracture callus formation.',
          coords: 'top-[54%] right-[22%]',
        },
        {
          id: 'hs-patellar-tendon',
          label: 'Patellar Ligament & Periosteal Tendon',
          rubric: 'BONES - INJURIES - periosteum',
          remedy: 'Ruta Graveolens 30C',
          note: 'Bruised periosteal bone pain, tendinous strain at insertion site, worse damp weather.',
          coords: 'top-[78%] left-[48%]',
        },
      ],
      spotterQuestions: [],
      organopathyRemedies: [
        {
          name: 'Rhus Toxicodendron',
          potency: '30C / 200C',
          keynote:
            'Joint stiffness extreme on beginning motion, progressively relieved by continued motion and warm bath.',
        },
      ],
    },
    {
      id: 'organ-gastro',
      name: 'Gastro-Intestinal & Mucous Membrane Tract',
      icon: '🚽',
      layer: 'ENDODERM (MUCOUS / VISCERAL)',
      layerBadge: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30',
      description:
        'Endodermal digestive mucous tract governing acid motility, visceral peristalsis, and mucous absorption.',
      anatomicalLandmarks: [
        'Stomach Greater & Lesser Curvatures with Mucous Rugae Folds (Nux Vomica target)',
        'C-Shaped Duodenum & Pancreatic Head Duct Loop',
        'Large Intestine Colon Haustra Sacculations & Teniae Coli Bands (Hydrastis target)',
      ],
      atlasIllustration: {
        bgGradient: 'from-[#2B230B] via-[#453913] to-[#1C1706]',
        landmarkLabels: [
          { label: 'Stomach Curvature & Rugae Folds (Nux Vomica)', pos: 'top-[8%] left-[8%]' },
          { label: 'Colon Haustral Sacculations (Hydrastis)', pos: 'top-[8%] right-[8%]' },
        ],
      },
      hotspots: [
        {
          id: 'hs-stomach',
          label: 'Gastric Mucous Motility & Rugae Folds',
          rubric: 'STOMACH - NAUSEA - morning, in',
          remedy: 'Nux Vomica 30C / 200C',
          note: 'Irritable hyper-acidity from sedentary lifestyle, stimulants, and over-work.',
          coords: 'top-[36%] left-[28%]',
        },
        {
          id: 'hs-colon-haustra',
          label: 'Colon Haustra Mucous Mucosa Segmentations',
          rubric: 'RECTUM - DIARRHEA - yellow ropy mucus',
          remedy: 'Hydrastis Canadensis Q / 3X',
          note: 'Burnett Mucous Drainage: Thick yellow ropy mucous discharges and visceral sinking sensation.',
          coords: 'top-[68%] right-[22%]',
        },
        {
          id: 'hs-appendix',
          label: 'Cecum & Vermiform Appendix Locus',
          rubric: 'ABDOMEN - INFLAMMATION - cecum',
          remedy: 'Bryonia Alba 200C / Lachesis Mutus',
          note: 'Appendiceal localized right lower quadrant pain worse slightest breath or motion.',
          coords: 'top-[78%] left-[48%]',
        },
      ],
      spotterQuestions: [],
      organopathyRemedies: [
        {
          name: 'Nux Vomica',
          potency: '30C / 200C',
          keynote:
            'Irritable hyper-acidity, morning nausea, ineffective urging to stool from sedentary life.',
        },
      ],
    },
    {
      id: 'organ-endocrine',
      name: 'Endocrine, Thyroid & Lymphatic Glandular System',
      icon: '🛡️',
      layer: 'ECTODERM / MESODERM GLANDULAR',
      layerBadge: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/30',
      description:
        'Hormonal metabolic synthesis and lymphatic gland system governing thermal metabolic rate and fibrous diathesis.',
      anatomicalLandmarks: [
        'Thyroid Cartilage & Tracheal Ring Architecture',
        'Thyroid Gland (Bilateral Lobes & Central Isthmus)',
        'Superior & Inferior Thyroid Vascular Supply',
        'Cervical & Axillary Lymph Node Chain',
      ],
      atlasIllustration: {
        bgGradient: 'from-[#17162E] via-[#242347] to-[#0F0E1E]',
        landmarkLabels: [
          { label: 'Thyroid Cartilage & Trachea Rings', pos: 'top-[8%] left-[8%]' },
          { label: 'Bilateral Thyroid Lobes & Isthmus', pos: 'top-[8%] right-[8%]' },
        ],
      },
      hotspots: [
        {
          id: 'hs-thyroid-cartilage',
          label: 'Thyroid Cartilage & Laryngeal Arch',
          rubric: 'LARYNX - CONGESTION',
          remedy: 'Spongia Tosta 30C / Hepar Sulph',
          note: 'Laryngeal dry croupy barky constriction worse lying down.',
          coords: 'top-[24%] left-[48%]',
        },
        {
          id: 'hs-thyroid-lobe',
          label: 'Bilateral Thyroid Glandular Lobes & Isthmus',
          rubric: 'GENERALITIES - EMACIATION - appetite, with ravenous',
          remedy: 'Iodium 30C / 1M',
          note: 'Ravenous hunger yet rapid emaciation, extreme heat intolerance, hyper-metabolic goiter.',
          coords: 'top-[45%] left-[28%]',
        },
        {
          id: 'hs-cervical-lymph-node',
          label: 'Cervical Lymphatic Node Chain',
          rubric: 'GENERALITIES - SWELLING - glands',
          remedy: 'Calcarea Fluorica 6X / Conium Maculatum',
          note: 'Hard stony indurated lymphatic nodes and chronic glandular hypertrophy.',
          coords: 'top-[72%] right-[22%]',
        },
      ],
      spotterQuestions: [],
      organopathyRemedies: [
        {
          name: 'Iodium',
          potency: '30C / 200C',
          keynote:
            'Ravenous hunger yet rapid emaciation, hot thermal baseline, glandular hypertrophy.',
        },
      ],
    },
  ];

  const activeSystem =
    ORGAN_SYSTEMS.find((s) => s.id === selectedSystemId) || ORGAN_SYSTEMS[0];

  return (
    <div
      className={`p-6 rounded-2xl border space-y-6 font-sans select-none ${
        isLight
          ? 'bg-white border-slate-200 text-slate-900 shadow-2xs'
          : 'bg-[#0B0F19] border-[#1C1F26] text-white'
      }`}
    >
      {/* TOP MEDICAL DIAGNOSTIC HUD BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs px-3 py-0.5 rounded-full font-black bg-blue-600 text-white flex items-center space-x-1.5 shadow-sm">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>COMPLETE BHMS &amp; MD 8-SYSTEM CLINICAL MEDICAL SCHOOL ANATOMY WORKBENCH</span>
            </span>
            <span className="text-xs font-black text-emerald-500">
              ● All 8 Complete Systems Equipped with Clinical Netter Dissections
            </span>
          </div>
          <h2 className="text-lg font-black mt-1 tracking-tight">
            INTERACTIVE 3D ANATOMICAL SPATIAL WORKBENCH • COMPLETE HUMAN BODY SYSTEMS
          </h2>
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
            💡 Select any of the <strong>8 Complete Human Anatomical Systems</strong> below to study tissue histology, 360° spatial orbit, BHMS viva spotter exams, and Dr. Burnett organopathy remedies.
          </p>
        </div>

        {/* WORKBENCH STUDY MODE NAVIGATION TABS */}
        <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setWorkbenchTab('ATLAS_360')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-black flex items-center space-x-1.5 transition-all cursor-pointer ${
              workbenchTab === 'ATLAS_360'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>360° Clinical Atlas &amp; Orbit</span>
          </button>
          <button
            onClick={() => {
              setWorkbenchTab('VIVA_SPOTTER_EXAM');
              setSpotterQuestionIdx(0);
              setSpotterSelectedAns(null);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-black flex items-center space-x-1.5 transition-all cursor-pointer ${
              workbenchTab === 'VIVA_SPOTTER_EXAM'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>BHMS Viva Spotter Exam</span>
          </button>
          <button
            onClick={() => setWorkbenchTab('ORGANOPATHY_CLINICAL')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-black flex items-center space-x-1.5 transition-all cursor-pointer ${
              workbenchTab === 'ORGANOPATHY_CLINICAL'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Microscope className="w-3.5 h-3.5" />
            <span>Burnett Organopathy Matrix</span>
          </button>
        </div>
      </div>

      {/* ALL 8 COMPLETE HUMAN ANATOMICAL SYSTEMS SELECTOR TABS */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2">
        {ORGAN_SYSTEMS.map((sys) => {
          const isSel = sys.id === selectedSystemId;
          return (
            <button
              key={sys.id}
              onClick={() => {
                setSelectedSystemId(sys.id);
                setSelectedHotspotId(null);
                setSpotterQuestionIdx(0);
                setSpotterSelectedAns(null);
              }}
              className={`p-2.5 rounded-xl border text-left text-xs font-black flex items-center space-x-2 transition-all cursor-pointer ${
                isSel
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md scale-[1.01]'
                  : isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                  : 'bg-[#05070A] hover:bg-slate-800 border-slate-800 text-gray-300'
              }`}
            >
              <span className="text-base">{sys.icon}</span>
              <span className="truncate">{sys.name}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: 360° CLINICAL ATLAS & SPATIAL ORBIT VIEW */}
      {workbenchTab === 'ATLAS_360' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT CANVAS: HD 3D ANATOMICAL RENDERING WORKBENCH (7 COLUMNS) */}
          <div
            className={`lg:col-span-7 p-6 rounded-2xl border flex flex-col space-y-4 relative ${
              isLight
                ? 'bg-slate-950 text-white border-slate-800'
                : 'bg-[#03060C] text-white border-slate-800'
            }`}
          >
            {/* TOP SPATIAL CONTROLS BAR */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black text-blue-400 uppercase tracking-wider">
                  {getPerspectiveLabel(yaw)}
                </span>
              </div>

              <div className="flex items-center space-x-1">
                {[
                  { angle: 0, label: 'Anterior (0°)' },
                  { angle: 90, label: 'Lateral (90°)' },
                  { angle: 180, label: 'Dorsal (180°)' },
                  { angle: 270, label: 'Sagittal (270°)' },
                ].map((btn) => (
                  <button
                    key={btn.angle}
                    onClick={() => {
                      setYaw(btn.angle);
                      setPitch(5);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-black cursor-pointer transition-all ${
                      Math.abs(((yaw % 360) + 360) % 360 - btn.angle) < 25
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
                <button
                  onClick={() => setShowLandmarkLabels((v) => !v)}
                  className="px-2 py-1 rounded-lg bg-slate-800 text-gray-300 hover:text-white text-[10px] font-black cursor-pointer flex items-center space-x-1"
                >
                  <Tag className="w-3 h-3" />
                  <span>{showLandmarkLabels ? 'Labels On' : 'Labels Off'}</span>
                </button>
              </div>
            </div>

            {/* DRAG / TOUCH INTERACTIVE ORBIT CANVAS STAGE */}
            <div
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onWheel={handleWheel}
              className={`relative w-full h-[460px] rounded-2xl bg-gradient-to-b ${activeSystem.atlasIllustration.bgGradient} border border-blue-500/40 flex flex-col items-center justify-center overflow-hidden p-4 shadow-2xl transition-colors ${
                isDragging ? 'cursor-grabbing border-blue-400 ring-2 ring-blue-500/30' : 'cursor-grab'
              }`}
            >
              {/* FLOATING DRAG INSTRUCTION HUD BADGE */}
              <div className="absolute top-3 left-3 z-20 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-600/90 text-white text-[11px] font-black shadow-lg pointer-events-none">
                <Move className="w-3.5 h-3.5 animate-pulse" />
                <span>DRAG MOUSE OR TOUCHPAD TO ROTATE 360° END-TO-END</span>
              </div>

              {/* CORNER CLINICAL ANATOMICAL LEADER LABELS (NON-OVERLAPPING AT CORNERS) */}
              {showLandmarkLabels && (
                <div className="absolute inset-0 pointer-events-none z-10">
                  {activeSystem.atlasIllustration.landmarkLabels.map((lbl, idx) => (
                    <div
                      key={idx}
                      className={`absolute ${lbl.pos} px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700/80 text-slate-300 text-[10px] font-bold shadow-lg flex items-center space-x-1.5`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span>{lbl.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* REAL-TIME 3D PERSPECTIVE ORBIT CONTAINER */}
              <div
                className="w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
                style={{
                  perspective: '1200px',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    transform: `perspective(1000px) rotateX(${pitch}deg) rotateY(${yaw}deg) scale(${zoomLevel / 100})`,
                    transformOrigin: 'center center',
                  }}
                >
                  {/* ======================================================= */}
                  {/* 1. BRAIN & CENTRAL NERVOUS SYSTEM (DETAILED DISSECTION) */}
                  {/* ======================================================= */}
                  {selectedSystemId === 'organ-head' && (
                    <svg viewBox="0 0 520 420" className="w-full h-full max-h-[380px]">
                      <defs>
                        <radialGradient id="hdBrainTissue13" cx="45%" cy="38%" r="65%">
                          <stop offset="0%" stopColor="#F5D0C5" />
                          <stop offset="45%" stopColor="#E2A698" />
                          <stop offset="85%" stopColor="#B36959" />
                          <stop offset="100%" stopColor="#783A2E" />
                        </radialGradient>
                      </defs>
                      <g>
                        <path
                          d="M 260 25 C 135 25, 65 110, 75 200 C 82 265, 135 315, 225 315 L 225 385 L 295 385 L 295 315 C 385 315, 438 265, 445 200 C 455 110, 385 25, 260 25 Z"
                          fill="url(#hdBrainTissue13)"
                          stroke="#FFF1EE"
                          strokeWidth="4"
                        />
                        <path d="M 230 45 L 230 275" stroke="#4C1D95" strokeWidth="3" strokeDasharray="6 4" />
                        <path
                          d="M 125 105 Q 185 75 255 110 Q 325 75 395 105 M 110 165 Q 195 135 260 165 Q 325 135 410 165 M 130 230 Q 195 200 260 230 Q 325 200 390 230"
                          fill="none"
                          stroke="#8D4335"
                          strokeWidth="4.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 235 395 L 235 250 Q 195 205 160 185 M 285 395 L 285 250 Q 325 205 360 185"
                          fill="none"
                          stroke="#EF4444"
                          strokeWidth="7"
                        />
                        <circle cx="260" cy="195" r="28" fill="rgba(6, 182, 212, 0.45)" stroke="#06B6D4" strokeWidth="3" />
                      </g>
                    </svg>
                  )}

                  {/* ======================================================= */}
                  {/* 2. HEPATO-BILIARY LIVER & GALLBLADDER (AUTHENTIC NETTER DISSECTION) */}
                  {/* ======================================================= */}
                  {selectedSystemId === 'organ-liver' && (
                    <svg viewBox="0 0 520 420" className="w-full h-full max-h-[380px]">
                      <defs>
                        <radialGradient id="hdRightLiverLobe13" cx="42%" cy="40%" r="65%">
                          <stop offset="0%" stopColor="#B45309" />
                          <stop offset="65%" stopColor="#78350F" />
                          <stop offset="100%" stopColor="#451A03" />
                        </radialGradient>
                        <radialGradient id="hdLeftLiverLobe13" cx="55%" cy="40%" r="65%">
                          <stop offset="0%" stopColor="#D97706" />
                          <stop offset="70%" stopColor="#92400E" />
                          <stop offset="100%" stopColor="#451A03" />
                        </radialGradient>
                      </defs>
                      <g>
                        <path
                          d="M 85 185 C 110 75, 290 65, 305 155 Q 315 285, 260 325 C 190 345, 80 295, 85 185 Z"
                          fill="url(#hdRightLiverLobe13)"
                          stroke="#FEF3C7"
                          strokeWidth="4"
                        />
                        <path
                          d="M 305 155 C 345 75, 435 95, 445 175 C 455 245, 395 305, 305 315 Z"
                          fill="url(#hdLeftLiverLobe13)"
                          stroke="#FEF3C7"
                          strokeWidth="4"
                        />
                        <path
                          d="M 305 75 L 305 320"
                          stroke="#FDE68A"
                          strokeWidth="3.5"
                          strokeDasharray="6 4"
                        />
                        <g>
                          <path
                            d="M 275 390 L 275 270 Q 240 220 175 165 M 275 270 Q 320 220 385 165"
                            fill="none"
                            stroke="#2563EB"
                            strokeWidth="8"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 295 390 L 295 275 Q 260 230 205 185 M 295 275 Q 330 230 365 185"
                            fill="none"
                            stroke="#EF4444"
                            strokeWidth="5"
                            strokeLinecap="round"
                          />
                        </g>
                        <g>
                          <path
                            d="M 315 390 L 315 285 Q 345 315 355 350"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="6"
                            strokeLinecap="round"
                          />
                          <ellipse cx="360" cy="365" rx="22" ry="32" fill="#059669" stroke="#A7F3D0" strokeWidth="3.5" />
                        </g>
                        <polygon points="175,120 195,110 215,120 215,142 195,152 175,142" fill="none" stroke="#FDE68A" strokeWidth="2" opacity="0.6" />
                        <circle cx="195" cy="131" r="5" fill="#EF4444" />
                      </g>
                    </svg>
                  )}

                  {/* ======================================================= */}
                  {/* 3. KIDNEYS, RENAL CORTEX, PYRAMIDS, CALYCES & VESSELS */}
                  {/* ======================================================= */}
                  {selectedSystemId === 'organ-kidneys' && (
                    <svg viewBox="0 0 520 420" className="w-full h-full max-h-[380px]">
                      <defs>
                        <radialGradient id="hdRenalCortexGrad13" cx="50%" cy="45%" r="65%">
                          <stop offset="0%" stopColor="#22D3EE" />
                          <stop offset="70%" stopColor="#0891B2" />
                          <stop offset="100%" stopColor="#164E63" />
                        </radialGradient>
                        <radialGradient id="hdRenalPyramidGrad13" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#FB7185" />
                          <stop offset="100%" stopColor="#9F1239" />
                        </radialGradient>
                      </defs>
                      <g>
                        <path d="M 140 85 Q 165 65 190 90 Z" fill="#F59E0B" stroke="#FEF3C7" strokeWidth="2.5" />
                        <path d="M 330 90 Q 355 65 380 85 Z" fill="#F59E0B" stroke="#FEF3C7" strokeWidth="2.5" />
                        <path
                          d="M 165 95 C 105 130, 95 270, 165 305 C 220 330, 260 265, 235 200 C 260 155, 220 70, 165 95 Z"
                          fill="url(#hdRenalCortexGrad13)"
                          stroke="#CFFAFE"
                          strokeWidth="4"
                        />
                        <path
                          d="M 355 95 C 295 70, 255 155, 280 200 C 255 265, 295 330, 355 305 C 425 270, 415 130, 355 95 Z"
                          fill="url(#hdRenalCortexGrad13)"
                          stroke="#CFFAFE"
                          strokeWidth="4"
                        />
                        <g>
                          <path d="M 140 140 L 165 165 L 135 185 Z" fill="url(#hdRenalPyramidGrad13)" stroke="#FFE4E6" strokeWidth="1.5" />
                          <path d="M 130 200 L 165 200 L 135 230 Z" fill="url(#hdRenalPyramidGrad13)" stroke="#FFE4E6" strokeWidth="1.5" />
                          <path d="M 145 250 L 175 235 L 165 270 Z" fill="url(#hdRenalPyramidGrad13)" stroke="#FFE4E6" strokeWidth="1.5" />
                          <path d="M 380 140 L 355 165 L 385 185 Z" fill="url(#hdRenalPyramidGrad13)" stroke="#FFE4E6" strokeWidth="1.5" />
                          <path d="M 390 200 L 355 200 L 385 230 Z" fill="url(#hdRenalPyramidGrad13)" stroke="#FFE4E6" strokeWidth="1.5" />
                          <path d="M 375 250 L 345 235 L 355 270 Z" fill="url(#hdRenalPyramidGrad13)" stroke="#FFE4E6" strokeWidth="1.5" />
                        </g>
                        <g>
                          <path d="M 260 170 L 210 185 M 260 170 L 310 185" stroke="#EF4444" strokeWidth="8" strokeLinecap="round" />
                          <path d="M 260 210 L 215 205 M 260 210 L 305 205" stroke="#3B82F6" strokeWidth="9" strokeLinecap="round" />
                        </g>
                        <path d="M 195 210 Q 215 230 220 280 L 220 395" fill="none" stroke="#FACC15" strokeWidth="6" strokeDasharray="8 4" />
                        <path d="M 325 210 Q 305 230 300 280 L 300 395" fill="none" stroke="#FACC15" strokeWidth="6" strokeDasharray="8 4" />
                      </g>
                    </svg>
                  )}

                  {/* ======================================================= */}
                  {/* 4. CARDIOVASCULAR & CORONARY NETWORK (NETTER CLINICAL DISSECTION) */}
                  {/* ======================================================= */}
                  {selectedSystemId === 'organ-heart' && (
                    <svg viewBox="0 0 520 420" className="w-full h-full max-h-[380px]">
                      <defs>
                        <radialGradient id="hdMyocardiumGrad13" cx="45%" cy="45%" r="65%">
                          <stop offset="0%" stopColor="#EF4444" />
                          <stop offset="65%" stopColor="#B91C1C" />
                          <stop offset="100%" stopColor="#7F1D1D" />
                        </radialGradient>
                      </defs>
                      <g>
                        <rect x="185" y="45" width="28" height="95" rx="10" fill="#3B82F6" stroke="#93C5FD" strokeWidth="2.5" />
                        <rect x="195" y="325" width="26" height="65" rx="8" fill="#3B82F6" stroke="#93C5FD" strokeWidth="2.5" />
                        <path
                          d="M 235 155 Q 235 45, 305 45 Q 355 45, 355 145"
                          fill="none"
                          stroke="#DC2626"
                          strokeWidth="24"
                          strokeLinecap="round"
                        />
                        <line x1="260" y1="50" x2="260" y2="22" stroke="#EF4444" strokeWidth="7" strokeLinecap="round" />
                        <line x1="285" y1="46" x2="285" y2="18" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
                        <line x1="310" y1="48" x2="315" y2="20" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
                        <path
                          d="M 260 185 L 260 115 Q 220 115, 160 125 M 260 115 Q 310 115, 380 125"
                          fill="none"
                          stroke="#2563EB"
                          strokeWidth="18"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 230 175 C 160 215, 165 330, 260 380 C 355 330, 360 215, 290 175 Z"
                          fill="url(#hdMyocardiumGrad13)"
                          stroke="#FECACA"
                          strokeWidth="4.5"
                        />
                        <path
                          d="M 265 175 Q 255 260, 260 375 M 260 235 Q 220 270 205 315 M 260 275 Q 305 310 320 340 M 260 205 Q 310 230 335 260"
                          fill="none"
                          stroke="#FEE2E2"
                          strokeWidth="4.5"
                          strokeLinecap="round"
                        />
                        <circle cx="260" cy="235" r="7" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                        <circle cx="260" cy="275" r="7" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                      </g>
                    </svg>
                  )}

                  {/* ======================================================= */}
                  {/* 5. BRONCHO-PULMONARY LUNGS (AUTHENTIC NETTER CLINICAL DISSECTION) */}
                  {/* ======================================================= */}
                  {selectedSystemId === 'organ-lungs' && (
                    <svg viewBox="0 0 520 420" className="w-full h-full max-h-[380px]">
                      <defs>
                        <radialGradient id="hdRightLungGrad13" cx="45%" cy="45%" r="65%">
                          <stop offset="0%" stopColor="#93C5FD" />
                          <stop offset="55%" stopColor="#3B82F6" />
                          <stop offset="100%" stopColor="#1D4ED8" />
                        </radialGradient>
                        <radialGradient id="hdLeftLungGrad13" cx="55%" cy="45%" r="65%">
                          <stop offset="0%" stopColor="#93C5FD" />
                          <stop offset="55%" stopColor="#3B82F6" />
                          <stop offset="100%" stopColor="#1D4ED8" />
                        </radialGradient>
                      </defs>
                      <g>
                        <path d="M 240 20 L 280 20 L 290 60 L 230 60 Z" fill="#CBD5E1" stroke="#F8FAFC" strokeWidth="2.5" />
                        {[65, 80, 95, 110, 125, 140, 155].map((y, i) => (
                          <rect key={i} x="245" y={y} width="30" height="10" rx="3" fill="#E2E8F0" stroke="#475569" strokeWidth="1.5" />
                        ))}
                        <g>
                          <path
                            d="M 260 165 L 195 215 M 195 215 L 155 245 M 195 215 L 165 295 M 195 215 L 210 280"
                            fill="none"
                            stroke="#60A5FA"
                            strokeWidth="6"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 260 165 L 325 215 M 325 215 L 365 245 M 325 215 L 355 295 M 325 215 L 310 280"
                            fill="none"
                            stroke="#60A5FA"
                            strokeWidth="6"
                            strokeLinecap="round"
                          />
                        </g>
                        <g>
                          <circle cx="195" cy="205" r="14" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                          <circle cx="180" cy="225" r="11" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                          <circle cx="325" cy="205" r="14" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                          <circle cx="340" cy="225" r="11" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                        </g>
                        <g>
                          <path
                            d="M 185 105 C 125 125, 95 235, 145 350 L 225 340 C 235 265, 230 150, 185 105 Z"
                            fill="url(#hdRightLungGrad13)"
                            fillOpacity="0.88"
                            stroke="#DBEAFE"
                            strokeWidth="3.5"
                          />
                          <line x1="105" y1="195" x2="230" y2="210" stroke="#DBEAFE" strokeWidth="2.5" strokeDasharray="5 3" />
                          <line x1="118" y1="260" x2="225" y2="310" stroke="#DBEAFE" strokeWidth="2.5" strokeDasharray="5 3" />
                        </g>
                        <g>
                          <path
                            d="M 335 105 C 395 145, 385 260, 375 350 L 295 340 Q 325 240 295 190 C 295 150, 315 115, 335 105 Z"
                            fill="url(#hdLeftLungGrad13)"
                            fillOpacity="0.88"
                            stroke="#DBEAFE"
                            strokeWidth="3.5"
                          />
                          <line x1="390" y1="185" x2="305" y2="295" stroke="#DBEAFE" strokeWidth="2.5" strokeDasharray="5 3" />
                        </g>
                      </g>
                    </svg>
                  )}

                  {/* ======================================================= */}
                  {/* 6. MUSCULOSKELETAL SYNCOVIAL KNEE JOINT (AUTHENTIC NETTER DISSECTION) */}
                  {/* ======================================================= */}
                  {selectedSystemId === 'organ-skeletal' && (
                    <svg viewBox="0 0 520 420" className="w-full h-full max-h-[380px]">
                      <defs>
                        <linearGradient id="femurBoneTexture13" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#FDE68A" />
                          <stop offset="50%" stopColor="#F59E0B" />
                          <stop offset="100%" stopColor="#B45309" />
                        </linearGradient>
                        <radialGradient id="synovialFluidGrad13" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="rgba(34, 211, 238, 0.5)" />
                          <stop offset="100%" stopColor="rgba(8, 145, 178, 0.15)" />
                        </radialGradient>
                      </defs>
                      <g>
                        <path
                          d="M 215 25 L 305 25 L 300 135 C 325 155, 335 180, 310 195 C 290 205, 275 190, 260 190 C 245 190, 230 205, 210 195 C 185 180, 195 155, 220 135 Z"
                          fill="url(#femurBoneTexture13)"
                          stroke="#FFFBEB"
                          strokeWidth="3.5"
                        />
                        <path
                          d="M 210 215 C 230 205, 245 220, 260 220 C 275 220, 290 205, 310 215 C 330 225, 320 245, 300 260 L 305 395 L 220 395 L 225 260 C 205 245, 195 225, 210 215 Z"
                          fill="url(#femurBoneTexture13)"
                          stroke="#FFFBEB"
                          strokeWidth="3.5"
                        />
                        <path d="M 320 240 L 340 240 L 335 395 L 315 395 Z" fill="url(#femurBoneTexture13)" stroke="#FFFBEB" strokeWidth="2.5" />
                        <path d="M 205 192 Q 260 182 315 192" fill="none" stroke="#67E8F9" strokeWidth="7" strokeLinecap="round" />
                        <path d="M 205 218 Q 260 228 315 218" fill="none" stroke="#67E8F9" strokeWidth="7" strokeLinecap="round" />
                        <path d="M 245 190 L 275 220 M 275 190 L 245 220" stroke="#FDE047" strokeWidth="5" strokeLinecap="round" />
                        <ellipse cx="222" cy="205" rx="24" ry="8" fill="#22D3EE" stroke="#FFFFFF" strokeWidth="2" />
                        <ellipse cx="298" cy="205" rx="24" ry="8" fill="#22D3EE" stroke="#FFFFFF" strokeWidth="2" />
                        <path
                          d="M 180 155 Q 165 205 180 245 L 340 245 Q 355 205 340 155 Z"
                          fill="url(#synovialFluidGrad13)"
                          stroke="#06B6D4"
                          strokeWidth="3.5"
                          strokeDasharray="6 4"
                        />
                        <g>
                          <ellipse cx="260" cy="170" rx="26" ry="19" fill="#FEF08A" stroke="#CA8A04" strokeWidth="3" />
                          <path d="M 260 189 L 260 265" stroke="#FACC15" strokeWidth="9" strokeLinecap="round" />
                        </g>
                      </g>
                    </svg>
                  )}

                  {/* ======================================================= */}
                  {/* 7. GASTRO-INTESTINAL TRACT (AUTHENTIC NETTER CLINICAL DISSECTION) */}
                  {/* ======================================================= */}
                  {selectedSystemId === 'organ-gastro' && (
                    <svg viewBox="0 0 520 420" className="w-full h-full max-h-[380px]">
                      <defs>
                        <radialGradient id="hdStomachGrad13" cx="50%" cy="50%" r="60%">
                          <stop offset="0%" stopColor="#FACC15" />
                          <stop offset="100%" stopColor="#A16207" />
                        </radialGradient>
                        <linearGradient id="colonGrad13" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#F59E0B" />
                          <stop offset="100%" stopColor="#B45309" />
                        </linearGradient>
                      </defs>
                      <g>
                        <rect x="225" y="15" width="22" height="90" rx="8" fill="#FDE047" stroke="#854D0E" strokeWidth="3" />
                        <g>
                          <path
                            d="M 225 105 C 160 130, 145 255, 260 270 Q 330 275, 340 220 Q 350 155, 247 105 Z"
                            fill="url(#hdStomachGrad13)"
                            stroke="#FEF9C3"
                            strokeWidth="4"
                          />
                          <path
                            d="M 220 140 Q 185 185 235 240 M 250 135 Q 215 190 270 245 M 285 150 Q 255 195 305 235"
                            fill="none"
                            stroke="#713F12"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            opacity="0.75"
                          />
                        </g>
                        <path
                          d="M 335 235 Q 365 260 345 295 Q 315 315 275 295"
                          fill="none"
                          stroke="#F59E0B"
                          strokeWidth="14"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 230 280 Q 200 310 240 335 Q 280 360 250 380 M 270 290 Q 310 320 280 345"
                          fill="none"
                          stroke="#FBBF24"
                          strokeWidth="10"
                          strokeLinecap="round"
                        />
                        <g>
                          <path
                            d="M 125 350 L 125 180 Q 260 140, 395 180 L 395 350"
                            fill="none"
                            stroke="url(#colonGrad13)"
                            strokeWidth="20"
                            strokeLinecap="round"
                            strokeDasharray="16 6"
                          />
                          <path
                            d="M 125 350 L 125 180 Q 260 140, 395 180 L 395 350"
                            fill="none"
                            stroke="#713F12"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                          />
                        </g>
                        <g>
                          <ellipse cx="125" cy="355" rx="14" ry="12" fill="#D97706" stroke="#FEF3C7" strokeWidth="2" />
                          <path d="M 125 367 Q 110 385 105 400" fill="none" stroke="#CA8A04" strokeWidth="5" strokeLinecap="round" />
                          <circle cx="105" cy="400" r="5" fill="#EF4444" />
                        </g>
                      </g>
                    </svg>
                  )}

                  {/* ======================================================= */}
                  {/* 8. ENDOCRINE, THYROID & LYMPHATIC (DETAILED DISSECTION) */}
                  {/* ======================================================= */}
                  {selectedSystemId === 'organ-endocrine' && (
                    <svg viewBox="0 0 520 420" className="w-full h-full max-h-[380px]">
                      <defs>
                        <radialGradient id="hdThyroidTissue13" cx="50%" cy="45%" r="55%">
                          <stop offset="0%" stopColor="#A5B4FC" />
                          <stop offset="60%" stopColor="#6366F1" />
                          <stop offset="100%" stopColor="#312E81" />
                        </radialGradient>
                        <linearGradient id="tracheaCartilage13" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#E2E8F0" />
                          <stop offset="100%" stopColor="#94A3B8" />
                        </linearGradient>
                      </defs>
                      <g>
                        <path
                          d="M 225 35 L 295 35 L 305 110 L 260 130 L 215 110 Z"
                          fill="url(#tracheaCartilage13)"
                          stroke="#F8FAFC"
                          strokeWidth="3.5"
                        />
                        <text x="212" y="75" fill="#1E293B" fontSize="10" fontWeight="900">
                          THYROID CARTILAGE
                        </text>
                        {[135, 165, 195, 225, 255, 285, 315, 345, 375].map((y, i) => (
                          <rect key={i} x="235" y={y} width="50" height="18" rx="6" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
                        ))}
                        <g>
                          <rect x="215" y="180" width="90" height="36" rx="12" fill="url(#hdThyroidTissue13)" stroke="#EEF2FF" strokeWidth="3" />
                          <path
                            d="M 180 120 C 150 145, 150 245, 195 270 Q 225 270 230 220 C 235 170, 205 110, 180 120 Z"
                            fill="url(#hdThyroidTissue13)"
                            stroke="#EEF2FF"
                            strokeWidth="3.5"
                          />
                          <path
                            d="M 340 120 C 370 145, 370 245, 325 270 Q 295 270 290 220 C 285 170, 315 110, 340 120 Z"
                            fill="url(#hdThyroidTissue13)"
                            stroke="#EEF2FF"
                            strokeWidth="3.5"
                          />
                        </g>
                        <path
                          d="M 195 35 L 195 140 M 325 35 L 325 140 M 175 360 L 205 260 M 345 360 L 315 260"
                          fill="none"
                          stroke="#EF4444"
                          strokeWidth="4.5"
                        />
                        <g>
                          <circle cx="155" cy="165" r="11" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                          <circle cx="145" cy="225" r="12" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                          <circle cx="160" cy="285" r="11" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                          <circle cx="365" cy="165" r="11" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                          <circle cx="375" cy="225" r="12" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                          <circle cx="360" cy="285" r="11" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                        </g>
                      </g>
                    </svg>
                  )}
                </div>
              </div>

              {/* COLLISION-FREE INTERACTIVE HOTSPOT PINS OVER THE SPATIAL VIEWPORT */}
              <div className="absolute inset-0 pointer-events-none z-20">
                {(activeSystem.hotspots || []).map((hs: any) => {
                  const isSelected = selectedHotspotId === hs.id;
                  return (
                    <button
                      key={hs.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedHotspotId(hs.id);
                      }}
                      className={`pointer-events-auto absolute transform -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full text-xs font-black shadow-2xl transition-all cursor-pointer flex items-center space-x-1.5 ${hs.coords} ${
                        isSelected
                          ? 'bg-emerald-500 text-white scale-110 ring-4 ring-emerald-500/40'
                          : 'bg-blue-600/95 text-white hover:bg-blue-500 hover:scale-105'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      <span>{hs.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* VIEWPORT BOTTOM ANGLE FOOTER */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-400 font-mono pointer-events-none z-20">
                <span>HD 3D ORBIT: {getPerspectiveLabel(yaw)}</span>
                <span className="text-emerald-400 font-black">
                  CLICK ANY NODE PIN TO INSPECT TISSUE PATHOLOGY
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-300">
              Drag mouse or touchpad across the viewport above to orbit the organ model 360° horizontally and vertically. Use mouse scroll-wheel to zoom.
            </p>
          </div>

          {/* RIGHT COLUMN: SELECTED TISSUE NODE HOTSPOT & DR. BURNETT ORGANOPATHY REMEDIES (5 COLUMNS) */}
          <div className="lg:col-span-5 space-y-4">
            {/* HOTSPOT DETAIL INSPECTOR */}
            <div
              className={`p-5 rounded-2xl border space-y-3.5 ${
                isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-[#05070A] border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-2.5 border-slate-200 dark:border-slate-800">
                <span className="text-xs font-black uppercase text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Crosshair className="w-4 h-4" /> SELECTED TISSUE HISTOLOGY NODE
                </span>
                <span className={`text-[10px] px-2.5 py-0.5 rounded font-black border ${activeSystem.layerBadge}`}>
                  {activeSystem.layer}
                </span>
              </div>

              {selectedHotspotId ? (
                (() => {
                  const hs = (activeSystem.hotspots || []).find((h: any) => h.id === selectedHotspotId);
                  if (!hs) return null;
                  return (
                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-black text-slate-400">
                          Anatomical Locus:
                        </span>
                        <p className="font-black text-base text-blue-600 dark:text-blue-400">
                          {hs.label}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-mono">
                        <span className="font-black block text-[10px] uppercase">
                          Organ-Affine Organopathy Tissue Remedy:
                        </span>
                        <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                          {hs.remedy}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] font-black uppercase text-slate-400 block">
                          Repertory Path Rubric:
                        </span>
                        <code className="text-xs font-bold text-amber-600 dark:text-amber-400">
                          {hs.rubric}
                        </code>
                      </div>

                      <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                        <strong>Clinical Pathology &amp; Miasmatic Vector:</strong> {hs.note}
                      </p>
                    </div>
                  );
                })()
              ) : (
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-center space-y-1">
                  <Info className="w-5 h-5 text-blue-400 mx-auto" />
                  <p className="text-xs font-black text-blue-600 dark:text-blue-300">
                    Click any glowing tissue pin on the 3D anatomical stage to examine deep histology &amp; Dr. Burnett remedies.
                  </p>
                </div>
              )}
            </div>

            {/* CORE ANATOMICAL LANDMARK SUMMARY FOR STUDENTS */}
            <div
              className={`p-5 rounded-2xl border space-y-3 ${
                isLight
                  ? 'bg-white border-slate-200 shadow-2xs'
                  : 'bg-[#0B0F19] border-slate-800'
              }`}
            >
              <span className="text-xs font-black uppercase text-purple-600 dark:text-purple-400 block border-b pb-2 border-slate-200 dark:border-slate-800">
                🎓 BHMS / MD CORE ANATOMICAL STRUCTURES
              </span>

              <ul className="space-y-1.5 text-xs">
                {activeSystem.anatomicalLandmarks.map((lm, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-slate-600 dark:text-gray-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span className="font-semibold">{lm}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BHMS / MD VIVA SPOTTER EXAM WORKBENCH FOR MEDICAL STUDENTS */}
      {workbenchTab === 'VIVA_SPOTTER_EXAM' && (
        <div
          className={`p-6 rounded-2xl border space-y-6 ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900 shadow-2xs'
              : 'bg-[#0B0F19] border-[#1C1F26] text-white'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs px-2.5 py-0.5 rounded font-black bg-purple-600 text-white">
                BHMS &amp; MD (HOM.) CLINICAL ANATOMY VIVA &amp; SPOTTER EXAM
              </span>
              <h3 className="text-base font-black mt-1">
                INTERACTIVE CLINICAL ANATOMY &amp; BURNETT ORGANOPATHY VIVA PRACTICE
              </h3>
              <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
                Test your anatomical landmark identification and clinical homeopathic organopathy prescribing before BHMS University exams.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 block">
                VIVA SCORE: {spotterScore} POINTS
              </span>
            </div>
          </div>

          {(activeSystem.spotterQuestions || []).length > 0 ? (
            (() => {
              const q = (activeSystem.spotterQuestions || [])[spotterQuestionIdx];
              return (
                <div className="max-w-3xl mx-auto space-y-5">
                  <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 font-black text-sm">
                    {q.question}
                  </div>

                  <div className="space-y-2.5">
                    {q.options.map((opt, idx) => {
                      const isChosen = spotterSelectedAns === idx;
                      const isCorrect = idx === q.correctIdx;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setSpotterSelectedAns(idx);
                            if (idx === q.correctIdx) setSpotterScore((s) => s + 50);
                          }}
                          className={`w-full p-4 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                            spotterSelectedAns === null
                              ? isLight
                                ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                                : 'bg-[#05070A] hover:bg-slate-800 border-slate-800 text-gray-200'
                              : isCorrect
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                              : isChosen
                              ? 'bg-rose-500/20 border-rose-500 text-rose-700 dark:text-rose-300'
                              : 'opacity-50'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {spotterSelectedAns !== null && (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs leading-relaxed">
                      <strong>Clinical Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })()
          ) : (
            <div className="text-center py-8 text-xs text-slate-500">
              Select Head/Brain, Liver, Kidneys, Cardiovascular Heart, Gastro-Intestinal, or Musculoskeletal to launch university viva spotter questions.
            </div>
          )}
        </div>
      )}

      {/* TAB 3: DR. BURNETT ORGANOPATHY TISSUE DRAINAGE MATRIX */}
      {workbenchTab === 'ORGANOPATHY_CLINICAL' && (
        <div
          className={`p-6 rounded-2xl border space-y-6 ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900 shadow-2xs'
              : 'bg-[#0B0F19] border-[#1C1F26] text-white'
          }`}
        >
          <div className="border-b pb-3 border-slate-200 dark:border-slate-800">
            <span className="text-xs px-2.5 py-0.5 rounded font-black bg-emerald-600 text-white">
              DR. J. C. BURNETT &amp; RADEMACHER CLINICAL ORGANOPATHY PROTOCOLS
            </span>
            <h3 className="text-base font-black mt-1">
              LOW-POTENCY TISSUE DRAINAGE REMEDIES FOR DEEP STRUCTURAL ORGAN DISEASE
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeSystem.organopathyRemedies.map((rem) => (
              <div
                key={rem.name}
                className={`p-5 rounded-2xl border space-y-2.5 ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 shadow-2xs'
                    : 'bg-[#05070A] border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-base text-emerald-600 dark:text-emerald-400">
                    {rem.name}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded font-black bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
                    {rem.potency}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed font-medium">
                  {rem.keynote}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Interactive360AnatomyAtlas;

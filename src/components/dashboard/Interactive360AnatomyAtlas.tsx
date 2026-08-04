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
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>('hs-carotid-plexus');

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
          { label: 'Cerebral Cortex Gyri & Sulci', pos: 'top-[10%] left-[10%]' },
          { label: 'Circle of Willis Ring', pos: 'top-[42%] right-[10%]' },
          { label: 'Carotid Bifurcation (Belladonna)', pos: 'bottom-[10%] left-[12%]' },
        ],
      },
      hotspots: [
        {
          id: 'hs-frontal-cortex',
          label: 'Frontal Cortex & Psoric Stress',
          rubric: 'MIND - ANXIETY - future, about',
          remedy: 'Aconite / Arsenicum Album',
          note: 'Ectodermal neural locus of acute mental restlessness and anticipation fear.',
          coords: 'top-[22%] left-[28%]',
        },
        {
          id: 'hs-occipital',
          label: 'Occipital-Cervical Neural Junction',
          rubric: 'HEAD - PAIN - occiput - extending to forehead',
          remedy: 'Gelsemium Sempervirens 30C',
          note: 'Dull heavy occipital headache spreading forward over eyes with muscle eyelids heaviness.',
          coords: 'top-[42%] right-[18%]',
        },
        {
          id: 'hs-hypothalamus',
          label: 'Hypothalamic Thermal Center',
          rubric: 'GENERALITIES - HEAT - flushes of',
          remedy: 'Vijayakar Thermal-Thirst Constant Filter',
          note: 'Immutable baseline regulator governing thermal baseline (Hot/Chilly) and thirst dynamics.',
          coords: 'top-[58%] left-[24%]',
        },
        {
          id: 'hs-carotid-plexus',
          label: 'Carotid Arterial Surge Plexus',
          rubric: 'HEAD - CONGESTION - blood - surge of',
          remedy: 'Belladonna 30C / 200C',
          note: 'Sudden throbbing carotid artery pulsation, dilated pupils, flushed red face, cerebral congestion.',
          coords: 'top-[78%] left-[50%]',
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
        {
          question:
            'Q2 (MD Hom. Neuro-Pathology): In Dr. Prafull Vijayakar’s Predictive Homeopathy, which embryological layer gives rise to the central nervous system?',
          options: [
            'Mesoderm (Musculoskeletal & Synovial)',
            'Endoderm (Visceral & Mucous Membranes)',
            'Ectoderm (Neural Crest & Sensory System)',
            'Notochord (Periosteal Membrane)',
          ],
          correctIdx: 2,
          explanation:
            'The brain, spinal cord, and sensory nerves originate from the Ectoderm layer. Emotional Psoric disturbances afflict ectodermal pathways first.',
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
          name: 'Glonoine (Nitroglycerin)',
          potency: '6C / 30C',
          keynote:
            'Surging cerebral congestion, pulse felt in every vessel, worse heat of sun, head feels enormously enlarged.',
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
        'Gallbladder, Cystic Duct & Common Bile Duct',
        'Portal Vein Triad (Bile Duct, Hepatic Artery, Portal Vein)',
        'Hexagonal Hepatic Lobule & Central Vein Micro-Architecture',
      ],
      atlasIllustration: {
        bgGradient: 'from-[#0B261D] via-[#133A2D] to-[#071812]',
        landmarkLabels: [
          { label: 'Right Hepatic Parenchymal Lobe', pos: 'top-[10%] left-[10%]' },
          { label: 'Hepatic Hexagonal Lobule', pos: 'top-[44%] right-[10%]' },
        ],
      },
      hotspots: [
        {
          id: 'hs-right-lobe',
          label: 'Right Hepatic Lobe Parenchyma',
          rubric: 'ABDOMEN - CIRRHOSIS - liver',
          remedy: 'Chelidonium Majus 1X / Q',
          note: 'Primary target for Chelidonium right scapular nerve referral pain and hepatic enlargement.',
          coords: 'top-[28%] left-[28%]',
        },
        {
          id: 'hs-portal-vein',
          label: 'Portal Vein Vascular Axis',
          rubric: 'GENERALITIES - VARICOSE veins',
          remedy: 'Carduus Marianus / Lycopodium',
          note: 'Portal hypertension and venous back-pressure.',
          coords: 'top-[52%] left-[48%]',
        },
        {
          id: 'hs-gallbladder',
          label: 'Gallbladder & Common Bile Duct',
          rubric: 'ABDOMEN - GALLBLADDER - complaints of',
          remedy: 'Carduus Marianus Q',
          note: 'Biliary stasis, portal vein congestion, clay stools, and jaundice relief.',
          coords: 'top-[78%] right-[22%]',
        },
      ],
      spotterQuestions: [
        {
          question:
            'Q1 (BHMS Anatomy Viva): Where does the classical referral pain of Chelidonium Majus liver disease radiate?',
          options: [
            'Left scapular tip shooting down left arm',
            'Under lower angle of the Right Scapula',
            'Right inguinal ring radiating to scrotum',
            'Mid-epigastric region radiating to back',
          ],
          correctIdx: 1,
          explanation:
            'Chelidonium Majus acts specifically on the right hepatic lobe parenchyma and phrenic nerve afferents, causing characteristic pain under the lower angle of the right scapula.',
        },
      ],
      organopathyRemedies: [
        {
          name: 'Chelidonium Majus',
          potency: 'Q (Tincture) / 6X',
          keynote:
            'Burnett Organ-Affine Liver Tonic: Constant pain under lower angle of right scapula, jaundice, clay stool.',
        },
        {
          name: 'Carduus Marianus',
          potency: 'Q / 3X',
          keynote:
            'Portal vein congestion, varicose veins of lower limbs, hepatic engorgement & bitter taste.',
        },
        {
          name: 'Lycopodium Clavatum',
          potency: '30C / 200C',
          keynote:
            'Right-sided hepatic fullness, flatulence 4–8 PM, metabolic liver cirrhosis & uric acid bias.',
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
        'Renal Cortex & Glomerular Capillaries',
        'Renal Medullary Pyramids & Renal Papillae',
        'Renal Pelvis, Major & Minor Calyces',
        'Ureters Extending to Urinary Bladder',
      ],
      atlasIllustration: {
        bgGradient: 'from-[#0A2633] via-[#11384A] to-[#061922]',
        landmarkLabels: [
          { label: 'Glomerular Renal Cortex', pos: 'top-[10%] left-[10%]' },
          { label: 'Renal Medullary Pyramids', pos: 'bottom-[10%] right-[10%]' },
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
          id: 'hs-ureter',
          label: 'Ureteric Colic Junction',
          rubric: 'URINARY ORGANS - URETERS - pain - radiating',
          remedy: 'Berberis Vulgaris Q / 6X',
          note: 'Radiating stone colic down ureter to thigh and testicle.',
          coords: 'top-[76%] left-[50%]',
        },
      ],
      spotterQuestions: [
        {
          question:
            'Q1 (BHMS Surgery / Organopathy): Which low-potency tissue-affine remedy did Dr. J.C. Burnett recommend for clearing renal parenchymal congestion and tender kidney zone?',
          options: [
            'Sulphur 10M dry granules',
            'Solidago Virgaurea Q (Mother Tincture) / 3X',
            'Lachesis 1M every hour',
            'Nux Vomica 200C',
          ],
          correctIdx: 1,
          explanation:
            'Dr. Burnett demonstrated that damaged structural kidney tissue requires organ-affine drainage (Solidago Virgaurea Q/3X) to relieve renal parenchymal congestion.',
        },
      ],
      organopathyRemedies: [
        {
          name: 'Solidago Virgaurea',
          potency: 'Q / 3X',
          keynote:
            'Burnett Kidney Drainage: Renal insufficiency, tender kidney region on pressure, dark reddish urine.',
        },
        {
          name: 'Berberis Vulgaris',
          potency: 'Q / 6X',
          keynote:
            'Radiating renal colic shooting down ureter to thigh and testicle, bubbling lumbar sensation.',
        },
        {
          name: 'Cantharis Vesicatoria',
          potency: '30C',
          keynote:
            'Violent burning tenesmus along urinary tract, drop-by-drop scalding urine.',
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
              <span>BHMS &amp; MD CLINICAL MEDICAL SCHOOL ANATOMY WORKBENCH</span>
            </span>
            <span className="text-xs font-black text-emerald-500">
              ● NCH Curriculum Compliant Anatomical &amp; Organopathy Atlas
            </span>
          </div>
          <h2 className="text-lg font-black mt-1 tracking-tight">
            INTERACTIVE 3D ANATOMICAL SPATIAL WORKBENCH • MEDICAL STUDENT DISSECTION WORKSPACE
          </h2>
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
            💡 Switch between the <strong>360° Photorealistic Anatomy Atlas</strong>, the <strong>BHMS Anatomical Spotter Viva Exam Workbench</strong>, and <strong>Dr. Burnett Organopathy Tissue Protocols</strong>.
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

      {/* ORGAN SYSTEM SELECTOR TABS */}
      <div className="flex flex-wrap gap-2">
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
              className={`px-4 py-2.5 rounded-xl border text-xs font-black flex items-center space-x-2 transition-all cursor-pointer ${
                isSel
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md scale-[1.01]'
                  : isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                  : 'bg-[#05070A] hover:bg-slate-800 border-slate-800 text-gray-300'
              }`}
            >
              <span>{sys.icon}</span>
              <span>{sys.name}</span>
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
                  {/* 1. BRAIN & CENTRAL NERVOUS SYSTEM */}
                  {selectedSystemId === 'organ-head' && (
                    <svg viewBox="0 0 520 420" className="w-full h-full max-h-[380px]">
                      <defs>
                        <radialGradient id="hdBrainTissue3" cx="45%" cy="38%" r="65%">
                          <stop offset="0%" stopColor="#F5D0C5" />
                          <stop offset="45%" stopColor="#E2A698" />
                          <stop offset="85%" stopColor="#B36959" />
                          <stop offset="100%" stopColor="#783A2E" />
                        </radialGradient>
                        <linearGradient id="carotidBlood3" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#EF4444" />
                          <stop offset="100%" stopColor="#991B1B" />
                        </linearGradient>
                        <filter id="hdShadow3" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#000000" floodOpacity="0.6" />
                        </filter>
                      </defs>

                      <g filter="url(#hdShadow3)">
                        <path
                          d="M 260 25 C 135 25, 65 110, 75 200 C 82 265, 135 315, 225 315 L 225 385 L 295 385 L 295 315 C 385 315, 438 265, 445 200 C 455 110, 385 25, 260 25 Z"
                          fill="url(#hdBrainTissue3)"
                          stroke="#FFF1EE"
                          strokeWidth="4"
                        />
                        <path
                          d="M 125 105 Q 185 75 255 110 Q 325 75 395 105 M 110 165 Q 195 135 260 165 Q 325 135 410 165 M 130 230 Q 195 200 260 230 Q 325 200 390 230"
                          fill="none"
                          stroke="#8D4335"
                          strokeWidth="4.5"
                          strokeLinecap="round"
                          opacity="0.8"
                        />
                        <path
                          d="M 140 270 Q 205 310 240 285 M 375 270 Q 315 310 280 285"
                          fill="none"
                          stroke="#6B2F24"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                        <path d="M 240 285 L 240 395 L 280 395 L 280 285 Z" fill="#9A4D3F" stroke="#FDE8E4" strokeWidth="2.5" />
                        <g>
                          <path
                            d="M 235 395 L 235 250 Q 195 205 160 185 M 285 395 L 285 250 Q 325 205 360 185"
                            fill="none"
                            stroke="url(#carotidBlood3)"
                            strokeWidth="7"
                            strokeLinecap="round"
                          />
                          <circle cx="235" cy="250" r="14" fill="#F87171" stroke="#FFFFFF" strokeWidth="2.5" />
                          <circle cx="285" cy="250" r="14" fill="#F87171" stroke="#FFFFFF" strokeWidth="2.5" />
                        </g>
                        <g>
                          <circle cx="260" cy="195" r="28" fill="rgba(6, 182, 212, 0.45)" stroke="#06B6D4" strokeWidth="3" />
                        </g>
                      </g>
                    </svg>
                  )}

                  {/* 2. HEPATO-BILIARY LIVER & GALLBLADDER */}
                  {selectedSystemId === 'organ-liver' && (
                    <svg viewBox="0 0 520 420" className="w-full h-full max-h-[380px]">
                      <defs>
                        <radialGradient id="hdLiverTissue3" cx="42%" cy="38%" r="65%">
                          <stop offset="0%" stopColor="#A34839" />
                          <stop offset="65%" stopColor="#75281C" />
                          <stop offset="100%" stopColor="#4A150D" />
                        </radialGradient>
                      </defs>
                      <g filter="url(#hdShadow3)">
                        <path
                          d="M 95 175 C 145 75, 375 75, 435 180 C 465 235, 410 335, 305 345 C 205 355, 105 295, 95 175 Z"
                          fill="url(#hdLiverTissue3)"
                          stroke="#FECACA"
                          strokeWidth="4"
                        />
                        <path d="M 325 95 Q 330 215 335 345" stroke="#FCA5A5" strokeWidth="3.5" strokeDasharray="7 5" />
                        <g>
                          <path d="M 305 270 Q 310 305 315 335" stroke="#F59E0B" strokeWidth="5" />
                          <ellipse
                            cx="320"
                            cy="345"
                            rx="25"
                            ry="36"
                            fill="#D97706"
                            stroke="#FEF3C7"
                            strokeWidth="3.5"
                          />
                        </g>
                        <path
                          d="M 295 280 Q 265 220 185 155 M 295 280 Q 325 220 395 165"
                          fill="none"
                          stroke="#60A5FA"
                          strokeWidth="6"
                        />
                      </g>
                    </svg>
                  )}

                  {/* 3. KIDNEYS & RENAL TRACT */}
                  {selectedSystemId === 'organ-kidneys' && (
                    <svg viewBox="0 0 520 420" className="w-full h-full max-h-[380px]">
                      <defs>
                        <radialGradient id="hdRenalTissue3" cx="50%" cy="50%" r="60%">
                          <stop offset="0%" stopColor="#22D3EE" />
                          <stop offset="100%" stopColor="#0891B2" />
                        </radialGradient>
                      </defs>
                      <g filter="url(#hdShadow3)">
                        <path
                          d="M 155 105 C 105 140, 105 260, 165 295 C 215 320, 255 260, 230 205 C 255 165, 215 80, 155 105 Z"
                          fill="url(#hdRenalTissue3)"
                          stroke="#CFFAFE"
                          strokeWidth="4"
                        />
                        <path
                          d="M 365 105 C 315 80, 275 165, 300 205 C 275 260, 315 320, 365 295 C 425 260, 425 140, 365 105 Z"
                          fill="url(#hdRenalTissue3)"
                          stroke="#CFFAFE"
                          strokeWidth="4"
                        />
                        <path d="M 210 210 Q 225 310 225 395" stroke="#22D3EE" strokeWidth="5" strokeDasharray="6 4" />
                        <path d="M 310 210 Q 295 310 295 395" stroke="#22D3EE" strokeWidth="5" strokeDasharray="6 4" />
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
              Select Head/Brain, Liver, or Kidneys to launch university viva spotter questions.
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

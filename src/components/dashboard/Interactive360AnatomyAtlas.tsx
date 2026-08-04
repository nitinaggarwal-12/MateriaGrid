'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';

interface Interactive360AnatomyAtlasProps {
  theme?: 'dark' | 'light';
}

type LayerFilterMode = 'PARENCHYMA' | 'VASCULAR' | 'NEURAL' | 'HISTOLOGY';

export const Interactive360AnatomyAtlas: React.FC<
  Interactive360AnatomyAtlasProps
> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';

  const [selectedSystemId, setSelectedSystemId] = useState<string>('organ-head');
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [activeLayer, setActiveLayer] = useState<LayerFilterMode>('PARENCHYMA');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [opacityLevel, setOpacityLevel] = useState<number>(95);
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>('hs-carotid-plexus');

  const ORGAN_SYSTEMS = [
    {
      id: 'organ-head',
      name: 'Head, Brain & Central Nervous System',
      icon: '🧠',
      layer: 'ECTODERM (MIND / NEURAL)',
      layerBadge: 'bg-purple-500/10 text-purple-600 border-purple-500/30',
      description:
        'Derived from the Ectoderm layer. Afflicted prominently in Psoric emotional stress and Syphilitic destructive neural pathways.',
      views: {
        0: {
          title: '0° Anterior Cerebral Hemispheres & Frontal Cortex',
          desc: 'Anterior view showing bilateral Frontal Lobes, Interhemispheric Fissure, Carotid vascular plexus, and Optic Chiasm.',
          hotspots: [
            {
              id: 'hs-carotid-plexus',
              label: 'Carotid Arterial Surge Plexus',
              rubric: 'HEAD - CONGESTION - blood - surge of',
              remedy: 'Belladonna 30C / 200C',
              note: 'Sudden throbbing carotid artery pulsation, dilated pupils, flushed red face, cerebral congestion.',
              coords: 'top-[42%] left-[48%]',
            },
            {
              id: 'hs-frontal-cortex',
              label: 'Frontal Cortex & Psoric Emotional Stress',
              rubric: 'MIND - ANXIETY - future, about',
              remedy: 'Aconite / Arsenicum Album',
              note: 'Ectodermal neural locus of acute mental restlessness and anticipation fear.',
              coords: 'top-[22%] left-[48%]',
            },
          ],
        },
        90: {
          title: '90° Lateral Brainstem & Occipital Cortex Profile',
          desc: 'Profile showing Cerebral Sulci/Gyri, Cerebellum, Vagus Nerve nuclei, and Cervical Spine junction.',
          hotspots: [
            {
              id: 'hs-occipital',
              label: 'Occipital-Cervical Neural Junction',
              rubric: 'HEAD - PAIN - occiput - extending to forehead',
              remedy: 'Gelsemium Sempervirens 30C',
              note: 'Dull heavy occipital headache spreading forward over eyes with muscle eyelids heaviness.',
              coords: 'top-[58%] left-[62%]',
            },
            {
              id: 'hs-cerebellum',
              label: 'Cerebellar Motor & Gait Balance Center',
              rubric: 'GENERALITIES - ATAXIA - locomotion',
              remedy: 'Argentum Nitricum 200C',
              note: 'Loss of voluntary muscular coordination and staggering gait.',
              coords: 'top-[68%] left-[70%]',
            },
          ],
        },
        180: {
          title: '180° Posterior Meningeal & Cerebellar Surface',
          desc: 'Dorsal cortex aspect showing occipital protuberance, transverse meningeal sinuses, and tentorium cerebelli.',
          hotspots: [
            {
              id: 'hs-glonoine',
              label: 'Cerebral Vascular Pulsation Zone',
              rubric: 'HEAD - PULSATING - sun, from heat of',
              remedy: 'Glonoine (Nitroglycerin) 6C / 30C',
              note: 'Surging cerebral heat, feels head would burst, worse sun exposure.',
              coords: 'top-[36%] left-[49%]',
            },
          ],
        },
        270: {
          title: '270° Internal Midsagittal Brainstem & Limbic Cross-Section',
          desc: 'Internal sagittal dissection revealing Corpus Callosum, Hypothalamus thermal regulator, Pituitary Gland, and Pons/Medulla.',
          hotspots: [
            {
              id: 'hs-hypothalamus',
              label: 'Hypothalamic Thermal & Thirst Center',
              rubric: 'GENERALITIES - HEAT - flushes of',
              remedy: 'Vijayakar Thermal-Thirst Constant Filter',
              note: 'Immutable baseline regulator governing thermal baseline (Hot/Chilly) and thirst dynamics.',
              coords: 'top-[50%] left-[46%]',
            },
          ],
        },
      },
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
      views: {
        0: {
          title: '0° Anterior Frontal Hepatic Lobes',
          desc: 'Anterior volumetric view showing Right and Left Hepatic Lobes separated by the falciform ligament.',
          hotspots: [
            {
              id: 'hs-right-lobe',
              label: 'Right Hepatic Lobe Parenchyma',
              rubric: 'ABDOMEN - CIRRHOSIS - liver',
              remedy: 'Chelidonium Majus 1X / Q',
              note: 'Primary target for Chelidonium right scapular nerve referral pain and hepatic enlargement.',
              coords: 'top-[38%] left-[42%]',
            },
            {
              id: 'hs-gallbladder',
              label: 'Gallbladder & Common Bile Duct',
              rubric: 'ABDOMEN - GALLBLADDER - complaints of',
              remedy: 'Carduus Marianus Q',
              note: 'Biliary stasis, portal vein congestion, clay stools, and jaundice relief.',
              coords: 'top-[66%] left-[58%]',
            },
          ],
        },
        90: {
          title: '90° Right Lateral Hepato-Diaphragmatic Surface',
          desc: 'Lateral profile demonstrating renal impression and diaphragm contact zone.',
          hotspots: [
            {
              id: 'hs-portal-vein',
              label: 'Portal Vein Vascular Axis',
              rubric: 'GENERALITIES - VARICOSE veins',
              remedy: 'Carduus Marianus / Lycopodium',
              note: 'Portal hypertension and venous back-pressure.',
              coords: 'top-[48%] left-[50%]',
            },
          ],
        },
        180: {
          title: '180° Posterior Visceral Surface & Bare Area',
          desc: 'Posterior aspect showing Inferior Vena Cava fissure, Caudate and Quadrate lobes.',
          hotspots: [
            {
              id: 'hs-inferior-vc',
              label: 'Inferior Vena Cava Groove',
              rubric: 'CIRCULATION - CONGESTION - portal',
              remedy: 'Lycopodium 30C / 200C',
              note: 'Right-sided metabolic hepatic enlargement and gas at 4-8 PM.',
              coords: 'top-[34%] left-[50%]',
            },
          ],
        },
        270: {
          title: '270° Internal Sagittal Tissue Histology & Hepatic Lobule',
          desc: 'Deep micro-anatomical cross section of classic hexagonal Hepatic Lobule & Portal Triads.',
          hotspots: [
            {
              id: 'hs-portal-triad',
              label: 'Portal Triad (Bile Duct, Hepatic Artery, Portal Vein)',
              rubric: 'ABDOMEN - ENLARGEMENT - liver',
              remedy: 'Chelidonium Majus Q',
              note: 'Burnett Organopathy: Low-potency organ-affine tissue drainage.',
              coords: 'top-[48%] left-[48%]',
            },
          ],
        },
      },
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
      views: {
        0: {
          title: '0° Anterior Renal Cortex & Medullary Pyramids',
          desc: 'Frontal longitudinal cross section showing Renal Cortex, Medullary Pyramids, Renal Pelvis, and Ureters.',
          hotspots: [
            {
              id: 'hs-renal-cortex',
              label: 'Glomerular Renal Cortex',
              rubric: 'URINARY ORGANS - KIDNEYS - inflammation',
              remedy: 'Solidago Virgaurea Q / 3X',
              note: 'Burnett Kidney Drainage: Tender renal zone on pressure, albuminuria.',
              coords: 'top-[32%] left-[48%]',
            },
            {
              id: 'hs-ureter',
              label: 'Ureteric Colic Junction',
              rubric: 'URINARY ORGANS - URETERS - pain - radiating',
              remedy: 'Berberis Vulgaris Q / 6X',
              note: 'Radiating stone colic down ureter to thigh and testicle.',
              coords: 'top-[68%] left-[52%]',
            },
          ],
        },
        90: {
          title: '90° Lateral Hilum & Renal Artery Cross-Section',
          desc: 'Lateral aspect of renal sinus entrance.',
          hotspots: [
            {
              id: 'hs-renal-artery',
              label: 'Renal Artery & Nephron Filtration',
              rubric: 'URINARY ORGANS - KIDNEYS - insufficiency',
              remedy: 'Solidago Virgaurea Q',
              note: 'Protects nephron filtration in chronic kidney disease.',
              coords: 'top-[50%] left-[48%]',
            },
          ],
        },
        180: {
          title: '180° Posterior Lumbar Peri-Renal Capsule',
          desc: 'Dorsal aspect showing renal capsule contact with quadratus lumborum muscle.',
          hotspots: [
            {
              id: 'hs-lumbar-capsule',
              label: 'Lumbar Peri-Renal Capsule',
              rubric: 'BACK - PAIN - lumbar region - kidney',
              remedy: 'Berberis Vulgaris Q',
              note: 'Bubbling or bruised lumbar renal pain.',
              coords: 'top-[45%] left-[50%]',
            },
          ],
        },
        270: {
          title: '270° Microscopic Nephron Glomerulus Histology',
          desc: 'Deep micro-section of Bowmans Capsule, Glomerular capillaries, and Tubules.',
          hotspots: [
            {
              id: 'hs-bowmans-capsule',
              label: 'Bowmans Capsule & Glomerular Capillaries',
              rubric: 'URINARY ORGANS - BLADDER - tenesmus',
              remedy: 'Cantharis Vesicatoria 30C',
              note: 'Scalding drop-by-drop urinary tenesmus.',
              coords: 'top-[48%] left-[49%]',
            },
          ],
        },
      },
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
    {
      id: 'organ-heart',
      name: 'Cardiovascular & Coronary Circulation',
      icon: '❤️',
      layer: 'MESODERM (SEROUS / VASCULAR)',
      layerBadge: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
      description:
        'Mesodermal cardiac tissue governing myocardial contractility, coronary arterial supply, and systemic hemodynamics.',
      views: {
        0: {
          title: '0° Anterior Cardiac Myocardium & Coronary Arteries',
          desc: 'Anterior view showing Ascending Aorta, Pulmonary Trunk, Left/Right Ventricles, and Anterior Interventricular Artery.',
          hotspots: [
            {
              id: 'hs-coronary-artery',
              label: 'Coronary Interventricular Artery',
              rubric: 'CHEST - CONSTRICTION - heart - wire around it, as if',
              remedy: 'Cactus Grandiflorus 30C / Q',
              note: 'Sensation as if an iron hand or band tightly constricted the cardiac myocardium.',
              coords: 'top-[46%] left-[52%]',
            },
            {
              id: 'hs-myocardium',
              label: 'Myocardial Hypertrophy Zone',
              rubric: 'HEART - PALPITATION - exertion, on slightest',
              remedy: 'Crataegus Oxyacantha Q',
              note: 'Burnett Heart Tonic: Cardiac hypertrophy, dyspnea on exertion, and feeble pulse.',
              coords: 'top-[58%] left-[44%]',
            },
          ],
        },
      },
      organopathyRemedies: [
        {
          name: 'Crataegus Oxyacantha',
          potency: 'Q (Tincture)',
          keynote:
            'Heart Tonic: Cardiac hypertrophy, dyspnea on slight exertion, irregular feeble pulse.',
        },
        {
          name: 'Cactus Grandiflorus',
          potency: 'Q / 30C',
          keynote:
            'Constriction sensation as if an iron band or wire was tightly clutched around the heart.',
        },
        {
          name: 'Digitalis Purpurea',
          potency: '30C',
          keynote:
            'Slow intermittent pulse, sensation as if heart would stop if patient moved.',
        },
      ],
    },
  ];

  const activeSystem =
    ORGAN_SYSTEMS.find((s) => s.id === selectedSystemId) || ORGAN_SYSTEMS[0];
  const activeView =
    (activeSystem.views as any)[rotationAngle] ||
    activeSystem.views[0] ||
    (Object.values(activeSystem.views)[0] as any);

  return (
    <div
      className={`p-6 rounded-2xl border space-y-6 font-sans ${
        isLight
          ? 'bg-white border-slate-200 text-slate-900 shadow-2xs'
          : 'bg-[#0B0F19] border-[#1C1F26] text-white'
      }`}
    >
      {/* TOP MEDICAL DIAGNOSTIC HUD BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full font-black bg-blue-600 text-white flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>3D MEDICAL SPATIAL AT</span>
            </span>
            <span className="text-xs font-black text-emerald-500">
              ● HD Volumetric Spatial Viewport Live
            </span>
          </div>
          <h2 className="text-lg font-black mt-1 tracking-tight">
            INTERACTIVE 3D ANATOMICAL SPATIAL WORKBENCH • EMBRYOLOGICAL LAYERS &amp; BURNETT ORGANOPATHY
          </h2>
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
            💡 Switch anatomical systems, drag the 360° Orbit Slider, or select Tissue Layer Filters (Volumetric Tissue vs Vascular Plexus vs Sagittal Histology) to study tissue pathology.
          </p>
        </div>

        {/* LAYER FILTER TOGGLES */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          {[
            { id: 'PARENCHYMA', label: '🫁 Parenchyma Tissue', color: 'bg-emerald-600' },
            { id: 'VASCULAR', label: '🩸 Arterial / Vascular', color: 'bg-rose-600' },
            { id: 'HISTOLOGY', label: '🔬 Micro Sagittal Section', color: 'bg-purple-600' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveLayer(mode.id as LayerFilterMode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                activeLayer === mode.id
                  ? `${mode.color} text-white shadow-xs`
                  : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {mode.label}
            </button>
          ))}
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

      {/* 3D WORKBENCH STAGE + DIAGNOSTIC INSPECTOR (12 COLUMNS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT CANVAS: HD 3D ANATOMICAL RENDERING WORKBENCH (7 COLUMNS) */}
        <div
          className={`lg:col-span-7 p-6 rounded-2xl border flex flex-col space-y-4 relative ${
            isLight
              ? 'bg-slate-900 text-white border-slate-800'
              : 'bg-[#03060C] text-white border-slate-800'
          }`}
        >
          {/* TOP SPATIAL CONTROLS BAR */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black text-blue-400 uppercase tracking-wider">
                {activeView.title}
              </span>
            </div>

            <div className="flex items-center space-x-1">
              {[0, 90, 180, 270].map((angle) => (
                <button
                  key={angle}
                  onClick={() => setRotationAngle(angle)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-black cursor-pointer transition-all ${
                    rotationAngle === angle
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {angle}° {angle === 0 ? 'Front' : angle === 90 ? 'Lateral' : angle === 180 ? 'Back' : 'Section'}
                </button>
              ))}
            </div>
          </div>

          {/* ORBIT DIAL SLIDER */}
          <div className="flex items-center space-x-3 px-1">
            <Compass className="w-4 h-4 text-blue-400 flex-shrink-0 animate-spin-slow" />
            <span className="text-[10px] font-black uppercase text-slate-400">
              360° Spatial Rotate:
            </span>
            <input
              type="range"
              min="0"
              max="270"
              step="90"
              value={rotationAngle}
              onChange={(e) => setRotationAngle(Number(e.target.value))}
              className="flex-1 cursor-pointer accent-blue-500"
            />
            <span className="font-mono text-xs font-black text-blue-400 w-10 text-right">
              {rotationAngle}°
            </span>
          </div>

          {/* HIGH-DEFINITION VOLUMETRIC MEDICAL ANATOMY CANVAS */}
          <div className="relative w-full h-[420px] rounded-2xl bg-gradient-to-b from-[#060B14] via-[#0A1120] to-[#040810] border border-blue-500/30 flex flex-col items-center justify-center overflow-hidden p-4 shadow-2xl">
            {/* AMBIENT GLOW & BACKSTAGE BIO-GRID */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="medicalGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#3B82F6" strokeWidth="0.6" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#medicalGrid)" />
              </svg>
            </div>

            {/* ARTISTIC HIGH-DEFINITION MEDICAL VECTOR ORGAN ARTWORK */}
            <div
              className="w-full h-full flex items-center justify-center transition-all duration-500 ease-out"
              style={{
                transform: `scale(${zoomLevel / 100})`,
                opacity: opacityLevel / 100,
              }}
            >
              {/* ========================================================= */}
              {/* 1. BRAIN & CENTRAL NERVOUS SYSTEM (HIGH-DEFINITION MODEL) */}
              {/* ========================================================= */}
              {selectedSystemId === 'organ-head' && (
                <svg viewBox="0 0 460 380" className="w-full h-full max-h-[350px]">
                  <defs>
                    <radialGradient id="brainTissueGrad" cx="50%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#D8B4FE" />
                      <stop offset="60%" stopColor="#A855F7" />
                      <stop offset="100%" stopColor="#6B21A8" />
                    </radialGradient>
                    <radialGradient id="carotidGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#F87171" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                    </radialGradient>
                    <filter id="glowEffect">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* CEREBRAL HEMISPHERES WITH ANATOMICAL SULCI / GYRI ARTWORK */}
                  <g className="transition-transform duration-500" style={{ transform: `rotateY(${rotationAngle}deg)` }}>
                    {/* BRAIN OUTLINE LOBES */}
                    <path
                      d="M 230 45 C 130 45, 80 115, 85 185 C 90 240, 135 275, 205 275 L 205 320 L 255 320 L 255 275 C 325 275, 370 240, 375 185 C 380 115, 330 45, 230 45 Z"
                      fill="url(#brainTissueGrad)"
                      stroke="#E9D5FF"
                      strokeWidth="3.5"
                    />

                    {/* INTERHEMISPHERIC FISSURE */}
                    <path d="M 230 45 L 230 275" stroke="#4C1D95" strokeWidth="3" strokeDasharray="6 4" />

                    {/* FRONTAL, PARIETAL, OCCIPITAL SULCI & GYRI CONVOLUTIONS */}
                    <path
                      d="M 130 110 Q 170 85 220 110 M 120 160 Q 180 135 225 160 M 135 210 Q 180 185 220 215"
                      fill="none"
                      stroke="#7E22CE"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 330 110 Q 290 85 240 110 M 340 160 Q 280 135 235 160 M 325 210 Q 280 185 240 215"
                      fill="none"
                      stroke="#7E22CE"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* CEREBELLUM LOBES (LOWER POSTERIOR) */}
                    <path
                      d="M 140 245 C 160 280, 200 290, 220 270 M 320 245 C 300 280, 260 290, 240 270"
                      fill="none"
                      stroke="#9333EA"
                      strokeWidth="4"
                    />

                    {/* BRAINSTEM & MEDULLA OBLONGATA */}
                    <path
                      d="M 215 270 L 215 350 L 245 350 L 245 270 Z"
                      fill="#9333EA"
                      stroke="#E9D5FF"
                      strokeWidth="2"
                    />

                    {/* CAROTID ARTERIAL SURGE PLEXUS (ALWAYS VISIBLE IN VASCULAR / PARENCHYMA MODE) */}
                    {(activeLayer === 'VASCULAR' || activeLayer === 'PARENCHYMA') && (
                      <g filter="url(#glowEffect)">
                        {/* RIGHT & LEFT COMMON CAROTID ARTERIES */}
                        <path
                          d="M 210 350 L 210 230 Q 180 190 150 170 M 250 350 L 250 230 Q 280 190 310 170"
                          fill="none"
                          stroke="#EF4444"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                        <circle cx="210" cy="230" r="12" fill="#F87171" />
                        <circle cx="250" cy="230" r="12" fill="#F87171" />
                      </g>
                    )}

                    {/* HYPOTHALAMIC THERMAL & THIRST CENTER (IN HISTOLOGY OR SAGITTAL VIEW) */}
                    {(activeLayer === 'HISTOLOGY' || rotationAngle === 270) && (
                      <g>
                        <circle cx="230" cy="180" r="28" fill="rgba(6, 182, 212, 0.4)" stroke="#06B6D4" strokeWidth="3" />
                        <text x="185" y="184" fill="#06B6D4" fontSize="11" fontWeight="900">
                          HYPOTHALAMUS
                        </text>
                      </g>
                    )}
                  </g>
                </svg>
              )}

              {/* ========================================================= */}
              {/* 2. LIVER, HEPATO-BILIARY & GALLBLADDER (HD ARTWORK) */}
              {/* ========================================================= */}
              {selectedSystemId === 'organ-liver' && (
                <svg viewBox="0 0 460 380" className="w-full h-full max-h-[350px]">
                  <defs>
                    <radialGradient id="liverParenchymaGrad" cx="45%" cy="40%" r="65%">
                      <stop offset="0%" stopColor="#34D399" />
                      <stop offset="70%" stopColor="#059669" />
                      <stop offset="100%" stopColor="#064E3B" />
                    </radialGradient>
                  </defs>
                  <g className="transition-transform duration-500">
                    {/* ANATOMICAL HEPATIC PARENCHYMA LOBES */}
                    <path
                      d="M 95 160 C 135 75, 335 75, 385 165 C 410 210, 365 295, 275 305 C 195 315, 105 265, 95 160 Z"
                      fill="url(#liverParenchymaGrad)"
                      stroke="#A7F3D0"
                      strokeWidth="4"
                    />

                    {/* FALCIFORM LIGAMENT SEPARATION */}
                    <path d="M 285 90 Q 290 195 295 305" stroke="#6EE7B7" strokeWidth="3" strokeDasharray="6 4" />

                    {/* GALLBLADDER WITH CYSTIC DUCT */}
                    <g>
                      <path d="M 270 240 Q 275 270 280 295" stroke="#F59E0B" strokeWidth="4" />
                      <ellipse
                        cx="285"
                        cy="300"
                        rx="22"
                        ry="32"
                        fill="#F59E0B"
                        stroke="#FEF3C7"
                        strokeWidth="3"
                      />
                      <text x="250" y="350" fill="#F59E0B" fontSize="12" fontWeight="900">
                        GALLBLADDER (CARDUUS MARIANUS)
                      </text>
                    </g>

                    {/* PORTAL VEIN TRIAD PLEXUS */}
                    <path
                      d="M 260 250 Q 235 200 170 145 M 260 250 Q 285 200 340 155"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="5"
                    />
                  </g>
                </svg>
              )}

              {/* ========================================================= */}
              {/* 3. KIDNEYS, RENAL CORTEX & MEDULLARY PYRAMIDS (HD ARTWORK) */}
              {/* ========================================================= */}
              {selectedSystemId === 'organ-kidneys' && (
                <svg viewBox="0 0 460 380" className="w-full h-full max-h-[350px]">
                  <defs>
                    <radialGradient id="renalTissueGrad" cx="50%" cy="50%" r="60%">
                      <stop offset="0%" stopColor="#22D3EE" />
                      <stop offset="100%" stopColor="#0E7490" />
                    </radialGradient>
                  </defs>
                  <g>
                    {/* LEFT & RIGHT RENAL PARENCHYMA SHAPES */}
                    <path
                      d="M 145 105 C 105 135, 105 245, 155 275 C 195 295, 225 245, 205 195 C 225 155, 185 85, 145 105 Z"
                      fill="url(#renalTissueGrad)"
                      stroke="#CFFAFE"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M 315 105 C 275 85, 235 155, 255 195 C 235 245, 265 295, 305 275 C 355 245, 355 135, 315 105 Z"
                      fill="url(#renalTissueGrad)"
                      stroke="#CFFAFE"
                      strokeWidth="3.5"
                    />

                    {/* MEDULLARY PYRAMIDS & RENAL PELVIS */}
                    <circle cx="160" cy="190" r="22" fill="#0891B2" stroke="#67E8F9" strokeWidth="2" />
                    <circle cx="300" cy="190" r="22" fill="#0891B2" stroke="#67E8F9" strokeWidth="2" />

                    {/* URETERS DOWNWARD */}
                    <path d="M 195 200 Q 205 280 205 350" stroke="#22D3EE" strokeWidth="4" strokeDasharray="6 4" />
                    <path d="M 265 200 Q 255 280 255 350" stroke="#22D3EE" strokeWidth="4" strokeDasharray="6 4" />
                  </g>
                </svg>
              )}

              {/* ========================================================= */}
              {/* 4. CARDIOVASCULAR & CORONARY NETWORK (HD ARTWORK) */}
              {/* ========================================================= */}
              {selectedSystemId === 'organ-heart' && (
                <svg viewBox="0 0 460 380" className="w-full h-full max-h-[350px]">
                  <defs>
                    <radialGradient id="cardiacTissueGrad" cx="45%" cy="45%" r="60%">
                      <stop offset="0%" stopColor="#F87171" />
                      <stop offset="100%" stopColor="#991B1B" />
                    </radialGradient>
                  </defs>
                  <g>
                    {/* MYOCARDIAL VENTRICULAR WALLS */}
                    <path
                      d="M 230 115 C 160 85, 120 185, 175 275 Q 230 340 285 275 C 340 185, 300 85, 230 115 Z"
                      fill="url(#cardiacTissueGrad)"
                      stroke="#FCA5A5"
                      strokeWidth="4"
                    />

                    {/* ASCENDING AORTA & PULMONARY ARCH */}
                    <path d="M 215 125 C 215 50, 260 50, 260 120" fill="none" stroke="#EF4444" strokeWidth="14" />

                    {/* CORONARY INTERVENTRICULAR ARTERIES (CACTUS GRANDIFLORUS LOUS) */}
                    <path
                      d="M 230 115 Q 220 200 240 290 M 230 145 Q 185 210 180 250 M 230 170 Q 280 215 285 255"
                      fill="none"
                      stroke="#FEE2E2"
                      strokeWidth="3.5"
                    />
                  </g>
                </svg>
              )}
            </div>

            {/* INTERACTIVE HOTSPOT PINS OVER THE SPATIAL VIEWPORT */}
            <div className="absolute inset-0 pointer-events-none">
              {(activeView.hotspots || []).map((hs: any) => {
                const isSelected = selectedHotspotId === hs.id;
                return (
                  <button
                    key={hs.id}
                    onClick={() => setSelectedHotspotId(hs.id)}
                    className={`pointer-events-auto absolute transform -translate-x-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-full text-xs font-black shadow-2xl transition-all cursor-pointer flex items-center space-x-2 ${hs.coords} ${
                      isSelected
                        ? 'bg-emerald-500 text-white scale-110 ring-4 ring-emerald-500/40'
                        : 'bg-blue-600/95 text-white hover:bg-blue-500 hover:scale-105'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                    <span>{hs.label}</span>
                  </button>
                );
              })}
            </div>

            {/* VIEWPORT BOTTOM ANGLE FOOTER */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>HD SPATIAL VIEW: {activeView.title}</span>
              <span className="text-emerald-400 font-black">
                CLICK ANY NODE PIN TO INSPECT TISSUE PATHOLOGY
              </span>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-slate-300">
            {activeView.desc}
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
                const hs = (activeView.hotspots || []).find((h: any) => h.id === selectedHotspotId);
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

          {/* DR. BURNETT & RADEMACHER ORGANOPATHY REMEDY DOSING GUIDANCE */}
          <div
            className={`p-5 rounded-2xl border space-y-3 ${
              isLight
                ? 'bg-white border-slate-200 shadow-2xs'
                : 'bg-[#0B0F19] border-slate-800'
            }`}
          >
            <span className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 block border-b pb-2 border-slate-200 dark:border-slate-800">
              🌿 DR. BURNETT ORGANOPATHY TISSUE DRAINAGE TIER
            </span>

            <div className="space-y-2.5">
              {activeSystem.organopathyRemedies.map((rem) => (
                <div
                  key={rem.name}
                  className={`p-3.5 rounded-xl border space-y-1 ${
                    isLight
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-[#05070A] border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-emerald-700 dark:text-emerald-400">
                      {rem.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded font-black bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
                      {rem.potency}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
                    {rem.keynote}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interactive360AnatomyAtlas;

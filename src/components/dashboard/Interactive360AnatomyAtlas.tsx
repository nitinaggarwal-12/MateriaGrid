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
  const [yaw, setYaw] = useState<number>(0); // 0° to 360° continuous horizontal orbit
  const [pitch, setPitch] = useState<number>(10); // -40° to +40° vertical pitch
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const lastTouchRef = useRef<{ x: number; y: number } | null>(null);

  const [activeLayer, setActiveLayer] = useState<LayerFilterMode>('PARENCHYMA');
  const [zoomLevel, setZoomLevel] = useState<number>(105);
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>('hs-carotid-plexus');

  // MOUSE & TOUCHPAD INTERACTIVE ORBIT CONTROLLER
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setYaw((prev) => {
      const next = (prev + e.movementX * 0.95) % 360;
      return next < 0 ? next + 360 : next;
    });
    setPitch((prev) => Math.max(-35, Math.min(35, prev - e.movementY * 0.6)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // TOUCHPAD / TOUCH GESTURE ORBIT CONTROLLER
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

  // MOUSE WHEEL SCROLL ZOOM
  const handleWheel = (e: React.WheelEvent) => {
    setZoomLevel((z) => Math.max(70, Math.min(220, z - e.deltaY * 0.12)));
  };

  // Determine current anatomical perspective orientation label based on yaw angle
  const getPerspectiveLabel = (angle: number) => {
    const normalized = ((angle % 360) + 360) % 360;
    if (normalized >= 315 || normalized < 45) return '0° ANTERIOR FRONTAL VIEW';
    if (normalized >= 45 && normalized < 135) return '90° RIGHT LATERAL PROFILE';
    if (normalized >= 135 && normalized < 225) return '180° POSTERIOR DORSAL BACK VIEW';
    return '270° LEFT LATERAL SAGITTAL PROFILE';
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
      hotspots: [
        {
          id: 'hs-carotid-plexus',
          label: 'Carotid Arterial Surge Plexus',
          rubric: 'HEAD - CONGESTION - blood - surge of',
          remedy: 'Belladonna 30C / 200C',
          note: 'Sudden throbbing carotid artery pulsation, dilated pupils, flushed red face, cerebral congestion.',
          coords: 'top-[44%] left-[48%]',
        },
        {
          id: 'hs-frontal-cortex',
          label: 'Frontal Cortex & Psoric Emotional Stress',
          rubric: 'MIND - ANXIETY - future, about',
          remedy: 'Aconite / Arsenicum Album',
          note: 'Ectodermal neural locus of acute mental restlessness and anticipation fear.',
          coords: 'top-[24%] left-[48%]',
        },
        {
          id: 'hs-occipital',
          label: 'Occipital-Cervical Neural Junction',
          rubric: 'HEAD - PAIN - occiput - extending to forehead',
          remedy: 'Gelsemium Sempervirens 30C',
          note: 'Dull heavy occipital headache spreading forward over eyes with muscle eyelids heaviness.',
          coords: 'top-[60%] left-[62%]',
        },
        {
          id: 'hs-hypothalamus',
          label: 'Hypothalamic Thermal & Thirst Center',
          rubric: 'GENERALITIES - HEAT - flushes of',
          remedy: 'Vijayakar Thermal-Thirst Constant Filter',
          note: 'Immutable baseline regulator governing thermal baseline (Hot/Chilly) and thirst dynamics.',
          coords: 'top-[50%] left-[46%]',
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
        {
          id: 'hs-portal-vein',
          label: 'Portal Vein Vascular Axis',
          rubric: 'GENERALITIES - VARICOSE veins',
          remedy: 'Carduus Marianus / Lycopodium',
          note: 'Portal hypertension and venous back-pressure.',
          coords: 'top-[48%] left-[50%]',
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
            <span className="text-xs px-2.5 py-0.5 rounded-full font-black bg-blue-600 text-white flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>3D SPATIAL ORBIT ENGINE</span>
            </span>
            <span className="text-xs font-black text-emerald-500">
              ● Mouse / Touchpad Drag Rotation Active
            </span>
          </div>
          <h2 className="text-lg font-black mt-1 tracking-tight">
            INTERACTIVE 3D ANATOMICAL SPATIAL WORKBENCH • END-TO-END TOUCH &amp; MOUSE ORBIT
          </h2>
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
            💡 <strong>Touchpad / Mouse Drag:</strong> Click or touch anywhere on the 3D organ viewport and drag horizontally/vertically to rotate 360° end-to-end.
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
                {getPerspectiveLabel(yaw)}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-black bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Yaw: {Math.round(yaw)}° | Pitch: {Math.round(pitch)}°
              </span>
            </div>

            <div className="flex items-center space-x-1">
              {[
                { angle: 0, label: 'Front' },
                { angle: 90, label: 'Right' },
                { angle: 180, label: 'Back' },
                { angle: 270, label: 'Left' },
              ].map((btn) => (
                <button
                  key={btn.angle}
                  onClick={() => {
                    setYaw(btn.angle);
                    setPitch(10);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-black cursor-pointer transition-all ${
                    Math.abs(((yaw % 360) + 360) % 360 - btn.angle) < 25
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {btn.label} ({btn.angle}°)
                </button>
              ))}
              <button
                onClick={() => {
                  setYaw(0);
                  setPitch(10);
                  setZoomLevel(105);
                }}
                className="px-2 py-1 rounded-lg bg-slate-800 text-gray-400 hover:text-white text-[10px] font-black cursor-pointer"
                title="Reset Camera"
              >
                <RotateCcw className="w-3 h-3" />
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
            className={`relative w-full h-[430px] rounded-2xl bg-gradient-to-b from-[#060B14] via-[#0A1120] to-[#040810] border border-blue-500/40 flex flex-col items-center justify-center overflow-hidden p-4 shadow-2xl transition-colors ${
              isDragging ? 'cursor-grabbing border-blue-400 ring-2 ring-blue-500/30' : 'cursor-grab'
            }`}
          >
            {/* FLOATING DRAG INSTRUCTION HUD BADGE */}
            <div className="absolute top-3 left-3 z-20 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-600/90 text-white text-[11px] font-black shadow-lg pointer-events-none">
              <Move className="w-3.5 h-3.5 animate-pulse" />
              <span>DRAG MOUSE OR TOUCHPAD TO ROTATE 360° END-TO-END</span>
            </div>

            {/* AMBIENT BIO-GRID */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="medicalGridDrag" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#3B82F6" strokeWidth="0.6" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#medicalGridDrag)" />
              </svg>
            </div>

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
                  <svg viewBox="0 0 460 380" className="w-full h-full max-h-[350px]">
                    <defs>
                      <radialGradient id="brainTissueGradDrag" cx="50%" cy="40%" r="60%">
                        <stop offset="0%" stopColor="#D8B4FE" />
                        <stop offset="60%" stopColor="#A855F7" />
                        <stop offset="100%" stopColor="#6B21A8" />
                      </radialGradient>
                    </defs>
                    <g>
                      <path
                        d="M 230 45 C 130 45, 80 115, 85 185 C 90 240, 135 275, 205 275 L 205 320 L 255 320 L 255 275 C 325 275, 370 240, 375 185 C 380 115, 330 45, 230 45 Z"
                        fill="url(#brainTissueGradDrag)"
                        stroke="#E9D5FF"
                        strokeWidth="3.5"
                      />
                      <path d="M 230 45 L 230 275" stroke="#4C1D95" strokeWidth="3" strokeDasharray="6 4" />
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
                      <path
                        d="M 140 245 C 160 280, 200 290, 220 270 M 320 245 C 300 280, 260 290, 240 270"
                        fill="none"
                        stroke="#9333EA"
                        strokeWidth="4"
                      />
                      <path
                        d="M 215 270 L 215 350 L 245 350 L 245 270 Z"
                        fill="#9333EA"
                        stroke="#E9D5FF"
                        strokeWidth="2"
                      />
                      {(activeLayer === 'VASCULAR' || activeLayer === 'PARENCHYMA') && (
                        <g>
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
                    </g>
                  </svg>
                )}

                {/* 2. LIVER & HEPATO-BILIARY */}
                {selectedSystemId === 'organ-liver' && (
                  <svg viewBox="0 0 460 380" className="w-full h-full max-h-[350px]">
                    <defs>
                      <radialGradient id="liverParenchymaGradDrag" cx="45%" cy="40%" r="65%">
                        <stop offset="0%" stopColor="#34D399" />
                        <stop offset="70%" stopColor="#059669" />
                        <stop offset="100%" stopColor="#064E3B" />
                      </radialGradient>
                    </defs>
                    <g>
                      <path
                        d="M 95 160 C 135 75, 335 75, 385 165 C 410 210, 365 295, 275 305 C 195 315, 105 265, 95 160 Z"
                        fill="url(#liverParenchymaGradDrag)"
                        stroke="#A7F3D0"
                        strokeWidth="4"
                      />
                      <path d="M 285 90 Q 290 195 295 305" stroke="#6EE7B7" strokeWidth="3" strokeDasharray="6 4" />
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
                      </g>
                      <path
                        d="M 260 250 Q 235 200 170 145 M 260 250 Q 285 200 340 155"
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth="5"
                      />
                    </g>
                  </svg>
                )}

                {/* 3. KIDNEYS & RENAL TRACT */}
                {selectedSystemId === 'organ-kidneys' && (
                  <svg viewBox="0 0 460 380" className="w-full h-full max-h-[350px]">
                    <defs>
                      <radialGradient id="renalTissueGradDrag" cx="50%" cy="50%" r="60%">
                        <stop offset="0%" stopColor="#22D3EE" />
                        <stop offset="100%" stopColor="#0E7490" />
                      </radialGradient>
                    </defs>
                    <g>
                      <path
                        d="M 145 105 C 105 135, 105 245, 155 275 C 195 295, 225 245, 205 195 C 225 155, 185 85, 145 105 Z"
                        fill="url(#renalTissueGradDrag)"
                        stroke="#CFFAFE"
                        strokeWidth="3.5"
                      />
                      <path
                        d="M 315 105 C 275 85, 235 155, 255 195 C 235 245, 265 295, 305 275 C 355 245, 355 135, 315 105 Z"
                        fill="url(#renalTissueGradDrag)"
                        stroke="#CFFAFE"
                        strokeWidth="3.5"
                      />
                      <circle cx="160" cy="190" r="22" fill="#0891B2" stroke="#67E8F9" strokeWidth="2" />
                      <circle cx="300" cy="190" r="22" fill="#0891B2" stroke="#67E8F9" strokeWidth="2" />
                      <path d="M 190 200 Q 205 280 205 350" stroke="#22D3EE" strokeWidth="4" strokeDasharray="6 4" />
                      <path d="M 265 200 Q 255 280 255 350" stroke="#22D3EE" strokeWidth="4" strokeDasharray="6 4" />
                    </g>
                  </svg>
                )}

                {/* 4. CARDIOVASCULAR & CORONARY NETWORK */}
                {selectedSystemId === 'organ-heart' && (
                  <svg viewBox="0 0 460 380" className="w-full h-full max-h-[350px]">
                    <defs>
                      <radialGradient id="cardiacTissueGradDrag" cx="45%" cy="45%" r="60%">
                        <stop offset="0%" stopColor="#F87171" />
                        <stop offset="100%" stopColor="#991B1B" />
                      </radialGradient>
                    </defs>
                    <g>
                      <path
                        d="M 230 115 C 160 85, 120 185, 175 275 Q 230 340 285 275 C 340 185, 300 85, 230 115 Z"
                        fill="url(#cardiacTissueGradDrag)"
                        stroke="#FCA5A5"
                        strokeWidth="4"
                      />
                      <path d="M 215 125 C 215 50, 260 50, 260 120" fill="none" stroke="#EF4444" strokeWidth="14" />
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
            </div>

            {/* INTERACTIVE HOTSPOT PINS OVER THE SPATIAL VIEWPORT */}
            <div className="absolute inset-0 pointer-events-none">
              {(activeSystem.hotspots || []).map((hs: any) => {
                const isSelected = selectedHotspotId === hs.id;
                return (
                  <button
                    key={hs.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedHotspotId(hs.id);
                    }}
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
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-400 font-mono pointer-events-none">
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

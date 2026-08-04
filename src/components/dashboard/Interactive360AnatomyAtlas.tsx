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
} from 'lucide-react';

interface Interactive360AnatomyAtlasProps {
  theme?: 'dark' | 'light';
}

type RenderLayerMode = 'PARENCHYMA' | 'VASCULAR' | 'HISTOLOGY';

export const Interactive360AnatomyAtlas: React.FC<
  Interactive360AnatomyAtlasProps
> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';

  const [selectedSystemId, setSelectedSystemId] = useState<string>('organ-liver');
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [renderMode, setRenderMode] = useState<RenderLayerMode>('PARENCHYMA');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(null);

  const ORGAN_SYSTEMS = [
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
              note: 'Primary target for Chelidonium right scapular nerve referral pain.',
              coords: 'top-[35%] left-[45%]',
            },
            {
              id: 'hs-gallbladder',
              label: 'Gallbladder & Common Bile Duct',
              rubric: 'ABDOMEN - GALLBLADDER - complaints of',
              remedy: 'Carduus Marianus Q',
              note: 'Biliary stasis and portal vein congestion relief.',
              coords: 'top-[62%] left-[55%]',
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
              coords: 'top-[45%] left-[50%]',
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
              note: 'Right-sided metabolic hepatic enlargement.',
              coords: 'top-[30%] left-[50%]',
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
          desc: 'Frontal longitudinal cross section showing Renal Cortex, Medullary Pyramids, and Pelvis.',
          hotspots: [
            {
              id: 'hs-renal-cortex',
              label: 'Glomerular Renal Cortex',
              rubric: 'URINARY ORGANS - KIDNEYS - inflammation',
              remedy: 'Solidago Virgaurea Q / 3X',
              note: 'Burnett Kidney Drainage: Tender renal zone on pressure, albuminuria.',
              coords: 'top-[30%] left-[50%]',
            },
            {
              id: 'hs-ureter',
              label: 'Ureteric Colic Junction',
              rubric: 'URINARY ORGANS - URETERS - pain - radiating',
              remedy: 'Berberis Vulgaris Q / 6X',
              note: 'Radiating stone colic down ureter to thigh and testicle.',
              coords: 'top-[70%] left-[52%]',
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
          desc: 'Anterior view showing frontal lobes, meningeal vascular plexus, and carotid sinus.',
          hotspots: [
            {
              id: 'hs-carotid-plexus',
              label: 'Carotid Arterial Surge Plexus',
              rubric: 'HEAD - CONGESTION - blood - surge of',
              remedy: 'Belladonna 30C / 200C',
              note: 'Sudden throbbing carotid headache, dilated pupils, red face.',
              coords: 'top-[35%] left-[50%]',
            },
          ],
        },
        90: {
          title: '90° Lateral Brainstem & Occipital Cortex Profile',
          desc: 'Profile showing Occipital lobe, Cerebellum, Vagus Nerve nuclei, and Cervical Spine.',
          hotspots: [
            {
              id: 'hs-occipital',
              label: 'Occipital-Cervical Neural Junction',
              rubric: 'HEAD - PAIN - occiput - extending to forehead',
              remedy: 'Gelsemium Sempervirens 30C',
              note: 'Dull heavy occipital headache spreading forward over eyes.',
              coords: 'top-[55%] left-[58%]',
            },
          ],
        },
        180: {
          title: '180° Posterior Meningeal & Cerebellar Surface',
          desc: 'Dorsal cortex aspect showing occipital protuberance and tentorium cerebelli.',
          hotspots: [
            {
              id: 'hs-glonoine',
              label: 'Cerebral Vascular Pulsation Zone',
              rubric: 'HEAD - PULSATING - sun, from heat of',
              remedy: 'Glonoine (Nitroglycerin) 6C / 30C',
              note: 'Surging cerebral heat, feels head would burst, worse sun.',
              coords: 'top-[42%] left-[50%]',
            },
          ],
        },
        270: {
          title: '270° Internal Midsagittal Brainstem & Limbic Cross-Section',
          desc: 'Internal cross-section showing Hypothalamus thermal center, Pituitary, and Basal Ganglia.',
          hotspots: [
            {
              id: 'hs-hypothalamus',
              label: 'Hypothalamic Thermal & Thirst Center',
              rubric: 'GENERALITIES - HEAT - flushes of',
              remedy: 'Vijayakar Thermal-Thirst Constant Filter',
              note: 'Regulates dynamic thermal and thirst constants.',
              coords: 'top-[48%] left-[49%]',
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
            'Surging cerebral congestion, pulse felt in every vessel, worse heat of sun.',
        },
        {
          name: 'Gelsemium Sempervirens',
          potency: '30C',
          keynote:
            'Dull heavy occipital headache spreading forward over head, eyelid ptosis, motor trembling.',
        },
      ],
    },
  ];

  const activeSystem =
    ORGAN_SYSTEMS.find((s) => s.id === selectedSystemId) || ORGAN_SYSTEMS[0];
  const activeView =
    (activeSystem.views as any)[rotationAngle] || activeSystem.views[0];

  return (
    <div
      className={`p-6 rounded-2xl border space-y-6 font-sans ${
        isLight
          ? 'bg-white border-slate-200 text-slate-900 shadow-2xs'
          : 'bg-[#0B0F19] border-[#1C1F26] text-white'
      }`}
    >
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs px-2.5 py-0.5 rounded font-black bg-blue-600 text-white">
            BHMS &amp; MD (HOM.) 360° TOP-CLASS INTERACTIVE SPATIAL ANATOMY &amp; ORGANOPATHY ATLAS
          </span>
          <h2 className="text-base font-black mt-1">
            VOLUMETRIC 360° INTERNAL ORGAN SPATIAL ROTATOR • MULTI-LAYER HISTOLOGY &amp; BURNETT ORGANOPATHY
          </h2>
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
            💡 Rotate the 360° Spatial Dial or switch Tissue Layer Modes (Volumetric Parenchyma vs Arterial Vascular Plexus vs Histological Cross-Section) to inspect deep tissue nodes and Burnett organ-affine remedies.
          </p>
        </div>

        {/* TOP LAYER RENDER MODE CONTROLS */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setRenderMode('PARENCHYMA')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center space-x-1.5 cursor-pointer transition-all ${
              renderMode === 'PARENCHYMA'
                ? 'bg-emerald-600 text-white shadow-xs'
                : isLight
                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Volumetric Tissue</span>
          </button>
          <button
            onClick={() => setRenderMode('VASCULAR')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center space-x-1.5 cursor-pointer transition-all ${
              renderMode === 'VASCULAR'
                ? 'bg-rose-600 text-white shadow-xs'
                : isLight
                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Vascular Plexus</span>
          </button>
          <button
            onClick={() => setRenderMode('HISTOLOGY')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center space-x-1.5 cursor-pointer transition-all ${
              renderMode === 'HISTOLOGY'
                ? 'bg-purple-600 text-white shadow-xs'
                : isLight
                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            <Microscope className="w-3.5 h-3.5" />
            <span>Sagittal Histology</span>
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
              }}
              className={`px-4 py-2.5 rounded-xl border text-xs font-black flex items-center space-x-2 transition-all cursor-pointer ${
                isSel
                  ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
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

      {/* 360° INTERACTIVE STAGE & HOTSPOT WORKBENCH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT CANVAS: 360° INTERNAL ORGAN ROTATOR VIEWER (7 COLUMNS) */}
        <div
          className={`lg:col-span-7 p-6 rounded-2xl border flex flex-col space-y-5 relative ${
            isLight
              ? 'bg-slate-50 border-slate-200'
              : 'bg-[#05070A] border-slate-800'
          }`}
        >
          {/* VIEWPORT CONTROLS */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3 border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                {activeView.title}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-black bg-blue-500/10 text-blue-500 border border-blue-500/30">
                MODE: {renderMode}
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
                      : isLight
                      ? 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                  }`}
                >
                  {angle}° {angle === 0 ? 'Front' : angle === 90 ? 'Lateral' : angle === 180 ? 'Back' : 'Section'}
                </button>
              ))}
            </div>
          </div>

          {/* SPATIAL ROTATION SLIDER CONTROL & ZOOM */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-2 py-1">
            <div className="flex items-center space-x-3 flex-1">
              <Compass className="w-4 h-4 text-blue-500 flex-shrink-0 animate-spin-slow" />
              <span className="text-[10px] font-black uppercase text-slate-500 dark:text-gray-400">
                360° Orbit Dial:
              </span>
              <input
                type="range"
                min="0"
                max="270"
                step="90"
                value={rotationAngle}
                onChange={(e) => setRotationAngle(Number(e.target.value))}
                className="flex-1 cursor-pointer accent-blue-600"
              />
              <span className="font-mono text-xs font-black text-blue-600 dark:text-blue-400 w-12 text-right">
                {rotationAngle}°
              </span>
            </div>

            <div className="flex items-center space-x-1 border-l pl-3 border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setZoomLevel((z) => Math.max(80, z - 20))}
                className="p-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-gray-300 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono font-black w-10 text-center">
                {zoomLevel}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(180, z + 20))}
                className="p-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-gray-300 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* VISUAL 360 ANATOMICAL ORGAN RENDER STAGE */}
          <div className="relative w-full h-[380px] rounded-2xl bg-gradient-to-b from-slate-900/20 via-blue-950/20 to-slate-900/30 border border-blue-500/30 flex flex-col items-center justify-center overflow-hidden p-4 shadow-inner">
            {/* SPATIAL ANATOMICAL SVG RENDERING */}
            <div
              className="w-full h-full flex items-center justify-center transition-all duration-500 ease-out"
              style={{
                transform: `scale(${zoomLevel / 100})`,
              }}
            >
              <svg
                viewBox="0 0 420 340"
                className="w-full h-full max-h-[320px] transition-transform duration-500 ease-out"
                style={{
                  transform: `rotateY(${rotationAngle}deg)`,
                }}
              >
                {/* BIO-TECH MEDICAL MATRIX GRID */}
                <defs>
                  <pattern
                    id="topClassAnatomyGrid"
                    width="24"
                    height="24"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 24 0 L 0 0 0 24"
                      fill="none"
                      stroke="rgba(59, 130, 246, 0.15)"
                      strokeWidth="0.8"
                    />
                  </pattern>
                  <radialGradient id="tissueGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="vascularGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="420" height="340" fill="url(#topClassAnatomyGrid)" />

                {/* DYNAMIC SHAPES PER SELECTED ORGAN & RENDER MODE */}
                {selectedSystemId === 'organ-liver' && (
                  <g className="transition-all duration-300">
                    {renderMode === 'VASCULAR' ? (
                      /* ARTERIAL & PORTAL VASCULAR PLEXUS MODE */
                      <g>
                        <circle cx="210" cy="170" r="110" fill="url(#vascularGlow)" />
                        {/* PORTAL VEIN AXIS */}
                        <path
                          d="M 210 270 Q 215 190 210 160 Q 200 130 150 95 M 210 160 Q 240 125 285 90"
                          fill="none"
                          stroke="#EF4444"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 210 270 Q 215 190 210 160 Q 200 130 150 95 M 210 160 Q 240 125 285 90"
                          fill="none"
                          stroke="#F87171"
                          strokeWidth="2"
                          strokeDasharray="6 4"
                        />
                        <circle cx="210" cy="160" r="14" fill="#EF4444" />
                        <text x="230" y="165" fill="#EF4444" fontSize="11" fontWeight="900">
                          PORTAL VEIN AXIS (CARDUUS MARIANUS)
                        </text>
                      </g>
                    ) : renderMode === 'HISTOLOGY' || rotationAngle === 270 ? (
                      /* HISTOLOGY TISSUE HEXAGONAL LOBULE */
                      <g>
                        <circle cx="210" cy="170" r="105" fill="url(#tissueGlow)" />
                        <polygon
                          points="210,65 295,115 295,225 210,275 125,225 125,115"
                          fill="rgba(16, 185, 129, 0.22)"
                          stroke="#10B981"
                          strokeWidth="3.5"
                        />
                        <circle cx="210" cy="170" r="36" fill="rgba(6, 182, 212, 0.3)" stroke="#06B6D4" strokeWidth="2.5" />
                        <text x="175" y="174" fill="#10B981" fontSize="11" fontWeight="900">
                          CENTRAL VEIN &amp; LOBULE
                        </text>
                      </g>
                    ) : (
                      /* VOLUMETRIC HEPATIC LOBES */
                      <g>
                        <circle cx="210" cy="170" r="120" fill="url(#tissueGlow)" />
                        <path
                          d="M 105 135 C 135 80, 275 80, 325 145 C 345 180, 315 245, 250 250 C 185 255, 115 220, 105 135 Z"
                          fill="rgba(16, 185, 129, 0.25)"
                          stroke="#10B981"
                          strokeWidth="3.5"
                        />
                        {/* FALCIFORM LIGAMENT SEPARATION */}
                        <path d="M 235 95 Q 240 170 245 250" stroke="#10B981" strokeWidth="2" strokeDasharray="5 4" />
                        {/* GALLBLADDER */}
                        <ellipse
                          cx="230"
                          cy="235"
                          rx="18"
                          ry="26"
                          fill="rgba(245, 158, 11, 0.35)"
                          stroke="#F59E0B"
                          strokeWidth="2.5"
                        />
                      </g>
                    )}
                  </g>
                )}

                {selectedSystemId === 'organ-kidneys' && (
                  <g className="transition-all duration-300">
                    {renderMode === 'VASCULAR' ? (
                      <g>
                        <path d="M 210 50 L 210 290" stroke="#EF4444" strokeWidth="6" />
                        <path d="M 210 150 L 160 150 M 210 180 L 260 180" stroke="#EF4444" strokeWidth="4" />
                        <text x="225" y="145" fill="#EF4444" fontSize="11" fontWeight="900">
                          RENAL ARTERY PLEXUS
                        </text>
                      </g>
                    ) : (
                      <g>
                        <path
                          d="M 155 105 C 125 125, 125 205, 165 225 C 195 235, 215 195, 200 165 C 215 135, 185 95, 155 105 Z"
                          fill="rgba(6, 182, 212, 0.25)"
                          stroke="#06B6D4"
                          strokeWidth="3.5"
                        />
                        <path
                          d="M 265 105 C 235 95, 205 135, 220 165 C 205 195, 225 235, 255 225 C 295 205, 295 125, 265 105 Z"
                          fill="rgba(6, 182, 212, 0.25)"
                          stroke="#06B6D4"
                          strokeWidth="3.5"
                        />
                        <path d="M 190 170 L 190 280" stroke="#06B6D4" strokeWidth="3" strokeDasharray="5 4" />
                        <path d="M 220 170 L 220 280" stroke="#06B6D4" strokeWidth="3" strokeDasharray="5 4" />
                      </g>
                    )}
                  </g>
                )}

                {selectedSystemId === 'organ-head' && (
                  <g className="transition-all duration-300">
                    <ellipse
                      cx="210"
                      cy="150"
                      rx="100"
                      ry="85"
                      fill="rgba(168, 85, 247, 0.22)"
                      stroke="#A855F7"
                      strokeWidth="3.5"
                    />
                    <path d="M 185 235 L 185 165" stroke="#EF4444" strokeWidth="4" />
                    <path d="M 235 235 L 235 165" stroke="#EF4444" strokeWidth="4" />
                  </g>
                )}
              </svg>
            </div>

            {/* INTERACTIVE HOTSPOT PINS OVER THE SPATIAL VIEWPORT */}
            <div className="absolute inset-0 pointer-events-none">
              {(activeView.hotspots || []).map((hs: any) => {
                const isSelected = selectedHotspotId === hs.id;
                return (
                  <button
                    key={hs.id}
                    onClick={() => setSelectedHotspotId(hs.id)}
                    className={`pointer-events-auto absolute transform -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full text-xs font-black shadow-xl transition-all cursor-pointer flex items-center space-x-1.5 ${hs.coords} ${
                      isSelected
                        ? 'bg-emerald-500 text-white scale-110 ring-4 ring-emerald-500/30'
                        : 'bg-blue-600/90 text-white hover:bg-blue-500 hover:scale-105'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>{hs.label}</span>
                  </button>
                );
              })}
            </div>

            {/* VIEWPORT BOTTOM ANGLE FOOTER */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-slate-500 dark:text-gray-400 font-mono">
              <span>VIEW: {activeView.title}</span>
              <span>CLICK ANY NODE PIN TO INSPECT ORGAN-AFFINE REMEDY</span>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-slate-600 dark:text-gray-300">
            {activeView.desc}
          </p>
        </div>

        {/* RIGHT COLUMN: SELECTED TISSUE NODE HOTSPOT & DR. BURNETT ORGANOPATHY REMEDIES (5 COLUMNS) */}
        <div className="lg:col-span-5 space-y-4">
          {/* HOTSPOT DETAIL INSPECTOR */}
          <div
            className={`p-5 rounded-2xl border space-y-3 ${
              isLight
                ? 'bg-slate-50 border-slate-200'
                : 'bg-[#05070A] border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-slate-800">
              <span className="text-xs font-black uppercase text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4" /> SELECTED TISSUE HISTOLOGY NODE
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-black border ${activeSystem.layerBadge}`}>
                {activeSystem.layer}
              </span>
            </div>

            {selectedHotspotId ? (
              (() => {
                const hs = (activeView.hotspots || []).find((h: any) => h.id === selectedHotspotId);
                if (!hs) return null;
                return (
                  <div className="space-y-2.5 text-xs">
                    <p className="font-black text-sm text-blue-600 dark:text-blue-400">
                      {hs.label}
                    </p>
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-mono">
                      <span className="font-black block text-[10px] uppercase">
                        Organ-Affine Organopathy Remedy:
                      </span>
                      <span className="text-sm font-black">{hs.remedy}</span>
                    </div>
                    <p className="text-slate-600 dark:text-gray-300">
                      <strong>Repertory Rubric:</strong> <code>{hs.rubric}</code>
                    </p>
                    <p className="text-slate-600 dark:text-gray-300">
                      <strong>Clinical Anatomy Note:</strong> {hs.note}
                    </p>
                  </div>
                );
              })()
            ) : (
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-center space-y-1">
                <Info className="w-5 h-5 text-blue-400 mx-auto" />
                <p className="text-xs font-black text-blue-600 dark:text-blue-300">
                  Click any blue or emerald tissue pin on the 360° organ model to inspect histological depth and Dr. Burnett tissue remedies.
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
                  className={`p-3 rounded-xl border space-y-1 ${
                    isLight
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-[#05070A] border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs text-emerald-700 dark:text-emerald-400">
                      {rem.name}
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded font-black bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
                      {rem.potency}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-gray-400">
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

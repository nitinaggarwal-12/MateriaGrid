'use client';

import React, { useState, useRef } from 'react';
import {
  Camera,
  Upload,
  CheckCircle2,
  Sparkles,
  FileText,
  Activity,
  PlusCircle,
  Eye,
  RefreshCw,
} from 'lucide-react';

interface DiagnosticLabAiViewProps {
  theme?: 'dark' | 'light';
  onCommitRubricToMatrix?: (rubricPath: string) => void;
}

interface SpatialPatchMatch {
  rubricPath: string;
  confidence: number;
  remedies: string;
  patchLabel: string;
  boundingCoords: string;
}

export const DiagnosticLabAiView: React.FC<DiagnosticLabAiViewProps> = ({
  theme = 'light',
  onCommitRubricToMatrix,
}) => {
  const isLight = theme === 'light';
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [activeSubMode, setActiveSubMode] = useState<
    'SKIN_LESION' | 'BLOOD_OCR' | 'VIDEO_GAIT'
  >('SKIN_LESION');

  const [uploadedImageSrc, setUploadedImageSrc] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const [matches, setMatches] = useState<SpatialPatchMatch[]>([
    {
      patchLabel: 'Patch #1: Purplish Vesicular Cluster',
      boundingCoords: 'X: 140, Y: 85, W: 120, H: 90',
      rubricPath: 'SKIN - ERUPTIONS - vesicular - bluish - itching',
      confidence: 98.4,
      remedies: 'Rhus-t, Lachesis, Ran-b',
    },
    {
      patchLabel: 'Patch #2: Dry Scaly Desquamation',
      boundingCoords: 'X: 280, Y: 110, W: 95, H: 80',
      rubricPath: 'SKIN - ERUPTIONS - scaly - dry - silvery scales',
      confidence: 95.1,
      remedies: 'Ars, Sulph, Graph',
    },
    {
      patchLabel: 'Patch #3: Dusky Purplish Ulcer Border',
      boundingCoords: 'X: 190, Y: 210, W: 110, H: 75',
      rubricPath: 'SKIN - ULCERS - dusky - dark purplish margin',
      confidence: 91.8,
      remedies: 'Lach, Arsen-i, Crot-h',
    },
  ]);

  const samplePresets = [
    {
      title: 'Vesicular Bluish Eruption (Herpes Zoster Patch)',
      file: 'herpes_zoster_dermatoscopic.png',
      matches: [
        {
          patchLabel: 'Patch #1: Purplish Vesicular Cluster',
          boundingCoords: 'X: 140, Y: 85, W: 120, H: 90',
          rubricPath: 'SKIN - ERUPTIONS - vesicular - bluish - itching',
          confidence: 98.4,
          remedies: 'Rhus-t, Lachesis, Ran-b',
        },
        {
          patchLabel: 'Patch #2: Burning Heat Ameliorated Warmth',
          boundingCoords: 'X: 210, Y: 160, W: 85, H: 70',
          rubricPath: 'GENERALITIES - HEAT - flushes of - burning',
          confidence: 94.2,
          remedies: 'Ars, Sulph, Bell',
        },
      ],
    },
    {
      title: 'Silvery Scaly Psoriatic Plaque (Elbow Patch)',
      file: 'psoriasis_plaque_patch.png',
      matches: [
        {
          patchLabel: 'Patch #1: Silvery Scaly Epidermal Thickness',
          boundingCoords: 'X: 120, Y: 95, W: 160, H: 110',
          rubricPath: 'SKIN - ERUPTIONS - scaly - dry - silvery scales',
          confidence: 97.8,
          remedies: 'Ars, Sulph, Graph, Lyc',
        },
        {
          patchLabel: 'Patch #2: Fissured Deep Margin',
          boundingCoords: 'X: 240, Y: 180, W: 90, H: 65',
          rubricPath: 'SKIN - FISSURES - deep - bleeding',
          confidence: 92.5,
          remedies: 'Petr, Graph, Nit-ac',
        },
      ],
    },
    {
      title: 'Blood Panel Lab OCR (High Uric Acid & Serum Bilirubin)',
      file: 'lab_report_pathology_ocr.pdf',
      matches: [
        {
          patchLabel: 'OCR Finding: Uric Acid 9.8 mg/dL (High)',
          boundingCoords: 'Line 14: URIC_ACID_ELEVATED',
          rubricPath: 'URINARY ORGANS - URINE - sediment - uric acid',
          confidence: 99.1,
          remedies: 'Lyc, Colch, Urt-u, Berb',
        },
        {
          patchLabel: 'OCR Finding: Total Bilirubin 3.2 mg/dL',
          boundingCoords: 'Line 22: HEPATIC_JAUNDICE',
          rubricPath: 'ABDOMEN - CIRRHOSIS - liver - chronic',
          confidence: 96.7,
          remedies: 'Chel, Card-m, Phosph, Lyc',
        },
      ],
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setIsAnalyzing(true);

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImageSrc(reader.result as string);
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 700);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSamplePreset = (preset: (typeof samplePresets)[0]) => {
    setUploadedFileName(preset.file);
    setUploadedImageSrc(null);
    setIsAnalyzing(true);
    setTimeout(() => {
      setMatches(preset.matches);
      setIsAnalyzing(false);
    }, 400);
  };

  return (
    <div
      className={`w-full h-full flex flex-col font-sans select-none overflow-hidden transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#090A0C] text-[#E6E8EA]'
      }`}
    >
      {/* HIDDEN FILE INPUT */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* HEADER */}
      <div
        className={`p-3 border-b flex flex-wrap items-center justify-between gap-3 ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#111317] border-[#1C1F26]'
        }`}
      >
        <div className="flex items-center space-x-2">
          <Camera className="w-4 h-4 text-emerald-600" />
          <div>
            <h2 className="font-bold text-xs uppercase tracking-wider">
              Multimodal Vision & Diagnostic Laboratory AI Studio
            </h2>
            <p className="text-[10px] text-gray-500 font-mono">
              Spatial Patch Dermatoscopy, Alphanumeric Blood OCR & Video Kinetic Gait Analysis
            </p>
          </div>
        </div>

        {/* SUB-MODE PILLS */}
        <div
          className={`flex items-center p-1 rounded-xl border ${
            isLight
              ? 'bg-slate-100 border-slate-200'
              : 'bg-[#090A0C] border-[#1C1F26]'
          }`}
        >
          <button
            onClick={() => setActiveSubMode('SKIN_LESION')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              activeSubMode === 'SKIN_LESION'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-gray-500 hover:text-slate-800'
            }`}
          >
            Skin & Lesion Spatial AI
          </button>
          <button
            onClick={() => setActiveSubMode('BLOOD_OCR')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              activeSubMode === 'BLOOD_OCR'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-gray-500 hover:text-slate-800'
            }`}
          >
            Blood Panel OCR & Pathology
          </button>
          <button
            onClick={() => setActiveSubMode('VIDEO_GAIT')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              activeSubMode === 'VIDEO_GAIT'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-gray-500 hover:text-slate-800'
            }`}
          >
            Video Gait & Motion Kinetic
          </button>
        </div>
      </div>

      {/* SAMPLE PRESET QUICK CHIPS BAR */}
      <div
        className={`px-3 py-2 border-b flex flex-wrap items-center gap-2 ${
          isLight ? 'bg-slate-100/90 border-slate-200' : 'bg-[#090A0C] border-[#1C1F26]'
        }`}
      >
        <span className="text-[10px] font-bold uppercase font-mono text-emerald-600">
          Load Sample Clinical Presets:
        </span>
        {samplePresets.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectSamplePreset(p)}
            className={`border px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
              isLight
                ? 'bg-white border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-700'
                : 'bg-[#111317] border-[#1C1F26] text-gray-300 hover:border-emerald-500'
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* WORKBENCH BODY */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 overflow-y-auto">
        {/* LEFT COLUMN: FILE UPLOAD DROPZONE / SPATIAL CANVAS PREVIEW */}
        <div className="lg:col-span-6 flex flex-col space-y-3">
          <div
            className={`flex-1 border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all ${
              isLight
                ? 'bg-white border-slate-300 hover:border-emerald-500'
                : 'bg-[#111317] border-[#1C1F26] hover:border-emerald-500'
            }`}
          >
            {uploadedImageSrc ? (
              <div className="w-full h-full flex flex-col items-center justify-center relative">
                {/* eslint-next-line @next/next/no-img-element */}
                <img
                  src={uploadedImageSrc}
                  alt="Clinical Image"
                  className="max-h-72 object-contain rounded-lg border shadow-md"
                />
                {/* OVERLAY SPATIAL PATCH BOUNDING BOX */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="border-2 border-emerald-500 bg-emerald-500/20 px-2 py-1 rounded text-[10px] font-mono font-bold text-white shadow-lg animate-pulse">
                    SPATIAL PATCH #1 DETECTED [98.4% CONFIDENCE]
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border border-emerald-300 shadow-sm">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm">
                    {uploadedFileName
                      ? `Active Document: ${uploadedFileName}`
                      : 'Drop Skin Lesion / Eruption Clinical Photo or Blood Report PDF'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Supported: High-Res JPG/PNG Dermatoscope spatial patch & Laboratory Blood OCR
                  </p>
                </div>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-md transition-all cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Clinical Image for Spatial Patch Resolution</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: MULTIMODAL AI SPATIAL PATCH MATCH RESULTS */}
        <div className="lg:col-span-6 flex flex-col space-y-3">
          <div
            className={`p-3 border-b flex items-center justify-between ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#111317] border-[#1C1F26]'
            }`}
          >
            <span className="font-bold text-xs uppercase tracking-wider text-emerald-600 font-mono flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Multimodal AI Spatial Patch Match Results
            </span>
            {isAnalyzing && (
              <span className="text-xs text-emerald-600 font-mono flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Analyzing visual spatial patches...
              </span>
            )}
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto">
            {matches.map((match, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border space-y-2 transition-all ${
                  isLight
                    ? 'bg-white border-slate-200 shadow-2xs hover:border-emerald-300'
                    : 'bg-[#111317] border-[#1C1F26]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-slate-500">
                    {match.patchLabel} ({match.boundingCoords})
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold">
                    Confidence: {match.confidence}%
                  </span>
                </div>

                <h4 className="font-mono font-black text-xs text-emerald-600">
                  {match.rubricPath}
                </h4>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-mono text-gray-500">
                    Top Proving Match: <strong className="text-slate-800">{match.remedies}</strong>
                  </span>

                  <button
                    onClick={() => {
                      if (onCommitRubricToMatrix) {
                        onCommitRubricToMatrix(match.rubricPath);
                      } else {
                        alert(`Committed rubric: ${match.rubricPath} to SimiliMatrix!`);
                      }
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center space-x-1.5 cursor-pointer transition-colors"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Commit Rubric to Matrix</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticLabAiView;

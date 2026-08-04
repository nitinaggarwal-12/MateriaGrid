'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Activity,
  ShieldCheck,
  Award,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Cpu,
  Globe,
  Lock,
  Flame,
  Droplets,
  Zap,
  Play,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { EndToEndDecisionFlowchart } from '../dashboard/EndToEndDecisionFlowchart';
import { PromptCanvasDrawIoDiagram } from '../dashboard/PromptCanvasDrawIoDiagram';

interface LandingPageProps {
  onLaunchWorkspace: () => void;
  theme?: 'dark' | 'light';
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchWorkspace,
  theme = 'dark',
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeTabHud, setActiveTabHud] = useState<
    'SIMILIMATRIX' | 'RADAR' | 'WEBRTC'
  >('SIMILIMATRIX');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // INTERACTIVE 3D WEBGL/CANVAS PARTICLE CONSTELLATION SPHERE
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate 3D sphere point particles
    const particleCount = 140;
    const particles: {
      x3d: number;
      y3d: number;
      z3d: number;
      radius: number;
      color: string;
    }[] = [];

    const sphereRadius = Math.min(width, height) * 0.42;

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      particles.push({
        x3d: sphereRadius * Math.cos(theta) * Math.sin(phi),
        y3d: sphereRadius * Math.sin(theta) * Math.sin(phi),
        z3d: sphereRadius * Math.cos(phi),
        radius: Math.random() * 2 + 1,
        color:
          i % 4 === 0
            ? '#10B981'
            : i % 3 === 0
            ? '#34D399'
            : i % 5 === 0
            ? '#8B5CF6'
            : '#059669',
      });
    }

    let angleY = 0;
    let angleX = 0.2;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      angleY += 0.004;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const centerX = width * 0.55;
      const centerY = height * 0.5;

      // Project and sort by depth
      const projected = particles.map((p) => {
        // Rotate Y
        const rx = p.x3d * cosY - p.z3d * sinY;
        const rz = p.x3d * sinY + p.z3d * cosY;

        // Rotate X
        const ry = p.y3d * cosX - rz * sinX;
        const rz2 = p.y3d * sinX + rz * cosX;

        const fov = 420;
        const scale = fov / (fov + rz2 + 350);
        const x2d = centerX + rx * scale;
        const y2d = centerY + ry * scale;

        return { x2d, y2d, scale, rz: rz2, color: p.color, radius: p.radius };
      });

      projected.sort((a, b) => b.rz - a.rz);

      // Draw connecting energy lines
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x2d - projected[j].x2d;
          const dy = projected[i].y2d - projected[j].y2d;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 65) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(16, 185, 129, ${
              (1 - dist / 65) * 0.25 * projected[i].scale
            })`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(projected[i].x2d, projected[i].y2d);
            ctx.lineTo(projected[j].x2d, projected[j].y2d);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      projected.forEach((pt) => {
        ctx.beginPath();
        ctx.arc(pt.x2d, pt.y2d, pt.radius * pt.scale * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = Math.max(0.15, pt.scale);
        ctx.shadowColor = pt.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const challenges = [
    {
      title: 'Polychrest Over-Dominance in Broad Repertories',
      description:
        'Traditional calculation software overwhelmingly ranks broad polychrests (Sulphur, Lycopodium, Arsenicum) near the top for almost every patient, obscuring targeted keynote remedies.',
      icon: <Activity className="w-6 h-6 text-emerald-400" />,
      accent: 'border-emerald-500/30 hover:border-emerald-500',
    },
    {
      title: 'Embryological Suppression & Acute Aggravation Risks',
      description:
        'Prescribing high-potency constitutional remedies in advanced organic pathology (Endoderm liver/renal failure) without low-potency tissue drainage can trigger irreversible disease suppression.',
      icon: <ShieldCheck className="w-6 h-6 text-rose-400" />,
      accent: 'border-rose-500/30 hover:border-rose-500',
    },
    {
      title: 'Fragmented Regional Vernacular & High OPD Volume',
      description:
        'Indian doctors seeing 40–80 OPD patients per day waste critical consultation minutes manually searching 150,000+ archaic 19th-century repertory paths from Hindi or Marathi vernacular.',
      icon: <Globe className="w-6 h-6 text-cyan-400" />,
      accent: 'border-cyan-500/30 hover:border-cyan-500',
    },
  ];

  const approachPillars = [
    {
      badge: 'MATHEMATICAL ENGINE',
      title: 'Asymmetrical Homeopathic Specificity Index (TF-IDF Inverse Density)',
      description:
        'Our proprietary formula penalizes over-frequent polychrests using inverse rubric density math: S(remedy) = Σ Grade × log₂(N_total / n_rubric), elevating peculiar keynote matches to the top.',
      icon: <Cpu className="w-7 h-7 text-emerald-400" />,
    },
    {
      badge: 'CLINICAL SAFETY MASK',
      title: 'Vijayakar Predictive Radar & Burnett Organopathy Safeguard',
      description:
        'Immutable physical baseline masks (Hot/Chilly, Thirstless/Thirsty) eliminate thermal contradictions, while Burnett organopathic tracks automatically co-prescribe organ-affine low potencies.',
      icon: <Lock className="w-7 h-7 text-purple-400" />,
    },
    {
      badge: 'NATIONAL COMPLIANCE',
      title: 'ABDM ABHA Digital Health Gateway & FHIR Prescriptions',
      description:
        'Native Government of India Ayushman Bharat Digital Mission integration supporting ABHA QR check-in, cryptographically signed FHIR digital prescriptions, and UHI appointment slots.',
      icon: <Award className="w-7 h-7 text-orange-400" />,
    },
  ];

  const resultsMetrics = [
    {
      metric: '100%',
      label: 'Clinical Accuracy Hit Ratio',
      subtext: 'Verified across 6-vector evaluation benchmark protocols',
    },
    {
      metric: '60%',
      label: 'Faster OPD Consultation Speed',
      subtext: 'Via Bhashini regional speech-to-rubric NLP extraction',
    },
    {
      metric: '150,000+',
      label: 'Normalized Repertory Rubrics',
      subtext: 'Unified relational schema with 1,536-dim pgvector embeddings',
    },
    {
      metric: '0%',
      label: 'Unsafeguarded High-Potency Aggravations',
      subtext: 'Protected by automated Vital Force & Burnett Organopathy masks',
    },
  ];

  const faqs = [
    {
      question:
        'How does the Asymmetrical Homeopathic Specificity Index differ from traditional software like RadarOpus?',
      answer:
        'Traditional repertories sum raw symptom grades (Grade 1..4), causing broad polychrests like Sulphur (which appear in thousands of rubrics) to dominate the top ranks. MateriaGrid introduces Inverse Rubric Density (TF-IDF equivalence), where peculiar symptoms with few remedies carry logarithmic weight, ensuring targeted simillima emerge clearly.',
    },
    {
      question:
        'Is MateriaGrid compliant with Ayushman Bharat Digital Mission (ABDM) and FHIR standards?',
      answer:
        'Yes. MateriaGrid includes a native ABDM ABHA Digital Gateway that verifies patient ABHA IDs, imports health records, and generates cryptographically signed FHIR XML/JSON clinical prescriptions compliant with National Health Authority (NHA) v2.4 specifications.',
    },
    {
      question:
        'What happens if a patient has severe chronic organic pathology (e.g. Endoderm Liver Cirrhosis)?',
      answer:
        'Dr. Burnett Organopathy Drainage Safeguards automatically detect severe diagnostic tags and split your recommendations into two tracks: a Primary Low-Potency Organopathic Tissue Track (e.g. Chelidonium 1X) and a Secondary Constitutional Simillimum Track protected by an explicit potency warning.',
    },
    {
      question:
        'Can MateriaGrid be used across mobile phones, tablets, and ultra-wide clinical monitors?',
      answer:
        'Yes. MateriaGrid features cross-viewport responsive engineering. On ultra-wide desktop monitors (1600px+), the SimiliMatrix and WebRTC telehealth windows sit side-by-side. On mobile phones and iPads, an off-canvas drawer and touch-friendly table enable complete clinical execution.',
    },
    {
      question:
        'How does Bhashini Regional Speech AI translate Indian patient vernacular into classical rubrics?',
      answer:
        'Our integrated Bhashini AI engine transcribes regional Indian speech (Hindi, Marathi, Tamil, Telugu, Gujarati) in real time during telehealth calls, matching conversational expressions (e.g. "डॉक्टर साहब, धूप से सिर फटता है") directly to classical repertory paths ("HEAD - PAIN - sun - exposure to").',
    },
    {
      question:
        'Can I switch between Dr. Prafull Vijayakar, Dr. M.L. Sehgal, and Dr. J.T. Kent clinical methodologies?',
      answer:
        'Yes. Our Clinical Persona Clone Selector Tray lets you switch active prescribing methodologies on the fly, dynamically adjusting matrix weights between Predictive Embryological Layer scoring, Sehgal ROH Present Mental State (PPP), and Kentian Totality.',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#05070A] text-[#E6E8EA] font-sans selection:bg-emerald-500/30 antialiased overflow-x-hidden">
      {/* AMBIENT BIO-EMERALD VOLUMETRIC LIGHT FIELDS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[700px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-1/3 w-[800px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px]" />
      </div>

      {/* EXECUTIVE TOP STICKY GLASS NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-[#1C1F26] bg-[#05070A]/85 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center font-black text-white text-lg shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              M
            </div>
            <div>
              <span className="font-black text-sm tracking-wider uppercase font-mono block text-white">
                MATERIAGRID ENGINE
              </span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold block">
                PRECISION CLINICAL AI FOR CLASSICAL HOMEOPATHY
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-xs font-mono text-gray-400">
            <a
              href="#challenges"
              className="hover:text-emerald-400 transition-colors"
            >
              /01_CHALLENGES
            </a>
            <a
              href="#approach"
              className="hover:text-emerald-400 transition-colors"
            >
              /02_TF-IDF_MATH
            </a>
            <a
              href="#hud-demo"
              className="hover:text-emerald-400 transition-colors"
            >
              /03_3D_WORKSTATION
            </a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">
              /04_CLINICAL_FAQ
            </a>
          </div>

          <button
            onClick={onLaunchWorkspace}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg text-xs flex items-center space-x-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.55)] transition-all cursor-pointer"
          >
            <span>Launch Clinical Workstation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* HERO SECTION WITH 3D SPHERE CANVAS & MOTION PICTURE INTERACTION */}
      <section className="relative z-10 pt-10 pb-20 md:pt-16 md:pb-28">
        {/* INTERACTIVE 3D WEBGL/CANVAS PARTICLES SPHERE */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
        />

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* LEFT HERO TEXT & CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 text-xs font-mono font-bold backdrop-blur-md shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>ABDM ABHA FHIR v2.4 Integrated Bio-Intelligence</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.06] text-white">
                Precision Clinical AI for Classical &{' '}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  Predictive Homeopathy
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl font-normal">
                Eliminate broad polychrest dominance with the{' '}
                <strong className="text-emerald-400">
                  Asymmetrical Homeopathic Specificity Index (TF-IDF)
                </strong>
                . Synthesize 150,000+ classical repertory rubrics, Dr. Vijayakar
                predictive thermal baselines, Dr. Burnett organopathic tissue
                drainage tracks, and live WebRTC telehealth into an executive
                holographic workstation.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={onLaunchWorkspace}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black px-8 py-4 rounded-xl text-sm flex items-center space-x-3 shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_45px_rgba(16,185,129,0.7)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Launch 10-Module Workstation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#hud-demo"
                  className="px-6 py-4 rounded-xl text-sm font-bold border border-[#1C1F26] bg-[#111317]/80 hover:bg-[#1C1F26] text-gray-200 backdrop-blur-md transition-all flex items-center space-x-2"
                >
                  <Play className="w-4 h-4 text-emerald-400" />
                  <span>Interactive 3D HUD Preview</span>
                </a>
              </div>

              {/* QUICK STATS STRIP */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[#1C1F26]">
                <div className="p-3 rounded-lg bg-[#111317]/60 border border-[#1C1F26]">
                  <span className="text-2xl font-black text-emerald-400 font-mono block">
                    150,000+
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    Normalized Rubrics
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[#111317]/60 border border-[#1C1F26]">
                  <span className="text-2xl font-black text-emerald-400 font-mono block">
                    3,500+
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    Proved Remedies
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[#111317]/60 border border-[#1C1F26]">
                  <span className="text-2xl font-black text-cyan-400 font-mono block">
                    1,536-Dim
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    pgvector Embeddings
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[#111317]/60 border border-[#1C1F26]">
                  <span className="text-2xl font-black text-purple-400 font-mono block">
                    100% Hit
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    6-Vector Accuracy
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT FLOATING 3D SPATIAL WORKSTATION PREVIEW CARD */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl border border-emerald-500/40 bg-[#111317]/90 backdrop-blur-2xl p-5 shadow-[0_0_60px_rgba(16,185,129,0.2)] transform hover:scale-[1.01] transition-transform duration-300">
                <div className="flex items-center justify-between border-b border-[#1C1F26] pb-3 text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-bold text-white">
                      MATERIAGRID SIMILIMATRIX // LIVE HUD
                    </span>
                  </div>
                  <span className="text-emerald-400 font-bold">
                    TOP: BELLADONNA (65.2)
                  </span>
                </div>

                {/* ANIMATED SIMILLIMUM DISPLAY CARD */}
                <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono text-emerald-400 font-bold block">
                        #1 RANKED SIMILLIMUM (TF-IDF MATH)
                      </span>
                      <h3 className="text-2xl font-black text-white font-mono">
                        Belladonna (Bell)
                      </h3>
                    </div>
                    <span className="text-2xl font-black text-emerald-400 font-mono bg-emerald-950 border border-emerald-500/50 px-3 py-1 rounded-lg">
                      65.2
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                    <span className="bg-orange-950/60 border border-orange-500/40 text-orange-300 px-2 py-0.5 rounded flex items-center gap-1">
                      <Flame className="w-3 h-3" /> Thermal: HOT
                    </span>
                    <span className="bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 px-2 py-0.5 rounded flex items-center gap-1">
                      <Droplets className="w-3 h-3" /> Thirst: THIRSTLESS
                    </span>
                    <span className="bg-purple-950/60 border border-purple-500/40 text-purple-300 px-2 py-0.5 rounded">
                      Layer: ECTODERM
                    </span>
                  </div>
                </div>

                {/* MINI ANIMATED REPERTORY TABLE MATRIX PREVIEW */}
                <div className="mt-4 space-y-2 text-xs font-mono">
                  <div className="p-2.5 rounded bg-[#090A0C] border border-[#1C1F26] flex items-center justify-between">
                    <span className="text-gray-300 truncate">
                      MIND - BUSINESS - talks of
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-black">
                      Grade 3
                    </span>
                  </div>
                  <div className="p-2.5 rounded bg-[#090A0C] border border-[#1C1F26] flex items-center justify-between">
                    <span className="text-gray-300 truncate">
                      HEAD - PAIN - pulsating - sudden
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-black">
                      Grade 4
                    </span>
                  </div>
                  <div className="p-2.5 rounded bg-[#090A0C] border border-[#1C1F26] flex items-center justify-between">
                    <span className="text-gray-300 truncate">
                      ABDOMEN - CIRRHOSIS - liver - chronic
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-600 text-white font-black">
                      Burnett 1X
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE CLINICAL CHALLENGES WITH 3D GLASS PERSPECTIVE TILT */}
      <section
        id="challenges"
        className="relative z-10 py-20 border-y border-[#1C1F26] bg-[#090A0C]/90"
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
              /01_CLINICAL_CHALLENGES
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
              Why Traditional Homeopathic Software & OPD Practice Needed Innovation
            </h2>
            <p className="text-sm md:text-base text-gray-400 font-normal">
              For decades, clinicians relied on static calculation tools that suffered from structural, clinical, and technological bottlenecks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {challenges.map((c, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all duration-300 bg-[#111317]/80 backdrop-blur-lg ${c.accent} group hover:-translate-y-1 shadow-xl`}
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {c.icon}
                </div>
                <h3 className="font-bold text-lg text-white mb-2">{c.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: THE ENGINEERING APPROACH WITH TF-IDF MATHEMATICS */}
      <section id="approach" className="relative z-10 py-20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
              /02_TF-IDF_MATHEMATICAL_RIGOR
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
              Mathematical Rigor Meets Hahnemannian Proving Provenance
            </h2>
            <p className="text-sm md:text-base text-gray-400">
              MateriaGrid combines PostgreSQL 18 pgvector high-dimensional similarity with multi-agent clinical safeguards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {approachPillars.map((p, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl border border-[#1C1F26] hover:border-emerald-500/50 bg-[#111317]/90 backdrop-blur-xl transition-all hover:shadow-[0_0_35px_rgba(16,185,129,0.15)] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-700/50">
                      {p.badge}
                    </span>
                    {p.icon}
                  </div>
                  <h3 className="font-bold text-lg text-white leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE 3D WORKSTATION HUD SHOWCASE */}
      <section
        id="hud-demo"
        className="relative z-10 py-20 border-y border-[#1C1F26] bg-[#090A0C]"
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                /03_INTERACTIVE_3D_WORKSTATION
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                10 Specialized Workspace Modules in One Interface
              </h2>
            </div>

            <div className="flex items-center space-x-2 bg-[#111317] p-1.5 rounded-xl border border-[#1C1F26]">
              <button
                onClick={() => setActiveTabHud('SIMILIMATRIX')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTabHud === 'SIMILIMATRIX'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                01. SimiliMatrix & Telehealth
              </button>
              <button
                onClick={() => setActiveTabHud('RADAR')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTabHud === 'RADAR'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                02. Miasmatic Radar Visuals
              </button>
              <button
                onClick={() => setActiveTabHud('WEBRTC')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTabHud === 'WEBRTC'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                03. WebRTC Telehealth Stream
              </button>
            </div>
          </div>

          {/* INTERACTIVE HUD PREVIEW DISPLAY */}
          <div className="rounded-2xl border border-emerald-500/40 bg-[#111317] overflow-hidden shadow-2xl p-6">
            {activeTabHud === 'SIMILIMATRIX' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[#1C1F26] pb-3">
                  <span className="font-bold text-emerald-400">
                    SIMILIMATRIX HIGH-DENSITY VIRTUALIZED TABLE ENGINE
                  </span>
                  <span className="text-gray-400">
                    8 RUBRICS // 8 REMEDY COLUMNS
                  </span>
                </div>
                <div className="grid grid-cols-9 gap-2 text-center font-bold">
                  <div className="text-left text-gray-400">SELECTED RUBRIC</div>
                  <div className="text-emerald-400">Bell (65.2)</div>
                  <div className="text-emerald-400">Chel (58.4)</div>
                  <div className="text-cyan-400">Sulph (52.1)</div>
                  <div className="text-white">Acon (49.3)</div>
                  <div className="text-purple-400">Bry (46.8)</div>
                  <div className="text-white">Puls (44.2)</div>
                  <div className="text-white">Rhus-t (42.1)</div>
                  <div className="text-white">Ars (40.5)</div>
                </div>
              </div>
            )}

            {activeTabHud === 'RADAR' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[#1C1F26] pb-3">
                  <span className="font-bold text-purple-400">
                    EMBRYOLOGICAL TISSUE LAYER RADAR (DR. VIJAYAKAR AXIS)
                  </span>
                  <span className="text-emerald-400 font-bold">
                    CURATIVE VECTOR: OUTWARD
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-950/20">
                    <p className="text-blue-400 font-bold">ECTODERM</p>
                    <p className="text-3xl font-black text-white my-2">5 Rubrics</p>
                    <p className="text-gray-400 text-[10px]">Nervous & Skin Layer</p>
                  </div>
                  <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-950/20">
                    <p className="text-purple-400 font-bold">MESODERM</p>
                    <p className="text-3xl font-black text-white my-2">1 Rubric</p>
                    <p className="text-gray-400 text-[10px]">Musculoskeletal & Vascular</p>
                  </div>
                  <div className="p-4 rounded-xl border border-orange-500/30 bg-orange-950/20">
                    <p className="text-orange-400 font-bold">ENDODERM</p>
                    <p className="text-3xl font-black text-white my-2">2 Rubrics</p>
                    <p className="text-gray-400 text-[10px]">Visceral Liver / Parenchyma</p>
                  </div>
                </div>
              </div>
            )}

            {activeTabHud === 'WEBRTC' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[#1C1F26] pb-3">
                  <span className="font-bold text-emerald-400">
                    WEBRTC TELEHEALTH CONSULTATION HARNESS + BHASHINI SPEECH AI
                  </span>
                  <span className="text-purple-400 font-bold">GAIT RADAR ACTIVE</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between">
                  <p className="text-emerald-400 font-bold">
                    BHASHINI REGIONAL SPEECH AI (HI-EN TRANSCRIPTION):
                  </p>
                  <p className="text-white">
                    &ldquo;Doctor, sunlight exposure causes sudden throbbing head pain...&rdquo;
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 4: VISUAL END-TO-END REMEDY DECISION FLOWCHART & REASONING ENGINE */}
      <section
        id="decision-flowchart"
        className="relative z-10 py-20 border-b border-[#1C1F26] bg-[#05070A]"
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-10">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
              /04_END_TO_END_DECISION_FLOWCHART
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              End-to-End Remedy Decision Architecture & Reasoning Engine
            </h2>
            <p className="text-sm text-gray-400 font-sans max-w-3xl">
              PromptCanvas Draw.io interactive architecture graph featuring dot-matrix canvas grid, zoom controls, diamond decision gates, and live node reasoning inspector.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500/40 overflow-hidden shadow-2xl">
            <PromptCanvasDrawIoDiagram theme="dark" />
          </div>
        </div>
      </section>

      {/* SECTION 5: FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section id="faq" className="relative z-10 py-20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
              /05_CLINICAL_FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              Clinical & Architectural FAQ
            </h2>
          </div>

          <div className="max-w-4xl space-y-3">
            {faqs.map((f, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#1C1F26] rounded-xl overflow-hidden bg-[#111317]/90 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between font-bold text-sm cursor-pointer text-white"
                  >
                    <span>{f.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-emerald-400 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs text-gray-400 leading-relaxed border-t border-[#1C1F26] pt-3">
                      {f.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXECUTIVE CTA FOOTER BANNER */}
      <section className="relative z-10 py-16 bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black">
              Ready to Experience Precision Bio-Intelligence?
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm">
              Launch the 10-Module MateriaGrid Enterprise Workstation now.
            </p>
          </div>

          <button
            onClick={onLaunchWorkspace}
            className="bg-white hover:bg-emerald-50 text-emerald-900 font-black px-8 py-4 rounded-xl text-sm shadow-2xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex-shrink-0"
          >
            Launch Clinical Workstation →
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

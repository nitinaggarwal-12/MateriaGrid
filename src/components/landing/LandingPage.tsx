'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Globe,
  GitBranch,
  Activity,
  Cpu,
  CheckCircle2,
  Play,
  Layers,
} from 'lucide-react';
import {
  INDIAN_LANGUAGE_PACKS,
  IndianLanguageCode,
} from '@/lib/i18n/indian_language_packs';

interface LandingPageProps {
  onLaunchWorkspace: () => void;
  theme?: 'dark' | 'light';
  langCode?: IndianLanguageCode;
  onSelectLangCode?: (code: IndianLanguageCode) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchWorkspace,
  theme = 'dark',
  langCode = 'EN',
  onSelectLangCode,
}) => {
  const isLight = theme === 'light';
  const langPack = INDIAN_LANGUAGE_PACKS[langCode];

  return (
    <div
      className={`min-h-screen w-full font-mono transition-colors overflow-x-hidden ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#05070A] text-white'
      }`}
    >
      {/* FULL-WIDTH STICKY GLASS NAVBAR WITH INDIAN MULTI-LANGUAGE SWITCHER */}
      <header
        className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl ${
          isLight
            ? 'bg-white/90 border-slate-200 text-slate-900'
            : 'bg-[#05070A]/90 border-[#1C1F26] text-white'
        }`}
      >
        <div className="max-w-8xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-black shadow-md">
              M
            </div>
            <div>
              <span className="font-black tracking-wider text-sm uppercase">
                MATERIAGRID
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-600 text-white font-black">
                AYUSH / ABDM NHA v2.4
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* INDIAN MULTI-LANGUAGE SWITCHER ON LANDING PAGE */}
            <div className="flex items-center space-x-1.5 border rounded-xl px-3 py-1.5 bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-800">
              <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <select
                value={langCode}
                onChange={(e) =>
                  onSelectLangCode &&
                  onSelectLangCode(e.target.value as IndianLanguageCode)
                }
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

            <button
              onClick={onLaunchWorkspace}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs flex items-center space-x-2 shadow-lg transition-all transform hover:scale-105 cursor-pointer"
            >
              <span>Launch MateriaGrid OPD</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SHOWCASE SECTION */}
      <section className="max-w-8xl mx-auto px-6 md:px-12 py-16 text-center space-y-8">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-600/15 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 text-xs font-black">
          <Sparkles className="w-4 h-4" />
          <span>FIRST MULTI-AGENT QUANTUM REPERTORIZATION & ABDM GATEWAY ENGINE</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight max-w-5xl mx-auto">
          PRECISION HOMEOPATHIC REPERTORIZATION & NHA UHI CLINICAL TELEHEALTH
        </h1>

        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Powered by Gemini 2.5 Pro Multimodal Vision AI, Sehgal ROH Present Predominating Persisting Mind Translation, Vijayakar Predictive Thermal-Thirst Filters, and Asymmetrical TF-IDF Specificity Math.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onLaunchWorkspace}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-black text-sm flex items-center space-x-2 shadow-2xl transition-all transform hover:scale-105 cursor-pointer"
          >
            <span>Open Clinical OPD Portal</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

'use client';

import React, { useState } from 'react';
import {
  Grid,
  BarChart3,
  Bot,
  Users,
  BookOpen,
  FlaskConical,
  Microscope,
  CalendarCheck,
  PackageCheck,
  GitCompare,
  Building2,
  ChevronDown,
  ChevronRight,
  Sun,
  Moon,
  Sparkles,
  ShieldCheck,
  Activity,
  ArrowUpRight,
  X,
} from 'lucide-react';
import {
  INDIAN_LANGUAGE_PACKS,
  IndianLanguageCode,
} from '@/lib/i18n/indian_language_packs';

export type ActiveWorkspaceTab =
  | 'MATRIX_TELEHEALTH'
  | 'ANALYTICS_GRAPHS'
  | 'AI_CHATBOT'
  | 'PATIENT_REPOSITORY'
  | 'MATERIA_MEDICA_LIBRARY'
  | 'DIAGNOSTIC_LAB_AI'
  | 'AYUSH_RESEARCH_HUB'
  | 'OPD_QUEUE_MANAGER'
  | 'PHARMACY_DISPENSARY'
  | 'DIFFERENTIAL_WORKBENCH'
  | 'ENTERPRISE_SUITE';

interface SidebarNavProps {
  activeTab: ActiveWorkspaceTab;
  onSelectTab: (tab: ActiveWorkspaceTab) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  onOpenLandingPage?: () => void;
  langCode?: IndianLanguageCode;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  onSelectTab,
  theme,
  onToggleTheme,
  isMobileOpen = false,
  onCloseMobile,
  onOpenLandingPage,
  langCode = 'EN',
}) => {
  const isLight = theme === 'light';
  const langPack = INDIAN_LANGUAGE_PACKS[langCode] || INDIAN_LANGUAGE_PACKS.EN;

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    PRACTICE: true,
    INTELLIGENCE: true,
    KNOWLEDGE: true,
  });

  const toggleCategory = (catKey: string) => {
    setOpenCategories((prev) => ({ ...prev, [catKey]: !prev[catKey] }));
  };

  const navCategories = [
    {
      key: 'PRACTICE',
      label: 'CLINICAL PRACTICE SUITE',
      items: [
        {
          id: 'MATRIX_TELEHEALTH' as ActiveWorkspaceTab,
          label: langPack.labels.similiMatrixEngine,
          subLabel: 'Grid & RTC Consultation',
          icon: Grid,
          badge: 'LIVE',
          badgeColor: 'bg-emerald-600 text-white',
        },
        {
          id: 'OPD_QUEUE_MANAGER' as ActiveWorkspaceTab,
          label: langPack.labels.opdQueue,
          subLabel: 'Waiting Room & Video Slots',
          icon: CalendarCheck,
          badge: 'UHI',
          badgeColor: 'bg-teal-600 text-white',
        },
        {
          id: 'PHARMACY_DISPENSARY' as ActiveWorkspaceTab,
          label: langPack.labels.pharmacy,
          subLabel: 'Classical Liquid Potency Stock',
          icon: PackageCheck,
        },
        {
          id: 'DIFFERENTIAL_WORKBENCH' as ActiveWorkspaceTab,
          label: langPack.labels.differentialWorkbench,
          subLabel: 'Side-by-Side Comparison',
          icon: GitCompare,
        },
      ],
    },
    {
      key: 'INTELLIGENCE',
      label: 'AI INTELLIGENCE & VISION',
      items: [
        {
          id: 'AI_CHATBOT' as ActiveWorkspaceTab,
          label: langPack.labels.aiCopilot,
          subLabel: 'Gemini 2.5 Pro Differential',
          icon: Bot,
          badge: 'AI',
          badgeColor: 'bg-purple-600 text-white',
        },
        {
          id: 'DIAGNOSTIC_LAB_AI' as ActiveWorkspaceTab,
          label: langPack.labels.aiCopilot ? langPack.labels.aiCopilot : 'Diagnostic Lab & Vision AI',
          subLabel: 'Lesion, Blood OCR & Gait',
          icon: Microscope,
          badge: 'NEW',
          badgeColor: 'bg-cyan-600 text-white',
        },
        {
          id: 'ANALYTICS_GRAPHS' as ActiveWorkspaceTab,
          label: langPack.labels.clinicalAnalytics,
          subLabel: 'Miasmatic & Layer Vectors',
          icon: BarChart3,
        },
        {
          id: 'PATIENT_REPOSITORY' as ActiveWorkspaceTab,
          label: langPack.labels.patientEhr,
          subLabel: 'ABDM FHIR Case Repository',
          icon: Users,
        },
      ],
    },
    {
      key: 'KNOWLEDGE',
      label: 'KNOWLEDGE & ENTERPRISE',
      items: [
        {
          id: 'MATERIA_MEDICA_LIBRARY' as ActiveWorkspaceTab,
          label: langPack.labels.materiaMedica,
          subLabel: 'Boericke & Kent Reference',
          icon: BookOpen,
        },
        {
          id: 'AYUSH_RESEARCH_HUB' as ActiveWorkspaceTab,
          label: 'AYUSH Academic Research Hub',
          subLabel: 'CCRH Trials & TF-IDF Proofs',
          icon: FlaskConical,
        },
        {
          id: 'ENTERPRISE_SUITE' as ActiveWorkspaceTab,
          label: langPack.labels.enterpriseSuite,
          subLabel: 'Fleet RBAC, RWE & UHI Claims',
          icon: Building2,
          badge: '$1B',
          badgeColor: 'bg-amber-600 text-white',
        },
      ],
    },
  ];

  const sidebarContent = (
    <div
      className={`w-72 h-full flex flex-col font-mono border-r select-none transition-colors ${
        isLight
          ? 'bg-white border-slate-200 text-slate-800'
          : 'bg-[#0B0F19] border-[#1C1F26] text-[#E6E8EA]'
      }`}
    >
      {/* BRAND HEADER & THEME SWITCHER */}
      <div
        className={`p-4 border-b flex items-center justify-between ${
          isLight ? 'border-slate-200' : 'border-[#1C1F26]'
        }`}
      >
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 flex items-center justify-center text-white font-black shadow-md">
            M
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span
                className={`font-black text-sm tracking-wider uppercase ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                MATERIAGRID
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 font-black border border-emerald-500/30">
                v2.4
              </span>
            </div>
            <p className="text-[10px] text-gray-500 font-bold">
              PRECISION CLINICAL AI
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isLight
                ? 'border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200'
                : 'border-slate-800 bg-[#111317] text-gray-300 hover:text-white hover:border-slate-700'
            }`}
            title={`Switch to ${isLight ? 'Dark Obsidian' : 'Light Mode'}`}
          >
            {isLight ? (
              <Moon className="w-3.5 h-3.5 text-slate-700" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            )}
          </button>

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-2 rounded-xl border border-slate-300 text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* WORKSPACE NAVIGATION TREE */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {navCategories.map((category) => {
          const isOpen = openCategories[category.key] ?? true;
          return (
            <div key={category.key} className="space-y-1">
              <button
                onClick={() => toggleCategory(category.key)}
                className={`w-full flex items-center justify-between px-2 py-1.5 text-[10px] font-black tracking-wider uppercase transition-colors cursor-pointer ${
                  isLight ? 'text-slate-500 hover:text-slate-900' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>{category.label}</span>
                {isOpen ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </button>

              {isOpen && (
                <div className="space-y-1 pt-1">
                  {category.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectTab(item.id);
                          if (onCloseMobile) onCloseMobile();
                        }}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-left transform hover:scale-[1.01] cursor-pointer ${
                          isActive
                            ? isLight
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-2xs'
                              : 'bg-gradient-to-r from-emerald-600/25 via-teal-600/15 to-transparent border-emerald-500 text-white font-bold shadow-[0_0_15px_rgba(16,185,129,0.18)]'
                            : isLight
                            ? 'bg-transparent border-transparent text-slate-700 hover:bg-slate-100 hover:border-slate-200'
                            : 'bg-transparent border-transparent text-gray-400 hover:bg-[#111317] hover:text-white hover:border-slate-800'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <div
                            className={`p-1.5 rounded-lg flex-shrink-0 ${
                              isActive
                                ? 'bg-emerald-600 text-white'
                                : isLight
                                ? 'bg-slate-100 text-slate-600'
                                : 'bg-slate-800/80 text-gray-400'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <p
                              className={`text-xs font-black truncate leading-tight ${
                                isActive
                                  ? isLight
                                    ? 'text-emerald-950'
                                    : 'text-white'
                                  : isLight
                                  ? 'text-slate-800'
                                  : 'text-gray-300'
                              }`}
                            >
                              {item.label}
                            </p>
                            <p className="text-[10px] text-gray-500 truncate mt-0.5">
                              {item.subLabel}
                            </p>
                          </div>
                        </div>

                        {item.badge && (
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-black flex-shrink-0 ml-1 ${item.badgeColor}`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* FOOTER: SYSTEM TELEMETRY & 3D SHOWCASE LINK */}
      <div
        className={`p-3.5 border-t space-y-2.5 ${
          isLight ? 'border-slate-200 bg-slate-50' : 'border-[#1C1F26] bg-[#070A0F]'
        }`}
      >
        {onOpenLandingPage && (
          <button
            onClick={onOpenLandingPage}
            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600/20 to-teal-600/20 hover:from-emerald-600/30 hover:to-teal-600/30 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 text-xs font-black flex items-center justify-between transition-all cursor-pointer"
          >
            <span>✨ Open 3D Public Showcase</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}

        <div className="flex items-center justify-between text-[10px] font-bold text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            AYUSH / ABDM GATEWAY
          </span>
          <span className="text-emerald-600 dark:text-emerald-400">ONLINE</span>
        </div>

        <div className="flex items-center justify-between text-[10px] font-bold text-gray-500">
          <span>POSTGRES PGVECTOR</span>
          <span className="text-cyan-600 dark:text-cyan-400">150K RUBRICS</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:block h-full flex-shrink-0 z-20">
        {sidebarContent}
      </div>

      {/* MOBILE DRAWER OVERLAY */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 h-full">{sidebarContent}</div>
        </div>
      )}
    </>
  );
};

export default SidebarNav;

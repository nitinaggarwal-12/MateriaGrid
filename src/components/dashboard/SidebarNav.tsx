'use client';

import React from 'react';
import {
  Grid,
  BarChart3,
  MessageSquare,
  Users,
  BookOpen,
  Camera,
  Award,
  FlaskConical,
  GitCompare,
  ShieldCheck,
  Sun,
  Moon,
  X,
} from 'lucide-react';

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
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  onSelectTab,
  theme,
  onToggleTheme,
  isMobileOpen = false,
  onCloseMobile,
  onOpenLandingPage,
}) => {
  const isLight = theme === 'light';

  const navItems: {
    id: ActiveWorkspaceTab;
    label: string;
    subLabel: string;
    icon: React.ReactNode;
    badge?: string;
  }[] = [
    {
      id: 'MATRIX_TELEHEALTH',
      label: 'SimiliMatrix & Telehealth',
      subLabel: 'Grid & RTC Consultation',
      icon: <Grid className="w-4 h-4" />,
      badge: 'LIVE',
    },
    {
      id: 'ANALYTICS_GRAPHS',
      label: 'Clinical Analytics & Radar',
      subLabel: 'Miasmatic & Layer Vectors',
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      id: 'AI_CHATBOT',
      label: 'AI Clinical Copilot',
      subLabel: 'Gemini 2.5 Pro Differential',
      icon: <MessageSquare className="w-4 h-4" />,
      badge: 'AI',
    },
    {
      id: 'PATIENT_REPOSITORY',
      label: 'Patient EHR & ABHA Records',
      subLabel: 'ABDM FHIR Case Database',
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: 'MATERIA_MEDICA_LIBRARY',
      label: 'Materia Medica Library',
      subLabel: 'Boericke & Kent Reference',
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: 'DIAGNOSTIC_LAB_AI',
      label: 'Diagnostic Lab & Vision AI',
      subLabel: 'Lesion, Blood OCR & Gait',
      icon: <Camera className="w-4 h-4" />,
      badge: 'NEW',
    },
    {
      id: 'AYUSH_RESEARCH_HUB',
      label: 'Ayush Academic Research Hub',
      subLabel: 'TF-IDF Proofs & Multi-Center',
      icon: <Award className="w-4 h-4" />,
      badge: 'GOVT',
    },
    {
      id: 'OPD_QUEUE_MANAGER',
      label: 'OPD Waiting Queue & UHI',
      subLabel: 'Waiting Room & Video Slots',
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: 'PHARMACY_DISPENSARY',
      label: 'Pharmacy & LM Dispensary',
      subLabel: 'Classical Liquid Potency Stock',
      icon: <FlaskConical className="w-4 h-4" />,
    },
    {
      id: 'DIFFERENTIAL_WORKBENCH',
      label: 'Tri-Remedy Differential Table',
      subLabel: 'Side-by-Side Comparison',
      icon: <GitCompare className="w-4 h-4" />,
    },
    {
      id: 'ENTERPRISE_SUITE',
      label: 'Enterprise $1B Platform Suite',
      subLabel: 'Fleet RBAC, RWE & UHI Claims',
      icon: <Award className="w-4 h-4" />,
      badge: '$1B',
    },
  ];

  return (
    <>
      {/* MOBILE BACKDROP OVERLAY */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 min-w-[256px] border-r flex flex-col h-full select-none text-xs transition-transform duration-200 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          isLight
            ? 'bg-white border-slate-200/90 text-slate-900 shadow-xs'
            : 'bg-[#0B0F19] border-[#1C1F26] text-[#E6E8EA]'
        }`}
      >
        {/* BRAND HEADER */}
        <div
          className={`p-3.5 border-b flex items-center justify-between ${
            isLight
              ? 'bg-slate-50/80 border-slate-200'
              : 'bg-[#05070A] border-[#1C1F26]'
          }`}
        >
          <button
            onClick={() => onOpenLandingPage && onOpenLandingPage()}
            title="Click to view 3D Holographic Landing Page Showcase"
            className="flex items-center space-x-2.5 text-left group cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center font-black text-white text-base shadow-sm group-hover:scale-105 transition-transform">
              M
            </div>
            <div>
              <h1 className="font-black tracking-wider text-xs uppercase font-mono group-hover:text-emerald-600 transition-colors">
                MATERIAGRID
              </h1>
              <p className="text-[10px] text-emerald-600 font-mono font-bold">
                PRECISION CLINICAL AI
              </p>
            </div>
          </button>

          <div className="flex items-center space-x-1">
            <button
              onClick={onToggleTheme}
              title={`Switch to ${isLight ? 'Dark' : 'Light'} Theme`}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                  : 'bg-[#1C1F26] border-[#2A2E38] text-amber-400 hover:bg-[#2A2E38]'
              }`}
            >
              {isLight ? (
                <Moon className="w-3.5 h-3.5" />
              ) : (
                <Sun className="w-3.5 h-3.5" />
              )}
            </button>

            {/* MOBILE CLOSE BUTTON */}
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="p-1.5 rounded-lg border border-slate-300 text-slate-600 lg:hidden cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* NAVIGATION TABS WITH GLOWING LEFT ACCENT BAR */}
        <div className="flex-1 p-2 space-y-1 overflow-y-auto">
          <div
            className={`px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider font-mono ${
              isLight ? 'text-slate-400' : 'text-gray-500'
            }`}
          >
            10 ECOSYSTEM WORKSPACE MODULES
          </div>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center justify-between group cursor-pointer relative overflow-hidden ${
                  isActive
                    ? isLight
                      ? 'bg-emerald-50/90 border border-emerald-300/80 text-emerald-950 font-bold shadow-2xs'
                      : 'bg-emerald-500/15 border border-emerald-500/40 text-white font-bold'
                    : isLight
                    ? 'text-slate-600 hover:bg-slate-100/90 hover:text-slate-900'
                    : 'text-gray-400 hover:bg-[#1C1F26]/70 hover:text-gray-200'
                }`}
              >
                {isActive && (
                  <div className="w-1.5 h-full bg-emerald-600 absolute left-0 top-0 bottom-0 rounded-r-md shadow-[0_0_8px_#10B981]" />
                )}

                <div className="flex items-center space-x-2.5 pl-1 min-w-0 flex-1">
                  <span
                    className={
                      isActive
                        ? 'text-emerald-600'
                        : isLight
                        ? 'text-slate-400 group-hover:text-slate-600'
                        : 'text-gray-400 group-hover:text-gray-300'
                    }
                  >
                    {item.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-xs leading-tight truncate">
                      {item.label}
                    </p>
                    <p
                      className={`text-[10px] mt-0.5 truncate ${
                        isActive
                          ? 'text-emerald-600 font-semibold'
                          : isLight
                          ? 'text-slate-400'
                          : 'text-gray-500'
                      }`}
                    >
                      {item.subLabel}
                    </p>
                  </div>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full font-mono flex-shrink-0 ml-1 ${
                      item.badge === 'LIVE'
                        ? isLight
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-700/50'
                        : isLight
                        ? 'bg-purple-100 text-purple-800 border border-purple-300'
                        : 'bg-purple-950 text-purple-400 border border-purple-700/50'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* FOOTER SYSTEM STATUS */}
        <div
          className={`p-3 border-t space-y-1.5 ${
            isLight
              ? 'bg-slate-50/80 border-slate-200'
              : 'bg-[#05070A] border-[#1C1F26]'
          }`}
        >
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className={isLight ? 'text-slate-500' : 'text-gray-400'}>
              AYUSH / ABDM GATEWAY
            </span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> ONLINE
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-gray-500">
            <span>POSTGRES PGVECTOR</span>
            <span className={isLight ? 'text-slate-700 font-bold' : 'text-gray-300'}>
              150K RUBRICS
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarNav;

'use client';

import React, { useState } from 'react';
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
  Sun,
  Moon,
  ChevronDown,
  ChevronRight,
  FolderKanban,
  Cpu,
  Building2,
  Activity,
  Sparkles,
  Zap,
  ShieldCheck,
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
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenLandingPage?: () => void;
}

interface NavItem {
  id: ActiveWorkspaceTab;
  label: string;
  subLabel: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

interface NavCategory {
  categoryId: string;
  categoryTitle: string;
  categoryIcon: React.ReactNode;
  items: NavItem[];
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  onSelectTab,
  theme,
  onToggleTheme,
  isMobileOpen,
  onCloseMobile,
  onOpenLandingPage,
}) => {
  const isLight = theme === 'light';

  const [collapsedCategories, setCollapsedCategories] = useState<
    Record<string, boolean>
  >({
    CLINICAL: false,
    AI_DIAGNOSTICS: false,
    ENTERPRISE: false,
  });

  const toggleCategory = (categoryId: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const navCategories: NavCategory[] = [
    {
      categoryId: 'CLINICAL',
      categoryTitle: 'Clinical Practice Suite',
      categoryIcon: <FolderKanban className="w-3.5 h-3.5 text-emerald-400" />,
      items: [
        {
          id: 'MATRIX_TELEHEALTH',
          label: 'SimiliMatrix & Telehealth',
          subLabel: 'Grid & RTC Consultation',
          icon: <Grid className="w-4 h-4 text-emerald-400" />,
          badge: 'LIVE',
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
        },
        {
          id: 'OPD_QUEUE_MANAGER',
          label: 'OPD Waiting Queue & UHI',
          subLabel: 'Waiting Room & Video Slots',
          icon: <Users className="w-4 h-4 text-teal-400" />,
        },
        {
          id: 'PHARMACY_DISPENSARY',
          label: 'Pharmacy & LM Dispensary',
          subLabel: 'Classical Liquid Potency Stock',
          icon: <FlaskConical className="w-4 h-4 text-emerald-400" />,
        },
        {
          id: 'DIFFERENTIAL_WORKBENCH',
          label: 'Tri-Remedy Differential Table',
          subLabel: 'Side-by-Side Comparison',
          icon: <GitCompare className="w-4 h-4 text-cyan-400" />,
        },
      ],
    },
    {
      categoryId: 'AI_DIAGNOSTICS',
      categoryTitle: 'AI Intelligence & Vision',
      categoryIcon: <Cpu className="w-3.5 h-3.5 text-cyan-400" />,
      items: [
        {
          id: 'AI_CHATBOT',
          label: 'AI Clinical Copilot',
          subLabel: 'Gemini 2.5 Pro Differential',
          icon: <MessageSquare className="w-4 h-4 text-purple-400" />,
          badge: 'AI',
          badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
        },
        {
          id: 'DIAGNOSTIC_LAB_AI',
          label: 'Diagnostic Lab & Vision AI',
          subLabel: 'Lesion, Blood OCR & Gait',
          icon: <Camera className="w-4 h-4 text-cyan-400" />,
          badge: 'NEW',
          badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50',
        },
        {
          id: 'ANALYTICS_GRAPHS',
          label: 'Clinical Analytics & Radar',
          subLabel: 'Miasmatic & Layer Vectors',
          icon: <BarChart3 className="w-4 h-4 text-emerald-400" />,
        },
        {
          id: 'PATIENT_REPOSITORY',
          label: 'Patient EHR & ABHA Database',
          subLabel: 'ABDM FHIR Case Repository',
          icon: <Users className="w-4 h-4 text-blue-400" />,
        },
      ],
    },
    {
      categoryId: 'ENTERPRISE',
      categoryTitle: 'Knowledge & Enterprise',
      categoryIcon: <Building2 className="w-3.5 h-3.5 text-purple-400" />,
      items: [
        {
          id: 'MATERIA_MEDICA_LIBRARY',
          label: 'Materia Medica Library',
          subLabel: 'Boericke & Kent Reference',
          icon: <BookOpen className="w-4 h-4 text-amber-400" />,
        },
        {
          id: 'AYUSH_RESEARCH_HUB',
          label: 'Ayush Academic Research Hub',
          subLabel: 'TF-IDF Proofs & Multi-Center',
          icon: <Award className="w-4 h-4 text-orange-400" />,
          badge: 'GOVT',
          badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/50',
        },
        {
          id: 'ENTERPRISE_SUITE',
          label: 'Enterprise $1B Platform Suite',
          subLabel: 'Fleet RBAC, RWE & UHI',
          icon: <Award className="w-4 h-4 text-purple-400" />,
          badge: '$1B',
          badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
        },
      ],
    },
  ];

  return (
    <>
      {/* MOBILE BACKDROP OVERLAY */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 min-w-[280px] border-r flex flex-col h-full select-none text-xs transition-transform duration-200 lg:translate-x-0 bg-[#05070A] border-[#1C1F26] text-white shadow-2xl`}
      >
        {/* BRAND COMMAND HEADER CAPSULE */}
        <div className="p-4 border-b border-[#1C1F26] flex items-center justify-between bg-gradient-to-r from-[#0B0F19] via-[#05070A] to-[#0B0F19]">
          <button
            onClick={() => onOpenLandingPage && onOpenLandingPage()}
            title="Click to view 3D Holographic Landing Page Showcase"
            className="flex items-center space-x-3 text-left group cursor-pointer hover:opacity-95 transition-opacity"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 flex items-center justify-center font-black text-white text-lg shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:scale-105 transition-transform">
              M
            </div>
            <div>
              <h1 className="font-black tracking-wider text-xs uppercase font-mono text-white group-hover:text-emerald-400 transition-colors">
                MATERIAGRID
              </h1>
              <p className="text-[10px] text-emerald-400 font-mono font-bold tracking-wider">
                PRECISION CLINICAL AI
              </p>
            </div>
          </button>

          <div className="flex items-center space-x-1">
            <button
              onClick={onToggleTheme}
              title={`Switch to ${isLight ? 'Dark' : 'Light'} Theme`}
              className="p-1.5 rounded-lg border border-[#1C1F26] hover:bg-[#1C1F26] text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              {isLight ? (
                <Moon className="w-3.5 h-3.5" />
              ) : (
                <Sun className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* KINETIC CLINICAL AI TELEMETRY WIDGET */}
        <div className="mx-3 mt-3 p-3 rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono font-bold">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              SIMILIMATRIX ENGINE
            </span>
            <span className="text-cyan-400 font-mono">12ms LATENCY</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 w-4/5 animate-pulse" />
          </div>
          <div className="flex justify-between text-[9px] font-mono text-gray-400">
            <span>150,420 RUBRICS</span>
            <span className="text-emerald-400 font-bold">TF-IDF ASYMMETRICAL</span>
          </div>
        </div>

        {/* ECOSYSTEM WORKSPACE MODULES — COLLAPSIBLE CATEGORIES */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          <div className="px-1 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400/80 font-mono">
              11 ECOSYSTEM WORKSPACE MODULES
            </span>
          </div>

          <div className="space-y-4">
            {navCategories.map((category) => {
              const isCollapsed =
                collapsedCategories[category.categoryId] || false;

              return (
                <div key={category.categoryId} className="space-y-1.5">
                  {/* CATEGORY COLLAPSIBLE HEADER */}
                  <button
                    onClick={() => toggleCategory(category.categoryId)}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer text-left group"
                  >
                    <div className="flex items-center space-x-2">
                      {category.categoryIcon}
                      <span className="font-black text-[11px] uppercase tracking-wider font-mono text-gray-300 group-hover:text-white transition-colors">
                        {category.categoryTitle}
                      </span>
                    </div>
                    {isCollapsed ? (
                      <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                    )}
                  </button>

                  {/* CATEGORY ITEMS */}
                  {!isCollapsed && (
                    <div className="space-y-1 pl-1">
                      {category.items.map((item) => {
                        const isActive = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              onSelectTab(item.id);
                              onCloseMobile();
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-left cursor-pointer group relative overflow-hidden ${
                              isActive
                                ? 'bg-gradient-to-r from-emerald-600/25 via-teal-600/15 to-transparent border border-emerald-500/50 text-white font-bold shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                                : 'hover:bg-[#111317] text-gray-400 hover:text-white border border-transparent'
                            }`}
                          >
                            {isActive && (
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-500" />
                            )}

                            <div className="flex items-center space-x-3 min-w-0">
                              <span
                                className={`flex-shrink-0 transition-transform group-hover:scale-110 ${
                                  isActive
                                    ? 'text-emerald-400'
                                    : 'text-gray-400 group-hover:text-emerald-400'
                                }`}
                              >
                                {item.icon}
                              </span>
                              <div className="min-w-0">
                                <p className="font-bold text-xs leading-tight">
                                  {item.label}
                                </p>
                                <p className="text-[10px] text-gray-500 font-mono leading-tight mt-0.5">
                                  {item.subLabel}
                                </p>
                              </div>
                            </div>

                            {item.badge && (
                              <span
                                className={`text-[9px] font-black font-mono px-2 py-0.5 rounded border flex-shrink-0 ml-1 ${
                                  item.badgeColor ||
                                  'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                                }`}
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
        </div>

        {/* CYBER-MEDICAL GATEWAY STATUS FOOTER */}
        <div className="p-3.5 border-t border-[#1C1F26] bg-[#0B0F19] font-mono text-[10px] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">AYUSH / ABDM GATEWAY</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              ONLINE
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">POSTGRES PGVECTOR</span>
            <span className="text-cyan-400 font-bold">150K RUBRICS</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarNav;

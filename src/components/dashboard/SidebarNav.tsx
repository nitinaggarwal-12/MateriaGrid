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
          icon: <Grid className="w-4 h-4" />,
          badge: 'LIVE',
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
          label: 'Tri-Remedy Differential',
          subLabel: 'Side-by-Side Comparison',
          icon: <GitCompare className="w-4 h-4" />,
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
          icon: <MessageSquare className="w-4 h-4" />,
          badge: 'AI',
        },
        {
          id: 'DIAGNOSTIC_LAB_AI',
          label: 'Diagnostic Lab & Vision AI',
          subLabel: 'Lesion, Blood OCR & Gait',
          icon: <Camera className="w-4 h-4" />,
          badge: 'NEW',
        },
        {
          id: 'ANALYTICS_GRAPHS',
          label: 'Clinical Analytics & Radar',
          subLabel: 'Miasmatic & Layer Vectors',
          icon: <BarChart3 className="w-4 h-4" />,
        },
        {
          id: 'PATIENT_REPOSITORY',
          label: 'Patient EHR & ABHA Database',
          subLabel: 'ABDM FHIR Case Repository',
          icon: <Users className="w-4 h-4" />,
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
          icon: <BookOpen className="w-4 h-4" />,
        },
        {
          id: 'AYUSH_RESEARCH_HUB',
          label: 'Ayush Research Hub',
          subLabel: 'TF-IDF Proofs & Multi-Center',
          icon: <Award className="w-4 h-4" />,
          badge: 'GOVT',
        },
        {
          id: 'ENTERPRISE_SUITE',
          label: 'Enterprise $1B Suite',
          subLabel: 'Fleet RBAC, RWE & UHI',
          icon: <Award className="w-4 h-4" />,
          badge: '$1B',
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
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 min-w-[256px] border-r flex flex-col h-full select-none text-xs transition-transform duration-200 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          isLight
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-[#05070A] border-[#1C1F26] text-gray-200'
        }`}
      >
        {/* BRAND HEADER CAPSULE */}
        <div
          className={`p-3.5 border-b flex items-center justify-between transition-colors ${
            isLight
              ? 'bg-slate-50/80 border-slate-200'
              : 'bg-[#0B0F19] border-[#1C1F26]'
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
              <h1 className="font-black tracking-wider text-xs uppercase font-mono group-hover:text-emerald-400 transition-colors">
                MATERIAGRID
              </h1>
              <p className="text-[10px] text-emerald-400 font-mono font-bold">
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
                  ? 'border-slate-300 hover:bg-slate-200 text-slate-700'
                  : 'border-[#1C1F26] hover:bg-[#1C1F26] text-gray-400 hover:text-white'
              }`}
            >
              {isLight ? (
                <Moon className="w-3.5 h-3.5" />
              ) : (
                <Sun className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* ECOSYSTEM WORKSPACE MODULES — COLLAPSIBLE CATEGORIES */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4">
          <div className="px-2.5 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 font-mono">
              11 ECOSYSTEM MODULES
            </span>
          </div>

          <div className="space-y-3">
            {navCategories.map((category) => {
              const isCollapsed =
                collapsedCategories[category.categoryId] || false;

              return (
                <div key={category.categoryId} className="space-y-1">
                  {/* CATEGORY COLLAPSIBLE HEADER */}
                  <button
                    onClick={() => toggleCategory(category.categoryId)}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-500/10 transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center space-x-2">
                      {category.categoryIcon}
                      <span className="font-bold text-[11px] uppercase tracking-wide font-mono text-slate-700 dark:text-gray-300">
                        {category.categoryTitle}
                      </span>
                    </div>
                    {isCollapsed ? (
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
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
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all text-left cursor-pointer group ${
                              isActive
                                ? 'bg-gradient-to-r from-emerald-600/15 via-emerald-600/10 to-transparent border border-emerald-500/40 text-emerald-400 font-bold shadow-xs'
                                : isLight
                                ? 'hover:bg-slate-100 text-slate-700'
                                : 'hover:bg-[#111317] text-gray-400 hover:text-gray-200'
                            }`}
                          >
                            <div className="flex items-center space-x-2.5 min-w-0">
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
                                <p className="font-bold text-xs truncate leading-tight">
                                  {item.label}
                                </p>
                                <p className="text-[10px] text-gray-500 truncate leading-tight">
                                  {item.subLabel}
                                </p>
                              </div>
                            </div>

                            {item.badge && (
                              <span
                                className={`text-[9px] font-black font-mono px-1.5 py-0.5 rounded flex-shrink-0 ml-1 ${
                                  item.badge === 'LIVE'
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                    : item.badge === '$1B'
                                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
                                    : item.badge === 'AI'
                                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
                                    : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
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

        {/* GATEWAY STATUS FOOTER */}
        <div
          className={`p-3 border-t font-mono text-[10px] space-y-1 transition-colors ${
            isLight
              ? 'bg-slate-50 border-slate-200 text-slate-500'
              : 'bg-[#0B0F19] border-[#1C1F26] text-gray-500'
          }`}
        >
          <div className="flex items-center justify-between">
            <span>AYUSH / ABDM GATEWAY</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              ONLINE
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>POSTGRES PGVECTOR</span>
            <span className="text-gray-400 font-bold">150K RUBRICS</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarNav;

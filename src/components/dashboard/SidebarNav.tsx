'use client';

import React, { useState } from 'react';
import {
  Grid,
  BarChart2,
  Bot,
  Users,
  BookOpen,
  Microscope,
  Award,
  Calendar,
  Pill,
  GitCompare,
  Building,
  Box,
  Sun,
  Moon,
  X,
  User,
  UserCheck,
  Building2,
  HelpCircle,
  PhoneCall,
  History,
  Stethoscope,
  ShieldCheck,
  Sparkles,
  BookMarked,
  ChevronDown,
  ChevronRight,
  UserPlus,
  MessageSquare,
  GraduationCap,
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
  | 'ENTERPRISE_SUITE'
  | 'PATIENT_PROFILE'
  | 'DOCTOR_PROFILE'
  | 'HOSPITAL_PROFILE'
  | 'SUPPORT_HELP'
  | 'PROFILE_CREATION'
  | 'DISCUSSION_BLOGS'
  | 'CLINICAL_ACADEMY';

interface SidebarNavProps {
  activeTab: ActiveWorkspaceTab;
  onSelectTab: (tab: ActiveWorkspaceTab) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenLandingPage: () => void;
  langCode?: IndianLanguageCode;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  onSelectTab,
  theme,
  onToggleTheme,
  isMobileOpen,
  onCloseMobile,
  onOpenLandingPage,
  langCode = 'EN',
}) => {
  const isLight = theme === 'light';
  const pack = INDIAN_LANGUAGE_PACKS[langCode] || INDIAN_LANGUAGE_PACKS.EN;
  const labels = pack.labels;

  // EXPAND ALL / COLLAPSE ALL + INDIVIDUAL GROUP TOGGLE STATE
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    'OPD & PATIENT CARE SUITE': true,
    'AI DIFFERENTIAL & ANALYTICS': false,
    'MATERIA MEDICA & ACADEMY': false,
    'CLINIC ADMIN & ENTERPRISE': false,
  });

  const handleExpandAll = () => {
    setOpenGroups({
      'OPD & PATIENT CARE SUITE': true,
      'AI DIFFERENTIAL & ANALYTICS': true,
      'MATERIA MEDICA & ACADEMY': true,
      'CLINIC ADMIN & ENTERPRISE': true,
    });
  };

  const handleCollapseAll = () => {
    setOpenGroups({});
  };

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupTitle]: !prev[groupTitle],
    }));
  };

  const navGroups = [
    {
      groupTitle: labels.opdCareSuite,
      groupIcon: Stethoscope,
      accentColor: isLight
        ? 'bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200'
        : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/60',
      items: [
        {
          id: 'MATRIX_TELEHEALTH' as ActiveWorkspaceTab,
          label: labels.similiMatrixEngine,
          subLabel: labels.similiMatrixSub,
          icon: Grid,
          isLive: true,
        },
        {
          id: 'OPD_QUEUE_MANAGER' as ActiveWorkspaceTab,
          label: labels.opdQueue,
          subLabel: labels.opdQueueSub,
          icon: Calendar,
          isUhi: true,
        },
        {
          id: 'PATIENT_REPOSITORY' as ActiveWorkspaceTab,
          label: labels.patientRepository,
          subLabel: labels.patientRepositorySub,
          icon: History,
        },
        {
          id: 'PATIENT_PROFILE' as ActiveWorkspaceTab,
          label: labels.patientProfile,
          subLabel: labels.patientProfileSub,
          icon: User,
        },
        {
          id: 'PHARMACY_DISPENSARY' as ActiveWorkspaceTab,
          label: labels.pharmacy,
          subLabel: labels.pharmacySub,
          icon: Pill,
        },
      ],
    },
    {
      groupTitle: labels.aiAnalyticsSuite,
      groupIcon: Sparkles,
      accentColor: isLight
        ? 'bg-purple-100 text-purple-900 border-purple-300 hover:bg-purple-200'
        : 'bg-purple-950/80 text-purple-300 border-purple-500/40 hover:bg-purple-900/60',
      items: [
        {
          id: 'AI_CHATBOT' as ActiveWorkspaceTab,
          label: labels.aiCopilot,
          subLabel: labels.aiCopilotSub,
          icon: Bot,
          isAi: true,
        },
        {
          id: 'DIAGNOSTIC_LAB_AI' as ActiveWorkspaceTab,
          label: labels.aiDiagnosticLab,
          subLabel: labels.aiDiagnosticLabSub,
          icon: Microscope,
          isNew: true,
        },
        {
          id: 'ANALYTICS_GRAPHS' as ActiveWorkspaceTab,
          label: labels.clinicalAnalytics,
          subLabel: labels.clinicalAnalyticsSub,
          icon: BarChart2,
        },
        {
          id: 'DIFFERENTIAL_WORKBENCH' as ActiveWorkspaceTab,
          label: labels.differentialWorkbench,
          subLabel: labels.differentialWorkbenchSub,
          icon: GitCompare,
        },
      ],
    },
    {
      groupTitle: labels.materiaMedicaAcademySuite,
      groupIcon: BookMarked,
      accentColor: isLight
        ? 'bg-cyan-100 text-cyan-900 border-cyan-300 hover:bg-cyan-200'
        : 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40 hover:bg-cyan-900/60',
      items: [
        {
          id: 'MATERIA_MEDICA_LIBRARY' as ActiveWorkspaceTab,
          label: labels.materiaMedica,
          subLabel: labels.materiaMedicaSub,
          icon: BookOpen,
        },
        {
          id: 'AYUSH_RESEARCH_HUB' as ActiveWorkspaceTab,
          label: labels.ayushResearchHub,
          subLabel: labels.ayushResearchHubSub,
          icon: Award,
        },
        {
          id: 'CLINICAL_ACADEMY' as ActiveWorkspaceTab,
          label: labels.clinicalAcademy,
          subLabel: labels.clinicalAcademySub,
          icon: GraduationCap,
          isNew: true,
        },
        {
          id: 'DISCUSSION_BLOGS' as ActiveWorkspaceTab,
          label: labels.discussionBlogs,
          subLabel: labels.discussionBlogsSub,
          icon: MessageSquare,
          isNew: true,
        },
      ],
    },
    {
      groupTitle: labels.clinicAdminEnterpriseSuite,
      groupIcon: ShieldCheck,
      accentColor: isLight
        ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
        : 'bg-amber-950/80 text-amber-300 border-amber-500/40 hover:bg-amber-900/60',
      items: [
        {
          id: 'HOSPITAL_PROFILE' as ActiveWorkspaceTab,
          label: labels.hospitalProfile,
          subLabel: labels.hospitalProfileSub,
          icon: Building2,
        },
        {
          id: 'DOCTOR_PROFILE' as ActiveWorkspaceTab,
          label: labels.doctorProfile,
          subLabel: labels.doctorProfileSub,
          icon: UserCheck,
        },
        {
          id: 'PROFILE_CREATION' as ActiveWorkspaceTab,
          label: labels.patientProfile,
          subLabel: labels.patientProfileSub,
          icon: UserPlus,
          isNew: true,
        },
        {
          id: 'ENTERPRISE_SUITE' as ActiveWorkspaceTab,
          label: labels.enterpriseSuite,
          subLabel: labels.enterpriseSuiteSub,
          icon: Building,
        },
        {
          id: 'SUPPORT_HELP' as ActiveWorkspaceTab,
          label: labels.supportHelp,
          subLabel: labels.supportHelpSub,
          icon: HelpCircle,
          isLive: true,
        },
      ],
    },
  ];

  const sidebarContent = (
    <div
      className={`flex flex-col h-full font-mono text-xs transition-colors ${
        isLight
          ? 'bg-white border-r border-slate-200 text-slate-800'
          : 'bg-[#0B0F19] border-r border-[#1C1F26] text-gray-300'
      }`}
    >
      {/* BRAND HEADER */}
      <div
        className={`p-4 border-b flex items-center justify-between ${
          isLight ? 'border-slate-200' : 'border-[#1C1F26]'
        }`}
      >
        <button
          onClick={() => onOpenLandingPage && onOpenLandingPage()}
          title="Return to Home / Landing Portal"
          className="flex items-center space-x-2.5 text-left cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white font-black text-sm shadow-md">
            M
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span
                className={`font-black tracking-wider text-sm ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                MATERIAGRID
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                v2.4
              </span>
            </div>
            <p className="text-[10px] text-gray-400 font-bold">
              PRECISION CLINICAL AI
            </p>
          </div>
        </button>

        <button
          onClick={onToggleTheme}
          title="Toggle Light / Dark mode"
          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
            isLight
              ? 'border-slate-300 text-slate-700 hover:bg-slate-100'
              : 'border-slate-800 text-gray-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          {isLight ? (
            <Moon className="w-3.5 h-3.5" />
          ) : (
            <Sun className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* EXPAND ALL / COLLAPSE ALL ACTION BAR */}
      <div
        className={`px-3 py-2 border-b flex items-center justify-between font-mono text-[10px] ${
          isLight
            ? 'bg-slate-50 border-slate-200 text-slate-600'
            : 'bg-[#090A0C] border-[#1C1F26] text-gray-400'
        }`}
      >
        <span className="font-bold uppercase tracking-wider text-[9px]">
          Suites Tree
        </span>
        <div className="flex items-center space-x-1.5">
          <button
            onClick={handleExpandAll}
            className="px-2 py-0.5 rounded border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black hover:bg-emerald-500/20 cursor-pointer transition-all"
            title="Expand all 4 clinical suites"
          >
            Expand All
          </button>
          <button
            onClick={handleCollapseAll}
            className={`px-2 py-0.5 rounded border font-black cursor-pointer transition-all ${
              isLight
                ? 'border-slate-300 bg-white hover:bg-slate-100 text-slate-700'
                : 'border-slate-800 bg-[#111317] hover:bg-slate-800 text-gray-300'
            }`}
            title="Collapse all clinical suites"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* NAVIGATION SCROLL AREA */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {navGroups.map((group, groupIdx) => {
          const GroupIcon = group.groupIcon;
          const isExpanded = !!openGroups[group.groupTitle];

          return (
            <div key={groupIdx} className="space-y-1.5">
              {/* COLLAPSIBLE / EXPANDABLE HIGH-CONTRAST HEADER BUTTON */}
              <button
                onClick={() => toggleGroup(group.groupTitle)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border font-black text-[11px] tracking-wider uppercase transition-all cursor-pointer ${group.accentColor}`}
              >
                <div className="flex items-center space-x-2">
                  <GroupIcon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{group.groupTitle}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-white/40 dark:bg-black/30 font-bold">
                    {group.items.length}
                  </span>
                  {!isExpanded ? (
                    <ChevronRight className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </div>
              </button>

              {/* COLLAPSIBLE ITEMS LIST — ONLY ONE CATEGORY EXPANDED AT A TIME */}
              {isExpanded && (
                <div className="space-y-1 pl-1">
                  {group.items.map((item: any) => {
                    const isActive = activeTab === item.id;
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectTab(item.id);
                          onCloseMobile();
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl border transition-all duration-150 transform hover:scale-[1.01] cursor-pointer flex items-center justify-between ${
                          isActive
                            ? isLight
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold shadow-xs'
                              : 'bg-gradient-to-r from-emerald-600/20 to-teal-600/10 border-emerald-500/60 text-white font-bold shadow-md'
                            : isLight
                            ? 'border-transparent text-slate-700 hover:bg-slate-100'
                            : 'border-transparent text-gray-400 hover:bg-[#111317] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon
                            className={`w-4 h-4 flex-shrink-0 ${
                              isActive
                                ? 'text-emerald-500'
                                : isLight
                                ? 'text-slate-500'
                                : 'text-gray-400'
                            }`}
                          />
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <span className="text-xs font-black">
                                {item.label}
                              </span>
                            </div>
                            <p className="text-[10px] text-gray-400 font-medium">
                              {item.subLabel}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1">
                          {item.isLive && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded font-black bg-emerald-600 text-white animate-pulse">
                              LIVE
                            </span>
                          )}
                          {item.isUhi && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded font-black bg-cyan-600 text-white">
                              UHI
                            </span>
                          )}
                          {item.isAi && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded font-black bg-purple-600 text-white">
                              AI
                            </span>
                          )}
                          {item.isNew && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded font-black bg-amber-600 text-white">
                              NEW
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* FOOTER ACTION: 3D LANDING SHOWCASE & ABDM STATUS */}
      <div
        className={`p-3 border-t space-y-2 ${
          isLight ? 'border-slate-200' : 'border-[#1C1F26]'
        }`}
      >
        <button
          onClick={onOpenLandingPage}
          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-all transform hover:scale-[1.02] cursor-pointer"
        >
          <Box className="w-3.5 h-3.5" />
          <span>Open 3D Public Showcase</span>
        </button>

        <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold px-1">
          <span className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>AYUSH / ABDM GATEWAY</span>
          </span>
          <span className="text-emerald-500 font-mono">ONLINE</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP PERMANENT SIDEBAR */}
      <aside className="hidden lg:block w-72 h-full flex-shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* MOBILE / TABLET OVERLAY DRAWER */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <aside className="relative w-80 max-w-full h-full z-10 shadow-2xl">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default SidebarNav;

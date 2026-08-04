'use client';

import React, { useState } from 'react';
import {
  User,
  UserCheck,
  Building2,
  ShieldAlert,
  Settings,
  LogOut,
  LogIn,
  Sun,
  Moon,
  ChevronDown,
  CheckCircle2,
  Lock,
  Globe,
  Bell,
  Eye,
  Award,
} from 'lucide-react';
import { useRbac } from '@/lib/auth/rbac_context';

export type RbacRole =
  | 'PHYSICIAN'
  | 'PATIENT'
  | 'HOSPITAL_ADMIN'
  | 'SYSTEM_ADMIN';

interface UserPersonaHeaderWidgetProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onSelectTab?: (tab: any) => void;
}

export const UserPersonaHeaderWidget: React.FC<
  UserPersonaHeaderWidgetProps
> = ({ theme, onToggleTheme, onSelectTab }) => {
  const isLight = theme === 'light';
  const { currentUser, switchRole, setIsLoginModalOpen } = useRbac();
  const [isOpen, setIsOpen] = useState(false);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [defaultPotency, setDefaultPotency] = useState('200C');

  const personas: {
    role: RbacRole;
    name: string;
    sub: string;
    icon: any;
    color: string;
  }[] = [
    {
      role: 'PHYSICIAN',
      name: 'Dr. Nitin Aggarwal',
      sub: 'MD (Hom.) • CCH-WB-2014-4921',
      icon: UserCheck,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/40',
    },
    {
      role: 'PATIENT',
      name: 'Ramesh Kumar Sharma',
      sub: 'ABHA: 91-4829-1049-3829',
      icon: User,
      color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/40',
    },
    {
      role: 'HOSPITAL_ADMIN',
      name: 'Dr. S. K. Banerjee',
      sub: 'OPD Director • NIH Kolkata',
      icon: Building2,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/40',
    },
    {
      role: 'SYSTEM_ADMIN',
      name: 'AYUSH Regulatory Auditor',
      sub: 'Ministry of AYUSH Gateway',
      icon: ShieldAlert,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/40',
    },
  ];

  const currentPersona =
    personas.find((p) => p.role === currentUser.role) || personas[0];

  const handleSwitchPersona = (role: RbacRole) => {
    switchRole(role);
    if (onSelectTab) {
      if (role === 'PATIENT') onSelectTab('PATIENT_PROFILE');
      if (role === 'PHYSICIAN') onSelectTab('MATRIX_TELEHEALTH');
      if (role === 'HOSPITAL_ADMIN') onSelectTab('HOSPITAL_PROFILE');
    }
    setIsOpen(false);
  };

  return (
    <div className="relative font-mono text-xs z-50">
      {/* TOP-RIGHT USER PERSONA BADGE */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center space-x-2.5 px-3 py-1.5 rounded-xl border transition-all duration-150 transform hover:scale-105 cursor-pointer shadow-sm ${
          isLight
            ? 'bg-slate-50 border-slate-300 text-slate-900 hover:bg-slate-100'
            : 'bg-[#0B0F19] border-[#1C1F26] text-white hover:bg-slate-800'
        }`}
        title="View as Persona, Logged-In Info, Preferences & Settings"
      >
        <div className="relative">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white font-black text-xs shadow">
            {currentPersona.name.charAt(0)}
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#05070A] absolute -bottom-0.5 -right-0.5" />
        </div>

        <div className="hidden sm:block text-left">
          <div className="flex items-center space-x-1.5">
            <span className="font-black text-xs leading-none">
              {currentPersona.name}
            </span>
            <span className="text-[9px] px-1.5 py-0.2 rounded font-black bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              {currentUser.role}
            </span>
          </div>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate max-w-[150px]">
            {currentPersona.sub}
          </p>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* EXECUTIVE ACCOUNT & PERSONA CONTROLS POPOVER DRAWER */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={`absolute right-0 mt-2 w-80 rounded-2xl border p-4 shadow-2xl z-50 space-y-4 transition-colors ${
              isLight
                ? 'bg-white border-slate-200 text-slate-900'
                : 'bg-[#0B0F19] border-[#1C1F26] text-white'
            }`}
          >
            {/* CURRENT LOGGED-IN USER INFO CARD */}
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-[#111317] border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                  ACTIVE LOGGED-IN SESSION
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-600 text-white font-black">
                  HIPAA / ABDM SIGNED
                </span>
              </div>
              <div className="flex items-center space-x-3 pt-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white font-black text-base shadow">
                  {currentPersona.name.charAt(0)}
                </div>
                <div>
                  <p className="font-black text-xs">{currentPersona.name}</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">
                    {currentPersona.sub}
                  </p>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                    <Lock className="w-3 h-3" /> ROLE: {currentUser.role}
                  </span>
                </div>
              </div>
            </div>

            {/* VIEW AS PERSONA SWITCHER SECTION */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-black uppercase text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-cyan-500" /> VIEW AS PERSONA (SIMULATION):
                </span>
              </div>

              <div className="space-y-1">
                {personas.map((p) => {
                  const Icon = p.icon;
                  const isSelected = currentUser.role === p.role;
                  return (
                    <button
                      key={p.role}
                      onClick={() => handleSwitchPersona(p.role)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-500/10 font-bold'
                          : 'border-transparent hover:bg-slate-100 dark:hover:bg-[#111317] text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <span className="text-xs font-black">
                              {p.name}
                            </span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 font-black">
                              {p.role}
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400">
                            {p.sub}
                          </p>
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PREFERENCES & CLINIC SETTINGS */}
            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs">
              <span className="text-[10px] font-black uppercase text-gray-500 dark:text-gray-400 block">
                USER PREFERENCES & CLINIC SETTINGS
              </span>

              {/* LIGHT / DARK THEME TOGGLE */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Visual Appearance Mode
                </span>
                <button
                  onClick={onToggleTheme}
                  className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 font-black text-[11px] flex items-center space-x-1 cursor-pointer hover:bg-emerald-500/10"
                >
                  {isLight ? (
                    <>
                      <Moon className="w-3.5 h-3.5" />
                      <span>Switch to Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-3.5 h-3.5" />
                      <span>Switch to Light Mode</span>
                    </>
                  )}
                </button>
              </div>

              {/* DEFAULT SIMILLIMUM POTENCY */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Default Rx Potency
                </span>
                <select
                  value={defaultPotency}
                  onChange={(e) => setDefaultPotency(e.target.value)}
                  className="px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700 bg-transparent font-black text-xs"
                >
                  <option value="30C">30C</option>
                  <option value="200C">200C</option>
                  <option value="1M">1M</option>
                  <option value="LM1">LM1 Organopathy</option>
                </select>
              </div>
            </div>

            {/* LOGIN & LOGOUT OPTIONS */}
            <div className="flex items-center space-x-2 pt-1 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-100 dark:bg-[#111317] hover:bg-slate-200 dark:hover:bg-slate-800 font-black text-xs flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Switch RBAC Login</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="py-2 px-3 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-600 dark:text-red-400 border border-red-500/30 font-black text-xs flex items-center justify-center space-x-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserPersonaHeaderWidget;

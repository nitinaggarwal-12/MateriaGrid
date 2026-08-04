'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  UserCheck,
  Building2,
  KeyRound,
  CheckCircle2,
  X,
  Eye,
  FileText,
  AlertCircle,
  Activity,
} from 'lucide-react';
import { useRbac, UserRole } from '@/lib/auth/rbac_context';

export const RbacLoginModal: React.FC = () => {
  const {
    currentUser,
    permissions,
    switchRole,
    isLoginModalOpen,
    setIsLoginModalOpen,
    auditLog,
  } = useRbac();

  if (!isLoginModalOpen) return null;

  const roleDescriptions: Record<
    UserRole,
    { title: string; desc: string; icon: any; color: string }
  > = {
    PHYSICIAN: {
      title: 'Licensed Physician / Homeopath',
      desc: 'Full access to SimiliMatrix repertorization, clinical calculations, prescription slips, and historical patient encounter chains.',
      icon: UserCheck,
      color: 'border-emerald-500 text-emerald-400 bg-emerald-500/10',
    },
    PATIENT: {
      title: 'Patient (Self-Service ABHA Portal)',
      desc: 'Strict HIPAA PHI isolation. Read-only access to own prescription slip and verified health locker. Other patients masked.',
      icon: Lock,
      color: 'border-cyan-500 text-cyan-400 bg-cyan-500/10',
    },
    HOSPITAL_ADMIN: {
      title: 'AYUSH Hospital / OPD Administrator',
      desc: 'Manages OPD waiting room queues, UHI tokens, hospital inventory, and institutional compliance.',
      icon: Building2,
      color: 'border-purple-500 text-purple-400 bg-purple-500/10',
    },
    SYSTEM_ADMIN: {
      title: 'Root Enterprise Platform Auditor',
      desc: 'Unrestricted enterprise fleet RBAC, quantum telemetry diagnostics, and HIPAA cryptographic audit logs.',
      icon: ShieldCheck,
      color: 'border-amber-500 text-amber-400 bg-amber-500/10',
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs font-mono p-4">
      <div className="w-full max-w-4xl bg-[#0B0F19] text-white border border-[#1C1F26] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* MODAL HEADER */}
        <div className="p-5 border-b border-[#1C1F26] bg-[#05070A] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 flex items-center justify-center text-white font-black shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase text-white tracking-wider">
                HIPAA, ABDM FHIR & DPDP ACT AUTHENTICATION & ROLE-BASED ACCESS CONTROL
              </h3>
              <p className="text-xs text-emerald-400 font-bold">
                End-to-End Encrypted (AES-256-GCM) • Cryptographic Consent Hash Audit Active
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="p-1.5 rounded-lg border border-slate-800 text-gray-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 space-y-6 text-xs max-h-[80vh] overflow-y-auto">
          {/* CURRENT AUTHENTICATED USER STATUS BANNER */}
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-400">
                ACTIVE AUTHENTICATED IDENTITY
              </span>
              <p className="text-base font-black text-white mt-0.5">
                {currentUser.name}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Role: <strong className="text-emerald-300">{currentUser.role}</strong> • Reg/ID: <strong className="font-mono text-cyan-300">{currentUser.registrationNumber}</strong>
              </p>
            </div>

            <div className="text-right">
              <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-black text-[11px] inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> HIPAA & DPDP COMPLIANT
              </span>
              <p className="text-[10px] text-gray-500 font-mono mt-1">
                SESSION: {currentUser.hipaaCompliantSessionId}
              </p>
            </div>
          </div>

          {/* ROLE SELECTOR CARDS */}
          <div className="space-y-3">
            <span className="font-black text-gray-400 uppercase tracking-wider block">
              SELECT ROLE TO TEST PII/PHI PRIVACY & COMPLIANCE ENFORCEMENT:
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(
                [
                  'PHYSICIAN',
                  'PATIENT',
                  'HOSPITAL_ADMIN',
                  'SYSTEM_ADMIN',
                ] as UserRole[]
              ).map((role) => {
                const isSelected = currentUser.role === role;
                const info = roleDescriptions[role];
                const Icon = info.icon;

                return (
                  <button
                    key={role}
                    onClick={() => switchRole(role)}
                    className={`p-4 rounded-2xl border text-left transition-all transform hover:scale-[1.01] cursor-pointer ${
                      isSelected
                        ? `${info.color} shadow-lg font-bold`
                        : 'bg-[#111317] border-slate-800 text-gray-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4" />
                        <span className="font-black text-xs">{role}</span>
                      </div>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-600 text-white">
                          ACTIVE ROLE
                        </span>
                      )}
                    </div>
                    <p className="font-black text-sm mt-1.5 text-white">
                      {info.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      {info.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE PERMISSIONS ENFORCEMENT SUMMARY */}
          <div className="p-4 rounded-xl bg-[#111317] border border-slate-800 space-y-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
              ACTIVE PERMISSION RULES FOR ({currentUser.role}):
            </span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-1">
              <span
                className={`p-2 rounded-lg font-bold text-center border ${
                  permissions.canEditSimiliMatrix
                    ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-400'
                    : 'bg-red-600/10 border-red-500/30 text-red-400'
                }`}
              >
                {permissions.canEditSimiliMatrix ? '✓ Edit SimiliMatrix' : '✕ Matrix Edit Locked'}
              </span>

              <span
                className={`p-2 rounded-lg font-bold text-center border ${
                  permissions.canIssuePrescriptions
                    ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-400'
                    : 'bg-red-600/10 border-red-500/30 text-red-400'
                }`}
              >
                {permissions.canIssuePrescriptions ? '✓ Issue Prescriptions' : '✕ Rx Issuance Locked'}
              </span>

              <span
                className={`p-2 rounded-lg font-bold text-center border ${
                  permissions.canViewAllPatientsEhr
                    ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-400'
                    : 'bg-orange-600/20 border-orange-500/40 text-orange-300'
                }`}
              >
                {permissions.canViewAllPatientsEhr
                  ? '✓ View Patient Dossiers'
                  : '🔒 Strict HIPAA Self-Only PHI'}
              </span>
            </div>
          </div>

          {/* CRYPTOGRAPHIC AUDIT LOG */}
          <div className="space-y-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" /> LIVE COMPLIANCE & ACCESS AUDIT LEDGER
            </span>
            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {auditLog.map((log, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-[#05070A] border border-slate-800 flex items-center justify-between text-xs"
                >
                  <span className="text-emerald-400 font-mono font-bold">
                    [{log.timestamp}]
                  </span>
                  <span className="text-gray-300 font-bold flex-1 mx-3">
                    {log.action}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-black bg-slate-800 text-white">
                    {log.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 border-t border-[#1C1F26] bg-[#05070A] flex items-center justify-between">
          <span className="text-xs text-gray-400 font-bold">
            All PII & PHI encrypted under ABDM FHIR cryptographic token rules.
          </span>
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs cursor-pointer"
          >
            Apply RBAC Settings & Return to OPD
          </button>
        </div>
      </div>
    </div>
  );
};

export default RbacLoginModal;

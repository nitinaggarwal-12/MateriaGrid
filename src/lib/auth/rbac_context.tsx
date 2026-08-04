'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole =
  | 'SYSTEM_ADMIN'
  | 'HOSPITAL_ADMIN'
  | 'PHYSICIAN'
  | 'PATIENT';

export interface AuthenticatedUser {
  id: string;
  name: string;
  role: UserRole;
  registrationNumber: string;
  abhaId?: string;
  hospitalName: string;
  hipaaCompliantSessionId: string;
}

export interface RbacPermissions {
  canEditSimiliMatrix: boolean;
  canIssuePrescriptions: boolean;
  canViewAllPatientsEhr: boolean;
  canAccessTelemetryAndFleet: boolean;
  canManageOpdQueue: boolean;
  piiMaskingRequired: boolean;
}

interface RbacContextType {
  currentUser: AuthenticatedUser;
  permissions: RbacPermissions;
  switchRole: (role: UserRole) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  auditLog: { timestamp: string; action: string; role: UserRole }[];
}

const DEFAULT_USERS: Record<UserRole, AuthenticatedUser> = {
  PHYSICIAN: {
    id: 'usr-doc-01',
    name: 'Dr. Nitin Aggarwal (MD Hom.)',
    role: 'PHYSICIAN',
    registrationNumber: 'AYUSH-DEL-2026-90412',
    hospitalName: 'National Institute of Homeopathy & ABDM UHI Hub',
    hipaaCompliantSessionId: 'HIPAA-E2EE-AES256-DOC-8891',
  },
  PATIENT: {
    id: 'usr-pat-01',
    name: 'Ramesh Kumar Sharma',
    role: 'PATIENT',
    registrationNumber: 'PATIENT-SELF-PORTAL',
    abhaId: '91-4829-1049-3829',
    hospitalName: 'ABHA Health Locker Personal Access',
    hipaaCompliantSessionId: 'HIPAA-E2EE-AES256-PAT-1102',
  },
  HOSPITAL_ADMIN: {
    id: 'usr-hosp-admin-01',
    name: 'Clinical OPD Operations Director',
    role: 'HOSPITAL_ADMIN',
    registrationNumber: 'HOSP-ADMIN-AIIMS-AYUSH-04',
    hospitalName: 'National Institute of Homeopathy OPD Fleet',
    hipaaCompliantSessionId: 'HIPAA-E2EE-AES256-ADM-4412',
  },
  SYSTEM_ADMIN: {
    id: 'usr-sys-admin-01',
    name: 'Chief Security & Regulatory Officer',
    role: 'SYSTEM_ADMIN',
    registrationNumber: 'SEC-COMPLIANCE-DPDP-HIPAA-01',
    hospitalName: 'MateriaGrid Global Enterprise Fleet',
    hipaaCompliantSessionId: 'HIPAA-E2EE-AES256-SYS-9900',
  },
};

export const getPermissionsForRole = (role: UserRole): RbacPermissions => {
  switch (role) {
    case 'PHYSICIAN':
      return {
        canEditSimiliMatrix: true,
        canIssuePrescriptions: true,
        canViewAllPatientsEhr: true,
        canAccessTelemetryAndFleet: true,
        canManageOpdQueue: true,
        piiMaskingRequired: false,
      };
    case 'PATIENT':
      return {
        canEditSimiliMatrix: false,
        canIssuePrescriptions: false,
        canViewAllPatientsEhr: false, // Strict HIPAA PHI Isolation!
        canAccessTelemetryAndFleet: false,
        canManageOpdQueue: false,
        piiMaskingRequired: true,
      };
    case 'HOSPITAL_ADMIN':
      return {
        canEditSimiliMatrix: false,
        canIssuePrescriptions: false,
        canViewAllPatientsEhr: true,
        canAccessTelemetryAndFleet: true,
        canManageOpdQueue: true,
        piiMaskingRequired: false,
      };
    case 'SYSTEM_ADMIN':
      return {
        canEditSimiliMatrix: true,
        canIssuePrescriptions: true,
        canViewAllPatientsEhr: true,
        canAccessTelemetryAndFleet: true,
        canManageOpdQueue: true,
        piiMaskingRequired: false,
      };
  }
};

const RbacContext = createContext<RbacContextType | undefined>(undefined);

export const RbacProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser>(
    DEFAULT_USERS.PHYSICIAN
  );
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [auditLog, setAuditLog] = useState<
    { timestamp: string; action: string; role: UserRole }[]
  >([
    {
      timestamp: new Date().toLocaleTimeString(),
      action: 'Session authenticated via AES-256-GCM ABDM FHIR Gateway',
      role: 'PHYSICIAN',
    },
  ]);

  const switchRole = (role: UserRole) => {
    const nextUser = DEFAULT_USERS[role];
    setCurrentUser(nextUser);
    setAuditLog((prev) => [
      {
        timestamp: new Date().toLocaleTimeString(),
        action: `Switched active RBAC role to ${role} (${nextUser.name})`,
        role,
      },
      ...prev,
    ]);
  };

  const permissions = getPermissionsForRole(currentUser.role);

  return (
    <RbacContext.Provider
      value={{
        currentUser,
        permissions,
        switchRole,
        isLoginModalOpen,
        setIsLoginModalOpen,
        auditLog,
      }}
    >
      {children}
    </RbacContext.Provider>
  );
};

export const useRbac = () => {
  const context = useContext(RbacContext);
  if (!context) {
    throw new Error('useRbac must be used within an RbacProvider');
  }
  return context;
};

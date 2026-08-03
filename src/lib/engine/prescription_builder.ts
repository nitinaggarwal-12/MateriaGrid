/**
 * MATERIAGRID — DOSAGE, DURATION & CROSS-INDICATION ANALYZER
 * -------------------------------------------------------------
 * Structures clinical prescription insight payloads without prescriptive liability,
 * extracting systemic avenues of utility and observation timelines.
 */

import { RemedyRankingResult } from './repertorization';

export interface PrescriptionInsightPayload {
  remedyCode: string;
  fullName: string;
  asymmetricalScore: number;
  durationTimeline: string;
  systemicAvenuesOfUtility: string[];
  safetyNotice: string;
}

export function buildPrescriptionInsight(
  topRemedy: RemedyRankingResult,
  systemicAvenues: string[]
): PrescriptionInsightPayload {
  const durationTimeline = topRemedy.isDrainageRemedy
    ? 'Typical organopathic management involves a 14-day observation period, followed by clinical assessment.'
    : 'Single initial tracking point baseline. Allow the system matrix to respond for 7 clear recovery days before introducing adjustments.';

  const safetyNotice = topRemedy.safetyAlertFlag
    ? 'CRITICAL SAFETY NOTICE: Advanced structural pathology detected. Consult a licensed healthcare professional regarding remedy management. A low-potency drainage pathway is typically prioritized.'
    : 'Standard physiological monitoring active. Ensure an absolute 30-minute clean interval before and after consuming medicine.';

  return {
    remedyCode: topRemedy.remedyCode,
    fullName: topRemedy.fullName,
    asymmetricalScore: topRemedy.asymmetricalSpecificityScore,
    durationTimeline,
    systemicAvenuesOfUtility: systemicAvenues,
    safetyNotice,
  };
}

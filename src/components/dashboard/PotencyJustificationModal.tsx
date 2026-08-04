'use client';

import React from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  Info,
  X,
  Award,
  Activity,
  Flame,
  Droplets,
  HelpCircle,
} from 'lucide-react';

export interface PotencyTierAnalysis {
  potency: 'Q / Mother Tincture' | '30C' | '200C' | '1M / 10M' | 'LM1 Water Potency';
  status: 'RECOMMENDED' | 'EXCLUDED_AGGRAVATION' | 'EXCLUDED_INEFFECTIVE' | 'ALTERNATIVE_SAFE';
  confidenceScore: number; // 0 to 100
  clinicalReasoning: string;
  sideEffectOrNoEffectWarning: string;
}

export interface RemedyPotencyProfile {
  remedyCode: string;
  remedyFullName: string;
  recommendedPotency: string;
  recommendedConfidence: number;
  miasmaticFocus: string;
  organAffinity: string;
  potencyTiers: PotencyTierAnalysis[];
}

export const REMEDY_POTENCY_PROFILES: Record<string, RemedyPotencyProfile> = {
  Bell: {
    remedyCode: 'Bell',
    remedyFullName: 'Atropa Belladonna',
    recommendedPotency: '200C',
    recommendedConfidence: 94,
    miasmaticFocus: 'Acute Psoric / Violent Vascular Congestion',
    organAffinity: 'Cerebral Arterial Circulation & Hypothalamus',
    potencyTiers: [
      {
        potency: 'Q / Mother Tincture',
        status: 'EXCLUDED_INEFFECTIVE',
        confidenceScore: 21,
        clinicalReasoning:
          'Crude mother tincture acts physiologically rather than dynamically on the vital force.',
        sideEffectOrNoEffectWarning:
          'CRUDE MATERIAL SIDE-EFFECT RISK: Potential atropine anticholinergic side-effects (dry mouth, blurred vision, tachycardia) with NO dynamic effect on acute mental anxiety.',
      },
      {
        potency: '30C',
        status: 'ALTERNATIVE_SAFE',
        confidenceScore: 84,
        clinicalReasoning:
          'Effective for mild localized acute arterial congestion or early childhood fever.',
        sideEffectOrNoEffectWarning:
          'PARTIAL EFFECT / NO PERMANENT CENTER ACTION: Acts superficially on physical symptoms; may require repeated dosing if mental business anxiety persists.',
      },
      {
        potency: '200C',
        status: 'RECOMMENDED',
        confidenceScore: 94,
        clinicalReasoning:
          'Optimal dynamic potency matching intense carotid throbbing and acute mental business restlessness (§210–213).',
        sideEffectOrNoEffectWarning:
          'RECOMMENDED PRESCRIBED POTENCY: Zero crude side-effects; single dose acts deeply on vital dynamics with high clinical precision.',
      },
      {
        potency: '1M / 10M',
        status: 'EXCLUDED_AGGRAVATION',
        confidenceScore: 18,
        clinicalReasoning:
          'Ultra-high dynamic potency triggering violent cerebral vascular surge.',
        sideEffectOrNoEffectWarning:
          'VIOLENT MEDICINAL AGGRAVATION RISK: High probability of explosive headache escalation or hypertensive surge in acute vascular congestion.',
      },
      {
        potency: 'LM1 Water Potency',
        status: 'ALTERNATIVE_SAFE',
        confidenceScore: 88,
        clinicalReasoning:
          'Gentle Hahnemannian fifty-millesimal liquid administration for hyper-sensitive nervous systems.',
        sideEffectOrNoEffectWarning:
          'SAFE ALTERNATIVE: Prevents medicinal aggravation; requires daily succussed liquid dosing.',
      },
    ],
  },
  Chel: {
    remedyCode: 'Chel',
    remedyFullName: 'Chelidonium Majus',
    recommendedPotency: 'Q / 1X–3X Mother Tincture',
    recommendedConfidence: 96,
    miasmaticFocus: 'Dr. Burnett Tissue Drainage & Hepatobiliary Organopathy',
    organAffinity: 'Hepatic Parenchyma, Falciform Ligament & Biliary Ducts',
    potencyTiers: [
      {
        potency: 'Q / Mother Tincture',
        status: 'RECOMMENDED',
        confidenceScore: 96,
        clinicalReasoning:
          'Dr. J.C. Burnett Organopathy Golden Standard: Low organ-affine material doses directly stimulate liver biliary drainage and biliary excretion.',
        sideEffectOrNoEffectWarning:
          'RECOMMENDED ORGAN DRAINAGE POTENCY: Safe tissue drainage cushion before high-potency constitutional prescribing.',
      },
      {
        potency: '30C',
        status: 'ALTERNATIVE_SAFE',
        confidenceScore: 78,
        clinicalReasoning:
          'Useful when right scapular pain is accompanied by neuralgic right-sided symptoms.',
        sideEffectOrNoEffectWarning:
          'LOWER PHYSICAL DRAINAGE ACTION: Slower mechanical bile flow stimulation than tincture or low trituration.',
      },
      {
        potency: '200C',
        status: 'EXCLUDED_INEFFECTIVE',
        confidenceScore: 32,
        clinicalReasoning:
          'Too dynamic for direct physiological hepatobiliary tissue drainage in structural cirrhosis.',
        sideEffectOrNoEffectWarning:
          'INEFFECTIVE ON PHYSICAL TISSUE LESION: High centesimal potency bypasses physiological organ filtration when hepatic stasis predominates.',
      },
      {
        potency: '1M / 10M',
        status: 'EXCLUDED_AGGRAVATION',
        confidenceScore: 12,
        clinicalReasoning:
          'High potency in cirrhotic or organ-failure states without prior drainage cushion.',
        sideEffectOrNoEffectWarning:
          'SEVERE ORGANIC AGGRAVATION RISK: Can overload damaged hepatic parenchyma and exacerbate jaundice or liver enzymes.',
      },
      {
        potency: 'LM1 Water Potency',
        status: 'ALTERNATIVE_SAFE',
        confidenceScore: 82,
        clinicalReasoning:
          'Fifty-millesimal gentle tissue support for chronic liver pathology.',
        sideEffectOrNoEffectWarning:
          'SAFE ALTERNATIVE: Gentle liver support without aggravation risk.',
      },
    ],
  },
  NuxV: {
    remedyCode: 'Nux-v',
    remedyFullName: 'Nux Vomica',
    recommendedPotency: '200C (Evening Dose)',
    recommendedConfidence: 95,
    miasmaticFocus: 'Psoric-Sycosic Sedentary & Gastric Motility Over-Stimulation',
    organAffinity: 'Gastric Mucous Membrane & Portal Motility Axis',
    potencyTiers: [
      {
        potency: 'Q / Mother Tincture',
        status: 'EXCLUDED_INEFFECTIVE',
        confidenceScore: 19,
        clinicalReasoning:
          'Strychnos Nux-vomica crude tincture contains strychnine alkaloids.',
        sideEffectOrNoEffectWarning:
          'TOXIC ALKALOID SIDE-EFFECT RISK: Crude dose risks hyper-reflexia and GI cramping with NO dynamic resolution of sedentary irritability.',
      },
      {
        potency: '30C',
        status: 'ALTERNATIVE_SAFE',
        confidenceScore: 82,
        clinicalReasoning:
          'Effective for acute hangover indigestion or acute dietary over-indulgence.',
        sideEffectOrNoEffectWarning:
          'PARTIAL DURATION: May require repeated doses if constitutional business over-work persists.',
      },
      {
        potency: '200C',
        status: 'RECOMMENDED',
        confidenceScore: 95,
        clinicalReasoning:
          'Classic Hahnemannian evening dose for irritable business executives with sedentary constipation (§210).',
        sideEffectOrNoEffectWarning:
          'RECOMMENDED PRESCRIBED POTENCY: Deep constitutional action resolving visceral hyper-acidity and mental irritability.',
      },
      {
        potency: '1M / 10M',
        status: 'EXCLUDED_AGGRAVATION',
        confidenceScore: 24,
        clinicalReasoning:
          'Ultra-high potency in hyper-irritable nervous systems.',
        sideEffectOrNoEffectWarning:
          'INSOMNIA & NERVOUS AGGRAVATION RISK: Can induce severe insomnia, violent twitching, and heightened irritability.',
      },
      {
        potency: 'LM1 Water Potency',
        status: 'ALTERNATIVE_SAFE',
        confidenceScore: 89,
        clinicalReasoning:
          'Ideal for sensitive digestive tracts requiring smooth daily regulation.',
        sideEffectOrNoEffectWarning:
          'SAFE ALTERNATIVE: Smooth non-aggravating digestive recovery.',
      },
    ],
  },
  AntT: {
    remedyCode: 'Ant-t',
    remedyFullName: 'Antimonium Tartaricum',
    recommendedPotency: '6C / 30C',
    recommendedConfidence: 93,
    miasmaticFocus: 'Endodermal Alveolar Exudation & Paralytic Expectoration',
    organAffinity: 'Broncho-Pulmonary Alveoli & Tracheobronchial Mucosa',
    potencyTiers: [
      {
        potency: 'Q / Mother Tincture',
        status: 'EXCLUDED_AGGRAVATION',
        confidenceScore: 14,
        clinicalReasoning:
          'Tartar Emetic crude doses act as a violent emetic depressant.',
        sideEffectOrNoEffectWarning:
          'SEVERE CARDIAC DEPRESSION SIDE-EFFECT: Crude doses cause violent vomiting, collapse, and respiratory depression.',
      },
      {
        potency: '30C',
        status: 'RECOMMENDED',
        confidenceScore: 93,
        clinicalReasoning:
          'Safely stimulates expectoration reflex in coarse rattling chest mucus without cardiac depression.',
        sideEffectOrNoEffectWarning:
          'RECOMMENDED PRESCRIBED POTENCY: Rapid bronchial clearance without vomiting or collapse.',
      },
      {
        potency: '200C',
        status: 'ALTERNATIVE_SAFE',
        confidenceScore: 76,
        clinicalReasoning:
          'Indicated when drowsiness and cyanosis accompany chronic respiratory failure.',
        sideEffectOrNoEffectWarning:
          'MONITOR CAREFULLY: Use only if patient has adequate vitality to clear dislodged mucus.',
      },
      {
        potency: '1M / 10M',
        status: 'EXCLUDED_INEFFECTIVE',
        confidenceScore: 20,
        clinicalReasoning:
          'Too dynamic when immediate physical mucus clearing is needed.',
        sideEffectOrNoEffectWarning:
          'NO IMMEDIATE BRONCHIAL DRAINAGE EFFECT: High potency fails to clear heavy mechanical alveolar exudate.',
      },
      {
        potency: 'LM1 Water Potency',
        status: 'ALTERNATIVE_SAFE',
        confidenceScore: 87,
        clinicalReasoning:
          'Gentle repeated succussed doses in frail elderly pulmonary cases.',
        sideEffectOrNoEffectWarning:
          'SAFE ALTERNATIVE: Continuous gentle expectoration support.',
      },
    ],
  },
};

// Default generic generator for any remedy not explicitly in dictionary
export function getRemedyPotencyProfile(
  remedyCode: string,
  remedyName: string,
  recommendedPotency: string = '200C'
): RemedyPotencyProfile {
  if (REMEDY_POTENCY_PROFILES[remedyCode]) {
    return REMEDY_POTENCY_PROFILES[remedyCode];
  }

  const isTinctureRecommended =
    recommendedPotency.includes('Q') || recommendedPotency.includes('1X');

  return {
    remedyCode,
    remedyFullName: remedyName,
    recommendedPotency,
    recommendedConfidence: 91,
    miasmaticFocus: 'Classical Constitutional Totality',
    organAffinity: 'Systemic Vital Dynamics',
    potencyTiers: [
      {
        potency: 'Q / Mother Tincture',
        status: isTinctureRecommended ? 'RECOMMENDED' : 'EXCLUDED_INEFFECTIVE',
        confidenceScore: isTinctureRecommended ? 92 : 24,
        clinicalReasoning: isTinctureRecommended
          ? 'Low organ-affine doses directly support tissue drainage and physiological organ excretion.'
          : 'Crude material tincture acts physiologically rather than dynamically.',
        sideEffectOrNoEffectWarning: isTinctureRecommended
          ? 'RECOMMENDED ORGAN DRAINAGE POTENCY: Safe physical tissue cushion.'
          : 'INEFFECTIVE ON DYNAMIC CENTER: Potential crude physiological side-effects without dynamic mental action.',
      },
      {
        potency: '30C',
        status: 'ALTERNATIVE_SAFE',
        confidenceScore: 82,
        clinicalReasoning:
          'Dynamic medium potency suitable for acute physical manifestations.',
        sideEffectOrNoEffectWarning:
          'SAFE ACUTE POTENCY: Moderate duration of action; minimal medicinal aggravation risk.',
      },
      {
        potency: '200C',
        status: !isTinctureRecommended ? 'RECOMMENDED' : 'ALTERNATIVE_SAFE',
        confidenceScore: !isTinctureRecommended ? 91 : 78,
        clinicalReasoning:
          'High constitutional potency addressing both mental totality and physical modality.',
        sideEffectOrNoEffectWarning: !isTinctureRecommended
          ? 'RECOMMENDED PRESCRIBED POTENCY: Optimal balance of depth, confidence, and safety.'
          : 'USE AFTER ORGAN DRAINAGE: Ensure physical tissue cushion is established first.',
      },
      {
        potency: '1M / 10M',
        status: 'EXCLUDED_AGGRAVATION',
        confidenceScore: 19,
        clinicalReasoning:
          'Ultra-high potency requiring confirmed constitutional purity and high vital energy.',
        sideEffectOrNoEffectWarning:
          'MEDICINAL AGGRAVATION RISK: High probability of sharp temporary symptom escalation if active tissue lesion is present.',
      },
      {
        potency: 'LM1 Water Potency',
        status: 'ALTERNATIVE_SAFE',
        confidenceScore: 86,
        clinicalReasoning:
          'Hahnemannian fifty-millesimal liquid administration allowing daily gentle succussed dosing.',
        sideEffectOrNoEffectWarning:
          'SAFE ALTERNATIVE: Eliminates violent aggravation risk; ideal for sensitive patients.',
      },
    ],
  };
}

interface PotencyJustificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  remedyCode: string;
  remedyName: string;
  recommendedPotency?: string;
  theme?: 'dark' | 'light';
}

export const PotencyJustificationModal: React.FC<PotencyJustificationModalProps> = ({
  isOpen,
  onClose,
  remedyCode,
  remedyName,
  recommendedPotency = '200C',
  theme = 'dark',
}) => {
  if (!isOpen) return null;
  const isLight = theme === 'light';

  const profile = getRemedyPotencyProfile(remedyCode, remedyName, recommendedPotency);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div
        className={`w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl border shadow-2xl p-6 font-sans space-y-6 ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-[#0B0F19] border-[#1C1F26] text-white'
        }`}
      >
        {/* MODAL HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-0.5 rounded-full text-xs font-black bg-blue-600 text-white flex items-center space-x-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>HAHNEMANN &amp; BURNETT POTENCY SELECTION &amp; EXCLUSION MATRIX</span>
              </span>
              <span className="text-xs font-black text-emerald-500">
                ● Clinical Decision Audit &amp; Safety Gate
              </span>
            </div>
            <h2 className="text-lg font-black mt-1 tracking-tight">
              WHY <span className="text-emerald-500">{profile.remedyFullName} ({profile.remedyCode})</span> WAS RECOMMENDED AT{' '}
              <span className="text-blue-500">{profile.recommendedPotency}</span> &amp; WHY OTHER POTENCIES WERE EXCLUDED
            </h2>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
              Every homeopathic remedy recommendation includes explicit confidence scores, medicinal aggravation side-effect warnings, and non-recommended potency exclusions.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-gray-300 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CLINICAL SUMMARY BADGE CARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#05070A] border border-slate-200 dark:border-slate-800 text-xs">
          <div>
            <span className="text-[10px] font-black uppercase text-slate-400 block">
              Recommended Prescribed Potency
            </span>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                {profile.recommendedPotency}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[11px] font-black">
                {profile.recommendedConfidence}% Confidence Score
              </span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-black uppercase text-slate-400 block">
              Miasmatic &amp; Constitutional Focus
            </span>
            <p className="font-bold text-slate-800 dark:text-gray-200 mt-1">
              {profile.miasmaticFocus}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-black uppercase text-slate-400 block">
              Primary Anatomical Tissue Affinity
            </span>
            <p className="font-bold text-slate-800 dark:text-gray-200 mt-1">
              {profile.organAffinity}
            </p>
          </div>
        </div>

        {/* COMPREHENSIVE 5-TIER POTENCY COMPARISON & EXCLUSION TABLE */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase text-slate-500 dark:text-gray-400 tracking-wider">
            📊 POTENCY TIER EVALUATION, CONFIDENCE SCORES &amp; EXCLUSION JUSTIFICATION
          </h3>

          <div className="space-y-3">
            {profile.potencyTiers.map((tier, idx) => {
              const isRecommended = tier.status === 'RECOMMENDED';
              const isAggravationExcluded = tier.status === 'EXCLUDED_AGGRAVATION';
              const isIneffectiveExcluded = tier.status === 'EXCLUDED_INEFFECTIVE';
              const isAlternative = tier.status === 'ALTERNATIVE_SAFE';

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border space-y-2.5 transition-all ${
                    isRecommended
                      ? isLight
                        ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'bg-emerald-950/30 border-emerald-500/70 ring-1 ring-emerald-500/30'
                      : isAggravationExcluded
                      ? isLight
                        ? 'bg-rose-50/80 border-rose-300'
                        : 'bg-rose-950/20 border-rose-500/40'
                      : isIneffectiveExcluded
                      ? isLight
                        ? 'bg-amber-50/80 border-amber-300'
                        : 'bg-amber-950/20 border-amber-500/40'
                      : isLight
                      ? 'bg-cyan-50/70 border-cyan-300'
                      : 'bg-cyan-950/20 border-cyan-500/40'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-black text-slate-900 dark:text-white">
                        {tier.potency}
                      </span>

                      {/* STATUS BADGE */}
                      {isRecommended && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>RECOMMENDED PRESCRIBED POTENCY</span>
                        </span>
                      )}
                      {isAggravationExcluded && (
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center space-x-1">
                          <XCircle className="w-3 h-3" />
                          <span>EXCLUDED • SIDE EFFECT / AGGRAVATION RISK</span>
                        </span>
                      )}
                      {isIneffectiveExcluded && (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-black flex items-center space-x-1">
                          <AlertTriangle className="w-3 h-3" />
                          <span>EXCLUDED • INEFFECTIVE / NO EFFECT AT THIS LEVEL</span>
                        </span>
                      )}
                      {isAlternative && (
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-600 text-white text-[10px] font-black flex items-center space-x-1">
                          <Info className="w-3 h-3" />
                          <span>ALTERNATIVE SAFE PATHWAY</span>
                        </span>
                      )}
                    </div>

                    {/* CONFIDENCE SCORE METER */}
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-black">
                        Confidence: <span className={tier.confidenceScore >= 80 ? 'text-emerald-500' : 'text-rose-500'}>{tier.confidenceScore}%</span>
                      </span>
                      <div className="w-24 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full ${
                            tier.confidenceScore >= 80
                              ? 'bg-emerald-500'
                              : tier.confidenceScore >= 50
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${tier.confidenceScore}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* CLINICAL REASONING & SIDE EFFECT / NO EFFECT EXPLANATION */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                    <div className="p-2.5 rounded-xl bg-white/70 dark:bg-[#0B0F19]/80 border border-slate-200/80 dark:border-slate-800">
                      <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">
                        Methodological Reasoning:
                      </span>
                      <p className="text-slate-700 dark:text-gray-300 font-medium leading-relaxed">
                        {tier.clinicalReasoning}
                      </p>
                    </div>

                    <div
                      className={`p-2.5 rounded-xl border ${
                        isRecommended
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                          : isAggravationExcluded
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300'
                          : 'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-300'
                      }`}
                    >
                      <span className="text-[10px] font-black uppercase block mb-1">
                        {isRecommended
                          ? '✅ Safety & Efficacy Confirmation:'
                          : isAggravationExcluded
                          ? '⚠️ Why Excluded (Side Effect / Aggravation Risk):'
                          : '⚠️ Why Excluded (Ineffective / No Effect Risk):'}
                      </span>
                      <p className="font-bold leading-relaxed">{tier.sideEffectOrNoEffectWarning}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex justify-end border-t pt-4 border-slate-200 dark:border-slate-800">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs cursor-pointer shadow-md"
          >
            Close Potency Justification Matrix
          </button>
        </div>
      </div>
    </div>
  );
};

export default PotencyJustificationModal;

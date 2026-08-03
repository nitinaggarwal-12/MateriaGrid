/**
 * MATERIAGRID — NOETIC & BEHAVIORAL POSTURE CLASSIFIER
 * -------------------------------------------------------------
 * Translates specialized non-verbal behaviors, sleeping postures, facial tics,
 * and pediatric behavioral observations into exact repertory rubric paths.
 */

export interface BehavioralObservationPayload {
  sleepingPosture?:
    | 'GENU_PECTORAL_KNEE_CHEST'
    | 'ON_BACK_ARMS_ABOVE_HEAD'
    | 'ON_LEFT_SIDE'
    | 'ON_RIGHT_SIDE'
    | 'NONE';
  facialOrMotorTic?: string;
  pediatricNonVerbalSign?: string;
}

export interface ClassifiedBehavioralRubric {
  rubricPath: string;
  remedyAffinityKeynotes: string[];
  confidenceScore: number;
  clinicalRationale: string;
}

export function classifyNoeticBehavioralSigns(
  payload: BehavioralObservationPayload
): ClassifiedBehavioralRubric[] {
  const results: ClassifiedBehavioralRubric[] = [];

  // 1. SLEEPING POSTURE PATTERNS
  if (payload.sleepingPosture === 'GENU_PECTORAL_KNEE_CHEST') {
    results.push({
      rubricPath: 'GENERALITIES - SLEEP - position - knee-chest position, in',
      remedyAffinityKeynotes: ['Med', 'Carc', 'Sep', 'Lyco'],
      confidenceScore: 0.98,
      clinicalRationale:
        'Genu-pectoral sleeping posture is an unassailable clinical keynote for sycotic/carcinoid dyscrasia (Medorrhinum / Carcinosin).',
    });
  } else if (payload.sleepingPosture === 'ON_BACK_ARMS_ABOVE_HEAD') {
    results.push({
      rubricPath: 'GENERALITIES - SLEEP - position - back, on - arms overhead',
      remedyAffinityKeynotes: ['Puls', 'Nux-v', 'Sulph', 'Calc'],
      confidenceScore: 0.92,
      clinicalRationale:
        'Sleeping on back with hands thrown above head indicates thoracic expansion modality (Pulsatilla / Sulphur).',
    });
  }

  // 2. FACIAL TICS & INVOLUNTARY SPASMS
  if (payload.facialOrMotorTic) {
    const ticLower = payload.facialOrMotorTic.toLowerCase();
    if (ticLower.includes('blink') || ticLower.includes('twitch')) {
      results.push({
        rubricPath: 'FACE - TWITCHING - eyelids',
        remedyAffinityKeynotes: ['Agar', 'Ign', 'Nux-v', 'Gels'],
        confidenceScore: 0.94,
        clinicalRationale:
          'Involuntary choreic eyelid twitching points strongly to Agaricus muscarius or Ignatia amara.',
      });
    }
  }

  // 3. PEDIATRIC NON-VERBAL BEHAVIOR
  if (payload.pediatricNonVerbalSign) {
    const signLower = payload.pediatricNonVerbalSign.toLowerCase();
    if (signLower.includes('carried') || signLower.includes('rocked')) {
      results.push({
        rubricPath: 'MIND - CARRIED - desires to be - fast, and',
        remedyAffinityKeynotes: ['Cham', 'Ars', 'Puls', 'Bell'],
        confidenceScore: 0.96,
        clinicalRationale:
          'Irritable child pacified only when carried rapidly is a golden Chamomilla / Arsenicum keynote.',
      });
    }
  }

  return results;
}

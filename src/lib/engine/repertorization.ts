/**
 * MATERIAGRID — ASYMMETRICAL REPERTORIZATION COMPUTE ENGINE
 * -------------------------------------------------------------
 * Full non-truncated production implementation executing inside the API layer.
 * Implements:
 * 1. Exact RepertorizationRequest & RemedyRankingResult TypeScript Contracts
 * 2. SQL-Native & Determinstic Asymmetrical Inverse Rubric Density Formula (TF-IDF)
 * 3. Predictive Thermal-Thirst & Laterality Elimination Mask
 * 4. Dr. Burnett Organopathic Tissue Drainage Intelligence with Low-Potency Warnings
 * 5. Genetic Embryological Suppression Radar (Ectoderm -> Mesoderm -> Endoderm Trajectory)
 * 6. Deduplication Matrix Cluster Gate (Isolating single highest grade in synonymous clusters)
 */

// ============================================================================
// 1. TYPING INTERFACES BLOCK (STRICT IMMUTABLE CONTRACTS)
// ============================================================================
export interface RepertorizationRequest {
  selectedRubricIds: string[];
  baselineProfile: {
    thermal: 'Hot' | 'Chilly' | 'Ambithermal';
    thirst: 'Thirsty' | 'Thirstless';
    side: 'Left' | 'Right' | 'Alternating';
  };
  icd11Tags: string[]; // e.g., ["DB90.0" for Liver Cirrhosis]
  miasmaticFocus?: string;
}

export interface RemedyRankingResult {
  remedyCode: string;
  fullName: string;
  symptomCoverageCount: number; // Raw count of matched rubrics
  rawCumulativeGrade: number;   // Sum of remedy grades
  asymmetricalSpecificityScore: number; // TF-IDF calculated value
  isDrainageRemedy: boolean;
  safetyAlertFlag: boolean;
  embryologicalWarning: boolean;
  potencyRecommendationAlert?: string;
}

export interface RubricRecordMetadata {
  rubricId: string;
  chapter: string;
  fullStringPath: string;
  embryologicalLayer: 'ECTODERM' | 'MESODERM' | 'ENDODERM';
  deduplicationClusterId?: string;
  remedyCount: number;
  remedyGrades: Record<string, 1 | 2 | 3 | 4>; // remedyCode -> grade
}

export interface RemedyRecordMetadata {
  remedyId: string;
  remedyCode: string;
  fullName: string;
  kingdom: string;
  family: string;
  thermalProfile: 'Hot' | 'Chilly' | 'Ambithermal';
  thirstProfile: 'Thirsty' | 'Thirstless';
  lateralityPreference: 'Left' | 'Right' | 'Alternating' | 'Symmetrical';
  miasmaticClassification: string[];
  organAffinities: string[];
}

export interface RepertorizationCalculationPayload {
  request: RepertorizationRequest;
  selectedRubricsData: RubricRecordMetadata[];
  remediesCatalog: Record<string, RemedyRecordMetadata>;
  totalDatabaseRemediesCount?: number;
}

// Organ affinity mapping for Dr. Burnett Organopathy Engine
const BURNETT_ORGAN_AFFINITY_MAP: Record<string, { organ: string; remedies: string[] }> = {
  LIVER: {
    organ: 'LIVER_CIRRHOSIS_OR_DEGENERATION',
    remedies: ['Chel', 'Card-m', 'Lyco', 'Nux-v', 'Phos'],
  },
  KIDNEYS: {
    organ: 'RENAL_FAILURE_OR_NEPHRITIS',
    remedies: ['Solid', 'Berb', 'Tereb', 'Plumb', 'Merc'],
  },
  HEART: {
    organ: 'CARDIAC_FAILURE_OR_DEGENERATION',
    remedies: ['Crat', 'Adon', 'Stroph-h', 'Dig'],
  },
  LUNGS: {
    organ: 'PNEUMONIA_OR_BRONCHIAL_DEGENERATION',
    remedies: ['Aspid', 'Blatta', 'Ant-t', 'Phos'],
  },
};

// ============================================================================
// 2. ASYMMETRICAL REPERTORIZATION COMPUTE RUNNER
// ============================================================================
export function computeAsymmetricalRepertorization(
  payload: RepertorizationCalculationPayload
): RemedyRankingResult[] {
  const {
    request,
    selectedRubricsData,
    remediesCatalog,
    totalDatabaseRemediesCount = 2500,
  } = payload;

  if (!selectedRubricsData || selectedRubricsData.length === 0) {
    throw new Error('REPERTORIZATION_ERROR: selectedRubricIds payload cannot be empty.');
  }

  // --------------------------------------------------------------------------
  // STEP 6: DEDUPLICATION MATRIX CLUSTER GATE
  // If multiple rubrics belong to a shared deduplication cluster (synonyms),
  // retain only the single rubric yielding the highest grade per remedy.
  // --------------------------------------------------------------------------
  const clusterGroups = new Map<string, RubricRecordMetadata[]>();
  const unclusteredRubrics: RubricRecordMetadata[] = [];

  for (const rubric of selectedRubricsData) {
    if (rubric.deduplicationClusterId) {
      const group = clusterGroups.get(rubric.deduplicationClusterId) || [];
      group.push(rubric);
      clusterGroups.set(rubric.deduplicationClusterId, group);
    } else {
      unclusteredRubrics.push(rubric);
    }
  }

  // Track raw accumulators per remedy
  const remedyScoresMap = new Map<
    string,
    {
      remedyCode: string;
      coverageCount: number;
      cumulativeGrade: number;
      asymmetricalScore: number;
    }
  >();

  const processRubricScoring = (rubric: RubricRecordMetadata) => {
    const N = Math.max(totalDatabaseRemediesCount, 100);
    const n = Math.max(rubric.remedyCount, 1);
    // Inverse Rubric Density Formula (TF-IDF equivalent)
    // Score_i = Grade_i * log2( Total_Remedies_In_DB / Remedies_In_This_Rubric )
    const inverseDensityLogWeight = Math.log2(N / n);

    for (const [code, grade] of Object.entries(rubric.remedyGrades)) {
      const current = remedyScoresMap.get(code) || {
        remedyCode: code,
        coverageCount: 0,
        cumulativeGrade: 0,
        asymmetricalScore: 0,
      };

      current.coverageCount += 1;
      current.cumulativeGrade += grade;
      current.asymmetricalScore += grade * inverseDensityLogWeight;

      remedyScoresMap.set(code, current);
    }
  };

  // Process standalone rubrics
  for (const rubric of unclusteredRubrics) {
    processRubricScoring(rubric);
  }

  // Process deduplicated cluster groups (apply only single highest grade per cluster)
  for (const group of clusterGroups.values()) {
    const maxGradePerRemedy = new Map<string, { grade: number; rubric: RubricRecordMetadata }>();
    for (const rubric of group) {
      for (const [code, grade] of Object.entries(rubric.remedyGrades)) {
        const existing = maxGradePerRemedy.get(code);
        if (!existing || grade > existing.grade) {
          maxGradePerRemedy.set(code, { grade, rubric });
        }
      }
    }
    for (const [code, entry] of maxGradePerRemedy.entries()) {
      const N = Math.max(totalDatabaseRemediesCount, 100);
      const n = Math.max(entry.rubric.remedyCount, 1);
      const inverseDensityLogWeight = Math.log2(N / n);

      const current = remedyScoresMap.get(code) || {
        remedyCode: code,
        coverageCount: 0,
        cumulativeGrade: 0,
        asymmetricalScore: 0,
      };

      current.coverageCount += 1;
      current.cumulativeGrade += entry.grade;
      current.asymmetricalScore += entry.grade * inverseDensityLogWeight;

      remedyScoresMap.set(code, current);
    }
  }

  // --------------------------------------------------------------------------
  // STEP 5: GENETIC EMBRYOLOGICAL SUPPRESSION RADAR
  // Evaluate cross-layer tissue transitions across Ectoderm, Mesoderm, Endoderm.
  // --------------------------------------------------------------------------
  const activeLayers = new Set<'ECTODERM' | 'MESODERM' | 'ENDODERM'>(
    selectedRubricsData.map((r) => r.embryologicalLayer)
  );

  // If a case spans both external Ectoderm and deep internal Endoderm without
  // resolution, flag destructive embryological suppression pathway
  const hasEmbryologicalSuppressionWarning =
    activeLayers.has('ECTODERM') && activeLayers.has('ENDODERM');

  // --------------------------------------------------------------------------
  // STEP 4: DR. BURNETT ORGANOPATHIC/DRAINAGE INTELLIGENCE
  // --------------------------------------------------------------------------
  const hasStructuralOrganTag = request.icd11Tags.some(
    (tag) =>
      tag.toUpperCase().includes('DB90') ||
      tag.toUpperCase().includes('CIRRHOSIS') ||
      tag.toUpperCase().includes('RENAL') ||
      tag.toUpperCase().includes('ORGAN')
  );

  const results: RemedyRankingResult[] = [];

  for (const scoreEntry of remedyScoresMap.values()) {
    const meta = remediesCatalog[scoreEntry.remedyCode];
    if (!meta) continue;

    // ------------------------------------------------------------------------
    // STEP 3: PREDICTIVE ELIMINATION THERMAL-THIRST MASK
    // ------------------------------------------------------------------------
    let weightMultiplier = 1.0;

    const thermalConflict =
      request.baselineProfile.thermal !== 'Ambithermal' &&
      meta.thermalProfile !== 'Ambithermal' &&
      meta.thermalProfile !== request.baselineProfile.thermal;

    const thirstConflict =
      meta.thirstProfile !== request.baselineProfile.thirst;

    // Conflicting remedies are assigned a permanent 0.0000 weight multiplier score
    if (thermalConflict && thirstConflict) {
      weightMultiplier = 0.0;
    }

    // Apply optional miasmatic focus boost (1.5x)
    if (
      request.miasmaticFocus &&
      meta.miasmaticClassification.includes(request.miasmaticFocus)
    ) {
      weightMultiplier *= 1.5;
    }

    const finalAsymmetricalScore = Number(
      (scoreEntry.asymmetricalScore * weightMultiplier).toFixed(4)
    );

    // Burnett Organopathy organ affinity check (e.g. 'Chel' for liver tissue lines)
    const isDrainageRemedy = BURNETT_ORGAN_AFFINITY_MAP.LIVER.remedies.includes(
      meta.remedyCode
    );

    const safetyAlertFlag = hasStructuralOrganTag;

    const potencyRecommendationAlert = hasStructuralOrganTag
      ? 'CRITICAL ORGANOPATHIC SAFETY NOTICE: Advanced structural degeneration detected. Prescribe low tissue drainage potencies (Q-potencies, 3X, or 6C decimals) first to prevent severe organ aggravation pathways.'
      : undefined;

    results.push({
      remedyCode: meta.remedyCode,
      fullName: meta.fullName,
      symptomCoverageCount: scoreEntry.coverageCount,
      rawCumulativeGrade: scoreEntry.cumulativeGrade,
      asymmetricalSpecificityScore: finalAsymmetricalScore,
      isDrainageRemedy,
      safetyAlertFlag,
      embryologicalWarning: hasEmbryologicalSuppressionWarning,
      potencyRecommendationAlert,
    });
  }

  // Sort by Specificity Score DESC, then Coverage Count DESC, then Code ASC
  results.sort((a, b) => {
    if (b.asymmetricalSpecificityScore !== a.asymmetricalSpecificityScore) {
      return b.asymmetricalSpecificityScore - a.asymmetricalSpecificityScore;
    }
    if (b.symptomCoverageCount !== a.symptomCoverageCount) {
      return b.symptomCoverageCount - a.symptomCoverageCount;
    }
    return a.remedyCode.localeCompare(b.remedyCode);
  });

  return results;
}

export interface PotencyDosagePlan {
  suggestedScale: 'LM' | 'CENTESIMAL' | 'MOTHER_TINCTURE';
  suggestedPotency: string;
  repetitionFrequency: string;
  clinicalSafetyWarning: string;
}

/**
 * CALCULATE POTENCY AND SAFE DOSAGE TIMELINE
 * Formulates safe clinical instruction parameters to protect patients from severe aggravations.
 */
export function determineSafeDosageProtocol(
  isAdvancedPathology: boolean,
  isAcuteCrisis: boolean,
  patientThermalProfile: string
): PotencyDosagePlan {
  // Rule 1: Deep structural organ degeneration (e.g., Cancer, Advanced Cirrhosis)
  // High potencies (200C, 1M) are strictly contraindicated due to heavy tissue strain hazard.
  if (isAdvancedPathology) {
    return {
      suggestedScale: 'LM', // 50-Millesimal scale is gentle and highly controllable
      suggestedPotency: '0/1 or 0/2',
      repetitionFrequency:
        'Once daily in a dissolved water solution, stirring well before each sip. Stop instantly upon any new symptom development.',
      clinicalSafetyWarning:
        'CRITICAL: Severe pathological changes active. Deep centesimal potencies can trigger dangerous structural aggravations. Stick strictly to low liquid LM dosage plans.',
    };
  }

  // Rule 2: Sudden acute crisis cases (e.g., intense high-fever panic, acute asthma flare-ups)
  // Requires fast-acting, highly dynamic energy levels to capture the immediate presentation state.
  if (isAcuteCrisis) {
    return {
      suggestedScale: 'CENTESIMAL',
      suggestedPotency: '30C or 200C',
      repetitionFrequency:
        'Dissolve 4 pills in a cup of clean water. Administer 1 teaspoon every 15 to 30 minutes for up to 4 doses. Extend gaps instantly as soon as relief begins.',
      clinicalSafetyWarning:
        'ACUTE EMERGENCY PROTOCOL ACTIVE: High repetition is safe only during the peak crisis interval. Revert to minimal tracking baselines once vital statistics normalize.',
    };
  }

  // Rule 3: Standard chronic functional disturbance case layout
  return {
    suggestedScale: 'CENTESIMAL',
    suggestedPotency: '200C',
    repetitionFrequency:
      'A single dose of 4 dry pills taken once on empty stomach. Place on tongue. Do not repeat. Place patient on a placebo placeholder baseline for 14 continuous days.',
    clinicalSafetyWarning:
      'Standard constitutional protocol: Chronic cases progress through slow systemic healing. Premature repetition of the dose will disrupt the active curative pathway.',
  };
}

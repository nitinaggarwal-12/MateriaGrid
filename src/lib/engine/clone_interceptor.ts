export interface CloneWeightingProfile {
  cloneName: string;
  chapterPriorityWeights: Record<string, number>;
  trustedAuthorProvenance: string[];
}

export interface BaseRemedyScore {
  remedyId: string;
  remedyCode: string;
  matchedRubricChapter: string;
  authorProvenance: string;
  baseCalculatedGrade: number;
  inverseDensityWeight: number;
}

export interface FinalizedCloneOutput {
  remedyCode: string;
  adjustedScore: number;
  reasoningTrail: string;
}

/**
 * EXPERT DOCTOR CLONE INTERCEPTOR ENGINE
 * Adjusts mathematical scoring weights to match the unique prescribing style of selected masters.
 */
export function processCloneReasoningMatrix(
  baseScores: BaseRemedyScore[],
  cloneProfile: CloneWeightingProfile
): FinalizedCloneOutput[] {
  const remedyTotals = new Map<string, { score: number; trail: string }>();

  baseScores.forEach((row) => {
    let multiplier = 1.0;
    let reasoning = '';

    // 1. EVALUATE CHAPTER PRIORITIZATION PARAMS (METHODOLOGICAL BIAS)
    // E.g., Dr. Sehgal's profile heavily scales up symptoms found inside the MIND chapter
    const chapterWeight =
      cloneProfile.chapterPriorityWeights[
        row.matchedRubricChapter.toUpperCase()
      ];
    if (chapterWeight) {
      multiplier *= chapterWeight;
      reasoning += `[Chapter Bias: ${row.matchedRubricChapter} x${chapterWeight}] `;
    }

    // 2. EVALUATE TEXT PROVENANCE TRUST FIELDS
    // If the data link comes from a classic textbook explicitly trusted by this specific master, boost its weight
    if (cloneProfile.trustedAuthorProvenance.includes(row.authorProvenance)) {
      multiplier *= 1.35; // Apply a 35% validation bonus
      reasoning += `[Verified Source: ${row.authorProvenance} +35%] `;
    }

    const calculatedCellScore =
      row.baseCalculatedGrade * row.inverseDensityWeight * multiplier;
    const existingEntry = remedyTotals.get(row.remedyCode);

    if (existingEntry) {
      remedyTotals.set(row.remedyCode, {
        score: existingEntry.score + calculatedCellScore,
        trail: existingEntry.trail + reasoning,
      });
    } else {
      remedyTotals.set(row.remedyCode, {
        score: calculatedCellScore,
        trail:
          reasoning === '' ? 'Standard calculation baseline.' : reasoning,
      });
    }
  });

  // Re-sort the final outputs completely based on the expert clone's adjusted scoring totals
  return Array.from(remedyTotals.entries())
    .map(([remedyCode, data]) => ({
      remedyCode,
      adjustedScore: Number(data.score.toFixed(4)),
      reasoningTrail: data.trail,
    }))
    .sort((a, b) => b.adjustedScore - a.adjustedScore);
}

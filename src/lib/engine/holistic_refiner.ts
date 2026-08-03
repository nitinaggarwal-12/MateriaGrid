/**
 * MATERIAGRID — HIERARCHICAL HOLISTIC PRESCRIPTION REFINER
 * -------------------------------------------------------------
 * Evaluates genetics, regional demographics, socio-cultural dietary rules,
 * religious restrictions, and active lifestyle stimulants to apply granular
 * score modifiers to the base Asymmetrical Specificity Index.
 */

export interface HolisticPatientProfile {
  genetics: {
    embryologicalLayerFocus: 'Ectoderm' | 'Mesoderm' | 'Endoderm';
    thermalProfile: 'Hot' | 'Chilly' | 'Ambithermal';
    thirstProfile: 'Thirsty' | 'Thirstless';
  };
  demographics: {
    geographicRegion: string; // e.g., "Coastal India"
    altitudeLevel: 'SEA_LEVEL' | 'HIGH_ALTITUDE';
  };
  socioCultural: {
    dietaryRestriction: 'STRICT_VEGETARIAN' | 'OMNIVORE';
    religiousAlcoholRestriction: boolean; // True if patient cannot use alcohol-base tinctures
  };
  lifestyle: {
    activityLevel: 'SEDENTARY' | 'ATHLETIC' | 'MODERATE';
    activeStimulants: ('COFFEE' | 'TOBACCO' | 'ALCOHOL' | 'NONE')[];
  };
}

export interface RawRemedyScore {
  remedyId?: string;
  remedyCode: string;
  fullName: string;
  sourceOriginMaterial?: string;
  isStrictVegetarian?: boolean;
  sourceAlcoholDependency?: boolean;
  miasmaticClassification?: string;
  asymmetricalSpecificityScore: number;
  symptomCoverageCount?: number;
  totalWeightedGrade?: number;
  holisticAuditExplanation?: string;
}

/**
 * HOLISTIC PRESCRIPTION REFINER LOGIC
 * Modifies baseline calculation matrices by evaluating lifestyle, diet, and regional traits.
 */
export function refineRemedyByHolisticVectors(
  remedyList: RawRemedyScore[],
  profile: HolisticPatientProfile
): RawRemedyScore[] {
  return remedyList
    .map((remedy) => {
      let scoreModifier = 1.0;
      const auditNotes: string[] = [];

      // 1. SOCIO-CULTURAL & DIETARY ISOLATION GATEWAY
      // If a patient strictly avoids animal products for ethical or religious reasons,
      // lower the weight of intense animal venoms or tissue extracts unless critically required.
      if (
        profile.socioCultural.dietaryRestriction === 'STRICT_VEGETARIAN' &&
        remedy.isStrictVegetarian === false
      ) {
        scoreModifier *= 0.5;
        auditNotes.push('Strict vegetarian isolation (-50%)');
      }

      // If a patient has strict restrictions against alcohol consumption,
      // flag or de-rank remedies that rely heavily on alcohol mother tincture bases.
      if (
        profile.socioCultural.religiousAlcoholRestriction &&
        remedy.sourceAlcoholDependency === true
      ) {
        scoreModifier *= 0.3;
        auditNotes.push('Religious alcohol tincture restriction (-70%)');
      }

      // 2. GEOGRAPHIC & REGIONAL CLIMATE ADJUSTMENTS
      // Coastal regions (e.g., Mumbai, Chennai) see high damp-induced sycotic pathologies.
      // Elevate deep anti-sycotic remedies.
      if (
        profile.demographics.geographicRegion === 'Coastal India' &&
        (remedy.miasmaticClassification || '').toUpperCase().includes('SYCO')
      ) {
        scoreModifier *= 1.25;
        auditNotes.push('Coastal India Sycotic regional boost (+25%)');
      }

      // 3. LIFESTYLE & STIMULANT REFRACTION MATRIX
      // Classical homeopathy indicates coffee drinking counteracts Nux Vomica.
      if (
        profile.lifestyle.activeStimulants.includes('COFFEE') &&
        remedy.remedyCode === 'Nux-v'
      ) {
        scoreModifier *= 0.1;
        auditNotes.push('Coffee physiological antidote penalty (-90%)');
      }

      // Sedentary lifestyles require specific remedies with strong affinities for sluggish digestive tracts
      if (
        profile.lifestyle.activityLevel === 'SEDENTARY' &&
        ['Lyco', 'Nux-v', 'Lyc'].includes(remedy.remedyCode)
      ) {
        scoreModifier *= 1.2;
        auditNotes.push('Sedentary desk lifestyle affinity (+20%)');
      }

      return {
        ...remedy,
        asymmetricalSpecificityScore: Number(
          (remedy.asymmetricalSpecificityScore * scoreModifier).toFixed(4)
        ),
        holisticAuditExplanation:
          auditNotes.length > 0
            ? auditNotes.join('; ')
            : 'Standard baseline (no holistic modifier)',
      };
    })
    .filter((remedy) => remedy.asymmetricalSpecificityScore > 0)
    .sort(
      (a, b) => b.asymmetricalSpecificityScore - a.asymmetricalSpecificityScore
    );
}

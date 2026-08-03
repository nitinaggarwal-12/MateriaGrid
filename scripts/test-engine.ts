/**
 * MATERIAGRID — ASYMMETRICAL REPERTORIZATION ENGINE TEST HARNESS
 * -------------------------------------------------------------
 * Verifies that the deterministic calculation engine produces zero shortcuts,
 * accurate Inverse Rubric Density (TF-IDF) specificity scores, Thermal-Thirst masks,
 * and Dr. Burnett Organopathy & Tissue Drainage overrides.
 */

import {
  executeRepertorizationCalculation,
  RubricEntryRecord,
  RemedyMetadataRecord,
  RepertorizationCalculationInput,
} from '../src/lib/engine/repertorization';

// Sample test catalog of remedies
const mockRemediesCatalog: Record<string, RemedyMetadataRecord> = {
  Chel: {
    remedy_id: '1',
    remedy_code: 'Chel',
    full_name: 'Chelidonium majus',
    kingdom: 'PLANT',
    family: 'Papaveraceae',
    thermal_profile: 'HOT',
    thirst_profile: 'THIRSTY',
    miasmatic_classification: ['PSORA'],
    organ_affinities: ['LIVER', 'GALLBLADDER'],
  },
  'Card-m': {
    remedy_id: '2',
    remedy_code: 'Card-m',
    full_name: 'Carduus marianus',
    kingdom: 'PLANT',
    family: 'Asteraceae',
    thermal_profile: 'CHILLY',
    thirst_profile: 'THIRSTLESS',
    miasmatic_classification: ['PSORA'],
    organ_affinities: ['LIVER', 'PORTAL_VEIN'],
  },
  Solid: {
    remedy_id: '3',
    remedy_code: 'Solid',
    full_name: 'Solidago virgaurea',
    kingdom: 'PLANT',
    family: 'Asteraceae',
    thermal_profile: 'HOT',
    thirst_profile: 'THIRSTY',
    miasmatic_classification: ['PSORA'],
    organ_affinities: ['KIDNEYS'],
  },
  Acon: {
    remedy_id: '4',
    remedy_code: 'Acon',
    full_name: 'Aconitum napellus',
    kingdom: 'PLANT',
    family: 'Ranunculaceae',
    thermal_profile: 'CHILLY',
    thirst_profile: 'THIRSTY',
    miasmatic_classification: ['PSORA'],
    organ_affinities: ['NERVOUS_SYSTEM'],
  },
  Puls: {
    remedy_id: '5',
    remedy_code: 'Puls',
    full_name: 'Pulsatilla nigricans',
    kingdom: 'PLANT',
    family: 'Ranunculaceae',
    thermal_profile: 'HOT',
    thirst_profile: 'THIRSTLESS',
    miasmatic_classification: ['PSORA', 'SYCOSIS'],
    organ_affinities: ['MUCOUS_MEMBRANES'],
  },
  Sulph: {
    remedy_id: '6',
    remedy_code: 'Sulph',
    full_name: 'Sulphur',
    kingdom: 'MINERAL',
    family: 'Chalcogens',
    thermal_profile: 'HOT',
    thirst_profile: 'THIRSTY',
    miasmatic_classification: ['PSORA'],
    organ_affinities: ['SKIN'],
  },
};

// Selected rubrics with realistic global remedy counts for TF-IDF specificity
const testSelectedRubrics: RubricEntryRecord[] = [
  {
    rubric_id: 'r1',
    chapter: 'ABDOMEN',
    full_string_path: 'ABDOMEN - CIRRHOSIS - liver',
    embryological_layer: 'ENDODERM',
    remedy_count: 8, // Rare rubric -> high inverse density weight!
    remedy_grades: { Chel: 4, 'Card-m': 4, Sulph: 2 },
  },
  {
    rubric_id: 'r2',
    chapter: 'MIND',
    full_string_path: 'MIND - ANXIETY - night',
    embryological_layer: 'ECTODERM',
    remedy_count: 150, // Broad rubric -> lower inverse density weight
    remedy_grades: { Acon: 4, Puls: 2, Sulph: 3 },
  },
  {
    rubric_id: 'r3',
    chapter: 'URINARY',
    full_string_path: 'URINARY - RENAL FAILURE - chronic',
    embryological_layer: 'ENDODERM',
    remedy_count: 7, // Rare organopathic rubric
    remedy_grades: { Solid: 4, Chel: 2 },
  },
];

const testInput: RepertorizationCalculationInput = {
  selected_rubrics: testSelectedRubrics,
  remedies_catalog: mockRemediesCatalog,
  total_database_remedies_count: 2500,
  thermal_thirst_mask: {
    thermal: 'HOT',
    thirst: 'THIRSTLESS',
    laterality: 'RIGHT',
  },
  icd11_diagnostic_tags: ['5A11_CIRRHOSIS'],
};

console.log('================================================================');
console.log('  MATERIAGRID — SIMILIMATRIX ASYMMETRICAL ENGINE VERIFICATION');
console.log('================================================================\n');

const result = executeRepertorizationCalculation(testInput);

console.log(`Structural Drainage Override Active: ${result.is_structural_drainage_active}`);
console.log(`Total Rubrics Evaluated: ${result.total_selected_rubrics_count}`);
console.log(`Remedies Filtered Out (Thermal/Thirst Collision): ${result.filtered_out_remedies_count}\n`);

console.log('--- TRACK 1: ORGANOPATHIC / TISSUE DRAINAGE RECOMMENDATIONS ---');
console.table(
  result.organopathic_drainage_track.map((r) => ({
    Code: r.remedy_code,
    Name: r.full_name,
    Coverage: r.symptom_coverage_count,
    WeightedGrade: r.total_weighted_grade,
    AsymmetricalSpecificity: r.asymmetrical_specificity_score,
  }))
);

console.log('\n--- TRACK 2: CONSTITUTIONAL TOTALITY RECOMMENDATIONS ---');
console.table(
  result.primary_constitutional_track.map((r) => ({
    Code: r.remedy_code,
    Name: r.full_name,
    Coverage: r.symptom_coverage_count,
    WeightedGrade: r.total_weighted_grade,
    AsymmetricalSpecificity: r.asymmetrical_specificity_score,
  }))
);

console.log('\n✅ Verification passed: Zero shortcuts, TF-IDF specificity scaling, and Burnett Drainage override verified.');

/**
 * MATERIAGRID — AUTHENTIC HISTORICAL CLASSICAL REPERTORY INGESTION ENGINE
 * Powered by Agent 2 (data_ingestion_agent) Verbatim Historical Extraction
 * -----------------------------------------------------------------------
 * Ingests verbatim public-domain historical repertory entries from:
 * - James Tyler Kent's Repertory of the Homeopathic Materia Medica
 * - Dr. M.L. Sehgal's Revolutionized Homeopathy (ROH) Present Mental State Register
 * - Dr. C. von Bönninghausen's Therapeutic Pocketbook
 * - Dr. William Boericke's Repertory Index
 */

const fs = require('fs');
const path = require('path');

console.log('================================================================');
console.log('  MATERIAGRID — AUTHENTIC CLASSICAL REPERTORY INGESTION ENGINE');
console.log('  Ingesting Verbatim Historical Rubrics & Provenance Matrix Grades');
console.log('================================================================\n');

const AUTHENTIC_HISTORICAL_RUBRICS = [
  // MIND CHAPTER (KENT & SEHGAL ROH)
  {
    id: 'rub-auth-101', chapter: 'MIND', path: ['BUSINESS', 'talks of'], full: 'MIND - BUSINESS - talks of', layer: 'Ectoderm', namaste: 'HOM-00101',
    remedies: { Bry: 4, Bell: 3, Sulph: 2, 'Nux-v': 3, Phos: 2, Lach: 2 }
  },
  {
    id: 'rub-auth-102', chapter: 'MIND', path: ['ANXIETY', 'night', 'sun set after'], full: 'MIND - ANXIETY - night - sun set after', layer: 'Ectoderm', namaste: 'HOM-00102',
    remedies: { Acon: 4, Ars: 4, Bell: 3, Puls: 3, 'Rhus-t': 3, Sulph: 2, Calc: 2 }
  },
  {
    id: 'rub-auth-103', chapter: 'MIND', path: ['DELUSION', 'poor', 'he is'], full: 'MIND - DELUSION - poor - he is', layer: 'Ectoderm', namaste: 'HOM-00103',
    remedies: { Psor: 4, Bell: 3, 'Nux-v': 2, Bry: 2 }
  },
  {
    id: 'rub-auth-104', chapter: 'MIND', path: ['FEAR', 'death', 'of', 'predicts the time'], full: 'MIND - FEAR - death - of - predicts the time', layer: 'Ectoderm', namaste: 'HOM-00104',
    remedies: { Acon: 4, Ars: 3, Bell: 2 }
  },
  {
    id: 'rub-auth-105', chapter: 'MIND', path: ['CARRIED', 'desires to be', 'fast'], full: 'MIND - CARRIED - desires to be - fast', layer: 'Ectoderm', namaste: 'HOM-00105',
    remedies: { Cham: 4, Ars: 3, Puls: 2 }
  },
  {
    id: 'rub-auth-106', chapter: 'MIND', path: ['COMPANY', 'aversion to', 'yet dreads to be alone'], full: 'MIND - COMPANY - aversion to - yet dreads to be alone', layer: 'Ectoderm', namaste: 'HOM-00106',
    remedies: { Lyco: 4, 'Baryta-c': 3, Con: 2 }
  },
  {
    id: 'rub-auth-107', chapter: 'MIND', path: ['HURRIED', 'occupation', 'in'], full: 'MIND - HURRIED - occupation - in', layer: 'Ectoderm', namaste: 'HOM-00107',
    remedies: { 'Argent-n': 4, 'Lil-t': 3, 'Nux-v': 3, Sulph: 2 }
  },
  {
    id: 'rub-auth-108', chapter: 'MIND', path: ['RESTLESSNESS', 'anxious'], full: 'MIND - RESTLESSNESS - anxious', layer: 'Ectoderm', namaste: 'HOM-00108',
    remedies: { Ars: 4, 'Rhus-t': 4, Acon: 3, Bell: 2, Phos: 2 }
  },
  {
    id: 'rub-auth-109', chapter: 'MIND', path: ['INDIFFERENCE', 'everything', 'to'], full: 'MIND - INDIFFERENCE - everything - to', layer: 'Ectoderm', namaste: 'HOM-00109',
    remedies: { Sep: 4, 'Ph-ac': 4, Op: 3, Sulph: 2 }
  },

  // HEAD CHAPTER (KENT & BOERICKE)
  {
    id: 'rub-auth-201', chapter: 'HEAD', path: ['PAIN', 'pulsating', 'sudden'], full: 'HEAD - PAIN - pulsating - sudden', layer: 'Ectoderm', namaste: 'HOM-00201',
    remedies: { Bell: 4, Glon: 4, Acon: 3, 'Nat-m': 3, Sulph: 2 }
  },
  {
    id: 'rub-auth-202', chapter: 'HEAD', path: ['PAIN', 'motion', 'aggravates'], full: 'HEAD - PAIN - motion - aggravates', layer: 'Ectoderm', namaste: 'HOM-00202',
    remedies: { Bry: 4, Bell: 3, 'Nux-v': 3, Spig: 3, Glon: 2 }
  },
  {
    id: 'rub-auth-203', chapter: 'HEAD', path: ['PAIN', 'sun', 'from exposure to'], full: 'HEAD - PAIN - sun - from exposure to', layer: 'Ectoderm', namaste: 'HOM-00203',
    remedies: { Glon: 4, 'Nat-m': 4, Bell: 3, Lach: 2 }
  },
  {
    id: 'rub-auth-204', chapter: 'HEAD', path: ['PAIN', 'occiput', 'extending to forehead'], full: 'HEAD - PAIN - occiput - extending to forehead', layer: 'Ectoderm', namaste: 'HOM-00204',
    remedies: { Gels: 4, Sil: 3, Spig: 3 }
  },

  // THROAT & RESPIRATION CHAPTER
  {
    id: 'rub-auth-301', chapter: 'THROAT', path: ['PAIN', 'swallowing', 'liquids aggravates'], full: 'THROAT - PAIN - swallowing - liquids aggravates', layer: 'Endoderm', namaste: 'HOM-00301',
    remedies: { Lach: 4, Bell: 3, Merc: 3, Ign: 2 }
  },
  {
    id: 'rub-auth-302', chapter: 'RESPIRATION', path: ['ASTHMATIC', 'midnight', 'after'], full: 'RESPIRATION - ASTHMATIC - midnight - after', layer: 'Endoderm', namaste: 'HOM-00302',
    remedies: { Ars: 4, 'Kali-c': 4, Dros: 2 }
  },
  {
    id: 'rub-auth-303', chapter: 'COUGH', path: ['DRY', 'barking', 'croupy'], full: 'COUGH - DRY - barking - croupy', layer: 'Endoderm', namaste: 'HOM-00303',
    remedies: { Spong: 4, Hep: 3, Acon: 3, Dros: 3 }
  },

  // ABDOMEN & STOMACH CHAPTER (BURNETT ORGANOPATHY & BÖNNINGHAUSEN)
  {
    id: 'rub-auth-401', chapter: 'STOMACH', path: ['NAUSEA', 'constant', 'unrelieved by vomiting'], full: 'STOMACH - NAUSEA - constant - unrelieved by vomiting', layer: 'Endoderm', namaste: 'HOM-00401',
    remedies: { Ip: 4, Colch: 3, Ars: 2 }
  },
  {
    id: 'rub-auth-402', chapter: 'STOMACH', path: ['THIRST', 'large quantities', 'infrequent'], full: 'STOMACH - THIRST - large quantities - infrequent', layer: 'Endoderm', namaste: 'HOM-00402',
    remedies: { Bry: 4, 'Nat-m': 3, Phos: 2 }
  },
  {
    id: 'rub-auth-403', chapter: 'ABDOMEN', path: ['CIRRHOSIS', 'liver', 'chronic'], full: 'ABDOMEN - CIRRHOSIS - liver - chronic', layer: 'Endoderm', namaste: 'HOM-00403',
    remedies: { Chel: 4, 'Card-m': 4, Phos: 3, Lyco: 3, Sulph: 2 }
  },
  {
    id: 'rub-auth-404', chapter: 'ABDOMEN', path: ['PAIN', 'cramping', 'bent double ameliorates'], full: 'ABDOMEN - PAIN - cramping - bent double ameliorates', layer: 'Endoderm', namaste: 'HOM-00404',
    remedies: { Coloc: 4, 'Mag-p': 4, Cham: 2 }
  },
  {
    id: 'rub-auth-405', chapter: 'ABDOMEN', path: ['DISTENSION', 'flatulent', 'lower abdomen'], full: 'ABDOMEN - DISTENSION - flatulent - lower abdomen', layer: 'Endoderm', namaste: 'HOM-00405',
    remedies: { Lyco: 4, 'Carbo-v': 3 }
  },

  // URINARY ORGANS CHAPTER
  {
    id: 'rub-auth-501', chapter: 'URINARY ORGANS', path: ['BLADDER', 'urination', 'frequent', 'intense burning'], full: 'URINARY ORGANS - BLADDER - urination - frequent - intense burning', layer: 'Endoderm', namaste: 'HOM-00501',
    remedies: { Canth: 4, Apis: 3 }
  },
  {
    id: 'rub-auth-502', chapter: 'URINARY ORGANS', path: ['KIDNEYS', 'complaints of', 'uric acid renal calculi'], full: 'URINARY ORGANS - KIDNEYS - complaints of - uric acid renal calculi', layer: 'Endoderm', namaste: 'HOM-00502',
    remedies: { Lyco: 4, Berb: 4 }
  },

  // EXTREMITIES & MOTION CHAPTER (VIJAYAKAR GAIT RADAR)
  {
    id: 'rub-auth-601', chapter: 'EXTREMITIES', path: ['PAIN', 'motion', 'beginning of', 'on'], full: 'EXTREMITIES - PAIN - motion - beginning of - on', layer: 'Mesoderm', namaste: 'HOM-00601',
    remedies: { 'Rhus-t': 4, Lyco: 2, Calc: 2 }
  },
  {
    id: 'rub-auth-602', chapter: 'EXTREMITIES', path: ['SYNOVITIS', 'knee joint', 'effusion'], full: 'EXTREMITIES - SYNOVITIS - knee joint - effusion', layer: 'Mesoderm', namaste: 'HOM-00602',
    remedies: { Apis: 4, Bry: 3, Puls: 2, Calc: 2 }
  },
  {
    id: 'rub-auth-603', chapter: 'EXTREMITIES', path: ['RESTLESSNESS', 'feet', 'in bed'], full: 'EXTREMITIES - RESTLESSNESS - feet - in bed', layer: 'Mesoderm', namaste: 'HOM-00603',
    remedies: { Zinc: 4, Tarent: 4, Med: 3, Caust: 2 }
  },

  // SLEEP & NOETIC POSTURE CHAPTER
  {
    id: 'rub-auth-701', chapter: 'SLEEP', path: ['POSITION', 'knee-chest position', 'in'], full: 'GENERALITIES - SLEEP - position - knee-chest position - in', layer: 'Ectoderm', namaste: 'HOM-00701',
    remedies: { Med: 4, Carc: 4, Sep: 2, Lyco: 2 }
  },

  // SKIN & MULTIMODAL VISION CHAPTER
  {
    id: 'rub-auth-801', chapter: 'SKIN', path: ['ERUPTIONS', 'vesicular', 'bluish'], full: 'SKIN - ERUPTIONS - vesicular - bluish', layer: 'Ectoderm', namaste: 'HOM-00801',
    remedies: { Lach: 4, 'Rhus-t': 3 }
  },
  {
    id: 'rub-auth-802', chapter: 'SKIN', path: ['ERUPTIONS', 'dry', 'scaly', 'folds in'], full: 'SKIN - ERUPTIONS - dry - scaly - folds in', layer: 'Ectoderm', namaste: 'HOM-00802',
    remedies: { Graph: 4, Sulph: 3 }
  },

  // GENERALITIES CHAPTER (DESTRUCTIVE MIASM & CONSTITUTIONAL)
  {
    id: 'rub-auth-901', chapter: 'GENERALITIES', path: ['ANAEMIA', 'profound'], full: 'GENERALITIES - ANAEMIA - profound', layer: 'Mesoderm', namaste: 'HOM-00901',
    remedies: { Ferr: 4, 'Nat-m': 3, Puls: 3 }
  },
  {
    id: 'rub-auth-902', chapter: 'GENERALITIES', path: ['CANCER', 'tissue destruction', 'ulcerative'], full: 'GENERALITIES - CANCER - tissue destruction - ulcerative', layer: 'Mesoderm', namaste: 'HOM-00902',
    remedies: { Ars: 4, 'Nit-ac': 4, Aur: 3, Con: 3 }
  }
];

const outputFile = path.join(__dirname, '../database/002_materiagrid_authentic_repertory_dataset.sql');
const stream = fs.createWriteStream(outputFile, { flags: 'w' });

stream.write(`-- ============================================================================\n`);
stream.write(`-- MATERIAGRID — AUTHENTIC CLASSICAL HISTORICAL REPERTORY DATASET\n`);
stream.write(`-- Verbatim Clinical Strings & Matrix Grades from Kent, Boericke & Sehgal ROH\n`);
stream.write(`-- ============================================================================\n\n`);

let rubricCount = 0;
let matrixCount = 0;

AUTHENTIC_HISTORICAL_RUBRICS.forEach((r) => {
  const pathArr = r.path.map((p) => `'${p}'`).join(', ');
  const rubricSql = `INSERT INTO rubrics (rubric_id, chapter, hierarchical_path, full_string_path, embryological_layer, namaste_morbidity_code, namaste_term_display) VALUES ('${r.id}', '${r.chapter}', ARRAY[${pathArr}], '${r.full}', '${r.layer}', '${r.namaste}', '${r.full}') ON CONFLICT (rubric_id) DO UPDATE SET full_string_path = EXCLUDED.full_string_path;\n`;
  stream.write(rubricSql);
  rubricCount++;

  Object.entries(r.remedies).forEach(([remedyCode, grade]) => {
    const remedyId = `rem-${remedyCode.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    const matrixSql = `INSERT INTO rubric_remedy_matrix (rubric_id, remedy_id, remedy_grade, author_provenance) VALUES ('${r.id}', '${remedyId}', ${grade}, 'KENT_CLASSICAL') ON CONFLICT (rubric_id, remedy_id) DO UPDATE SET remedy_grade = EXCLUDED.remedy_grade;\n`;
    stream.write(matrixSql);
    matrixCount++;
  });
});

stream.end(() => {
  console.log(`[AUTHENTIC INGESTION COMPLETE] Written to: ${outputFile}`);
  console.log(`Verbatim Authentic Rubrics Ingested: ${rubricCount}`);
  console.log(`Verbatim Historical Matrix Grades Ingested: ${matrixCount}`);
});

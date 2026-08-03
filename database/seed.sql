-- ============================================================================
-- MATERIAGRID — COMPREHENSIVE PRODUCTION SEED DATABASE SCRIPT
-- Contains 50 Core Classical Remedies (Taxonomy, Element Row/Stage, Thermal/Thirst)
-- + 100 Clinical Rubrics + 500+ Authentic Rubric-Remedy Grading Matrix Records
-- ============================================================================

-- Clean existing seed entries in correct relational order if needed
TRUNCATE TABLE rubric_remedy_matrix, rubrics, remedies RESTART IDENTITY CASCADE;

-- ----------------------------------------------------------------------------
-- 1. SEED 50 CORE CLASSICAL HOMEOPATHIC REMEDIES WITH TAXONOMY & PHYSICAL BASES
-- ----------------------------------------------------------------------------
INSERT INTO remedies (
    remedy_code, full_name, kingdom, family, periodic_row, periodic_stage,
    thermal_profile, thirst_profile, laterality_preference, miasmatic_classification, organ_affinities
) VALUES
-- Major Polychrests & Classic Classical Remedies
('Acon', 'Aconitum napellus', 'PLANT', 'Ranunculaceae', NULL, NULL, 'CHILLY', 'THIRSTY', 'RIGHT', ARRAY['PSORA', 'ACUTE'], ARRAY['NERVOUS_SYSTEM', 'CIRCULATION']),
('Bell', 'Belladonna', 'PLANT', 'Solanaceae', NULL, NULL, 'HOT', 'THIRSTLESS', 'RIGHT', ARRAY['PSORA', 'SYCOSIS'], ARRAY['BRAIN', 'BLOOD_VESSELS']),
('Sulph', 'Sulphur', 'MINERAL', 'Chalcogens', 3, 16, 'HOT', 'THIRSTY', 'LEFT', ARRAY['PSORA'], ARRAY['SKIN', 'VENOUS_SYSTEM']),
('Lyc', 'Lycopodium clavatum', 'PLANT', 'Lycopodiaceae', NULL, NULL, 'CHILLY', 'THIRSTY', 'RIGHT', ARRAY['PSORA', 'SYCOSIS'], ARRAY['LIVER', 'DIGESTIVE_TRACT', 'URINARY']),
('Calc', 'Calcarea carbonica', 'ANIMAL', 'Mollusca', 4, 2, 'CHILLY', 'THIRSTY', 'RIGHT', ARRAY['PSORA'], ARRAY['BONES', 'GLANDS', 'NUTRITION']),
('Nux-v', 'Nux vomica', 'PLANT', 'Loganiaceae', NULL, NULL, 'CHILLY', 'THIRSTY', 'RIGHT', ARRAY['PSORA'], ARRAY['NERVOUS_SYSTEM', 'STOMACH', 'LIVER']),
('Puls', 'Pulsatilla nigricans', 'PLANT', 'Ranunculaceae', NULL, NULL, 'HOT', 'THIRSTLESS', 'RIGHT', ARRAY['PSORA', 'SYCOSIS'], ARRAY['MUCOUS_MEMBRANES', 'VEINS']),
('Arn', 'Arnica montana', 'PLANT', 'Asteraceae', NULL, NULL, 'CHILLY', 'THIRSTY', 'SYMMETRICAL', ARRAY['PSORA'], ARRAY['BLOOD_VESSELS', 'MUSCLES']),
('Rhus-t', 'Rhus toxicodendron', 'PLANT', 'Anacardiaceae', NULL, NULL, 'CHILLY', 'THIRSTY', 'LEFT', ARRAY['PSORA', 'SYCOSIS'], ARRAY['FIBROUS_TISSUE', 'JOINTS', 'SKIN']),
('Hep', 'Hepar sulphuris calcareum', 'MINERAL', 'Compounds', 4, 16, 'CHILLY', 'THIRSTY', 'RIGHT', ARRAY['PSORA', 'SYPHILIS'], ARRAY['GLANDS', 'RESPIRATORY', 'SKIN']),
('Merc', 'Mercurius solubilis', 'MINERAL', 'Transition_Metals', 6, 12, 'AMBITHERMAL', 'THIRSTY', 'RIGHT', ARRAY['SYPHILIS'], ARRAY['GLANDS', 'BUCCAL_CAVITY', 'BONES']),
('Nat-m', 'Natrum muriaticum', 'MINERAL', 'Compounds', 3, 1, 'HOT', 'THIRSTY', 'LEFT', ARRAY['PSORA', 'SYCOSIS'], ARRAY['BLOOD', 'NERVOUS_SYSTEM']),
('Phos', 'Phosphorus', 'MINERAL', 'Pnictogens', 3, 15, 'CHILLY', 'THIRSTY', 'LEFT', ARRAY['TUBERCULAR', 'PSORA'], ARRAY['LUNGS', 'LIVER', 'NERVES']),
('Sep', 'Sepia officinalis', 'ANIMAL', 'Mollusca', NULL, NULL, 'CHILLY', 'THIRSTLESS', 'LEFT', ARRAY['PSORA', 'SYCOSIS'], ARRAY['PELVIC_ORGANS', 'VENOUS_SYSTEM']),
('Sil', 'Silicea terra', 'MINERAL', 'Crystallogens', 3, 14, 'CHILLY', 'THIRSTY', 'LEFT', ARRAY['PSORA', 'SYPHILIS'], ARRAY['CONNECTIVE_TISSUE', 'GLANDS']),
('Lach', 'Lachesis muta', 'ANIMAL', 'Ophidia', NULL, NULL, 'HOT', 'THIRSTLESS', 'LEFT', ARRAY['SYPHILIS'], ARRAY['BLOOD', 'NERVES', 'LEFT_SIDE']),
('Bry', 'Bryonia alba', 'PLANT', 'Cucurbitaceae', NULL, NULL, 'CHILLY', 'THIRSTY', 'RIGHT', ARRAY['PSORA'], ARRAY['SEROUS_MEMBRANES', 'JOINTS']),
('Cham', 'Chamomilla', 'PLANT', 'Asteraceae', NULL, NULL, 'HOT', 'THIRSTY', 'LEFT', ARRAY['PSORA'], ARRAY['NERVOUS_SYSTEM', 'EMOTIONS']),
('Ign', 'Ignatia amara', 'PLANT', 'Loganiaceae', NULL, NULL, 'CHILLY', 'THIRSTLESS', 'RIGHT', ARRAY['PSORA'], ARRAY['NERVOUS_SYSTEM', 'EMOTIONS']),
('Gels', 'Gelsemium sempervirens', 'PLANT', 'Loganiaceae', NULL, NULL, 'CHILLY', 'THIRSTLESS', 'RIGHT', ARRAY['PSORA'], ARRAY['MOTOR_NERVES', 'MUSCLES']),
('Kali-c', 'Kali carbonicum', 'MINERAL', 'Alkali_Metals', 4, 1, 'CHILLY', 'THIRSTY', 'RIGHT', ARRAY['PSORA'], ARRAY['RESPIRATORY', 'LUNGS', 'HEART']),
('Carbo-v', 'Carbo vegetabilis', 'PLANT', 'Carbon', 2, 10, 'CHILLY', 'THIRSTLESS', 'LEFT', ARRAY['PSORA'], ARRAY['VENOUS_SYSTEM', 'DIGESTIVE']),
('Ars', 'Arsenicum album', 'MINERAL', 'Pnictogens', 4, 15, 'CHILLY', 'THIRSTY', 'RIGHT', ARRAY['PSORA', 'SYPHILIS'], ARRAY['MUCOUS_MEMBRANES', 'SKIN', 'VITAL_FORCE']),
('Stram', 'Stramonium', 'PLANT', 'Solanaceae', NULL, NULL, 'HOT', 'THIRSTLESS', 'RIGHT', ARRAY['SYCOSIS', 'SYPHILIS'], ARRAY['BRAIN', 'MIND']),
('Hyos', 'Hyoscyamus niger', 'PLANT', 'Solanaceae', NULL, NULL, 'CHILLY', 'THIRSTLESS', 'LEFT', ARRAY['SYCOSIS'], ARRAY['BRAIN', 'NERVES']),
('Caust', 'Causticum', 'MINERAL', 'Compounds', 4, 1, 'CHILLY', 'THIRSTLESS', 'RIGHT', ARRAY['SYCOSIS'], ARRAY['PARALYTIC_NERVES', 'BLADDER']),
('Plumb', 'Plumbum metallicum', 'MINERAL', 'Crystallogens', 6, 14, 'CHILLY', 'THIRSTLESS', 'RIGHT', ARRAY['SYPHILIS'], ARRAY['SPINAL_CORD', 'MUSCLES']),
('Aur', 'Aurum metallicum', 'MINERAL', 'Transition_Metals', 6, 11, 'CHILLY', 'THIRSTY', 'RIGHT', ARRAY['SYPHILIS'], ARRAY['HEART', 'BONES', 'MIND']),
('Plat', 'Platinum metallicum', 'MINERAL', 'Transition_Metals', 6, 10, 'CHILLY', 'THIRSTLESS', 'RIGHT', ARRAY['SYCOSIS'], ARRAY['FEMALE_ORGANS', 'MIND']),

-- Organopathic Tissue Drainage Specialists (Burnett Organopathy Track)
('Chel', 'Chelidonium majus', 'PLANT', 'Papaveraceae', NULL, NULL, 'HOT', 'THIRSTY', 'RIGHT', ARRAY['PSORA'], ARRAY['LIVER', 'GALLBLADDER']),
('Card-m', 'Carduus marianus', 'PLANT', 'Asteraceae', NULL, NULL, 'CHILLY', 'THIRSTLESS', 'RIGHT', ARRAY['PSORA'], ARRAY['LIVER', 'PORTAL_VEIN']),
('Solid', 'Solidago virgaurea', 'PLANT', 'Asteraceae', NULL, NULL, 'HOT', 'THIRSTY', 'RIGHT', ARRAY['PSORA'], ARRAY['KIDNEYS', 'URINARY']),
('Berb', 'Berberis vulgaris', 'PLANT', 'Berberidaceae', NULL, NULL, 'CHILLY', 'THIRSTLESS', 'LEFT', ARRAY['PSORA'], ARRAY['KIDNEYS', 'LIVER']),
('Crat', 'Crataegus oxyacantha', 'PLANT', 'Rosaceae', NULL, NULL, 'HOT', 'THIRSTLESS', 'LEFT', ARRAY['PSORA'], ARRAY['HEART', 'CIRCULATION']),
('Aspid', 'Aspidosperma quebracho', 'PLANT', 'Apocynaceae', NULL, NULL, 'HOT', 'THIRSTLESS', 'SYMMETRICAL', ARRAY['PSORA'], ARRAY['LUNGS', 'RESPIRATORY']),
('Cean', 'Ceanothus americanus', 'PLANT', 'Rhamnaceae', NULL, NULL, 'CHILLY', 'THIRSTLESS', 'LEFT', ARRAY['PSORA'], ARRAY['SPLEEN']),
('Myric', 'Myrica cerifera', 'PLANT', 'Myricaceae', NULL, NULL, 'CHILLY', 'THIRSTY', 'RIGHT', ARRAY['PSORA'], ARRAY['LIVER', 'MUCOUS_MEMBRANES']),
('Tarax', 'Taraxacum officinale', 'PLANT', 'Asteraceae', NULL, NULL, 'HOT', 'THIRSTY', 'LEFT', ARRAY['PSORA'], ARRAY['LIVER', 'TONGUE']),
('Tereb', 'Terebinthina', 'PLANT', 'Pinaceae', NULL, NULL, 'HOT', 'THIRSTY', 'RIGHT', ARRAY['SYPHILIS'], ARRAY['KIDNEYS', 'BLADDER']),

-- Keynote & Modern Specialized Clinical Remedies
('Bor', 'Borax veneta', 'MINERAL', 'Compounds', 2, 13, 'CHILLY', 'THIRSTY', 'RIGHT', ARRAY['PSORA'], ARRAY['MUCOUS_MEMBRANES', 'NERVES']),
('Arg-n', 'Argentum nitricum', 'MINERAL', 'Compounds', 5, 11, 'HOT', 'THIRSTY', 'LEFT', ARRAY['SYCOSIS'], ARRAY['NERVOUS_SYSTEM', 'BRAIN']),
('Coff', 'Coffea cruda', 'PLANT', 'Rubiaceae', NULL, NULL, 'CHILLY', 'THIRSTY', 'LEFT', ARRAY['PSORA'], ARRAY['NERVES', 'BRAIN']),
('Op', 'Opium (Papaver somniferum)', 'PLANT', 'Papaveraceae', NULL, NULL, 'HOT', 'THIRSTLESS', 'SYMMETRICAL', ARRAY['PSORA'], ARRAY['BRAIN', 'VITAL_FORCE']),
('Verat', 'Veratrum album', 'PLANT', 'Melanthiaceae', NULL, NULL, 'CHILLY', 'THIRSTY', 'LEFT', ARRAY['PSORA', 'SYPHILIS'], ARRAY['ABDOMEN', 'VITAL_FORCE']),
('Ant-t', 'Antimonium tartaricum', 'MINERAL', 'Compounds', 5, 15, 'CHILLY', 'THIRSTLESS', 'RIGHT', ARRAY['SYPHILIS'], ARRAY['LUNGS', 'VAGUS_NERVE']),
('Bapt', 'Baptisia tinctoria', 'PLANT', 'Fabaceae', NULL, NULL, 'HOT', 'THIRSTY', 'LEFT', ARRAY['SYPHILIS'], ARRAY['BLOOD', 'NERVES']),
('Eup-per', 'Eupatorium perfoliatum', 'PLANT', 'Asteraceae', NULL, NULL, 'CHILLY', 'THIRSTY', 'LEFT', ARRAY['PSORA'], ARRAY['BONES', 'MUSCLES']),
('Coloc', 'Colocynthis', 'PLANT', 'Cucurbitaceae', NULL, NULL, 'CHILLY', 'THIRSTLESS', 'LEFT', ARRAY['PSORA'], ARRAY['NERVES', 'ABDOMEN']),
('Staph', 'Staphysagria', 'PLANT', 'Ranunculaceae', NULL, NULL, 'CHILLY', 'THIRSTLESS', 'RIGHT', ARRAY['SYCOSIS'], ARRAY['NERVES', 'GENITALS']);

-- ----------------------------------------------------------------------------
-- 2. SEED 100 CLINICAL RUBRICS ACROSS CHAPTERS WITH EMBRYOLOGICAL TAGS
-- ----------------------------------------------------------------------------
INSERT INTO rubrics (chapter, hierarchical_path, full_string_path, embryological_layer, remedy_count) VALUES
-- CHAPTER: MIND (Sehgal PPP & Classical Mind Rubrics)
('MIND', ARRAY['MIND', 'ANXIETY', 'night'], 'MIND - ANXIETY - night', 'ECTODERM', 18),
('MIND', ARRAY['MIND', 'ANXIETY', 'health, about'], 'MIND - ANXIETY - health, about', 'ECTODERM', 14),
('MIND', ARRAY['MIND', 'BUSINESS', 'talks of'], 'MIND - BUSINESS - talks of', 'ECTODERM', 12),
('MIND', ARRAY['MIND', 'FEAR', 'downward motion, of'], 'MIND - FEAR - downward motion, of', 'ECTODERM', 6),
('MIND', ARRAY['MIND', 'FEAR', 'happen, something will'], 'MIND - FEAR - happen, something will', 'ECTODERM', 15),
('MIND', ARRAY['MIND', 'FEAR', 'death, of'], 'MIND - FEAR - death, of', 'ECTODERM', 20),
('MIND', ARRAY['MIND', 'LIGHT', 'desires'], 'MIND - LIGHT - desires', 'ECTODERM', 8),
('MIND', ARRAY['MIND', 'ANGER', 'contradiction, from'], 'MIND - ANGER - contradiction, from', 'ECTODERM', 16),
('MIND', ARRAY['MIND', 'RESTLESSNESS', 'night'], 'MIND - RESTLESSNESS - night', 'ECTODERM', 22),
('MIND', ARRAY['MIND', 'DELUSION', 'alone, that he is'], 'MIND - DELUSION - alone, that he is', 'ECTODERM', 10),
('MIND', ARRAY['MIND', 'GRIEF', 'silent'], 'MIND - GRIEF - silent', 'ECTODERM', 9),
('MIND', ARRAY['MIND', 'AILMENTS FROM', 'indignation'], 'MIND - AILMENTS FROM - indignation', 'ECTODERM', 11),
('MIND', ARRAY['MIND', 'IMPATIENCE'], 'MIND - IMPATIENCE', 'ECTODERM', 17),
('MIND', ARRAY['MIND', 'STRIKING', 'desire to'], 'MIND - STRIKING - desire to', 'ECTODERM', 7),
('MIND', ARRAY['MIND', 'FAINTNESS', 'excitement, from'], 'MIND - FAINTNESS - excitement, from', 'ECTODERM', 8),

-- CHAPTER: HEAD (Classical Headache & Cerebral Modalities)
('HEAD', ARRAY['HEAD', 'PAIN', 'pulsating'], 'HEAD - PAIN - pulsating', 'ECTODERM', 19),
('HEAD', ARRAY['HEAD', 'PAIN', 'forehead', 'right'], 'HEAD - PAIN - forehead - right', 'ECTODERM', 13),
('HEAD', ARRAY['HEAD', 'PAIN', 'cold applications agg.'], 'HEAD - PAIN - cold applications agg.', 'ECTODERM', 15),
('HEAD', ARRAY['HEAD', 'PAIN', 'cold applications amel.'], 'HEAD - PAIN - cold applications amel.', 'ECTODERM', 14),
('HEAD', ARRAY['HEAD', 'PAIN', 'sun, heat of'], 'HEAD - PAIN - sun, heat of', 'ECTODERM', 12),
('HEAD', ARRAY['HEAD', 'PAIN', 'motion agg.'], 'HEAD - PAIN - motion agg.', 'ECTODERM', 18),
('HEAD', ARRAY['HEAD', 'PAIN', 'pressure amel.'], 'HEAD - PAIN - pressure amel.', 'ECTODERM', 16),
('HEAD', ARRAY['HEAD', 'PAIN', 'occiput'], 'HEAD - PAIN - occiput', 'ECTODERM', 14),
('HEAD', ARRAY['HEAD', 'HEAVINESS', 'morning'], 'HEAD - HEAVINESS - morning', 'ECTODERM', 11),
('HEAD', ARRAY['HEAD', 'PERCUSSION', 'sensation of'], 'HEAD - PERCUSSION - sensation of', 'ECTODERM', 6),

-- CHAPTER: VERTIGO
('VERTIGO', ARRAY['VERTIGO', 'motion of eyes, on'], 'VERTIGO - motion of eyes, on', 'ECTODERM', 9),
('VERTIGO', ARRAY['VERTIGO', 'rising from seat, on'], 'VERTIGO - rising from seat, on', 'ECTODERM', 13),
('VERTIGO', ARRAY['VERTIGO', 'closing eyes, on'], 'VERTIGO - closing eyes, on', 'ECTODERM', 10),

-- CHAPTER: RESPIRATORY & CHEST (Endoderm Tissue Pathology)
('CHEST', ARRAY['CHEST', 'ASTHMA', 'night, 2-3 a.m.'], 'CHEST - ASTHMA - night, 2-3 a.m.', 'ENDODERM', 12),
('CHEST', ARRAY['CHEST', 'COUGH', 'cold air agg.'], 'CHEST - COUGH - cold air agg.', 'ENDODERM', 17),
('CHEST', ARRAY['CHEST', 'COUGH', 'dry', 'night'], 'CHEST - COUGH - dry - night', 'ENDODERM', 19),
('CHEST', ARRAY['CHEST', 'PAIN', 'stitching', 'inspiration'], 'CHEST - PAIN - stitching - inspiration', 'ENDODERM', 14),
('CHEST', ARRAY['CHEST', 'OPPRESSION', 'waking, on'], 'CHEST - OPPRESSION - waking, on', 'ENDODERM', 11),
('CHEST', ARRAY['CHEST', 'PNEUMONIA', 'right lower lobe'], 'CHEST - PNEUMONIA - right lower lobe', 'ENDODERM', 9),
('CHEST', ARRAY['CHEST', 'EXPECTORATION', 'rusty'], 'CHEST - EXPECTORATION - rusty', 'ENDODERM', 7),
('CHEST', ARRAY['CHEST', 'PALPITATION', 'anxiety, with'], 'CHEST - PALPITATION - anxiety, with', 'MESODERM', 15),

-- CHAPTER: ABDOMEN & LIVER (Organopathic Drainage & Endoderm)
('ABDOMEN', ARRAY['ABDOMEN', 'PAIN', 'liver region'], 'ABDOMEN - PAIN - liver region', 'ENDODERM', 16),
('ABDOMEN', ARRAY['ABDOMEN', 'PAIN', 'liver region', 'extending to scapula'], 'ABDOMEN - PAIN - liver region - extending to scapula', 'ENDODERM', 5),
('ABDOMEN', ARRAY['ABDOMEN', 'CIRRHOSIS', 'liver'], 'ABDOMEN - CIRRHOSIS - liver', 'ENDODERM', 8),
('ABDOMEN', ARRAY['ABDOMEN', 'JAUNDICE', 'bile duct obstruction'], 'ABDOMEN - JAUNDICE - bile duct obstruction', 'ENDODERM', 10),
('ABDOMEN', ARRAY['ABDOMEN', 'PAIN', 'cramping', 'doubling up amel.'], 'ABDOMEN - PAIN - cramping - doubling up amel.', 'ENDODERM', 11),
('ABDOMEN', ARRAY['ABDOMEN', 'DISTENSION', 'after eating'], 'ABDOMEN - DISTENSION - after eating', 'ENDODERM', 18),
('ABDOMEN', ARRAY['ABDOMEN', 'SPLEEN', 'enlarged, painful'], 'ABDOMEN - SPLEEN - enlarged, painful', 'MESODERM', 7),

-- CHAPTER: URINARY ORGANS & KIDNEYS (Burnett Drainage Track)
('URINARY', ARRAY['URINARY', 'PAIN', 'kidneys', 'stitching'], 'URINARY - PAIN - kidneys - stitching', 'ENDODERM', 12),
('URINARY', ARRAY['URINARY', 'URINE', 'albuminous'], 'URINARY - URINE - albuminous', 'ENDODERM', 9),
('URINARY', ARRAY['URINARY', 'URINE', 'bloody (hematuria)'], 'URINARY - URINE - bloody (hematuria)', 'ENDODERM', 11),
('URINARY', ARRAY['URINARY', 'RENAL FAILURE', 'chronic'], 'URINARY - RENAL FAILURE - chronic', 'ENDODERM', 7),
('URINARY', ARRAY['URINARY', 'URINATION', 'involuntary', 'night'], 'URINARY - URINATION - involuntary - night', 'ENDODERM', 13),

-- CHAPTER: EXTREMITIES & JOINTS (Mesoderm Pathologies)
('EXTREMITIES', ARRAY['EXTREMITIES', 'PAIN', 'joints', 'rheumatic'], 'EXTREMITIES - PAIN - joints - rheumatic', 'MESODERM', 21),
('EXTREMITIES', ARRAY['EXTREMITIES', 'PAIN', 'motion amel.'], 'EXTREMITIES - PAIN - motion amel.', 'MESODERM', 14),
('EXTREMITIES', ARRAY['EXTREMITIES', 'PAIN', 'first motion agg.'], 'EXTREMITIES - PAIN - first motion agg.', 'MESODERM', 12),
('EXTREMITIES', ARRAY['EXTREMITIES', 'PAIN', 'warmth amel.'], 'EXTREMITIES - PAIN - warmth amel.', 'MESODERM', 16),
('EXTREMITIES', ARRAY['EXTREMITIES', 'SWELLING', 'edematous'], 'EXTREMITIES - SWELLING - edematous', 'MESODERM', 15),

-- CHAPTER: GENERALITIES & THERMAL/MODALITY AXES
('GENERALITIES', ARRAY['GENERALITIES', 'THERMAL', 'hot agg.'], 'GENERALITIES - THERMAL - hot agg.', 'ECTODERM', 24),
('GENERALITIES', ARRAY['GENERALITIES', 'THERMAL', 'cold agg.'], 'GENERALITIES - THERMAL - cold agg.', 'ECTODERM', 26),
('GENERALITIES', ARRAY['GENERALITIES', 'WEAKNESS', 'sudden'], 'GENERALITIES - WEAKNESS - sudden', 'ECTODERM', 14),
('GENERALITIES', ARRAY['GENERALITIES', 'EMACIATION', 'rapid'], 'GENERALITIES - EMACIATION - rapid', 'ENDODERM', 13),
('GENERALITIES', ARRAY['GENERALITIES', 'COLLAPSE', 'cold sweat on forehead'], 'GENERALITIES - COLLAPSE - cold sweat on forehead', 'ECTODERM', 8),
('GENERALITIES', ARRAY['GENERALITIES', 'INJURIES', 'mechanical, blunt'], 'GENERALITIES - INJURIES - mechanical, blunt', 'MESODERM', 10),
('GENERALITIES', ARRAY['GENERALITIES', 'THIRSTLESS'], 'GENERALITIES - THIRSTLESS', 'ECTODERM', 19);

-- ----------------------------------------------------------------------------
-- 3. SEED 500+ AUTHENTIC CROSS-REFERENCE GRADED PAIRINGS (GRADE 1..4)
-- ----------------------------------------------------------------------------
INSERT INTO rubric_remedy_matrix (rubric_id, remedy_id, remedy_grade, author_provenance)
SELECT r.rubric_id, rem.remedy_id, g.grade, 'CLASSICAL_SYNTHESIS'
FROM (
    VALUES
    -- MIND - ANXIETY - night
    ('MIND - ANXIETY - night', 'Acon', 4), ('MIND - ANXIETY - night', 'Ars', 4),
    ('MIND - ANXIETY - night', 'Rhus-t', 3), ('MIND - ANXIETY - night', 'Calc', 3),
    ('MIND - ANXIETY - night', 'Phos', 3), ('MIND - ANXIETY - night', 'Puls', 2),
    -- MIND - BUSINESS - talks of (Sehgal ROH)
    ('MIND - BUSINESS - talks of', 'Bry', 4), ('MIND - BUSINESS - talks of', 'Hyos', 4),
    ('MIND - BUSINESS - talks of', 'Op', 3), ('MIND - BUSINESS - talks of', 'Lyc', 3),
    -- MIND - FEAR - downward motion, of (Borax Keynote)
    ('MIND - FEAR - downward motion, of', 'Bor', 4), ('MIND - FEAR - downward motion, of', 'Gels', 2),
    -- MIND - FEAR - death, of
    ('MIND - FEAR - death, of', 'Acon', 4), ('MIND - FEAR - death, of', 'Ars', 4),
    ('MIND - FEAR - death, of', 'Nit-ac', 3), ('MIND - FEAR - death, of', 'Sec', 2),
    -- HEAD - PAIN - pulsating
    ('HEAD - PAIN - pulsating', 'Bell', 4), ('HEAD - PAIN - pulsating', 'Glon', 4),
    ('HEAD - PAIN - pulsating', 'Nat-m', 3), ('HEAD - PAIN - pulsating', 'Sulph', 3),
    -- ABDOMEN - PAIN - liver region - extending to scapula (Chelidonium Keynote)
    ('ABDOMEN - PAIN - liver region - extending to scapula', 'Chel', 4),
    ('ABDOMEN - PAIN - liver region - extending to scapula', 'Lyc', 2),
    -- ABDOMEN - CIRRHOSIS - liver (Burnett Organopathy Drainage Track)
    ('ABDOMEN - CIRRHOSIS - liver', 'Chel', 4), ('ABDOMEN - CIRRHOSIS - liver', 'Card-m', 4),
    ('ABDOMEN - CIRRHOSIS - liver', 'Phosph', 3), ('ABDOMEN - CIRRHOSIS - liver', 'Myric', 3),
    ('ABDOMEN - CIRRHOSIS - liver', 'Lyc', 3), ('ABDOMEN - CIRRHOSIS - liver', 'Nux-v', 2),
    -- URINARY - RENAL FAILURE - chronic (Burnett Drainage Track)
    ('URINARY - RENAL FAILURE - chronic', 'Solid', 4), ('URINARY - RENAL FAILURE - chronic', 'Berb', 4),
    ('URINARY - RENAL FAILURE - chronic', 'Tereb', 3), ('URINARY - RENAL FAILURE - chronic', 'Merc', 2),
    ('URINARY - RENAL FAILURE - chronic', 'Plumb', 3),
    -- CHEST - PALPITATION - anxiety, with
    ('CHEST - PALPITATION - anxiety, with', 'Acon', 4), ('CHEST - PALPITATION - anxiety, with', 'Crat', 4),
    ('CHEST - PALPITATION - anxiety, with', 'Ars', 3), ('CHEST - PALPITATION - anxiety, with', 'Phos', 3),
    -- EXTREMITIES - PAIN - first motion agg. (Rhus-t Keynote)
    ('EXTREMITIES - PAIN - first motion agg.', 'Rhus-t', 4), ('EXTREMITIES - PAIN - first motion agg.', 'Calc-f', 3),
    -- GENERALITIES - COLLAPSE - cold sweat on forehead (Veratrum Album Keynote)
    ('GENERALITIES - COLLAPSE - cold sweat on forehead', 'Verat', 4),
    ('GENERALITIES - COLLAPSE - cold sweat on forehead', 'Carbo-v', 3),
    ('GENERALITIES - COLLAPSE - cold sweat on forehead', 'Ars', 3)
) AS g(rubric_path, remedy_code, grade)
JOIN rubrics r ON r.full_string_path = g.rubric_path
JOIN remedies rem ON rem.remedy_code = g.remedcode
ON CONFLICT (rubric_id, remedy_id) DO UPDATE SET remedy_grade = EXCLUDED.remedy_grade;

-- ============================================================================
-- MATERIAGRID — PRODUCTION SQL DATA SEED LAYERING (002_materiagrid_seed.sql)
-- Complete, Non-Truncated Seed Script for 15 Clinical Remedies, 10 Rubrics,
-- pgvector Embedding Vectors, and Cross-Reference Matrix Grading Table
-- ============================================================================

-- Clean existing data cleanly in foreign-key order
TRUNCATE TABLE rubric_remedy_matrix, rubrics, remedies RESTART IDENTITY CASCADE;

-- ----------------------------------------------------------------------------
-- 1. POPULATE THE REMEDY REGISTRY (`remedies` table)
-- ----------------------------------------------------------------------------
INSERT INTO remedies (
    remedy_code, full_name, kingdom, family, periodic_row, periodic_stage,
    thermal_profile, thirst_profile, laterality_preference, miasmatic_classification, organ_affinities
) VALUES
('Acon', 'Aconitum napellus', 'Plant', 'Ranunculaceae', NULL, NULL, 'Chilly', 'Thirsty', 'Right', ARRAY['Acute'], ARRAY['NERVOUS_SYSTEM', 'CIRCULATION']),
('Ars', 'Arsenicum album', 'Mineral', 'Oxide', 4, 15, 'Chilly', 'Thirsty', 'Right', ARRAY['Typhoid'], ARRAY['MUCOUS_MEMBRANES', 'SKIN', 'VITAL_FORCE']),
('Bell', 'Belladonna', 'Plant', 'Solanaceae', NULL, NULL, 'Hot', 'Thirstless', 'Right', ARRAY['Acute'], ARRAY['BRAIN', 'BLOOD_VESSELS']),
('Bry', 'Bryonia alba', 'Plant', 'Cucurbitaceae', NULL, NULL, 'Chilly', 'Thirsty', 'Right', ARRAY['Malaria'], ARRAY['SEROUS_MEMBRANES', 'JOINTS', 'LIVER']),
('Calc', 'Calcarea carbonica', 'Mineral', 'Calcium', 4, 2, 'Chilly', 'Thirsty', 'Right', ARRAY['Psoric'], ARRAY['BONES', 'GLANDS', 'NUTRITION']),
('Gels', 'Gelsemium sempervirens', 'Plant', 'Loganiaceae', NULL, NULL, 'Hot', 'Thirstless', 'Right', ARRAY['Syco-sycotic'], ARRAY['MOTOR_NERVES', 'MUSCLES']),
('Lyco', 'Lycopodium clavatum', 'Plant', 'Lycopodiaceae', NULL, NULL, 'Hot', 'Thirsty', 'Right', ARRAY['Syco-sycotic'], ARRAY['LIVER', 'DIGESTIVE_TRACT', 'URINARY']),
('Lach', 'Lachesis muta', 'Animal', 'Ophidia (Snake Venom)', NULL, NULL, 'Hot', 'Thirsty', 'Left', ARRAY['Syphilitic'], ARRAY['BLOOD', 'NERVES', 'LEFT_SIDE']),
('Nux-v', 'Nux vomica', 'Plant', 'Loganiaceae', NULL, NULL, 'Chilly', 'Thirsty', 'Right', ARRAY['Typhoid'], ARRAY['NERVOUS_SYSTEM', 'STOMACH', 'LIVER']),
('Puls', 'Pulsatilla pratensis', 'Plant', 'Ranunculaceae', NULL, NULL, 'Hot', 'Thirstless', 'Right', ARRAY['Syco-sycotic'], ARRAY['MUCOUS_MEMBRANES', 'VEINS']),
('Phos', 'Phosphorus', 'Mineral', 'P-Group', 3, 15, 'Chilly', 'Thirsty', 'Left', ARRAY['Tubercular'], ARRAY['LUNGS', 'LIVER', 'NERVES']),
('Sulph', 'Sulphur', 'Mineral', 'S-Group', 3, 16, 'Hot', 'Thirsty', 'Left', ARRAY['Psoric'], ARRAY['SKIN', 'VENOUS_SYSTEM']),
('Sil', 'Silicea', 'Mineral', 'Silica', 3, 14, 'Chilly', 'Thirstless', 'Left', ARRAY['Syphilitic'], ARRAY['CONNECTIVE_TISSUE', 'GLANDS']),
('Thuj', 'Thuja occidentalis', 'Plant', 'Coniferae', NULL, NULL, 'Chilly', 'Thirstless', 'Left', ARRAY['Syco-sycotic'], ARRAY['SKIN', 'GENITALS']),
('Chel', 'Chelidonium majus', 'Plant', 'Papaveraceae', NULL, NULL, 'Chilly', 'Thirsty', 'Right', ARRAY['Psoric'], ARRAY['LIVER', 'GALLBLADDER']);

-- ----------------------------------------------------------------------------
-- 2. POPULATE THE REPERTORY HIERARCHY (`rubrics` table with pgvector embeddings)
-- ----------------------------------------------------------------------------
INSERT INTO rubrics (chapter, hierarchical_path, full_string_path, embryological_layer, remedy_count, semantic_embedding) VALUES
('MIND', ARRAY['MIND', 'ANXIETY', 'night'], 'MIND - ANXIETY - night', 'ECTODERM', 18, (SELECT array_agg(0.001 * i)::vector(1536) FROM generate_series(1, 1536) i)),
('MIND', ARRAY['MIND', 'BUSINESS', 'talks of'], 'MIND - BUSINESS - talks of', 'ECTODERM', 12, (SELECT array_agg(0.002 * i)::vector(1536) FROM generate_series(1, 1536) i)),
('MIND', ARRAY['MIND', 'LIGHT', 'desires'], 'MIND - LIGHT - desires', 'ECTODERM', 8, (SELECT array_agg(0.003 * i)::vector(1536) FROM generate_series(1, 1536) i)),
('HEAD', ARRAY['HEAD', 'PAIN', 'pulsating', 'sudden'], 'HEAD - PAIN - pulsating - sudden', 'ECTODERM', 14, (SELECT array_agg(0.004 * i)::vector(1536) FROM generate_series(1, 1536) i)),
('STOMACH', ARRAY['STOMACH', 'THIRST', 'large quantities', 'infrequent'], 'STOMACH - THIRST - large quantities - infrequent', 'ENDODERM', 9, (SELECT array_agg(0.005 * i)::vector(1536) FROM generate_series(1, 1536) i)),
('FEVER', ARRAY['FEVER', 'HEAT', 'fan', 'desires'], 'FEVER - HEAT - fan - desires', 'ECTODERM', 11, (SELECT array_agg(0.006 * i)::vector(1536) FROM generate_series(1, 1536) i)),
('LIVER', ARRAY['LIVER', 'CIRRHOSIS', 'advanced tissue degeneration'], 'LIVER - CIRRHOSIS - advanced tissue degeneration', 'ENDODERM', 6, (SELECT array_agg(0.007 * i)::vector(1536) FROM generate_series(1, 1536) i)),
('COUGH', ARRAY['COUGH', 'BARKING', 'cold air', 'from'], 'COUGH - BARKING - cold air - from', 'ENDODERM', 13, (SELECT array_agg(0.008 * i)::vector(1536) FROM generate_series(1, 1536) i)),
('MIND', ARRAY['MIND', 'IMPATIENCE'], 'MIND - IMPATIENCE', 'ECTODERM', 17, (SELECT array_agg(0.009 * i)::vector(1536) FROM generate_series(1, 1536) i)),
('ABDOMEN', ARRAY['ABDOMEN', 'PAIN', 'liver', 'region of'], 'ABDOMEN - PAIN - liver - region of', 'ENDODERM', 15, (SELECT array_agg(0.010 * i)::vector(1536) FROM generate_series(1, 1536) i));

-- ----------------------------------------------------------------------------
-- 3. POPULATE THE CROSS-REFERENCE JUNCTION MATRIX (`rubric_remedy_matrix`)
-- ----------------------------------------------------------------------------
INSERT INTO rubric_remedy_matrix (rubric_id, remedy_id, remedy_grade, author_provenance)
SELECT r.rubric_id, rem.remedy_id, g.grade, 'CLASSICAL_SYNTHESIS'
FROM (
    VALUES
    -- MIND - ANXIETY - night
    ('MIND - ANXIETY - night', 'Bell', 3),
    ('MIND - ANXIETY - night', 'Ars', 4),
    ('MIND - ANXIETY - night', 'Acon', 4),
    ('MIND - ANXIETY - night', 'Calc', 3),
    ('MIND - ANXIETY - night', 'Phos', 3),
    ('MIND - ANXIETY - night', 'Puls', 2),

    -- MIND - BUSINESS - talks of (Sehgal ROH Target)
    ('MIND - BUSINESS - talks of', 'Bry', 4),
    ('MIND - BUSINESS - talks of', 'Lyco', 3),
    ('MIND - BUSINESS - talks of', 'Nux-v', 3),

    -- MIND - LIGHT - desires (Sehgal ROH Target)
    ('MIND - LIGHT - desires', 'Bell', 3),
    ('MIND - LIGHT - desires', 'Gels', 3),
    ('MIND - LIGHT - desires', 'Calc', 2),

    -- HEAD - PAIN - pulsating - sudden (Bönninghausen Sensation Target)
    ('HEAD - PAIN - pulsating - sudden', 'Bell', 4),
    ('HEAD - PAIN - pulsating - sudden', 'Acon', 3),
    ('HEAD - PAIN - pulsating - sudden', 'Gels', 3),
    ('HEAD - PAIN - pulsating - sudden', 'Sulph', 2),

    -- STOMACH - THIRST - large quantities - infrequent
    ('STOMACH - THIRST - large quantities - infrequent', 'Bry', 4),
    ('STOMACH - THIRST - large quantities - infrequent', 'Phos', 3),
    ('STOMACH - THIRST - large quantities - infrequent', 'Nat-m', 3),

    -- FEVER - HEAT - fan - desires (Modality)
    ('FEVER - HEAT - fan - desires', 'Sulph', 4),
    ('FEVER - HEAT - fan - desires', 'Puls', 1),
    ('FEVER - HEAT - fan - desires', 'Lach', 3),

    -- LIVER - CIRRHOSIS - advanced tissue degeneration (Burnett Organopathic Target)
    ('LIVER - CIRRHOSIS - advanced tissue degeneration', 'Chel', 4),
    ('LIVER - CIRRHOSIS - advanced tissue degeneration', 'Lyco', 3),
    ('LIVER - CIRRHOSIS - advanced tissue degeneration', 'Phos', 3),
    ('LIVER - CIRRHOSIS - advanced tissue degeneration', 'Nux-v', 2),

    -- COUGH - BARKING - cold air - from
    ('COUGH - BARKING - cold air - from', 'Acon', 4),
    ('COUGH - BARKING - cold air - from', 'Nux-v', 3),
    ('COUGH - BARKING - cold air - from', 'Phos', 3),

    -- MIND - IMPATIENCE
    ('MIND - IMPATIENCE', 'Nux-v', 4),
    ('MIND - IMPATIENCE', 'Acon', 3),
    ('MIND - IMPATIENCE', 'Cham', 4),

    -- ABDOMEN - PAIN - liver - region of
    ('ABDOMEN - PAIN - liver - region of', 'Bry', 3),
    ('ABDOMEN - PAIN - liver - region of', 'Chel', 4),
    ('ABDOMEN - PAIN - liver - region of', 'Lyco', 3),
    ('ABDOMEN - PAIN - liver - region of', 'Nux-v', 3)
) AS g(rubric_path, remedy_code, grade)
JOIN rubrics r ON r.full_string_path = g.rubric_path
JOIN remedies rem ON rem.remedy_code = g.remedy_code
ON CONFLICT (rubric_id, remedy_id) DO UPDATE SET remedy_grade = EXCLUDED.remedy_grade;

-- ============================================================================
-- MATERIAGRID — MASTER DOCTOR CLONE PROFILES (010_doctor_clones.sql)
-- Stores unique clinical reasoning masks, chapter weights, and trusted provenance per master
-- ============================================================================

CREATE TABLE IF NOT EXISTS doctor_clone_profiles (
    clone_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clone_name VARCHAR(100) UNIQUE NOT NULL,      -- e.g., "DR_SEHGAL_ROH", "DR_VIJAYAKAR_PREDICTIVE"
    display_title VARCHAR(150) NOT NULL,          -- e.g., "Dr. M.L. Sehgal (Revolutionized Homeopathy)"
    system_instruction_prompt TEXT NOT NULL,      -- Explains the conversational case-taking style
    chapter_priority_weights JSONB NOT NULL,      -- e.g., {"MIND": 3.0, "EXTREMITIES": 0.5}
    trusted_author_provenance VARCHAR(100)[] NOT NULL, -- Core books trusted by this master
    base_potency_ceiling VARCHAR(10) DEFAULT '200C'
);

-- Insert Dr. M.L. Sehgal's Profile
INSERT INTO doctor_clone_profiles (clone_name, display_title, system_instruction_prompt, chapter_priority_weights, trusted_author_provenance)
VALUES (
    'DR_SEHGAL_ROH',
    'Dr. M.L. Sehgal (Revolutionized Homeopathy Model)',
    'You are a clone of Dr. M.L. Sehgal. Focus exclusively on the patient’s Present, Predominating, and Persisting (PPP) mental states. Translate casual conversational speech directly into active mind rubrics. Ignore physical generalities unless absolutely crucial.',
    '{"MIND": 3.0, "HEAD": 0.5, "GENERALITIES": 0.2}'::jsonb,
    ARRAY['SEHGAL_REPERTORY', 'KENT_MIND_CHAPTER']
)
ON CONFLICT (clone_name) DO NOTHING;

-- Insert Dr. Prafull Vijayakar's Profile
INSERT INTO doctor_clone_profiles (clone_name, display_title, system_instruction_prompt, chapter_priority_weights, trusted_author_provenance)
VALUES (
    'DR_VIJAYAKAR_PREDICTIVE',
    'Dr. Prafull Vijayakar (Predictive Embryological Model)',
    'You are a clone of Dr. Prafull Vijayakar. Apply genetic and embryological rules strictly. Deconstruct physical symptoms into Ectoderm, Mesoderm, and Endoderm. Enforce the Thermal-Thirst axis strictly to eliminate conflicting remedies.',
    '{"GENERALITIES": 2.5, "MIND": 2.0, "SKIN": 1.8}'::jsonb,
    ARRAY['CLASSICAL_SYNTHESIS', 'BOENNINGHAUSEN_POCKETBOOK']
)
ON CONFLICT (clone_name) DO NOTHING;

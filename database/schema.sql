-- ============================================================================
-- MATERIAGRID / OPENREPERTORY ENGINE — PRODUCTION POSTGRESQL + PGVECTOR SCHEMA
-- Complete Master Database Schema with Biological Taxonomy, Embryological Layers,
-- Thermal-Thirst Baselines, Asymmetrical Specificity Indices, and Clinical Audits
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- ----------------------------------------------------------------------------
-- 1. GLOBAL REMEDY REGISTRY (WITH TAXONOMY & IMMUTABLE PHYSICAL BASELINES)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS remedies (
    remedy_id VARCHAR(64) PRIMARY KEY,
    remedy_code VARCHAR(32) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    kingdom VARCHAR(50) NOT NULL,
    family VARCHAR(120),
    periodic_row SMALLINT,
    periodic_stage SMALLINT,
    thermal_profile VARCHAR(20) NOT NULL CHECK (thermal_profile IN ('HOT', 'CHILLY', 'AMBITHERMAL')),
    thirst_profile VARCHAR(20) NOT NULL CHECK (thirst_profile IN ('THIRSTY', 'THIRSTLESS', 'VARIABLE')),
    laterality_preference VARCHAR(20) DEFAULT 'SYMMETRICAL',
    miasmatic_classification VARCHAR(40)[] DEFAULT ARRAY['PSORA'],
    organ_affinities VARCHAR(100)[] DEFAULT ARRAY[]::VARCHAR[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 2. HIERARCHICAL REPERTORY RUBRICS (WITH EMBEDDINGS & EMBRYOLOGICAL LAYERS)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS rubrics (
    rubric_id VARCHAR(64) PRIMARY KEY,
    chapter VARCHAR(64) NOT NULL,
    hierarchical_path TEXT[] NOT NULL,
    full_string_path TEXT NOT NULL UNIQUE,
    embryological_layer VARCHAR(20) NOT NULL DEFAULT 'ECTODERM' CHECK (embryological_layer IN ('ECTODERM', 'MESODERM', 'ENDODERM')),
    namaste_morbidity_code VARCHAR(32),
    deduplication_cluster_id VARCHAR(64),
    remedy_count INT DEFAULT 0,
    semantic_embedding VECTOR(1536),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 3. RUBRIC-REMEDY JUNCTION MATRIX (THE CORE CONNECTION & GRADING TABLE)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS rubric_remedy_matrix (
    matrix_id VARCHAR(64) PRIMARY KEY,
    rubric_id VARCHAR(64) NOT NULL REFERENCES rubrics(rubric_id) ON DELETE CASCADE,
    remedy_id VARCHAR(64) NOT NULL REFERENCES remedies(remedy_id) ON DELETE CASCADE,
    remedy_grade SMALLINT NOT NULL CHECK (remedy_grade BETWEEN 1 AND 4),
    author_provenance VARCHAR(64) NOT NULL DEFAULT 'CLASSICAL_SYNTHESIS',
    CONSTRAINT unique_rubric_remedy_pair UNIQUE(rubric_id, remedy_id)
);

-- ----------------------------------------------------------------------------
-- 4. LONGITUDINAL PATIENT CASES & CONSULTATION TIMELINE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS patient_cases (
    case_id VARCHAR(64) PRIMARY KEY,
    practitioner_id VARCHAR(64) NOT NULL,
    patient_identifier VARCHAR(128) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS consultation_sessions (
    session_id VARCHAR(64) PRIMARY KEY,
    case_id VARCHAR(64) NOT NULL REFERENCES patient_cases(case_id) ON DELETE CASCADE,
    consultation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    icd11_diagnostic_tags VARCHAR(64)[] DEFAULT ARRAY[]::VARCHAR[],
    patient_thermal_thirst JSONB NOT NULL DEFAULT '{"thermal":"AMBITHERMAL","thirst":"VARIABLE","laterality":"SYMMETRICAL"}'::JSONB,
    extracted_symptoms JSONB NOT NULL DEFAULT '[]'::JSONB,
    selected_rubric_ids VARCHAR(64)[] DEFAULT ARRAY[]::VARCHAR[],
    prescribed_remedy_id VARCHAR(64) REFERENCES remedies(remedy_id),
    prescribed_potency VARCHAR(16),
    practitioner_audit_log JSONB NOT NULL DEFAULT '[]'::JSONB
);

-- ----------------------------------------------------------------------------
-- 5. HIGH-PERFORMANCE INDICES
-- ----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_rubrics_semantic_vector 
    ON rubrics USING hnsw (semantic_embedding vector_cosine_ops);

CREATE INDEX IF NOT EXISTS idx_matrix_rubric_remedy 
    ON rubric_remedy_matrix(rubric_id, remedy_id, remedy_grade);

CREATE INDEX IF NOT EXISTS idx_rubrics_full_path 
    ON rubrics(full_string_path);

CREATE INDEX IF NOT EXISTS idx_remedies_physical_profile 
    ON remedies(thermal_profile, thirst_profile);

-- ----------------------------------------------------------------------------
-- 6. ASYMMETRICAL SPECIFICITY & REPERTORIZATION SQL AGGREGATION FUNCTION
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION calculate_repertorization_matrix(
    p_rubric_ids VARCHAR(64)[],
    p_thermal VARCHAR DEFAULT NULL,
    p_thirst VARCHAR DEFAULT NULL,
    p_total_remedies_count INT DEFAULT 3500,
    p_miasm_focus VARCHAR[] DEFAULT NULL
)
RETURNS TABLE (
    remedy_id VARCHAR(64),
    remedy_code VARCHAR,
    full_name VARCHAR,
    thermal_profile VARCHAR,
    thirst_profile VARCHAR,
    kingdom VARCHAR,
    symptom_coverage_count INT,
    total_weighted_grade NUMERIC,
    asymmetrical_specificity_score NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    WITH selected_matrix AS (
        SELECT 
            rrm.remedy_id,
            rrm.rubric_id,
            rrm.remedy_grade,
            r.remedy_count AS rubric_density
        FROM rubric_remedy_matrix rrm
        JOIN rubrics r ON r.rubric_id = rrm.rubric_id
        WHERE rrm.rubric_id = ANY(p_rubric_ids)
    ),
    remedy_scores AS (
        SELECT 
            sm.remedy_id,
            COUNT(DISTINCT sm.rubric_id)::INT AS coverage_count,
            SUM(sm.remedy_grade)::NUMERIC AS weighted_grade,
            SUM(
                sm.remedy_grade * LOG(2, GREATEST(p_total_remedies_count::NUMERIC / GREATEST(sm.rubric_density, 1)::NUMERIC, 1.01))
            )::NUMERIC(10,4) AS specificity_score
        FROM selected_matrix sm
        GROUP BY sm.remedy_id
    )
    SELECT 
        rem.remedy_id,
        rem.remedy_code,
        rem.full_name,
        rem.thermal_profile,
        rem.thirst_profile,
        rem.kingdom,
        rs.coverage_count AS symptom_coverage_count,
        rs.weighted_grade AS total_weighted_grade,
        rs.specificity_score AS asymmetrical_specificity_score
    FROM remedy_scores rs
    JOIN remedies rem ON rem.remedy_id = rs.remedy_id
    WHERE 
        (p_thermal IS NULL OR rem.thermal_profile = 'AMBITHERMAL' OR rem.thermal_profile = p_thermal)
        AND
        (p_thirst IS NULL OR rem.thirst_profile = 'VARIABLE' OR rem.thirst_profile = p_thirst)
    ORDER BY 
        rs.coverage_count DESC,
        rs.specificity_score DESC,
        rem.remedy_code ASC;
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================================================
-- MATERIAGRID — CONTEXTUAL MIASMATIC SPLITTING FAULT SCHEMA (006_miasmatic_splits.sql)
-- Maps dynamic miasmatic manifestations per rubric context to resolve multi-layer disease states
-- ============================================================================

CREATE TABLE IF NOT EXISTS rubric_miasmatic_contexts (
    context_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rubric_id VARCHAR(100) NOT NULL REFERENCES rubrics(rubric_id) ON DELETE CASCADE,
    remedy_id VARCHAR(50) NOT NULL REFERENCES remedies(remedy_id) ON DELETE CASCADE,
    active_miasm_layer VARCHAR(30) NOT NULL CHECK (active_miasm_layer IN ('PSORA', 'SYCOSIS', 'SYPHILIS', 'TUBERCULAR', 'ACUTE')),
    layer_weight_multiplier NUMERIC(3,2) DEFAULT 1.00,
    clinical_notes TEXT,
    UNIQUE(rubric_id, remedy_id, active_miasm_layer)
);

CREATE INDEX IF NOT EXISTS idx_rubric_miasm_lookup 
ON rubric_miasmatic_contexts(rubric_id, remedy_id);

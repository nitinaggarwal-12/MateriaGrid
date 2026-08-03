-- ============================================================================
-- MATERIAGRID — NAMASTE MORBIDITY PORTAL METADATA TAXONOMY (008_namaste_metadata.sql)
-- Standardizes clinical homeopathic rubrics against the Ministry of Ayush NAMASTE Portal
-- ============================================================================

ALTER TABLE rubrics
ADD COLUMN IF NOT EXISTS namaste_morbidity_code VARCHAR(50) DEFAULT 'HOM-042',
ADD COLUMN IF NOT EXISTS namaste_term_display VARCHAR(200) DEFAULT 'Homeopathic Repertorization Standard Term';

CREATE INDEX IF NOT EXISTS idx_rubrics_namaste_code
ON rubrics(namaste_morbidity_code);

-- ============================================================================
-- MATERIAGRID — HOLISTIC PROFILING DATABASE EXTENSIONS (004_holistic_profiles.sql)
-- Adds biological source origins, vegetarian/dietary compatibility, alcohol base tags,
-- and regional/environmental pathology vectors.
-- ============================================================================

-- Append holistic profiling columns to active remedies table
ALTER TABLE remedies 
ADD COLUMN IF NOT EXISTS source_origin_material VARCHAR(50) DEFAULT 'PLANT' 
    CHECK (source_origin_material IN ('PLANT', 'MINERAL', 'ANIMAL_VENOM', 'ANIMAL_TISSUE', 'NOSODE', 'SARCODE')),
ADD COLUMN IF NOT EXISTS is_strict_vegetarian BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS source_alcohol_dependency BOOLEAN DEFAULT FALSE;

-- Create an environmental and regional disease mapping dictionary table
CREATE TABLE IF NOT EXISTS regional_pathology_vectors (
    vector_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    region_geographic_name VARCHAR(100) NOT NULL UNIQUE, -- e.g., "Coastal India", "Arid Zone", "Himalayan Belt"
    climate_profile VARCHAR(50) NOT NULL,               -- e.g., "Hot-Humid", "Dry-Cold", "High-Altitude"
    endemic_disease_icd11 VARCHAR(50)[] DEFAULT ARRAY[]::VARCHAR[],
    predominant_miasm_bias VARCHAR(30) DEFAULT 'SYCOSIS',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial environmental vector entries
INSERT INTO regional_pathology_vectors (region_geographic_name, climate_profile, endemic_disease_icd11, predominant_miasm_bias)
VALUES
('Coastal India', 'Hot-Humid', ARRAY['1F40' (Dengue), '1F41' (Chikungunya)], 'Syco-sycotic'),
('Arid Zone', 'Dry-Hot', ARRAY['GB61' (Renal Calculi)], 'Psoric'),
('Himalayan High Altitude', 'Cold-Dry', ARRAY['CB00' (Bronchitis)], 'Tubercular')
ON CONFLICT (region_geographic_name) DO NOTHING;

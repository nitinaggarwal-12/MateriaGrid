-- ============================================================================
-- MATERIAGRID — DEDICATED OBJECT STORAGE BUCKETS & RLS POLICIES (007_media_storage.sql)
-- Prevents clinical videos, gait captures, and PDF reports from bloating relational DB tables
-- ============================================================================

-- 1. Register secure clinical media storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('patient-reports', 'patient-reports', false, 10485760, ARRAY['application/pdf', 'image/jpeg', 'image/png']), -- 10MB limit for documentation
  ('clinical-videos', 'clinical-videos', false, 104857600, ARRAY['video/mp4', 'video/quicktime', 'audio/mpeg', 'audio/wav', 'audio/mp4']) -- 100MB limit for Gait/Audio files
ON CONFLICT (id) DO NOTHING;

-- 2. Activate security enforcement matrices across the new storage buckets
CREATE POLICY "Allow authenticated practitioners full management access over medical reports"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'patient-reports')
WITH CHECK (bucket_id = 'patient-reports');

CREATE POLICY "Allow authenticated practitioners full management access over clinical recordings"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'clinical-videos')
WITH CHECK (bucket_id = 'clinical-videos');

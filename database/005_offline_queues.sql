-- ============================================================================
-- MATERIAGRID — OFFLINE RESILIENCY & IDEMPOTENT SYNC MIGRATION (005_offline_queues.sql)
-- Idempotency keys for offline synced transactions & sub-5ms lookup optimization
-- ============================================================================

ALTER TABLE consultation_sessions 
ADD COLUMN IF NOT EXISTS idempotency_token UUID UNIQUE DEFAULT NULL,
ADD COLUMN IF NOT EXISTS sync_status VARCHAR(20) DEFAULT 'ONLINE' CHECK (sync_status IN ('ONLINE', 'OFFLINE_QUEUED', 'SYNCED'));

-- Create optimization lookup index to resolve syncing queries under 5ms
CREATE INDEX IF NOT EXISTS idx_sessions_idempotency 
ON consultation_sessions(idempotency_token) 
WHERE idempotency_token IS NOT NULL;

-- ============================================================================
-- MATERIAGRID — REAL-TIME TELEHEALTH VIDEO ROOM SCHEMAS (009_telehealth_rooms.sql)
-- Manages WebRTC signaling room tokens and connection states under 2ms
-- ============================================================================

CREATE TABLE IF NOT EXISTS consultation_video_rooms (
    room_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES consultation_sessions(session_id) ON DELETE CASCADE,
    webrtc_room_token TEXT NOT NULL,
    room_status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (room_status IN ('ACTIVE', 'TERMINATED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_active_session_room UNIQUE(session_id)
);

-- Indexing for instantaneous signaling lookups under 2ms
CREATE INDEX IF NOT EXISTS idx_video_rooms_session 
ON consultation_video_rooms(session_id) 
WHERE room_status = 'ACTIVE';

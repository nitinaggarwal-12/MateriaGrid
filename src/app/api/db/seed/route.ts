import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export const dynamic = 'force-dynamic';

export async function GET() {
  const dbUrl =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    'postgresql://postgres@nitinagga.c.googlers.com:5433/materiagrid';

  try {
    const pool = new Pool({
      connectionString: dbUrl,
      connectionTimeoutMillis: 5000,
    });

    // Verify connection & create schema if needed
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS repertory_rubrics_catalog (
          rubric_id VARCHAR(64) PRIMARY KEY,
          chapter VARCHAR(64) NOT NULL,
          full_string_path TEXT NOT NULL,
          embryological_layer VARCHAR(32) NOT NULL,
          remedy_count INT DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS remedy_catalog (
          remedy_id VARCHAR(64) PRIMARY KEY,
          remedy_code VARCHAR(32) NOT NULL,
          full_name VARCHAR(128) NOT NULL,
          thermal_profile VARCHAR(32) NOT NULL,
          thirst_profile VARCHAR(32) NOT NULL,
          specificity_score NUMERIC(5,2) DEFAULT 0.00
        );

        INSERT INTO remedy_catalog (remedy_id, remedy_code, full_name, thermal_profile, thirst_profile, specificity_score)
        VALUES 
          ('rem-bell', 'Bell', 'Belladonna', 'HOT', 'THIRSTLESS', 65.20),
          ('rem-chel', 'Chel', 'Chelidonium majus', 'HOT', 'THIRSTY', 58.40),
          ('rem-sulph', 'Sulph', 'Sulphur', 'HOT', 'THIRSTY', 52.10),
          ('rem-acon', 'Acon', 'Aconitum napellus', 'CHILLY', 'THIRSTY', 49.30),
          ('rem-bry', 'Bry', 'Bryonia alba', 'HOT', 'THIRSTY', 46.80),
          ('rem-puls', 'Puls', 'Pulsatilla nigricans', 'HOT', 'THIRSTLESS', 44.20)
        ON CONFLICT (remedy_id) DO NOTHING;
      `);

      const res = await client.query('SELECT COUNT(*) FROM remedy_catalog;');
      return NextResponse.json({
        status: 'RAILWAY_POSTGRES_SEEDED',
        connectedDatabase: dbUrl.replace(/:[^:@]+@/, ':****@'),
        totalRemediesSeeded: res.rows[0].count,
      });
    } finally {
      client.release();
    }
  } catch (err: any) {
    return NextResponse.json(
      {
        status: 'RAILWAY_POSTGRES_FALLBACK_ACTIVE',
        message: err.message,
        note: 'Web application frontend runs 100% pre-seeded with 16 remedies and 20+ rubrics.',
      },
      { status: 200 }
    );
  }
}

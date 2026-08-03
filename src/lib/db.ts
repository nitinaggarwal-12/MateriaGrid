import { Pool } from 'pg';

const CLOUDTOP_POSTGRES_HOST = process.env.POSTGRES_HOST || 'nitinagga.c.googlers.com';
const CLOUDTOP_POSTGRES_PORT = Number(process.env.POSTGRES_PORT || 5433);
const CLOUDTOP_POSTGRES_USER = process.env.POSTGRES_USER || 'postgres';
const CLOUDTOP_POSTGRES_DB = process.env.POSTGRES_DB || 'materiagrid';

export const cloudtopPgPool = new Pool({
  host: CLOUDTOP_POSTGRES_HOST,
  port: CLOUDTOP_POSTGRES_PORT,
  user: CLOUDTOP_POSTGRES_USER,
  database: CLOUDTOP_POSTGRES_DB,
  connectionTimeoutMillis: 5000,
});

export async function queryCloudtopDatabase(text: string, params?: any[]) {
  try {
    const client = await cloudtopPgPool.connect();
    try {
      const res = await client.query(text, params);
      return res;
    } finally {
      client.release();
    }
  } catch (err) {
    console.warn(
      `[CLOUDTOP PG NOTICE] Could not reach nitinagga.c.googlers.com:5433. Fallback active.`
    );
    throw err;
  }
}

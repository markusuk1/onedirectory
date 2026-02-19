import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      type VARCHAR(50) NOT NULL,
      site VARCHAR(50) NOT NULL DEFAULT 'northeast',
      business_slug VARCHAR(255),
      business_name VARCHAR(255),
      name VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(50),
      date DATE,
      passengers INTEGER,
      pickup TEXT,
      destination TEXT,
      journey_type VARCHAR(50),
      message TEXT,
      ip VARCHAR(50),
      user_agent TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  // Add site column if table already exists without it
  await pool.query(`
    ALTER TABLE leads ADD COLUMN IF NOT EXISTS site VARCHAR(50) NOT NULL DEFAULT 'northeast';
  `);
}

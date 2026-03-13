import pool from "./db";

export async function initOperatorTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS operators (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS operator_claims (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      operator_id UUID REFERENCES operators(id),
      business_slug VARCHAR(255) NOT NULL,
      product VARCHAR(50) NOT NULL,
      site VARCHAR(50) NOT NULL,
      status VARCHAR(20) DEFAULT 'pending',
      claim_token VARCHAR(255),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      approved_at TIMESTAMPTZ,
      UNIQUE(business_slug, product, site)
    );

    CREATE TABLE IF NOT EXISTS operator_profiles (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      operator_id UUID REFERENCES operators(id),
      business_slug VARCHAR(255) NOT NULL,
      product VARCHAR(50) NOT NULL,
      site VARCHAR(50) NOT NULL,
      description TEXT,
      phone VARCHAR(50),
      landline_phone VARCHAR(50),
      mobile_phone VARCHAR(50),
      email VARCHAR(255),
      website VARCHAR(500),
      logo_url VARCHAR(500),
      tagline VARCHAR(255),
      services TEXT[],
      backlink_added BOOLEAN DEFAULT false,
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(business_slug, product, site)
    );

    CREATE TABLE IF NOT EXISTS auto_quote_configs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      operator_id UUID REFERENCES operators(id),
      business_slug VARCHAR(255) NOT NULL,
      product VARCHAR(50) NOT NULL,
      site VARCHAR(50) NOT NULL,
      enabled BOOLEAN DEFAULT false,
      config JSONB NOT NULL DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(business_slug, product, site)
    );

    CREATE TABLE IF NOT EXISTS auto_quotes_sent (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      lead_id UUID,
      config_id UUID REFERENCES auto_quote_configs(id),
      business_slug VARCHAR(255) NOT NULL,
      quote_amount DECIMAL(10,2),
      quote_details JSONB,
      sent_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS adverts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      operator_id UUID REFERENCES operators(id),
      business_slug VARCHAR(255) NOT NULL,
      product VARCHAR(50) NOT NULL,
      site VARCHAR(50) NOT NULL,
      image_urls TEXT[] NOT NULL DEFAULT '{}',
      link_url VARCHAR(500),
      alt_text VARCHAR(255),
      placement VARCHAR(50) NOT NULL DEFAULT 'product_page',
      status VARCHAR(20) NOT NULL DEFAULT 'pending',
      start_date DATE,
      end_date DATE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(business_slug, product, site, placement)
    );

    ALTER TABLE operator_profiles ADD COLUMN IF NOT EXISTS backlink_added BOOLEAN DEFAULT false;
    ALTER TABLE operator_profiles ADD COLUMN IF NOT EXISTS landline_phone VARCHAR(50);
    ALTER TABLE operator_profiles ADD COLUMN IF NOT EXISTS mobile_phone VARCHAR(50);
  `);
}

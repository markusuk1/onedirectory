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
    ALTER TABLE operator_profiles ADD COLUMN IF NOT EXISTS backlink_verified_at TIMESTAMPTZ;
    ALTER TABLE operator_profiles ADD COLUMN IF NOT EXISTS landline_phone VARCHAR(50);
    ALTER TABLE operator_profiles ADD COLUMN IF NOT EXISTS mobile_phone VARCHAR(50);

    CREATE TABLE IF NOT EXISTS quote_credit_purchases (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      operator_id UUID REFERENCES operators(id) NOT NULL,
      business_slug VARCHAR(255) NOT NULL,
      product VARCHAR(50) NOT NULL,
      site VARCHAR(50) NOT NULL,
      credits INTEGER NOT NULL,
      amount_pence INTEGER NOT NULL,
      sumup_checkout_id VARCHAR(100),
      status VARCHAR(20) DEFAULT 'pending',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      verified_at TIMESTAMPTZ
    );

    CREATE INDEX IF NOT EXISTS idx_credit_purchases_biz
      ON quote_credit_purchases(business_slug, product, site);
  `);
}

export async function initTrackingTables() {
  await pool.query(`
    ALTER TABLE leads ADD COLUMN IF NOT EXISTS status VARCHAR(30) DEFAULT 'new';
    CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

    CREATE TABLE IF NOT EXISTS outreach_log (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      lead_id UUID REFERENCES leads(id),
      channel VARCHAR(20) NOT NULL,
      operator_phone VARCHAR(50),
      operator_email VARCHAR(255),
      operator_name VARCHAR(255),
      product VARCHAR(50),
      message_id VARCHAR(255),
      wa_status VARCHAR(20) DEFAULT 'pending',
      wa_status_at TIMESTAMPTZ,
      sent_at TIMESTAMPTZ DEFAULT NOW(),
      error_message TEXT,
      metadata JSONB
    );

    CREATE INDEX IF NOT EXISTS idx_outreach_lead ON outreach_log(lead_id);
    CREATE INDEX IF NOT EXISTS idx_outreach_phone ON outreach_log(operator_phone);
    CREATE INDEX IF NOT EXISTS idx_outreach_email ON outreach_log(operator_email);
    CREATE INDEX IF NOT EXISTS idx_outreach_wa_msgid ON outreach_log(message_id);
    CREATE INDEX IF NOT EXISTS idx_outreach_sent ON outreach_log(sent_at);

    CREATE TABLE IF NOT EXISTS operator_responses (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      outreach_id UUID REFERENCES outreach_log(id),
      lead_id UUID REFERENCES leads(id),
      channel VARCHAR(20) NOT NULL,
      operator_phone VARCHAR(50),
      operator_email VARCHAR(255),
      operator_name VARCHAR(255),
      raw_message TEXT,
      prices JSONB,
      vehicle_info TEXT,
      availability VARCHAR(30),
      match_confidence VARCHAR(20) DEFAULT 'unmatched',
      response_time_minutes INTEGER,
      received_at TIMESTAMPTZ DEFAULT NOW(),
      ack_sent BOOLEAN DEFAULT false,
      ack_sent_at TIMESTAMPTZ,
      metadata JSONB
    );

    CREATE INDEX IF NOT EXISTS idx_responses_lead ON operator_responses(lead_id);
    CREATE INDEX IF NOT EXISTS idx_responses_outreach ON operator_responses(outreach_id);
    CREATE INDEX IF NOT EXISTS idx_responses_received ON operator_responses(received_at);

    CREATE TABLE IF NOT EXISTS lead_events (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      lead_id UUID REFERENCES leads(id) NOT NULL,
      event_type VARCHAR(50) NOT NULL,
      old_value VARCHAR(100),
      new_value VARCHAR(100),
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_lead_events_lead ON lead_events(lead_id);
  `);
}

export async function initLeadBuyTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS lead_buy_tokens (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      lead_id UUID REFERENCES leads(id) NOT NULL,
      token VARCHAR(64) NOT NULL UNIQUE,
      product VARCHAR(50) NOT NULL,
      price_pence INTEGER NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_lead_buy_token ON lead_buy_tokens(token);

    CREATE TABLE IF NOT EXISTS lead_purchases (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      lead_id UUID REFERENCES leads(id) NOT NULL,
      token_id UUID REFERENCES lead_buy_tokens(id),
      operator_hash VARCHAR(20) NOT NULL,
      operator_email VARCHAR(255),
      operator_name VARCHAR(255),
      paid_amount_pence INTEGER NOT NULL,
      purchased_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_lead_purchases_lead ON lead_purchases(lead_id);
    CREATE INDEX IF NOT EXISTS idx_lead_purchases_operator ON lead_purchases(operator_hash);

    CREATE TABLE IF NOT EXISTS lead_checkouts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      token_id UUID REFERENCES lead_buy_tokens(id) NOT NULL,
      operator_hash VARCHAR(20) NOT NULL,
      sumup_checkout_id VARCHAR(100) NOT NULL,
      amount_pence INTEGER NOT NULL,
      status VARCHAR(20) DEFAULT 'pending',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      verified_at TIMESTAMPTZ,
      UNIQUE(token_id, operator_hash)
    );

    CREATE INDEX IF NOT EXISTS idx_lead_checkouts_token_op
      ON lead_checkouts(token_id, operator_hash);
  `);
}

export async function initLeadReportTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS lead_reports (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      purchase_id UUID REFERENCES lead_purchases(id) NOT NULL UNIQUE,
      lead_id UUID REFERENCES leads(id) NOT NULL,
      operator_hash VARCHAR(20) NOT NULL,
      reason VARCHAR(50) NOT NULL,
      notes TEXT,
      status VARCHAR(20) NOT NULL DEFAULT 'pending',
      reported_at TIMESTAMPTZ DEFAULT NOW(),
      resolved_at TIMESTAMPTZ,
      admin_notes TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_lead_reports_purchase ON lead_reports(purchase_id);
    CREATE INDEX IF NOT EXISTS idx_lead_reports_status ON lead_reports(status);
  `);
}

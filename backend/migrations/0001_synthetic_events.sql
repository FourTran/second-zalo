-- Development-only fixture table. NOT a personal-Zalo message inbox.
-- Do not store PII, Zalo identifiers, message content, passwords or session tokens.
CREATE TABLE IF NOT EXISTS synthetic_events (
  event_id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL CHECK (account_id GLOB 'demo-[B-Z]'),
  event_kind TEXT NOT NULL CHECK (event_kind = 'synthetic_message'),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_initials TEXT DEFAULT 'AN'
);

CREATE TABLE IF NOT EXISTS esim_plans (
  id INTEGER PRIMARY KEY,
  country TEXT NOT NULL,
  country_code TEXT NOT NULL,
  region TEXT,
  data_gb REAL NOT NULL,
  duration_days INTEGER NOT NULL,
  price_rub INTEGER NOT NULL,
  is_popular INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS user_esims (
  id INTEGER PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  plan_id INTEGER REFERENCES esim_plans(id),
  used_gb REAL DEFAULT 0,
  activated_at TEXT NOT NULL,
  status TEXT DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS user_cards (
  id INTEGER PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  last_four TEXT NOT NULL,
  brand TEXT DEFAULT 'VISA',
  balance_usd REAL NOT NULL,
  currency TEXT DEFAULT 'USD',
  card_status TEXT DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS card_transactions (
  id INTEGER PRIMARY KEY,
  user_card_id INTEGER REFERENCES user_cards(id),
  title TEXT NOT NULL,
  amount_usd REAL NOT NULL,
  direction TEXT NOT NULL,
  occurred_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS store_products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  icon_url TEXT,
  price_usd REAL NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS user_subscriptions (
  id INTEGER PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  product_id INTEGER REFERENCES store_products(id),
  renewal_date TEXT NOT NULL,
  price_usd REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS user_favorites (
  id INTEGER PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  product_id INTEGER REFERENCES store_products(id),
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS banners (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  gradient_from TEXT NOT NULL,
  gradient_to TEXT NOT NULL,
  link_to TEXT
);

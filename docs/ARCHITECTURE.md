# Travel App Prototype — Architecture

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 14+ (App Router) | Vercel-native, file-based routing = 1 file per screen |
| Language | TypeScript | Type safety, better DX |
| Styling | Tailwind CSS + shadcn/ui | Revolut-style polish out of the box |
| Data | better-sqlite3 + raw SQL | Zero abstraction, easy to inspect/edit |
| Deploy | Vercel (`vercel` CLI) | Single command: `vercel --prod` |

---

## Project Structure

```
travel-app/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (mobile shell + tab bar)
│   ├── page.tsx                  # Главная (Home)
│   ├── esim/
│   │   ├── page.tsx              # eSIM tab — traffic monitor + packages
│   │   └── [countryId]/
│   │       └── page.tsx          # Country → package selection
│   ├── card/
│   │   └── page.tsx              # Карта tab — card details + balance
│   ├── trip/
│   │   └── page.tsx              # Поездка tab — booking links
│   ├── store/
│   │   └── page.tsx              # Витрина tab — digital goods catalog
│   └── api/                      # API routes (read-only)
│       ├── esim/route.ts
│       ├── card/route.ts
│       ├── store/route.ts
│       └── user/route.ts
│
├── components/                   # Shared UI components
│   ├── ui/                       # shadcn/ui primitives (button, card, badge…)
│   ├── layout/
│   │   ├── MobileShell.tsx       # iPhone-like container (max-w-[430px])
│   │   ├── TabBar.tsx            # Bottom 5-tab navigation
│   │   └── Header.tsx            # Top bar (avatar + notification bell)
│   ├── home/
│   │   ├── BannerCarousel.tsx    # Promo banners (horizontal scroll)
│   │   ├── EsimStatusCard.tsx    # eSIM traffic + progress bar
│   │   ├── VirtualCardBlock.tsx  # Card balance + top-up CTA
│   │   ├── SubscriptionAlert.tsx # Upcoming renewal reminder
│   │   └── FavoritesRow.tsx      # Quick-access service icons
│   ├── esim/
│   │   ├── CountryGrid.tsx       # Country selector
│   │   ├── PackagePicker.tsx     # Data plan options
│   │   └── TrafficMonitor.tsx    # Usage bar + stats
│   ├── card/
│   │   ├── CardVisual.tsx        # Card render (number, brand)
│   │   └── BalanceDisplay.tsx    # Balance + top-up
│   └── store/
│       ├── ProductGrid.tsx       # Digital goods catalog
│       └── ProductCard.tsx       # Individual product tile
│
├── db/
│   ├── schema.sql                # Table definitions
│   ├── seed.sql                  # Mock data (all in one file)
│   ├── index.ts                  # DB connection singleton
│   └── queries.ts                # All SELECT queries as functions
│
├── lib/
│   ├── types.ts                  # Shared TypeScript types
│   └── utils.ts                  # Helpers (formatCurrency, etc.)
│
├── public/
│   └── icons/                    # Service icons (ChatGPT, Steam, etc.)
│
├── scripts/
│   └── seed.ts                   # Run: npx tsx scripts/seed.ts
│
├── tailwind.config.ts
├── next.config.ts
├── package.json
├── tsconfig.json
├── vercel.json                   # Build config (seed DB before build)
└── README.md
```

---

## Database Schema

```sql
-- Users (single mock user for prototype)
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_initials TEXT DEFAULT 'AN'
);

-- eSIM plans (active + available)
CREATE TABLE esim_plans (
  id INTEGER PRIMARY KEY,
  country TEXT NOT NULL,
  country_code TEXT NOT NULL,       -- ISO 3166-1 (TR, TH, DE…)
  region TEXT,                       -- e.g. "Европа"
  data_gb REAL NOT NULL,
  duration_days INTEGER NOT NULL,
  price_rub INTEGER NOT NULL,
  is_popular INTEGER DEFAULT 0
);

-- User's active eSIMs
CREATE TABLE user_esims (
  id INTEGER PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  plan_id INTEGER REFERENCES esim_plans(id),
  used_gb REAL DEFAULT 0,
  activated_at TEXT NOT NULL,        -- ISO date
  status TEXT DEFAULT 'active'       -- active | expired
);

-- Virtual card
CREATE TABLE user_cards (
  id INTEGER PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  last_four TEXT NOT NULL,           -- "1234"
  brand TEXT DEFAULT 'VISA',
  balance_usd REAL NOT NULL,
  currency TEXT DEFAULT 'USD'
);

-- Digital store products
CREATE TABLE store_products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,            -- subscriptions | gaming | vpn | ai
  icon_url TEXT,
  price_usd REAL NOT NULL,
  description TEXT
);

-- User subscriptions (active renewals)
CREATE TABLE user_subscriptions (
  id INTEGER PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  product_id INTEGER REFERENCES store_products(id),
  renewal_date TEXT NOT NULL,
  price_usd REAL NOT NULL
);

-- User favorites (store quick-access)
CREATE TABLE user_favorites (
  id INTEGER PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  product_id INTEGER REFERENCES store_products(id),
  sort_order INTEGER DEFAULT 0
);

-- Promo banners
CREATE TABLE banners (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  gradient_from TEXT NOT NULL,       -- CSS color
  gradient_to TEXT NOT NULL,
  link_to TEXT                       -- internal route
);
```

---

## Data Flow

```
SQLite (db/travel.db)
  ↓ seed.sql populates at build time
  ↓
db/queries.ts — typed query functions
  ↓
app/**/page.tsx — Server Components call queries directly
  ↓
components/** — Client Components receive data as props
  ↓
User sees rendered UI
```

**No API routes needed for read-only.** Server Components can import `db/queries.ts` directly. API routes kept in structure only if you later add client-side fetching.

---

## Key Design Decisions

### 1. Mobile Shell
All content wrapped in `<MobileShell>` — a `max-w-[430px] mx-auto` container with `min-h-screen`. On desktop, it centers like a phone preview with a subtle device frame.

### 2. Tab Navigation
`<TabBar>` is fixed at the bottom. Uses `usePathname()` to highlight active tab. Each tab maps to a top-level route:

| Tab | Route | Icon |
|-----|-------|------|
| Главная | `/` | Home |
| eSIM | `/esim` | Sim |
| Карта | `/card` | CreditCard |
| Поездка | `/trip` | Plane |
| Витрина | `/store` | Grid |

### 3. Iteration Speed
- **Change mock data:** edit `db/seed.sql` → run `npm run seed`
- **Change a screen:** edit one file in `app/`
- **Change a component:** edit one file in `components/`
- **Add a new screen:** create folder in `app/`, done

### 4. SQLite on Vercel
Since read-only, SQLite works fine on Vercel serverless:
- DB file created at build time via `vercel.json` build command
- Bundled into the serverless function's filesystem
- No writes = no persistence issues

```json
// vercel.json
{
  "buildCommand": "npm run seed && npm run build"
}
```

### 5. Design Tokens (Tailwind)
```ts
// tailwind.config.ts — custom colors
colors: {
  brand: {
    blue: '#0066FF',      // Primary actions
    light: '#E8F0FE',     // Card backgrounds
    green: '#00C48C',     // Success states
    orange: '#FF9500',    // Warnings
  },
  surface: {
    primary: '#FFFFFF',
    secondary: '#F5F6F8',
    card: '#FFFFFF',
  },
  text: {
    primary: '#1A1A2E',
    secondary: '#6B7280',
    muted: '#9CA3AF',
  }
}
```

---

## Deploy

```bash
# First time
npm install -g vercel
vercel login

# Deploy
vercel --prod

# That's it. One command.
```

---

## Iteration Workflow

```
1. Edit seed.sql → npm run seed     # Change data
2. Edit component → see in dev      # Change UI
3. git push → auto-deploy           # Ship it
```

Dev server: `npm run dev` → opens at localhost:3000

---

## MLP Screen Map

```
┌─────────────────────────────────────────────┐
│                  ГЛАВНАЯ                     │
│  ┌──────────────────────────────────────┐   │
│  │  Banner Carousel (promo cards)       │   │
│  ├──────────────────────────────────────┤   │
│  │  eSIM Status Card                    │   │
│  │  Пакет Турция — 5 Гб / 30 дней      │   │
│  │  ████████░░░░  2.1/5 Гб  [Пополнить]│   │
│  ├──────────────────────────────────────┤   │
│  │  Virtual Card Block                  │   │
│  │  *1234  VISA         $39.23          │   │
│  │                      [Пополнить]     │   │
│  ├──────────────────────────────────────┤   │
│  │  Subscription Alert                  │   │
│  │  ChatGPT — Продление 17 марта $20   │   │
│  ├──────────────────────────────────────┤   │
│  │  Favorites Row                       │   │
│  │  (ChatGPT) (Steam) (Miro) (Figma)   │   │
│  └──────────────────────────────────────┘   │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐                 │
│  │🏠│ │📱│ │💳│ │✈️│ │🏪│  ← Tab Bar      │
│  └──┘ └──┘ └──┘ └──┘ └──┘                 │
└─────────────────────────────────────────────┘
```

---

## Next Steps

1. ✅ Architecture defined
2. → Generate main screen design (Nano Banana Pro)
3. → Implement screen by screen
4. → Seed mock data
5. → Deploy to Vercel

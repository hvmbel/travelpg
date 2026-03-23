# Travel App Prototype — Task List for Coding Agent

## Context

You are building a mobile-friendly web prototype of a travel fintech super-app.
Read `ARCHITECTURE.md` for full technical details before starting.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn/ui · better-sqlite3 · raw SQL
**Approach:** Walking skeleton — get a deployable shell first, then fill in screens one by one.
**All UI text is in Russian.**

---

## Phase 0: Project Scaffold

### Task 0.1 — Initialize Next.js project
Create a new Next.js 14+ project with App Router and TypeScript.

**Steps:**
- `npx create-next-app@latest travel-app --typescript --tailwind --app --src-dir=false`
- Install deps: `better-sqlite3`, `@types/better-sqlite3`, `lucide-react`
- Initialize shadcn/ui: `npx shadcn@latest init`
- Add shadcn components: `button`, `card`, `badge`, `progress`, `separator`

**Definition of Done:**
- [x] `npm run dev` starts without errors
- [x] Tailwind works (test with a colored div)
- [x] shadcn/ui `<Button>` renders correctly
- [x] TypeScript compiles with no errors

---

### Task 0.2 — Configure design tokens
Set up custom Tailwind colors and typography that match the Revolut-style aesthetic.

**Steps:**
- Extend `tailwind.config.ts` with brand colors:
  - `brand-blue: #0066FF`, `brand-light: #E8F0FE`, `brand-green: #00C48C`, `brand-orange: #FF9500`
  - `surface-primary: #FFFFFF`, `surface-secondary: #F5F6F8`
  - `text-primary: #1A1A2E`, `text-secondary: #6B7280`, `text-muted: #9CA3AF`
- Add font: SF Pro Display or fallback to system `-apple-system, BlinkMacSystemFont, "Segoe UI"`
- Set default border-radius to `12px` for cards

**Definition of Done:**
- [x] Custom colors usable as `bg-brand-blue`, `text-text-primary`, etc.
- [x] Font stack renders clean system sans-serif on all platforms

---

### Task 0.3 — Set up SQLite + seed script
Create the database layer with schema, seed data, and query functions.

**Steps:**
- Create `db/schema.sql` with all tables from ARCHITECTURE.md
- Create `db/seed.sql` with realistic mock data:
  - 1 user (id=1, name="Андрей", initials="AN")
  - 15+ eSIM plans across popular countries (Турция, Таиланд, Германия, Италия, Испания, США, Грузия, ОАЭ, Индонезия, etc.)
  - 1 active user eSIM (Турция, 5 GB, 2.1 GB used, 30 days)
  - 1 virtual card (*1234, VISA, $39.23)
  - 8+ store products (ChatGPT, Netflix, Spotify, Steam wallet, Miro, Figma, NordVPN, YouTube Premium)
  - 1 active subscription (ChatGPT, renewal March 17, $20.00)
  - 4 user favorites (ChatGPT, Steam, Miro, Figma)
  - 3 banners (кэшбэк promo, eSIM Europe package, virtual card promo)
- Create `db/index.ts` — singleton DB connection, runs schema.sql + seed.sql on init
- Create `db/queries.ts` — typed query functions:
  - `getUser(id)`, `getUserEsims(userId)`, `getEsimPlan(planId)`
  - `getAvailablePlans()`, `getPlansByCountry(countryCode)`
  - `getUserCard(userId)`, `getUserSubscriptions(userId)`
  - `getUserFavorites(userId)`, `getStoreProducts()`, `getStoreProductsByCategory(cat)`
  - `getBanners()`
- Create `lib/types.ts` — TypeScript interfaces for all entities
- Add `"seed"` script to `package.json`: `"tsx scripts/seed.ts"`

**Definition of Done:**
- [x] `npm run seed` creates `db/travel.db` without errors
- [x] Each query function returns typed data
- [x] `getUser(1)` returns `{ id: 1, name: "Андрей", ... }`
- [x] `getUserEsims(1)` returns array with the Turkey eSIM
- [x] `getStoreProducts()` returns 8+ products

---

### Task 0.4 — Mobile shell + tab bar (the skeleton)
Create the app shell that wraps all pages: mobile container + bottom navigation.

**Steps:**
- Create `components/layout/MobileShell.tsx`:
  - `max-w-[430px] mx-auto min-h-screen bg-surface-secondary relative`
  - On desktop: centered with subtle shadow to simulate phone
  - Bottom padding for tab bar (`pb-20`)
- Create `components/layout/TabBar.tsx`:
  - Fixed at bottom, 5 tabs with icons from `lucide-react`:
    - Главная → `Home` icon → route `/`
    - eSIM → `Smartphone` icon → route `/esim`
    - Карта → `CreditCard` icon → route `/card`
    - Поездка → `PlaneTakeoff` icon → route `/trip`
    - Витрина → `LayoutGrid` icon → route `/store`
  - Active tab: `text-brand-blue`, inactive: `text-text-muted`
  - Uses `usePathname()` for active state
- Create `components/layout/Header.tsx`:
  - Left: avatar circle with initials "AN" (bg-gray-200)
  - Right: notification bell icon with red badge dot
- Update `app/layout.tsx` to wrap children in `<MobileShell>` with `<Header>` and `<TabBar>`
- Create placeholder `page.tsx` for each tab route (`/`, `/esim`, `/card`, `/trip`, `/store`) — just a heading with the tab name

**Definition of Done:**
- [x] App renders as a phone-width column centered on desktop
- [x] Tab bar is visible and fixed at bottom on all routes
- [x] Clicking each tab navigates to its route
- [x] Active tab is highlighted in blue
- [x] Header shows "AN" avatar and bell icon
- [x] All 5 routes render their placeholder headings

---

## Phase 1: Home Screen (Главная)

### Task 1.1 — Banner carousel
Build the horizontal scrollable promo banner area at top of home screen.

**Steps:**
- Create `components/home/BannerCarousel.tsx`
- Horizontal scroll container with `overflow-x-auto snap-x` and `scroll-snap-align: start`
- Each banner: rounded card (h-[120px]) with gradient background (`gradient_from → gradient_to`)
- Show title + subtitle in white bold text
- Dot indicators below showing current position
- Data comes from `getBanners()` query via server component prop

**Definition of Done:**
- [x] 3 banners render with correct gradient backgrounds
- [x] Banners scroll horizontally with snap behavior
- [x] Dot indicators reflect which banner is visible
- [x] Text is white, bold, readable on gradient backgrounds
- [x] Matches the wireframe screenshot layout

---

### Task 1.2 — eSIM status card
Show the user's active eSIM with traffic progress.

**Steps:**
- Create `components/home/EsimStatusCard.tsx`
- White card with:
  - Title: "Статус вашей eSIM"
  - Subtitle: "Пакет {country} — {data_gb} Гб / {duration_days} дней"
  - Progress bar (shadcn `<Progress>`) showing `used_gb / data_gb`
  - Text below: "{used_gb} Гб / {data_gb} Гб" left, "Осталось: {remaining} Гб" right
  - Blue "Пополнить" button on the right
- If multiple eSIMs: horizontal swipeable (same snap scroll pattern)
- Data from `getUserEsims(1)` joined with `getEsimPlan()`

**Definition of Done:**
- [x] Card displays Turkey eSIM data correctly
- [x] Progress bar shows ~42% filled (2.1 of 5 GB)
- [x] "Пополнить" button is styled in brand blue
- [x] Card has white background, rounded corners, subtle shadow
- [x] Matches wireframe layout closely

---

### Task 1.3 — Virtual card block
Display the user's card balance.

**Steps:**
- Create `components/home/VirtualCardBlock.tsx`
- Light blue card (`bg-blue-50` or custom) with:
  - Top row: "Твоя карта *{last_four}" left, VISA logo/text right
  - Large balance: "${balance}" in bold (32px+)
  - "Пополнить" button (brand blue, rounded)
- Data from `getUserCard(1)`

**Definition of Done:**
- [x] Shows "*1234" and "VISA"
- [x] Balance shows "$39.23" prominently
- [x] Light blue background distinguishes it from eSIM card
- [x] "Пополнить" button present and styled

---

### Task 1.4 — Subscription alert
Show upcoming subscription renewal.

**Steps:**
- Create `components/home/SubscriptionAlert.tsx`
- Section title: "Ближайшие подписки"
- Row with: service icon (or emoji placeholder), name "ChatGPT — Продление", date "17 марта", price "$20.00"
- Data from `getUserSubscriptions(1)` joined with `store_products`

**Definition of Done:**
- [x] Shows ChatGPT renewal info
- [x] Date and price displayed correctly
- [x] Icon/avatar for the service is present
- [x] Clean list-item styling

---

### Task 1.5 — Favorites row
Quick-access service icons.

**Steps:**
- Create `components/home/FavoritesRow.tsx`
- Section title: "Избранное"
- Horizontal row of round icons with service names below
- Each item: 56px circle with icon/image, label underneath
- Data from `getUserFavorites(1)` joined with `store_products`

**Definition of Done:**
- [x] 4 favorites shown: ChatGPT, Steam, Miro, Figma
- [x] Round icon circles with labels
- [x] Horizontal layout, evenly spaced

---

### Task 1.6 — Assemble home page
Wire all home components together in `app/page.tsx`.

**Steps:**
- Server component that calls all necessary queries
- Pass data as props to each child component
- Stack vertically with consistent spacing (`space-y-4` or `gap-4`)
- Add safe area padding at top for header

**Definition of Done:**
- [x] Home page shows: banners → eSIM card → virtual card → subscriptions → favorites
- [x] All data comes from SQLite (no hardcoded values in components)
- [x] Scrolls naturally on mobile viewport
- [x] Visual hierarchy matches the wireframe screenshot

---

## Phase 2: eSIM Tab

### Task 2.1 — eSIM main page (traffic + country list)
The eSIM tab shows active eSIM management and country browsing.

**Steps:**
- `app/esim/page.tsx` — server component
- Top section: reuse `TrafficMonitor` component (larger version of EsimStatusCard)
  - Full traffic stats, days remaining, status badge
- Below: "Купить eSIM" section header
- Country grid: flag emoji + country name + "от {min_price} ₽"
- Countries sorted: previously purchased first, then by popularity (`is_popular`)
- Create `components/esim/CountryGrid.tsx` and `components/esim/TrafficMonitor.tsx`

**Definition of Done:**
- [x] Active eSIM traffic shown at top with detailed stats
- [x] Country grid shows 15+ countries with flags and prices
- [x] Countries clickable (navigate to `/esim/[countryCode]`)
- [x] Layout is a 2-column grid for countries

---

### Task 2.2 — Country detail / package picker
Select a data package for a specific country.

**Steps:**
- `app/esim/[countryCode]/page.tsx` — dynamic route
- Header: flag + country name + back button
- List of available packages for that country:
  - Each package card: data amount, duration, price
  - Highlight recommended/popular package
- "Купить" button at bottom (non-functional in prototype, shows toast or modal)
- Create `components/esim/PackagePicker.tsx`

**Definition of Done:**
- [x] Navigating to `/esim/TR` shows Turkey packages
- [x] Multiple packages displayed as selectable cards
- [x] One package visually highlighted as recommended
- [x] "Купить" button present (can show alert on click)
- [x] Back navigation works

---

## Phase 3: Card Tab

### Task 3.1 — Card detail page
Full card view with balance and details.

**Steps:**
- `app/card/page.tsx` — server component
- Card visual: rendered card showing last 4 digits, brand, maybe a gradient card image
- Large balance display
- "Пополнить" and "Реквизиты" buttons
- Info block: card features (Apple Pay, Google Pay compatible, international payments)
- Create `components/card/CardVisual.tsx`, `components/card/BalanceDisplay.tsx`

**Definition of Done:**
- [x] Card renders with visual representation (gradient card shape)
- [x] Balance prominently displayed
- [x] Action buttons present and styled
- [x] Card features listed below

---

### Task 3.2 — Freeze card action
Add the ability to freeze and unfreeze the virtual card from the card page.

**Steps:**
- Extend card mock data/state with a freeze status (`active` / `frozen`)
- Add a visible action on `app/card/page.tsx`:
  - `Заморозить карту` when card is active
  - `Разморозить карту` when card is frozen
- Show the current card status near the card visual or action area
- Update the card UI style when frozen:
  - muted or dimmed visual state
  - clear frozen badge / label
- Prototype behavior can be client-side only (no persistent backend write required)

**Definition of Done:**
- [x] User can freeze the card from the card page
- [x] User can unfreeze the card from the card page
- [x] Current card status is clearly visible
- [x] Frozen state is visually different from active state
- [x] Freeze/unfreeze interaction works without page errors

---

### Task 3.3 — Recent transactions list
Show recent card activity with an expandable list of transactions.

**Steps:**
- Add mock card transactions to the database seed or local prototype data
- Create a transactions block on `app/card/page.tsx`
- Show the latest 3 operations by default:
  - merchant / operation name
  - date or relative time
  - amount
- Add a `Еще` button below the first 3 operations
- On click, expand the list and show the remaining operations
- Keep the interaction lightweight and mobile-friendly

**Definition of Done:**
- [x] Card page shows the latest 3 operations by default
- [x] Each operation displays name, date, and amount
- [x] `Еще` button is visible when there are more than 3 operations
- [x] Clicking `Еще` reveals the remaining operations
- [x] Expanded transaction list keeps consistent spacing and styling

---

### Task 3.4 — Limits information action
Add a way to view card limits and usage rules from the card page.

**Steps:**
- Add a dedicated info action such as `Лимиты` or `Информация`
- On click, show a modal, sheet, or expandable info panel
- Include useful limit details:
  - daily / monthly payment limit
  - online payments availability
  - cash withdrawal availability if relevant
  - any prototype restrictions
- Keep the component easy to reuse for future card settings/help flows

**Definition of Done:**
- [x] Card page has a visible limits/info action
- [x] Clicking the action reveals limits information
- [x] Limits block includes at least 3 concrete usage rules or limits
- [x] Limits information is readable on mobile
- [x] Open/close interaction works without layout glitches

---

## Phase 4: Trip Tab

### Task 4.1 — Trip page (placeholder with services)
Placeholder for travel services (not fully featured in MLP).

**Steps:**
- `app/trip/page.tsx`
- Header: "Поездка"
- Service tiles in a grid:
  - Бронирование жилья (Airbnb/Booking)
  - Аренда авто
  - Страховка
  - VIP-залы
- Each tile: icon + name + "Скоро" badge for unavailable features
- At least Airbnb tile can link out or show info modal

**Definition of Done:**
- [x] 4 service tiles displayed in 2x2 grid
- [x] Each has icon, label, and status (active or "Скоро")
- [x] Clean visual layout with consistent card styling

---

## Phase 5: Store Tab (Витрина)

### Task 5.1 — Digital store catalog
Browse digital products by category.

**Steps:**
- `app/store/page.tsx` — server component
- Category filter tabs at top: "Все", "Подписки", "Игры", "VPN", "AI"
- Product grid (2 columns):
  - Product card: icon, name, price, category badge
  - Create `components/store/ProductCard.tsx` and `components/store/ProductGrid.tsx`
- Category filtering can be client-side (useState) since data is passed as props

**Definition of Done:**
- [x] 8+ products displayed in grid
- [x] Category tabs filter the list
- [x] Each product has icon, name, price
- [x] Cards are visually consistent with app design language

---

## Phase 6: Deploy Setup

### Task 6.1 — Vercel deploy configuration
Make the app deployable with a single command.

**Steps:**
- Create `vercel.json`:
  ```json
  {
    "buildCommand": "npm run seed && npm run build",
    "framework": "nextjs"
  }
  ```
- Ensure `scripts/seed.ts` works in build environment:
  - Creates `db/travel.db` from `schema.sql` + `seed.sql`
  - Path resolution works relative to project root
- Add `db/travel.db` to `.gitignore` (generated at build time)
- Update `next.config.ts` to handle `better-sqlite3` as external package:
  ```ts
  experimental: {
    serverComponentsExternalPackages: ['better-sqlite3']
  }
  ```
- Create `README.md` with:
  - Project description
  - `npm install` → `npm run seed` → `npm run dev` for local
  - `vercel --prod` for deploy
- Test: `npm run build` succeeds locally

**Definition of Done:**
- [x] `npm run build` completes without errors
- [x] Built app serves correctly from `npm start`
- [x] `vercel.json` present and configured
- [x] `README.md` has clear setup instructions
- [x] `.gitignore` includes `db/travel.db` and standard Next.js ignores

---

## Phase 7: Polish

### Task 7.1 — Visual polish pass
Final visual refinements across all screens.

**Steps:**
- Consistent spacing and padding across all pages (16px horizontal padding)
- Card shadows: `shadow-sm` on all card components
- Border radius: `rounded-xl` (12px) on all cards
- Transitions: add `transition-colors duration-200` to interactive elements
- Loading states: add skeleton placeholders for cards (optional but nice)
- Scroll behavior: smooth scroll on the whole page
- Safe areas: respect notch/bottom bar on iOS (env(safe-area-inset-*))
- Test on mobile viewport (375px and 430px widths)

**Definition of Done:**
- [x] App looks polished at 375px and 430px widths
- [x] No visual glitches or overflow issues
- [x] Cards have consistent shadows and rounded corners
- [x] Interactive elements have hover/active states
- [x] Tab bar doesn't overlap content

---

## Task Execution Order (Walking Skeleton)

```
Phase 0: Scaffold
  0.1 Init project          ← deployable "hello world"
  0.2 Design tokens          ← brand looks right
  0.3 SQLite + seed          ← data layer works
  0.4 Mobile shell + tabs    ← navigable skeleton with placeholders
  
  ✅ CHECKPOINT: App runs, navigates 5 tabs, reads from DB

Phase 1: Home Screen
  1.1 Banner carousel
  1.2 eSIM status card
  1.3 Virtual card block
  1.4 Subscription alert
  1.5 Favorites row
  1.6 Assemble home page
  
  ✅ CHECKPOINT: Home screen fully functional with real data

Phase 2: eSIM Tab
  2.1 Traffic + country list
  2.2 Package picker
  
  ✅ CHECKPOINT: eSIM browsing flow works end-to-end

Phase 3: Card Tab
  3.1 Card detail page

Phase 4: Trip Tab
  4.1 Trip services placeholder

Phase 5: Store Tab
  5.1 Digital store catalog
  
  ✅ CHECKPOINT: All 5 tabs have content

Phase 6: Deploy
  6.1 Vercel configuration
  
  ✅ CHECKPOINT: App deploys to Vercel with one command

Phase 7: Polish
  7.1 Visual polish pass
  
  ✅ FINAL: Production-quality prototype
```

---

## Reference Files

- `ARCHITECTURE.md` — full tech architecture, DB schema, project structure
- `PROJECT.md` — product concept and strategy
- `Концепт_приложения.pdf` — detailed feature specs and wireframes
- `openartimage_*.png` — UI mockup screenshot of the home screen

## Important Notes

- All UI text must be in **Russian**
- Design style: **clean, modern, Revolut/Wise-like** — white backgrounds, subtle shadows, blue accents
- This is a **read-only prototype** — no mutations, no auth flow, no API routes needed
- SQLite is seeded at build time and read by Server Components directly
- Each component should be self-contained and accept data via props
- Use `lucide-react` for all icons
- Use emoji flags for countries (🇹🇷 🇹🇭 🇩🇪 etc.)

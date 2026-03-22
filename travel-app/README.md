# Travel App Prototype

Mobile-friendly prototype of a travel fintech super-app built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, and SQLite (`better-sqlite3`).

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- SQLite (`better-sqlite3`) + raw SQL

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Seed local database:

```bash
npm run seed
```

3. Run development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build and production run

```bash
npm run build
npm start
```

## Deploy

```bash
vercel --prod
```

`vercel.json` is configured to run database seed before build:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run seed && npm run build"
}
```

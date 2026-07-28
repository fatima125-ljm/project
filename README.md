# YarnMuse AI

An AI crochet studio — generate patterns, match yarn colors from a photo, browse an inspiration gallery, and share finished makes with the community. Bilingual (English / Arabic RTL).

## Tech

- React + TypeScript + Vite
- Tailwind CSS
- Supabase (auth, database, storage)
- react-router-dom

## Getting started

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and fill in your Supabase project URL and anon key.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build
- `npm run typecheck` — type-check without emitting

## Database

Run the SQL in `supabase/schema.sql` in the Supabase SQL editor to create the tables, RLS policies, and storage bucket.

## Deploy

The app is a static SPA. Deploy `dist/` to Vercel or Netlify — SPA rewrites are already configured (`vercel.json`, `public/_redirects`, `netlify.toml`).

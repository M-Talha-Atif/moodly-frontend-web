# Moodly Web Frontend

Moodly's web frontend: matches the mobile app's theme, talks to the NestJS
backend, and follows a Feature-Sliced-Design-style structure. See
[AGENTS.md](./AGENTS.md) for architecture and conventions.

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

The app runs at `http://localhost:5173` by default. It expects the backend
(`Backend/ai-moodler-backend`) to be running and reachable at the URL set in
`VITE_API_BASE_URL`.

## Environment variables

| Variable | Purpose | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL for the backend API, including the `/v1` version segment | `http://localhost:3002/v1` |

## Scripts

```bash
npm run dev        # start the dev server
npm run build       # typecheck and build for production into dist/
npm run lint          # typecheck only
npm run preview        # preview the production build locally
```

## Deploying to Vercel

The repo includes `vercel.json` with a single-page-app rewrite so client-side
routes do not 404 on refresh. Import the repository into Vercel, set
`VITE_API_BASE_URL` to the production backend URL in the project's
environment variables, and deploy. No other configuration is required, Vercel
detects the Vite framework preset automatically.

## Project status

Landing, login/signup, and onboarding are built end to end. Everything else
(host dashboard, bookings, community, explore, and so on) is planned but not
yet started, see the roadmap section in [AGENTS.md](./AGENTS.md).

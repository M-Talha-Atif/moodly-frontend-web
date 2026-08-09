# CLAUDE.md

This file is a short orientation pointer. **`AGENTS.md` is the source of
truth** for architecture, conventions, theme rules and the module roadmap,
read that first.

## Quick orientation

- This is Moodly's web frontend (Vite + React 19 + TypeScript). It must
  visually match the mobile app (`Mobile App/moodler`) exactly, and talks to
  the NestJS backend at `Backend/ai-moodler-backend`.
- Theme tokens: `src/app/styles/theme.css`. Never hardcode colors/radii in a
  component, use the Tailwind utilities that file defines.
- Layers: `shared -> entities -> features -> widgets/pages -> app`, one-way
  imports only. See AGENTS.md for the full rule and its one documented
  exception.
- Copy strings: `src/shared/config/strings/en.ts`, not inline in components.
- No em dash character in anything written in this repo.

## Commands

```bash
npm run dev
npm run build
npm run lint
```

## Local setup

Copy `.env.example` to `.env` and point `VITE_API_BASE_URL` at a running
instance of the backend (default `http://localhost:3002/v1`).

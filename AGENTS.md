# AGENTS.md

Guidance for any agent (human or AI) working in this repository. This is the
source of truth for architecture and conventions; `CLAUDE.md` just points
here.

## What this project is

Moodly's web frontend. It exists alongside a mobile app
(`Mobile App/moodler` in the wider workspace) and a NestJS backend
(`Backend/ai-moodler-backend`). This web app must visually match the mobile
app exactly: same font, colors, radii, spacing and component language. If a
mobile screen and a web screen ever look different for the same flow, that is
a bug, not a stylistic choice.

## Tech stack and why

- **Vite + React 19 + TypeScript**: fast dev loop, standard SPA tooling.
- **Tailwind CSS v4** (`@theme` in `src/app/styles/theme.css`): the theme
  tokens in that file are copied 1:1 from the mobile app's `theme.md` and
  `components/ui/text.tsx`. Components use Tailwind utility classes built
  from those tokens (`bg-ink`, `text-muted`, `rounded-card`, and so on).
  **Never hardcode a hex color or pixel radius in a component.** If a value
  is missing from the theme, add it to `theme.css` first.
- **TanStack Query**: all server state (API reads and writes) goes through
  `useQuery`/`useMutation` in a feature's `api/` folder. Do not call
  `apiClient` directly from a component.
- **Zustand**: client-only state (the session/auth store). Kept intentionally
  small, only in `entities/session`.
- **react-hook-form + zod**: all forms. Zod schemas live next to the form in
  `features/<feature>/model/`.
- **framer-motion**: the only animation library. Mirrors the mobile app's use
  of `moti` for step/transition animations.

## Architecture: Feature-Sliced layers

```
src/
  app/        composition root: router, providers, global styles, the axios
              interceptor wiring, the App component. Nothing else imports app/.
  pages/      one file per route. Thin: compose widgets + features, no logic.
  widgets/    page-level UI compositions used by more than one page
              (SiteHeader, SiteFooter, AuthShell).
  features/   one folder per business capability (auth, onboarding, landing).
              Each has api/ (TanStack Query hooks + raw API calls),
              model/ (zod schemas, feature-local state), ui/ (components).
  entities/   core domain objects shared across features (user, session).
  shared/     framework-agnostic building blocks: ui kit, api client,
              constants, copy strings, types. Zero dependencies on anything
              above it in this list.
```

**Import direction is one-way**: `shared -> entities -> features -> widgets/pages -> app`.
A lower layer must never import from a higher one. The one deliberate
exception: `shared/api/apiClient.ts` is a bare axios instance with no auth
logic; the token-attachment and refresh-on-401 interceptors are wired in
`app/providers/setupApiInterceptors.ts` at bootstrap, specifically so that
`shared` does not need to import the session entity.

## Conventions

- **No hardcoded copy in components.** All user-facing strings live in
  `shared/config/strings/en.ts`. This is the seam for future i18n: swapping
  to a real i18n library later means replacing this module's lookup, not
  touching components.
- **Comments explain "why", not "what".** Component names and types should
  make the "what" obvious. Only comment on a non-obvious constraint, a
  workaround, or a decision that would surprise the next reader.
- **No em dash character anywhere** in code, comments, commit messages, or
  UI copy. Use a period, comma, or hyphen instead.
- **Mirror the mobile app's component names** where practical
  (`Button`, `Input`, `Card`, `Text`, `ChipSelector`, `ProgressBar`, ...) so
  the two codebases read the same way even though the implementations differ.
- **The backend response envelope** (`{ success, statusCode, data, message }`,
  see `Backend/ai-moodler-backend/src/common/dto/result.dto.ts`) is unwrapped
  once via `unwrap()` in `shared/api/apiClient.ts`. Feature API functions
  should return the unwrapped payload, not the raw envelope.
- **Backend routes are versioned** under `/v1` (see backend's
  `VersioningType.URI` setup). `VITE_API_BASE_URL` already includes the
  `/v1` segment, so feature API calls should use paths like `/auth/login`,
  not `/v1/auth/login`.

## Current status and roadmap

Built so far: app shell (router, providers, theme), shared UI kit, the
session/auth entity, a `ProtectedRoute` wrapper for authenticated-only pages,
a shared `AppHeader` widget (Home/Explore/Bookings/Profile nav plus sign out)
for all authenticated pages, and nine modules end to end: **Landing**,
**Auth** (login/signup with role selection), **Onboarding** (chat-style step
flow), **App Home** (greeting, mood streak, check-in prompt), **Daily
Check-in** (mood wheel plus optional note, wired to `/mood-log`),
**Explore** (search plus infinite-scroll "load more" list of experiences),
**Experience Detail and Booking** (full experience view with
emotion/outcome/cultural chips, host card, `POST /user/bookings`), **My
Bookings** (status filter tabs, inline cancel confirmation, wired to
`GET/DELETE /user/bookings`), **Profile** (avatar upload, edit name, change
password with inline old-password-error handling, wired to
`GET/PATCH /profile` and `PATCH /profile/password`). All nine were
smoke-tested against a real local instance of `Backend/ai-moodler-backend`,
not just built and assumed to work.

Not yet ported from the old frontend (`Frontend/ai-event-book`), intentionally
out of scope for this pass: community, host dashboard/experiences/bookings,
notifications, insights, settings. When picking these up, follow the same
layer structure: a `features/<name>` folder with `api/model/ui`, theme
tokens from `shared/ui`/`theme.css` only, copy in `shared/config/strings`.

**Bug fixed while building Profile**: `entities/user`'s `useCurrentUser`
called `GET /auth/me`, which returns the raw JWT payload
(`{sub, email, role, iat, exp}`), not a user profile, so `user?.name` on
App Home was silently always empty. Replaced with `useProfile()` backed by
`GET /profile` (returns `{name, avatarUrl, email, accountStatus}`), which is
also what the Profile module itself uses. `GET /auth/me` is not used
anywhere in this codebase anymore.

**Convention note**: use an inline confirm step (see `features/myBookings/
ui/BookingCard.tsx`) for destructive actions, not `window.confirm()`. The
native dialog blocks synchronously in a way that doesn't play well with
React state and is also untestable via DOM-level automation.

**Known backend caveats found during testing** (none committed to the backend
repo, review before relying on them elsewhere):
- `POST /mood-log` originally required a photo or voice file on every
  submission even though the DTO marks both optional, and any thrown
  validation error was being rewrapped into a generic 500 by
  `MoodLogService.createForUser`'s catch block. Both were fixed directly in
  `Backend/ai-moodler-backend/src/mood-log/services/mood-log.service.ts`
  (HttpExceptions now propagate instead of being swallowed, and a mood log
  with just a `moodLabel` is accepted).
- `GET /user/experiences` only returns `id`/`title`/`price`/`image` per item
  today, even though `ExperienceListItemDto` declares host/location/mood-tags/
  spots/booking-state too (`ExperienceService.findAllForUser` selects a
  narrower field set than `findAllPublic` does). `entities/experience`'s
  `ExperienceListItem` type marks those extra fields optional so the UI
  degrades gracefully rather than assuming data that isn't there; the
  `ExperienceCard` only conditionally renders a subtitle when a mood tag is
  actually present.
- `GET /user/experiences/:id` returns `emotions`/`outcomes` at runtime, not
  the `targetEmotions`/`desiredOutcomes` names its own `ExperienceResponseDto`
  class declares (`ExperienceService.findOneWithBooking` hand-builds the
  response object and doesn't match the DTO's field names). The frontend type
  is built off the verified runtime shape, not the DTO class.
- `GET /profile` and `GET /profile/image` have no response DTO class at all,
  they return inline object literals (`profile.service.ts`), so their shape
  is hand-declared on the frontend (`UserProfile` in `entities/user`) rather
  than typed against anything on the backend. `PATCH /profile` and
  `PATCH /profile/password` return `ResultDto.okWithMessage()` on success,
  meaning no `data` field at all, not even an empty one, so `unwrap()` (which
  requires `data`) would incorrectly throw on a real success. Added
  `unwrapMessage()` in `shared/api/apiClient.ts` for this response shape;
  reach for it instead of `unwrap()` whenever a backend endpoint's success
  path is message-only.

The old frontend's mood-reactive theme switching (`.happy/.sad/.angry/.neutral`)
was deliberately not carried over here, since the mobile app (the source of
truth for this rebuild) uses a single light theme. Revisit only as a
deliberate, separately-scoped feature decision.

## Commands

```bash
npm run dev        # start dev server
npm run build       # typecheck + production build
npm run lint          # typecheck only
npm run preview        # preview the production build locally
```

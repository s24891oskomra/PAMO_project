# ZwierzApp Mobile — Architecture

ZwierzApp is a React Native (Expo) mobile application for animal shelter staff and volunteers. It communicates with a REST API using JWT authentication.

## Project structure

```
app/           Expo Router screens (thin route wrappers)
client.ts      Shared Axios instance with JWT refresh
providers/     React context (auth, React Query)
features/      Domain modules (auth, walks, animals, inventory, dashboard, profile)
components/    Shared UI components
constants/     Design tokens
tests/         Jest fixtures
.maestro/      E2E test flows
```

Each feature module typically contains:

- `api/` — HTTP calls and query keys
- `hooks/` — TanStack React Query hooks
- `components/` — Screen UI
- `schemas/` — Zod validation for API payloads
- `utils/` — Pure helper functions

## Data flow

1. UI components call React Query hooks (`useWalks`, `useAnimals`, …).
2. Hooks invoke API functions that use the shared `apiClient`.
3. API responses are validated with Zod schemas before reaching the UI.
4. Mutations invalidate related query keys to refresh cached data.

## Authentication

1. User logs in via `postLogin` → tokens stored in `expo-secure-store`.
2. `AuthProvider` restores the session on app start and exposes `user`, `login`, `logout`.
3. `client.ts` attaches the access token to every request.
4. On HTTP 401, the client refreshes the token once and retries the original request.
5. `app/_layout.tsx` redirects unauthenticated users to `/login`.

## Testing

| Type | Tool | Location |
|------|------|----------|
| Unit tests | Jest | `**/*.test.ts` |
| E2E tests | Maestro | `.maestro/` |

Run unit tests: `npm test`  
Run E2E tests: `maestro test .maestro`

## Generated API documentation

This document is included as the TypeDoc project readme. Run `npm run docs` to regenerate HTML API reference from JSDoc comments in `client.ts`, `providers/`, and `features/`.

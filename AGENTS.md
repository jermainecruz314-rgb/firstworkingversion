# AGENTS.md

## Cursor Cloud specific instructions

**What this is:** `FH Pathway Companion` — a single-page **React + Vite** app (plain
JSX, no router, no backend). Everything runs client-side using **mock data**
(`src/mockHealthHub.js`); there are **no secrets, environment variables, or
external/government APIs** to configure. Login ("Sign in with Singpass"),
consent, and account features are all simulated.

**Standard commands** are in `README.md` / `package.json` scripts:
- `npm run dev` — Vite dev server (defaults to port `5173`).
- `npm run build` — production build to `dist/`.
- `npm run preview` — serve the built `dist/` (defaults to port `4173`).

**Non-obvious notes:**
- There are **no lint or test scripts** defined (`package.json` only has
  `dev`/`build`/`preview`), and no test/lint tooling is configured in the repo.
  "Testing" a change means running the dev server and exercising the UI flow.
- Core UI flow to smoke-test: pick a demo profile on the Login screen →
  "Sign in with Singpass" → "I consent" → "Go to my dashboard" → open a feature
  card (e.g. Cost Transparency). No credentials are required.
- `scripts/capture-screenshots.mjs` uses **Playwright**, which is **not** listed
  in `package.json` dependencies and is gitignored tooling. It targets the
  `preview` server at `http://127.0.0.1:4173`, so run `npm run build` +
  `npm run preview` before using it, and install Playwright separately. It is
  optional and not needed for normal development.

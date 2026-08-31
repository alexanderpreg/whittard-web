<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Whittard Web — Agent Guide

## Commands

| Action                          | Command                                                                   |
| ------------------------------- | ------------------------------------------------------------------------- |
| Dev server                      | `pnpm dev` (port 3000)                                                    |
| Build                           | `pnpm build`                                                              |
| Lint (strict, --max-warnings=0) | `pnpm lint` / `pnpm lint:fix`                                             |
| Typecheck                       | `pnpm typecheck` (`tsc --noEmit`)                                         |
| Format                          | `pnpm format:check` / `pnpm format:write`                                 |
| Commit                          | `pnpm commit` (launches cz-git with Spanish prompts)                      |
| Install                         | `pnpm install` (pnpm >=10.15, node >=20.11.1, Volta pins 20.19.0/10.15.0) |

## Quality pipeline (run in order)

1. `pnpm format:check`
2. `pnpm lint`
3. `pnpm typecheck`
4. `pnpm build`

Pre-commit runs `prettier --write .` → `eslint . --fix`. Pre-push runs `typecheck` → `build`. CI on PR/push to `main` checks `format:check → lint → typecheck → build`.

## Project structure

```
src/
  app/              # App Router pages — route group (store) wraps all shop routes
  modules/          # 8 business domains: auth, contact, delivery-returns, home, legals, products, recipes, taste
  shared/           # shared UI components (custom-ui, shadcn-ui), layouts (footer/header), navigation
  lib/              # utils, hooks, http client/server, adapters (scaffold), types
  store/            # Zustand global state (scaffold — empty)
  providers/        # React contexts (scaffold — empty)
  config/           # Env vars (NEXT_PUBLIC_*) and app config
  constants/        # breakpoints, http-status, media-queries
  styles/           # Tailwind v4 CSS + custom fonts (Avenir LT, Elephant)
```

- Import aliases: `@/*` → `./src/*`, `@shared/*` → `./src/shared/*`
- shadcn/ui aliases: components → `@/shared/components/custom-ui`, ui → `@/shared/components/shadcn-ui`, utils → `@/lib/utils/shadcn-cn`
- **No tests** exist in the project.
- **No middleware** exists.
- **No .env files** committed (`.env*` gitignored).

## Style & toolchain

- **Tailwind CSS v4** (`@tailwindcss/postcss`, `tw-animate-css`, `shadcn/tailwind.css`)
- **Prettier**: semi, singleQuote, trailingComma all, tabWidth 2, printWidth 100, LF. Plugins: `prettier-plugin-organize-imports`, `prettier-plugin-tailwindcss`
- **ESLint**: eslint-config-next (core-web-vitals + typescript), strict warnings
- **TypeScript**: strict, moduleResolution `bundler`, incremental
- **Commits**: Conventional Commits via commitlint + cz-git (Spanish UI). Types: feat/fix/refactor/docs/style/test/chore/build/ci/perf. Scopes mirror module names.
- **Docker**: prod build in `docker/production/`, runs on host port 3004. Prod Dockerfile uses Next.js standalone output.

## Deployment

Docker Compose on VPS. Pull → `docker compose build --no-cache` → `docker compose up -d`. Required env: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_GOOGLE_CLIENT_ID`, `NEXT_PUBLIC_GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_CHECKOUT_NIUBIZ_JS_URL`, `NEXT_PUBLIC_NIUBIZ_MERCHANT_ID`, `AUTH_ACCESS_COOKIE_NAME`.

## Caveats

- Codebase has minor filename typos (e.g. `DeliveyReturns.tsx`, `Starts.tsx`, `rederict.ts`, `LoginForm..tsx`) — do not rename without explicit request.
- `docs/` directory has architecture.md, git-workflow.md, deployment.md, http-status-code.md — prose may diverge from code.

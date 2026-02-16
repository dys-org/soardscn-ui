# Repository Guidelines

## Project Structure & Module Organization
- App source lives in `src/`.
- App entry is `index.html` + `src/main.tsx`; top-level app routing/state is in `src/App.tsx`.
- Page modules are in `src/pages/` (for example, `src/pages/home-page.tsx` and `src/pages/app-showcase-page.tsx`).
- Reusable registry UI primitives are in `src/registry/ui/`; registry helpers are in `src/registry/lib/`.
- Registry components with additional logic (built from `ui` primitives) live in `src/registry/components/`.
- Feature-level app components are in `src/app-components/`.
- Root `registry.json` is the source registry manifest used by `shadcn build`.
- Generated registry output is under `public/r/` (including `public/r/registry.json`, `public/r/ui/*.json`, `public/r/components/*.json`, and `public/r/lib/*.json`).
- Static assets are in `public/`.

## Build, Test, and Development Commands
Use `pnpm` (lockfile: `pnpm-lock.yaml`).

- `pnpm dev`: Starts Vite dev server on port `3000`.
- `pnpm build`: Produces a production build.
- `pnpm registry:build`: Builds shadcn registry artifacts and organizes output into `public/r/ui`, `public/r/components`, and `public/r/lib`.
- `pnpm preview`: Serves the production build locally.
- `pnpm test`: Runs Vitest in Browser Mode (`vitest run --browser`).
- `pnpm lint`: Runs ESLint using TanStack config.
- `pnpm format`: Runs Prettier.
- `pnpm check`: Applies Prettier and ESLint fixes.

## Coding Style & Naming Conventions
- Language: TypeScript + React (`.ts`/`.tsx`), ES modules.
- Formatting is managed by Prettier: single quotes, no semicolons, trailing commas.
- Follow ESLint from `@tanstack/eslint-config`.
- Use path alias imports via `@/` for `src/*` paths.
- In registry components, prefer composing from `@/registry/ui/*` primitives rather than duplicating low-level behavior.
- Components: PascalCase (`ComponentExample.tsx`); utilities/hooks: camelCase.
- Keep page modules aligned with the hash-route mapping implemented in `src/App.tsx`.

## Testing Guidelines
- Framework: Vitest Browser Mode with Playwright provider.
- Put tests beside implementation or in a nearby `__tests__` folder.
- Name tests `*.test.ts` or `*.test.tsx`.
- Prioritize tests for route behavior, component rendering, and user interactions.
- Run all tests with `pnpm test` before opening a PR.

## Commit & Pull Request Guidelines
- Current history is minimal (`Initial commit`), so use clear, imperative commit messages.
- Recommended format: `type(scope): summary` (example: `feat(routes): add dashboard landing page`).
- Keep commits focused and logically grouped.
- PRs should include:
  - concise description of changes,
  - linked issue/ticket (if applicable),
  - screenshots or short recordings for UI changes,
  - confirmation that `pnpm check` and `pnpm test` were run.

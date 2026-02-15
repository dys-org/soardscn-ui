# Plan: Convert soardscn into a shadcn Registry (Type-Namespaced)

## Goal
Serve this repo as a shadcn-compatible registry with two consumer namespaces:
- `@ui/*` -> `.../r/ui/{name}.json`
- `@lib/*` -> `.../r/lib/{name}.json`

The project source of truth becomes:
- `src/registry/ui/*`
- `src/registry/lib/*`

## Critical corrections from the original plan
1. Cross-namespace dependencies must be explicit.
   - Any `registry:ui` item that depends on `utils` must use `"@lib/utils"` in `registryDependencies`.
   - `"utils"` without namespace will not resolve from `@ui`.
2. `components.json` aliases should target `@/registry/*`.
   - Otherwise future `shadcn add` writes back into `src/components/ui`.
3. Output organization must be idempotent.
   - The post-build script should clear `public/r/ui` and `public/r/lib` before moving fresh files.

## Implementation checklist

### 1) Move distributable files into `src/registry`
```text
src/registry/
├── ui/
│   ├── alert-dialog.tsx
│   ├── badge.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── combobox.tsx
│   ├── dropdown-menu.tsx
│   ├── field.tsx
│   ├── input-group.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── select.tsx
│   ├── separator.tsx
│   └── textarea.tsx
└── lib/
    └── utils.ts
```

Move from:
- `src/components/ui/*.tsx` -> `src/registry/ui/*.tsx`
- `src/lib/utils.ts` -> `src/registry/lib/utils.ts`

### 2) Rewrite imports
Inside all moved files:
- `@/components/ui/*` -> `@/registry/ui/*`
- `@/lib/utils` -> `@/registry/lib/utils`

At app-level usage:
- Replace imports from `@/components/ui/*` and `@/lib/utils`
- Use `@/registry/ui/*` and `@/registry/lib/utils`

### 3) Configure registry metadata
Use root `registry.json` (included in this repo) with:
- 13 `registry:ui` items
- 1 `registry:lib` item (`utils`)
- explicit `@lib/utils` dependency from ui items

### 4) Build and organize output
`pnpm registry:build` should:
1. run `shadcn build`
2. run `scripts/organize-registry.mjs`

The organizer moves flat files from `public/r/*.json` into:
- `public/r/ui/*.json` for `registry:ui`
- `public/r/lib/*.json` for `registry:lib`

### 5) Deploy to GitHub Pages
Workflow (included) should:
- install with pnpm
- run `pnpm registry:build`
- publish `public/` to Pages

### 6) Consumer setup
Consumers should add to their `components.json`:
```json
{
  "registries": {
    "@ui": "https://<pages-url>/r/ui/{name}.json",
    "@lib": "https://<pages-url>/r/lib/{name}.json"
  }
}
```

Install example:
```bash
pnpm dlx shadcn@latest add @ui/button
```

## Verification steps
1. `pnpm registry:build`
2. Confirm counts:
   - `public/r/ui` has 13 files
   - `public/r/lib` has 1 file
3. Check one ui item:
   - `public/r/ui/button.json` contains `"registryDependencies": ["@lib/utils"]`
4. Check one lib item:
   - `public/r/lib/utils.json` has `"type": "registry:lib"`
5. App sanity:
   - `pnpm dev`
   - `pnpm build`

## Notes
- Keep `src/components/` for app-only compositions like `component-example.tsx` and `example.tsx`.
- Do not edit `src/routeTree.gen.ts` manually.

# soardscn

Local component library and shadcn registry source for `@ui/*` and `@components/*`.

This project is a plain Vite React app deployed to GitHub Pages with hash-based navigation for showcase pages.

## Development

Run the app locally:

```bash
pnpm dev
```

Build app + static assets:

```bash
pnpm build
```

## Registry build

Build registry artifacts:

```bash
pnpm registry:build
```

This produces:

- `public/r/ui/*.json` for `registry:ui` items
- `public/r/components/*.json` for `registry:component` items

During `pnpm build`, `public/r/*` is copied into `dist/r/*` for Pages deployment.

## Routing

Showcase navigation uses hash routes:

- home: `/#/`
- app showcase: `/#/showcase`

This avoids SPA deep-link rewrite requirements on GitHub Pages.

## Consumer setup

In the consumer app `components.json`:

```json
{
  "registries": {
    "@ui": "https://dys-org.github.io/soardscn-ui/r/ui/{name}.json",
    "@components": "https://dys-org.github.io/soardscn-ui/r/components/{name}.json"
  }
}
```

Install from registry:

```bash
pnpm dlx shadcn@latest add @ui/button
pnpm dlx shadcn@latest add @components/multi-select
```

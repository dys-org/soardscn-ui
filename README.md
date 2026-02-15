# soardscn

Local component library and shadcn registry source for `@ui/*` and `@lib/*`.

## Registry build

Build registry artifacts:

```bash
pnpm registry:build
```

This produces:

- `public/r/ui/*.json` for `registry:ui` items
- `public/r/lib/*.json` for `registry:lib` items

## Consumer setup

In the consumer app `components.json`:

```json
{
  "registries": {
    "@ui": "https://dys-org.github.io/soardscn-ui/r/ui/{name}.json",
    "@lib": "https://dys-org.github.io/soardscn-ui/r/lib/{name}.json"
  }
}
```

Install from registry:

```bash
pnpm dlx shadcn@latest add @ui/button
```

## Migration status

The registry metadata assumes distributable files live under `src/registry/*`.
If this repo still has UI primitives in `src/components/ui/*`, follow
`docs/plans/shadcn-registry-migration.md` first.

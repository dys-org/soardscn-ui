# soardscn

Local component library and shadcn registry source for `@ui/*` and `@components/*`.

## Registry build

Build registry artifacts:

```bash
pnpm registry:build
```

w
This produces:

- `public/r/ui/*.json` for `registry:ui` items
- `public/r/components/*.json` for `registry:component` items
- `public/r/lib/*.json` for `registry:lib` items

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

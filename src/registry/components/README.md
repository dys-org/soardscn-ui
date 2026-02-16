# Registry Components

`src/registry/components` is for higher-level components that add behavior on top of
the base primitives in `src/registry/ui`.

Guidelines:

- Compose from `@/registry/ui/*` and `@/registry/lib/*`.
- Keep primitives generic in `ui`; place app-like logic, orchestration, and
  opinionated defaults in `components`.
- Group each component-level item in its own folder when it has multiple files
  (`index.ts`, types, helpers, tests).

## Published Endpoints

Component-level items are currently published at:

- `https://dys-org.github.io/soardscn-ui/r/components/{name}.json`

Consumer alias example:

```json
{
  "registries": {
    "@components": "https://dys-org.github.io/soardscn-ui/r/components/{name}.json"
  }
}
```

Install example:

```bash
pnpm dlx shadcn@latest add @components/multi-select
```

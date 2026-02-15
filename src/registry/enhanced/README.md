# Enhanced Registry Components

`src/registry/enhanced` is for higher-level components that add behavior on top of
the base primitives in `src/registry/ui`.

Guidelines:

- Compose from `@/registry/ui/*` and `@/registry/lib/*`.
- Keep primitives generic in `ui`; place app-like logic, orchestration, and
  opinionated defaults in `enhanced`.
- Group each enhanced component in its own folder when it has multiple files
  (`index.ts`, types, helpers, tests).

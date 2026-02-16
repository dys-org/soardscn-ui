import { SiteNav } from '@/app-components/site-nav'

export function HomePage() {
  const baseUrl = import.meta.env.BASE_URL
  const toBaseAsset = (path: string) => `${baseUrl}${path.replace(/^\//, '')}`

  return (
    <div className="text-foreground">
      <header className="border-border border-b">
        <div className="mx-auto w-full max-w-6xl px-5 py-4">
          <SiteNav activePath="/" />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-12">
        <section className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            soardscn-ui registry
          </h1>
          <p className="text-muted-foreground">
            This GitHub Pages site serves a shadcn-compatible component
            registry.
          </p>
          <p className="text-muted-foreground text-sm">
            Base UI • Mira • Remix Icons
          </p>
        </section>

        <section className="bg-card mt-6 rounded-xl border border-border p-5">
          <h2 className="text-base font-semibold">Registry endpoints</h2>
          <ul className="text-muted-foreground mt-3 list-disc space-y-1 pl-5 text-sm">
            <li>
              <a
                className="text-primary hover:underline"
                href={toBaseAsset('/r/registry.json')}
              >
                /r/registry.json
              </a>
            </li>
            <li>
              <a
                className="text-primary hover:underline"
                href={toBaseAsset('/r/ui/button.json')}
              >
                /r/ui/button.json
              </a>
            </li>
            <li>
              <a
                className="text-primary hover:underline"
                href={toBaseAsset('/r/components/multi-select.json')}
              >
                /r/components/multi-select.json
              </a>
            </li>
          </ul>
        </section>

        <section className="bg-card mt-5 rounded-xl border border-border p-5">
          <h2 className="text-base font-semibold">
            Consumer{' '}
            <code className="text-muted-foreground text-xs">
              components.json
            </code>
          </h2>
          <pre className="bg-muted text-foreground mt-3 overflow-x-auto rounded-lg border border-border p-3 text-xs">
            {`{
  "registries": {
    "@ui": "https://dys-org.github.io/soardscn-ui/r/ui/{name}.json",
    "@components": "https://dys-org.github.io/soardscn-ui/r/components/{name}.json"
  }
}`}
          </pre>
        </section>

        <section className="bg-card mt-5 rounded-xl border border-border p-5">
          <h2 className="text-base font-semibold">Install example</h2>
          <pre className="bg-muted text-foreground mt-3 overflow-x-auto rounded-lg border border-border p-3 text-xs">
            {`pnpm dlx shadcn@latest add @ui/button
pnpm dlx shadcn@latest add @components/multi-select`}
          </pre>
        </section>
      </main>
    </div>
  )
}

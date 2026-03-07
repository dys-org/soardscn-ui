import { ComponentExample } from '@/app-components/component-example'
import { SiteNav } from '@/app-components/site-nav'

export function AppShowcasePage() {
  return (
    <div className="text-foreground">
      <header className="border-border border-b">
        <div className="mx-auto w-full max-w-6xl px-5 py-4">
          <SiteNav activePath="/showcase" />
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-5 py-10">
        <section className="mb-6 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            App showcase
          </h1>
          <p className="text-muted-foreground text-sm">
            Interactive examples built from the registry components.
          </p>
        </section>
        <ComponentExample />
      </main>
    </div>
  )
}

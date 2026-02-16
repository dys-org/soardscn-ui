import { SiteNav } from '@/app-components/site-nav'

export function NotFoundPage() {
  return (
    <div className="text-foreground">
      <header className="border-border border-b">
        <div className="mx-auto w-full max-w-6xl px-5 py-4">
          <SiteNav />
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 py-12">
        <section className="bg-card rounded-xl border border-border p-6">
          <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            The route you requested does not exist.
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <a className="text-primary hover:underline" href="#/">
              Go to home
            </a>
            <a className="text-primary hover:underline" href="#/showcase">
              Go to showcase
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

type SiteNavProps = {
  activePath?: '/' | '/showcase'
  className?: string
}

function navLinkClass(isActive: boolean) {
  return isActive
    ? 'text-primary font-medium underline'
    : 'text-primary font-medium hover:underline'
}

export function SiteNav({ activePath, className }: SiteNavProps) {
  return (
    <nav className={className} aria-label="Primary">
      <ul className="flex flex-wrap items-center gap-4 text-sm">
        <li>
          <a
            href="#/"
            className={navLinkClass(activePath === '/')}
            aria-current={activePath === '/' ? 'page' : undefined}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#/showcase"
            className={navLinkClass(activePath === '/showcase')}
            aria-current={activePath === '/showcase' ? 'page' : undefined}
          >
            Showcase
          </a>
        </li>
      </ul>
    </nav>
  )
}

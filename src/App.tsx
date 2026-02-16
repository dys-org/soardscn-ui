import { useEffect, useMemo, useState } from 'react'

import { AppShowcasePage } from '@/pages/app-showcase-page'
import { HomePage } from '@/pages/home-page'
import { NotFoundPage } from '@/pages/not-found-page'

type RoutePath = '/' | '/showcase' | '/404'

function getRouteFromHash(hash: string): RoutePath {
  const normalized = hash.replace(/^#/, '') || '/'

  if (normalized === '/') {
    return '/'
  }

  if (normalized === '/showcase' || normalized.startsWith('/showcase/')) {
    return '/showcase'
  }

  return '/404'
}

export function App() {
  const [route, setRoute] = useState(() => getRouteFromHash(window.location.hash))

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRouteFromHash(window.location.hash))
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const page = useMemo(() => {
    if (route === '/') {
      return <HomePage />
    }

    if (route === '/showcase') {
      return <AppShowcasePage />
    }

    return <NotFoundPage />
  }, [route])

  return page
}

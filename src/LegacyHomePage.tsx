import { useLayoutEffect, useRef } from 'react'
import { ensureLegacyStylesForHome, fireLegacyDomReady, loadLegacyScripts } from './legacyHomeBootstrap'

type LegacyHomePageProps = {
  markup: string
  /** BCP 47 language tag for &lt;html lang&gt; while this route is mounted */
  documentLang: string
}

export function LegacyHomePage({ markup, documentLang }: LegacyHomePageProps) {
  const hostRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = hostRef.current
    if (!el) return

    const previousLang = document.documentElement.getAttribute('lang')
    const previousTitle = document.title
    document.documentElement.lang = documentLang
    if (documentLang === 'fr') {
      document.title = 'DevOps Agency | Infrastructure cloud, CI/CD & plateforme'
    } else {
      document.title = 'DevOps Agency | Cloud infrastructure, CI/CD & platform engineering'
    }

    el.innerHTML = markup.trim()
    ensureLegacyStylesForHome()

    let cancelled = false
    void loadLegacyScripts().then(() => {
      if (!cancelled) fireLegacyDomReady()
    })

    return () => {
      cancelled = true
      el.innerHTML = ''
      if (previousLang != null) {
        document.documentElement.setAttribute('lang', previousLang)
      } else {
        document.documentElement.removeAttribute('lang')
      }
      document.title = previousTitle
    }
  }, [markup, documentLang])

  return <div ref={hostRef} className="legacy-home-root" />
}

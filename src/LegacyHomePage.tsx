import { useLayoutEffect, useRef } from 'react'
import { ensureLegacyStylesForHome, fireLegacyDomReady, loadLegacyScripts } from './legacyHomeBootstrap'

type LegacyHomePageProps = {
  markup: string
  /** BCP 47 language tag for &lt;html lang&gt; while this route is mounted */
  documentLang: string
  /** When set, used as document.title instead of the default home titles */
  pageTitle?: string
  /** Runs after markup is injected; safe to call on SPA navigations without re-injecting HTML */
  onAfterInject?: (host: HTMLDivElement) => void
}

export function LegacyHomePage({ markup, documentLang, pageTitle, onAfterInject }: LegacyHomePageProps) {
  const hostRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = hostRef.current
    if (!el) return

    const previousLang = document.documentElement.getAttribute('lang')
    const previousTitle = document.title
    document.documentElement.lang = documentLang
    if (pageTitle != null && pageTitle !== '') {
      document.title = pageTitle
    } else if (documentLang === 'fr') {
      document.title = 'DevOps Agence Digitale'
    } else {
      document.title = 'DevOps Agency'
    }

    el.innerHTML = markup.trim()
    ensureLegacyStylesForHome()

    let cancelled = false
    void loadLegacyScripts().then(() => {
      if (!cancelled) fireLegacyDomReady(el)
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
  }, [markup, documentLang, pageTitle])

  useLayoutEffect(() => {
    const el = hostRef.current
    if (!el || !markup.trim()) return
    onAfterInject?.(el)
  }, [markup, onAfterInject])

  return <div ref={hostRef} className="legacy-home-root" />
}

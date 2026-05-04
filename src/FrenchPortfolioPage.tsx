import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import p01 from './legacy-partials-fr/01-loader-content-open.html?raw'
import p02 from './legacy-partials-fr/02-header.html?raw'
import p03 from './legacy-partials-fr/03-mega-menus.html?raw'
import p04 from './legacy-partials-fr/04-portfolio-main.html?raw'
import p05 from './legacy-partials-fr/05-footer-blur-cursor.html?raw'
import p06 from './legacy-partials-fr/06-schema-popups-panel.html?raw'
import { LegacyHomePage } from './LegacyHomePage'
import { syncPortfolioCategoryActive } from './syncPortfolioNav'

const PORTFOLIO_MARKUP_FR = [p01, p02, p03, p04, p05, p06].join('\n')

export function FrenchPortfolioPage() {
  const location = useLocation()
  const onAfterInject = useCallback(
    (host: HTMLDivElement) => {
      syncPortfolioCategoryActive(host, location.pathname)
    },
    [location.pathname],
  )

  return (
    <LegacyHomePage
      markup={PORTFOLIO_MARKUP_FR}
      documentLang="fr"
      pageTitle="DevOps Agency | Portfolio"
      onAfterInject={onAfterInject}
    />
  )
}

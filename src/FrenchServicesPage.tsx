import p01 from './legacy-partials-fr/01-loader-content-open.html?raw'
import p02 from './legacy-partials-fr/02-header.html?raw'
import p03 from './legacy-partials-fr/03-mega-menus.html?raw'
import p04 from './legacy-partials-fr/04-services-main.html?raw'
import p05 from './legacy-partials-fr/05-footer-blur-cursor.html?raw'
import p06 from './legacy-partials-fr/06-schema-popups-panel.html?raw'
import { LegacyHomePage } from './LegacyHomePage'

const SERVICES_MARKUP_FR = [p01, p02, p03, p04, p05, p06].join('\n')

export function FrenchServicesPage() {
  return (
    <LegacyHomePage
      markup={SERVICES_MARKUP_FR}
      documentLang="fr"
      pageTitle="DevOps Agency | Services web & plateformes"
    />
  )
}

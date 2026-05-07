import p01 from './legacy-partials/01-loader-content-open.html?raw'
import p02 from './legacy-partials/02-header.html?raw'
import p03 from './legacy-partials/03-mega-menus.html?raw'
import p04 from './legacy-partials/04-privacy-main.html?raw'
import p05 from './legacy-partials/05-footer-blur-cursor.html?raw'
import p06 from './legacy-partials/06-schema-popups-panel.html?raw'
import { LegacyHomePage } from './LegacyHomePage'

const PRIVACY_MARKUP_EN = [p01, p02, p03, p04, p05, p06].join('\n')

export function PrivacyPage() {
  return (
    <LegacyHomePage
      markup={PRIVACY_MARKUP_EN}
      documentLang="en"
      pageTitle="DevOps Agency | Privacy Policy"
    />
  )
}

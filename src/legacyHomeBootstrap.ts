const LEGACY_STYLES = [
  '/css/vendors/bootstrap-grid.css',
  '/css/style.css',
  '/css/shared_file_css.css',
  '/css/custom_lang_css.css',
  '/css/form-style.css',
  '/css/legacy-react-home.css',
] as const

const LEGACY_SCRIPTS = ['/js/app-global.js', '/js/app-rest.js', '/js/app-form.js', '/js/legacy-react-bridge.js'] as const

let scriptsLoaded: Promise<void> | null = null

function ensureLink(href: string) {
  if (document.querySelector(`link[rel="stylesheet"][href="${href}"]`)) return
  const l = document.createElement('link')
  l.rel = 'stylesheet'
  l.href = href
  document.head.appendChild(l)
}

export function ensureLegacyStylesForHome() {
  LEGACY_STYLES.forEach(ensureLink)
}

function loadScriptOnce(src: string): Promise<void> {
  const existing = document.querySelector(`script[src="${src}"]`)
  if (existing) return Promise.resolve()

  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = src
    s.defer = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.body.appendChild(s)
  })
}

export function loadLegacyScripts(): Promise<void> {
  if (!scriptsLoaded) {
    scriptsLoaded = (async () => {
      for (const src of LEGACY_SCRIPTS) {
        await loadScriptOnce(src)
      }
    })()
  }
  return scriptsLoaded
}

export function fireLegacyDomReady() {
  document.dispatchEvent(new Event('DOMContentLoaded'))
  const w = window as Window & { _functions?: { videoSoundControl?: () => void } }
  if (typeof w._functions?.videoSoundControl === 'function') {
    w._functions.videoSoundControl()
  }
}

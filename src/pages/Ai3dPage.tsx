import { useEffect, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'

const KEYSHOT_SRC = '/models-3d/files/KeyShotXR.js'
const BOOTSTRAP_SRC = '/js/ai-3d-bootstrap.js'

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve()
      return
    }
    const s = document.createElement('script')
    s.src = src
    s.async = false
    s.onload = () => resolve()
    s.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.body.appendChild(s)
  })
}

export function Ai3dPage() {
  useLayoutEffect(() => {
    document.body.classList.add('ai-3d-route')
    return () => {
      document.body.classList.remove('ai-3d-route')
    }
  }, [])

  useEffect(() => {
    let style = document.getElementById('ai-3d-styles') as HTMLLinkElement | null
    if (!style) {
      style = document.createElement('link')
      style.id = 'ai-3d-styles'
      style.rel = 'stylesheet'
      style.href = '/css/ai-3d.css'
      document.head.appendChild(style)
    }

    const el = document.getElementById('KeyShotXR')
    if (el) el.innerHTML = ''

    let cancelled = false
    void (async () => {
      try {
        await loadScript(KEYSHOT_SRC)
        await loadScript(BOOTSTRAP_SRC)
        if (cancelled) return
        window.__initAi3dKeyshot?.()
      } catch (e) {
        console.error(e)
      }
    })()

    return () => {
      cancelled = true
      const k = document.getElementById('KeyShotXR')
      if (k) k.innerHTML = ''
    }
  }, [])

  return (
    <div className="ai-3d-page" onContextMenu={(e) => e.preventDefault()}>
      <nav className="ai-3d-page__nav" aria-label="Page">
        <Link to="/">← Home</Link>
      </nav>
      <div id="KeyShotXR" />
    </div>
  )
}

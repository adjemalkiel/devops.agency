/**
 * Download static assets referenced by legacy partials (and the live redstone homepage)
 * from https://redstone.agency into /public when missing locally.
 *
 * Live site filenames drift from older template exports; merging homepage URLs reduces 404s.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const PUBLIC = path.join(ROOT, 'public')
const PARTIALS = path.join(ROOT, 'src', 'legacy-partials')
const BASE = 'https://redstone.agency'

const EXTRA = [
  '/fonts/Onest-VariableFont_wght.woff2',
  '/fonts/TwidGrotesk-Regular.woff2',
  '/img/favicon.ico',
  '/img/seo-img.jpg',
]

/** Live HTML references these but the host returns 404. */
const SKIP_LIVE_404 = new Set(['/img/wish-flowers-prev.png'])

const ATTR_RE =
  /(?:src|srcset|href|poster|data-src|data-src-mob)=["']([^"']+)["']/gi
const URL_PARENS_RE = /url\(\s*['"]?(\/[^)'"]+)['"]?\s*\)/gi

function normPath(p) {
  const s = p.trim().split('#')[0].split('?')[0]
  if (!/^\/(img|video|fonts)\//i.test(s)) return null
  return s.replace(/\\/g, '/')
}

function fromSrcset(val) {
  const out = []
  for (const part of val.split(',')) {
    const url = part.trim().split(/\s+/)[0]
    if (url) out.push(url)
  }
  return out
}

function collectFromText(t) {
  const set = new Set()
  let m
  ATTR_RE.lastIndex = 0
  while ((m = ATTR_RE.exec(t))) {
    const raw = m[1]
    for (const piece of fromSrcset(raw)) {
      const n = normPath(piece)
      if (n) set.add(n)
    }
  }
  URL_PARENS_RE.lastIndex = 0
  while ((m = URL_PARENS_RE.exec(t))) {
    const n = normPath(m[1])
    if (n) set.add(n)
  }
  return set
}

function walkHtml(dir) {
  const names = fs.readdirSync(dir)
  const all = new Set()
  for (const name of names) {
    if (!name.endsWith('.html')) continue
    const p = path.join(dir, name)
    const t = fs.readFileSync(p, 'utf8')
    collectFromText(t).forEach((x) => all.add(x))
  }
  return all
}

async function fetchLivePaths() {
  const res = await fetch(BASE + '/', { redirect: 'follow' })
  if (!res.ok) {
    console.warn(`Could not fetch live homepage: ${res.status}`)
    return new Set()
  }
  const text = await res.text()
  return collectFromText(text)
}

async function fetchToDisk(rel, { timeoutMs }) {
  const dest = path.join(PUBLIC, rel.replace(/^\//, ''))
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
    return { rel, skipped: true }
  }
  const url = new URL(rel, BASE).href
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  const ctrl = new AbortController()
  const tid = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const res = await fetch(url, { signal: ctrl.signal, redirect: 'follow' })
    if (!res.ok) {
      return { rel, error: `${res.status} ${res.statusText}` }
    }
    const buf = Buffer.from(await res.arrayBuffer())
    fs.writeFileSync(dest, buf)
    return { rel, ok: true, bytes: buf.length }
  } catch (e) {
    return { rel, error: e.message || String(e) }
  } finally {
    clearTimeout(tid)
  }
}

const VIDEO_TIMEOUT = 300_000
const DEFAULT_TIMEOUT = 120_000

;(async () => {
  const live = await fetchLivePaths()
  for (const x of SKIP_LIVE_404) live.delete(x)
  const paths = new Set([...walkHtml(PARTIALS), ...EXTRA, ...live])
  const sorted = [...paths].sort()
  console.log(`Unique asset paths (partials + live homepage + extras): ${sorted.length}`)

  const results = { ok: 0, skip: 0, fail: [] }

  for (const rel of sorted) {
    const t = rel.startsWith('/video/') ? VIDEO_TIMEOUT : DEFAULT_TIMEOUT
    const r = await fetchToDisk(rel, { timeoutMs: t })
    if (r.skipped) {
      results.skip++
      console.log(`skip ${rel}`)
    } else if (r.ok) {
      results.ok++
      console.log(`ok   ${rel} (${r.bytes} bytes)`)
    } else {
      results.fail.push(r)
      console.error(`FAIL ${rel}: ${r.error}`)
    }
  }
  console.log('\n---')
  console.log(
    `Downloaded: ${results.ok}, skipped (exists): ${results.skip}, failed: ${results.fail.length}`,
  )
  if (results.fail.length) {
    process.exitCode = 1
  }
})()

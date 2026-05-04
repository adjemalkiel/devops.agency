/**
 * Copies all non-HTML files from /template to /public so local assets match the template export.
 *
 * Skips files we maintain in-repo (DevOps branding, AI-3D helpers, Vite defaults).
 *
 * Note: The template snapshot only includes a subset of what the full redstone HTML references
 * (e.g. most /video/*.mp4 and many /img/*). Those cannot be restored from template/ — you need
 * the full media bundle from the original project if you require them.
 *
 * To fill gaps from the live Redstone site: `npm run assets:redstone`
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const TEMPLATE = path.join(ROOT, 'template')
const PUBLIC = path.join(ROOT, 'public')

/** Relative POSIX paths: never overwrite these from template (project-specific). */
const PRESERVE = new Set([
  'js/app-global.js',
  'js/app-rest.js',
  'js/ai-3d-bootstrap.js',
  'css/ai-3d.css',
  'css/legacy-react-home.css',
  'inc/popups/_popups/index.html',
  'img/devops-logo-small_black.svg',
  'img/devops-logo-small_white.svg',
  'favicon.svg',
  'icons.svg',
])

function toPosix(p) {
  return p.split(path.sep).join('/')
}

function walkFiles(dir, base = '') {
  const out = []
  for (const name of fs.readdirSync(dir)) {
    const rel = path.join(base, name)
    const full = path.join(dir, name)
    const st = fs.statSync(full)
    if (st.isDirectory()) out.push(...walkFiles(full, rel))
    else out.push({ full, rel: toPosix(rel) })
  }
  return out
}

function main() {
  if (!fs.existsSync(TEMPLATE)) {
    console.error('Missing folder:', TEMPLATE)
    process.exit(1)
  }

  let copied = 0
  let skippedPreserve = 0
  let skippedHtml = 0

  for (const { full, rel } of walkFiles(TEMPLATE)) {
    if (rel.endsWith('.html')) {
      skippedHtml++
      continue
    }
    if (PRESERVE.has(rel)) {
      skippedPreserve++
      continue
    }
    const dest = path.join(PUBLIC, ...rel.split('/'))
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.copyFileSync(full, dest)
    copied++
  }

  console.log(
    JSON.stringify(
      {
        copied,
        skippedHtml,
        skippedPreserve,
        templateDir: TEMPLATE,
        publicDir: PUBLIC,
      },
      null,
      2,
    ),
  )
}

main()

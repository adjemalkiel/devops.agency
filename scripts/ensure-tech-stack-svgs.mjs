/**
 * Placeholder tech logos (template export omits /img/*.svg stack icons referenced in the homepage).
 * Replace with real brand SVGs when available.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const IMG = path.resolve(__dirname, '../public/img')

const labels = {
  html: 'H5',
  css: 'CSS',
  wordpress: 'WP',
  shopify: 'S',
  laravel: 'Lv',
  mysql: 'SQL',
  vue: 'Vu',
  php: 'php',
  react: 'Rx',
  azure: 'Az',
  python: 'Py',
  angular: 'Ng',
  nodejs: 'node',
}

function svg(label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" aria-hidden="true">
  <rect width="40" height="40" rx="6" fill="rgba(255,255,255,0.06)"/>
  <text x="20" y="25" text-anchor="middle" fill="currentColor" font-size="10" font-weight="600" font-family="system-ui,sans-serif">${label}</text>
</svg>
`
}

for (const [name, label] of Object.entries(labels)) {
  const dest = path.join(IMG, `${name}.svg`)
  if (!fs.existsSync(dest)) fs.writeFileSync(dest, svg(label), 'utf8')
}

console.log('Tech placeholder SVGs ensured under public/img/')

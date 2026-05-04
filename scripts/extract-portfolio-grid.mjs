import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const en = fs.readFileSync(
  path.join(root, 'src/legacy-partials/04-home-main.html'),
  'utf8',
)
const fr = fs.readFileSync(
  path.join(root, 'src/legacy-partials-fr/04-home-main.html'),
  'utf8',
)

const re =
  /<div class="project-grid type-2 animate" data-animate='\{"target": "\.slideAnim", "delay":200\}'>\s*([\s\S]*?)\s*<\/div>\s*\n\s*<div class="project-counter-wrap/

for (const [name, html] of [
  ['_portfolio-grid-en-snippet.html', en],
  ['_portfolio-grid-fr-snippet.html', fr],
]) {
  const m = html.match(re)
  if (!m) {
    console.error('No match:', name)
    process.exit(1)
  }
  fs.writeFileSync(path.join(root, 'src', name), m[1].trimEnd() + '\n')
  console.log(name, m[1].length)
}

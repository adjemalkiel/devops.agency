import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

const files = [
  ['src/legacy-partials/04-home-main.html', '_awards-customer-en.html'],
  ['src/legacy-partials-fr/04-home-main.html', '_awards-customer-fr.html'],
]

const customerRe =
  /    <div class="section customer-section">[\s\S]*?(?=\r?\n    <div class="section">\r?\n        <div class="container">\r?\n            <div class="faq-block)/

for (const [relPath, custOut] of files) {
  const html = await fs.readFile(path.join(root, relPath), 'utf8')
  const custMatch = html.match(customerRe)
  if (!custMatch) {
    console.error('Customer section not found:', relPath)
    process.exit(1)
  }
  await fs.writeFile(path.join(root, 'src', custOut), custMatch[0] + '\n', 'utf8')
  console.log('OK', relPath, custMatch[0].length)
}

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

const files = [
  ['src/legacy-partials/04-home-main.html', '_about-projects-en.html', '_about-tsm-en.html', '_about-customer-en.html'],
  ['src/legacy-partials-fr/04-home-main.html', '_about-projects-fr.html', '_about-tsm-fr.html', '_about-customer-fr.html'],
]

/** Project grid + counter strip; ends before SERVICES (lookahead only — do not capture next section) */
const projectRe =
  /<div class="project-grid type-2 animate"[\s\S]*?<div class="project-counter-wrap slideUp">[\s\S]*?<\/div>\s*\n\s*<\/div>\s*\n\s*<\/div>(?=\s*\n\s*\n\s*<div class="section">\s*\n\s*<div class="container">\s*\n\s*<h2 class="h1 title col-xl-10 mb-md text-animate">SERVICES<\/h2>)/

/** Testimonials block through section end before AI block */
const tsmRe =
  /    <div class="section">\r?\n        <div class="container">\r?\n            <div class="tsm-block">[\s\S]*?\r?\n        <\/div>\r?\n    <\/div>\r?\n<div class="section">\r?\n    <div class="container">\r?\n        <div class="ai-block">/

const customerRe =
  /    <div class="section customer-section">[\s\S]*?(?=\r?\n    <div class="section">\r?\n        <div class="container">\r?\n            <div class="faq-block)/

for (const [relPath, projOut, tsmOut, custOut] of files) {
  const html = await fs.readFile(path.join(root, relPath), 'utf8')
  const projMatch = html.match(projectRe)
  const tsmMatch = html.match(tsmRe)
  const custMatch = html.match(customerRe)
  if (!projMatch) {
    console.error('Project block not found:', relPath)
    process.exit(1)
  }
  if (!tsmMatch) {
    console.error('Testimonials block not found:', relPath)
    process.exit(1)
  }
  if (!custMatch) {
    console.error('Customer section not found:', relPath)
    process.exit(1)
  }
  await fs.writeFile(path.join(root, 'src', projOut), projMatch[0] + '\n', 'utf8')
  await fs.writeFile(path.join(root, 'src', tsmOut), tsmMatch[0].replace(/\r?\n<div class="section">\r?\n    <div class="container">\r?\n        <div class="ai-block">$/, '\n'), 'utf8')
  await fs.writeFile(path.join(root, 'src', custOut), custMatch[0] + '\n', 'utf8')
  console.log('OK', relPath, projMatch[0].length, tsmMatch[0].length, custMatch[0].length)
}

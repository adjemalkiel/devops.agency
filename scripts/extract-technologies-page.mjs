import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

const files = [
  [
    'src/legacy-partials/04-home-main.html',
    '_tech-block-en.html',
    '_tech-marquee-en.html',
    '_tech-customer-en.html',
  ],
  [
    'src/legacy-partials-fr/04-home-main.html',
    '_tech-block-fr.html',
    '_tech-marquee-fr.html',
    '_tech-customer-fr.html',
  ],
]

const techRe =
  /    <div class="section">\r?\n        <div class="container">\r?\n            <div class="tech-block">[\s\S]*?(?=\r?\n\r?\n<div class="section form-section" style="display: none;">)/

/** Same block as template/index.html — between SERVICES and testimonials on home */
const marqueeRe =
  /    <div class="section marquee-logos">[\s\S]*?(?=\r?\n\s*<div class="section">\r?\n\s*<div class="container">\r?\n\s*<div class="tsm-block">)/

const customerRe =
  /    <div class="section customer-section">[\s\S]*?(?=\r?\n    <div class="section">\r?\n        <div class="container">\r?\n            <div class="faq-block)/

/** Keep template `tech-content` CTA; fix legacy PHP link and relative icon paths */
function fixTechHubMarkup(html, isFr) {
  const servicesHref = isFr ? '/fr/services/' : '/services/'
  return html
    .replace(/href="technologies\.php"/g, `href="${servicesHref}"`)
    .replace(/<use xlink:href="img\/icons\//g, '<use xlink:href="/img/icons/')
}

for (const [relPath, techOut, marqueeOut, custOut] of files) {
  const html = await fs.readFile(path.join(root, relPath), 'utf8')
  const techMatch = html.match(techRe)
  const marqueeMatch = html.match(marqueeRe)
  const custMatch = html.match(customerRe)
  const isFr = relPath.includes('legacy-partials-fr')
  if (!techMatch) {
    console.error('Tech block not found:', relPath)
    process.exit(1)
  }
  if (!marqueeMatch) {
    console.error('Marquee block not found:', relPath)
    process.exit(1)
  }
  if (!custMatch) {
    console.error('Customer section not found:', relPath)
    process.exit(1)
  }
  const techBody = fixTechHubMarkup(techMatch[0], isFr)
  await fs.writeFile(path.join(root, 'src', techOut), techBody + '\n', 'utf8')
  await fs.writeFile(path.join(root, 'src', marqueeOut), marqueeMatch[0] + '\n', 'utf8')
  await fs.writeFile(path.join(root, 'src', custOut), custMatch[0] + '\n', 'utf8')
  console.log('OK', relPath, techBody.length, marqueeMatch[0].length, custMatch[0].length)
}

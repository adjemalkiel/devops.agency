import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

const files = [
  ['src/legacy-partials/04-home-main.html', '_services-svc-en.html', '_services-tail-en.html'],
  ['src/legacy-partials-fr/04-home-main.html', '_services-svc-fr.html', '_services-tail-fr.html'],
]

const svcRe =
  /    <div class="section">\r?\n        <div class="container">\r?\n            <h2 class="h1 title col-xl-10 mb-md text-animate">SERVICES<\/h2>[\s\S]*?(?=\r?\n \r?\n    <div class="section marquee-logos">)/

/** Same as template/index.html after SERVICES: marquee, testimonials, AI, tech, customer, FAQ */
const tailRe = /\r?\n    <div class="section marquee-logos">[\s\S]*?(?=\r?\n<\/main>)/

/** Template is canonical for imagery/video; keep French copy and links from the home partial. */
function syncServiceMediaFromTemplate(localSvcHtml, templateSvcHtml) {
  const scanRe = /<a class="service-media" href="(\/services\/[^"]+\/)">([\s\S]*?)<\/a>/g
  const mediaByHref = new Map()
  for (const m of templateSvcHtml.matchAll(scanRe)) {
    mediaByHref.set(m[1], m[2])
  }
  const replRe = /<a class="service-media" href="(\/services\/[^"]+\/)">([\s\S]*?)<\/a>/g
  return localSvcHtml.replace(replRe, (full, href) => {
    const inner = mediaByHref.get(href)
    return inner !== undefined ? `<a class="service-media" href="${href}">${inner}</a>` : full
  })
}

function fixStaticPaths(html) {
  return html.replace(/<use xlink:href="img\/icons\//g, '<use xlink:href="/img/icons/')
}

const templateHtml = await fs.readFile(path.join(root, 'template/index.html'), 'utf8')
const templateSvcMatch = templateHtml.match(svcRe)
if (!templateSvcMatch) {
  console.error('Service section not found in template/index.html')
  process.exit(1)
}
const templateSvc = templateSvcMatch[0]

for (const [relPath, svcOut, tailOut] of files) {
  const html = await fs.readFile(path.join(root, relPath), 'utf8')
  const isFr = relPath.includes('legacy-partials-fr')
  const homeSvcMatch = html.match(svcRe)
  const tailMatch = html.match(tailRe)
  if (!homeSvcMatch) {
    console.error('Service section not found:', relPath)
    process.exit(1)
  }
  if (!tailMatch) {
    console.error('Marquee→FAQ tail not found:', relPath)
    process.exit(1)
  }
  let svcBody = isFr ? syncServiceMediaFromTemplate(homeSvcMatch[0], templateSvc) : templateSvc
  svcBody = fixStaticPaths(svcBody)

  let tail = fixStaticPaths(tailMatch[0])
  const techHref = isFr ? '/fr/technologies/' : '/technologies/'
  tail = tail.replaceAll('href="technologies.php"', `href="${techHref}"`)

  await fs.writeFile(path.join(root, 'src', svcOut), svcBody + '\n', 'utf8')
  await fs.writeFile(path.join(root, 'src', tailOut), tail + '\n', 'utf8')
  console.log('OK', relPath, svcBody.length, tail.length)
}

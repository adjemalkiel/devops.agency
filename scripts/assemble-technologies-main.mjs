import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

const enHead = `        <main>
            <div class="section archive_page mt-xxl">
                <div class="container">
                    <nav class="breadcrumbs" aria-label="Breadcrumb">
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li class="is-active">Technologies</li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div class="section seo-section">
                <div class="container">
                    <div class="seo-block">
                        <h1 class="h3 title col-xl-6 col-lg-8">Technologies</h1>
                        <article class="seo-content text text-sm">
                            <div class="text text-sm">
                                <p>Today, every business needs a credible presence on the web. The right stack—design tools, frontend frameworks, cloud services, and automation—is what turns ideas into products that stay fast, secure, and maintainable.</p>
                                <p class="mt-md">We combine strong UX, disciplined engineering, and reliable delivery so your platform not only looks right but behaves correctly under real traffic and changing requirements.</p>
                            </div>
                        </article>

                        <div class="btn btn-s btn-primary seo-btn">
                            <div class="btn-text" data-toggle-more="Read more" data-toggle-less="Read less"></div>
                            <div class="btn-icon">
                                <svg width="24" height="24">
                                    <use xlink:href="/img/icons/icons_global.svg#arrow-left" fill="none"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
`

const frHead = `        <main>
            <div class="section archive_page mt-xxl">
                <div class="container">
                    <nav class="breadcrumbs" aria-label="Fil d’Ariane">
                        <ul>
                            <li><a href="/fr">Accueil</a></li>
                            <li class="is-active">Technologies</li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div class="section seo-section">
                <div class="container">
                    <div class="seo-block">
                        <h1 class="h3 title col-xl-6 col-lg-8">Technologies</h1>
                        <article class="seo-content text text-sm">
                            <div class="text text-sm">
                                <p>Aujourd’hui, une présence web crédible repose sur un stack cohérent&nbsp;: design, front-end, cloud et automatisation. Ce socle transforme une idée en produit performant, sécurisé et maintenable.</p>
                                <p class="mt-md">Nous associons UX exigeante, ingénierie solide et delivery fiable pour que votre plateforme tienne la charge et évolue avec votre roadmap.</p>
                            </div>
                        </article>

                        <div class="btn btn-s btn-primary seo-btn">
                            <div class="btn-text" data-toggle-more="Lire la suite" data-toggle-less="Lire moins"></div>
                            <div class="btn-icon">
                                <svg width="24" height="24">
                                    <use xlink:href="/img/icons/icons_global.svg#arrow-left" fill="none"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
`

const enMid = `
    <div class="section">
        <div class="container">
            <div class="mb-xl col-xl-10">
                <p class="text text-sm mb-md">DevOps Agency doesn’t just assemble pages—we help teams ship platforms, integrations, and operations that hold up in production.</p>
                <a class="btn btn-m btn-secondary" href="/portfolio/">
                    <div class="btn-text">View Portfolio</div>
                    <div class="btn-icon">
                        <svg width="24" height="24">
                            <use xlink:href="/img/icons/icons_global.svg#arrow-left" fill="none"></use>
                        </svg>
                    </div>
                </a>
            </div>
        </div>
    </div>
`

const frMid = `
    <div class="section">
        <div class="container">
            <div class="mb-xl col-xl-10">
                <p class="text text-sm mb-md">DevOps Agency ne se contente pas d’assembler des pages&nbsp;: nous aidons les équipes à livrer plateformes, intégrations et exploitation qui tiennent en production.</p>
                <a class="btn btn-m btn-secondary" href="/fr/portfolio/">
                    <div class="btn-text">Voir le portfolio</div>
                    <div class="btn-icon">
                        <svg width="24" height="24">
                            <use xlink:href="/img/icons/icons_global.svg#arrow-left" fill="none"></use>
                        </svg>
                    </div>
                </a>
            </div>
        </div>
    </div>
`

const techEn = await fs.readFile(path.join(root, 'src/_tech-block-en.html'), 'utf8')
const techFr = await fs.readFile(path.join(root, 'src/_tech-block-fr.html'), 'utf8')
const marqueeEn = await fs.readFile(path.join(root, 'src/_tech-marquee-en.html'), 'utf8')
const marqueeFr = await fs.readFile(path.join(root, 'src/_tech-marquee-fr.html'), 'utf8')
const custEn = await fs.readFile(path.join(root, 'src/_tech-customer-en.html'), 'utf8')
const custFr = await fs.readFile(path.join(root, 'src/_tech-customer-fr.html'), 'utf8')

const enMain = `${enHead}\n${techEn}\n${marqueeEn}\n${enMid}\n${custEn}\n        </main>\n`
const frMain = `${frHead}\n${techFr}\n${marqueeFr}\n${frMid}\n${custFr}\n        </main>\n`

await fs.writeFile(path.join(root, 'src/legacy-partials/04-technologies-main.html'), enMain, 'utf8')
await fs.writeFile(path.join(root, 'src/legacy-partials-fr/04-technologies-main.html'), frMain, 'utf8')

console.log('Wrote 04-technologies-main.html (en + fr)')

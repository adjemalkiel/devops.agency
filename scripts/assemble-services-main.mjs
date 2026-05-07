import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

/** Top of services main: breadcrumbs only, then template-style seo-block (template/index.html). */
const enHead = `        <main>
            <div class="section archive_page mt-xxl">
                <div class="container">
                    <nav class="breadcrumbs" aria-label="Breadcrumb">
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li class="is-active">Services</li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div class="section seo-section">
                <div class="container">
                    <div class="seo-block">
                        <h1 class="h3 title col-xl-6 col-lg-8">Custom CRM, design, apps &amp; web development | DevOps Agency</h1>
                        <article class="seo-content text text-sm">
                            <div class="text text-sm">
                                <p>Every serious business needs a credible presence on the web. Modern websites and applications are how you sell products, promote services, and prove your expertise. We focus on high-quality delivery: design systems, robust engineering, and reliable operations.</p>
                                <p class="mt-md">These projects are rarely simple. They need the right technologies, clear requirements, and a team that can execute end to end. From first workshop to launch and ongoing support, we help you ship experiences that perform today and stay adaptable tomorrow.</p>
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
                            <li class="is-active">Services</li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div class="section seo-section">
                <div class="container">
                    <div class="seo-block">
                        <h1 class="h3 title col-xl-6 col-lg-8">CRM sur mesure, design, apps &amp; développement web | DevOps Agency</h1>
                        <article class="seo-content text text-sm">
                            <div class="text text-sm">
                                <p>Toute entreprise ambitieuse a besoin d’une présence web crédible. Sites et applications modernes permettent de vendre, présenter vos services et renforcer la confiance. Notre priorité est une exécution exigeante&nbsp;: design cohérent, ingénierie solide et exploitation fiable.</p>
                                <p class="mt-md">Ces projets sont rarement triviaux. Ils exigent les bons outils, un cadrage clair et une équipe capable de livrer de bout en bout. De l’atelier initial au lancement puis au run, nous vous aidons à livrer des expériences performantes et évolutives.</p>
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

const enSvc = await fs.readFile(path.join(root, 'src/_services-svc-en.html'), 'utf8')
const enTail = await fs.readFile(path.join(root, 'src/_services-tail-en.html'), 'utf8')
const frSvc = await fs.readFile(path.join(root, 'src/_services-svc-fr.html'), 'utf8')
const frTail = await fs.readFile(path.join(root, 'src/_services-tail-fr.html'), 'utf8')

const enMain = `${enHead}\n${enSvc}\n${enTail}\n        </main>\n`
const frMain = `${frHead}\n${frSvc}\n${frTail}\n        </main>\n`

await fs.writeFile(path.join(root, 'src/legacy-partials/04-services-main.html'), enMain, 'utf8')
await fs.writeFile(path.join(root, 'src/legacy-partials-fr/04-services-main.html'), frMain, 'utf8')

console.log('Wrote 04-services-main.html (en + fr)')

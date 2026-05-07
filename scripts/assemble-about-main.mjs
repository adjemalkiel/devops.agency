import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

const enIntro = `        <main>
            <div class="section archive_page mt-xxl">
                <div class="container">
                    <nav class="breadcrumbs" aria-label="Breadcrumb">
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li class="is-active">About</li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div class="section seo-section">
                <div class="container">
                    <div class="seo-block">
                        <h1 class="h3 title col-xl-6 col-lg-8">About DevOps Agency</h1>
                        <article class="seo-content text text-sm">
                            <div class="text text-sm">
                                <p>Today, every serious product needs a credible web presence and engineering discipline behind it. Design, solid technical delivery, and clear go-to-market execution have to work together — that mix is what clients remember and what keeps platforms healthy after launch.</p>
                                <p class="mt-md">We are a focused team of designers, engineers, and operators. We help organizations ship websites, applications, and internal tools with predictable quality: automated delivery, observable systems, and room to iterate.</p>
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

const frIntro = `        <main>
            <div class="section archive_page mt-xxl">
                <div class="container">
                    <nav class="breadcrumbs" aria-label="Fil d’Ariane">
                        <ul>
                            <li><a href="/fr">Accueil</a></li>
                            <li class="is-active">À propos</li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div class="section seo-section">
                <div class="container">
                    <div class="seo-block">
                        <h1 class="h3 title col-xl-6 col-lg-8">À propos de DevOps Agency</h1>
                        <article class="seo-content text text-sm">
                            <div class="text text-sm">
                                <p>Chaque produit sérieux mérite une présence web crédible et une ingénierie disciplinée. Design, delivery technique et exécution marché doivent fonctionner ensemble — c’est ce qui marque les esprits et garde les plateformes stables après le lancement.</p>
                                <p class="mt-md">Nous sommes une équipe de designers, développeurs et opérateurs. Nous aidons les organisations à livrer sites, applications et outils internes avec une qualité prévisible&nbsp;: livraison automatisée, systèmes observables et capacité d’itération.</p>
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

const enAwardsTeaser = `
    <div class="section">
        <div class="container col-xl-10 mx-auto">
            <h2 class="h2 title mb-md text-animate">Awards — inspiration for new projects</h2>
            <p class="text text-sm mb-lg">Industry recognition and client feedback push us to keep raising the bar. See highlights, case studies, and reviews on our awards page.</p>
            <a class="btn btn-m btn-secondary" href="/awards/">
                <div class="btn-text">View awards &amp; reviews</div>
                <div class="btn-icon">
                    <svg width="24" height="24">
                        <use xlink:href="/img/icons/icons_global.svg#arrow-left" fill="none"></use>
                    </svg>
                </div>
            </a>
        </div>
    </div>
`

const frAwardsTeaser = `
    <div class="section">
        <div class="container col-xl-10 mx-auto">
            <h2 class="h2 title mb-md text-animate">Prix &amp; avis — inspiration pour les prochains projets</h2>
            <p class="text text-sm mb-lg">La reconnaissance du secteur et les retours clients nous poussent à viser plus haut. Retrouvez sélections, études de cas et avis sur la page dédiée.</p>
            <a class="btn btn-m btn-secondary" href="/fr/awards/">
                <div class="btn-text">Voir prix &amp; avis</div>
                <div class="btn-icon">
                    <svg width="24" height="24">
                        <use xlink:href="/img/icons/icons_global.svg#arrow-left" fill="none"></use>
                    </svg>
                </div>
            </a>
        </div>
    </div>
`

const projEn = await fs.readFile(path.join(root, 'src/_about-projects-en.html'), 'utf8')
const projFr = await fs.readFile(path.join(root, 'src/_about-projects-fr.html'), 'utf8')
const tsmEn = await fs.readFile(path.join(root, 'src/_about-tsm-en.html'), 'utf8')
const tsmFr = await fs.readFile(path.join(root, 'src/_about-tsm-fr.html'), 'utf8')
const custEn = await fs.readFile(path.join(root, 'src/_about-customer-en.html'), 'utf8')
const custFr = await fs.readFile(path.join(root, 'src/_about-customer-fr.html'), 'utf8')

const enMore = `    <div class="section">
        <div class="container">
            <div class="headline mb-md text-animate slideUp">
                <div class="headline-word">We are </div>                
                                            <div class="headline-media">
                            <div class="video video-present">
                                <video muted playsinline loop preload poster="/img/banner-video-220x140.webp" src="#" data-src="/video/video-banner_s.mp4" data-src-mob="/video/video-banner_s.mp4"></video>
                            </div>
                        </div>
                                    <div class="headline-word">proud</div>            </div>

  
${projEn}
`

const frMore = `    <div class="section">
        <div class="container">
            <div class="headline mb-md text-animate slideUp">
                <div class="headline-word">Nous sommes </div>                
                                            <div class="headline-media">
                            <div class="video video-present">
                                <video muted playsinline loop preload poster="/img/banner-video-220x140.webp" src="#" data-src="/video/video-banner_s.mp4" data-src-mob="/video/video-banner_s.mp4"></video>
                            </div>
                        </div>
                                    <div class="headline-word">fiers</div>            </div>

  
${projFr}
`

const enMain = `${enIntro}\n${enMore}\n${custEn}\n${enAwardsTeaser}\n${tsmEn}\n        </main>\n`
const frMain = `${frIntro}\n${frMore}\n${custFr}\n${frAwardsTeaser}\n${tsmFr}\n        </main>\n`

await fs.writeFile(path.join(root, 'src/legacy-partials/04-about-main.html'), enMain, 'utf8')
await fs.writeFile(path.join(root, 'src/legacy-partials-fr/04-about-main.html'), frMain, 'utf8')

console.log('Wrote 04-about-main.html (en + fr)')

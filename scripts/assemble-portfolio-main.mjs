import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

const enSnippet = await fs.readFile(
  path.join(root, 'src/_portfolio-grid-en-snippet.html'),
  'utf8',
)
const frSnippet = await fs.readFile(
  path.join(root, 'src/_portfolio-grid-fr-snippet.html'),
  'utf8',
)

const enHead = `        <main>
            <div class="section archive_page mt-xxl">
                <div class="container">
                    <nav class="breadcrumbs" aria-label="Breadcrumb">
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li class="is-active">Portfolio</li>
                        </ul>
                    </nav>

                    <h1 class="h1 title col-xl-11 mb-md">DevOps Agency — Your Reliable Digital Partner</h1>

                    <article class="text text-sm mb-xl col-xl-10 col-lg-11 seo-content">
                        <p>Today, every business needs a strong online presence and digital systems that work as hard as their teams. Through modern websites, product platforms, and cloud delivery, you can showcase your offer, serve customers, and scale operations with confidence.</p>
                        <p class="mt-md">Building and operating these experiences is complex work. It requires designers, engineers, and operators who understand web development, infrastructure, automation, and quality at depth. That is why teams choose specialists: to ship faster, stay secure, and keep improving after launch.</p>
                    </article>

                    <nav class="sub-links" aria-label="Portfolio categories">
                        <ul>
                            <li><a href="/portfolio/">All projects</a></li>
                            <li><a href="/portfolio/new-projects/">New projects</a></li>
                            <li><a href="/portfolio/creative/">Creative</a></li>
                            <li><a href="/portfolio/real-estate/">Real estate</a></li>
                            <li><a href="/portfolio/marketing-corporate/">Marketing / Corporate</a></li>
                            <li><a href="/portfolio/landing-page/">Landing page</a></li>
                            <li><a href="/portfolio/online-store/">Online store</a></li>
                            <li><a href="/portfolio/food-delivery/">Food delivery</a></li>
                            <li><a href="/portfolio/dentistry/">Dentistry</a></li>
                            <li><a href="/portfolio/manufacturers/">Manufacturers</a></li>
                            <li><a href="/portfolio/branding/">Branding</a></li>
                            <li><a href="/portfolio/web/">Web solution</a></li>
                            <li><a href="/portfolio/entertainment-leisure/">Entertainment / Leisure</a></li>
                        </ul>
                    </nav>

                    <div class="project-grid animate mt-xl mb-xl" data-animate='{"target": ".slideAnim", "delay":200}'>
`

const enTail = `
                    </div>

                    <div class="text text-sm mb-lg col-xl-9">Let’s move your next release forward together.</div>
                    <div class="btn btn-l btn-primary open-popup mb-xxl" data-rel="popup-form">
                        <div class="btn-text">Discuss the Project</div>
                        <div class="btn-icon">
                            <svg width="24" height="24">
                                <use xlink:href="/img/icons/icons_global.svg#arrow-left" fill="none"></use>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </main>
`

const frHead = `        <main>
            <div class="section archive_page mt-xxl">
                <div class="container">
                    <nav class="breadcrumbs" aria-label="Fil d’Ariane">
                        <ul>
                            <li><a href="/fr">Accueil</a></li>
                            <li class="is-active">Portfolio</li>
                        </ul>
                    </nav>

                    <h1 class="h1 title col-xl-11 mb-md">DevOps Agency — votre partenaire digital de confiance</h1>

                    <article class="text text-sm mb-xl col-xl-10 col-lg-11 seo-content">
                        <p>Aujourd’hui, chaque entreprise a besoin d’une présence en ligne solide et de systèmes numériques à la hauteur de ses enjeux. Sites modernes, plateformes produit et automatisation du delivery permettent de présenter votre offre, servir vos clients et gagner en efficacité.</p>
                        <p class="mt-md">Concevoir, livrer et exploiter ces expériences demande une vraie expertise — design, développement, infrastructure et qualité. C’est pourquoi les équipes font appel à des spécialistes : pour accélérer les mises en ligne, renforcer la sécurité et continuer à améliorer le produit après le go-live.</p>
                    </article>

                    <nav class="sub-links" aria-label="Catégories du portfolio">
                        <ul>
                            <li><a href="/fr/portfolio/">Tous les projets</a></li>
                            <li><a href="/fr/portfolio/new-projects/">Nouveaux projets</a></li>
                            <li><a href="/fr/portfolio/creative/">Créatif</a></li>
                            <li><a href="/fr/portfolio/real-estate/">Immobilier</a></li>
                            <li><a href="/fr/portfolio/marketing-corporate/">Marketing / Corporate</a></li>
                            <li><a href="/fr/portfolio/landing-page/">Landing page</a></li>
                            <li><a href="/fr/portfolio/online-store/">Boutique en ligne</a></li>
                            <li><a href="/fr/portfolio/food-delivery/">Livraison de repas</a></li>
                            <li><a href="/fr/portfolio/dentistry/">Dentaire</a></li>
                            <li><a href="/fr/portfolio/manufacturers/">Industrie</a></li>
                            <li><a href="/fr/portfolio/branding/">Branding</a></li>
                            <li><a href="/fr/portfolio/web/">Solution web</a></li>
                            <li><a href="/fr/portfolio/entertainment-leisure/">Loisirs / Divertissement</a></li>
                        </ul>
                    </nav>

                    <div class="project-grid animate mt-xl mb-xl" data-animate='{"target": ".slideAnim", "delay":200}'>
`

const frTail = `
                    </div>

                    <div class="text text-sm mb-lg col-xl-9">Ensemble, faisons avancer votre prochaine livraison.</div>
                    <div class="btn btn-l btn-primary open-popup mb-xxl" data-rel="popup-form">
                        <div class="btn-text">Parler du projet</div>
                        <div class="btn-icon">
                            <svg width="24" height="24">
                                <use xlink:href="/img/icons/icons_global.svg#arrow-left" fill="none"></use>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </main>
`

await fs.writeFile(
  path.join(root, 'src/legacy-partials/04-portfolio-main.html'),
  enHead + enSnippet + enTail,
  'utf8',
)
await fs.writeFile(
  path.join(root, 'src/legacy-partials-fr/04-portfolio-main.html'),
  frHead + frSnippet + frTail,
  'utf8',
)

await Promise.all([
  fs.unlink(path.join(root, 'src/_portfolio-grid-en-snippet.html')),
  fs.unlink(path.join(root, 'src/_portfolio-grid-fr-snippet.html')),
])

console.log('Wrote 04-portfolio-main.html (en + fr)')

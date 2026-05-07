import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

const rowArrow = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`

function awardRow(project, award, year, href = '#') {
  return `                <a class="award-table-tr" href="${href}" target="_blank" rel="noopener noreferrer">
                    <div class="award-table-td">
                        <span class="title">${project}</span>
                    </div>
                    <div class="award-table-td">
                        <span class="text">${award}</span>
                    </div>
                    <div class="award-table-td award-table-flex">
                        <span class="text">${year}</span>
                        ${rowArrow}
                    </div>
                </a>
`
}

const enIntro = `        <main>
            <div class="section archive_page mt-xxl">
                <div class="container">
                    <nav class="breadcrumbs" aria-label="Breadcrumb">
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li class="is-active">Awards &amp; Reviews</li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div class="section seo-section">
                <div class="container">
                    <div class="seo-block">
                        <h1 class="h3 title col-xl-6 col-lg-8">Awards — inspiration for new projects</h1>
                        <article class="seo-content text text-sm">
                            <div class="text text-sm">
                                <p>To ship high-quality, current web products and platforms, we continuously sharpen our skills — new stacks, security practices, and delivery rituals. Recognition from clients and juries is a welcome signal that the work holds up in the real world.</p>
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

    <div class="section">
        <div class="container award-block" style="position:relative;">
            <div class="award-img-wrap">
                <div class="award-img-inner">
                    <div class="award-img"><img src="/img/baseone-prev-img-1.webp" alt="" loading="lazy" width="234" height="310"></div>
                    <div class="award-img"><img src="/img/validsoft-600x720.webp" alt="" loading="lazy" width="234" height="310"></div>
                    <div class="award-img"><img src="/img/euduco-600x720.webp" alt="" loading="lazy" width="234" height="310"></div>
                    <div class="award-img"><img src="/img/saved-600x720.webp" alt="" loading="lazy" width="234" height="310"></div>
                    <div class="award-img"><img src="/img/pripravka-wok-600x720.webp" alt="" loading="lazy" width="234" height="310"></div>
                    <div class="award-img"><img src="/img/smarton-prev-600x720.webp" alt="" loading="lazy" width="234" height="310"></div>
                    <div class="award-img"><img src="/img/originstage-600x720.webp" alt="" loading="lazy" width="234" height="310"></div>
                </div>
            </div>
            <div class="award-table" style="--columns: 3; --columns-size: minmax(0, 1.1fr) minmax(0, 1.6fr) minmax(0, 5rem);">
                <div class="award-table-tr award-table-head archive-table-head">
                    <div class="award-table-td">Project</div>
                    <div class="award-table-td">Award</div>
                    <div class="award-table-td">Year</div>
                </div>
${awardRow('Base1', 'Industry spotlight — web build excellence', '2022', 'https://www.baseone.uk/')}
${awardRow('ValidSoft', 'Featured marketing &amp; product site delivery', '2024', 'https://www.validsoft.com/')}
${awardRow('Euduco', 'B2B platform UX &amp; engineering delivery', '2024', 'https://euduco.ua/en/')}
${awardRow('SavEd', 'Non-profit digital presence &amp; storytelling', '2023', 'https://saved.foundation/en/')}
${awardRow('Pripravka Wok', 'Brand &amp; commerce experience', '2023', 'https://crazyasia.pripravka.ai/')}
${awardRow('Smarton', 'Learning platform UI &amp; full stack', '2023', 'https://smarton.biz/en/')}
${awardRow('Origin Stage', 'Event space — end-to-end web launch', '2022', 'https://originstage.com.ua/')}
            </div>
            <div class="slideUp mt-lg">
                <a class="btn btn-m btn-secondary" href="/portfolio/">
                    <div class="btn-text">Show more projects</div>
                    <div class="btn-icon">
                        <svg width="24" height="24">
                            <use xlink:href="/img/icons/icons_global.svg#arrow-left" fill="none"></use>
                        </svg>
                    </div>
                </a>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="container">
            <h2 class="h2 title mb-lg col-xl-11 text-animate">Words from professionals that matter</h2>
            <div class="develop-grid">
                <div class="develop-card">
                    <div class="h4 title develop-title">They made the whole process feel effortless and stress-free</div>
                    <div class="case-tech">
                        <div class="caption">Mar 26, 2025 · Information technology</div>
                        <div class="text text-sm mt-xs">Product Manager, ValidSoft</div>
                    </div>
                    <p class="text text-sm">After the website launch, the client noticed an increase in traffic and demo request submissions. Visitors spent more time on the site, and the bounce rate decreased. DevOps Agency delivered the project on time and within budget. The team was responsive, adaptable, and offered practical solutions.</p>
                    <a class="btn btn-m btn-primary" href="/portfolio/">Read more</a>
                    <div class="develop-media-wrap">
                        <div class="develop-media size-1"><img src="/img/inspe-img2-760x480.webp" alt="" loading="lazy"></div>
                    </div>
                </div>

                <div class="develop-card">
                    <div class="h4 title develop-title">Their attention to detail made the collaboration smooth</div>
                    <div class="case-tech">
                        <div class="caption">Mar 3, 2025 · Digital services</div>
                        <div class="text text-sm mt-xs">Operations lead, growth-stage SaaS</div>
                    </div>
                    <p class="text text-sm">Engineering velocity went up after we introduced CI/CD and clearer environments. Incidents dropped, releases became boring in the best way, and stakeholders could see progress every week.</p>
                    <a class="btn btn-m btn-primary" href="/portfolio/">Read more</a>
                    <div class="develop-media-wrap">
                        <div class="develop-media size-1"><img src="/img/greenville-img-2-1-760x480.webp" alt="" loading="lazy"></div>
                    </div>
                </div>

                <div class="develop-card">
                    <div class="h4 title develop-title">Cooperating with them was a pleasant experience</div>
                    <div class="case-tech">
                        <div class="caption">Feb 28, 2025 · Healthcare</div>
                        <div class="text text-sm mt-xs">Dental Technician, Creation of Smile s.r.o.</div>
                    </div>
                    <p class="text text-sm">DevOps Agency met our expectations and delivered a website that matched our vision. Despite a timeline delay, the team was responsive to requests and communicated regularly via virtual meetings. Their positive attitude and eagerness to help were key elements of their work.</p>
                    <a class="btn btn-m btn-primary" href="/portfolio/">Read more</a>
                    <div class="develop-media-wrap">
                        <div class="develop-media size-1"><img src="/img/creationofsmile-img2-760x480.webp" alt="" loading="lazy"></div>
                    </div>
                </div>

                <div class="develop-card">
                    <div class="h4 title develop-title">The cooperation was very productive, and we are satisfied with the result</div>
                    <div class="case-tech">
                        <div class="caption">Feb 27, 2025 · IT services</div>
                        <div class="text text-sm mt-xs">Marketer, Media Service</div>
                    </div>
                    <p class="text text-sm">DevOps Agency has delivered a high-quality site with a modern design, improving our UX and time spent on the site and decreasing bounce rates. The team promptly responds to requests, considers our requirements, and offers effective solutions. Their open communication stands out.</p>
                    <a class="btn btn-m btn-primary" href="/portfolio/">Read more</a>
                    <div class="develop-media-wrap">
                        <div class="develop-media size-1"><img src="/img/fest-img-2-760x480.webp" alt="" loading="lazy"></div>
                    </div>
                </div>
            </div>
            <div class="slideUp mt-xl">
                <a class="btn btn-m btn-secondary" href="/portfolio/">
                    <div class="btn-text">Show more reviews</div>
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

const frIntro = `        <main>
            <div class="section archive_page mt-xxl">
                <div class="container">
                    <nav class="breadcrumbs" aria-label="Fil d’Ariane">
                        <ul>
                            <li><a href="/fr">Accueil</a></li>
                            <li class="is-active">Prix &amp; avis</li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div class="section seo-section">
                <div class="container">
                    <div class="seo-block">
                        <h1 class="h3 title col-xl-6 col-lg-8">Prix &amp; avis — inspiration pour de nouveaux projets</h1>
                        <article class="seo-content text text-sm">
                            <div class="text text-sm">
                                <p>Pour livrer des produits web exigeants, nous faisons évoluer en continu nos pratiques — stacks, sécurité et industrialisation. Les retours clients et la reconnaissance du métier confirment que le travail tient sur le terrain.</p>
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

    <div class="section">
        <div class="container award-block" style="position:relative;">
            <div class="award-img-wrap">
                <div class="award-img-inner">
                    <div class="award-img"><img src="/img/baseone-prev-img-1.webp" alt="" loading="lazy" width="234" height="310"></div>
                    <div class="award-img"><img src="/img/validsoft-600x720.webp" alt="" loading="lazy" width="234" height="310"></div>
                    <div class="award-img"><img src="/img/euduco-600x720.webp" alt="" loading="lazy" width="234" height="310"></div>
                    <div class="award-img"><img src="/img/saved-600x720.webp" alt="" loading="lazy" width="234" height="310"></div>
                    <div class="award-img"><img src="/img/pripravka-wok-600x720.webp" alt="" loading="lazy" width="234" height="310"></div>
                    <div class="award-img"><img src="/img/smarton-prev-600x720.webp" alt="" loading="lazy" width="234" height="310"></div>
                    <div class="award-img"><img src="/img/originstage-600x720.webp" alt="" loading="lazy" width="234" height="310"></div>
                </div>
            </div>
            <div class="award-table" style="--columns: 3; --columns-size: minmax(0, 1.1fr) minmax(0, 1.6fr) minmax(0, 5rem);">
                <div class="award-table-tr award-table-head archive-table-head">
                    <div class="award-table-td">Projet</div>
                    <div class="award-table-td">Reconnaissance</div>
                    <div class="award-table-td">Année</div>
                </div>
${awardRow('Base1', 'Mise en avant — excellence de réalisation web', '2022', 'https://www.baseone.uk/')}
${awardRow('ValidSoft', 'Site marketing &amp; produit remarquable', '2024', 'https://www.validsoft.com/')}
${awardRow('Euduco', 'Plateforme B2B — UX &amp; ingénierie', '2024', 'https://euduco.ua/en/')}
${awardRow('SavEd', 'Présence numérique &amp; storytelling associatif', '2023', 'https://saved.foundation/en/')}
${awardRow('Pripravka Wok', 'Marque &amp; expérience commerce', '2023', 'https://crazyasia.pripravka.ai/')}
${awardRow('Smarton', 'Plateforme e-learning UI &amp; full stack', '2023', 'https://smarton.biz/en/')}
${awardRow('Origin Stage', 'Espace événementiel — lancement bout en bout', '2022', 'https://originstage.com.ua/')}
            </div>
            <div class="slideUp mt-lg">
                <a class="btn btn-m btn-secondary" href="/fr/portfolio/">
                    <div class="btn-text">Voir plus de projets</div>
                    <div class="btn-icon">
                        <svg width="24" height="24">
                            <use xlink:href="/img/icons/icons_global.svg#arrow-left" fill="none"></use>
                        </svg>
                    </div>
                </a>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="container">
            <h2 class="h2 title mb-lg col-xl-11 text-animate">Des professionnels dont l’avis compte</h2>
            <div class="develop-grid">
                <div class="develop-card">
                    <div class="h4 title develop-title">Un processus fluide, sans friction inutile</div>
                    <div class="case-tech">
                        <div class="caption">26 mars 2025 · Technologies de l’information</div>
                        <div class="text text-sm mt-xs">Product Manager, ValidSoft</div>
                    </div>
                    <p class="text text-sm">Après le lancement, hausse du trafic et des demandes de démo, temps passé sur le site en hausse et bounce en baisse. Livraison dans les temps et le budget, équipe réactive et des solutions concrètes.</p>
                    <a class="btn btn-m btn-primary" href="/fr/portfolio/">Lire la suite</a>
                    <div class="develop-media-wrap">
                        <div class="develop-media size-1"><img src="/img/inspe-img2-760x480.webp" alt="" loading="lazy"></div>
                    </div>
                </div>

                <div class="develop-card">
                    <div class="h4 title develop-title">Le souci du détail a rendu la collaboration agréable</div>
                    <div class="case-tech">
                        <div class="caption">3 mars 2025 · Services numériques</div>
                        <div class="text text-sm mt-xs">Responsable opérations, scale-up SaaS</div>
                    </div>
                    <p class="text text-sm">La vélocité a progressé après la mise en place de CI/CD et d’environnements plus clairs. Moins d’incidents, des releases régulières, et une visibilité hebdomadaire pour les parties prenantes.</p>
                    <a class="btn btn-m btn-primary" href="/fr/portfolio/">Lire la suite</a>
                    <div class="develop-media-wrap">
                        <div class="develop-media size-1"><img src="/img/greenville-img-2-1-760x480.webp" alt="" loading="lazy"></div>
                    </div>
                </div>

                <div class="develop-card">
                    <div class="h4 title develop-title">Une collaboration vraiment positive</div>
                    <div class="case-tech">
                        <div class="caption">28 févr. 2025 · Santé</div>
                        <div class="text text-sm mt-xs">Technicien dentaire, Creation of Smile s.r.o.</div>
                    </div>
                    <p class="text text-sm">DevOps Agency a répondu à nos attentes avec un site aligné sur notre vision. Malgré un léger retard, l’équipe est restée disponible et a communiqué régulièrement. Leur engagement a fait la différence.</p>
                    <a class="btn btn-m btn-primary" href="/fr/portfolio/">Lire la suite</a>
                    <div class="develop-media-wrap">
                        <div class="develop-media size-1"><img src="/img/creationofsmile-img2-760x480.webp" alt="" loading="lazy"></div>
                    </div>
                </div>

                <div class="develop-card">
                    <div class="h4 title develop-title">Une coopération productive, nous sommes satisfaits du résultat</div>
                    <div class="case-tech">
                        <div class="caption">27 févr. 2025 · Services IT</div>
                        <div class="text text-sm mt-xs">Marketer, Media Service</div>
                    </div>
                    <p class="text text-sm">Un site moderne, une UX améliorée, du temps passé en hausse et du rebond en baisse. Réactivité, prise en compte du brief et communication transparente.</p>
                    <a class="btn btn-m btn-primary" href="/fr/portfolio/">Lire la suite</a>
                    <div class="develop-media-wrap">
                        <div class="develop-media size-1"><img src="/img/fest-img-2-760x480.webp" alt="" loading="lazy"></div>
                    </div>
                </div>
            </div>
            <div class="slideUp mt-xl">
                <a class="btn btn-m btn-secondary" href="/fr/portfolio/">
                    <div class="btn-text">Plus d’avis</div>
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

const custEn = await fs.readFile(path.join(root, 'src/_awards-customer-en.html'), 'utf8')
const custFr = await fs.readFile(path.join(root, 'src/_awards-customer-fr.html'), 'utf8')

const enMain = `${enIntro}\n${custEn}\n        </main>\n`
const frMain = `${frIntro}\n${custFr}\n        </main>\n`

await fs.writeFile(path.join(root, 'src/legacy-partials/04-awards-main.html'), enMain, 'utf8')
await fs.writeFile(path.join(root, 'src/legacy-partials-fr/04-awards-main.html'), frMain, 'utf8')

console.log('Wrote 04-awards-main.html (en + fr)')

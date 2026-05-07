import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

/** Body copy lives inside `.seo-content > .text.text-sm` like template/index.html seo-block */
const enArticleBody = `                        <p>This policy describes how DevOps Agency (“we”, “us”) handles information when you use our website, contact us, or work with us on a project. We aim to be transparent and to collect only what we need to respond, deliver services, and keep the site secure.</p>
                        <p class="mt-md"><strong>Last updated:</strong> May 7, 2026</p>

                        <h4 class="h4 title mt-xl mb-sm">1. Who we are</h4>
                        <p>DevOps Agency provides web design, development, and related digital services. You can reach us at <a href="mailto:devops24noreply@gmail.com">devops24noreply@gmail.com</a> or <a href="mailto:devops24sup@gmail.com">devops24sup@gmail.com</a>, or via our <a href="/contacts/">contact page</a>.</p>

                        <h4 class="h4 title mt-xl mb-sm">2. Information we collect</h4>
                        <ul class="mt-md">
                            <li><strong>Contact and project inquiries:</strong> name, email, phone (if provided), message contents, and any files you send through forms or email.</li>
                            <li><strong>Technical data:</strong> IP address, browser type, approximate location (from IP), pages viewed, and timestamps — typically via server logs or analytics tools.</li>
                            <li><strong>Cookies:</strong> small data stored on your device where we or our vendors use them for preferences, security, or measurement (see below).</li>
                        </ul>

                        <h4 class="h4 title mt-xl mb-sm">3. How we use information</h4>
                        <ul class="mt-md">
                            <li>To reply to questions and manage contracts and delivery when you become a client.</li>
                            <li>To operate and protect the website (security monitoring, abuse prevention, debugging).</li>
                            <li>To understand aggregate usage so we can improve content and performance.</li>
                            <li>To comply with law or defend our legitimate interests where permitted.</li>
                        </ul>

                        <h4 class="h4 title mt-xl mb-sm">4. Cookies and analytics</h4>
                        <p>We may use cookies or similar technologies from us or third parties (for example analytics or embedded media). You can control cookies through your browser settings. Some features may not work as intended if you block essential cookies.</p>

                        <h4 class="h4 title mt-xl mb-sm">5. Sharing</h4>
                        <p>We do not sell your personal information. We share data only with service providers who help us run the site or deliver work (hosting, email, form handling, analytics), when required by law, or with your consent. We aim to use processors that offer appropriate safeguards.</p>

                        <h4 class="h4 title mt-xl mb-sm">6. Retention</h4>
                        <p>We keep contact and project-related information for as long as needed to fulfill the purpose for which it was collected, including legal, accounting, or dispute requirements. Server logs may be kept for a limited period for security and troubleshooting.</p>

                        <h4 class="h4 title mt-xl mb-sm">7. Security</h4>
                        <p>We use reasonable technical and organizational measures to protect information. No method of transmission over the Internet is 100% secure; we encourage strong passwords and safe sharing of credentials through agreed channels.</p>

                        <h4 class="h4 title mt-xl mb-sm">8. Your rights</h4>
                        <p>Depending on your location, you may have rights to access, correct, delete, or restrict certain processing of your personal data, or to object or withdraw consent. Contact us using the emails above and we will respond within a reasonable time.</p>

                        <h4 class="h4 title mt-xl mb-sm">9. International transfers</h4>
                        <p>If we work with providers outside your country, we take steps that are appropriate to the situation (contract terms, adequacy decisions, or other safeguards) as required by applicable law.</p>

                        <h4 class="h4 title mt-xl mb-sm">10. Changes</h4>
                        <p>We may update this page from time to time. The “Last updated” date will change and continued use of the site after updates constitutes acceptance of the revised policy where the law allows.</p>
`

const frArticleBody = `                        <p>La présente politique décrit comment DevOps Agency («&nbsp;nous&nbsp;») traite les informations lorsque vous utilisez notre site, nous contactez ou collaborez avec nous sur un projet. Nous visons la transparence et ne collectons que le nécessaire pour répondre, fournir nos services et sécuriser le site WEB.</p>
                        <p class="mt-md"><strong>Dernière mise à jour&nbsp;:</strong> 7 mai 2026</p>

                        <h4 class="h4 title mt-xl mb-sm">1. Qui sommes-nous&nbsp;?</h4>
                        <p>DevOps Agency propose design Web, développement Web et services numériques associés. Contact&nbsp;: <a href="mailto:devops24noreply@gmail.com">devops24noreply@gmail.com</a> ou <a href="mailto:devops24sup@gmail.com">devops24sup@gmail.com</a>, ou via la page <a href="/fr/contacts/">Contact</a>.</p>

                        <h4 class="h4 title mt-xl mb-sm">2. Données collectées</h4>
                        <ul class="mt-md">
                            <li><strong>Demandes de contact et projets&nbsp;:</strong> nom, e-mail, téléphone (si fourni), contenu des messages et pièces jointes transmis via formulaires ou e-mail.</li>
                            <li><strong>Données techniques&nbsp;:</strong> adresse IP, type de navigateur, localisation approximative (dérivée de l’IP), pages consultées et horodatages — souvent via journaux serveur ou outils d’analyse.</li>
                            <li><strong>Cookies&nbsp;:</strong> données stockées sur votre terminal lorsque nous ou nos prestataires les utilisons pour des préférences, la sécurité ou la mesure d’audience (voir ci-dessous).</li>
                        </ul>

                        <h4 class="h4 title mt-xl mb-sm">3. Finalités</h4>
                        <ul class="mt-md">
                            <li>Répondre aux questions et gérer la relation contractuelle si vous devenez client.</li>
                            <li>Exploiter et protéger le site (surveillance de sécurité, prévention des abus, correction d’erreurs).</li>
                            <li>Comprendre l’usage agrégé pour améliorer contenu et performance.</li>
                            <li>Respecter la loi ou défendre nos intérêts légitimes lorsque la loi le permet.</li>
                        </ul>

                        <h4 class="h4 title mt-xl mb-sm">4. Cookies et analyse</h4>
                        <p>Nous pouvons utiliser des cookies ou technologies similaires, émis par nous ou par des tiers (analyse, contenus intégrés). Vous pouvez les contrôler via les paramètres du navigateur. Le blocage de cookies essentiels peut limiter certaines fonctionnalités.</p>

                        <h4 class="h4 title mt-xl mb-sm">5. Communication à des tiers</h4>
                        <p>Nous ne vendons pas vos données personnelles. Nous les partageons uniquement avec des prestataires qui nous aident à héberger le site ou à livrer les prestations (hébergement, e-mail, formulaires, analyse), lorsque la loi l’exige ou avec votre accord. Nous privilégions des sous-traitants offrant des garanties adaptées.</p>

                        <h4 class="h4 title mt-xl mb-sm">6. Conservation</h4>
                        <p>Nous conservons les données de contact et de projet le temps nécessaire à la finalité poursuivie, y compris obligations légales, comptables ou contentieux. Les journaux serveur peuvent être conservés pour une durée limitée pour sécurité et diagnostic.</p>

                        <h4 class="h4 title mt-xl mb-sm">7. Sécurité</h4>
                        <p>Nous appliquons des mesures techniques et organisationnelles raisonnables. Aucun mode de transmission sur Internet n’est totalement sûr&nbsp;; nous recommandons des mots de passe solides et des canaux convenus pour les informations sensibles.</p>

                        <h4 class="h4 title mt-xl mb-sm">8. Vos droits</h4>
                        <p>Selon votre pays, vous pouvez disposer d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition ou de retrait du consentement. Écrivez-nous aux adresses ci-dessus&nbsp;; nous répondrons dans un délai raisonnable.</p>

                        <h4 class="h4 title mt-xl mb-sm">9. Transferts internationaux</h4>
                        <p>Si nous faisons appel à des prestataires situés hors de votre pays, nous mettons en œuvre des garanties appropriées (clauses contractuelles, décisions d’adéquation ou autres mécanismes prévus par la loi applicable).</p>

                        <h4 class="h4 title mt-xl mb-sm">10. Modifications</h4>
                        <p>Nous pouvons mettre à jour cette page&nbsp;; la date de «&nbsp;Dernière mise à jour&nbsp;» sera modifiée. L’utilisation du site après modification vaut acceptation de la politique révisée là où la loi le prévoit.</p>
`

const enMain = `        <main>
            <div class="section archive_page mt-xxl">
                <div class="container">
                    <nav class="breadcrumbs" aria-label="Breadcrumb">
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li class="is-active">Privacy Policy</li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div class="section seo-section">
                <div class="container">
                    <div class="seo-block">
                        <h1 class="h3 title col-xl-6 col-lg-8">Privacy Policy</h1>
                        <article class="seo-content text text-sm">
                            <div class="text text-sm">
${enArticleBody}
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
                <div class="container">
                    <div class="mb-xxl col-xl-10">
                        <a class="btn btn-m btn-secondary" href="/">
                            <div class="btn-text">Back to home</div>
                            <div class="btn-icon">
                                <svg width="24" height="24">
                                    <use xlink:href="/img/icons/icons_global.svg#arrow-left" fill="none"></use>
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </main>
`

const frMain = `        <main>
            <div class="section archive_page mt-xxl">
                <div class="container">
                    <nav class="breadcrumbs" aria-label="Fil d’Ariane">
                        <ul>
                            <li><a href="/fr">Accueil</a></li>
                            <li class="is-active">Politique de confidentialité</li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div class="section seo-section">
                <div class="container">
                    <div class="seo-block">
                        <h1 class="h3 title col-xl-6 col-lg-8">Politique de confidentialité</h1>
                        <article class="seo-content text text-sm">
                            <div class="text text-sm">
${frArticleBody}
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
                <div class="container">
                    <div class="mb-xxl col-xl-10">
                        <a class="btn btn-m btn-secondary" href="/fr">
                            <div class="btn-text">Retour à l’accueil</div>
                            <div class="btn-icon">
                                <svg width="24" height="24">
                                    <use xlink:href="/img/icons/icons_global.svg#arrow-left" fill="none"></use>
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </main>
`

await fs.writeFile(path.join(root, 'src/legacy-partials/04-privacy-main.html'), enMain, 'utf8')
await fs.writeFile(path.join(root, 'src/legacy-partials-fr/04-privacy-main.html'), frMain, 'utf8')
console.log('Wrote 04-privacy-main.html (en + fr)')

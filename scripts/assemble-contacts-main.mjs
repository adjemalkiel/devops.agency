import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

const socialEn = `                <div class="social" style="gap:0.75rem;display:flex;flex-wrap:wrap;align-items:center;">
                    <a href="https://www.instagram.com/devops.webagency/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <img width="24" height="24" src="/img/icons/icon-instagram.svg" alt="" loading="lazy">
                    </a>
                    <a href="https://www.viber.com/ua/" target="_blank" rel="noopener noreferrer" aria-label="Viber">
                        <img width="24" height="24" src="/img/icons/icon-viber.svg" alt="" loading="lazy">
                    </a>
                    <a href="https://telegram.org/" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                        <img width="24" height="24" src="/img/icons/icon-telegram.svg" alt="" loading="lazy">
                    </a>
                    <a href="https://www.whatsapp.com/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                        <img width="24" height="24" src="/img/icons/icon-whatsapp.svg" alt="" loading="lazy">
                    </a>
                    <a href="https://www.messenger.com/" target="_blank" rel="noopener noreferrer" aria-label="Messenger">
                        <img width="24" height="24" src="/img/icons/icon-messenger.svg" alt="" loading="lazy">
                    </a>
                </div>
`

/** Same fields/order as template popup `public/inc/popups/_popups/index.html` */
const formEn = `                            <form class="form-block type-2" method="post" action="https://formspree.io/f/xzdoeopz">
                                <div class="input-field">
                                    <input type="text" class="input" name="first_name" placeholder="Name" autocomplete="name">
                                    <span class="input-error">Required</span>
                                </div>
                                <div class="input-field">
                                    <input type="tel" class="input" name="phone" placeholder="Phone" autocomplete="tel">
                                    <span class="input-error">Required</span>
                                </div>
                                <div class="input-field">
                                    <input type="email" class="input" name="email" placeholder="Email" autocomplete="email">
                                    <span class="input-error">Required</span>
                                </div>
                                <div class="input-field">
                                    <textarea class="input" name="message" placeholder="Message"></textarea>
                                    <span class="input-error">Required</span>
                                </div>
                                <button type="submit" class="btn btn-m btn-primary">
                                    <span class="btn-text">Send</span>
                                    <span class="btn-icon">
                                        <svg width="24" height="24"><use xlink:href="/img/icons/icons_global.svg#arrow-left" fill="none"></use></svg>
                                    </span>
                                </button>
                            </form>
`

const formFr = `                            <form class="form-block type-2" method="post" action="https://formspree.io/f/xzdoeopz">
                                <div class="input-field">
                                    <input type="text" class="input" name="first_name" placeholder="Nom" autocomplete="name">
                                    <span class="input-error">Obligatoire</span>
                                </div>
                                <div class="input-field">
                                    <input type="tel" class="input" name="phone" placeholder="Téléphone" autocomplete="tel">
                                    <span class="input-error">Obligatoire</span>
                                </div>
                                <div class="input-field">
                                    <input type="email" class="input" name="email" placeholder="E-mail" autocomplete="email">
                                    <span class="input-error">Obligatoire</span>
                                </div>
                                <div class="input-field">
                                    <textarea class="input" name="message" placeholder="Message"></textarea>
                                    <span class="input-error">Obligatoire</span>
                                </div>
                                <button type="submit" class="btn btn-m btn-primary">
                                    <span class="btn-text">Envoyer</span>
                                    <span class="btn-icon">
                                        <svg width="24" height="24"><use xlink:href="/img/icons/icons_global.svg#arrow-left" fill="none"></use></svg>
                                    </span>
                                </button>
                            </form>
`

const enMain = `        <main>
            <div class="section archive_page mt-xxl">
                <div class="container">
                    <nav class="breadcrumbs" aria-label="Breadcrumb">
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li class="is-active">Contact us</li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div class="section seo-section">
                <div class="container">
                    <div class="seo-block">
                        <h1 class="h3 title col-xl-6 col-lg-8">Want a project that works?</h1>
                        <article class="seo-content text text-sm">
                            <div class="text text-sm">
                                <p>We’re here — message or call us. Tell us about your goals, timeline, and constraints; we’ll respond with next steps.</p>
                                <p class="mt-md">Use the form or the channels below — whichever fits your workflow. For new engagements we usually reply within one business day with concrete questions or a short call proposal.</p>
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

            <div class="section form-section contacts-page-form">
                <div class="container">
                    <div class="contact-block">
                        <div class="contact-card">
                            <h2 class="h2 title mb-md">Contact details</h2>
                            <div class="contact-item">
                                <span class="text text-sm" style="opacity:0.6;">Email</span>
                                <a href="mailto:devops24noreply@gmail.com">devops24noreply@gmail.com</a>
                                <a href="mailto:devops24sup@gmail.com">devops24sup@gmail.com</a>
                            </div>
                            <div class="contact-item">
                                <span class="text text-sm" style="opacity:0.6;">Phone</span>
                                <a href="tel:+2290129259711">+2290129259711</a>
                            </div>
                            <div class="contact-item">
                                <span class="text text-sm" style="opacity:0.6;">Location</span>
                                <a href="https://www.google.com/maps/search/?api=1&amp;query=Cotonou%2C%20Benin" target="_blank" rel="noopener noreferrer">Cotonou, Benin</a>
                            </div>
                            <div class="contact-item">
                                <span class="text text-sm" style="opacity:0.6;">Social</span>
${socialEn}
                            </div>
                        </div>
                        <div class="contacts-popup-panel">
                            <div class="popup-align">
                                <div class="h3 title">Let&#039;s talk</div>
${formEn}
                            </div>
                        </div>
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
                            <li class="is-active">Contact</li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div class="section seo-section">
                <div class="container">
                    <div class="seo-block">
                        <h1 class="h3 title col-xl-6 col-lg-8">Un projet qui tient la route&nbsp;?</h1>
                        <article class="seo-content text text-sm">
                            <div class="text text-sm">
                                <p>Écrivez-nous ou appelez-nous. Partagez objectifs, délais et contraintes&nbsp;; nous revenons vers vous avec la suite logique.</p>
                                <p class="mt-md">Formulaire ou coordonnées ci-dessous, au choix. Pour les nouvelles demandes, nous répondons en général sous un jour ouvré avec des questions ciblées ou une proposition d’échange court.</p>
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

            <div class="section form-section contacts-page-form">
                <div class="container">
                    <div class="contact-block">
                        <div class="contact-card">
                            <h2 class="h2 title mb-md">Coordonnées</h2>
                            <div class="contact-item">
                                <span class="text text-sm" style="opacity:0.6;">E-mail</span>
                                <a href="mailto:devops24noreply@gmail.com">devops24noreply@gmail.com</a>
                                <a href="mailto:devops24sup@gmail.com">devops24sup@gmail.com</a>
                            </div>
                            <div class="contact-item">
                                <span class="text text-sm" style="opacity:0.6;">Téléphone</span>
                                <a href="tel:+2290129259711">+2290129259711</a>
                            </div>
                            <div class="contact-item">
                                <span class="text text-sm" style="opacity:0.6;">Adresse</span>
                                <a href="https://www.google.com/maps/search/?api=1&amp;query=Cotonou%2C%20Benin" target="_blank" rel="noopener noreferrer">Cotonou, Bénin</a>
                            </div>
                            <div class="contact-item">
                                <span class="text text-sm" style="opacity:0.6;">Réseaux</span>
${socialEn}
                            </div>
                        </div>
                        <div class="contacts-popup-panel">
                            <div class="popup-align">
                                <div class="h3 title">Discutons</div>
${formFr}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
`

await fs.writeFile(path.join(root, 'src/legacy-partials/04-contacts-main.html'), enMain, 'utf8')
await fs.writeFile(path.join(root, 'src/legacy-partials-fr/04-contacts-main.html'), frMain, 'utf8')
console.log('Wrote 04-contacts-main.html (en + fr)')

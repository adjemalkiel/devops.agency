/** Normalize EN or FR portfolio URLs to a single key for matching category nav hrefs. */
export function normalizePortfolioPath(pathnameOrHref: string): string {
  let p = pathnameOrHref.replace(/\/+$/, '')
  if (p.startsWith('/fr/portfolio')) {
    p = '/portfolio' + p.slice('/fr/portfolio'.length)
  }
  if (p === '/portfolio' || p === '') return '/portfolio'
  if (!p.startsWith('/portfolio')) return '/portfolio'
  return p
}

export function syncPortfolioCategoryActive(host: HTMLElement, pathname: string): void {
  const current = normalizePortfolioPath(pathname)
  for (const nav of host.querySelectorAll('.sub-links')) {
    for (const li of nav.querySelectorAll('li')) li.classList.remove('is-active')
    for (const a of nav.querySelectorAll<HTMLAnchorElement>('a[href^="/portfolio"], a[href^="/fr/portfolio"]')) {
      const href = a.getAttribute('href') ?? ''
      if (normalizePortfolioPath(href) === current) {
        a.closest('li')?.classList.add('is-active')
        break
      }
    }
  }
}

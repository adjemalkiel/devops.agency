/**
 * React injects legacy HTML after app-global.js has already run its one-time
 *   document.querySelectorAll('.video') setup, so lazy-loaded video src may never be set.
 * `legacyHydrateLazyVideos` runs after each legacy markup injection (see fireLegacyDomReady in the app).
 */
;(function (global) {
  function pickVideoSrc(v) {
    const w = global.innerWidth
    return w > 1199
      ? v.getAttribute('data-src') || v.dataset.src || ''
      : v.getAttribute('data-src-mob') || v.dataset.srcMob || ''
  }

  function applySrcToBlock(block) {
    const vid = block.querySelector('video')
    if (!vid) return
    const src = pickVideoSrc(vid)
    if (!src) return
    const cur = vid.getAttribute('src') || ''
    if (cur === '#' || cur === '' || !cur) vid.setAttribute('src', src)
    vid.muted = true
    vid.playsInline = true
    const p = vid.play()
    if (p && typeof p.catch === 'function') p.catch(function () {})
  }

  /**
   * @param {ParentNode} [root] injected legacy subtree; defaults to document
   */
  function legacyHydrateLazyVideos(root) {
    var scope = root && typeof root.querySelectorAll === 'function' ? root : document

    function findHeadlineMedia() {
      if (scope === document) {
        return document.getElementById('headline-media')
      }
      return scope.querySelector('#headline-media') || scope.querySelector('.customer-section .headline-media')
    }

    var hm = findHeadlineMedia()
    if (hm) {
      hm.querySelectorAll('.video').forEach(function (el) {
        applySrcToBlock(el)
      })
    }

    var io = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return
          applySrcToBlock(entry.target)
          observer.unobserve(entry.target)
        })
      },
      { root: null, rootMargin: '50%' },
    )

    scope.querySelectorAll('.video').forEach(function (el) {
      io.observe(el)
    })
  }

  global.legacyHydrateLazyVideos = legacyHydrateLazyVideos
})(typeof window !== 'undefined' ? window : this)

/**
 * React injects legacy HTML after app-global.js has already run its one-time
 *   document.querySelectorAll('.video') setup, so lazy-loaded video src may never be set.
 * This runs once after the legacy bundle loads.
 */
;(function () {
  function pickVideoSrc(v) {
    const w = window.innerWidth
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

  // Hero / headline: load immediately (often above the fold).
  var hm = document.getElementById('headline-media')
  if (hm) {
    hm.querySelectorAll('.video').forEach(function (el) {
      applySrcToBlock(el)
    })
  }

  // Other videos: intersection observer (same idea as app-global videoLoad).
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

  document.querySelectorAll('.video').forEach(function (el) {
    io.observe(el)
  })
})()

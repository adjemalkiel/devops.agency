/** Portfolio archive category filter. */
document.addEventListener('DOMContentLoaded', function () {
    initVisibleArchiveProject();
});

function initVisibleArchiveProject() {
    const archiveSection = document.querySelector('.archive_page');
    if (!archiveSection) return;

    const links = document.querySelectorAll('.sub-links ul li a');
    const cards = document.querySelectorAll('.project-card');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            links.forEach(l => l.parentElement.classList.remove('is-active'));
            this.parentElement.classList.add('is-active');

            const slug = this.dataset.slug;
            if (!slug || slug === '*') {
                cards.forEach(card => {
                    card.style.display = '';
                });
            } else {
                cards.forEach(card => {
                    if (card.classList.contains(slug)) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });
}

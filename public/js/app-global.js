//*====================================
//*  FUNCTIONS ON DOCUMENT READY      =
//*====================================
//*  FUNCTIONS CALC, RESIZE, SCROLL   =
//*====================================
//*  ANIMATION                        =
//*====================================
//*  HEADER                           =
//*====================================
//*  POPUPS                           =
//*====================================
//*  KEY FOCUS, TABS, ACCORDION       =
//*====================================
//*  DYNAMIC LOAD JS                  =
//*====================================
//*  OTHER JS                         =
//*====================================
const _functions = {};
const html = document.documentElement;
const header = document.querySelector('header');
const footer = document.querySelector('footer');
let winW, winH, winScr, isTouchScreen, isAndroid, isChrome, isIPhone, isMac, isSafari, isFirefox;


// Polyfill for matches method
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

// Helper function to check if element matches selector
function matches(element, selector) {
    if (!element || !element.matches) return false;
    return element.matches(selector);
}

//*================================
//*  FUNCTIONS ON DOCUMENT READY  =
//*================================
isTouchScreen = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);
isAndroid = navigator.userAgent.match(/Android/i);
isChrome = navigator.userAgent.indexOf('Chrome') >= 0 && navigator.userAgent.indexOf('Edge') < 0;
isIPhone = navigator.userAgent.match(/iPhone/i);
isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

if (isTouchScreen) html.classList.add('touch-screen');
if (isAndroid) html.classList.add('android');
if (isChrome) html.classList.add('chrome');
if (isIPhone) html.classList.add('ios');
if (isMac) html.classList.add('mac');
if (isSafari) html.classList.add('safari');
if (isFirefox) html.classList.add('firefox');



//*===================================
//*  FUNCTIONS CALC, RESIZE, SCROLL  =
//*===================================
// Function Calculations on page
_functions.pageCalculations = function () {
    winW = window.innerWidth;
    winH = window.innerHeight;
}
_functions.pageCalculations();

/* Function on page scroll */
window.addEventListener('scroll', function () {
    _functions.scrollCall();
});

var prevScroll = window.pageYOffset || html.scrollTop;
let headerAnimationState = 'normal';
let headerTimeouts = [];
let lastScrollDirection = null;
let hasAnimatedInDirection = false;
let isFirstScroll = true;
let headerAnimationBlocked = true;

// Clear all header timeouts
function clearHeaderTimeouts() {
    headerTimeouts.forEach(timeout => clearTimeout(timeout));
    headerTimeouts = [];
}

// Remove all header animation classes
function resetHeaderClasses(header) {
    header.classList.remove('header-step-1', 'header-step-2', 'header-step-3', 'header-step-4', 'header-step-5');
}

// Scroll down animation
function animateHeaderDown(header) {
    if (headerAnimationState !== 'normal' || hasAnimatedInDirection) return;

    headerAnimationState = 'animating-down';
    hasAnimatedInDirection = true;
    clearHeaderTimeouts();
    resetHeaderClasses(header);

    // Ховаємо header вгору
    header.classList.add('header-step-1');

    headerTimeouts.push(setTimeout(() => {
        // Робимо невидимим
        header.classList.add('header-step-2');

        headerTimeouts.push(setTimeout(() => {
            // Переміщуємо позицію вниз (невидимо) і додаємо header-bottom
            header.classList.remove('header-step-1');
            header.classList.add('header-step-3');
            header.classList.add('header-bottom');

            headerTimeouts.push(setTimeout(() => {
                // Прибираємо невидимість - header з'являється знизу
                header.classList.remove('header-step-2');

                headerTimeouts.push(setTimeout(() => {
                    // Переміщуємо в фінальну позицію внизу
                    header.classList.remove('header-step-3');
                    header.classList.add('header-step-5');
                    headerAnimationState = 'normal';
                }, 200));
            }, 100));
        }, 150));
    }, 250));
}

// Scroll up animation
function animateHeaderUp(header) {
    if (headerAnimationState !== 'normal' || hasAnimatedInDirection) return;

    // Перевіряємо, чи header вже у верхньому стані (без header-bottom та header-step-5)
    const isHeaderAlreadyUp = !header.classList.contains('header-bottom') &&
        !header.classList.contains('header-step-5');

    // Якщо header вже вгорі, не запускаємо анімацію
    if (isHeaderAlreadyUp) return;

    headerAnimationState = 'animating-up';
    hasAnimatedInDirection = true;
    clearHeaderTimeouts();
    resetHeaderClasses(header);

    // Починаємо з header-step-5 + header-bottom (внизу сторінки)
    header.classList.add('header-step-5');
    header.classList.add('header-bottom');

    headerTimeouts.push(setTimeout(() => {
        // Ховаємо header вниз (за межі екрану)
        header.classList.remove('header-step-5');
        header.classList.add('header-step-3'); // Переміщуємо далеко вниз

        headerTimeouts.push(setTimeout(() => {
            // Робимо невидимим
            header.classList.add('header-step-2');

            headerTimeouts.push(setTimeout(() => {
                // Переміщуємо позицію вгору (невидимо) і прибираємо header-bottom
                header.classList.remove('header-step-3');
                header.classList.remove('header-bottom');
                header.classList.add('header-step-1');

                headerTimeouts.push(setTimeout(() => {
                    // Спочатку переміщуємо в нормальну позицію (все ще невидимий)
                    header.classList.remove('header-step-1');

                    headerTimeouts.push(setTimeout(() => {
                        // Тепер робимо видимим
                        header.classList.remove('header-step-2');
                        headerAnimationState = 'normal';
                    }, 100));
                }, 50));
            }, 150));
        }, 150));
    }, 150));
}

// Return to normal state
function returnHeaderToNormal(header) {
    if (headerAnimationState !== 'normal') return;

    clearHeaderTimeouts();
    resetHeaderClasses(header);
    header.classList.remove('header-bottom');
    header.classList.remove('scrolled');

    headerAnimationState = 'normal';
    lastScrollDirection = null;
    hasAnimatedInDirection = false;
}

// Check if header should hide under footer
function checkHeaderFooterIntersection() {
    if (!header || !footer) return;

    const footerRect = footer.getBoundingClientRect();
    const hWrap = document.querySelector('.h-wrap');

    if (!hWrap) return;

    const hWrapRect = hWrap.getBoundingClientRect();
    const isHWrapVisible = hWrapRect.bottom > 0 && hWrapRect.top < winH;
    const isHWrapSlightlyVisible = hWrapRect.top < winH;

    if (isHWrapVisible) {
        if (footerRect.top < winH && hWrapRect.bottom > footerRect.top) {
            header.style.zIndex = '-1';
        } else {
            header.style.zIndex = '';
        }
    } else if (isHWrapSlightlyVisible) {
        header.style.zIndex = '';
    } else {
        header.style.zIndex = '';
    }
}

_functions.scrollCall = function () {
    winScr = window.pageYOffset || html.scrollTop;
    const headerHeight = header.offsetHeight;

    if (winW > 1199) {
        // Check header-footer intersection
        // checkHeaderFooterIntersection();

        // if (winScr > 10) {
        //     const currentScrollDirection = winScr > prevScroll ? 'down' : 'up';
        //     const scrollDifference = Math.abs(winScr - prevScroll);

        //     // Для першого скролу після завантаження використовуємо більшу толерантність
        //     const minScrollDiff = isFirstScroll ? 15 : 5;
        //     const maxScrollDiff = isFirstScroll ? 500 : 200;

        //     // Додаємо мінімальну толерантність для скролу та перевірку на різкі стрибки
        //     if (scrollDifference > minScrollDiff && scrollDifference < maxScrollDiff) {
        //         // Блокуємо анімацію якщо анімації заблоковані або це перший скрол
        //         if (!headerAnimationBlocked && !isFirstScroll) {

        //             // Якщо змінився напрямок скролу
        //             if (lastScrollDirection !== currentScrollDirection) {
        //                 // Скидаємо флаг тільки після завершення поточної анімації
        //                 if (headerAnimationState === 'normal') {
        //                     hasAnimatedInDirection = false;
        //                 }
        //                 lastScrollDirection = currentScrollDirection;
        //             }

        //             // Запускаємо анімацію тільки якщо header в нормальному стані і ще не анімували
        //             if (headerAnimationState === 'normal' && !hasAnimatedInDirection) {
        //                 if (currentScrollDirection === 'down') {
        //                     animateHeaderDown(header);
        //                 } else {
        //                     animateHeaderUp(header);
        //                 }
        //             }
        //         } else {
        //             // Для заблокованого стану просто оновлюємо напрямок без анімації
        //             lastScrollDirection = currentScrollDirection;
        //         }
        //     }
        // } else {
        //     returnHeaderToNormal(header);
        // };

        if (winScr > headerHeight) {
            header.classList.add('scrolled');
        } else if (winScr <= headerHeight) {
            header.classList.remove('scrolled');
            // Не скидаємо prevScroll для плавності
        };
    } else if (winW <= 1199) {
        // if (headerAnimationState !== 'normal') {
        //     returnHeaderToNormal(header);
        // }

        if (winScr > headerHeight) {
            header.classList.add('scrolled');
        } else if (winScr <= headerHeight) {
            header.classList.remove('scrolled');
            prevScroll = 0;
        }
    }

    prevScroll = winScr;

    // Скидаємо флаг першого скролу після першого реального скролу
    if (isFirstScroll) {
        isFirstScroll = false;
    }
}

// Ініціалізуємо правильний стан header'а при завантаженні
if (header && winW > 1199) {
    const initialScroll = window.pageYOffset || html.scrollTop;
    const headerHeight = header.offsetHeight;

    // Встановлюємо правильний початковий стан без анімації
    if (initialScroll > headerHeight) {
        header.classList.add('scrolled');
    }

    // Встановлюємо правильний стан меню на основі позиції скролу
    if (initialScroll > 10) {
        // Якщо завантажилися не на самому верху, встановлюємо "нормальний" стан
        headerAnimationState = 'normal';
        hasAnimatedInDirection = false;
    }
}

// Розблоковуємо анімації через 1 секунду після завантаження
setTimeout(() => {
    headerAnimationBlocked = false;
    isFirstScroll = false;
}, 1000);

_functions.scrollCall();

/* Function on page resize */
_functions.resizeCall = function () {
    setTimeout(function () {
        _functions.pageCalculations();

        if (header && (winW <= 1199 || headerAnimationState !== 'normal')) {
            clearHeaderTimeouts();
            resetHeaderClasses(header);
            header.classList.remove('header-bottom');
            header.classList.remove('scrolled');

            headerAnimationState = 'normal';
            lastScrollDirection = null;
            hasAnimatedInDirection = false;
            isFirstScroll = true;
            headerAnimationBlocked = true;

            setTimeout(() => {
                headerAnimationBlocked = false;
                isFirstScroll = false;
            }, 500);
        }

        // Close all dropdown menus on resize
        document.querySelectorAll('.h-drop-menu[data-id]').forEach(menu => {
            menu.classList.remove('is-active');
            menu.querySelectorAll('.h-drop-links-item.is-active').forEach(item => {
                item.classList.remove('is-active');
            });
        });

        document.querySelectorAll('.h-drop-link[data-id]').forEach(link => {
            link.classList.remove('is-open');
        });

        // Handle form loading/unloading on resize
        const formSection = document.querySelector('.form-section');
        if (formSection) {
            if (winW < 1200 && !formSection.innerHTML.trim()) {
                _functions.loadFormToPage();
            } else if (winW >= 1200 && formSection.innerHTML.trim()) {
                forformSectionmInner.innerHTML = '';
            }
        }
    }, 100);
};

if (!isTouchScreen) {
    window.addEventListener('resize', function () {
        _functions.resizeCall();
    });
} else {
    window.addEventListener("orientationchange", function (e) {
        // Portrait
        if (window.orientation == 0) {
            html.classList.remove('landscape');
        }
        // Landscape
        else {
            html.classList.add('landscape');
        }

        _functions.resizeCall();
    }, false);
};



//*==============
//*  ANIMATION  =
//*==============
const observerFunction = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('|', 'animated')
        observer.unobserve(entry.target)
    })

}, {
    root: null,
    threshold: 0,
    rootMargin: (winW > 767) ? "-50px" : "0%"
});

document.querySelectorAll('.section').forEach(block => {
    observerFunction.observe(block)
});

// Elements Detect
const observerAnimation = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return;

        if (index < 10) {
            entry.target.style.setProperty('--animate-index', index);
        } else {
            entry.target.style.setProperty('--animate-index', '0');
        }

        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
    });
}, {
    root: null,
    threshold: 0,
    rootMargin: winW < 768 ? "0% 0%" : "-10% 0%"
});

document.querySelectorAll('.slideUp').forEach((element) => {
    observerAnimation.observe(element);
});


// Titles Animate
document.querySelectorAll(".text-animate").forEach(function (element) {
    // Process all text nodes and child elements
    function processNode(node) {
        if (node.nodeType === 3) { // Text node
            const text = node.textContent;
            if (text.trim()) {
                const wrapper = document.createElement('span');
                wrapper.innerHTML = text.replace(
                    /[^\s]+/g,
                    "<i class='text-animate__word'><i>$&</i></i>"
                );
                node.parentNode.replaceChild(wrapper, node);

                // Move wrapper's children to parent and remove wrapper
                while (wrapper.firstChild) {
                    wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
                }
                wrapper.parentNode.removeChild(wrapper);
            }
        } else if (node.nodeType === 1) { // Element node
            // Process child nodes recursively
            const childNodes = Array.from(node.childNodes);
            childNodes.forEach(processNode);
        }
    }

    // Process the element and all its children
    const childNodes = Array.from(element.childNodes);
    childNodes.forEach(processNode);

    // Wrap images
    const images = element.querySelectorAll("img");
    images.forEach(function (img) {
        const wrapper = document.createElement('i');
        wrapper.className = 'text-animate__word';
        const innerWrapper = document.createElement('i');

        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(innerWrapper);
        innerWrapper.appendChild(img);
    });
});

const options = {
    root: document,
    rootMargin: (winW > 991) ? "0%" : "0%"
};

const textAnimateObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (
            entry.isIntersecting &&
            !entry.target.classList.contains("text-animated")
        ) {
            entry.target.classList.add("text-animated");
            const letters = entry.target.querySelectorAll(".text-animate__word");
            const delay = 300 / letters.length;
            letters.forEach(function (letter, i) {
                setTimeout(() => {
                    letter.classList.add("animated");
                }, i * delay);
            });
        }
    }
}, options);

setTimeout(() => {
    document.querySelectorAll(".text-animate")?.forEach((element) => {
        textAnimateObserver.observe(element);
    });
}, 100);


// Numbers Counter Animation
if (document.querySelectorAll(".number-grid").length) {
    const obsCounter = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const numberSpans = entry.target.querySelectorAll(".number-value span");

                numberSpans.forEach(function (element) {
                    const finalValue = parseInt(element.textContent) || 0;
                    if (finalValue === 0) return;

                    let currentValue = 0;
                    const duration = 3500;
                    const startTime = performance.now();

                    function animateNumber(timestamp) {
                        const elapsed = timestamp - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        const easedProgress = 0.5 - Math.cos(progress * Math.PI) / 2;

                        currentValue = Math.ceil(finalValue * easedProgress);
                        element.textContent = currentValue;

                        if (progress < 1) {
                            requestAnimationFrame(animateNumber);
                        } else {
                            element.textContent = finalValue;
                        }
                    }

                    requestAnimationFrame(animateNumber);
                });

                observer.unobserve(entry.target);
            });
        }, {
        root: null,
        threshold: 0,
        rootMargin: winW > 767 ? "-10%" : "-5%",
    });

    document.querySelectorAll(".number-grid").forEach((numbers) => {
        obsCounter.observe(numbers);
    });
}

// Blocks Animate
(() => {
    const options = {
        root: document,
        rootMargin: "-15%",
    };

    // Store animation counters for each parent block with data-animate
    const blockAnimationCounters = new Map();

    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting || entry.target.classList.contains("animated")) {
                return;
            }

            // Check if this element has data-animate attribute
            if (entry.target.getAttribute("data-animate")) {
                const paramsS = entry.target.getAttribute("data-animate");
                const params = JSON.parse(paramsS);

                if (params.target) {
                    const targetElements = entry.target.querySelectorAll(params.target);

                    const childOptions = {
                        root: null,
                        rootMargin: "0%",
                        threshold: 0.1
                    };

                    // Initialize counter for this specific block
                    if (!blockAnimationCounters.has(entry.target)) {
                        blockAnimationCounters.set(entry.target, 0);
                    }

                    const childObserver = new IntersectionObserver((childEntries) => {
                        childEntries.forEach(childEntry => {
                            if (childEntry.isIntersecting && !childEntry.target.classList.contains("animated")) {
                                const currentIndex = blockAnimationCounters.get(entry.target);
                                blockAnimationCounters.set(entry.target, currentIndex + 1);

                                const baseDelay = Math.min(params.delay || 30, 30);
                                const delay = currentIndex * baseDelay;

                                setTimeout(() => {
                                    childEntry.target.classList.add("animated");
                                }, delay + (params.startDelay || 0));
                            }
                        });
                    }, childOptions);

                    targetElements.forEach(child => {
                        childObserver.observe(child);
                    });

                    entry.target.classList.add("animated");
                } else {
                    setTimeout(() => {
                        entry.target.classList.add("animated");
                    }, params.delay || 0);
                }
            } else {
                entry.target.classList.add("animated");
            }
        });
    }, options);

    setTimeout(() => {
        document.querySelectorAll(".animate")?.forEach((element) => {
            animateObserver.observe(element);
        });
    }, 50);
})();


//*===========
//*  HEADER  =
//*===========
if (winW > 1199) {
    let currentActiveMenu = null;
    let hideTimeout = null;
    let isScrolling = false;
    let scrollTimeout = null;

    // Function to show dropdown
    function showDropdown(dataId) {
        if (isScrolling) return;

        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }

        document.querySelectorAll('.h-drop-menu[data-id]').forEach(menu => {
            menu.classList.remove('is-active');
        });

        document.querySelectorAll('.h-drop-link[data-id]').forEach(link => {
            link.classList.remove('is-open');
        });

        const dropMenu = document.querySelector(`.h-drop-menu[data-id="${dataId}"]`);
        const dropLink = document.querySelector(`.h-drop-link[data-id="${dataId}"]`);

        if (dropMenu) {
            dropMenu.classList.add('is-active');
            currentActiveMenu = dropMenu;
        }

        if (dropLink) {
            dropLink.classList.add('is-open');
        }
    }

    // Function to hide all dropdowns with delay
    function hideAllDropdowns() {
        if (hideTimeout) {
            clearTimeout(hideTimeout);
        }

        hideTimeout = setTimeout(() => {
            document.querySelectorAll('.h-drop-menu[data-id]').forEach(menu => {
                menu.classList.remove('is-active');
            });

            document.querySelectorAll('.h-drop-link[data-id]').forEach(link => {
                link.classList.remove('is-open');
            });

            currentActiveMenu = null;
            hideTimeout = null;
        }, 100);
    }

    // Single mouseenter handler for both links and menus
    document.addEventListener('mouseenter', function (e) {
        if (!e.target || typeof e.target.closest !== 'function') return;

        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }

        const dropLink = e.target.closest('.h-drop-link[data-id]');
        if (dropLink) {
            const dataId = dropLink.getAttribute('data-id');
            if (dataId) {
                showDropdown(dataId);
            }
            return;
        }

        const dropMenu = e.target.closest('.h-drop-menu[data-id]');
        if (dropMenu && dropMenu.classList.contains('is-active')) {
            // Just ensure this menu stays active
            const dataId = dropMenu.getAttribute('data-id');
            if (dataId && currentActiveMenu !== dropMenu) {
                showDropdown(dataId);
            }
            return;
        }

        if (matches(e.target, '.h-drop b')) {
            const hDrop = e.target.closest('.h-drop');
            if (hDrop) {
                hDrop.classList.add('is-active');
            }
            return;
        }

        if (currentActiveMenu && !e.target.closest('.h-drop-link[data-id]') && !e.target.closest('.h-drop-menu[data-id].is-active') && !e.target.closest('.h-drop')) {
            hideAllDropdowns();
        }
    }, true);

    // leave header dropdown (only for .h-drop elements)
    document.addEventListener('mouseleave', function (e) {
        if (matches(e.target, '.h-drop') && !e.target.closest('.h-drop-link[data-id]')) {
            e.target.classList.remove('is-active');
        }
    }, true);

    // Close dropdown menus on scroll
    window.addEventListener('scroll', function () {
        // Set scrolling flag
        isScrolling = true;

        // Clear any existing scroll timeout
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        if (currentActiveMenu) {
            // Clear timeout and hide immediately
            if (hideTimeout) {
                clearTimeout(hideTimeout);
                hideTimeout = null;
            }

            // Hide all dropdowns immediately
            document.querySelectorAll('.h-drop-menu[data-id]').forEach(menu => {
                menu.classList.remove('is-active');
            });

            document.querySelectorAll('.h-drop-link[data-id]').forEach(link => {
                link.classList.remove('is-open');
            });

            currentActiveMenu = null;
        }

        // Reset scrolling flag after scroll ends
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 150);
    });
}

// Mobile dropdown functionality
if (winW <= 1199) {
    // Function to show mobile dropdown
    function showMobileDropdown(dataId) {
        const dropMenu = document.querySelector(`.h-drop-menu[data-id="${dataId}"]`);
        const dropLink = document.querySelector(`.h-drop-link[data-id="${dataId}"]`);

        if (dropMenu && dropLink) {
            const isActive = dropMenu.classList.contains('is-active');

            // Close all other dropdowns first
            document.querySelectorAll('.h-drop-menu[data-id]').forEach(menu => {
                if (menu !== dropMenu) {
                    menu.classList.remove('is-active');
                    // Also close all submenus in other dropdowns
                    menu.querySelectorAll('.h-drop-links-item.is-active').forEach(item => {
                        item.classList.remove('is-active');
                    });
                }
            });

            document.querySelectorAll('.h-drop-link[data-id]').forEach(link => {
                if (link !== dropLink) {
                    link.classList.remove('is-open');
                }
            });

            // Toggle current dropdown
            if (isActive) {
                dropMenu.classList.remove('is-active');
                dropLink.classList.remove('is-open');
                // Close all submenus in current dropdown
                dropMenu.querySelectorAll('.h-drop-links-item.is-active').forEach(item => {
                    item.classList.remove('is-active');
                });
            } else {
                dropMenu.classList.add('is-active');
                dropLink.classList.add('is-open');
            }
        }
    }

    // Mobile click handler for dropdown links
    document.addEventListener('click', function (e) {
        const dropLink = e.target.closest('.h-drop-link[data-id]');
        if (dropLink) {
            // Дозволити клікам на <a> теги всередині dropdown link проходити
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return; // Не блокуємо навігаційні посилання
            }

            e.preventDefault();
            e.stopPropagation();

            const dataId = dropLink.getAttribute('data-id');
            if (dataId) {
                showMobileDropdown(dataId);
            }
        }

        // Back button handler
        const backBtn = e.target.closest('.h-btn-back');
        if (backBtn) {
            e.preventDefault();
            e.stopPropagation();

            // Check if back button is inside submenu
            const activeSubItem = backBtn.closest('.h-drop-links-item.is-active');
            if (activeSubItem) {
                // If inside submenu - just close the submenu, return to main dropdown
                activeSubItem.classList.remove('is-active');
            } else {
                // If in main dropdown - close entire dropdown
                const currentDropMenu = backBtn.closest('.h-drop-menu[data-id]');
                if (currentDropMenu) {
                    const dataId = currentDropMenu.getAttribute('data-id');
                    const dropLink = document.querySelector(`.h-drop-link[data-id="${dataId}"]`);

                    // Close current dropdown
                    currentDropMenu.classList.remove('is-active');
                    if (dropLink) {
                        dropLink.classList.remove('is-open');
                    }

                    // Close all submenus in current dropdown
                    currentDropMenu.querySelectorAll('.h-drop-links-item.is-active').forEach(item => {
                        item.classList.remove('is-active');
                    });
                }
            }
        }

        // Submenu button handler
        const captionBtn = e.target.closest('.h-drop-caption-btn');
        if (captionBtn) {
            e.preventDefault();
            e.stopPropagation();

            const parentItem = captionBtn.closest('.h-drop-links-item[data-sub-id]');
            if (parentItem) {
                const subId = parentItem.getAttribute('data-sub-id');

                // Close all other submenus in the same dropdown
                const dropdownMenu = parentItem.closest('.h-drop-menu');
                if (dropdownMenu) {
                    dropdownMenu.querySelectorAll('.h-drop-links-item.is-active').forEach(item => {
                        if (item !== parentItem) {
                            item.classList.remove('is-active');
                        }
                    });
                }

                // Toggle current submenu
                parentItem.classList.toggle('is-active');
            }
        }
    });
}

// Click 
document.addEventListener('click', function (e) {
    // Open/Close Menu
    const menuTrigger = e.target.closest('.js_open_menu');

    if (menuTrigger) {
        e.preventDefault();
        e.stopPropagation();

        html.classList.remove('open-filter');
        html.classList.remove('overflow-hidden');

        if (winW <= 1199) {
            const isMenuOpen = html.classList.contains('overflow-menu');

            if (isMenuOpen) {
                html.classList.remove('overflow-menu');
                html.classList.remove('open-menu');
            } else {
                const btnSocialPanel = document.querySelector('.bt-menu-wrap .btn-social-panel');
                if (btnSocialPanel) {
                    btnSocialPanel.classList.remove('is-active');
                }

                html.classList.add('overflow-menu');
                html.classList.add('open-menu');
            }
        }
    }

    // Close menu on overlay click
    if (matches(e.target, '.h-menu-overlay')) {
        html.classList.remove('overflow-menu');
        html.classList.remove('open-menu');
    }

    // Close menu on menu item click (optional)
    if (e.target.closest('.h-menu') && e.target.tagName === 'A') {
        // Close menu when clicking on menu links
        html.classList.remove('overflow-menu');
        html.classList.remove('open-menu');
    }

    // Close mobile dropdowns when clicking outside on mobile
    if (winW <= 1199) {
        const isDropdownClick = e.target.closest('.h-drop-link[data-id]') || e.target.closest('.h-drop-menu[data-id]');
        const isLinkClick = e.target.tagName === 'A' || e.target.closest('a');

        if (!isDropdownClick && !isLinkClick) {
            document.querySelectorAll('.h-drop-menu[data-id]').forEach(menu => {
                menu.classList.remove('is-active');
                menu.querySelectorAll('.h-drop-links-item.is-active').forEach(item => {
                    item.classList.remove('is-active');
                });
            });

            document.querySelectorAll('.h-drop-link[data-id]').forEach(link => {
                link.classList.remove('is-open');
            });
        }
    }

    // Social panel toggle functionality
    const btnLoading = e.target.closest('.bt-menu-wrap .btn-loading');
    if (btnLoading) {
        e.preventDefault();
        e.stopPropagation();

        const btnSocialPanel = document.querySelector('.bt-menu-wrap .btn-social-panel');
        if (btnSocialPanel) {
            if (html.classList.contains('overflow-menu')) {
                html.classList.remove('overflow-menu');
                html.classList.remove('open-menu');
            }

            btnSocialPanel.classList.toggle('is-active');
        }
    }

    // Close social panel when clicking outside
    const btMenuWrap = document.querySelector('.bt-menu-wrap');
    const btnSocialPanel = document.querySelector('.bt-menu-wrap .btn-social-panel');
    if (btMenuWrap && btnSocialPanel && !btMenuWrap.contains(e.target)) {
        btnSocialPanel.classList.remove('is-active');
    }


    // Open/Close Filter
    const filterTrigger = e.target.closest('.js_open_filter');

    if (filterTrigger) {
        e.preventDefault();
        e.stopPropagation();

        html.classList.toggle('open-filter');
        html.classList.add('overflow-hidden');
    }

    if (e.target.closest('.js_close_filter')) {
        html.classList.remove('open-filter');
        html.classList.remove('overflow-hidden');
    }
});



//*===========
//*  POPUPS  =
//*===========
_functions.scrollWidth = function () {
    const body = document.body;
    const hWrap = document.querySelector('.h-wrap');
    let scrWidth = winW - body.clientWidth;

    body.style.paddingRight = `${scrWidth}px`;
    if (hWrap) {
        hWrap.style.paddingRight = `${scrWidth}px`;
    }
}

// Load form for mobile/tablet screens
_functions.loadFormToPage = function () {
    const formInner = document.querySelector('.form-section');
    if (formInner && winW < 1200) {
        const ajaxForm = new XMLHttpRequest();

        ajaxForm.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = this.responseText;

                const formPopup = tempDiv.querySelector('.popup-content[data-rel="popup-form"]');
                if (formPopup) {
                    formInner.innerHTML = formPopup.innerHTML;
                    formInner.removeAttribute('style');
                }
            }
        };
        ajaxForm.open('GET', '/inc/popups/_popups/index.html', true);
        ajaxForm.send();
    }
};

// Load form on page load if needed
_functions.loadFormToPage();

// Popups Functions
let popupTop = 0;
_functions.removeScroll = function () {
    _functions.scrollWidth();
    popupTop = winScr;
    html.style.top = '-' + winScr + 'px';
    html.style.width = '100%';
    html.classList.add('overflow-hidden');
}

_functions.addScroll = function () {
    _functions.scrollWidth();
    html.classList.remove('overflow-hidden');
    html.style.top = '';
    html.style.width = '';
    window.scrollTo(0, popupTop);
}

_functions.openPopup = function (popup) {
    const popupContents = document.querySelectorAll('.popup-content');
    const popupWrapper = document.querySelector('.popup-wrapper');
    const targetPopup = document.querySelector(popup);

    popupContents.forEach(content => content.classList.remove('active'));

    if (targetPopup && popupWrapper) {
        requestAnimationFrame(() => {
            popupWrapper.classList.add('active');

            requestAnimationFrame(() => {
                targetPopup.classList.add('active');
            });
        });
    }

    _functions.removeScroll();
};

_functions.closePopup = function () {
    const popupWrapper = document.querySelector('.popup-wrapper');
    const popupContents = document.querySelectorAll('.popup-content');
    const videoIframes = document.querySelectorAll('.video-popup iframe');

    if (popupWrapper) {
        popupWrapper.classList.remove('active');
        popupContents.forEach(content => content.classList.remove('active'));
        videoIframes.forEach(iframe => iframe.remove());
    }

    _functions.addScroll();
};

// Close popup
document.addEventListener('click', function (e) {
    if (matches(e.target, '.popup-content .close-popup, .popup-content .layer-close')) {
        e.preventDefault();
        _functions.closePopup();
    }
});

// Ajax popup
document.addEventListener('click', function (e) {
    if (e.target.closest('.open-popup')) {
        e.preventDefault();

        const popupWrapper = document.getElementById('popups');
        if (!popupWrapper) {
            return;
        }

        let dataRel = e.target.closest('.open-popup').getAttribute('data-rel');

        if (dataRel === 'popup-form' && winW < 1200) {

            // Close menu if it's open
            if (html.classList.contains('overflow-menu')) {
                html.classList.remove('overflow-menu');
                html.classList.remove('open-menu');
            }

        }


        if (popupWrapper.hasChildNodes()) {
            _functions.openPopup('.popup-content[data-rel="' + dataRel + '"]');
        } else {
            const ajaxPopup = new XMLHttpRequest();

            ajaxPopup.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    popupWrapper.innerHTML = this.responseText;

                    setTimeout(() => {
                        _functions.openPopup('.popup-content[data-rel="' + dataRel + '"]');
                    }, 10);
                }
            };
            ajaxPopup.open('GET', '/inc/popups/_popups/index.html', true);
            ajaxPopup.send();
        }
    }
});


_functions.openPopupAfterLoad = function(dataRel) {
    const popupWrapper = document.getElementById('popups');
    if (!popupWrapper) {
        return;
    }

    if (popupWrapper.querySelector('.popup-content[data-rel="' + dataRel + '"]')) {
        _functions.openPopup('.popup-content[data-rel="' + dataRel + '"]');
        return;
    }

    const ajaxPopup = new XMLHttpRequest();
    ajaxPopup.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            popupWrapper.innerHTML = this.responseText;

            setTimeout(() => {
                _functions.openPopup('.popup-content[data-rel="' + dataRel + '"]');
            }, 10);
        }
    };
    ajaxPopup.open('GET', '/inc/popups/_popups/index.html', true);
    ajaxPopup.send();
}

// Open Video popup
document.addEventListener('click', function (e) {
    if (e.target.closest('.video-open')) {
        e.preventDefault();

        const videoTrigger = e.target.closest('.video-open');
        const videoUrl = videoTrigger.getAttribute('data-href');

        const videoPopupContainer = document.querySelector('.video-popup-container iframe');
        const videoPopup = document.querySelector('.video-popup');
        const videoPopupContent = document.querySelector('.video-popup-content');

        if (videoPopupContainer && videoUrl) {
            videoPopupContainer.setAttribute('src', videoUrl);
        }

        if (videoPopup) {
            videoPopup.classList.add('is-active');
        }

        if (videoPopupContent) {
            videoPopupContent.classList.add('is-active');
        }

        _functions.removeScroll();
    }
});

// Close Video popup
document.addEventListener('click', function (e) {
    if (e.target.closest('.video-popup-close') || e.target.closest('.video-popup-layer')) {
        e.preventDefault();

        _functions.addScroll();

        const videoPopupContent = document.querySelector('.video-popup-content');
        const videoPopup = document.querySelector('.video-popup');
        const videoPopupContainer = document.querySelector('.video-popup-container iframe');

        if (videoPopupContent) {
            videoPopupContent.classList.remove('is-active');
        }

        if (videoPopup) {
            videoPopup.classList.remove('is-active');
        }

        setTimeout(() => {
            if (videoPopupContainer) {
                videoPopupContainer.setAttribute('src', 'about:blank');
            }
        }, 30);
    }
});



//*===============================
//*  KEY FOCUS, TABS, ACCORDION  =
//*===============================
// Detect if user is using keyboard tab-button to navigate
// with 'keyboard-focus' class we add default css outlines
function keyboardFocus(e) {
    if (e.keyCode !== 9) {
        return;
    }

    switch (e.target.nodeName.toLowerCase()) {
        case 'input':
        case 'select':
        case 'textarea':
            break;
        default:
            html.classList.add('keyboard-focus');
            document.removeEventListener('keydown', keyboardFocus, false);
    }
}
document.addEventListener('keydown', keyboardFocus, false);



// Tabs
document.addEventListener('click', function (e) {
    if (matches(e.target, '._tab-item')) {
        const tabsContainer = e.target.closest('._tabs');
        const tabs = tabsContainer.querySelectorAll('._tab');
        const tabItems = tabsContainer.querySelectorAll('._tab-item');
        const currentIndex = Array.from(tabItems).indexOf(e.target);

        tabItems.forEach(item => item.classList.remove('is-active'));
        e.target.classList.add('is-active');

        tabs.forEach((tab, index) => {
            if (index === currentIndex) {
                tab.style.display = 'block';
                tab.style.opacity = '1';
            } else {
                tab.style.display = 'none';
                tab.style.opacity = '0';
            }
        });
    }
});



// Accordion Universal System
_functions.accordionInstances = new Map();
_functions.accordionGlobalListener = false;

_functions.initAcc = function (containerSelector, titleSelector, closeOthers = true) {
    const containers = document.querySelectorAll(containerSelector);

    if (!containers.length) {
        return;
    }

    // Store accordion configurations
    containers.forEach(container => {
        const containerId = container.dataset.accordionId || Math.random().toString(36).substr(2, 9);
        container.dataset.accordionId = containerId;

        _functions.accordionInstances.set(containerId, {
            container: container,
            titleSelector: titleSelector,
            closeOthers: closeOthers,
            items: Array.from(container.children)
        });
    });

    // Add global event listener only once
    if (!_functions.accordionGlobalListener) {
        document.addEventListener('click', _functions.handleAccordionClick);
        _functions.accordionGlobalListener = true;
    }
};

_functions.handleAccordionClick = function (e) {
    // Find which accordion instance this click belongs to
    for (let [instanceId, config] of _functions.accordionInstances) {
        const titleElement = e.target.closest(config.titleSelector);

        if (titleElement && config.container.contains(titleElement)) {
            e.preventDefault();

            const parentElement = titleElement.parentElement;

            if (!parentElement) {
                return;
            }

            const isActive = parentElement.classList.contains('is-active');

            if (!isActive) {
                // Close other accordion items if closeOthers is true
                if (config.closeOthers) {
                    config.items.forEach(item => {
                        if (item !== parentElement) {
                            item.classList.remove('is-active');
                        }
                    });
                }
                parentElement.classList.add('is-active');
            } else {
                parentElement.classList.remove('is-active');
            }

            break;
        }
    }
};

// Initialize different accordion types
_functions.initAcc('.accordion', '.accordion-title', true);
if (winW >= 991) {
    _functions.initAcc('.service-block:not(.type-2)', '.service-title', true);
}
if (winW <= 990) {
    _functions.initAcc('.service-block.mob-ver2', '.service-block.mob-ver2 div.service-title', true);
}

// Additional utility methods for accordion management
_functions.openAccordionItem = function (containerSelector, itemIndex) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const items = Array.from(container.children);
    if (items[itemIndex]) {
        items[itemIndex].classList.add('is-active');
    }
};

_functions.closeAccordionItem = function (containerSelector, itemIndex) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const items = Array.from(container.children);
    if (items[itemIndex]) {
        items[itemIndex].classList.remove('is-active');
    }
};

_functions.closeAllAccordionItems = function (containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const items = Array.from(container.children);
    items.forEach(item => item.classList.remove('is-active'));
};

_functions.toggleAccordionItem = function (containerSelector, itemIndex) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const items = Array.from(container.children);
    if (items[itemIndex]) {
        items[itemIndex].classList.toggle('is-active');
    }
};



//*====================
//*  DYNAMIC LOAD JS  =
//*====================
function videoLoad(block) {
    const videoBlock = block.querySelector('video');
    if (!videoBlock) return;
    let videoSrc = '';
    if (winW > 1199) {
        videoSrc = videoBlock.getAttribute('data-src') || videoBlock.dataset.src;
    } else {
        videoSrc = videoBlock.getAttribute('data-src-mob') || videoBlock.dataset.srcMob;
    }
    if (!videoSrc) return;
    if (videoBlock.getAttribute('src') === videoSrc) return;
    videoBlock.setAttribute('src', videoSrc);
}

const videoObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        videoLoad(entry.target);
        observer.unobserve(entry.target);
    });
}, {
    root: null,
    rootMargin: "50%",
});

document.querySelectorAll(".video").forEach((element) => {
    videoObserver.observe(element);
});

document.querySelectorAll('.video.video-present video').forEach(video => {
    video.setAttribute('autoplay', '');
});



//*=================
//*  VIDEO BANNER  =
//*=================
// Re-query DOM each frame so markup injected after this script loads (e.g. React shell) still works.
let videoBannerLocked = false;

function updateVideoPosition() {
    winW = window.innerWidth;
    winH = window.innerHeight;

    const video = document.getElementById('videoBlock');
    const target = document.getElementById('fullscreenSection');
    const targetContainer = target ? target.querySelector('.fullscreen-video-container') : null;
    const startContainer = document.getElementById('headline-media');

    if (winW <= 991) {
        return;
    }

    if (!video || !target || !targetContainer || !startContainer) {
        return;
    }

    // Keep lock state in sync with DOM (e.g. React replaced markup after scroll)
    if (targetContainer.contains(video)) {
        videoBannerLocked = true;
    } else {
        videoBannerLocked = false;
    }

    const scrollTop = window.scrollY;
    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    const startRect = startContainer.getBoundingClientRect();
    const startTop = startRect.top + window.scrollY;
    const startLeft = startRect.left + window.scrollX;

    const start = {
        width: startContainer.offsetWidth,
        height: startContainer.offsetHeight,
        top: startTop,
        left: startLeft
    };

    const animationStart = 0;
    const animationEnd = targetTop;

    const progress = Math.min(1, Math.max(0, (scrollTop - animationStart) / (animationEnd - animationStart)));

    if (scrollTop >= animationEnd && !videoBannerLocked) {
        video.classList.add('absolute');
        Object.assign(video.style, {
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100vh',
            transform: 'none'
        });
        targetContainer.appendChild(video);
        videoBannerLocked = true;
    }

    if (scrollTop < animationEnd && videoBannerLocked) {
        video.classList.remove('absolute');
        Object.assign(video.style, {
            position: 'fixed',
            top: `${start.top}px`,
            left: `${start.left}px`,
            width: `${start.width}px`,
            height: `${start.height}px`,
            transform: 'none'
        });
        startContainer.appendChild(video);
        videoBannerLocked = false;
    }

    if (!videoBannerLocked) {
        const width = start.width + (winW - start.width) * progress;
        const height = start.height + (winH - start.height) * progress;

        const top = start.top + (0 - start.top) * progress;
        const left = start.left + (0 - start.left) * progress;

        Object.assign(video.style, {
            position: 'fixed',
            top: `${top}px`,
            left: `${left}px`,
            width: `${width}px`,
            height: `${height}px`,
            transform: 'none'
        });
    }
}

window.addEventListener('scroll', updateVideoPosition, { passive: true });
window.addEventListener('resize', updateVideoPosition);
updateVideoPosition();



//*==================
//*  CUSTOM SLIDER  =
//*==================
/**
 * SliderConstructor - Custom Slider with Constructor Pattern
 * Supports horizontal/vertical direction, drag functionality, pagination, progress bars
 * and responsive breakpoints with fractional slide counts
 */
class SliderConstructor {
    constructor(element, options = {}) {
        // Core elements
        this.element = element;
        this.wrapper = element.querySelector('.slider-wrapper');
        this.container = element.querySelector('.slider-container');
        this.slides = Array.from(element.querySelectorAll('.slide'));
        this.originalSlides = [...this.slides]; // Зберігаємо оригінальні слайди

        // Configuration
        this.config = this.parseConfig(options);

        // State
        this.currentIndex = 0;
        this.realIndex = 0;
        this.isAnimating = false;
        this.isDragging = false;
        this.hasMoved = false;
        this.dragDistance = 0;
        this.startPos = { x: 0, y: 0 };
        this.currentTranslate = 0;
        this.prevTranslate = 0;

        // Infinite scroll
        this.clonesCount = 0;
        this.isTransitioning = false;

        // Autoplay
        this.autoplayTimer = null;
        this.autoplayProgressTimer = null;
        this.autoplayStartTime = null;
        this.autoplayPaused = false;

        // Progress bars debounce
        this.progressUpdateTimeout = null;
        this.lastProgressUpdate = 0;
        this.progressUpdateBlocked = false;

        // Manual navigation flag
        this.isManualNavigation = false;

        // Responsive
        this.currentBreakpoint = null;
        this.slidesToShow = 1;

        // Touch/Mouse
        this.isMobile = window.innerWidth < 1200;

        // Initialize
        this.init();
    }

    /**
     * Parse configuration from data attributes and options
     */
    parseConfig(options) {
        const element = this.element;

        const defaults = {
            direction: 'horizontal',
            loop: false,
            pagination: false,
            paginationType: 'bullets', // 'bullets' or 'numbers'
            progressGlobal: false,
            progressSlides: false,
            autoHeight: false,
            navigation: false,

            // Responsive direction
            directionXs: null,
            directionSm: null,
            directionMd: null,
            directionLg: null,
            directionXl: null,

            // Autoplay
            autoplay: false,
            autoplayDelay: 3000,
            pauseOnHover: false,

            // Responsive slides configuration (only xs has default, others inherit)
            slidesXs: 1,
            // slidesSm, slidesMd, slidesLg, slidesXl - inherit from previous

            // Gap configuration (only xs has default, others inherit)
            gapXs: 0,
            // gapSm, gapMd, gapLg, gapXl - inherit from previous

            // Animation
            speed: 400,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',

            // Drag
            threshold: 50,
            resistance: 0.3
        };

        let config = { ...defaults, ...options };

        if (element.dataset.options) {
            try {
                const dataOptions = JSON.parse(element.dataset.options);
                config = { ...config, ...dataOptions };
            } catch (e) {
                console.warn('Invalid JSON in data-options:', element.dataset.options);
            }
        }

        if (element.dataset.direction) config.direction = element.dataset.direction;
        if (element.dataset.loop === 'true') config.loop = true;
        if (element.dataset.pagination === 'true') config.pagination = true;
        if (element.dataset.paginationType) config.paginationType = element.dataset.paginationType;
        if (element.dataset.progressGlobal === 'true') config.progressGlobal = true;
        if (element.dataset.progressSlides === 'true') config.progressSlides = true;
        if (element.dataset.autoHeight === 'true') config.autoHeight = true;
        if (element.dataset.navigation === 'true') config.navigation = true;
        if (element.dataset.autoplay === 'true') config.autoplay = true;
        if (element.dataset.autoplayDelay) config.autoplayDelay = parseInt(element.dataset.autoplayDelay);
        if (element.dataset.pauseOnHover === 'false') config.pauseOnHover = false;

        if (element.dataset.slidesXs !== undefined) config.slidesXs = Math.round(parseFloat(element.dataset.slidesXs) * 10) / 10;
        if (element.dataset.slidesSm !== undefined) config.slidesSm = Math.round(parseFloat(element.dataset.slidesSm) * 10) / 10;
        if (element.dataset.slidesMd !== undefined) config.slidesMd = Math.round(parseFloat(element.dataset.slidesMd) * 10) / 10;
        if (element.dataset.slidesLg !== undefined) config.slidesLg = Math.round(parseFloat(element.dataset.slidesLg) * 10) / 10;
        if (element.dataset.slidesXl !== undefined) config.slidesXl = Math.round(parseFloat(element.dataset.slidesXl) * 10) / 10;

        if (element.dataset.directionXs) config.directionXs = element.dataset.directionXs;
        if (element.dataset.directionSm) config.directionSm = element.dataset.directionSm;
        if (element.dataset.directionMd) config.directionMd = element.dataset.directionMd;
        if (element.dataset.directionLg) config.directionLg = element.dataset.directionLg;
        if (element.dataset.directionXl) config.directionXl = element.dataset.directionXl;

        if (element.dataset.gapXs !== undefined) config.gapXs = element.dataset.gapXs;
        if (element.dataset.gapSm !== undefined) config.gapSm = element.dataset.gapSm;
        if (element.dataset.gapMd !== undefined) config.gapMd = element.dataset.gapMd;
        if (element.dataset.gapLg !== undefined) config.gapLg = element.dataset.gapLg;
        if (element.dataset.gapXl !== undefined) config.gapXl = element.dataset.gapXl;

        return config;
    }

    /**
     * Get current responsive breakpoint
     */
    getCurrentBreakpoint() {
        const width = window.innerWidth;

        if (width < 576) return 'xs';
        if (width < 768) return 'sm';
        if (width < 992) return 'md';
        if (width < 1200) return 'lg';
        return 'xl';
    }

    /**
     * Get number of slides to show for current breakpoint with fallback
     */
    getSlidesToShow() {
        const breakpoint = this.currentBreakpoint;
        const fallbackHierarchy = this.getFallbackHierarchy(breakpoint);

        let result;
        // Try current breakpoint first, then fallback to previous ones
        for (let i = 0; i < fallbackHierarchy.length; i++) {
            const bp = fallbackHierarchy[i];
            switch (bp) {
                case 'xs': if (this.config.slidesXs !== undefined) result = this.config.slidesXs; break;
                case 'sm': if (this.config.slidesSm !== undefined) result = this.config.slidesSm; break;
                case 'md': if (this.config.slidesMd !== undefined) result = this.config.slidesMd; break;
                case 'lg': if (this.config.slidesLg !== undefined) result = this.config.slidesLg; break;
                case 'xl': if (this.config.slidesXl !== undefined) result = this.config.slidesXl; break;
            }
            if (result !== undefined) break;
        }

        // Round to 1 decimal place and ensure minimum of 1
        const rounded = Math.round((result || 1) * 10) / 10;
        return Math.max(rounded, 0.1);
    }

    /**
     * Get gap for current breakpoint with fallback
     */
    getGap() {
        const breakpoint = this.currentBreakpoint;
        const fallbackHierarchy = this.getFallbackHierarchy(breakpoint);

        let result;
        // Try current breakpoint first, then fallback to previous ones
        for (let i = 0; i < fallbackHierarchy.length; i++) {
            const bp = fallbackHierarchy[i];
            switch (bp) {
                case 'xs': if (this.config.gapXs !== undefined) result = this.config.gapXs; break;
                case 'sm': if (this.config.gapSm !== undefined) result = this.config.gapSm; break;
                case 'md': if (this.config.gapMd !== undefined) result = this.config.gapMd; break;
                case 'lg': if (this.config.gapLg !== undefined) result = this.config.gapLg; break;
                case 'xl': if (this.config.gapXl !== undefined) result = this.config.gapXl; break;
            }
            if (result !== undefined) break;
        }

        return result || 0;
    }

    /**
     * Get fallback hierarchy starting from given breakpoint
     */
    getFallbackHierarchy(breakpoint) {
        const fallbackHierarchy = ['xs', 'sm', 'md', 'lg', 'xl'];
        const currentIndex = fallbackHierarchy.indexOf(breakpoint);

        // Return array starting from current breakpoint and going backward (larger to smaller)
        const result = [];
        for (let i = currentIndex; i >= 0; i--) {
            result.push(fallbackHierarchy[i]);
        }
        return result;
    }

    /**
     * Get direction for current breakpoint with fallback
     */
    getCurrentDirection() {
        const breakpoint = this.currentBreakpoint;
        const fallbackHierarchy = this.getFallbackHierarchy(breakpoint);

        let result = undefined;
        for (let i = 0; i < fallbackHierarchy.length; i++) {
            const bp = fallbackHierarchy[i];
            switch (bp) {
                case 'xs': if (this.config.directionXs) result = this.config.directionXs; break;
                case 'sm': if (this.config.directionSm) result = this.config.directionSm; break;
                case 'md': if (this.config.directionMd) result = this.config.directionMd; break;
                case 'lg': if (this.config.directionLg) result = this.config.directionLg; break;
                case 'xl': if (this.config.directionXl) result = this.config.directionXl; break;
            }
            if (result !== undefined) break;
        }

        return result || this.config.direction;
    }

    /**
     * Convert gap value to pixels for calculations
     */
    getGapInPixels() {
        const gap = this.getGap();
        if (!gap) return 0;

        if (typeof gap === 'string' && gap.includes('rem')) {
            // Convert rem to pixels (assuming 1rem = 16px)
            const remValue = parseFloat(gap);
            const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
            return remValue * rootFontSize;
        } else if (typeof gap === 'string' && gap.includes('px')) {
            return parseFloat(gap);
        } else if (typeof gap === 'number') {
            return gap;
        }

        return 0;
    }

    /**
     * Check if navigation is possible
     */
    canNavigateNext() {
        if (this.config.loop) return true;

        // Calculate max index considering visible slides
        const maxIndex = Math.max(0, this.slides.length - Math.floor(this.slidesToShow));
        return this.currentIndex < maxIndex;
    }

    canNavigatePrev() {
        if (this.config.loop) return true;
        return this.currentIndex > 0;
    }

    /**
     * Get maximum valid index
     */
    getMaxIndex() {
        return Math.max(0, this.originalSlides.length - Math.floor(this.slidesToShow));
    }

    /**
     * Create clones for infinite scroll
     */
    createClones() {
        if (!this.config.loop) return;

        // Remove existing clones
        this.removeClones();

        const slidesToClone = Math.ceil(this.slidesToShow) + 1;
        this.clonesCount = slidesToClone;

        // Clone slides at the beginning (last slides)
        const startClones = [];
        for (let i = this.originalSlides.length - slidesToClone; i < this.originalSlides.length; i++) {
            const clone = this.originalSlides[i].cloneNode(true);
            clone.classList.add('slider-clone', 'slider-clone-prev');
            clone.setAttribute('data-clone-index', i);
            startClones.push(clone);
        }

        for (let j = startClones.length - 1; j >= 0; j--) {
            this.container.insertBefore(startClones[j], this.container.firstChild);
        }

        // Clone slides at the end (first slides)
        for (let i = 0; i < slidesToClone; i++) {
            const clone = this.originalSlides[i].cloneNode(true);
            clone.classList.add('slider-clone', 'slider-clone-next');
            clone.setAttribute('data-clone-index', i);
            this.container.appendChild(clone);
        }

        // Update slides array
        this.slides = Array.from(this.container.querySelectorAll('.slide'));

        const startRealIndex = this.realIndex || 0;
        this.currentIndex = this.clonesCount + startRealIndex;
        this.realIndex = startRealIndex;
    }

    /**
     * Remove all clones
     */
    removeClones() {
        const clones = this.container.querySelectorAll('.slider-clone');
        clones.forEach(clone => clone.remove());
        this.slides = Array.from(this.container.querySelectorAll('.slide'));
        this.clonesCount = 0;
    }

    /**
     * Get real index (without clones)
     */
    getRealIndex() {
        if (!this.config.loop) {
            return this.currentIndex;
        }

        if (this.currentIndex < this.clonesCount) {
            const realIndex = this.originalSlides.length - this.clonesCount + this.currentIndex;
            return realIndex;
        } else if (this.currentIndex >= this.clonesCount + this.originalSlides.length) {
            const realIndex = this.currentIndex - (this.clonesCount + this.originalSlides.length);
            return realIndex;
        } else {
            const realIndex = this.currentIndex - this.clonesCount;
            return realIndex;
        }
    }

    /**
     * Check if we need to reset position for infinite loop
     */
    checkInfiniteLoop() {
        if (!this.config.loop || this.isTransitioning) return;

        // Check if we're at clone slides and need to reset
        if (this.currentIndex < this.clonesCount) {
            this.isTransitioning = true;

            const cloneData = this.slides[this.currentIndex].getAttribute('data-clone-index');
            const realSlideIndex = parseInt(cloneData);
            const newIndex = this.clonesCount + realSlideIndex;

            this.currentIndex = newIndex;
            this.updateSliderWithoutAnimation();
            setTimeout(() => {
                this.isTransitioning = false;
            }, 50);
        } else if (this.currentIndex >= this.clonesCount + this.originalSlides.length) {
            this.isTransitioning = true;
            const offsetFromEnd = this.currentIndex - (this.clonesCount + this.originalSlides.length);
            const newIndex = this.clonesCount + offsetFromEnd;

            this.currentIndex = newIndex;
            this.updateSliderWithoutAnimation();

            if (this.config.autoplay) {
                setTimeout(() => {
                    this.resetAutoplayProgress();
                    this.initializeAutoplayProgress();
                }, 100);
            }

            setTimeout(() => {
                this.isTransitioning = false;
            }, 50);
        }

        // Update real index and controls
        this.realIndex = this.getRealIndex();
        this.updateControls(true);
    }

    /**
     * Initialize slider
     */
    init() {
        // Initialize responsive parameters
        this.currentBreakpoint = this.getCurrentBreakpoint();
        this.slidesToShow = this.getSlidesToShow();

        // Add loading class to prevent visual jumps
        this.element.classList.add('slider-loading');

        this.setDataAttributes();

        this.setInitialStyles();
        this.createClones();
        this.createControls();
        this.bindEvents();

        // Set initial position without animation
        this.updateSliderWithoutAnimation();

        // Start autoplay if enabled
        if (this.config.autoplay) {
            this.startAutoplay();
        }

        // Remove loading state after a brief delay
        setTimeout(() => {
            this.element.classList.remove('slider-loading');
            this.element.style.opacity = '1';
        }, 150);
    }

    /**
     * Set data attributes for CSS selectors
     */
    setDataAttributes() {
        const currentDirection = this.getCurrentDirection();
        this.element.setAttribute('data-direction', currentDirection);

        if (this.config.loop) this.element.setAttribute('data-loop', 'true');
        if (this.config.pagination) this.element.setAttribute('data-pagination', 'true');
        if (this.config.navigation) this.element.setAttribute('data-navigation', 'true');
        if (this.config.autoHeight) this.element.setAttribute('data-auto-height', 'true');
        if (this.config.progressGlobal) this.element.setAttribute('data-progress-global', 'true');
        if (this.config.progressSlides) this.element.setAttribute('data-progress-slides', 'true');
    }

    /**
     * Set initial styles and properties
     */
    setInitialStyles() {
        // Set slider container styles based on direction
        this.container.style.transition = `transform ${this.config.speed}ms ${this.config.easing}`;
        this.container.style.willChange = 'transform';

        // Set slide widths/heights
        this.updateSlidesSizes();

        // Set auto height for sliders
        if (this.config.autoHeight) {
            this.updateAutoHeight();
        }
    }

    /**
     * Update slides sizes based on current breakpoint
     */
    updateSlidesSizes() {
        const slidesToShow = this.getSlidesToShow();
        const gap = this.getGap();
        const gapInPixels = this.getGapInPixels();

        // Set gap on container using original value (supports rem, px, etc.)
        if (gap) {
            this.container.style.gap = typeof gap === 'string' ? gap : `${gap}px`;
        } else {
            this.container.style.gap = '';
        }

        if (this.getCurrentDirection() === 'horizontal') {
            // Calculate slide width accounting for gaps
            if (gap && gapInPixels > 0) {
                // With gaps: use precise calc() calculation
                const slideWidthPercent = (100 / slidesToShow).toFixed(6);
                const gapValue = typeof gap === 'string' ? gap : `${gap}px`;
                const totalGapsInPercent = `(${gapValue} * ${(slidesToShow - 1).toFixed(1)} / ${slidesToShow.toFixed(1)})`;

                this.slides.forEach(slide => {
                    slide.style.setProperty('width', `calc(${slideWidthPercent}% - ${totalGapsInPercent})`, 'important');
                    slide.style.height = 'auto';
                });
            } else {
                // Without gaps: precise percentage calculation
                const slideWidth = (100 / slidesToShow).toFixed(6);
                this.slides.forEach(slide => {
                    slide.style.setProperty('width', `${slideWidth}%`, 'important');
                    slide.style.height = 'auto';
                });
            }

        } else {
            if (gap) {
                this.container.style.flexDirection = 'column';
                this.container.style.gap = typeof gap === 'string' ? gap : `${gap}px`;
            }

            const slideHeight = (100 / slidesToShow).toFixed(6);
            this.slides.forEach(slide => {
                slide.style.setProperty('width', '100%', 'important');
                slide.style.setProperty('height', this.config.autoHeight ? 'auto' : `${slideHeight}%`, 'important');
                slide.style.flexShrink = '0';
                slide.style.boxSizing = 'border-box';
            });
        }
    }

    /**
     * Update auto height for sliders
     */
    updateAutoHeight() {
        const isVertical = this.getCurrentDirection() === 'vertical';
        const isAutoHeight = !!this.config.autoHeight;
        const currentSlide = this.slides[this.currentIndex];

        if (isVertical && isAutoHeight && currentSlide) {
            const slideHeight = currentSlide.offsetHeight + 5;
            this.element.style.setProperty('--height-slider', `${slideHeight}px`);
        } else if (isVertical) {
            let wrapperHeight = 0;
            if (this.wrapper) {
                wrapperHeight = this.wrapper.offsetHeight + 5;
            } else if (this.container) {
                wrapperHeight = this.container.offsetHeight + 5;
            }
            if (wrapperHeight > 0) {
                this.element.style.setProperty('--height-slider', `${wrapperHeight + 5}px`);
            }
        }

        if (isAutoHeight && currentSlide) {
            const slideHeight = currentSlide.offsetHeight + 5;
            const currentWrapperStyle = getComputedStyle(this.wrapper).height;
            const currentWrapperHeight = currentWrapperStyle === 'auto' ? 0 : parseInt(this.wrapper.style.height) || this.wrapper.offsetHeight;
            if (Math.abs(slideHeight - currentWrapperHeight) > 1 || currentWrapperStyle === 'auto') {
                if (currentWrapperStyle !== 'auto' && !this.wrapper.style.transition.includes('height')) {
                    this.wrapper.style.transition = this.wrapper.style.transition
                        ? this.wrapper.style.transition + ', height 0.3s ease'
                        : 'height 0.3s ease';
                }
                this.wrapper.style.height = `${slideHeight}px`;

                if (!isVertical) {
                    this.wrapper.parentElement.style.setProperty('--height-slider', `${slideHeight}px`);
                }

                if (currentWrapperStyle !== 'auto') {
                    setTimeout(() => {
                        if (this.wrapper.style.transition.includes('height')) {
                            this.wrapper.style.transition = this.wrapper.style.transition
                                .replace(/,?\s*height[^,]*/g, '')
                                .replace(/^,\s*/, '')
                                .trim();
                        }
                    }, 300);
                }
            }
        }
    }

    /**
     * Create control elements (pagination, progress bars, navigation)
     */
    createControls() {
        // Create navigation arrows
        if (this.config.navigation) {
            this.createNavigation();
        }

        // Create pagination
        if (this.config.pagination) {
            this.createPagination();
        }

        // Create global progress bar
        if (this.config.progressGlobal) {
            this.createGlobalProgress();
        }

        // Create slides progress bar
        if (this.config.progressSlides) {
            this.createSlidesProgress();
        }
    }

    /**
     * Create navigation arrows
     */
    createNavigation() {
        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'slider-nav slider-nav-prev';
        prevBtn.setAttribute('aria-label', 'Previous slide');
        prevBtn.addEventListener('click', () => this.prevSlide());

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'slider-nav slider-nav-next';
        nextBtn.setAttribute('aria-label', 'Next slide');
        nextBtn.addEventListener('click', () => this.nextSlide());

        this.navPrev = prevBtn;
        this.navNext = nextBtn;

        this.element.appendChild(prevBtn);
        this.element.appendChild(nextBtn);
    }

    /**
     * Create pagination bullets
     */
    createPagination() {
        const pagination = document.createElement('div');

        if (this.config.paginationType === 'numbers') {
            pagination.className = 'slider-pagination slider-pagination-numbers';
        } else {
            pagination.className = 'slider-pagination slider-pagination-bullets';
        }

        let paginationCount;

        if (this.config.loop) {
            if (this.slidesToShow >= this.originalSlides.length) {
                paginationCount = this.originalSlides.length;
            } else {
                paginationCount = this.originalSlides.length - Math.floor(this.slidesToShow) + 1;
            }
        } else {
            paginationCount = this.getMaxIndex() + 1;
        }

        for (let i = 0; i < paginationCount; i++) {
            const bullet = document.createElement('button');

            if (this.config.paginationType === 'numbers') {
                bullet.className = 'pagination-number';
                bullet.textContent = i + 1;
                bullet.setAttribute('aria-label', `Go to slide ${i + 1}`);
            } else {
                bullet.className = 'pagination-bullet';
                bullet.setAttribute('aria-label', `Go to slide ${i + 1}`);
            }

            bullet.addEventListener('click', () => {
                this.isManualNavigation = true;
                this.hasMoved = true;
                this.dragDistance = 20;

                if (this.config.autoplay) this.stopAutoplay(true);

                if (this.progressSlides) {
                    const progressBars = this.progressSlides.querySelectorAll('.slider-slide-progress-bar');
                    progressBars.forEach(bar => {
                        bar.style.transition = 'none';
                        if (this.config.direction === 'vertical') {
                            bar.style.height = '0%';
                        } else {
                            bar.style.width = '0%';
                        }
                        bar.offsetHeight;
                        bar.style.transition = '';
                    });
                }

                const go = this.config.loop ? this.goToRealSlide : this.goToSlide;
                go.call(this, i, false);

                this.updateProgressBars();

                setTimeout(() => {
                    this.isManualNavigation = false;
                    this.hasMoved = false;
                    this.dragDistance = 0;

                    if (this.config.autoplay) this.startAutoplay();
                }, 3000);
            });
            pagination.appendChild(bullet);
        }

        this.pagination = pagination;
        this.element.appendChild(pagination);
    }

    /**
     * Go to real slide (for loop pagination)
     */
    goToRealSlide(realIndex) {
        if (!this.config.loop) {
            this.goToSlide(realIndex);
            return;
        }

        this.realIndex = realIndex;
        this.currentIndex = this.clonesCount + realIndex;
        this.goToSlide(this.currentIndex);
    }

    /**
     * Create global progress bar
     */
    createGlobalProgress() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'slider-progress';

        const progressBar = document.createElement('div');
        progressBar.className = 'slider-progress-bar';

        progressContainer.appendChild(progressBar);
        this.progressGlobal = progressContainer;
        this.progressGlobalBar = progressBar;
        this.element.appendChild(progressContainer);
    }

    /**
     * Create slides progress bar
     */
    createSlidesProgress() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'slider-slide-progress';

        this.originalSlides.forEach((slide, index) => {
            const progressItem = document.createElement('div');
            progressItem.className = 'slider-slide-progress-item';

            const progressBar = document.createElement('div');
            progressBar.className = 'slider-slide-progress-bar';

            progressItem.appendChild(progressBar);
            progressContainer.appendChild(progressItem);
        });

        this.progressSlides = progressContainer;
        this.element.appendChild(progressContainer);
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Resize events
        window.addEventListener('resize', this.handleResize.bind(this));

        // Mouse events for desktop
        this.container.addEventListener('mousedown', this.handleStart.bind(this));
        document.addEventListener('mousemove', this.handleMove.bind(this));
        document.addEventListener('mouseup', this.handleEnd.bind(this));

        // Touch events for mobile
        this.container.addEventListener('touchstart', this.handleStart.bind(this), { passive: false });
        document.addEventListener('touchmove', this.handleMove.bind(this), { passive: false });
        document.addEventListener('touchend', this.handleEnd.bind(this));

        // Prevent context menu
        this.container.addEventListener('contextmenu', e => e.preventDefault());

        // Prevent drag on images
        this.container.addEventListener('dragstart', e => e.preventDefault());

        // Handle clicks on links and buttons during drag
        this.container.addEventListener('click', this.handleClick.bind(this), true);

        // Special handling for clickable elements on mobile
        this.container.addEventListener('touchstart', this.handleClickableTouch.bind(this), true);

        // Autoplay events
        if (this.config.autoplay && this.config.pauseOnHover) {
            this.element.addEventListener('mouseenter', this.pauseAutoplay.bind(this));
            this.element.addEventListener('mouseleave', this.resumeAutoplay.bind(this));
            this.element.addEventListener('focus', this.pauseAutoplay.bind(this), true);
            this.element.addEventListener('blur', this.resumeAutoplay.bind(this), true);
        }

        // Click events for progress items navigation
        if (this.progressSlides) {
            this.handleProgressClickBound = this.handleProgressClick.bind(this);
            this.progressSlides.addEventListener('click', this.handleProgressClickBound);
        }
    }

    /**
     * Handle clicks on progress items for navigation
     */
    handleProgressClick(e) {
        const progressItem = e.target.closest('.slider-slide-progress-item');
        if (!progressItem) return;

        const progressItems = this.progressSlides.querySelectorAll('.slider-slide-progress-item');
        const clickedIndex = Array.from(progressItems).indexOf(progressItem);

        if (clickedIndex >= 0 && clickedIndex < this.originalSlides.length) {
            if (this.config.autoplay) {
                this.stopAutoplay();
            }

            let targetIndex = clickedIndex;
            if (this.config.loop) {
                targetIndex = this.clonesCount + clickedIndex;
            }

            this.goToSlide(targetIndex, true);

            if (this.config.autoplay) {
                setTimeout(() => {
                    this.isManualNavigation = false;
                    this.startAutoplay();
                }, 3000);
            }
        }
    }

    /**
     * Handle resize events
     */
    handleResize() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            const newBreakpoint = this.getCurrentBreakpoint();
            const newSlidesToShow = this.getSlidesToShow();
            const newDirection = this.getCurrentDirection();

            // Update if breakpoint, slides count, or direction changed
            if (newBreakpoint !== this.currentBreakpoint ||
                newSlidesToShow !== this.slidesToShow ||
                newDirection !== this.element.getAttribute('data-direction')) {

                this.currentBreakpoint = newBreakpoint;
                this.slidesToShow = newSlidesToShow;
                this.isMobile = window.innerWidth < 1200;

                // Update direction if changed
                if (newDirection !== this.element.getAttribute('data-direction')) {
                    this.element.setAttribute('data-direction', newDirection);

                    // Reinitialize styles for new direction
                    this.setInitialStyles();
                }

                // Store real index for loop sliders
                if (this.config.loop) {
                    this.realIndex = this.getRealIndex();
                }

                // Update slides sizes
                this.updateSlidesSizes();

                // Recreate clones for loop sliders
                if (this.config.loop) {
                    this.createClones();
                }

                // Recreate pagination if needed
                if (this.config.pagination) {
                    this.pagination.remove();
                    this.createPagination();
                }

                // Ensure current index is within new bounds
                if (this.config.loop) {
                    this.currentIndex = this.clonesCount + this.realIndex;
                } else {
                    const maxIndex = this.getMaxIndex();
                    if (this.currentIndex > maxIndex) {
                        this.currentIndex = maxIndex;
                    }
                }

                // Update slider position
                this.updateSlider();

                // Update auto height after resize
                if (this.config.autoHeight) {
                    setTimeout(() => {
                        this.updateAutoHeight();
                    }, 50);
                }
            }
        }, 250);
    }

    /**
     * Handle clicks during/after drag to prevent unwanted link activation
     */
    handleClick(e) {
        // Allow clicks on links and buttons if movement is minimal
        const isClickableElement = e.target.closest('a, button, [onclick], [data-href], .clickable');

        if (isClickableElement && this.dragDistance <= 10) {
            // Allow the click to proceed for clickable elements with minimal movement
            return true;
        }

        // Only prevent clicks if there was significant dragging movement
        if (this.hasMoved && this.dragDistance > 15) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }
    }

    /**
     * Handle touch events on clickable elements
     */
    handleClickableTouch(e) {
        const clickableElement = e.target.closest('a, button, [onclick], [data-href], .clickable');
        if (clickableElement) {
            // Mark this touch as on a clickable element
            this.touchedClickable = true;
            this.clickableElement = clickableElement;
        }
    }

    /**
     * Handle drag/touch start
     */
    handleStart(e) {
        if (this.isAnimating) return;

        // If touch started on a clickable element, be more permissive
        const isClickableElement = e.target.closest('a, button, [onclick], [data-href], .clickable');

        this.isDragging = true;
        this.hasMoved = false;
        this.dragDistance = 0;
        this.touchedClickable = !!isClickableElement;
        this.element.classList.add('dragging');

        const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        const clientY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;

        this.startPos = { x: clientX, y: clientY };
        this.prevTranslate = this.currentTranslate;

        // Disable transitions during drag
        this.container.style.transition = 'none';

        // Only prevent default for mouse events or non-clickable elements
        if (e.type === 'mousedown' || !isClickableElement) {
            e.preventDefault();
        }
    }

    /**
     * Handle drag/touch move
     */
    handleMove(e) {
        if (!this.isDragging) return;

        const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;

        const deltaX = clientX - this.startPos.x;
        const deltaY = clientY - this.startPos.y;

        // Track movement for click prevention
        const totalDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        this.dragDistance = totalDistance;

        if (totalDistance > 5) {
            this.hasMoved = true;

            if (!this.touchedClickable || totalDistance > 15) {
                e.preventDefault();
            }
        }

        // Determine movement based on direction
        const movement = this.getCurrentDirection() === 'horizontal' ? deltaX : deltaY;

        // Check if movement should be blocked
        if (!this.config.loop) {
            if (movement > 0 && !this.canNavigatePrev()) {
                const translate = this.prevTranslate + movement * 0.1;
                this.currentTranslate = Math.max(translate, this.prevTranslate);
            } else if (movement < 0 && !this.canNavigateNext()) {
                const translate = this.prevTranslate + movement * 0.1;
                this.currentTranslate = Math.min(translate, this.prevTranslate);
            } else {
                let translate = this.prevTranslate + movement;

                const maxTranslate = this.getMaxTranslate();
                const minTranslate = 0;

                if (translate > minTranslate) {
                    translate = minTranslate + (translate - minTranslate) * this.config.resistance;
                } else if (translate < maxTranslate) {
                    translate = maxTranslate + (translate - maxTranslate) * this.config.resistance;
                }

                this.currentTranslate = translate;
            }
        } else {
            this.currentTranslate = this.prevTranslate + movement;
        }

        this.updateTransform();
    }

    /**
     * Handle drag/touch end
     */
    handleEnd(e) {
        if (!this.isDragging) return;

        this.isDragging = false;
        this.element.classList.remove('dragging');
        this.container.style.transition = `transform ${this.config.speed}ms ${this.config.easing}`;

        const movement = this.currentTranslate - this.prevTranslate;
        const threshold = this.config.threshold;

        if (Math.abs(movement) > threshold) {
            if (movement > 0 && this.canNavigatePrev()) {
                this.prevSlide();
            } else if (movement < 0 && this.canNavigateNext()) {
                this.nextSlide();
            } else {
                this.updateSlider();
            }
        } else {
            this.updateSlider();
        }

        setTimeout(() => {
            this.hasMoved = false;
            this.dragDistance = 0;
            this.touchedClickable = false;
        }, 50);
    }

    /**
     * Get maximum translate value
     */
    getMaxTranslate() {
        const maxIndex = this.getMaxIndex();

        if (this.config.direction === 'horizontal') {
            const slideWidth = this.wrapper.offsetWidth / this.slidesToShow;
            return -maxIndex * slideWidth;
        } else {
            const slideHeight = this.wrapper.offsetHeight;
            return -maxIndex * slideHeight;
        }
    }

    /**
     * Update transform position
     */
    updateTransform() {
        const transform = this.getCurrentDirection() === 'horizontal'
            ? `translateX(${this.currentTranslate}px)`
            : `translateY(${this.currentTranslate}px)`;

        this.container.style.transform = transform;
    }

    /**
     * Go to specific slide
     */
    goToSlide(index, animate = true) {
        if (this.isAnimating) return;

        // Clamp index within bounds
        const maxIndex = this.config.loop ? this.slides.length - 1 : this.getMaxIndex();
        index = Math.max(0, Math.min(index, maxIndex));

        this.currentIndex = index;

        if (animate) {
            this.isAnimating = true;
            this.progressUpdateBlocked = true;

            const skipProgressBars = false;
            this.updateSlider(skipProgressBars);

            setTimeout(() => {
                this.isAnimating = false;
                this.progressUpdateBlocked = false;
                this.updateProgressBars();
            }, this.config.speed + 50);
        } else {
            this.updateSlider();
        }
    }

    /**
     * Go to next slide
     */
    nextSlide() {
        if (!this.config.loop && !this.canNavigateNext()) return;

        if (this.config.autoplay && !this.autoplayPaused) {
            this.stopAutoplay(true);

            setTimeout(() => {
                if (this.config.autoplay && !this.autoplayPaused) {
                    this.startAutoplay();
                }
            }, this.config.speed + 500);
        }

        this.currentIndex++;
        this.goToSlide(this.currentIndex);

        if (this.config.loop) {
            setTimeout(() => {
                this.checkInfiniteLoop();
            }, this.config.speed);
        }
    }

    /**
     * Go to previous slide
     */
    prevSlide() {
        if (!this.config.loop && !this.canNavigatePrev()) return;

        // Pause autoplay for manual navigation
        if (this.config.autoplay && !this.autoplayPaused) {
            this.stopAutoplay(true);

            setTimeout(() => {
                if (this.config.autoplay && !this.autoplayPaused) {
                    this.startAutoplay();
                }
            }, this.config.speed + 500);
        }

        const oldIndex = this.currentIndex;

        this.currentIndex--;

        this.goToSlide(this.currentIndex);

        // Check for infinite loop reset after animation
        if (this.config.loop) {
            setTimeout(() => {
                this.checkInfiniteLoop();
            }, this.config.speed);
        }
    }

    /**
     * Update slider position and controls
     */
    updateSlider(skipProgressBars = false) {
        // Calculate translate value
        if (this.getCurrentDirection() === 'horizontal') {
            const firstSlide = this.slides[0];
            if (firstSlide) {
                const slideWidth = firstSlide.offsetWidth;
                const gap = this.getGap();
                let actualGap = 0;

                if (gap) {
                    const containerStyle = getComputedStyle(this.container);
                    actualGap = parseFloat(containerStyle.gap) || this.getGapInPixels();
                }

                const moveDistance = slideWidth + actualGap;
                this.currentTranslate = -this.currentIndex * moveDistance;
            } else {
                const slideWidth = this.wrapper.offsetWidth / this.slidesToShow;
                this.currentTranslate = -this.currentIndex * slideWidth;
            }
        } else {
            const gapInPixels = this.getGapInPixels();

            if (this.config.autoHeight) {
                let totalHeight = 0;
                for (let i = 0; i < this.currentIndex; i++) {
                    totalHeight += this.slides[i].offsetHeight;
                    if (i > 0 && gapInPixels > 0) {
                        totalHeight += gapInPixels;
                    }
                }
                this.currentTranslate = -totalHeight;
            } else {
                const slideHeight = this.slides[0] ? this.slides[0].offsetHeight : this.wrapper.offsetHeight / this.slidesToShow;

                if (gapInPixels > 0) {
                    this.currentTranslate = -this.currentIndex * (slideHeight + gapInPixels);
                } else {
                    this.currentTranslate = -this.currentIndex * slideHeight;
                }
            }
        }

        // Update transform
        this.updateTransform();

        // Update auto height
        if (this.config.autoHeight) {
            this.updateAutoHeight();
        }

        // Update controls
        this.updateControls(skipProgressBars);
    }

    /**
     * Update slider position without animation
     */
    updateSliderWithoutAnimation() {
        // Temporarily disable transitions
        const originalTransition = this.container.style.transition;
        this.container.style.transition = 'none';

        this.updateSlider(true);
        this.container.offsetHeight;

        setTimeout(() => {
            this.container.style.transition = originalTransition;
            this.initializeProgressBarsWithoutAnimation();
        }, 50);
    }

    /**
     * Initialize progress bars without animation during slider initialization
     */
    initializeProgressBarsWithoutAnimation() {
        // Initialize global progress without animation
        if (this.progressGlobalBar) {
            this.progressGlobalBar.classList.add('no-transition');

            const maxIndex = this.getMaxIndex();
            const progress = maxIndex > 0 ? (this.currentIndex / maxIndex) * 100 : 0;
            const progressValue = Math.min(100, Math.max(0, progress));

            if (this.config.direction === 'vertical') {
                this.progressGlobalBar.style.width = '100%';
                this.progressGlobalBar.style.height = `${progressValue}%`;
            } else {
                this.progressGlobalBar.style.width = `${progressValue}%`;
                this.progressGlobalBar.style.height = '100%';
            }

            // Remove no-transition after setting
            setTimeout(() => {
                this.progressGlobalBar.classList.remove('no-transition');
            }, 100);
        }

        // Initialize slides progress without animation
        if (this.progressSlides) {
            const progressItems = this.progressSlides.querySelectorAll('.slider-slide-progress-item');
            const progressBars = this.progressSlides.querySelectorAll('.slider-slide-progress-bar');
            const realIndex = this.config.loop ? this.getRealIndex() : this.currentIndex;

            progressBars.forEach((progressBar, index) => {
                progressBar.classList.add('no-transition');

                // Progress bar for current slide
                if (index === realIndex) {
                    if (this.config.direction === 'vertical') {
                        progressBar.style.width = '100%';
                        progressBar.style.height = '0%';
                    } else {
                        progressBar.style.width = '0%';
                        progressBar.style.height = '100%';
                    }
                } else if (index < realIndex) {
                    // Completed slides
                    if (this.config.direction === 'vertical') {
                        progressBar.style.width = '100%';
                        progressBar.style.height = '100%';
                    } else {
                        progressBar.style.width = '100%';
                        progressBar.style.height = '100%';
                    }
                } else {
                    // Uncompleted slides
                    if (this.config.direction === 'vertical') {
                        progressBar.style.width = '100%';
                        progressBar.style.height = '0%';
                    } else {
                        progressBar.style.width = '0%';
                        progressBar.style.height = '100%';
                    }
                }

                // Remove no-transition after setting
                setTimeout(() => {
                    progressBar.classList.remove('no-transition');
                }, 100);
            });
        }
    }

    /**
     * Update controls state
     */
    updateControls(skipProgressBars = false) {
        this.updatePagination();
        this.updateNavigation();

        if (!skipProgressBars) {
            this.safeUpdateProgressBars();
        }
    }

    /**
     * Update navigation buttons state
     */
    updateNavigation() {
        if (!this.navPrev || !this.navNext) return;

        if (this.config.loop) {
            this.navPrev.classList.remove('disabled');
            this.navNext.classList.remove('disabled');
        } else {
            this.navPrev.classList.toggle('disabled', !this.canNavigatePrev());
            this.navNext.classList.toggle('disabled', !this.canNavigateNext());
        }
    }

    /**
     * Update pagination active state
     */
    updatePagination() {
        if (!this.pagination) return;

        const bullets = this.pagination.querySelectorAll('.pagination-bullet, .pagination-number');
        const realIndex = this.getRealIndex();
        let activeIndex;
        if (this.config.loop) {
            const maxPaginationIndex = bullets.length - 1;
            activeIndex = Math.min(realIndex, maxPaginationIndex);
        } else {
            activeIndex = this.currentIndex;
        }

        bullets.forEach((bullet, index) => {
            bullet.classList.toggle('active', index <= activeIndex);
        });
    }

    /**
     * Update progress bars safely (only when appropriate)
     */
    safeUpdateProgressBars() {
        const now = Date.now();

        if (this.progressUpdateBlocked) {
            return;
        }

        if (this.isAnimating) {
            return;
        }

        if (this.config.autoplay && this.autoplayProgressTimer) {
            return;
        }

        if (now - this.lastProgressUpdate < 50) {
            return;
        }

        if (this.progressUpdateTimeout) {
            clearTimeout(this.progressUpdateTimeout);
        }

        this.progressUpdateTimeout = setTimeout(() => {
            this.lastProgressUpdate = Date.now();
            this.updateProgressBars();
            this.progressUpdateTimeout = null;
        }, 32);
    }

    /**
     * Update progress bars
     */
    updateProgressBars() {
        if (this.config.autoplay && this.autoplayProgressTimer) {
            return;
        }

        const isManualUpdate = !this.config.autoplay || this.autoplayPaused || this.isManualNavigation;

        if (this.progressGlobalBar) {
            const totalSlides = this.config.loop ? this.originalSlides.length : this.getMaxIndex() + 1;
            const currentSlideIndex = this.config.loop ? this.getRealIndex() : this.currentIndex;
            const denominator = Math.max(1, totalSlides);
            const progressValue = Math.min(100, Math.max(0, (currentSlideIndex / denominator) * 100));

            if (isManualUpdate) {
                this.progressGlobalBar.classList.add('no-transition');
                this.progressGlobalBar.style.transition = 'none';
                this.progressGlobalBar.offsetHeight;
            } else {
                this.progressGlobalBar.classList.add('smooth-update');
            }

            if (this.config.direction === 'vertical') {
                this.progressGlobalBar.style.width = '100%';
                this.progressGlobalBar.style.height = `${progressValue}%`;
            } else {
                this.progressGlobalBar.style.width = `${progressValue}%`;
                this.progressGlobalBar.style.height = '100%';
            }

            setTimeout(() => {
                this.progressGlobalBar.classList.remove('smooth-update', 'no-transition');
                this.progressGlobalBar.style.transition = '';
            }, isManualUpdate ? 50 : 800);
        }

        if (this.progressSlides) {
            const progressItems = this.progressSlides.querySelectorAll('.slider-slide-progress-item');
            const progressBars = this.progressSlides.querySelectorAll('.slider-slide-progress-bar');
            const realIndex = this.config.loop ? this.getRealIndex() : this.currentIndex;

            progressItems.forEach((item, index) => {
                const progressBar = progressBars[index];
                if (!progressBar) return;

                item.classList.toggle('active', index === realIndex);

                if (index < realIndex) {
                    const currentValue = this.config.direction === 'vertical' ?
                        progressBar.style.height : progressBar.style.width;

                    if (currentValue !== '100%') {
                        if (isManualUpdate) {
                            progressBar.classList.add('no-transition');
                            progressBar.style.transition = 'none';
                        }

                        if (this.config.direction === 'vertical') {
                            progressBar.style.width = '100%';
                            progressBar.style.height = '100%';
                        } else {
                            progressBar.style.width = '100%';
                            progressBar.style.height = '100%';
                        }
                    }
                } else if (index === realIndex) {
                    if (isManualUpdate) {
                        progressBar.classList.add('no-transition');
                        progressBar.style.transition = 'none';
                    } else {
                        progressBar.classList.add('smooth-update');
                    }

                    if (this.config.direction === 'vertical') {
                        progressBar.style.width = '100%';
                        progressBar.style.height = '0%';
                    } else {
                        progressBar.style.width = '0%';
                        progressBar.style.height = '100%';
                    }
                } else {
                    const currentValue = this.config.direction === 'vertical' ?
                        progressBar.style.height : progressBar.style.width;

                    if (currentValue !== '0%') {
                        if (isManualUpdate) {
                            progressBar.classList.add('no-transition');
                            progressBar.style.transition = 'none';
                        }

                        if (this.config.direction === 'vertical') {
                            progressBar.style.width = '100%';
                            progressBar.style.height = '0%';
                        } else {
                            progressBar.style.width = '0%';
                            progressBar.style.height = '100%';
                        }
                    }
                }
            });

            setTimeout(() => {
                progressBars.forEach(progressBar => {
                    progressBar.classList.remove('smooth-update', 'no-transition');
                    progressBar.style.transition = '';
                });
            }, isManualUpdate ? 50 : 800);
        }

        if (this.isManualNavigation) {
            setTimeout(() => {
                this.isManualNavigation = false;
            }, 500);
        }
    }

    /**
     * Update progress bars after animation completes
     */
    updateProgressBarsAfterAnimation() {
        setTimeout(() => {
            if (!this.isAnimating && !this.progressUpdateBlocked) {
                this.updateProgressBars();
            }
        }, 150);
    }

    /**
     * Destroy slider and cleanup
     */
    destroy() {
        // Remove event listeners
        window.removeEventListener('resize', this.handleResize.bind(this));

        // Remove controls
        if (this.navPrev) this.navPrev.remove();
        if (this.navNext) this.navNext.remove();
        if (this.pagination) this.pagination.remove();
        if (this.progressGlobal) this.progressGlobal.remove();
        if (this.progressSlides) {
            if (this.handleProgressClickBound) {
                this.progressSlides.removeEventListener('click', this.handleProgressClickBound);
            }
            this.progressSlides.remove();
        }

        // Stop autoplay
        this.stopAutoplay();

        // Clear progress update timeout
        if (this.progressUpdateTimeout) {
            clearTimeout(this.progressUpdateTimeout);
            this.progressUpdateTimeout = null;
        }

        // Reset styles
        this.container.style.transform = '';
        this.container.style.transition = '';
        this.slides.forEach(slide => {
            slide.style.width = '';
            slide.style.height = '';
        });
    }

    /**
     * Start autoplay
     */
    startAutoplay() {
        if (!this.config.autoplay) return;
        this.stopAutoplay();
        this.autoplayStartTime = Date.now();

        this.initializeAutoplayProgress();

        this.autoplayTimer = setTimeout(() => {
            this.autoplayNext();
        }, this.config.autoplayDelay);

        this.updateAutoplayProgress();
    }

    /**
     * Stop autoplay
     */
    stopAutoplay(skipProgressReset = false) {
        if (this.autoplayTimer) {
            clearTimeout(this.autoplayTimer);
            this.autoplayTimer = null;
        }
        if (this.autoplayProgressTimer) {
            clearInterval(this.autoplayProgressTimer);
            this.autoplayProgressTimer = null;
        }
        this.autoplayStartTime = null;

        if (!skipProgressReset) {
            this.resetAutoplayProgress();
        }
    }

    /**
     * Pause autoplay
     */
    pauseAutoplay() {
        if (!this.config.autoplay || this.autoplayPaused) return;

        this.autoplayPaused = true;
        this.stopAutoplay();
    }

    /**
     * Resume autoplay
     */
    resumeAutoplay() {
        if (!this.config.autoplay || !this.autoplayPaused) return;

        this.autoplayPaused = false;
        this.startAutoplay();
    }

    /**
     * Go to next slide for autoplay
     */
    autoplayNext() {
        const realIndex = this.config.loop ? this.getRealIndex() : this.currentIndex;
        const totalSlides = this.originalSlides.length;

        if (this.config.loop) {
            this.currentIndex++;
            this.goToSlide(this.currentIndex);
        } else {
            if (this.canNavigateNext()) {
                this.currentIndex++;
                this.goToSlide(this.currentIndex);
            } else {
                this.resetAutoplayProgress();
                this.goToSlide(0);
            }
        }

        if (this.config.loop) {
            setTimeout(() => {
                this.checkInfiniteLoop();
            }, this.config.speed);
        }

        if (this.config.autoplay && !this.autoplayPaused) {
            this.startAutoplay();
        }
    }

    /**
     * Initialize autoplay progress bars
     */
    initializeAutoplayProgress() {
        // Initialize global progress bar
        if (this.progressGlobalBar) {
            this.progressGlobalBar.classList.add('no-transition');
            this.progressGlobalBar.style.transition = 'none';

            if (this.config.direction === 'vertical') {
                this.progressGlobalBar.style.height = '0%';
            } else {
                this.progressGlobalBar.style.width = '0%';
            }

            setTimeout(() => {
                this.progressGlobalBar.classList.remove('no-transition');
                this.progressGlobalBar.style.transition =
                    this.config.direction === 'vertical'
                        ? `height ${this.config.autoplayDelay}ms linear`
                        : `width ${this.config.autoplayDelay}ms linear`;
            }, 60);
        }

        // Initialize slide progress bars
        if (!this.progressSlides) return;

        const progressBars = this.progressSlides.querySelectorAll('.slider-slide-progress-bar');
        const realIndex = this.config.loop ? this.getRealIndex() : this.currentIndex;

        progressBars.forEach((progressBar, index) => {
            progressBar.classList.add('no-transition');

            if (index < realIndex) {
                if (this.config.direction === 'vertical') {
                    progressBar.style.height = '100%';
                } else {
                    progressBar.style.width = '100%';
                }
            } else {
                if (this.config.direction === 'vertical') {
                    progressBar.style.height = '0%';
                } else {
                    progressBar.style.width = '0%';
                }
            }

            setTimeout(() => {
                progressBar.classList.remove('no-transition');
            }, 50);
        });

        setTimeout(() => {
            const currentProgressBar = progressBars[realIndex];
            if (currentProgressBar && this.config.autoplay) {
                if (this.config.direction === 'vertical') {
                    currentProgressBar.style.height = '0%';
                    currentProgressBar.offsetHeight;
                    currentProgressBar.style.transition = `height ${this.config.autoplayDelay}ms linear`;
                    currentProgressBar.style.height = '100%';
                } else {
                    currentProgressBar.style.width = '0%';
                    currentProgressBar.offsetWidth;
                    currentProgressBar.style.transition = `width ${this.config.autoplayDelay}ms linear`;
                    currentProgressBar.style.width = '100%';
                }
            }
        }, 100);
    }

    /**
     * Update autoplay progress animation
     */
    updateAutoplayProgress() {
        if (!this.config.autoplay || !this.autoplayStartTime) return;

        if (this.progressGlobalBar) {
            this.progressGlobalBar.style.transition =
                this.config.direction === 'vertical'
                    ? `height ${this.config.autoplayDelay}ms linear`
                    : `width ${this.config.autoplayDelay}ms linear`;
        }

        this.autoplayProgressTimer = setInterval(() => {
            const elapsed = Date.now() - this.autoplayStartTime;
            const progress = Math.min(elapsed / this.config.autoplayDelay, 1);

            if (this.progressGlobalBar) {
                const currentSlideProgress = progress * 100;
                const totalSlides = this.config.loop ? this.originalSlides.length : this.getMaxIndex() + 1;
                const currentSlideIndex = this.config.loop ? this.getRealIndex() : this.currentIndex;
                const denominator = Math.max(1, totalSlides - 1);
                const globalProgress = ((currentSlideIndex + progress) / denominator) * 100;

                if (this.config.direction === 'vertical') {
                    this.progressGlobalBar.style.height = `${Math.min(100, globalProgress)}%`;
                } else {
                    this.progressGlobalBar.style.width = `${Math.min(100, globalProgress)}%`;
                }
            }

            if (progress >= 1) {
                clearInterval(this.autoplayProgressTimer);
                this.autoplayProgressTimer = null;
            }
        }, 16);
    }

    /**
     * Reset autoplay progress bars
     */
    resetAutoplayProgress() {
        // Reset global progress bar
        if (this.progressGlobalBar) {
            this.progressGlobalBar.classList.add('no-transition');
            this.progressGlobalBar.style.transition = 'none';

            if (this.config.direction === 'vertical') {
                this.progressGlobalBar.style.height = '0%';
            } else {
                this.progressGlobalBar.style.width = '0%';
            }

            setTimeout(() => {
                this.progressGlobalBar.classList.remove('no-transition');
                this.progressGlobalBar.style.transition = '';
            }, 50);
        }

        // Reset slide progress bars
        if (this.progressSlides) {
            const progressBars = this.progressSlides.querySelectorAll('.slider-slide-progress-bar');
            progressBars.forEach(bar => {
                bar.classList.add('no-transition');
                if (this.config.direction === 'vertical') {
                    bar.style.height = '0%';
                } else {
                    bar.style.width = '0%';
                }
                setTimeout(() => {
                    bar.classList.remove('no-transition');
                }, 50);
            });
        }
    }
}

// Initialize all sliders on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.custom-slider');

    sliders.forEach(slider => {
        new SliderConstructor(slider);
    });
});

// Make SliderConstructor globally available
window.SliderConstructor = SliderConstructor;
// Export for use
window.SliderConstructor = SliderConstructor;



//*=============
//*  OTHER JS  =
//*=============
// Seo block with smooth animation
document.querySelectorAll('.seo-block').forEach(function (seoBlock) {
    const content = seoBlock.querySelector('.seo-content');
    const text = content ? content.querySelector('.text') : null;
    const button = seoBlock.querySelector('.seo-btn');

    if (!content || !text || !button) return;

    const fullHeight = text.scrollHeight;
    const minHeight = parseInt(window.getComputedStyle(content).minHeight) || 0;

    if (fullHeight <= minHeight) {
        button.style.display = 'none';
        return;
    }

    button.addEventListener('click', function () {
        const isActive = this.classList.toggle('is-active');
        const targetHeight = isActive ? fullHeight : minHeight;

        // Smooth animation using CSS transitions
        content.style.transition = 'height .5s ease';
        content.style.height = targetHeight + 'px';

        // Set height to auto after animation completes (if expanded)
        if (isActive) {
            setTimeout(() => {
                content.style.height = 'auto';
            }, 600);
        }
    });
});

// Marquee Logo Footer - Optimized with Drag Support
function marqueeLogo(containerSelector = null) {
    // Determine which container to search in
    let searchContainer = document;
    if (containerSelector) {
        searchContainer = document.querySelector(containerSelector);
        if (!searchContainer) {
            // console.warn(`Container "${containerSelector}" not found`);
            return;
        }
    }

    // Check if marquee elements exist in the specified container
    const marqueeLines = searchContainer.querySelectorAll(".marquee-line");
    if (!marqueeLines.length) return;

    class LoopingElement {
        constructor(element, initialTranslation, speed, direction, siblingElement = null) {
            this.element = element;
            this.siblingElement = siblingElement;
            this.currentTranslation = initialTranslation;
            this.speed = speed;
            this.originalSpeed = speed;
            this.direction = direction;
            this.metric = 100;
            this.isAnimating = true;

            this.lerp = {
                current: this.currentTranslation,
                target: this.currentTranslation,
                factor: 0.08
            };

            // Set initial direction and target
            if (direction) {
                this.direction = true;
                this.lerp.target += 2 * this.speed;
            } else {
                this.direction = false;
                this.lerp.target -= 2 * this.speed;
            }

            this.setupDragEvents();
            this.render();
        }

        setSibling(siblingElement) {
            this.siblingElement = siblingElement;
        }

        setupDragEvents() {
            if (isTouchScreen) {
                // Touch events для мобільних
                let touchData = {};

                this.element.addEventListener('touchstart', (e) => {
                    touchData = this.handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
                }, { passive: true });

                this.element.addEventListener('touchmove', (e) => {
                    this.handleDragMove(touchData.startX, touchData.startY, e.touches[0].clientX, e.touches[0].clientY, e);
                }, { passive: false });

                this.element.addEventListener('touchend', (e) => {
                    this.handleDragEnd();
                    touchData = {};
                }, { passive: true });
            }

            if (!isTouchScreen) {
                // Mouse events для десктопу
                let mouseData = {};
                let isDragging = false;

                this.element.addEventListener('mousedown', (e) => {
                    isDragging = true;
                    mouseData = this.handleDragStart(e.clientX, e.clientY);
                    e.preventDefault();
                });

                this.element.addEventListener('mousemove', (e) => {
                    if (!isDragging) return;
                    this.handleDragMove(mouseData.startX, mouseData.startY, e.clientX, e.clientY, e);
                });

                this.element.addEventListener('mouseup', (e) => {
                    if (!isDragging) return;
                    isDragging = false;
                    this.handleDragEnd();
                    mouseData = {};
                });

                this.element.addEventListener('mouseleave', (e) => {
                    if (!isDragging) return;
                    isDragging = false;
                    this.handleDragEnd();
                    mouseData = {};
                });
            }

            // Prevent text selection
            this.element.style.userSelect = 'none';
            this.element.style.webkitUserSelect = 'none';
        }

        handleDragStart(clientX, clientY) {
            return { startX: clientX, startY: clientY };
        }

        handleDragMove(startX, startY, currentX, currentY, e) {
            if (!startX || !startY) return;

            let diffX = startX - currentX;
            let diffY = startY - currentY;

            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (e && e.preventDefault) e.preventDefault();

                let dragSpeed = Math.min(Math.abs(diffX) / 1.25, this.originalSpeed * 50);
                this.setSpeed(dragSpeed);

                if (this.siblingElement) {
                    this.siblingElement.setSpeed(dragSpeed);
                }

                if (diffX > 0) {
                    this.setDirection(false);
                    if (this.siblingElement) {
                        this.siblingElement.setDirection(false);
                    }
                } else {
                    this.setDirection(true);
                    if (this.siblingElement) {
                        this.siblingElement.setDirection(true);
                    }
                }
            }
        }

        handleDragEnd() {
            setTimeout(() => {
                this.resetSpeed();
                this.setDirection(this.direction);

                if (this.siblingElement) {
                    this.siblingElement.resetSpeed();
                    this.siblingElement.setDirection(this.siblingElement.direction);
                }
            }, 100);
        }

        setSpeed(speed) {
            this.speed = speed;
        }

        setDirection(direction) {
            this.direction = direction;
        }

        resetSpeed() {
            this.speed = this.originalSpeed;
        }

        lerpFunc(current, target, factor) {
            this.lerp.current = current * (1 - factor) + target * factor;
        }

        goForward() {
            this.lerp.target += this.speed;
            if (this.lerp.target > this.metric) {
                this.lerp.current -= 2 * this.metric;
                this.lerp.target -= 2 * this.metric;
            }
        }

        goBackward() {
            this.lerp.target -= this.speed;
            if (this.lerp.target < -this.metric) {
                this.lerp.current += 2 * this.metric;
                this.lerp.target += 2 * this.metric;
            }
        }

        animate() {
            if (!this.isAnimating) return;

            if (this.direction) {
                this.goForward();
            } else {
                this.goBackward();
            }

            this.lerpFunc(this.lerp.current, this.lerp.target, this.lerp.factor);

            if (!isNaN(this.lerp.current)) {
                this.element.style.setProperty("--x", `${this.lerp.current}%`);
            }
        }

        render() {
            this.animate();
            if (this.isAnimating) {
                requestAnimationFrame(() => this.render());
            }
        }

        destroy() {
            this.isAnimating = false;
        }
    }

    marqueeLines.forEach(marqueeEl => {
        const speed = (winW < 768) ? Number(marqueeEl.dataset.mobile) || 1 : Number(marqueeEl.dataset.speed) || 1;
        const direction = marqueeEl.dataset.direction !== "false";

        const firstItem = marqueeEl.querySelector(".marquee-item");
        if (!firstItem) return;

        const content = firstItem.querySelector(".marquee-content");
        if (!content) return;

        // Calculate how many duplicates we need
        const containerWidth = marqueeEl.offsetWidth;
        const contentWidth = content.offsetWidth;

        if (contentWidth <= 0) return;

        const duplicatesNeeded = Math.ceil(containerWidth / contentWidth) + 1;

        // Clone content to fill the container
        for (let i = 0; i < duplicatesNeeded; i++) {
            firstItem.appendChild(content.cloneNode(true));
        }

        // Clone the entire item
        marqueeEl.appendChild(firstItem.cloneNode(true));

        const items = marqueeEl.querySelectorAll(".marquee-item");
        if (items.length >= 2) {
            const firstElement = new LoopingElement(items[0], 0, speed, direction);
            const secondElement = new LoopingElement(items[1], -100, speed, direction);

            // Link elements as siblings for synchronized dragging
            firstElement.setSibling(secondElement);
            secondElement.setSibling(firstElement);

            // Store references for debugging
            firstElement.element.loopingInstance = firstElement;
            secondElement.element.loopingInstance = secondElement;
        }
    });
}

// Initialize marquee only on mobile/tablet screens
marqueeLogo('.marquee-tags');
marqueeLogo('.marquee-logos');
if (winW < 1200) {
    marqueeLogo('footer');
}


// Play Video on Hover Project Card
document.querySelectorAll('.project-card').forEach(function (item) {
    const video = item.querySelector('video');
    if (!video) return;

    // Safari compatibility: ensure video is ready to play
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';

    if (winW < 1200) {
        const btnPlay = item.querySelector('.btn-play');

        if (!video.src && (video.dataset.srcMob || video.getAttribute('data-src-mob'))) {
            video.src = video.dataset.srcMob || video.getAttribute('data-src-mob');
        }

        if (btnPlay) {
            btnPlay.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                const isPlaying = !video.paused && !video.ended;

                if (isPlaying) {
                    video.pause();
                    btnPlay.classList.remove('is-active');
                } else {
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            btnPlay.classList.add('is-active');
                        }).catch(error => {
                            // Video autoplay prevented - silently handle
                        });
                    }
                }
            });

            video.addEventListener('ended', function () {
                btnPlay.classList.remove('is-active');
            });

            video.addEventListener('pause', function () {
                btnPlay.classList.remove('is-active');
            });
        }
    } else {
        item.addEventListener('mouseenter', function () {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    // Video autoplay prevented - silently handle
                });
            }
        });
        item.addEventListener('mouseleave', function () {
            video.pause();
            video.currentTime = 0;
        });
    }
});


// Move Block On Mouse Move FAQ
_functions.initMouseMoveBlocks = function () {
    const moveBlocks = document.querySelectorAll('.js_move_block');

    if (!moveBlocks.length) return;

    moveBlocks.forEach((block, index) => {
        let isHovering = false;
        let animationId = null;
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        // Animation loop for this specific block
        const animateBlock = () => {
            if (!isHovering) {
                // Return to center when not hovering
                const returnFactor = 0.12;
                currentX *= (1 - returnFactor);
                currentY *= (1 - returnFactor);

                if (Math.abs(currentX) < 0.1 && Math.abs(currentY) < 0.1) {
                    currentX = 0;
                    currentY = 0;
                    block.style.transform = 'translate(0px, 0px)';
                    cancelAnimationFrame(animationId);
                    animationId = null;
                    return;
                } else {
                    block.style.transform = `translate(${currentX}px, ${currentY}px)`;
                }
            } else {
                // Calculate movement relative to block center
                const rect = block.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const offsetX = (mouseX - centerX) / (rect.width / 2);
                const offsetY = (mouseY - centerY) / (rect.height / 2);

                // Intensity based on block index for variation
                const intensity = 20 + (index * 8);
                const targetX = offsetX * intensity;
                const targetY = offsetY * intensity;

                // Smooth interpolation
                const lerpFactor = 0.35;
                currentX += (targetX - currentX) * lerpFactor;
                currentY += (targetY - currentY) * lerpFactor;

                block.style.transform = `translate(${currentX}px, ${currentY}px)`;
            }

            animationId = requestAnimationFrame(animateBlock);
        };

        // Mouse enter event
        block.addEventListener('mouseenter', function () {
            isHovering = true;
            if (!animationId) {
                animationId = requestAnimationFrame(animateBlock);
            }
        });

        // Mouse move event - track mouse position
        block.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Mouse leave event
        block.addEventListener('mouseleave', function () {
            isHovering = false;
            // Animation continues to return to center
            if (!animationId) {
                animationId = requestAnimationFrame(animateBlock);
            }
        });
    });
};


// Project Counter Animation
_functions.projectCounter = function () {
    const counter = document.querySelector('.project-counter');
    if (!counter) return;
    const from = parseInt(counter.dataset.countFrom, 10);
    const to = parseInt(counter.dataset.countTo, 10);
    const speed = parseInt(counter.dataset.speed, 10);
    let current = from;

    function renderFlip(num, prevNum) {
        const numStr = String(num);
        const prevStr = prevNum != null ? String(prevNum).padStart(numStr.length, ' ') : '';
        counter.innerHTML = '';
        for (let i = 0; i < numStr.length; i++) {
            const digit = numStr[i];
            const prevDigit = prevStr[i] && prevStr[i] !== ' ' ? prevStr[i] : digit;
            const digitWrap = document.createElement('span');
            digitWrap.className = 'project-counter__digit';
            const digitInner = document.createElement('span');
            digitInner.className = 'project-counter__digit-inner';
            const front = document.createElement('span');
            front.className = 'project-counter__digit-front';
            front.textContent = prevDigit;
            const back = document.createElement('span');
            back.className = 'project-counter__digit-back';
            back.textContent = digit;
            digitInner.appendChild(front);
            digitInner.appendChild(back);
            digitWrap.appendChild(digitInner);
            counter.appendChild(digitWrap);
            if (prevNum != null && prevDigit !== digit) {
                setTimeout(() => {
                    digitWrap.classList.add('flipping');
                }, 20 + i * 60);
            }
        }
    }

    renderFlip(current);

    setInterval(() => {
        const prev = current;
        current++;
        if (current > to) current = from;
        renderFlip(current, prev);
    }, speed);
};

/** Prefer interactive layers under fixed/sticky hit targets (e.g. #videoBlock over project grid). */
_functions.resolveCursorPointerTarget = function (clientX, clientY) {
    const stack = document.elementsFromPoint(clientX, clientY) || [];
    const cur = document.querySelector('.cursor');
    const filtered = cur ? stack.filter((el) => el !== cur && !cur.contains(el)) : stack;
    return (
        filtered.find((el) => el.closest && el.closest('.project-card')) ||
        filtered.find((el) => el.closest && el.closest('.tsm-media')) ||
        filtered[0] ||
        null
    );
};

// Cursor — listeners attach once; .cursor node is re-queried each event so React-injected
// legacy markup (route changes / EN↔FR) keeps the mute/unmute bubble targeting the live DOM.
_functions.customCursor = function () {
    if (window.__legacyCustomCursorHooks) return;
    window.__legacyCustomCursorHooks = true;

    let currentX = winW / 2;
    let currentY = winH / 2;
    window.targetX = currentX;
    window.targetY = currentY;

    let animationId = null;
    let isInitialized = false;
    let trackedCursor = null;

    function cursorEl() {
        return document.querySelector('.cursor');
    }

    function primeCursor(cursor) {
        cursor.style.transform = 'scale(0)';
        cursor.style.position = 'fixed';
        cursor.style.pointerEvents = 'none';
        cursor.style.zIndex = '9999';
        cursor.style.transition = 'transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)';
        cursor.style.left = currentX + 'px';
        cursor.style.top = currentY + 'px';
    }

    function updateCursor() {
        const cursor = cursorEl();
        if (!cursor || cursor !== trackedCursor) {
            animationId = null;
            return;
        }

        const diffX = window.targetX - currentX;
        const diffY = window.targetY - currentY;

        currentX += diffX * 0.15;
        currentY += diffY * 0.15;

        cursor.style.left = currentX + 'px';
        cursor.style.top = currentY + 'px';

        if (Math.abs(diffX) > 0.1 || Math.abs(diffY) > 0.1) {
            animationId = requestAnimationFrame(updateCursor);
        } else {
            animationId = null;
        }
    }

    function handleMouseMove(e) {
        const cursor = cursorEl();
        if (!cursor) return;

        if (cursor !== trackedCursor) {
            trackedCursor = cursor;
            isInitialized = false;
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
            primeCursor(cursor);
        }

        window.targetX = e.clientX;
        window.targetY = e.clientY;

        if (!isInitialized) {
            currentX = e.clientX;
            currentY = e.clientY;
            cursor.style.left = currentX + 'px';
            cursor.style.top = currentY + 'px';
            isInitialized = true;
        }

        if (!animationId) {
            animationId = requestAnimationFrame(updateCursor);
        }

        const targetElement = _functions.resolveCursorPointerTarget(e.clientX, e.clientY);
        if (targetElement && targetElement.closest('.tsm-media')) {
            cursor.classList.remove('is-play', 'is-muted', 'is-unmuted', 'is-link', 'is-drag');
            cursor.classList.add('is-play');
            cursor.style.transform = 'scale(1)';
        } else if (targetElement && targetElement.closest('.sec-100vh video, .banner-block video')) {
            cursor.classList.remove('is-play', 'is-muted', 'is-unmuted', 'is-link', 'is-drag');
            const video = targetElement.closest('video');
            if (video && video.classList.contains('muted')) {
                cursor.classList.add('is-muted');
            } else {
                cursor.classList.add('is-unmuted');
            }
            cursor.style.transform = 'scale(1)';
        } else if (targetElement && targetElement.closest('.project-card')) {
            cursor.classList.remove('is-play', 'is-muted', 'is-unmuted', 'is-link', 'is-drag');
            cursor.classList.add('is-link');
            cursor.style.transform = 'scale(1)';
        } else if (targetElement && targetElement.closest('.service-item-wrap, .tsm-card, .case-card')) {
            cursor.classList.remove('is-play', 'is-muted', 'is-unmuted', 'is-link', 'is-drag');
            cursor.classList.add('is-drag');
            cursor.style.transform = 'scale(1)';
        } else {
            cursor.style.transform = 'scale(0)';
            cursor.classList.remove('is-play', 'is-muted', 'is-unmuted', 'is-link', 'is-drag');
        }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    window.addEventListener(
        'scroll',
        () => {
            const cursor = cursorEl();
            if (!cursor) return;
            cursor.style.transform = 'scale(0)';
            cursor.classList.remove('is-play', 'is-muted', 'is-unmuted', 'is-link', 'is-drag');
        },
        { passive: true },
    );

    document.addEventListener('mouseleave', () => {
        const cursor = cursorEl();
        if (!cursor) return;
        cursor.style.transform = 'scale(0)';
        cursor.classList.remove('is-play', 'is-muted', 'is-unmuted', 'is-link', 'is-drag');
    });

    document.addEventListener('mouseenter', () => {
        if (!isInitialized) return;
        const cursor = cursorEl();
        if (!cursor) return;
        const elementUnderMouse = _functions.resolveCursorPointerTarget(window.targetX, window.targetY);
        if (elementUnderMouse && elementUnderMouse.closest('.tsm-media')) {
            cursor.style.transform = 'scale(1)';
            cursor.classList.add('is-play');
        } else if (elementUnderMouse && elementUnderMouse.closest('.project-card')) {
            cursor.style.transform = 'scale(1)';
            cursor.classList.remove('is-play', 'is-muted', 'is-unmuted', 'is-link', 'is-drag');
            cursor.classList.add('is-link');
        } else if (elementUnderMouse && elementUnderMouse.closest('.sec-100vh video, .banner-block video')) {
            const video = elementUnderMouse.closest('video');
            cursor.style.transform = 'scale(1)';
            if (video && video.classList.contains('muted')) {
                cursor.classList.add('is-muted');
            } else {
                cursor.classList.add('is-unmuted');
            }
        }
    });
};

// Function to update cursor state for video elements
_functions.updateVideoCursorState = function () {
    const cursor = document.querySelector('.cursor');
    if (!cursor) return;

    const elementUnderMouse = _functions.resolveCursorPointerTarget(
        window.targetX || winW / 2,
        window.targetY || winH / 2,
    );

    if (elementUnderMouse && elementUnderMouse.closest('.project-card')) {
        cursor.classList.remove('is-play', 'is-muted', 'is-unmuted', 'is-link', 'is-drag');
        cursor.classList.add('is-link');
        if (cursor.style.transform === 'scale(1)') {
            cursor.style.transform = 'scale(1)';
        }
        return;
    }

    if (elementUnderMouse && elementUnderMouse.closest('.sec-100vh video, .banner-block video')) {
        cursor.classList.remove('is-play', 'is-muted', 'is-unmuted', 'is-link');

        const video = elementUnderMouse.closest('video');
        if (video && video.classList.contains('muted')) {
            cursor.classList.add('is-muted');
        } else {
            cursor.classList.add('is-unmuted');
        }

        if (cursor.style.transform === 'scale(1)') {
            cursor.style.transform = 'scale(1)';
        }
    }
};

// Video Sound Control for sec-100vh
_functions.videoSoundControl = function () {
    const videos = document.querySelectorAll('.sec-100vh video, .banner-block video');

    if (videos.length === 0) {
        setTimeout(() => {
            _functions.videoSoundControl();
        }, 500);
        return;
    }

    videos.forEach(video => {
        // Add muted class initially
        video.classList.add('muted');
        video.muted = true;

        // Remove existing click listeners to avoid duplicates
        video.removeEventListener('click', video._soundToggleHandler);

        // Create handler function
        video._soundToggleHandler = function (e) {
            e.preventDefault();

            if (this.classList.contains('muted')) {
                // Unmute video
                this.classList.remove('muted');
                this.muted = false;
            } else {
                // Mute video
                this.classList.add('muted');
                this.muted = true;
            }

            // Update cursor state immediately
            if (typeof _functions.updateVideoCursorState === 'function') {
                _functions.updateVideoCursorState();
            }
        };

        // Add click handler for sound toggle
        video.addEventListener('click', video._soundToggleHandler);
    });
};


// Initialize effects on desktop only
if (winW > 1199) {
    _functions.initMouseMoveBlocks();
    _functions.projectCounter();
    _functions.customCursor();
}

_functions.videoSoundControl();


// Testimonials Slider
_functions.testimonialsSlider = function () {
    const sliderContainer = document.querySelector('.tsm-block');
    if (!sliderContainer) return;

    const slides = document.querySelectorAll('.tsm-card');
    const controls = document.querySelectorAll('.tsm-control');

    if (slides.length === 0) return;

    let currentSlide = -1;
    let autoSlideInterval;
    let restartTimeout;
    let isUserInteracting = false;
    let isTransitioning = false;
    let isInView = false;
    let hasStarted = false;

    // Function to calculate and set container height
    function setContainerHeight() {
        let maxHeight = 0;

        // Temporarily show all slides to measure their heights
        slides.forEach(slide => {
            slide.style.visibility = 'visible';
            slide.style.opacity = '1';
            slide.style.position = 'static';
            slide.classList.remove('is-active');
        });

        // Find the maximum height
        slides.forEach(slide => {
            const height = slide.offsetHeight;
            if (height > maxHeight) {
                maxHeight = height;
            }
        });

        // Reset slides positioning and classes
        slides.forEach((slide, i) => {
            slide.style.position = '';
            slide.style.visibility = '';
            slide.style.opacity = '';

            if (i === 0) {
                slide.classList.add('is-active');
            } else {
                slide.classList.remove('is-active');
            }
        });

        // Set CSS custom property
        html.style.setProperty('--tsm-h', maxHeight + 'px');
    }

    // Function to show specific slide
    function showSlide(index) {
        // Prevent multiple transitions at once
        if (isTransitioning || index === currentSlide) return;

        isTransitioning = true;

        slides.forEach((slide, i) => {
            slide.classList.toggle('is-active', i === index);
        });

        // Reset all controls and restart animation for active one
        controls.forEach((control, i) => {
            const isActive = i === index;

            if (isActive) {
                // Reset animation by temporarily removing class
                control.classList.remove('is-active');
                // Force reflow
                control.offsetHeight;
                // Add class back to restart animation
                control.classList.add('is-active');
            } else {
                control.classList.remove('is-active');
            }
        });

        currentSlide = index;

        // Reset transition flag after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, 0); // Match CSS transition duration
    }

    // Function to go to next slide
    function nextSlide() {
        const next = currentSlide + 1 >= slides.length ? 0 : currentSlide + 1;
        showSlide(next);
    }

    // Start auto slide
    function startAutoSlide(force = false) {
        // Don't start if user is currently interacting or not in view (unless forced)
        if (!force && (isUserInteracting || !isInView)) {
            return;
        }

        // Clear any existing interval
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }

        autoSlideInterval = setInterval(nextSlide, 3900);
    }

    // Initialize slider animation
    function initializeSlider() {
        if (hasStarted) return;
        hasStarted = true;

        // Clear any existing active classes
        slides.forEach(slide => slide.classList.remove('is-active'));
        controls.forEach(control => control.classList.remove('is-active'));

        setContainerHeight();
        showSlide(0);

        // Start auto slide after first animation completes
        setTimeout(() => {
            if (isInView) {
                // Force start auto slide on first initialization, ignore user interaction
                isUserInteracting = false;
                startAutoSlide();
            }
        }, 3900);
    }

    // Stop auto slide
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
        if (restartTimeout) {
            clearTimeout(restartTimeout);
            restartTimeout = null;
        }
    }

    // Add click event listeners to controls
    controls.forEach((control, index) => {
        control.addEventListener('click', (e) => {
            e.preventDefault();

            // Set interaction flag
            isUserInteracting = true;

            stopAutoSlide();
            showSlide(index);

            // Clear any existing restart timeout
            if (restartTimeout) {
                clearTimeout(restartTimeout);
                restartTimeout = null;
            }

            // Restart auto slide after 8 seconds of inactivity, but only if in view
            restartTimeout = setTimeout(() => {
                isUserInteracting = false;
                if (isInView && hasStarted) {
                    startAutoSlide();
                }
            }, 0);
        });
    });

    // Intersection Observer to start animation when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                isInView = true;
                if (!hasStarted) {
                    initializeSlider();
                } else {
                    // If already started, force restart auto slide
                    isUserInteracting = false;
                    startAutoSlide(true); // Force start regardless of current state
                }
            } else {
                isInView = false;
                stopAutoSlide();
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the block is visible
    });

    observer.observe(sliderContainer);

    // Initialize height calculation
    setContainerHeight();

    // Recalculate height on window resize
    window.addEventListener('resize', () => {
        clearTimeout(window.tsmResizeTimeout);
        window.tsmResizeTimeout = setTimeout(() => {
            setContainerHeight();
        }, 250);
    });

    // Function to go to previous slide
    function prevSlide() {
        const prev = currentSlide - 1 < 0 ? slides.length - 1 : currentSlide - 1;
        showSlide(prev);
    }

    // Touch/Swipe/Drag support for manual navigation
    let startX = 0, startY = 0, isDragging = false;

    function handleTouchStart(e) {
        const touch = e.touches ? e.touches[0] : e;
        startX = touch.clientX;
        startY = touch.clientY;
        isDragging = true;
        isUserInteracting = true;
        stopAutoSlide();
    }

    function handleTouchMove(e) {
        if (!isDragging) return;
        const touch = e.touches ? e.touches[0] : e;
        const diffX = touch.clientX - startX;
        const diffY = touch.clientY - startY;

        // Горизонтальний свайп
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            e.preventDefault();
            if (diffX < 0) {
                nextSlide(); // Свайп вліво - наступний слайд
            } else {
                prevSlide(); // Свайп вправо - попередній слайд
            }
            isDragging = false;

            // Restart auto slide after 3 seconds
            setTimeout(() => {
                isUserInteracting = false;
                if (isInView && hasStarted) {
                    startAutoSlide();
                }
            }, 3000);
        }
    }

    function handleTouchEnd() {
        isDragging = false;
    }

    // Add event listeners for touch/mouse interactions
    sliderContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    sliderContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    sliderContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    sliderContainer.addEventListener('mousedown', handleTouchStart);
    sliderContainer.addEventListener('mousemove', handleTouchMove);
    sliderContainer.addEventListener('mouseup', handleTouchEnd);
    sliderContainer.addEventListener('mouseleave', handleTouchEnd);

    // Keyboard navigation
    sliderContainer.setAttribute('tabindex', '0');
    sliderContainer.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            isUserInteracting = true;
            stopAutoSlide();
            nextSlide();

            // Restart auto slide after 3 seconds
            setTimeout(() => {
                isUserInteracting = false;
                if (isInView && hasStarted) {
                    startAutoSlide();
                }
            }, 3000);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            isUserInteracting = true;
            stopAutoSlide();
            prevSlide();

            // Restart auto slide after 3 seconds
            setTimeout(() => {
                isUserInteracting = false;
                if (isInView && hasStarted) {
                    startAutoSlide();
                }
            }, 3000);
        }
    });
};

// Initialize testimonials slider
if (winW > 991) {
    _functions.testimonialsSlider();
}



// In-page anchor smooth scroll
document.addEventListener('click', function (e) {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href === '#' || !document.querySelector(href)) return;

    const target = document.querySelector(href);
    window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - (winW > 1600 ? 100 : 80), behavior: 'smooth' });
    e.preventDefault();
});

// Hover Change Media for Archive Block
const archiveRows = document.querySelectorAll('.archive-table-tr:not(.archive-table-head)');
archiveRows.forEach(row => {
    const hoverMediaId = row.getAttribute('data-hover-media');
    if (!hoverMediaId) return;
    const block = row.closest('.archive-block');
    if (!block) return;
    const container = block.querySelector('.archive-media');
    if (!container) return;

    const allMedia = Array.from(container.querySelectorAll('.archive-img'));
    const defaultMedia = container.querySelector('.archive-img-current');

    let hoverMedia = null;
    if (hoverMediaId.startsWith('#')) {
        hoverMedia = container.querySelector(hoverMediaId);
    } else {
        hoverMedia = container.querySelector('#' + hoverMediaId);
    }

    // Add initial styles for smoother animations
    allMedia.forEach(el => {
        el.style.transition = 'opacity 0.4s ease, transform 0.6s ease';
        if (!el.classList.contains('archive-img-current')) {
            el.style.transform = 'scale(1.2)';
        } else {
            el.style.transform = 'scale(1)';
        }
    });

    row.addEventListener('mouseenter', () => {
        // Remove current class from default media
        if (defaultMedia) {
            defaultMedia.classList.remove('archive-img-current');
        }

        // Hide all other media and keep them scaled
        allMedia.forEach(el => {
            if (el !== hoverMedia) {
                el.style.opacity = '0';
                el.style.transform = 'scale(1.2)';
            }
        });

        // Show and scale down the hover media
        if (hoverMedia) {
            hoverMedia.classList.add('archive-img-current');
            hoverMedia.style.opacity = '1';
            hoverMedia.style.transform = 'scale(1)';
        }
    });

    row.addEventListener('mouseleave', () => {
        // Remove current class from hover media
        if (hoverMedia) {
            hoverMedia.classList.remove('archive-img-current');
        }

        // Hide all media except default and scale them up
        allMedia.forEach(el => {
            if (el !== defaultMedia) {
                el.style.opacity = '0';
                el.style.transform = 'scale(1.2)';
            }
        });

        // Show and scale down the default media
        if (defaultMedia) {
            defaultMedia.classList.add('archive-img-current');
            defaultMedia.style.opacity = '1';
            defaultMedia.style.transform = 'scale(1)';
        }
    });
});



// Hover Change Picture for Awards Block
function changeAwardsImage() {
    const awardSections = document.querySelectorAll('.award-block');
    if (!awardSections.length) return;

    awardSections.forEach(awardSection => {
        const moveImg = awardSection.querySelector('.award-img-inner');
        const img = awardSection.querySelector('.award-img-wrap');
        const items = awardSection.querySelectorAll('a.award-table-tr:not(.award-table-head)');
        if (!img || !moveImg) return;

        let animFrame;
        let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
        const offsetX = -100;

        function animateImg() {
            currentX += (targetX - currentX) * 0.25;
            currentY += (targetY - currentY) * 0.25;
            img.style.transform = `translate(-50%, -50%) translate(${currentX}px, ${currentY}px)`;
            animFrame = requestAnimationFrame(animateImg);
        }


        awardSection.addEventListener('mousemove', function (e) {
            const target = e.target.closest('.award-table-tr');
            if (target && target.classList.contains('award-table-head')) {
                img.style.opacity = '0';
                return;
            }
            const rect = awardSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            targetX = x - rect.width / 2 - offsetX;
            targetY = y - rect.height / 2;
            img.style.opacity = '1';
            if (!animFrame) animateImg();
        });

        awardSection.addEventListener('mouseleave', function () {
            img.style.opacity = '0';
            cancelAnimationFrame(animFrame);
            animFrame = null;
        });

        items.forEach((el, index) => {
            el.addEventListener('mouseenter', function () {
                const singleImg = moveImg.querySelector('img');
                if (!singleImg) return;
                const imgHeight = singleImg.offsetHeight;
                moveImg.style.transition = 'transform 0.3s cubic-bezier(.4,1,.4,1), opacity 0.3s cubic-bezier(.4,1,.4,1)';
                moveImg.style.opacity = '0.85';
                moveImg.style.transform = `translateY(${-imgHeight * index}px)`;
                moveImg.style.opacity = '1';
            });
        });
    });
}

if (winW > 1199) {
    changeAwardsImage();
}



// Cases Slider
_functions.casesSlider = function () {
    const sliderContainer = document.querySelector('.case-block');
    if (!sliderContainer) return;

    const slides = document.querySelectorAll('.case-card');
    const controls = document.querySelectorAll('.case-control');

    if (slides.length === 0) return;

    let currentSlide = -1;
    let autoSlideInterval;
    let restartTimeout;
    let isUserInteracting = false;
    let isTransitioning = false;
    let isInView = false;
    let hasStarted = false;

    // Function to calculate and set container height
    function setContainerHeight() {
        let maxHeight = 0;

        // Temporarily show all slides to measure their heights
        slides.forEach(slide => {
            slide.style.visibility = 'visible';
            slide.style.opacity = '1';
            slide.style.position = 'static';
            slide.classList.remove('is-active');
        });

        // Find the maximum height
        slides.forEach(slide => {
            const height = slide.offsetHeight;
            if (height > maxHeight) {
                maxHeight = height;
            }
        });

        // Reset slides positioning and classes
        slides.forEach((slide, i) => {
            slide.style.position = '';
            slide.style.visibility = '';
            slide.style.opacity = '';

            if (i === 0) {
                slide.classList.add('is-active');
            } else {
                slide.classList.remove('is-active');
            }
        });

        // Set CSS custom property
        html.style.setProperty('--case-h', maxHeight + 'px');
    }

    // Function to show specific slide
    function showSlide(index) {
        // Prevent multiple transitions at once
        if (isTransitioning || index === currentSlide) return;

        isTransitioning = true;

        slides.forEach((slide, i) => {
            slide.classList.toggle('is-active', i === index);
        });

        // Reset all controls and restart animation for active one
        controls.forEach((control, i) => {
            const isActive = i === index;

            if (isActive) {
                // Reset animation by temporarily removing class
                control.classList.remove('is-active');
                // Force reflow
                control.offsetHeight;
                // Add class back to restart animation
                control.classList.add('is-active');
            } else {
                control.classList.remove('is-active');
            }
        });

        currentSlide = index;

        // Reset transition flag after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, 0); // Match CSS transition duration
    }

    // Function to go to next slide
    function nextSlide() {
        const next = currentSlide + 1 >= slides.length ? 0 : currentSlide + 1;
        showSlide(next);
    }

    // Start auto slide
    function startAutoSlide(force = false) {
        // Don't start if user is currently interacting or not in view (unless forced)
        if (!force && (isUserInteracting || !isInView)) {
            return;
        }

        // Clear any existing interval
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }

        autoSlideInterval = setInterval(nextSlide, 3900);
    }

    // Initialize slider animation
    function initializeSlider() {
        if (hasStarted) return;
        hasStarted = true;

        // Clear any existing active classes
        slides.forEach(slide => slide.classList.remove('is-active'));
        controls.forEach(control => control.classList.remove('is-active'));

        setContainerHeight();
        showSlide(0);

        // Start auto slide after first animation completes
        setTimeout(() => {
            if (isInView) {
                // Force start auto slide on first initialization, ignore user interaction
                isUserInteracting = false;
                startAutoSlide();
            }
        }, 3900);
    }

    // Stop auto slide
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
        if (restartTimeout) {
            clearTimeout(restartTimeout);
            restartTimeout = null;
        }
    }

    // Add click event listeners to controls
    controls.forEach((control, index) => {
        control.addEventListener('click', (e) => {
            e.preventDefault();

            // Set interaction flag
            isUserInteracting = true;

            stopAutoSlide();
            showSlide(index);

            // Clear any existing restart timeout
            if (restartTimeout) {
                clearTimeout(restartTimeout);
                restartTimeout = null;
            }

            // Restart auto slide after 8 seconds of inactivity, but only if in view
            restartTimeout = setTimeout(() => {
                isUserInteracting = false;
                if (isInView && hasStarted) {
                    startAutoSlide();
                }
            }, 0);
        });
    });

    // Intersection Observer to start animation when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                isInView = true;
                if (!hasStarted) {
                    initializeSlider();
                } else {
                    // If already started, force restart auto slide
                    isUserInteracting = false;
                    startAutoSlide(true); // Force start regardless of current state
                }
            } else {
                isInView = false;
                stopAutoSlide();
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the block is visible
    });

    observer.observe(sliderContainer);

    // Initialize height calculation
    setContainerHeight();

    // Recalculate height on window resize
    window.addEventListener('resize', () => {
        clearTimeout(window.tsmResizeTimeout);
        window.tsmResizeTimeout = setTimeout(() => {
            setContainerHeight();
        }, 250);
    });

    // Function to go to previous slide
    function prevSlide() {
        const prev = currentSlide - 1 < 0 ? slides.length - 1 : currentSlide - 1;
        showSlide(prev);
    }

    // Touch/Swipe/Drag support for manual navigation
    let startX = 0, startY = 0, isDragging = false;

    function handleTouchStart(e) {
        const touch = e.touches ? e.touches[0] : e;
        startX = touch.clientX;
        startY = touch.clientY;
        isDragging = true;
        isUserInteracting = true;
        stopAutoSlide();
    }

    function handleTouchMove(e) {
        if (!isDragging) return;
        const touch = e.touches ? e.touches[0] : e;
        const diffX = touch.clientX - startX;
        const diffY = touch.clientY - startY;

        // Горизонтальний свайп
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            e.preventDefault();
            if (diffX < 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            isDragging = false;

            // Restart auto slide after 3 seconds
            setTimeout(() => {
                isUserInteracting = false;
                if (isInView && hasStarted) {
                    startAutoSlide();
                }
            }, 3000);
        }
    }

    function handleTouchEnd() {
        isDragging = false;
    }

    // Add event listeners for touch/mouse interactions
    sliderContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    sliderContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    sliderContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    sliderContainer.addEventListener('mousedown', handleTouchStart);
    sliderContainer.addEventListener('mousemove', handleTouchMove);
    sliderContainer.addEventListener('mouseup', handleTouchEnd);
    sliderContainer.addEventListener('mouseleave', handleTouchEnd);

    // Keyboard navigation
    sliderContainer.setAttribute('tabindex', '0');
    sliderContainer.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            isUserInteracting = true;
            stopAutoSlide();
            nextSlide();

            // Restart auto slide after 3 seconds
            setTimeout(() => {
                isUserInteracting = false;
                if (isInView && hasStarted) {
                    startAutoSlide();
                }
            }, 3000);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            isUserInteracting = true;
            stopAutoSlide();
            prevSlide();

            // Restart auto slide after 3 seconds
            setTimeout(() => {
                isUserInteracting = false;
                if (isInView && hasStarted) {
                    startAutoSlide();
                }
            }, 3000);
        }
    });
};
if (winW > 991) {
    _functions.casesSlider();
}

// Universal function to add blur effect to previous sticky items
function updatePrevStickyItemOnScroll(selector) {
    const items = Array.from(document.querySelectorAll(selector));
    if (!items.length) return;

    let prevIndex = -1;

    items.forEach((item, i) => {
        item.classList.remove('is-prev');
        if (i < items.length - 1) {
            const next = items[i + 1];
            const nextRect = next.getBoundingClientRect();
            const itemRect = item.getBoundingClientRect();

            // Додаємо is-prev, якщо наступний sticky перекриває попередній на 30% висоти
            const overlapThreshold = itemRect.height * 0.2; // 20% від висоти попереднього блоку
            if (nextRect.top < itemRect.bottom - overlapThreshold && nextRect.top >= 0) {
                prevIndex = i;
            }
        }
    });

    if (prevIndex >= 0) {
        items[prevIndex].classList.add('is-prev');
    }
}

// Universal function to add scroll event listeners
function addStickyItemListeners(selector) {
    const handler = () => updatePrevStickyItemOnScroll(selector);
    window.addEventListener('scroll', handler);
    window.addEventListener('resize', handler);
    document.addEventListener('DOMContentLoaded', handler);
}

// Add event listeners for all sticky items
addStickyItemListeners('.tsm-item');
addStickyItemListeners('.service-block.type-2 .service-card');


// AI Block span animation
const aiBlockObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const spans = entry.target.querySelectorAll('.ai-content .title span');

            if (!entry.target.classList.contains('animation-started')) {
                entry.target.classList.add('animation-started');

                function animateSpan(span, startTime) {
                    return new Promise((resolve) => {
                        const duration = 800;

                        function animateGradient(currentTime) {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            const easeOut = 1 - Math.pow(1 - progress, 3);
                            const fillProgress = easeOut * 100;

                            span.style.setProperty('--fill-progress', `${fillProgress}%`);

                            if (progress < 1) {
                                requestAnimationFrame(animateGradient);
                            } else {
                                resolve();
                            }
                        }

                        requestAnimationFrame(animateGradient);
                    });
                }

                async function animateSequentially() {
                    for (let i = 0; i < spans.length; i++) {
                        await animateSpan(spans[i], performance.now());
                    }
                }

                animateSequentially();
            }
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
});

// AI Block 3D scroll control
const aiBlock3DObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const iframe = entry.target.querySelector('iframe[data-ai-3d="embed"]');
        if (!iframe) return;

        if (entry.isIntersecting) {
            // Throttle function for performance optimization
            function throttle(func, delay) {
                let timeoutId;
                let lastExecTime = 0;
                return function (...args) {
                    const currentTime = Date.now();

                    if (currentTime - lastExecTime > delay) {
                        func.apply(this, args);
                        lastExecTime = currentTime;
                    } else {
                        clearTimeout(timeoutId);
                        timeoutId = setTimeout(() => {
                            func.apply(this, args);
                            lastExecTime = Date.now();
                        }, delay - (currentTime - lastExecTime));
                    }
                };
            }

            // Add scroll listener for 3D model control with throttling
            const handleAI3DScroll = throttle(function () {
                const rect = entry.target.getBoundingClientRect();
                const elementHeight = rect.height;
                const elementTop = rect.top;

                // Calculate progress based on element visibility for full 360-degree rotation
                let progress = 0;
                if (elementTop < winH && elementTop + elementHeight > 0) {
                    // Improved calculation for smooth 360-degree rotation
                    if (elementTop <= 0) {
                        // Element is scrolling through the viewport
                        const scrolledAmount = Math.abs(elementTop);
                        const maxScroll = elementHeight - winH;

                        if (maxScroll > 0) {
                            // Map the entire scroll range to 0-1 for full 360-degree rotation
                            progress = Math.max(0, Math.min(1, scrolledAmount / maxScroll));
                        } else {
                            // Element is smaller than viewport
                            progress = 0.5;
                        }
                    } else {
                        // Element is just appearing - start from 0
                        const visibleAmount = winH - elementTop;
                        const elementVisibleHeight = Math.min(visibleAmount, elementHeight);
                        progress = Math.max(0, Math.min(0.1, elementVisibleHeight / elementHeight * 0.1));
                    }

                    // Ensure progress is always between 0 and 1
                    progress = Math.max(0, Math.min(1, progress));
                }

                // Send progress to iframe
                iframe.contentWindow.postMessage({
                    type: 'scroll',
                    scrollProgress: progress
                }, '*');
            }, (isTouchScreen || winW < 1200) ? 50 : 16);

            // Add listener and store reference for removal
            entry.target._ai3dScrollHandler = handleAI3DScroll;
            window.addEventListener('scroll', handleAI3DScroll, { passive: true });
        } else {
            // Remove listener when element is not visible
            if (entry.target._ai3dScrollHandler) {
                window.removeEventListener('scroll', entry.target._ai3dScrollHandler);
                delete entry.target._ai3dScrollHandler;
            }
        }
    });
}, {
    root: null,
    rootMargin: (isTouchScreen || winW < 1200) ? '5% 0px' : '10% 0px',
    threshold: 0
});

// Initialize AI block observers
document.querySelectorAll('.ai-block').forEach(block => {
    aiBlockObserver.observe(block);

    const isTooSmallFor3D = winW < 375;
    if (!isTooSmallFor3D) {
        aiBlock3DObserver.observe(block);
    }
});

// Footer acordeon
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.footer-arrow').forEach(function (arrow) {
        arrow.addEventListener('click', function (e) {
            e.preventDefault();
            if (window.innerWidth > 768) return;
            const item = this.closest('.footer-links-item');
            item.classList.toggle('active');
        });
    });
});
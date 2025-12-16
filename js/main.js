document.addEventListener('DOMContentLoaded', () => {

    /* =====================================================
       1. Typed.js Integration (SAFE)
    ===================================================== */
    const dynamicTextElement = document.getElementById('dynamic-text');

    if (dynamicTextElement && typeof window.Typed !== 'undefined') {
        try {
            new Typed('#dynamic-text', {
                strings: [
                    "<strong>intuitive</strong> and <strong>accessible</strong>",
                    "<strong>modern</strong> and <strong>responsive</strong>",
                    "<strong>fast</strong> and <strong>SEO-friendly</strong>",
                    "<strong>engaging</strong> and <strong>user-centric</strong>"
                ],
                typeSpeed: 50,
                backSpeed: 30,
                loop: true,
                showCursor: true,
                cursorChar: '|',
                contentType: 'html'
            });
        } catch (err) {
            console.warn('Typed.js failed safely:', err);
        }
    }

    /* =====================================================
       2. Current Year
    ===================================================== */
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    /* =====================================================
       3. Navigation & Smooth Scroll (SAFE)
    ===================================================== */
    const navLinks   = document.getElementById('navLinks');
    const burgerMenu = document.getElementById('burgerMenu');
    const navbar     = document.querySelector('.navbar');
    const allNavAnchors = document.querySelectorAll('.navbar a[href^="#"]');

    const closeMobileMenu = () => {
        if (!navLinks || !burgerMenu) return;

        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            burgerMenu.classList.remove('active');
            burgerMenu.setAttribute('aria-expanded', 'false');

            // iOS-safe focus
            if (typeof burgerMenu.focus === 'function') {
                burgerMenu.focus({ preventScroll: true });
            }
        }
    };

    allNavAnchors.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            const target = targetId ? document.querySelector(targetId) : null;

            if (!target) return; // SAFETY: do nothing if target doesn't exist

            e.preventDefault();
            closeMobileMenu();

            setTimeout(() => {
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 120);
        });
    });

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            const isExpanded = burgerMenu.getAttribute('aria-expanded') === 'true';

            navLinks.classList.toggle('active');
            burgerMenu.classList.toggle('active');
            burgerMenu.setAttribute('aria-expanded', String(!isExpanded));
        });
    }

    /* =====================================================
       4. Dark / Light Mode (SIMPLIFIED & SAFE)
    ===================================================== */
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const applyTheme = (isDark) => {
        body.classList.toggle('dark-mode', isDark);

        if (themeToggle) {
            themeToggle.innerHTML = isDark
                ? '<i class="fas fa-moon"></i>'
                : '<i class="fas fa-sun"></i>';

            themeToggle.setAttribute('aria-checked', String(isDark));
        }

        try {
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        } catch (_) {}
    };

    if (themeToggle) {
        let initialDark = false;

        try {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                initialDark = savedTheme === 'dark';
            } else {
                initialDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            }
        } catch (_) {}

        applyTheme(initialDark);

        themeToggle.addEventListener('click', () => {
            applyTheme(!body.classList.contains('dark-mode'));
        });
    }

});

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Typed.js Integration for Hero Text (No changes needed) ---
    const dynamicTextElement = document.getElementById('dynamic-text');
    if (dynamicTextElement && typeof Typed !== 'undefined') {
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
    }

    // --- 2. Current Year Update (No changes needed) ---
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // --- 3. Mobile Menu Toggle and Smooth Scrolling Setup ---
    const navLinks = document.getElementById('navLinks');
    const burgerMenu = document.getElementById('burgerMenu');
    const allNavAnchors = document.querySelectorAll('.navbar a[href^="#"]');
    // FIX: Using querySelector('.navbar') is fine, but adding redundancy for robustness
    const navbar = document.querySelector('.navbar') || document.querySelector('header .container'); 

    // Function to close the mobile menu
    const closeMobileMenu = () => {
        if (navLinks && burgerMenu && navLinks.classList.contains('active')) {
            // FIX: Use a simple class check for active state
            navLinks.classList.remove('active');
            burgerMenu.classList.remove('active');
            burgerMenu.setAttribute('aria-expanded', 'false');
            // FIX: Ensure accessibility by refocusing the burger menu after closing
            burgerMenu.focus(); 
        }
    };
    
    // Smooth Scroll Logic with Sticky Header Offset
    allNavAnchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                // 1. Close the menu first (if mobile menu is active)
                closeMobileMenu();

                // 2. Use a slight delay to ensure the menu closing transition finishes 
                //    before calculating the scroll position, providing a more accurate offset.
                //    (Especially relevant if the navbar changes height on mobile open/close).
                setTimeout(() => {
                    const navbarHeight = navbar ? navbar.offsetHeight : 0; 
                    const targetPosition = target.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 100); // 100ms is usually enough for quick CSS transitions
            }
        });
    });

    // Mobile navigation toggle (A11y update)
    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            const isExpanded = burgerMenu.getAttribute('aria-expanded') === 'true';
            
            navLinks.classList.toggle('active');
            burgerMenu.classList.toggle('active'); 
            
            // Toggle ARIA expanded state
            burgerMenu.setAttribute('aria-expanded', String(!isExpanded));
        });
    }

    // --- 4. Dark/Light Mode Toggle (No changes needed) ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Helper function to set the theme state
    const setTheme = (isDark) => {
        if (!themeToggle) return;

        if (isDark) {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.setAttribute('aria-checked', 'true');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.setAttribute('aria-checked', 'false');
            localStorage.setItem('theme', 'light');
        }
    };

    if (themeToggle) {
        // Initial Theme Setup Logic
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const initialIsDarkMode = savedTheme ? savedTheme === 'dark' : prefersDark;

        setTheme(initialIsDarkMode);

        // Toggle Listener
        themeToggle.addEventListener('click', () => {
            const newIsDarkMode = !body.classList.contains('dark-mode');
            setTheme(newIsDarkMode);
        });
    }
});
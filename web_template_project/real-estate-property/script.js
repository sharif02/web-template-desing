document.addEventListener('DOMContentLoaded', () => {

    // --- Header and Sticky Bar Scroll Logic ---
    const header = document.querySelector('.header');
    const stickyBar = document.querySelector('.sticky-bar');
    const heroSection = document.querySelector('.hero');

    // Calculate when to show the sticky bar (after passing hero section)
    const toggleHeaderAndStickyBar = () => {
        const scrollPos = window.scrollY;

        // Header background toggle
        if (scrollPos > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Sticky Overview Bar toggle
        // Show sticky bar once we scroll past the hero height minus 100px buffer
        const heroHeight = heroSection.offsetHeight;
        if (scrollPos > (heroHeight - 100)) {
            stickyBar.classList.add('visible');
            // optionally hide original header if you only want sticky bar
            header.style.transform = 'translateY(-100%)';
        } else {
            stickyBar.classList.remove('visible');
            header.style.transform = 'translateY(0)';
        }
    };

    window.addEventListener('scroll', toggleHeaderAndStickyBar);
    toggleHeaderAndStickyBar(); // Init


    // --- Intersection Observer for Reveals ---
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    });

    reveals.forEach(reveal => observer.observe(reveal));


    // --- Fake Floorplan Tabs ---
    const fpTabs = document.querySelectorAll('.fp-tab');
    const overlayText = document.querySelector('.overlay-text');

    fpTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all
            fpTabs.forEach(t => t.classList.remove('active'));
            // Add to clicked
            tab.classList.add('active');

            // Simulate loading a new floorplan
            const level = tab.getAttribute('data-target');
            overlayText.textContent = `Loading ${level} level...`;
            overlayText.style.opacity = '1';

            setTimeout(() => {
                overlayText.textContent = `${level.charAt(0).toUpperCase() + level.slice(1)} Level View`;
                setTimeout(() => {
                    overlayText.style.opacity = '0'; // fade out text
                }, 1000);
            }, 800);
        });
    });

    // Fade out initial overlay text after brief moment
    setTimeout(() => {
        if (overlayText) {
            overlayText.style.transition = 'opacity 0.5s ease';
            overlayText.style.opacity = '0';
        }
    }, 2000);


    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                // offset for the sticky bar
                const offset = 80;
                const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });


    // --- Form Mock Submit ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Inquiry Sent';
                btn.style.backgroundColor = '#2e7d32'; // Success green
                btn.style.borderColor = '#2e7d32';
                contactForm.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = ''; // Reset to CSS defined
                    btn.style.borderColor = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

});

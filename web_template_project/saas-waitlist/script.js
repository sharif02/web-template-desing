document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Blur on Scroll ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(reveal => observer.observe(reveal));

    // --- Pricing Toggle Logic ---
    const billingToggle = document.getElementById('billingToggle');
    const priceAmounts = document.querySelectorAll('.amount');

    if (billingToggle) {
        billingToggle.addEventListener('change', (e) => {
            const isYearly = e.target.checked;

            priceAmounts.forEach(amountText => {
                // simple fade out/in animation for price change
                amountText.style.opacity = 0;

                setTimeout(() => {
                    if (isYearly) {
                        amountText.textContent = amountText.getAttribute('data-yearly');
                    } else {
                        amountText.textContent = amountText.getAttribute('data-monthly');
                    }
                    amountText.style.opacity = 1;
                }, 200);
            });
        });
    }

    // --- Waitlist Form Mock Submission ---
    const form = document.getElementById('waitlistForm');
    const btn = document.getElementById('submitBtn');
    const successMsg = document.getElementById('successMsg');

    // get parent waitlist section to hide forms
    const ctaContainer = document.querySelector('.hero-cta');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate email briefly
            const email = document.getElementById('emailInput').value;
            if (!email) return;

            // Mock API Request state
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Joining...';
            btn.disabled = true;

            setTimeout(() => {
                // Hide form elements gently
                form.style.opacity = '0';
                const statusTxt = document.querySelector('.waitlist-status');
                if (statusTxt) statusTxt.style.opacity = '0';

                setTimeout(() => {
                    form.classList.add('hidden');
                    if (statusTxt) statusTxt.classList.add('hidden');

                    // Show success
                    successMsg.classList.remove('hidden');

                }, 300); // Wait for fade out

            }, 1000); // Fake network delay
        });
    }

    // --- Smooth Scrolling for Nav Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const offset = 80; // Navbar height
                const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

});

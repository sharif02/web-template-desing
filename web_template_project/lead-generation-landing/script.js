document.addEventListener('DOMContentLoaded', () => {

    // --- Intersection Observer for Scroll Animations ---
    const revealElements = document.querySelectorAll('.reveal-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));


    // --- Form Validation & Submission Logic ---
    const leadForm = document.getElementById('leadForm');
    const submitBtn = document.getElementById('submitBtn');
    const successState = document.getElementById('successState');
    const emailInput = document.getElementById('email');

    // Simple email validation regex
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    if (leadForm) {
        // Real-time email validation
        emailInput.addEventListener('input', function () {
            if (this.value && !isValidEmail(this.value)) {
                this.style.borderColor = 'var(--red)';
            } else {
                this.style.borderColor = ''; // reset
            }
        });

        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate Email before submit
            if (!isValidEmail(emailInput.value)) {
                emailInput.focus();
                emailInput.style.borderColor = 'var(--red)';
                return;
            }

            // Simulate API Request for form submission
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Submitting...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            setTimeout(() => {
                // Hide Form, Show Success Message
                leadForm.classList.add('hidden');

                // Hide the intro text in form card too
                const formCardText = document.querySelectorAll('.form-card h3, .form-card > p:not(.form-disclaimer)');
                formCardText.forEach(el => el.classList.add('hidden'));

                successState.classList.remove('hidden');

            }, 1200); // 1.2s fake delay
        });
    }

});

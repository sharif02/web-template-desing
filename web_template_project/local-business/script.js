document.addEventListener('DOMContentLoaded', () => {

    // --- Intersection Observer for Reveals ---
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(el => observer.observe(el));


    // --- Form Mock Submission Logic ---
    const quoteForm = document.getElementById('quoteForm');

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get button to manipulate state
            const submitBtn = quoteForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Loading state
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending Request...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.8';

            // Simulate API call delay
            setTimeout(() => {
                // Success state
                submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Request Received!';
                submitBtn.style.backgroundColor = '#10b981'; // Success Green
                submitBtn.style.color = '#fff';

                // Hide inputs to show 'thank you' message cleanly
                const inputs = quoteForm.querySelectorAll('input, select');
                inputs.forEach(input => {
                    input.style.display = 'none';
                });

                // Add message text
                const msg = document.createElement('p');
                msg.innerHTML = "<strong>Thank you!</strong><br>A roofing specialist will call you at the number provided within 30 minutes.";
                msg.style.color = '#374151';
                msg.style.marginTop = '20px';
                msg.style.fontSize = '1.1rem';

                // Insert after form title/desc
                quoteForm.insertBefore(msg, submitBtn);

                // Option: Reset form after a few seconds (usually don't do this for lead gen, leave success state)
            }, 1500);
        });
    }

    // --- Smooth Scrolling for internal anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                // 120 gives breathing room below the sticky header
                const offset = 120;
                const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

});

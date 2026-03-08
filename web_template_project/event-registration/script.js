document.addEventListener('DOMContentLoaded', () => {

    // --- Header Scrolled State ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Intersection Observers for Scroll Reveals ---
    const reveals = document.querySelectorAll('.reveal-up');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once revealed
                // obs.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(r => observer.observe(r));

    // --- Fake Static Countdown Timer ---
    // Just decreases seconds for visual effect, doesn't actually count to a date
    const secsEl = document.querySelector('.time-box:nth-child(4) .num');
    const minsEl = document.querySelector('.time-box:nth-child(3) .num');

    if (secsEl && minsEl) {
        let secs = parseInt(secsEl.textContent);
        let mins = parseInt(minsEl.textContent);

        setInterval(() => {
            secs--;
            if (secs < 0) {
                secs = 59;
                mins--;
                minsEl.textContent = mins < 10 ? '0' + mins : mins;
            }
            secsEl.textContent = secs < 10 ? '0' + secs : secs;
        }, 1000);
    }

    // --- Tab Switching Logic (Schedule) ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    // In a real app we'd hide/show different timeline content.
    // For this mockup, we'll just simulate loading state.
    const timeline = document.querySelector('.timeline');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Active state
            tabBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            // Simulate loading new day data
            timeline.style.opacity = '0.5';
            setTimeout(() => {
                timeline.style.opacity = '1';
                // In production, update HTML inside timeline here based on data-day attribute
            }, 400);
        });
    });

    // --- Modal Logic ---
    const regModal = document.getElementById('regModal');
    const regBtns = document.querySelectorAll('.reg-btn');
    const closeModal = document.querySelector('.close-modal');
    const regForm = document.getElementById('ticketForm');

    if (regModal) {
        regBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                regModal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });

        closeModal.onclick = () => {
            regModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };

        window.onclick = (e) => {
            if (e.target == regModal) {
                regModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        };

        // Mock Submission
        if (regForm) {
            regForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const submitBtn = regForm.querySelector('button[type="submit"]');
                const origText = submitBtn.textContent;

                submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Registration Started';
                    submitBtn.style.backgroundColor = '#10b981'; // Success Green
                    submitBtn.style.color = '#fff';

                    setTimeout(() => {
                        regModal.style.display = 'none';
                        document.body.style.overflow = 'auto';

                        // Reset
                        submitBtn.textContent = origText;
                        submitBtn.style.backgroundColor = '';
                        submitBtn.disabled = false;
                        regForm.reset();
                    }, 1500);

                }, 1500);
            });
        }
    }

    // --- Smooth Anchor Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;

            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

});

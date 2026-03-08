document.addEventListener('DOMContentLoaded', () => {

    // --- Fake Countdown Timer ---
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        // Start 2h 14m 59s
        let time = (2 * 60 * 60) + (14 * 60) + 59;

        setInterval(() => {
            time--;
            if (time < 0) time = 0;

            let h = Math.floor(time / 3600);
            let m = Math.floor((time % 3600) / 60);
            let s = Math.floor(time % 60);

            // Format 00:00:00
            h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;

            countdownEl.textContent = `${h}:${m}:${s}`;
        }, 1000);
    }

    // --- Scroll Reveal Animations ---
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(r => observer.observe(r));

    // --- Accordion Logic ---
    const accBtns = document.querySelectorAll('.accordion-btn');

    accBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Check if to close currently open one
            // Uncomment below if you want only one open at a time
            /*
            accBtns.forEach(otherBtn => {
                if(otherBtn !== this && otherBtn.classList.contains('active')) {
                    otherBtn.classList.remove('active');
                    otherBtn.nextElementSibling.style.maxHeight = null;
                }
            });
            */

            this.classList.toggle('active');
            const content = this.nextElementSibling;

            if (content.style.maxHeight) {
                content.style.maxHeight = null; // Close
            } else {
                content.style.maxHeight = content.scrollHeight + "px"; // Open completely based on inner content height
            }
        });
    });

    // Option: Open the first accordion by default
    if (accBtns.length > 0) {
        accBtns[0].click();
    }


    // --- Mock Checkout Modal ---
    const modal = document.getElementById('checkoutModal');
    const enrollBtns = document.querySelectorAll('.enroll-btn');
    const closeBtn = document.querySelector('.close-modal');
    const checkoutForm = document.querySelector('.checkout-form');

    if (modal) {
        enrollBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = "block";
            });
        });

        closeBtn.onclick = function () {
            modal.style.display = "none";
        }

        window.onclick = function (e) {
            if (e.target == modal) {
                modal.style.display = "none";
            }
        }

        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const submitBtn = checkoutForm.querySelector('button[type="submit"]');
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Payment Complete';
                    submitBtn.style.background = '#10b981';

                    setTimeout(() => {
                        modal.style.display = "none";
                        // Reset
                        submitBtn.innerHTML = 'Pay $299.00';
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                        checkoutForm.reset();
                    }, 2000);
                }, 1500);
            });
        }
    }


    // --- Smooth Scroll Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;

            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});

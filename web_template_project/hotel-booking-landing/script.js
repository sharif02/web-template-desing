document.addEventListener('DOMContentLoaded', () => {

    // --- Header Scroll State ---
    const header = document.querySelector('.header');

    const toggleHeaderBackground = () => {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', toggleHeaderBackground);
    toggleHeaderBackground(); // Run on load

    // --- Date Inputs Defaults ---
    const checkin = document.getElementById('checkin');
    const checkout = document.getElementById('checkout');

    if (checkin && checkout) {
        const today = new Date();
        const tmrw = new Date(today);
        tmrw.setDate(tmrw.getDate() + 1);

        // Format to YYYY-MM-DD
        const formatDate = (date) => {
            let d = date.getDate().toString().padStart(2, '0');
            let m = (date.getMonth() + 1).toString().padStart(2, '0');
            let y = date.getFullYear();
            return `${y}-${m}-${d}`;
        }

        checkin.value = formatDate(today);
        checkin.min = formatDate(today);

        checkout.value = formatDate(tmrw);
        checkout.min = formatDate(tmrw);

        // Ensure checkout is always after checkin
        checkin.addEventListener('change', () => {
            const ciDate = new Date(checkin.value);
            const coDate = new Date(ciDate);
            coDate.setDate(coDate.getDate() + 1);
            checkout.min = formatDate(coDate);
            if (new Date(checkout.value) <= ciDate) {
                checkout.value = formatDate(coDate);
            }
        });
    }

    // --- Scroll Animations (Intersection Observer) ---
    const reveals = document.querySelectorAll('.reveal');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // --- Booking Form Submit (Mock Modal) ---
    const bookingForm = document.getElementById('bookingForm');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-modal');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Show Modal
            modal.style.display = "block";

            // Simulate processing
            setTimeout(() => {
                const inner = modal.querySelector('.modal-inner');
                inner.innerHTML = `
                    <i class="fa-solid fa-plane-circle-check modal-icon" style="color: #4CAF50;"></i>
                    <h3>Rooms Available!</h3>
                    <p>We found 3 room options for your selected dates. Redirecting you to the booking portal...</p>
                `;

                // Close after a delay (simulating redirect)
                setTimeout(() => {
                    modal.style.display = "none";
                    // Reset modal content
                    setTimeout(() => {
                        inner.innerHTML = `
                            <i class="fa-regular fa-circle-check modal-icon"></i>
                            <h3>Checking Availability...</h3>
                            <p>We are searching for the best rates for your selected dates. Please wait a moment.</p>
                        `;
                    }, 500);
                }, 3000);

            }, 1500);
        });
    }

    if (closeBtn) {
        closeBtn.onclick = function () {
            modal.style.display = "none";
        }
    }

    // Close modal on outside click
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // --- Smooth Anchor Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = this.getAttribute('href');
            if (target === '#' || target === '#book') return; // let book link do nothing or handle differently

            const targetEl = document.querySelector(target);
            if (targetEl) {
                e.preventDefault();
                const offset = 80; // height of fixed header
                const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });

});

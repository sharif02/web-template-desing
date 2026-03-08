// Simple interaction logic for Restaurant page

document.addEventListener('DOMContentLoaded', () => {

    // Navbar color transition on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle implementation
    // Keeping it simple since it's a basic landing page
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            // A simple inline style toggle for mobile menu demo purposes
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = '#fffaf0';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 10px rgba(0,0,0,0.1)';

                // Ensure links are dark on mobile
                const links = navLinks.querySelectorAll('a');
                links.forEach(link => link.style.color = '#1a1a1a');
            }
        });
    }

    // Reservation form mock submission
    const resForm = document.getElementById('res-form');
    const feedbackMsg = document.getElementById('form-feedback');

    if (resForm) {
        // Set minimum date to today for UX
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }

        resForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = resForm.querySelector('button');
            const originalText = btn.textContent;

            btn.textContent = 'Checking availability...';
            btn.disabled = true;

            // Fake an API delay
            setTimeout(() => {
                feedbackMsg.textContent = "Table booked! We've sent a confirmation email.";
                resForm.reset();

                btn.textContent = originalText;
                btn.disabled = false;

                // Clear message after a few seconds
                setTimeout(() => {
                    feedbackMsg.textContent = '';
                }, 5000);
            }, 1200);
        });
    }
});

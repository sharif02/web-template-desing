document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scrolled style ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Intersection Observer for Scroll Reveals ---
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Don't unobserve if you want anims to play again on scroll up. usually unobserve is better.
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(el => observer.observe(el));


    // --- Fake progress bar animation ---
    // Make the progress bar animate in for the UI Mockup effect
    const fillBar = document.querySelector('.progress-bar .fill');
    if (fillBar) {
        // start at 0
        fillBar.style.width = '0%';
        fillBar.style.transition = 'width 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)';

        setTimeout(() => {
            fillBar.style.width = '75%';
        }, 1000);
    }

    // Simulate habit check logic in mockup
    const habits = document.querySelectorAll('.habit');
    habits.forEach(habit => {
        habit.addEventListener('click', () => {
            habit.classList.toggle('checked');
            const icon = habit.querySelector('i');
            if (habit.classList.contains('checked')) {
                icon.className = 'fa-solid fa-check';
            } else {
                icon.className = 'fa-regular fa-circle';
            }
        });
    });


    // --- Smooth Anchor Offset Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;

            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                const offset = 80; // Navbar height
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

});

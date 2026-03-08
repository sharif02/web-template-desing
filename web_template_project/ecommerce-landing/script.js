// Simple script for E-commerce interactions

document.addEventListener('DOMContentLoaded', () => {

    // Navbar shadow on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow');
        } else {
            navbar.classList.remove('shadow');
        }
    });

    // Mock Add to Cart functionality
    const addBtns = document.querySelectorAll('.add-btn');
    const cartCount = document.getElementById('cart-count');
    const toast = document.getElementById('toast');
    let itemsInCart = 2; // Default mock count

    addBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // Temporary button state
            const originalText = btn.textContent;
            btn.textContent = 'Adding...';
            btn.disabled = true;

            setTimeout(() => {
                // Update cart count
                itemsInCart++;
                cartCount.textContent = itemsInCart;

                // Reset button
                btn.textContent = 'Added!';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 1500);

                // Show toast notification
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);

            }, 500); // 500ms fake delay
        });
    });

    // Handle form submission
    const form = document.getElementById('subscribe-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            btn.textContent = 'Subscribed!';
            btn.style.backgroundColor = '#4ade80'; // Success green
            btn.style.color = '#111';
            form.querySelector('input').value = '';
        });
    }

});

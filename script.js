// Theme Toggle (Dark Mode)
const themeToggle = document.getElementById('themeToggle');
const body = document.documentElement; // using root for data-theme

// Check for saved user preference, if any, on load of the website
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
}

themeToggle.addEventListener('click', () => {
    let theme = body.getAttribute('data-theme');
    
    if (theme === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Simple Search Filter for Homepage
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const cards = document.querySelectorAll('.card');

function filterDestinations() {
    if(!searchInput) return;
    const query = searchInput.value.toLowerCase();
    
    cards.forEach(card => {
        const location = card.getAttribute('data-location').toLowerCase();
        const desc = card.querySelector('.desc').innerText.toLowerCase();
        
        if (location.includes(query) || desc.includes(query)) {
            card.style.display = 'block';
            card.style.animation = 'none'; // reset
            setTimeout(() => card.style.animation = 'fadeInUp 0.5s forwards', 10);
        } else {
            card.style.display = 'none';
        }
    });

    // Scroll to destinations if searching
    if(query.length > 0) {
        document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
    }
}

if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', filterDestinations);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            filterDestinations();
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if(this.getAttribute('href') === '#') return; // Ignore just '#' links
        
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for fixed navbar height
                behavior: 'smooth'
            });
        }
    });
});

// Booking Form Handling
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = bookingForm.querySelector('button');
        const originalText = btn.innerText;
        
        // Mock processing
        btn.innerText = 'Sending Request...';
        btn.style.opacity = '0.8';
        
        setTimeout(() => {
            btn.innerText = 'Request Sent!';
            btn.style.background = '#4ecdc4'; // success color
            bookingForm.reset();
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = ''; // reset to default
                btn.style.opacity = '1';
            }, 3000);
        }, 1500);
    });
}

// Newsletter Subscription Handling
const subscribeForm = document.getElementById('subscribeForm');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = subscribeForm.querySelector('button');
        const input = subscribeForm.querySelector('input');
        const originalText = btn.innerText;
        
        btn.innerText = 'Subscribing...';
        btn.style.opacity = '0.8';
        
        setTimeout(() => {
            btn.innerText = 'Subscribed!';
            btn.style.background = '#4ecdc4'; // success color
            input.value = '';
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
                btn.style.opacity = '1';
            }, 3000);
        }, 1000);
    });
}

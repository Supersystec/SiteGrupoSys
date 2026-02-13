// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animate numbers on scroll
const numberCards = document.querySelectorAll('.number-value');

const animateNumber = (element) => {
    const target = element.textContent;
    const isPlus = target.includes('+');
    const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
    const duration = 2000;
    const increment = numericValue / (duration / 16);
    let current = 0;

    const updateNumber = () => {
        current += increment;
        if (current < numericValue) {
            if (target.includes('mil')) {
                element.textContent = `+${Math.floor(current / 1000)} mil`;
            } else if (target.includes('x')) {
                element.textContent = `${Math.floor(current)}x`;
            } else {
                element.textContent = isPlus ? `+${Math.floor(current)}` : Math.floor(current).toString();
            }
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = target;
        }
    };

    updateNumber();
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            
            // Animate numbers
            if (entry.target.classList.contains('number-card')) {
                const numberValue = entry.target.querySelector('.number-value');
                if (numberValue && !numberValue.dataset.animated) {
                    numberValue.dataset.animated = 'true';
                    animateNumber(numberValue);
                }
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
    '.differential-card, .stat-card, .vertical-card, .number-card, .contact-item'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Obrigado pela sua mensagem! Entraremos em contato em breve.');
    
    // Reset form
    contactForm.reset();
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-bg');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add active state to nav links based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Prevent default form submission behavior
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });
});

// Team Carousel
const teamCarousel = document.getElementById('teamCarousel');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');

if (teamCarousel && carouselPrev && carouselNext) {
    const scrollAmount = 344;
    let autoScrollInterval;

    const startAutoScroll = () => {
        autoScrollInterval = setInterval(() => {
            const maxScroll = teamCarousel.scrollWidth - teamCarousel.clientWidth;
            if (teamCarousel.scrollLeft >= maxScroll - 5) {
                teamCarousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                teamCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }, 3000);
    };

    const stopAutoScroll = () => {
        clearInterval(autoScrollInterval);
    };

    carouselNext.addEventListener('click', () => {
        stopAutoScroll();
        teamCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        startAutoScroll();
    });

    carouselPrev.addEventListener('click', () => {
        stopAutoScroll();
        teamCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        startAutoScroll();
    });

    teamCarousel.addEventListener('mouseenter', stopAutoScroll);
    teamCarousel.addEventListener('mouseleave', startAutoScroll);

    startAutoScroll();
}
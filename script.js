// Typing effect
const text = "Data Analyst";
const typingText = document.querySelector('.typing-text');
let i = 0;
let isTyping = true;

function typeWriter() {
    if (i < text.length) {
        typingText.textContent = text.substring(0, i + 1);
        i++;
        setTimeout(typeWriter, 100);
    } else {
        setTimeout(eraseText, 2000);
    }
}

function eraseText() {
    if (i > 0) {
        typingText.textContent = text.substring(0, i - 1);
        i--;
        setTimeout(eraseText, 50);
    } else {
        setTimeout(typeWriter, 500);
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    if (typingText) {
        typingText.textContent = ''; // Clear any existing text
        typeWriter();
    }
});

// Particle Effect for Hero Section
function initParticles() {
    const canvas = document.getElementById('data-particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(6, 214, 160, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.strokeStyle = `rgba(6, 214, 160, ${0.1 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Animated Counter
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.floor(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for Counter Animation
function initCounters() {
    const statCards = document.querySelectorAll('.stat-card, .stat-card-large');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.getAttribute('data-target'));
                const counterElement = entry.target.querySelector('.counter');
                if (counterElement) {
                    animateCounter(counterElement, target);
                }
            }
        });
    }, { threshold: 0.5 });
    
    statCards.forEach(card => observer.observe(card));
}

// Initialize Charts with scroll animation
let chartsInitialized = false;

function initCharts() {
    if (chartsInitialized) return;
    
    const chartSection = document.querySelector('.combined-section') || document.querySelector('.data-viz-section');
    if (!chartSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !chartsInitialized) {
                chartsInitialized = true;
                createCharts();
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(chartSection);
}

function createCharts() {
    // Programming Languages Chart
    const languagesCtx = document.getElementById('languagesChart');
    if (languagesCtx) {
        new Chart(languagesCtx, {
            type: 'doughnut',
                data: {
                labels: ['Python', 'SQL', 'HTML/CSS', 'JavaScript', 'Java'],
                datasets: [{
                    data: [20, 20, 20, 20, 20],
                    backgroundColor: [
                        'rgba(6, 214, 160, 0.8)',      // Python - Yellow
                        'rgba(100, 150, 255, 0.8)',    // SQL - Blue
                        'rgba(200, 100, 255, 0.8)',    // HTML/CSS - Purple
                        'rgba(0, 254, 186, 0.8)',      // JavaScript - Teal
                        'rgba(255, 100, 100, 0.8)'     // Java - Red
                    ],
                    borderColor: [
                        'rgba(6, 214, 160, 1)',        // Python
                        'rgba(100, 150, 255, 1)',      // SQL
                        'rgba(200, 100, 255, 1)',      // HTML/CSS
                        'rgba(0, 254, 186, 1)',        // JavaScript
                        'rgba(255, 100, 100, 1)'       // Java
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'white',
                            font: {
                                size: 12
                            },
                            generateLabels: function(chart) {
                                const data = chart.data;
                                if (data.labels.length && data.datasets.length) {
                                    const dataset = data.datasets[0];
                                    const total = dataset.data.reduce((a, b) => a + b, 0);
                                    return data.labels.map((label, i) => {
                                        const value = dataset.data[i];
                                        const percentage = ((value / total) * 100).toFixed(0);
                                        return {
                                            text: `${label}: ${percentage}%`,
                                            fillStyle: dataset.backgroundColor[i],
                                            strokeStyle: dataset.borderColor[i],
                                            lineWidth: dataset.borderWidth,
                                            hidden: false,
                                            index: i,
                                            fontColor: 'white'
                                        };
                                    });
                                }
                                return [];
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: 'rgba(6, 214, 160, 0.5)',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(0);
                                return `${label}: ${percentage}%`;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 2000
                }
            }
        });
    }
}

// Mobile Navigation
const menuIcon = document.querySelector('.menu-icon');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuIcon && mobileMenu) {
    menuIcon.addEventListener('click', () => {
        mobileMenu.classList.toggle('menu-active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !menuIcon.contains(e.target)) {
            mobileMenu.classList.remove('menu-active');
        }
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        const name = data.name || '';
        const email = data.email || '';
        const message = data.message || '';

        const subject = encodeURIComponent('Portfolio contact form');
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        window.location.href = `mailto:luizhmacedo0@gmail.com?subject=${subject}&body=${body}`;
    });
}

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// Page transition animation
function initPageTransition() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-in';
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}

// Enhanced scroll animations with staggered reveals
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.project-card, .about-content, .contact-content, .about-block, .skill-item, ' +
        '.stat-card-large, .chart-card, .projects h2, .data-stats-section, section > h2'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    animatedElements.forEach((element, index) => {
        if (!element.classList.contains('skill-item') && !element.classList.contains('about-block')) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(40px)';
            element.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${(index % 4) * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${(index % 4) * 0.1}s`;
        }
        observer.observe(element);
    });
}

// 3D Tilt Effect for Project Cards
function initCardTilt() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -6;
            const rotateY = (x - centerX) / centerX * 6;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
            card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(6, 214, 160, 0.2)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
            card.style.boxShadow = '';
            card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
        });
    });
}

// Hero Parallax on Mouse Move
function initHeroParallax() {
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image img');
    if (!hero || !heroImage) return;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        heroImage.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
        heroImage.style.transition = 'transform 0.15s ease-out';
    });

    hero.addEventListener('mouseleave', () => {
        heroImage.style.transform = 'translate(0, 0)';
        heroImage.style.transition = 'transform 0.4s ease-out';
    });
}

// Lightbox functionality
function initLightbox() {
    const imageWrappers = document.querySelectorAll('.image-wrapper');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<span class="close-lightbox">&times;</span><img class="lightbox-content" src="" alt="">';
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('.lightbox-content');
    const closeBtn = lightbox.querySelector('.close-lightbox');
    
    imageWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', (e) => {
            const img = wrapper.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

// Add animation class to elements when they come into view
document.addEventListener('DOMContentLoaded', () => {
    // Initialize page transition
    initPageTransition();
    
    // Initialize navbar scroll effect
    initNavbarScroll();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize lightbox
    initLightbox();
    
    // Initialize card tilt
    initCardTilt();

    // Initialize hero parallax
    initHeroParallax();

    // Initialize new features (only on index.html)
    if (document.getElementById('data-particles')) {
        initParticles();
    }
    if (document.querySelector('.stat-card') || document.querySelector('.stat-card-large')) {
        initCounters();
    }
    if (document.getElementById('languagesChart')) {
        initCharts();
    }
}); 
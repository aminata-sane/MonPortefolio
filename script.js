// ===========================
// SMOOTH SCROLL NAVIGATION
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// VIDEO HOVER EFFECT
// ===========================

// Fonction pour tester le support de l'autoplay
function canAutoplay() {
    return new Promise((resolve) => {
        const video = document.createElement('video');
        video.muted = true;
        video.playsInline = true;
        video.preload = 'none';
        
        video.addEventListener('canplaythrough', () => {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    video.pause();
                    resolve(true);
                }).catch(() => {
                    resolve(false);
                });
            } else {
                resolve(false);
            }
        });
        
        video.addEventListener('error', () => resolve(false));
        video.src = 'data:video/mp4;base64,AAAAHGZ0eXBtcDQyAAACAGlzb21pc28yYXZjMQAAAAhmcmVlAAAGF21kYXQ=';
    });
}

const projectCards = document.querySelectorAll('.project-card');

canAutoplay().then(autoplaySupported => {
    projectCards.forEach(card => {
        const video = card.querySelector('.card-video');
        
        if (video) {
            // Si autoplay est supporté ET que la vidéo a l'attribut autoplay
            if (autoplaySupported && video.hasAttribute('autoplay')) {
                video.play().catch(err => {
                    console.log('Autoplay video failed:', err);
                });
            } else {
                // Sinon, comportement hover normal
                card.addEventListener('mouseenter', () => {
                    video.play().catch(err => {
                        console.log('Video autoplay failed:', err);
                    });
                });
                
                card.addEventListener('mouseleave', () => {
                    video.pause();
                    video.currentTime = 0;
                });
            }
        }
    });
});

// ===========================
// SCROLL ANIMATIONS
// ===========================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Appliquer l'animation aux cartes projet
const animateOnScroll = document.querySelectorAll('.project-card');
animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(5, 5, 5, 0.9)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(5, 5, 5, 0.7)';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===========================
// CURSOR GLOW EFFECT (Desktop only)
// ===========================
if (window.innerWidth > 1024) {
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    cursorGlow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursorGlow);
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
    
    function animateCursor() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        cursorGlow.style.left = currentX + 'px';
        cursorGlow.style.top = currentY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// ===========================
// ACTIVE NAV LINK
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================
// Lazy loading des vidéos
const videos = document.querySelectorAll('.card-video');
videos.forEach(video => {
    video.setAttribute('preload', 'none');
});

// Console log stylisé
console.log(
    '%c🚀 Portfolio créé par Aminata Sane',
    'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 8px;'
);

console.log(
    '%c💼 Besoin d\'un site web ? Contactez-moi !',
    'color: #667eea; font-size: 14px; font-weight: 600;'
);

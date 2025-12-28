/* ========================================
   DRESSING ROOM - PV Style Animations
   パララックス + テキストスプリット + 3Dチルト
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations
    initParallax();
    initTextSplit();
    initCardTilt();
    initScrollAnimations();
    initReadingProgress();
});

/* ========================================
   PARALLAX EFFECT - パララックス効果
   ======================================== */
function initParallax() {
    const hero = document.querySelector('.hero');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroLabel = document.querySelector('.hero-label');
    const bgLines = document.querySelector('.bg-lines');

    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;

        if (heroTitle) {
            heroTitle.style.transform = `translateY(${rate * 0.3}px)`;
            heroTitle.style.opacity = 1 - scrolled / 500;
        }
        if (heroSubtitle) {
            heroSubtitle.style.transform = `translateY(${rate * 0.2}px)`;
            heroSubtitle.style.opacity = 1 - scrolled / 600;
        }
        if (heroLabel) {
            heroLabel.style.transform = `translateY(${rate * 0.1}px)`;
            heroLabel.style.opacity = 1 - scrolled / 400;
        }
        if (bgLines) {
            bgLines.style.transform = `translateY(${rate * 0.5}px)`;
        }
    });

    // Mouse parallax on hero
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;

        if (heroTitle) {
            heroTitle.style.transform = `translate(${xPos}px, ${yPos}px)`;
        }
    });
}

/* ========================================
   TEXT SPLIT - テキストスプリットアニメーション
   ======================================== */
function initTextSplit() {
    const heroTitle = document.querySelector('.hero-title');

    if (!heroTitle) return;

    // Get original text and split into characters
    const text = heroTitle.innerHTML;
    const lines = text.split('<br>');

    let html = '';
    lines.forEach((line, lineIndex) => {
        html += '<span class="line">';
        [...line].forEach((char, charIndex) => {
            const delay = (lineIndex * 10 + charIndex) * 0.05;
            if (char === ' ') {
                html += ' ';
            } else {
                html += `<span class="char" style="animation-delay: ${delay}s">${char}</span>`;
            }
        });
        html += '</span>';
        if (lineIndex < lines.length - 1) html += '<br>';
    });

    heroTitle.innerHTML = html;
    heroTitle.classList.add('split-animated');

    // Animate section titles on scroll
    const sectionTitles = document.querySelectorAll('.section-title, .chapter-title');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTitle(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    sectionTitles.forEach(title => {
        if (!title.classList.contains('hero-title')) {
            observer.observe(title);
        }
    });
}

function animateTitle(element) {
    const text = element.textContent;
    let html = '';

    [...text].forEach((char, index) => {
        const delay = index * 0.03;
        if (char === ' ') {
            html += ' ';
        } else {
            html += `<span class="char" style="animation-delay: ${delay}s">${char}</span>`;
        }
    });

    element.innerHTML = html;
    element.classList.add('split-animated');
}

/* ========================================
   3D CARD TILT - 3Dチルト効果
   ======================================== */
function initCardTilt() {
    const cards = document.querySelectorAll('.story-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;

            // Shine effect
            const shine = card.querySelector('.card-shine') || createShine(card);
            shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,77,141,0.3) 0%, transparent 50%)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            const shine = card.querySelector('.card-shine');
            if (shine) shine.style.background = 'transparent';
        });
    });
}

function createShine(card) {
    const shine = document.createElement('div');
    shine.className = 'card-shine';
    shine.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        border-radius: inherit;
        z-index: 1;
    `;
    card.appendChild(shine);
    return shine;
}

/* ========================================
   SCROLL ANIMATIONS - スクロールアニメーション
   ======================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.story-card, .about-text, .novel-text p');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });
}

/* ========================================
   READING PROGRESS - 読書進捗バー
   ======================================== */
function initReadingProgress() {
    const progressBar = document.querySelector('.reading-progress');

    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;

        progressBar.style.width = `${progress}%`;
    });
}

/* ========================================
   CURSOR GLOW ENHANCEMENT - カーソルグロー強化
   ======================================== */
const cursor = document.getElementById('cursor');
if (cursor) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor follow
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;

        cursorX += dx * 0.1;
        cursorY += dy * 0.1;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor scale on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .story-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

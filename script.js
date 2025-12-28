/* ========================================
   DRESSING ROOM - PV Style Animations
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initParallax();
    initTextSplit();
    initCardTilt();
    initScrollAnimations();
    initReadingProgress();
});

/* パララックス効果 */
function initParallax() {
    const heroContent = document.querySelector('.hero-content');
    const bgLines = document.querySelector('.bg-lines');

    if (!heroContent) return;

    let scrollY = 0;
    let mouseX = 0;
    let mouseY = 0;

    function updateTransform() {
        const rate = scrollY * 0.5;
        const xPos = mouseX * 20;
        const yPos = mouseY * 20;

        // Combine scroll and mouse parallax
        heroContent.style.transform = `translate(${xPos}px, ${yPos + rate * 0.2}px)`;
        heroContent.style.opacity = 1 - scrollY / 600;

        if (bgLines) {
            bgLines.style.transform = `translateY(${rate * 0.5}px)`;
        }
    }

    window.addEventListener('scroll', () => {
        scrollY = window.pageYOffset;
        updateTransform();
    });

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        updateTransform();
    });
}

/* テキストスプリット */
function initTextSplit() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.innerHTML;
    // Handle both <br> and <BR> or other variations
    const lines = text.split(/<br\s*\/?>/i);

    let html = '';
    lines.forEach((line, lineIndex) => {
        html += '<span class="line">';
        [...line].forEach((char, charIndex) => {
            // Further increased delay multiplier to 0.15s
            const delay = (lineIndex * 10 + charIndex) * 0.15;
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
}

/* 3Dカードチルト */
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
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

/* スクロールアニメーション */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.story-card, .about-text, .novel-text p');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });
}

/* 読書進捗バー */
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

/* カーソルグロー */
const cursor = document.getElementById('cursor');
if (cursor) {
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

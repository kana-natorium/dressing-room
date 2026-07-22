/* ========================================
   DRESSING ROOM - PV Style Animations
   ======================================== */

// 動きを減らすユーザー設定。JSが直接動かす演出はこのフラグで停止する
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
    initParallax();
    initTextSplit();
    initBrandLogos();
    initCardTilt();
    initScrollAnimations();
    initReadingProgress();
    initScrollIndicator();
});

/* パララックス効果 */
function initParallax() {
    const heroContent = document.querySelector('.hero-content');
    const bgLines = document.querySelector('.bg-lines');

    if (!heroContent) return;

    // 動きを減らす設定ではパララックスを無効化
    if (prefersReducedMotion) return;

    // タッチデバイス（スマホ）ではパララックス無効 - iOS scroll/URL barとの競合防止
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

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
            } else if (char === 'I') {
                html += `<span class="char hero-logo-i" style="animation-delay: ${delay}s" aria-hidden="true"><span class="hero-logo-i-stem">&#305;</span></span>`;
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

/* Header/footer logo decoration */
function initBrandLogos() {
    const logos = document.querySelectorAll('.nav-logo, .footer-logo');

    logos.forEach((logo) => {
        const text = logo.textContent.trim();
        const iIndex = text.indexOf('I');

        if (iIndex === -1) return;

        logo.setAttribute('aria-label', text);
        logo.innerHTML = `${text.slice(0, iIndex)}<span class="brand-logo-i" aria-hidden="true"><span class="brand-logo-i-stem">&#305;</span></span>${text.slice(iIndex + 1)}`;
    });
}

/* 3Dカードチルト */
function initCardTilt() {
    // 動きを減らす設定では3Dカードチルトを無効化
    if (prefersReducedMotion) return;

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
if (cursor && !prefersReducedMotion) {
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

/* スクロールインジケーター クリックでスクロール */
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const novelSection = document.querySelector('#novel');

    if (!scrollIndicator || !novelSection) return;

    scrollIndicator.addEventListener('click', () => {
        const sectionHeader = novelSection.querySelector('.section-header');
        const scrollTarget = sectionHeader || novelSection;
        const targetTop = scrollTarget.getBoundingClientRect().top + window.pageYOffset - 80;

        window.scrollTo({
            top: targetTop,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
    });
}

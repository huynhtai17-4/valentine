// ============================================
// VALENTINE LOVE PAGE - JAVASCRIPT
// ============================================

// Global functions (called from HTML)
function openLightbox(element) {
    if (!element) return;
    const img = element.querySelector('img');
    if (!img) return;

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
    }
}

function closeLightbox(event) {
    if (!event) return;
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    if (event.target.id === 'lightbox' || event.target.classList.contains('close-lightbox')) {
        lightbox.classList.remove('active');
    }
}

function createHeartAtCenter() {
    const body = document.body;
    if (!body) return;

    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.innerHTML = '💖';
    heart.style.left = '50%';
    heart.style.top = '50%';
    heart.style.zIndex = '9999';
    body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 2000);
}

function openModal() {
    const modal = document.getElementById('love-modal');
    if (modal) {
        modal.classList.add('active');
        // Spawn hearts
        for (let i = 0; i < 30; i++) {
            setTimeout(createHeartAtCenter, i * 100);
        }
    }
}

function closeModal() {
    const modal = document.getElementById('love-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// ============================================
// MAIN APP
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎉 Valentine page initializing...');

    // ========== LOADING SCREEN ==========
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 1000);
        }, 1000);
    }

    // ========== CUSTOM CURSOR ==========
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }

    // ========== MUSIC CONTROL ==========
    const musicBtn = document.getElementById('music-control');
    const audio = document.getElementById('bg-music');
    let isPlaying = false;

    // Auto-play music on load
    if (audio) {
        audio.play().catch(error => {
            console.log("Autoplay prevented by browser, will play on first user interaction");
        });
        isPlaying = true;
        if (musicBtn) musicBtn.style.animation = 'pulse 1s infinite';
    }

    // Toggle music on button click
    if (musicBtn && audio) {
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isPlaying) {
                audio.pause();
                musicBtn.style.animation = 'none';
            } else {
                audio.play().catch(error => {
                    console.log("Autoplay prevented:", error);
                });
                musicBtn.style.animation = 'pulse 1s infinite';
            }
            isPlaying = !isPlaying;
        });
    }

    // Play on first user interaction (fallback for browser autoplay policy)
    document.addEventListener('click', () => {
        if (audio && audio.paused) {
            audio.play().catch(error => {
                console.log("Still can't autoplay:", error);
            });
        }
    }, { once: true });

    // ========== SECTION NAVIGATION ==========
    const sections = Array.from(document.querySelectorAll('section'));
    let currentSection = 0;
    console.log('✅ Found sections:', sections.length);

    function showSection(idx) {
        if (idx < 0 || idx >= sections.length) return;
        console.log('📖 Showing section:', idx);
        
        sections.forEach((s, i) => {
            s.classList.toggle('visible', i === idx);
        });
        currentSection = idx;

        // Trigger hero animations on first load
        if (idx === 0) {
            setTimeout(() => {
                animateHeroFrame();
                startHeroFloatingBurst(6);
            }, 200);
        }
    }

    // Show first section
    showSection(0);

    // Navigate to next section
    function goNextSection() {
        console.log('➡️ Next section:', currentSection + 1, 'of', sections.length);
        
        const modal = document.getElementById('love-modal');
        const lightbox = document.getElementById('lightbox');
        
        if ((modal && modal.classList.contains('active')) || 
            (lightbox && lightbox.classList.contains('active'))) {
            console.log('Modal/lightbox open, skip');
            return;
        }

        if (currentSection < sections.length - 1) {
            showSection(currentSection + 1);
            sections[currentSection].scrollIntoView({ behavior: 'smooth' });
        }
    }

    window.goNextSection = goNextSection;

    // Next button handler
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('🖱️ Next button clicked');
            goNextSection();
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'ArrowRight') {
            const active = document.activeElement;
            if (!active || (active.tagName !== 'INPUT' && active.tagName !== 'TEXTAREA')) {
                e.preventDefault();
                goNextSection();
            }
        }
    });

    // ========== FLOATING HEARTS ==========
    const floatingHeartsContainer = document.getElementById('floating-hearts');
    
    function createHeart() {
        if (!floatingHeartsContainer) return;
        
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        
        floatingHeartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 8000);
    }
    
    setInterval(createHeart, 500);

    // ========== HERO FRAME ANIMATION ==========
    function animateHeroFrame() {
        const frame = document.getElementById('hero-frame');
        if (!frame) return;

        const imgs = frame.querySelectorAll('.frame-img');
        imgs.forEach((img, i) => {
            img.classList.remove('raise');
            setTimeout(() => {
                img.classList.add('raise');
            }, i * 300 + 200);
        });
    }

    // ========== HERO FLOATING IMAGES ==========
    const heroFloatSources = [
        'images/Anh.jpg',
        'images/Anh.jpg',
        'images/Anh.jpg',
        'images/Anh.jpg'
    ];
    const container = document.querySelector('.hero-float');

    heroFloatSources.forEach(src => {
        const img = document.createElement('img');
        img.src = src;

        // 👉 thêm class ở đây
        img.classList.add('frame-img');

        container.appendChild(img);
    });

    function spawnFloatingUpImage(src, delay = 0) {
        const gallery = document.getElementById('hero-floating-gallery');
        if (!gallery) return;

        setTimeout(() => {
            const img = document.createElement('img');
            img.src = src;
            img.className = 'hero-float-img';
            img.style.left = (5 + Math.random() * 90) + '%';
            img.style.bottom = '-80px';
            const size = 80 + Math.floor(Math.random() * 80);
            img.style.width = size + 'px';
            img.style.height = size + 'px';
            const duration = 5000 + Math.floor(Math.random() * 4000);
            img.style.animationDuration = duration + 'ms';

            gallery.appendChild(img);

            setTimeout(() => {
                img.remove();
            }, duration + 500);
        }, delay);
    }

    function startHeroFloatingBurst(count = 5) {
        for (let i = 0; i < count; i++) {
            const src = heroFloatSources[i % heroFloatSources.length];
            spawnFloatingUpImage(src, i * 300 + Math.random() * 400);
        }
    }

    // ========== LOVE COUNTER ==========
    const counterElement = document.getElementById('days-count');
    const startDate = new Date("2023-01-01");

    if (counterElement) {
        const now = new Date();
        const diff = now - startDate;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        counterElement.innerText = days;
    }

    console.log('✨ Page ready!');
});
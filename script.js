// ===== CONSTANTS =====
const SHOOTING_STAR_INTERVAL = 1500;
const STAR_LIFETIME = 8000;
const KONAMI_CODE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
const PIXEL_BURST_COUNT = 5;
const PIXEL_COLORS = ['#00ffff', '#ff69b4', '#ffff00', '#00ff00'];

// ===== STATE =====
let konamiSequence = [];

// ===== UTILITY FUNCTIONS =====
const random = (min, max) => Math.random() * (max - min) + min;

const createElement = (tag, className, styles = {}) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    Object.assign(element.style, styles);
    return element;
};

// ===== SHOOTING STARS =====
const createShootingStar = () => {
    const star = createElement('div', 'shooting-star', {
        left: random(-100, 0) + 'px',
        top: random(0, 50) + '%',
        animationDuration: random(2, 5) + 's',
        animationDelay: random(0, 5) + 's'
    });
    
    document.body.appendChild(star);
    
    setTimeout(() => star.remove(), STAR_LIFETIME);
};

// ===== PIXEL EFFECTS =====
const createPixelBurst = (x, y) => {
    for (let i = 0; i < PIXEL_BURST_COUNT; i++) {
        const pixel = createElement('div', '', {
            position: 'absolute',
            left: x + random(-20, 20) + 'px',
            top: y + random(-20, 20) + 'px',
            width: '4px',
            height: '4px',
            background: PIXEL_COLORS[Math.floor(Math.random() * PIXEL_COLORS.length)],
            pointerEvents: 'none',
            zIndex: '1000',
            animation: 'pixelFade 0.8s forwards'
        });
        
        document.body.appendChild(pixel);
        setTimeout(() => pixel.remove(), 800);
    }
};

// ===== PAGE TRANSITIONS =====
const triggerPageTransition = (stageName) => {
    const transition = document.querySelector('.pixel-transition');
    
    // Slide in transition
    transition.style.left = '0';
    console.log(`Loading stage: ${stageName}`);
    
    // Here you would navigate to the actual page
    setTimeout(() => {
        // Slide out transition
        transition.style.left = '100%';
        setTimeout(() => {
            transition.style.left = '-100%';
        }, 500);
    }, 500);
};

// ===== MENU INTERACTIONS =====
const initializeMenuItems = () => {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        // Click handlers
        item.addEventListener('click', function() {
            const stageName = this.dataset.stage;
            triggerPageTransition(stageName);
        });

        // Hover effects
        item.addEventListener('mouseenter', function() {
            console.log('Hover sound: beep');
            this.style.filter = 'brightness(1.1)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });
};

// ===== KONAMI CODE EASTER EGG =====
const handleKonamiCode = (keyCode) => {
    konamiSequence.push(keyCode);
    
    if (konamiSequence.length > KONAMI_CODE.length) {
        konamiSequence.shift();
    }
    
    if (konamiSequence.join(',') === KONAMI_CODE.join(',')) {
        // Easter egg activated!
        document.body.style.filter = 'hue-rotate(180deg)';
        console.log('Konami Code activated!');
        
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        
        konamiSequence = []; // Reset sequence
    }
};

// ===== SMOOTH SCROLLING =====
const initializeSmoothScrolling = () => {
    let isScrolling = false;
    
    window.addEventListener('wheel', function(e) {
        if (!isScrolling) {
            isScrolling = true;
            setTimeout(() => {
                isScrolling = false;
            }, 50);
        }
    });
};

// ===== PARALLAX EFFECTS =====
const initializeParallaxEffects = () => {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const title = document.querySelector('.main-title');
        
        if (scrolled > 100) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            title.style.opacity = Math.max(0, 1 - scrolled / 500);
        }
    });
};

// ===== EVENT LISTENERS =====
const initializeEventListeners = () => {
    // Keyboard events
    document.addEventListener('keydown', function(e) {
        handleKonamiCode(e.keyCode);
    });

    // Click effects
    document.addEventListener('click', function(e) {
        createPixelBurst(e.clientX, e.clientY);
    });
};

// ===== INITIALIZATION =====
const initializeApp = () => {
    // Start shooting star generation
    setInterval(createShootingStar, SHOOTING_STAR_INTERVAL);
    
    // Initialize all components
    initializeMenuItems();
    initializeSmoothScrolling();
    initializeParallaxEffects();
    initializeEventListeners();
    
    console.log('8-bit Portfolio initialized! 🎮');
};

// ===== START APP =====
document.addEventListener('DOMContentLoaded', initializeApp);
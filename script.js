// ==========================================
// 1. BOOT SEQUENCE & SECURE UI LOGIC
// ==========================================
window.addEventListener('load', () => {
    // Advanced Cyber Loader Logic
    const loaderText = document.querySelector('.cyber-glitch');
    const texts = ["SYSTEM MOUNTING", "DECRYPTING PROTOCOLS", "ACCESS GRANTED"];
    let i = 0;

    const textInterval = setInterval(() => {
        i++;
        if (i < texts.length) {
            loaderText.setAttribute('data-text', texts[i]);
            loaderText.innerText = texts[i];
        } else {
            clearInterval(textInterval);
            document.getElementById('loader').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('loader').style.display = 'none';
            }, 800);
        }
    }, 600); // Sequence timing
});

// Admin Password Core
function isAuthorized() {
    return btoa(prompt("[SECURITY OVERRIDE]\nEnter Admin Passcode:")) === "QVNUUkE5MTQ4";
}

// ==========================================
// 2. PARALLAX STARFIELD GENERATOR
// ==========================================
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];

function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    stars = [];
    // Create 3 layers of stars for depth
    for (let i = 0; i < 300; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5,
            vx: Math.random() * 0.2 - 0.1,  // Very slow drift
            vy: Math.random() * 0.2 - 0.1,
            depth: Math.random() * 3 // Depth 0 to 3 for parallax
        });
    }
}

// Subtly react to mouse position for parallax
let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - width / 2) * 0.05; // Smoothing factor
    mouseY = (e.clientY - height / 2) * 0.05;
});

function animateStars() {
    ctx.clearRect(0, 0, width, height);

    // Draw space background softly
    ctx.fillStyle = '#030305';
    ctx.fillRect(0, 0, width, height);

    stars.forEach(star => {
        // Base movement
        star.x += star.vx;
        star.y += star.vy;

        // Parallax offset based on depth and page scroll
        let scrollParallaxY = window.scrollY * 0.15; // Vertical scroll parallax modifier
        let px = star.x - (mouseX * star.depth);
        let py = star.y - (mouseY * star.depth) - (scrollParallaxY * star.depth);

        // Wrap around logic
        if (px < 0) star.x = width;
        if (px > width) star.x = 0;
        if (py < 0) star.y = height;
        if (py > height) star.y = 0;

        ctx.beginPath();
        ctx.arc(px, py, star.radius, 0, Math.PI * 2);

        // Randomly flicker some stars by occasionally changing color to cyan
        if (Math.random() > 0.995) {
            ctx.fillStyle = '#00F0FF';
        } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + (star.depth * 0.2)})`;
        }

        ctx.fill();
    });

    requestAnimationFrame(animateStars);
}

window.addEventListener('resize', initCanvas);
initCanvas();
animateStars();

// ==========================================
// 3. UI INTERACTIONS (NAV, SCROLL REVEALS, PARALLAX)
// ==========================================
const navbar = document.getElementById('navbar');
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

// Parallax Elements
const parallaxPlanet = document.getElementById('parallax-planet');
const heroContent = document.querySelector('.hero-content');

// Blur navbar on scroll & Parallax
window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;

    if (scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    // Parallax logic
    if (parallaxPlanet) {
        // Move planet much slower and scale it up less aggressively
        let scaleVal = 1 + (scrollY * 0.0006);
        parallaxPlanet.style.transform = `translateY(${scrollY * 0.15}px) scale(${scaleVal})`;
    }

    // Hero Text Fade and Parallax
    if (heroContent) {
        let opacityVal = 1 - (scrollY / 500); // Fade out completely by 500px scroll
        heroContent.style.opacity = Math.max(0, opacityVal);
        heroContent.style.transform = `translateY(${scrollY * 0.4}px)`; // Faster float downwards to disappear
    }
});

// Mobile menu
mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-item').forEach(l => {
    l.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Intersection Observer for Scroll Reveals
const revealElements = document.querySelectorAll('.reveal-scroll');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Depending on design, you could unobserve after revealing
            // revealObserver.unobserve(entry.target); 
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Planet Modal Logic
const satellites = document.querySelectorAll('.satellite');
const planetModal = document.getElementById('planet-modal');
const planetModalClose = document.querySelector('.planet-modal-close');
const planetTitle = document.getElementById('planet-title');
const planetDesc = document.getElementById('planet-desc');

// Content mapping for planets
const planetContent = {
    'Robotics': 'Explore our foundational architectures in kinematics, autonomous navigation, and physical world interfaces.',
    'Innovation/Ideathon': 'The birthplace of next-century solutions. Where abstract concepts undergo rapid prototyping into tangible prototypes.',
    'AI/ML': 'Training advanced neural computing models for predictive analytics, computer vision, and cognitive processing capabilities.'
};

satellites.forEach(sat => {
    sat.addEventListener('click', (e) => {
        // Prevent map hover logic from interfering if necessary
        const category = sat.getAttribute('data-category');
        planetTitle.innerText = category.toUpperCase();
        planetDesc.innerText = planetContent[category] || 'Relevant orbital information dynamicaly loaded here.';
        planetModal.classList.add('show');
    });
});

if (planetModalClose) {
    planetModalClose.addEventListener('click', () => {
        planetModal.classList.remove('show');
    });
}

// Close when clicking outside box
window.addEventListener('click', (e) => {
    if (e.target === planetModal) {
        planetModal.classList.remove('show');
    }
});

// ==========================================
// 4. DATA NEXUS (LOCALSTORAGE MANAGERS)
// ==========================================

// --- ACHIEVEMENTS ---
const achievementsContainer = document.getElementById('achievements-container');
const btnUploadAch = document.getElementById('btn-upload-ach');
const injectModal = document.getElementById('inject-modal');
const injectForm = document.getElementById('inject-form');
const closeInject = document.querySelector('.close-modal');

let achievements = JSON.parse(localStorage.getItem('astra_logs')) || [];

function renderAchievements() {
    achievementsContainer.innerHTML = '';
    if (achievements.length === 0) {
        achievementsContainer.innerHTML = '<div class="empty-state">NO LOGS DETECTED.</div>';
        return;
    }

    // Most recent first
    achievements.sort((a, b) => new Date(b.date) - new Date(a.date));

    achievements.forEach(ach => {
        const item = document.createElement('div');
        item.className = 'ach-item';

        // Format date minimally
        const d = new Date(ach.date).toISOString().split('T')[0];

        item.innerHTML = `
            <div class="ach-date">[TIME_MARK: ${d}]</div>
            <h4 class="font-orbitron ach-title">${ach.title}</h4>
            <p class="text-xs text-muted">${ach.desc}</p>
            <button class="delete-btn-x" data-id="${ach.id}" title="Purge Record"><i class="fas fa-trash-alt"></i></button>
        `;
        achievementsContainer.appendChild(item);
    });

    // Bind delete logic
    document.querySelectorAll('.ach-item .delete-btn-x').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (isAuthorized()) {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                achievements = achievements.filter(a => a.id !== id);
                localStorage.setItem('astra_logs', JSON.stringify(achievements));
                renderAchievements();
            }
        });
    });
}

btnUploadAch.addEventListener('click', () => {
    if (isAuthorized()) injectModal.classList.add('show');
});

closeInject.addEventListener('click', () => injectModal.classList.remove('show'));

injectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('log-title').value;
    const date = document.getElementById('log-date').value;
    const desc = document.getElementById('log-desc').value;

    achievements.push({ id: Date.now(), title, date, desc });
    localStorage.setItem('astra_logs', JSON.stringify(achievements));

    injectForm.reset();
    injectModal.classList.remove('show');
    renderAchievements();
});

// --- GALLERY LOGIC ---
const galleryContainer = document.getElementById('gallery-container');
const btnUploadImg = document.getElementById('btn-upload-img');
const mediaInput = document.getElementById('media-input');

let visuals = JSON.parse(localStorage.getItem('astra_visuals')) || [];

function renderGallery() {
    galleryContainer.innerHTML = '';
    if (visuals.length === 0) {
        galleryContainer.innerHTML = '<div class="empty-state" style="grid-column: 1 / -1;">NO VISUALS RECORDED.</div>';
        return;
    }

    visuals.forEach(v => {
        const item = document.createElement('div');
        item.className = 'gal-item';
        item.innerHTML = `
            <img src="${v.img}" alt="Astra Visual">
            <button class="delete-btn-x" data-id="${v.id}" style="background: rgba(0,0,0,0.5); border-radius:4px; padding:4px;"><i class="fas fa-times"></i></button>
        `;
        galleryContainer.appendChild(item);
    });

    document.querySelectorAll('.gal-item .delete-btn-x').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (isAuthorized()) {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                visuals = visuals.filter(vis => vis.id !== id);
                localStorage.setItem('astra_visuals', JSON.stringify(visuals));
                renderGallery();
            }
        });
    });
}

btnUploadImg.addEventListener('click', () => {
    if (isAuthorized()) mediaInput.click();
});

mediaInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                visuals.push({ id: Date.now(), img: e.target.result });
                localStorage.setItem('astra_visuals', JSON.stringify(visuals));
                renderGallery();
            } catch (err) {
                alert("MATRIX STORAGE FULL. LocalStorage API limit reached.");
                console.error(err);
            }
        }
        reader.readAsDataURL(file);
    }
});

// Initial Render Calls
renderAchievements();
renderGallery();

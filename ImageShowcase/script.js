const images = [
    'public/images/WhatsApp Image 2026-02-24 at 8.53.10 PM (1).jpeg',
    'public/images/WhatsApp Image 2026-02-24 at 8.53.10 PM.jpeg',
    'public/images/WhatsApp Image 2026-02-24 at 8.53.11 PM (1).jpeg',
    'public/images/WhatsApp Image 2026-02-24 at 8.53.11 PM.jpeg',
    'public/images/WhatsApp Image 2026-02-24 at 8.53.12 PM (1).jpeg',
    'public/images/WhatsApp Image 2026-02-24 at 8.53.12 PM.jpeg',
    'public/images/WhatsApp Image 2026-02-24 at 8.53.13 PM (1).jpeg',
    'public/images/WhatsApp Image 2026-02-24 at 8.53.13 PM.jpeg'
];

let currentIndex = 0;
const SLIDE_DURATION = 5000;
let slideInterval;
let startTime;
let remainingTime = SLIDE_DURATION;

const slideshow = document.getElementById('slideshow');
const thumbnailStrip = document.getElementById('thumbnailStrip');
const progressBar = document.getElementById('progressBar');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

function init() {
    slideshow.innerHTML = '';

    images.forEach((src, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Slide ${index + 1}`;
        slide.appendChild(img);
        slideshow.appendChild(slide);

        // Create thumbnail
        const thumb = document.createElement('div');
        thumb.className = `thumb ${index === 0 ? 'active' : ''}`;
        const thumbImg = document.createElement('img');
        thumbImg.src = src;
        thumb.appendChild(thumbImg);
        thumb.addEventListener('click', () => goToSlide(index));
        thumbnailStrip.appendChild(thumb);
    });

    startAutoPlay();
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const thumbs = document.querySelectorAll('.thumb');

    slides[currentIndex].classList.remove('active');
    thumbs[currentIndex].classList.remove('active');

    currentIndex = (index + images.length) % images.length;

    slides[currentIndex].classList.add('active');
    thumbs[currentIndex].classList.add('active');

    resetAutoPlay();
}

function nextSlide() {
    goToSlide(currentIndex + 1);
}

function prevSlide() {
    goToSlide(currentIndex - 1);
}

function startAutoPlay() {
    startTime = Date.now();
    updateProgressBar();
    slideInterval = setInterval(() => {
        nextSlide();
    }, SLIDE_DURATION);
}

function resetAutoPlay() {
    clearInterval(slideInterval);
    progressBar.style.width = '0%';
    startAutoPlay();
}

function updateProgressBar() {
    const step = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
        progressBar.style.width = `${progress}%`;

        if (progress < 100) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

init();

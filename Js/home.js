const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev_btn');
const nextBtn = document.querySelector('.next_btn');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        resetAutoSlide();
    });
});

startAutoSlide();

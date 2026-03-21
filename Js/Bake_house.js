const track = document.querySelector('.carousel_track');
const cards = Array.from(document.querySelectorAll('.carousel_card'));
const nextBtn = document.querySelector('.next_btn');
const prevBtn = document.querySelector('.prev_btn');
const dots = document.querySelectorAll('.dot');

const size = 100;

// โคลนรูปภาพแรกและรูปภาพสุดท้าย เพื่อทำสไลด์แบบวนลูป (Infinite loop)
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

track.appendChild(firstClone);
track.insertBefore(lastClone, cards[0]);

const currentCards = document.querySelectorAll('.carousel_card');
let counter = 1; // เริ่มต้นที่ภาพแรกจริงๆ (หลบภาพโคลนก่อนหน้า)
let isTransitioning = false;

// ตั้งค่าตำแหน่งเริ่มต้นให้ข้ามโคลนไป
track.style.transition = 'none';
track.style.transform = `translateX(${ -size * counter }%)`;

function updateCarousel() {
    track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
    track.style.transform = `translateX(${ -size * counter }%)`;
    
    // อัพเดทจุดไข่ปลาด้านล่าง
    let dotIndex = counter - 1;
    if (dotIndex < 0) dotIndex = cards.length - 1;
    if (dotIndex >= cards.length) dotIndex = 0;

    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[dotIndex]) dots[dotIndex].classList.add('active');
}

nextBtn.addEventListener('click', () => {
    if (isTransitioning) return;
    if (counter >= currentCards.length - 1) return;
    isTransitioning = true;
    counter++;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    if (isTransitioning) return;
    if (counter <= 0) return;
    isTransitioning = true;
    counter--;
    updateCarousel();
});

// เมื่อภาพเลื่อนเสร็จ เช็คว่าเป็นภาพโคลนหรือไม่ ถ้าใช่ให้กระโดดกลับไปภาพจริงทันที (แบบไม่ Transition)
track.addEventListener('transitionend', () => {
    isTransitioning = false;

    if (currentCards[counter].id === 'first-clone') {
        track.style.transition = 'none';
        counter = 1;
        track.style.transform = `translateX(${ -size * counter }%)`;
    }

    if (currentCards[counter].id === 'last-clone') {
        track.style.transition = 'none';
        counter = currentCards.length - 2;
        track.style.transform = `translateX(${ -size * counter }%)`;
    }
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (isTransitioning) return;
        counter = index + 1;
        updateCarousel();
    });
});

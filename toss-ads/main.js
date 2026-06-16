// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('visible', entry.isIntersecting);
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Carousel
const track = document.getElementById('carouselTrack');
const slides = track ? track.querySelectorAll('.carousel-slide') : [];
let activeIndex = 1;

function updateCarousel(index) {
  if (!track) return;
  activeIndex = index;

  // 트랜지션 잠깐 끄고 active 클래스 변경 후 DOM 반영 기다렸다가 위치 계산
  track.style.transition = 'none';
  slides.forEach((s, i) => s.classList.toggle('active-slide', i === index));

  requestAnimationFrame(() => {
    track.style.transition = 'transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)';
    const wrapperW = track.parentElement.offsetWidth;
    const activeSlide = slides[index];
    const slideLeft = activeSlide.offsetLeft;
    const slideW = activeSlide.offsetWidth;
    const offset = wrapperW / 2 - slideLeft - slideW / 2;
    track.style.transform = `translateX(${offset}px)`;
  });
}

// 자동 슬라이드 (5초)
let autoTimer = null;

function startAuto() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => {
    const next = (activeIndex + 1) % slides.length;
    goTo(next);
  }, 10000);
}

function goTo(index) {
  document.querySelectorAll('.tab-btn').forEach((b, i) => b.classList.toggle('active', i === index));
  updateCarousel(index);
  startAuto();
}

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    goTo(parseInt(btn.dataset.tab));
  });
});

window.addEventListener('load', () => {
  requestAnimationFrame(() => requestAnimationFrame(() => {
    updateCarousel(1);
    startAuto();
  }));
});
window.addEventListener('resize', () => updateCarousel(activeIndex));

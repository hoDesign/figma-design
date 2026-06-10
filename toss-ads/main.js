// Lenis smooth scroll (쫀득한 버티컬 스크롤)
const lenis = new Lenis({
  duration: 1.4,        // 딜레이 길이 (높을수록 더 느리고 쫀득)
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo 감속
  orientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 0.85,  // 스크롤 감도 (낮을수록 더 쫀득)
  touchMultiplier: 1.2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Side nav scroll indicator — Lenis scroll 이벤트로 연결
const sideNavDots = document.querySelectorAll('.side-nav-dot');
const subInfo = document.querySelector('.sub-info');

if (subInfo && sideNavDots.length) {
  lenis.on('scroll', () => {
    const rect = subInfo.getBoundingClientRect();
    const mid = window.innerHeight / 2;
    if (rect.top < mid && rect.bottom > mid) {
      const progress = (mid - rect.top) / rect.height;
      sideNavDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === (progress < 0.5 ? 0 : 1));
      });
    }
  });
}

// Floating popup 스크롤 후 표시
const floatingPopup = document.getElementById('floatingPopup');
if (floatingPopup) {
  floatingPopup.style.opacity = '0';
  floatingPopup.style.transition = 'opacity 0.3s, transform 0.3s';
  lenis.on('scroll', ({ scroll }) => {
    const show = scroll > 80;
    floatingPopup.style.opacity = show ? '1' : '0';
    floatingPopup.style.pointerEvents = show ? 'auto' : 'none';
  });
}

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('visible', entry.isIntersecting);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── CTA SCROLL TO TOP ──
const ctaScrollTop = document.getElementById('ctaScrollTop');
if (ctaScrollTop) {
  ctaScrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── POPUP TOGGLE ──
function togglePopup(type) {
  const btnRefer = document.getElementById('btnRefer');
  const btnQna   = document.getElementById('btnQna');
  const popRefer = document.getElementById('popRefer');
  const popQna   = document.getElementById('popQna');

  if (type === 'refer') {
    btnRefer.classList.add('active');
    btnQna.classList.remove('active');
    popRefer.classList.remove('hidden');
    popQna.classList.add('hidden');
  } else {
    btnQna.classList.add('active');
    btnRefer.classList.remove('active');
    popQna.classList.remove('hidden');
    popRefer.classList.add('hidden');
  }
}

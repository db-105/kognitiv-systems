const body = document.body;
body.classList.add('locked');

window.addEventListener('load', () => {
  const boot = document.getElementById('boot');
  setTimeout(() => {
    boot?.classList.add('hidden');
    body.classList.remove('locked');
  }, 1450);
});

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

const reveals = document.querySelectorAll('.reveal');
reveals.forEach(el => {
  const delay = Number(el.dataset.delay || 0);
  el.style.setProperty('--delay', `${delay}ms`);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.13, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => revealObserver.observe(el));

const glow = document.getElementById('cursorGlow');
window.addEventListener('pointermove', (e) => {
  if (!glow) return;
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
}, { passive: true });

const stage = document.getElementById('markStage');
if (stage && window.matchMedia('(pointer:fine)').matches) {
  stage.addEventListener('pointermove', (e) => {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    stage.style.transform = `rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`;
  });
  stage.addEventListener('pointerleave', () => {
    stage.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}

if (window.matchMedia('(pointer:fine)').matches) {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(1000px) rotateX(${(-y * 2.2).toFixed(2)}deg) rotateY(${(x * 2.5).toFixed(2)}deg) translateY(-1px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

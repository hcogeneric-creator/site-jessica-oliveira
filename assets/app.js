/* Comportamentos compartilhados: animação ao rolar, efeito 3D nos cards, órbita do topo */

(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch = window.matchMedia('(hover: none)').matches;

  // Revela elementos ao rolar
  const io = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        ent.target.classList.add('in');
        io.unobserve(ent.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  function initReveal() {
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
    document.querySelectorAll('[data-reveal-stagger]').forEach(parent => {
      parent.querySelectorAll('[data-reveal]').forEach((el, i) => el.style.transitionDelay = (i * 80) + 'ms');
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initReveal);
  else initReveal();

  if (reduce || touch) return;

  // Inclinação 3D dos cards
  document.addEventListener('pointermove', (e) => {
    const el = e.target.closest('.tilt');
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const max = 6;
    el.style.transform = `perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) translateZ(0)`;
  });
  document.addEventListener('pointerout', (e) => {
    const el = e.target.closest?.('.tilt');
    if (el && !el.contains(e.relatedTarget)) el.style.transform = '';
  });

  // Órbita do topo gira levemente com a rolagem
  window.addEventListener('scroll', () => {
    const st = document.querySelector('.orb-stage');
    if (!st) return;
    const y = window.scrollY;
    st.style.transform = `rotateX(${Math.min(y / 40, 8)}deg) rotateY(${Math.max(-y / 50, -6)}deg)`;
  }, { passive: true });
})();

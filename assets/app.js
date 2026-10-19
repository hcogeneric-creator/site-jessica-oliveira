/* Comportamentos compartilhados: animação ao rolar, contadores, efeito 3D nos cards, órbita do topo */

(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch = window.matchMedia('(hover: none)').matches;

  // Contador: anima o primeiro número do texto (funciona em PT e EN: "+450", "7 anos", "96%")
  function countUp(el) {
    const txt = el.textContent;
    const m = txt.match(/\d+/);
    if (!m) return;
    const end = parseInt(m[0]);
    const t0 = performance.now(), dur = 1500;
    const step = (t) => {
      const k = Math.min((t - t0) / dur, 1);
      const v = Math.round(end * (1 - Math.pow(1 - k, 3)));
      el.textContent = txt.replace(m[0], v);
      if (k < 1) requestAnimationFrame(step); else el.textContent = txt;
    };
    requestAnimationFrame(step);
  }

  // Revela elementos ao rolar
  const io = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (!ent.isIntersecting) return;
      ent.target.classList.add('in');
      ent.target.querySelectorAll('[data-countup]').forEach(countUp);
      io.unobserve(ent.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  function init() {
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
    document.querySelectorAll('[data-reveal-stagger]').forEach(parent => {
      parent.querySelectorAll('[data-reveal]').forEach((el, i) => el.style.transitionDelay = (i * 80) + 'ms');
    });
  }
  // espera o i18n aplicar os textos antes de observar (contadores leem o texto final)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(init, 0));
  else setTimeout(init, 0);

  // Bolhas do topo seguem o mouse
  if (!touch) {
    window.addEventListener('pointermove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5).toFixed(3);
      const y = (e.clientY / window.innerHeight - 0.5).toFixed(3);
      document.documentElement.style.setProperty('--mx', x);
      document.documentElement.style.setProperty('--my', y);
    }, { passive: true });
  }

  // Inclinação 3D dos cards (só com mouse)
  if (!touch) {
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
  }

  // Órbita do topo gira levemente com a rolagem (desligado se o sistema pede menos movimento)
  if (!reduce) {
    window.addEventListener('scroll', () => {
      const st = document.querySelector('.orb-stage');
      if (!st) return;
      const y = window.scrollY;
      st.style.transform = `rotateX(${Math.min(y / 40, 8)}deg) rotateY(${Math.max(-y / 50, -6)}deg)`;
    }, { passive: true });
  }
})();

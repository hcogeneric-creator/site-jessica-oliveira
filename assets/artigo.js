/* Efeitos dos artigos: progresso de leitura, contadores, gráficos, cartões e calculadoras */
(function () {
  const reduce = false; // anima sempre (escolha do usuário em 19/10/2026)
  const fmt = (v, d) => v.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });

  // Barra de progresso
  const bar = document.createElement('div');
  bar.className = 'read-progress';
  document.body.appendChild(bar);
  const art = document.querySelector('article') || document.body;
  const onScroll = () => {
    const r = art.getBoundingClientRect();
    const total = r.height - window.innerHeight;
    const p = total > 0 ? Math.min(Math.max(-r.top / total, 0), 1) : 0;
    bar.style.transform = `scaleX(${p})`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Contadores
  function count(el) {
    const end = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.decimals || '0');
    const pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    if (reduce) { el.textContent = pre + fmt(end, dec) + suf; return; }
    const t0 = performance.now(), dur = 1600;
    const step = (t) => {
      const k = Math.min((t - t0) / dur, 1);
      const e = 1 - Math.pow(1 - k, 3);
      el.textContent = pre + fmt(end * e, dec) + suf;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      if (el.dataset.count) count(el);
      else el.classList.add('in');
      io.unobserve(el);
    });
  }, { threshold: 0.35 });
  document.querySelectorAll('[data-count], .chart').forEach(el => io.observe(el));

  // Cartões de mito × fato
  document.querySelectorAll('.flip').forEach(card => {
    card.setAttribute('aria-pressed', 'false');
    card.addEventListener('click', () => {
      const on = card.classList.toggle('flipped');
      card.setAttribute('aria-pressed', on);
    });
  });

  // Calculadoras
  document.querySelectorAll('[data-calc]').forEach(box => {
    const range = box.querySelector('input[type=range]');
    const kgOut = box.querySelector('[data-kg]');
    const type = box.dataset.calc;
    const set = (sel, v) => { const el = box.querySelector(sel); if (el) el.textContent = v; };
    const update = () => {
      const kg = parseInt(range.value);
      kgOut.textContent = kg + ' kg';
      if (type === 'creatina') {
        const g = Math.round(kg * 0.1 * 2) / 2; // 0,1 g/kg, arredondado a 0,5 g
        set('[data-out=dose]', fmt(g, g % 1 ? 1 : 0) + ' g');
        set('[data-out=colher]', g <= 3.5 ? '≈ 1 colher de chá rasa' : g <= 5.5 ? '≈ 1 colher de chá' : '≈ 1 e ½ colher de chá');
      } else if (type === 'proteina') {
        set('[data-out=min]', Math.round(kg * 1.6) + ' g');
        set('[data-out=max]', Math.round(kg * 2.2) + ' g');
        set('[data-out=refeicao]', Math.round(kg * 0.4) + ' g');
      }
    };
    range.addEventListener('input', update);
    update();
  });

  // Capa com leve efeito 3D seguindo o mouse
  const hero = document.querySelector('.art-hero .frame');
  if (hero && !reduce && window.matchMedia('(hover: hover)').matches) {
    hero.parentElement.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      hero.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });
    hero.parentElement.addEventListener('pointerleave', () => hero.style.transform = '');
  }
})();

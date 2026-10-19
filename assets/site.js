/* ============================================================
   CONFIGURAÇÃO DO SITE — edite aqui contatos, preços e horários.
   Tudo que aparece em várias páginas (menu, rodapé, WhatsApp,
   preços) sai deste arquivo.
   ============================================================ */
window.SITE = {
  nome: 'Jessica Oliveira',
  crn: 'CRN-8 00000',                     // A CONFIRMAR: número real do CRN
  cidade: 'Maringá · PR',
  email: 'contato@jessicaoliveiranutri.com.br', // A CONFIRMAR
  instagram: 'jessicaoliveira.nut',        // A CONFIRMAR: só o @, sem "@"
  whatsapp: '5544999999999',               // A CONFIRMAR: 55 + DDD + número, só dígitos
  whatsappLabel: '(44) 99999-9999',        // A CONFIRMAR: como aparece escrito

  // Preços da página Agendar (em reais)
  servicos: {
    inicial: { preco: 300,  duracao: '90 min' },
    retorno: { preco: 150,  duracao: '50 min' },
    plano:   { preco: 1200, duracao: '6 meses' }
  },

  // Agenda mostrada no calendário (a confirmação final é pelo WhatsApp)
  diasAtendimento: [1, 2, 3, 4, 5],        // 0=dom 1=seg ... 6=sáb
  horarios: {
    manha: ['08:00', '09:00', '10:00', '11:00'],
    tarde: ['14:00', '15:00', '16:00', '17:00', '18:00']
  }
};

/* ============================================================
   Daqui pra baixo: monta menu, rodapé e links de WhatsApp.
   Normalmente não precisa mexer.
   ============================================================ */
(function () {
  const S = window.SITE;
  const page = document.body.dataset.page || '';
  const fmtPreco = (v) => v.toLocaleString('pt-BR');
  S.waLink = (msg) => 'https://wa.me/' + S.whatsapp + (msg ? '?text=' + encodeURIComponent(msg) : '');

  const links = [
    ['index.html', 'nav.home', 'Início', 'home'],
    ['sobre.html', 'nav.about', 'Sobre', 'sobre'],
    ['blog.html', 'nav.blog', 'Artigos', 'blog'],
    ['agendamento.html', 'nav.booking', 'Agendar', 'agendar'],
    ['produtos.html', 'nav.shop', 'Recomendações', 'produtos']
  ];

  const brand = `
    <a href="index.html" class="brand">
      <span class="brand-mark">J<img src="assets/jessica.jpeg" alt="" onerror="this.remove()"></span>
      <span class="brand-meta">
        <span>${S.nome}</span>
        <small><span data-i18n="meta.prof">Nutricionista</span> · ${S.cidade}</small>
      </span>
    </a>`;

  const nav = document.getElementById('site-nav');
  if (nav) {
    nav.outerHTML = `
    <nav class="nav" id="nav">
      <div class="nav-inner">
        ${brand}
        <div class="nav-links">
          ${links.map(([href, key, label, id]) =>
            `<a href="${href}" class="nav-link${id === page ? ' active' : ''}" data-i18n="${key}">${label}</a>`).join('')}
        </div>
        <div class="nav-actions">
          <div class="lang-toggle">
            <button data-lang="pt" class="active">PT</button>
            <button data-lang="en">EN</button>
          </div>
          ${page === 'agendar' ? '' : `
          <a href="agendamento.html" class="btn btn-primary btn-sm nav-cta">
            <span data-i18n="nav.cta">Marcar consulta</span><span class="arrow">→</span>
          </a>`}
          <button class="nav-toggle" aria-label="Menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>`;
    const navEl = document.getElementById('nav');
    const tog = navEl.querySelector('.nav-toggle');
    tog.addEventListener('click', () => {
      const open = navEl.classList.toggle('open');
      tog.setAttribute('aria-expanded', open);
    });
  }

  const foot = document.getElementById('site-footer');
  if (foot) {
    foot.outerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-cols">
          <div>
            <div class="brand" style="margin-bottom:var(--s-3)">
              <span class="brand-mark">J<img src="assets/jessica.jpeg" alt="" onerror="this.remove()"></span>
              <span class="brand-meta">
                <span>${S.nome}</span>
                <small><span data-i18n="meta.prof">Nutricionista</span> · ${S.crn}</small>
              </span>
            </div>
            <p style="font-size:14px;max-width:28ch" data-i18n="ft.tag">Nutrição clínica, baseada em evidência.</p>
          </div>
          <div>
            <div class="eyebrow mb-4" data-i18n="ft.col1">Navegação</div>
            <div class="footer-list">
              ${links.filter(l => l[3] !== 'agendar').map(([href, key, label]) =>
                `<a href="${href}" data-i18n="${key}">${label}</a>`).join('')}
            </div>
          </div>
          <div>
            <div class="eyebrow mb-4" data-i18n="ft.col2">Atendimento</div>
            <div class="footer-list">
              <a href="agendamento.html" data-i18n="ft.online">Consultas online</a>
              <a href="agendamento.html" data-i18n="ft.presencial">Consulta presencial — Maringá</a>
            </div>
          </div>
          <div>
            <div class="eyebrow mb-4" data-i18n="ft.col3">Contato</div>
            <div class="footer-list">
              <a href="mailto:${S.email}">${S.email}</a>
              <a href="https://instagram.com/${S.instagram}" target="_blank" rel="noopener">@${S.instagram}</a>
              <a href="${S.waLink()}" target="_blank" rel="noopener">${S.whatsappLabel}</a>
            </div>
          </div>
        </div>
        <hr>
        <div class="flex-between" style="flex-wrap:wrap;gap:var(--s-3);font-size:12px">
          <span>© ${new Date().getFullYear()} ${S.nome} · ${S.crn} · <span data-i18n="ft.rights">Todos os direitos reservados.</span></span>
          <a href="privacidade.html" data-i18n="ft.policy">Política de privacidade</a>
        </div>
      </div>
    </footer>
    ${page === 'agendar' ? '' : `
    <a class="wa-float" href="${S.waLink('Olá Jessica! Vim pelo site e gostaria de mais informações.')}" target="_blank" rel="noopener" aria-label="WhatsApp">
      <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor"><path d="M16 3.2C8.9 3.2 3.2 8.9 3.2 16c0 2.3.6 4.5 1.7 6.4L3.2 28.8l6.6-1.7c1.9 1 4 1.6 6.2 1.6 7.1 0 12.8-5.7 12.8-12.8S23.1 3.2 16 3.2zm0 23.4c-2 0-3.9-.5-5.6-1.5l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6zm5.8-8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-.9-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.1 3.1 1.3 3.3c.2.2 2.2 3.4 5.4 4.8.8.3 1.4.5 1.8.7.8.2 1.5.2 2 .1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4z"/></svg>
    </a>`}`;
  }

  // Links de WhatsApp em qualquer página: <a data-wa="mensagem">
  document.querySelectorAll('[data-wa]').forEach(a => {
    a.href = S.waLink(a.dataset.wa);
    a.target = '_blank';
    a.rel = 'noopener';
  });

  // Preços: <span data-price-of="inicial"></span>
  document.querySelectorAll('[data-price-of]').forEach(el => {
    const s = S.servicos[el.dataset.priceOf];
    if (s) el.textContent = fmtPreco(s.preco);
  });

  // CRN em textos soltos: <span data-crn></span>
  document.querySelectorAll('[data-crn]').forEach(el => el.textContent = S.crn);
})();

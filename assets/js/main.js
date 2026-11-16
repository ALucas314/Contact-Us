/* =========================================================
   Portfólio — interações
   ---------------------------------------------------------
   Este arquivo dá vida ao site. Ele:
     1. Preenche a página com os dados do config.js (nome, links, WhatsApp, e-mail)
     2. Monta os cards de projetos
     3. Cuida do menu (rolagem, menu do celular, seção ativa, botão flutuante)
     4. Faz as animações de entrada e o brilho dos cards
     5. Anima o "pipeline" do topo (ideia → deploy)
     6. Desenha e protege a foto da seção "Sobre"

   Tudo fica dentro de uma função que se executa sozinha (IIFE),
   para não criar variáveis globais que possam conflitar com outros scripts.
   ========================================================= */
(() => {
  // ---------------------------------------------------------
  // Atalhos e utilidades usados no arquivo inteiro
  // ---------------------------------------------------------

  // Dados pessoais definidos em assets/js/config.js (se não existir, usa um objeto vazio)
  const C = window.PORTFOLIO || {};

  // $  → primeiro elemento que combina com o seletor CSS (igual ao querySelector)
  // $$ → todos os elementos que combinam, já como array (permite usar .forEach, .map...)
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // true quando a pessoa ativou "reduzir movimento" no sistema (acessibilidade):
  // nesse caso as animações são desligadas e tudo aparece direto
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Protege textos antes de inseri-los no HTML: troca < > & " ' por códigos seguros.
  // Evita que um texto do config.js "quebre" a página ou injete código.
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // =========================================================
  // 1. DADOS DO CONFIG.JS NA PÁGINA
  // =========================================================

  // Todo elemento com data-bind="campo" recebe o valor de config.js.
  // Ex.: <strong data-bind="name"> vira o seu nome; data-bind="role" vira o seu título.
  $$("[data-bind]").forEach((el) => {
    const v = C[el.dataset.bind];
    if (v) el.textContent = v; // se o campo estiver vazio, mantém o texto que já está no HTML
  });

  // Ano atual no rodapé (© 2026...), atualiza sozinho todo ano
  $("#year").textContent = new Date().getFullYear();

  // ----- WhatsApp -----
  // Formato oficial do link: https://wa.me/55DDDNUMERO?text=mensagem
  const phone = String(C.whatsapp || "").replace(/\D/g, ""); // deixa só os dígitos (tira +, espaços, traços)
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(C.whatsappMessage || "")}`; // encodeURIComponent: transforma acentos e espaços em formato de link
  // Todos os botões marcados com data-whatsapp (topo, hero, contato, flutuante) abrem esse link numa nova aba
  $$("[data-whatsapp]").forEach((a) => {
    a.href = waUrl;
    a.target = "_blank";
    a.rel = "noopener"; // segurança: a aba nova não consegue controlar esta página
  });
  // Aviso no console (F12) se o número ainda for o de exemplo
  if (!phone || /^55?0+$/.test(phone)) {
    console.warn("[portfólio] Configure seu número de WhatsApp em assets/js/config.js");
  }

  // ----- LinkedIn, GitHub e e-mail -----
  const links = {
    linkedin: C.linkedin,
    github: C.github,
    // O e-mail abre a tela "Escrever" do Gmail já com destinatário (to), assunto (su) e mensagem (body)
    email: C.email
      ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(C.email)}` +
        `&su=${encodeURIComponent(C.emailSubject || "")}&body=${encodeURIComponent(C.emailMessage || "")}`
      : "",
  };
  // Cada botão tem data-link="linkedin" | "github" | "email"
  $$("[data-link]").forEach((a) => {
    const url = links[a.dataset.link];
    if (!url) return a.closest("li")?.remove(); // sem link no config → o botão é removido da página
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
  });

  // =========================================================
  // 2. PROJETOS
  // =========================================================

  // Gera o HTML de um ícone a partir dos <symbol> definidos no final do index.html
  const icon = (id) => `<svg class="ico"><use href="#${id}" /></svg>`;

  const projectsEl = $("#projects"); // área vazia no HTML onde os cards serão colocados
  if (projectsEl) {
    // Um card para cada projeto do config.js.
    // Todo texto passa pelo esc() antes de entrar no HTML.
    const cards = (C.projects || []).map((p) => `
      <article class="card project reveal">
        <a class="project-media" href="${esc(p.demo || p.code || "#")}" target="_blank" rel="noopener" aria-label="Abrir ${esc(p.name)}">
          <img src="${esc(p.image)}" alt="Tela do projeto ${esc(p.name)}" loading="lazy" width="1366" height="854" />
        </a>
        <div class="project-body">
          <span class="project-tag">${esc(p.tag)}</span>
          <h3>${esc(p.name)}</h3>
          <p>${esc(p.description)}</p>
          <ul class="features">${(p.features || []).map((f) => `<li>${icon("i-check")}<span>${esc(f)}</span></li>`).join("")}</ul>
          <ul class="tech" aria-label="Tecnologias">${(p.tech || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
          <div class="project-links">
            ${p.demo ? `<a class="btn btn-sm btn-primary" href="${esc(p.demo)}" target="_blank" rel="noopener">Ver ao vivo ${icon("i-external")}</a>` : ""}
            ${p.code ? `<a class="btn btn-sm btn-ghost" href="${esc(p.code)}" target="_blank" rel="noopener">${icon("i-github")} Código</a>` : ""}
          </div>
        </div>
      </article>`);
    // (loading="lazy": a imagem só é baixada quando chega perto da tela, deixando o site mais rápido)
    // (os botões "Ver ao vivo" e "Código" só aparecem se o projeto tiver esses links)

    // Card final, sempre por último: convida o visitante a chamar no WhatsApp
    cards.push(`
      <article class="card project-cta reveal">
        <div>
          <h3>O próximo projeto pode ser o seu.</h3>
          <p>Me conte sua ideia e eu te mostro como ela pode sair do papel.</p>
        </div>
        <a class="btn btn-primary" href="${waUrl}" target="_blank" rel="noopener">Começar uma conversa ${icon("i-arrow")}</a>
      </article>`);

    projectsEl.innerHTML = cards.join(""); // coloca todos os cards na página de uma vez
  }

  // =========================================================
  // 3. NAVEGAÇÃO
  // =========================================================
  const nav = $("#nav");           // barra do topo
  const toggle = $("#navToggle");  // botão "hambúrguer" (só aparece no celular)
  const menu = $("#navLinks");     // lista de links do menu

  // Ao rolar a página, a barra do topo ganha fundo escuro desfocado (classe "scrolled")
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 10);
  onScroll(); // aplica já ao carregar (caso a página abra no meio, ex.: link com #projetos)
  window.addEventListener("scroll", onScroll, { passive: true }); // passive: avisa o navegador que não vamos travar a rolagem

  // ----- Menu do celular -----
  const closeMenu = () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false"); // aria-*: informa leitores de tela se o menu está aberto
    toggle.setAttribute("aria-label", "Abrir menu");
  };
  // Clique no hambúrguer abre/fecha o menu
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });
  // Clicar num link ou apertar Esc fecha o menu
  $$("a", menu).forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeMenu());

  // ----- Destaca no menu a seção que está na tela -----
  // IntersectionObserver avisa quando um elemento entra/sai da área visível, sem precisar calcular na rolagem.
  // rootMargin "-45% 0px -50% 0px": considera "visível" a seção que passa pela faixa do meio da tela.
  const sections = $$("main section[id]");
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        $$("a", menu).forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${en.target.id}`));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  sections.forEach((s) => spy.observe(s));

  // ----- Botão flutuante do WhatsApp -----
  // Fica escondido enquanto o topo (hero) está na tela, que já tem botões de WhatsApp,
  // e aparece quando a pessoa rola para baixo.
  const waFloat = $(".wa-float");
  const hero = $(".hero");
  new IntersectionObserver(([en]) => waFloat.classList.toggle("show", !en.isIntersecting), { threshold: 0.15 }).observe(hero);

  // =========================================================
  // 4. ANIMAÇÕES DE ENTRADA E BRILHO DOS CARDS
  // =========================================================

  // Elementos com a classe "reveal" começam invisíveis (ver styles.css) e
  // aparecem deslizando quando entram na tela (ganham a classe "in").
  const revealEls = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    // Sem animação (acessibilidade) ou navegador muito antigo: mostra tudo direto
    revealEls.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          // Efeito "cascata": elementos irmãos aparecem um depois do outro (70 ms de diferença, no máximo 6 passos)
          const siblings = [...en.target.parentElement.children].filter((c) => c.classList.contains("reveal"));
          en.target.style.transitionDelay = `${Math.min(siblings.indexOf(en.target), 6) * 70}ms`;
          en.target.classList.add("in");
          io.unobserve(en.target); // anima só uma vez; depois para de observar
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }, // dispara quando ~12% do elemento já apareceu
    );
    revealEls.forEach((el) => io.observe(el));
  }

  // Brilho que segue o mouse nos cards:
  // guarda a posição do mouse dentro do card nas variáveis CSS --mx e --my,
  // que o styles.css usa para posicionar um degradê radial (.card::before).
  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest?.(".card");
    if (!card) return;
    const r = card.getBoundingClientRect(); // posição e tamanho do card na tela
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });

  // =========================================================
  // 5. PIPELINE DO TOPO (ideia → deploy)
  // =========================================================
  // Animação em loop: cada etapa fica "rodando" (ícone girando), depois "concluída" (✓),
  // enquanto um log de terminal é digitado letra por letra embaixo.
  const stages = $$("#stages li");   // as 4 etapas: Ideia, Planejamento, Desenvolvimento, Deploy
  const log = $("#log");             // área do "terminal"
  const status = $("#pipeStatus");   // selo "rodando" / "no ar"

  // Roteiro da animação: [índice da etapa, tipo da linha, texto]
  // "info" = linha digitada letra por letra (azul) | "ok" = linha de sucesso que aparece de uma vez (verde)
  const script = [
    [0, "info", "› briefing recebido: \"preciso de um sistema para minha empresa\""],
    [0, "ok", "✓ problema e público definidos"],
    [1, "info", "› escopo: 6 telas · login · painel · relatórios"],
    [1, "ok", "✓ proposta aprovada · prazo combinado"],
    [2, "info", "› build: frontend + API + banco de dados"],
    [2, "ok", "✓ entrega 3/3 validada pelo cliente"],
    [3, "info", "› publicando em produção…"],
    [3, "ok", "✓ online em https://seu-projeto.com.br 🚀"],
  ];

  // Pausa por alguns milissegundos (usado com await para controlar o ritmo)
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // Redesenha o terminal: mostra as últimas 4 linhas já concluídas
  // e, se "typing" não for null, a linha que está sendo digitada com o cursor piscando.
  const renderLog = (lines, typing = "") => {
    log.innerHTML =
      lines.slice(-4).map(([cls, t]) => `<span class="${cls}">${esc(t)}</span>`).join("\n") +
      (typing !== null ? `${lines.length ? "\n" : ""}<span class="info">${esc(typing)}</span><span class="cursor"></span>` : "");
  };

  // Marca as etapas anteriores a "i" como concluídas e a etapa "i" como em andamento
  const setStage = (i) => {
    stages.forEach((li, idx) => {
      li.classList.toggle("done", idx < i);
      li.classList.toggle("running", idx === i);
    });
  };

  async function runPipeline() {
    // Com "reduzir movimento": mostra direto o estado final, sem animar
    if (reduceMotion) {
      stages.forEach((li) => li.classList.add("done"));
      status.textContent = "no ar";
      status.classList.add("done");
      renderLog(script.slice(-4).map(([, c, t]) => [c, t]), null);
      return;
    }
    // Loop infinito: roda o roteiro, mostra "no ar" por alguns segundos e recomeça
    while (true) {
      const lines = [];
      status.textContent = "rodando";
      status.classList.remove("done");
      for (const [stage, cls, text] of script) {
        setStage(stage);
        if (cls === "info") {
          // digita letra por letra (18 ms por letra)
          for (let k = 1; k <= text.length; k++) {
            renderLog(lines, text.slice(0, k));
            await sleep(18);
          }
          lines.push([cls, text]);
          await sleep(500);
        } else {
          // linha de sucesso aparece inteira
          lines.push([cls, text]);
          renderLog(lines, "");
          await sleep(650);
        }
      }
      setStage(stages.length); // todas as etapas concluídas
      status.textContent = "no ar";
      status.classList.add("done");
      renderLog(lines, null);  // null = sem cursor piscando
      await sleep(4200);       // pausa no estado final antes de recomeçar
    }
  }

  // Só começa a animação quando o pipeline aparece na tela (economiza processamento)
  new IntersectionObserver(([en], obs) => {
    if (en.isIntersecting) {
      runPipeline();
      obs.disconnect(); // não precisa mais observar: o loop continua sozinho
    }
  }).observe($(".pipeline"));

  // =========================================================
  // 6. FOTO PROTEGIDA
  // =========================================================
  // A foto NÃO existe como arquivo de imagem no site:
  //   - ela vem embaralhada dentro de assets/js/photo-data.js (variável window.__pf),
  //   - é desembaralhada só na memória,
  //   - e desenhada num <canvas>. Assim não existe <img> para "Salvar imagem como"
  //     e a foto não aparece como imagem na aba "Rede" do DevTools.
  // Para trocar a foto, veja o README (tools/proteger-foto.mjs).
  const portrait = $("#portrait");          // <figure> da foto
  const canvas = $("#portraitCanvas");      // onde a foto é desenhada
  if (portrait && canvas && Array.isArray(window.__pf)) {
    (async () => {
      try {
        // ----- Desembaralhar -----
        // Faz o caminho inverso do tools/proteger-foto.mjs:
        // junta os pedaços → desinverte o texto → base64 para bytes → desfaz o XOR com a chave
        const key = new TextEncoder().encode("lucas.dev::portfolio::2026"); // precisa ser igual à chave do proteger-foto.mjs
        const bin = atob(window.__pf.join("").split("").reverse().join(""));
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i) ^ key[i % key.length] ^ ((i * 31) & 0xff);
        delete window.__pf; // apaga os dados do objeto global depois de usar
        const bitmap = await createImageBitmap(new Blob([bytes])); // transforma os bytes numa imagem pronta para desenhar

        // ----- Desenhar no canvas -----
        const draw = () => {
          // Tamanho real em pixels = tamanho na tela × densidade da tela (até 2x),
          // para a foto ficar nítida em telas de alta resolução (celulares, Retina)
          const size = Math.round(canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 2));
          if (!size) return; // canvas ainda sem tamanho (ex.: escondido): tenta de novo no próximo redimensionamento
          canvas.width = canvas.height = size;
          const ctx = canvas.getContext("2d");
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(bitmap, 0, 0, size, size);
          // Marca d'água discreta, desenhada junto com a foto: aparece em qualquer print
          ctx.font = `600 ${Math.round(size * 0.035)}px Geist, sans-serif`;
          ctx.fillStyle = "rgba(255,255,255,0.35)";
          ctx.textAlign = "center"; // centralizada embaixo, dentro do círculo
          ctx.fillText(`© ${C.name || ""} · portfólio`, size * 0.5, size * 0.9);
        };
        draw();
        new ResizeObserver(draw).observe(canvas); // redesenha se o tamanho mudar (girar o celular, redimensionar a janela)
      } catch {
        portrait.remove(); // se algo der errado, remove a foto em vez de mostrar um círculo vazio
      }
    })();

    // ----- Bloqueios diretos na foto -----
    // contextmenu = botão direito | dragstart = arrastar a imagem | selectstart = selecionar
    ["contextmenu", "dragstart", "selectstart"].forEach((ev) =>
      portrait.addEventListener(ev, (e) => e.preventDefault()),
    );

    // ----- Borrar a foto quando há risco de captura -----
    // A foto só fica nítida quando TODAS as condições são seguras:
    // página com foco e visível, mouse dentro da página e nenhum "alerta" recente.
    // O borrado em si é feito pelo CSS: classe "shielded" no <html> (ver styles.css).
    const root = document.documentElement;
    let holdUntil = 0;        // momento (em ms) até quando a foto deve continuar borrada por causa de um alerta
    let pointerInside = true; // vira false quando o mouse sai da página (no celular isso não acontece)

    // Tempo que a foto continua borrada DEPOIS que a página volta a ficar em primeiro plano.
    // A Ferramenta de Captura some, devolve a tela por um instante e só então congela para o recorte:
    // esse intervalo garante que ela congele a foto ainda borrada.
    const RETURN_DELAY = 4000;
    let needsCooldown = false; // true = a página ficou insegura em algum momento e precisa do tempo de volta

    // (Não usamos a detecção de DevTools pelo tamanho da janela: ela dá falso positivo com zoom no navegador
    //  e deixaria a foto sempre borrada para essas pessoas. Os atalhos do DevTools continuam bloqueados abaixo.)
    const baseSafe = () => pointerInside && document.hasFocus() && !document.hidden;

    let everSafe = false; // ao abrir o site (ex.: link vindo do WhatsApp) não aplica o tempo de volta

    // Reavalia a situação e liga/desliga o borrado. Roda em vários eventos e a cada 400 ms.
    const update = () => {
      const safeNow = baseSafe();
      if (safeNow && !everSafe) everSafe = true;                  // primeira vez em condição segura
      else if (!safeNow && everSafe) needsCooldown = true;        // qualquer momento inseguro exige o tempo de volta
      else if (needsCooldown) {                                   // voltou a ficar seguro: começa a contar o tempo de volta
        holdUntil = Math.max(holdUntil, Date.now() + RETURN_DELAY);
        needsCooldown = false;
      }
      // Nítida só se estiver segura agora E o tempo de alerta já tiver passado
      root.classList.toggle("shielded", !(safeNow && Date.now() > holdUntil));
    };

    // Borra na hora e mantém borrado por "ms" milissegundos (no mínimo)
    const shield = (ms = 0) => {
      holdUntil = Math.max(holdUntil, Date.now() + ms);
      needsCooldown = true;
      root.classList.add("shielded"); // borra imediatamente, sem esperar o próximo ciclo do update()
    };

    // Trocar de janela / abrir outro programa (a página perde o foco)
    window.addEventListener("blur", () => shield());
    window.addEventListener("focus", update);
    // Trocar de aba ou minimizar o navegador
    document.addEventListener("visibilitychange", () => (document.hidden ? shield() : update()));

    // Mouse saiu da página (ex.: indo clicar na Ferramenta de Captura na barra de tarefas)
    document.addEventListener("mouseleave", () => { pointerInside = false; shield(); });
    document.addEventListener("mouseenter", () => { pointerInside = true; update(); });
    // Garantia extra: se o mouse se mexer dentro da página, ele com certeza está dentro
    document.addEventListener("pointermove", () => { if (!pointerInside) { pointerInside = true; update(); } }, { passive: true });

    // Checagem periódica (cobre casos em que nenhum evento é disparado)
    setInterval(update, 400);

    // ----- Atalhos de teclado -----
    // O "true" no final faz este código rodar antes de qualquer outro que escute o teclado.
    document.addEventListener("keydown", (e) => {
      // Tecla Windows / Command: é a primeira tecla do Win+Shift+S (recorte) e de outros atalhos de captura.
      // Borra antes de o sistema congelar a tela para o recorte.
      if (e.key === "Meta" || e.key === "OS" || e.metaKey) shield(4000);
      if (e.key === "PrintScreen") shield(4000);

      const k = e.key.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey; // Ctrl no Windows/Linux, Command no Mac
      const blocked =
        e.key === "F12" ||                                         // abrir DevTools
        (ctrl && e.shiftKey && ["i", "j", "c", "k"].includes(k)) || // DevTools: inspecionar, console, seletor
        (ctrl && ["u", "s", "p"].includes(k));                     // ver código-fonte, salvar página, imprimir
      if (blocked) {
        e.preventDefault();   // cancela a ação padrão do navegador
        e.stopPropagation();  // impede que o evento continue para outros scripts
        shield(1500);
      }
    }, true);

    // Print Screen: no Windows o navegador só recebe o "soltar a tecla" (keyup).
    // Borra a foto e tenta apagar o que foi para a área de transferência.
    document.addEventListener("keyup", (e) => {
      if (e.key === "PrintScreen") {
        shield(3000);
        navigator.clipboard?.writeText("").catch(() => {}); // pode ser negado pelo navegador; nesse caso, ignora
      }
    });

    // Antes de imprimir: borra (o CSS também esconde a foto na impressão)
    window.addEventListener("beforeprint", () => shield(3000));
  }
})();

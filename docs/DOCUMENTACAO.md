# 📘 Portfólio — Documentação completa

> Manual detalhado de cada seção, da configuração, do código e das decisões de design. Para a visão geral do projeto, veja o [README](../README.md).

---

## 📑 Sumário

1. [Para que serve](#-para-que-serve)
2. [Seções do site](#-seções-do-site)
3. [Configuração (`config.js`)](#-configuração-configjs)
4. [Como os contatos funcionam](#-como-os-contatos-funcionam)
5. [Foto protegida](#-foto-protegida)
6. [Identidade visual](#-identidade-visual)
7. [Animações e microinterações](#-animações-e-microinterações)
8. [Responsividade](#-responsividade)
9. [Acessibilidade](#-acessibilidade)
10. [Desempenho e SEO](#-desempenho-e-seo)
11. [Estrutura do projeto](#-estrutura-do-projeto)
12. [Organização do `main.js`](#-organização-do-mainjs)
13. [Como executar](#-como-executar)
14. [Como publicar (Netlify)](#-como-publicar-netlify)
15. [Como personalizar](#-como-personalizar)
16. [Problemas comuns](#-problemas-comuns)
17. [Limitações e próximos passos](#-limitações-e-próximos-passos)

---

## 🎯 Para que serve

O site é um **hub de portfólio e captação de clientes** para desenvolvimento de software. A ideia não é só mostrar trabalhos: é **transformar visitantes em conversas pelo WhatsApp**.

Em poucos segundos, o visitante precisa entender:

| Pergunta do visitante | Onde o site responde |
|---|---|
| **Quem é você?** | Hero ("Sou Antônio Lucas…") e seção Sobre, com foto e formação |
| **O que você desenvolve?** | Seção Serviços (6 tipos de projeto) |
| **Quais problemas resolve?** | Descrição de cada serviço e texto do Sobre |
| **Já fez projetos reais?** | Seção Projetos, com links para o site no ar e para o código |
| **Como contratar?** | Botões de WhatsApp em 5 lugares, além de LinkedIn, GitHub e e-mail |

---

## 🧭 Seções do site

O site é uma **página única**. O menu do topo leva a cada seção com rolagem suave, e o link da seção visível fica destacado.

### 1. Topo (Hero)

- **Selo** "Disponível para novos projetos", com ponto verde pulsando.
- **Headline:** "Software sob medida, *do papel* ao **deploy**."
- **Apresentação curta:** quem você é e o que constrói.
- **Botão principal:** "Vamos tirar sua ideia do papel", que abre o WhatsApp.
- **Botão secundário:** "Ver portfólio", que rola até os projetos.
- **Três destaques:** Sob medida · Web + API · No ar.
- **Pipeline animado** (a assinatura visual do site): as etapas Ideia → Planejamento → Desenvolvimento → Deploy vão sendo concluídas enquanto um log de terminal é digitado. Mostra, sem precisar explicar, como você trabalha.
- **Faixa de tecnologias** rolando continuamente embaixo do hero.

### 2. Sobre

- **Foto redonda** (protegida contra cópia, veja [Foto protegida](#-foto-protegida)), com o selo "Antônio Lucas · Desenvolvedor de Software".
- **Título:** "Eu não entrego só código. *Entrego solução.*"
- **Dois parágrafos:** experiência e abordagem de trabalho.
- **Card de formação:** Bacharel em Sistemas de Informação, Universidade Federal do Pará (UFPA).
- **Tecnologias** agrupadas em Frontend, Backend e Infra & ferramentas.

No computador, a foto fica à esquerda e o texto à direita. No tablet e no celular, a foto vai para cima.

### 3. Serviços

Grade em estilo "bento", com cards de tamanhos diferentes:

| Serviço | Descrição curta |
|---|---|
| **Sistemas personalizados** | Software feito para o jeito que a empresa trabalha |
| **Sites e landing pages** | Páginas rápidas e pensadas para converter |
| **Plataformas web** | Aplicações completas com login e regras de negócio |
| **Automação de processos** | Tarefas repetitivas viram rotinas automáticas |
| **Integrações com APIs** | Pagamentos, WhatsApp, planilhas, ERPs |
| **Sistemas para empresas** | Gestão, atendimento e operação interna |

### 4. Projetos

Os cards são **gerados automaticamente** a partir da lista `projects` do `config.js`. Cada card mostra:

- imagem do projeto (clicável, abre o site);
- etiqueta (ex.: "Freelance · Saúde & bem-estar"), nome e descrição;
- principais funcionalidades, com ✓;
- tecnologias usadas;
- botões **"Ver ao vivo"** e **"Código"** (cada um só aparece se o link existir).

No fim da lista sempre aparece o card **"O próximo projeto pode ser o seu."**, com botão para o WhatsApp.

### 5. Processo e diferenciais

- **Processo em 4 etapas:** Conversa → Proposta → Desenvolvimento → Entrega, ligadas por uma linha verde.
- **4 diferenciais:** soluções personalizadas, código organizado, performance e segurança, comunicação transparente.

### 6. Contato

- Chamada final: "Tem uma ideia? *Vamos colocá-la no ar.*"
- Botão grande **"Chamar no WhatsApp"**.
- Links para **LinkedIn**, **GitHub** e **e-mail**.

### Rodapé e botão flutuante

- Rodapé com ano automático, nome e título.
- **Botão flutuante do WhatsApp** no canto inferior direito. Ele fica escondido enquanto o topo está na tela (que já tem botões de WhatsApp) e aparece quando a pessoa rola a página.

---

## ⚙️ Configuração (`config.js`)

Tudo o que é pessoal fica em **`assets/js/config.js`**. O resto do site lê essas informações sozinho.

| Campo | Exemplo | Onde aparece |
|---|---|---|
| `name` | `"Antônio Lucas"` | Hero, Sobre, selo e marca d'água da foto |
| `fullName` | `"Antônio Lucas"` | Rodapé |
| `brand` | `"antoniolucas"` | Logo do topo (aparece como `antoniolucas.dev`) |
| `role` | `"Desenvolvedor de Software"` | Selo da foto e rodapé |
| `whatsapp` | `"559184029763"` | Todos os botões de WhatsApp (55 + DDD + número, só dígitos) |
| `whatsappMessage` | `"Olá! Conheci seu portfólio…"` | Mensagem que já vem escrita no WhatsApp |
| `email` | `"seu@email.com"` | Botão de e-mail. Vazio = o botão some |
| `emailSubject` | `"Orçamento de projeto"` | Assunto do e-mail no Gmail |
| `emailMessage` | `"Olá! …\n\nSobre o projeto:\n"` | Texto inicial do e-mail (`\n` = nova linha) |
| `linkedin` | `"https://www.linkedin.com/in/…"` | Botão do LinkedIn. Vazio = o botão some |
| `github` | `"https://github.com/…"` | Botão do GitHub. Vazio = o botão some |
| `projects` | lista | Cards da seção Projetos |

### Campos de cada projeto

```js
{
  name: "Safe Mind",
  tag: "Freelance · Saúde & bem-estar",
  image: "assets/img/safe-mind.png",      // ideal: 1366×854 px
  description: "Plataforma web de bem-estar emocional…",
  features: ["Check-in com 8 emoções…", "Respiração guiada…"],
  tech: ["HTML5", "Tailwind CSS", "JavaScript"],
  demo: "https://safemind2.netlify.app/", // "" = sem botão "Ver ao vivo"
  code: "https://github.com/ALucas314/Safe-Mind", // "" = sem botão "Código"
}
```

Os textos que estão direto no `index.html` (headline, serviços, processo, diferenciais) são editados no próprio HTML.

---

## 📲 Como os contatos funcionam

### WhatsApp

O link segue o formato oficial do WhatsApp:

```
https://wa.me/559184029763?text=Ol%C3%A1!%20Conheci%20seu%20portf%C3%B3lio...
```

- O número passa por uma limpeza que deixa só os dígitos. Assim, `+55 (91) 8402-9763` também funciona.
- A mensagem é convertida para o formato de link (`encodeURIComponent`), para acentos e espaços não quebrarem.
- Todo elemento com o atributo `data-whatsapp` recebe esse link e abre numa nova aba.
- Se o número ainda for o de exemplo, aparece um aviso no console do navegador.

### E-mail (Gmail)

O botão de e-mail abre a tela **"Escrever"** do Gmail já preenchida:

```
https://mail.google.com/mail/?view=cm&fs=1&to=EMAIL&su=ASSUNTO&body=MENSAGEM
```

| Parâmetro | Significado |
|---|---|
| `view=cm` | abre a tela de escrever |
| `fs=1` | em tela cheia |
| `to` | destinatário |
| `su` | assunto |
| `body` | mensagem |

Quem não estiver logado numa conta Google passa primeiro pela tela de login. O endereço continua visível no botão para quem preferir copiar.

### LinkedIn e GitHub

Links diretos, abertos numa nova aba. Se o campo estiver vazio no `config.js`, o botão é removido da página.

---

## 🔒 Foto protegida

A foto da seção Sobre tem várias camadas de proteção contra cópia.

### 1. A foto não existe como arquivo de imagem

- A foto original **não está** na pasta do projeto.
- Ela foi **embaralhada** pelo script `tools/proteger-foto.mjs` (XOR com uma chave + base64 invertido) e guardada em `assets/js/photo-data.js`.
- No navegador, o `main.js` desembaralha os dados **só na memória** e desenha a foto num `<canvas>`.
- Resultado: não existe `<img>` para "Salvar imagem como", e a foto não aparece como imagem na aba "Rede" do DevTools.

### 2. Bloqueios diretos

| Ação | O que acontece |
|---|---|
| Botão direito na foto | bloqueado |
| Arrastar a foto | bloqueado |
| Segurar o dedo na foto (celular) | bloqueado |
| Selecionar a foto | bloqueado |
| F12, Ctrl+Shift+I / J / C / K | bloqueados (e a foto borra) |
| Ctrl+U (ver código), Ctrl+S (salvar), Ctrl+P (imprimir) | bloqueados (e a foto borra) |
| Imprimir a página | a foto some |

### 3. Borrado automático contra prints

A foto fica **borrada na hora** (classe `shielded` no `<html>`, borrado feito pelo CSS) quando:

| Situação | Por quê |
|---|---|
| A tecla **Windows** é apertada | é a primeira tecla do Win+Shift+S. A foto borra antes de o Windows congelar a tela para o recorte |
| A tecla **Print Screen** é apertada | além de borrar, o site tenta limpar a área de transferência |
| O **mouse sai da página** | ex.: indo clicar na Ferramenta de Captura na barra de tarefas |
| A página **perde o foco** ou a aba fica escondida | outro programa foi aberto por cima |

**Tempo de volta (4 segundos):** depois de qualquer uma dessas situações, a foto continua borrada por 4 segundos quando a página volta ao primeiro plano. A Ferramenta de Captura some, devolve a tela por um instante e só então congela para o recorte. Esse tempo garante que ela congele a foto ainda borrada.

O borrado acontece **instantaneamente** (sem animação). Só a volta ao normal é suave. Ao abrir o site pela primeira vez (ex.: link vindo do WhatsApp), a foto já aparece nítida.

### 4. Marca d'água

"© Antônio Lucas · portfólio" é desenhado junto com a foto, embaixo e centralizado. Aparece em qualquer captura que passe pelas proteções.

### ⚠️ Limites (honestos)

Nenhum site consegue impedir 100% a cópia de uma imagem que está na tela. Ainda é possível:

- fotografar a tela com outro celular;
- tirar print pelos botões do próprio celular (o navegador não avisa o site);
- usar a captura **com atraso** de 5 ou 10 segundos da Ferramenta de Captura;
- alguém com conhecimento técnico contornar os bloqueios do navegador.

As proteções barram a grande maioria das pessoas. Lembre também que a foto continua pública no seu perfil do GitHub.

> **Por que não há detecção de "DevTools aberto" pelo tamanho da janela?** Essa técnica confunde o zoom do navegador (125%, 150%) com o DevTools e deixaria a foto sempre borrada para essas pessoas. Por isso ela foi removida. Os atalhos do DevTools continuam bloqueados.

### Como trocar a foto

1. Escolha uma foto **quadrada** e deixe-a **fora** da pasta do projeto.
2. Na pasta do projeto, rode:
   ```bash
   node tools/proteger-foto.mjs "C:\caminho\da\nova-foto.jpg" assets/js/photo-data.js
   ```
3. Pronto: o `photo-data.js` é regerado e o site já mostra a nova foto.

---

## 🎨 Identidade visual

### Conceito: "do papel ao deploy"

A identidade foi pensada para **não parecer template**. O pipeline do topo, o log de terminal, a tipografia monoespaçada nos detalhes e os comentários no estilo `// sobre mim` remetem ao dia a dia de quem desenvolve, sem cair no clichê.

### Paleta de cores

| Cor | Hex | Uso |
|---|---|---|
| ⚫ Fundo | `#0a0b0d` | Fundo da página (dark mode como identidade principal) |
| ⬛ Superfícies | `#131519` / `#0f1114` | Cards e painéis |
| ⚪ Texto | `#eef0f3` | Texto principal |
| 🔘 Texto secundário | `#9aa1ad` / `#646b77` | Descrições e detalhes |
| 🟢 **Verde-sinal** | `#c8f257` | Cor de destaque única: botões, ícones, palavras-chave. É a cor de "build passou" |
| 🩵 Ciano | `#5fe3d0` | Detalhes do pipeline e brilhos |
| 💚 Verde WhatsApp | `#25d366` | Só nos botões de WhatsApp da seção de contato e no botão flutuante |

O site usa **uma única cor de destaque**, em vez dos degradês azul e roxo comuns em portfólios.

### Tipografia

| Fonte | Uso |
|---|---|
| **Geist** | Textos e títulos: moderna e com ótima leitura |
| **Geist Mono** | Detalhes técnicos: kickers (`// serviços`), etiquetas, terminal |
| **Instrument Serif** (itálico) | Palavras-chave dos títulos (*do papel*, *Entrego solução.*), para dar personalidade e contraste |

### Elementos visuais

- **Grade sutil** no fundo, que some suavemente para baixo, e um **brilho verde** no topo.
- **Cards** com cantos arredondados, bordas finas e sombra profunda.
- **Borda em degradê** (verde → ciano) no pipeline e na foto.
- **Ícones** desenhados à mão em SVG, no estilo traço fino, definidos uma vez no final do `index.html`.

---

## ✨ Animações e microinterações

| Animação | Como funciona |
|---|---|
| **Pipeline do topo** | Loop: cada etapa fica "rodando", depois ✓, enquanto o log é digitado letra por letra. Só começa quando aparece na tela |
| **Entrada das seções** | Elementos com `.reveal` aparecem deslizando ao entrar na tela, em cascata (70 ms entre irmãos) |
| **Brilho nos cards** | Um degradê radial segue o mouse dentro de cada card (variáveis CSS `--mx` e `--my`) |
| **Botões** | Sobem levemente e ganham sombra no hover. A seta do botão principal se move |
| **Faixa de tecnologias** | Rola continuamente, com as bordas desvanecidas |
| **Menu** | Ganha fundo desfocado ao rolar e destaca a seção atual |
| **Selo "Disponível"** | Ponto verde pulsando |
| **Imagens dos projetos** | Zoom suave no hover |

Todas as animações são **desligadas** para quem ativou "reduzir movimento" no sistema.

---

## 📱 Responsividade

| Largura | Layout |
|---|---|
| **Acima de 1024 px** (computador) | Hero em duas colunas (texto + pipeline). Sobre com a foto à esquerda. Serviços em 4 colunas. Projetos com imagem ao lado do texto |
| **Até 1024 px** (tablet) | Hero em uma coluna. Foto acima do texto. Serviços em 2 colunas. Projetos com imagem em cima. Processo em 2 colunas |
| **Até 820 px** | Menu vira o botão "hambúrguer", com menu suspenso |
| **Até 640 px** (celular) | Tudo em uma coluna. Botões ocupam a largura toda. O botão de WhatsApp do topo mostra só o ícone |
| **Até 380 px** (celular pequeno) | Logo menor, e o selo da foto pode quebrar em duas linhas |

Testado em 1440 px, 1280 px, 820 px e 390 px de largura, sem rolagem horizontal.

---

## ♿ Acessibilidade

- Link **"Pular para o conteúdo"** (aparece ao navegar com Tab).
- **Navegação por teclado** com contorno verde visível no foco. Esc fecha o menu do celular.
- Atributos **`aria-*`** no menu (aberto/fechado), nos ícones decorativos (`aria-hidden`) e na foto (`role="img"` com descrição).
- **Textos alternativos** nas imagens dos projetos.
- Respeito à opção **"reduzir movimento"** do sistema.
- Contraste alto entre texto e fundo.

---

## ⚡ Desempenho e SEO

- **Sem frameworks e sem etapa de build:** só HTML, CSS e JavaScript. O site carrega rápido e roda em qualquer hospedagem estática.
- **Imagens dos projetos com `loading="lazy"`:** só são baixadas quando chegam perto da tela.
- **Animações com `IntersectionObserver`:** nada é calculado a cada rolagem.
- **Cache de imagens** configurado no `netlify.toml` (7 dias).
- **SEO:** `title`, `description` e tags **Open Graph** (`og:title`, `og:description`, `og:image`), para a prévia com imagem ao compartilhar o link no WhatsApp e no LinkedIn.
- **Cabeçalhos de segurança** no Netlify: `X-Content-Type-Options`, `Referrer-Policy` e `X-Frame-Options`.

---

## 📁 Estrutura do projeto

```
portfolio/
├── index.html               # Estrutura e textos de todas as seções + ícones SVG
├── netlify.toml             # Publicação e cabeçalhos de segurança/cache
├── README.md                # Visão geral do projeto
├── LICENSE                  # Todos os direitos reservados
├── assets/
│   ├── css/
│   │   └── styles.css       # Identidade visual, layout, animações e responsividade
│   ├── js/
│   │   ├── config.js        # ← seus dados (edite aqui)
│   │   ├── main.js          # Toda a lógica do site (6 seções comentadas)
│   │   └── photo-data.js    # Foto embaralhada (gerado pelo script, não edite)
│   └── img/
│       ├── safe-mind.png    # Imagem do projeto Safe Mind
│       ├── og.png           # Prévia de compartilhamento (1320×693)
│       └── favicon.svg      # Ícone da aba do navegador
├── tools/
│   └── proteger-foto.mjs    # Embaralha uma foto e gera o photo-data.js
└── docs/
    ├── DOCUMENTACAO.md      # Este manual
    └── screenshots/         # Imagens do README (sem a foto, de propósito)
```

---

## 🧩 Organização do `main.js`

O código está dentro de uma função que se executa sozinha (IIFE), para não criar variáveis globais, e é dividido em seções comentadas:

| # | Seção | Responsabilidade |
|---|---|---|
| — | Utilidades | `$` e `$$` (seletores), `esc()` (proteção contra HTML malicioso), detecção de "reduzir movimento" |
| 1 | Dados do config.js | Preenche `data-bind`, monta os links de WhatsApp, Gmail, LinkedIn e GitHub, e remove botões sem link |
| 2 | Projetos | Gera os cards a partir do `config.js` e adiciona o card "O próximo projeto pode ser o seu" |
| 3 | Navegação | Fundo do menu ao rolar, menu do celular, seção ativa e botão flutuante do WhatsApp |
| 4 | Animações | Entrada em cascata (`.reveal`) e brilho que segue o mouse nos cards |
| 5 | Pipeline | Roteiro, digitação do log e loop infinito do topo |
| 6 | Foto protegida | Desembaralha e desenha a foto no canvas, aplica os bloqueios e controla o borrado |

---

## ▶️ Como executar

Não precisa instalar nada.

**Opção 1:** dê dois cliques no `index.html`.

**Opção 2 (recomendada):** use um servidor local, que é mais próximo de como o site roda publicado:

```bash
python -m http.server 5500
```

Depois acesse `http://localhost:5500`. Também funciona com a extensão **Live Server** do VS Code (botão direito no `index.html` → *Open with Live Server*).

**Ver no celular:** com o celular e o computador na mesma rede Wi-Fi, rode o servidor local e acesse `http://IP-DO-COMPUTADOR:5500` no celular. O IP aparece no comando `ipconfig`, no campo "Endereço IPv4".

---

## 🚀 Como publicar (Netlify)

1. Suba a pasta para um repositório no GitHub.
2. No Netlify: **Add new project → Import an existing project → GitHub →** escolha o repositório → **Deploy**. O `netlify.toml` já diz para publicar a pasta raiz, sem build.
3. Em **Project configuration → Change project name**, escolha o endereço (ex.: `antoniolucas.netlify.app`).
4. **Depois de publicado**, troque no `index.html` o `og:image` por um endereço completo, por exemplo:
   ```html
   <meta property="og:image" content="https://antoniolucas.netlify.app/assets/img/og.png" />
   ```
   Assim a prévia com imagem aparece quando o link é compartilhado.
5. A cada `git push`, o Netlify atualiza o site sozinho.

> **Lembrete:** tudo o que está na pasta do projeto fica público quando o site é publicado. Nunca coloque a foto original, senhas ou arquivos pessoais nela.

---

## 🛠 Como personalizar

| Quero mudar… | Onde |
|---|---|
| Nome, WhatsApp, e-mail, redes | `assets/js/config.js` |
| Adicionar ou remover projetos | `projects` no `config.js` + imagem em `assets/img/` |
| Headline, textos do Sobre, serviços, processo | `index.html` |
| Formação | card `.edu` no `index.html`, seção Sobre |
| Tecnologias (Sobre e faixa do topo) | `index.html` (`.stack` e `.marquee-track`) |
| Cor de destaque | `--accent` no topo do `styles.css` (e `--accent-soft`, que é a mesma cor transparente) |
| Fontes | link do Google Fonts no `index.html` + `--font`, `--mono` e `--serif` no `styles.css` |
| Roteiro do pipeline do topo | lista `script` no `main.js` (seção 5) |
| Tempo do borrado ao voltar para a página | `RETURN_DELAY` no `main.js` (seção 6) |
| Foto | `tools/proteger-foto.mjs` (veja [Como trocar a foto](#como-trocar-a-foto)) |
| Imagem de compartilhamento | substitua `assets/img/og.png` (ideal 1200×630 px) |

---

## 🧯 Problemas comuns

| Problema | Causa provável e solução |
|---|---|
| Botão do WhatsApp abre sem destinatário | Número de exemplo ou com erro no `config.js`. Use 55 + DDD + número, só dígitos |
| Botão de e-mail ou LinkedIn não aparece | O campo está vazio no `config.js`: o botão é removido de propósito |
| A foto não aparece | `photo-data.js` ausente ou gerado com outra chave. Rode o `proteger-foto.mjs` de novo |
| A foto fica borrada | A página está sem foco, o mouse está fora dela ou houve um "alerta" nos últimos 4 segundos. Clique na página e espere |
| Alterações não aparecem no site publicado | Faça `git push` e aguarde ~1 minuto. Se continuar, recarregue com Ctrl+F5 |
| A prévia do link no WhatsApp está sem imagem | O `og:image` precisa ser um endereço completo (`https://…`) |

---

## 🔭 Limitações e próximos passos

**Limitações atuais**

- A proteção da foto dificulta, mas não impede 100% a cópia (veja [Limites](#️-limites-honestos)).
- Os textos das seções fixas (serviços, processo) são editados direto no HTML.
- O site está só em português.

**Ideias para próximas versões**

- Adicionar novos projetos conforme forem entregues.
- Seção de depoimentos de clientes.
- Versão em inglês para clientes de fora.
- Formulário de contato como alternativa ao WhatsApp.
- Domínio próprio (ex.: `antoniolucas.dev`).
- Métricas de visitas e de cliques no WhatsApp (ex.: Plausible ou Google Analytics).

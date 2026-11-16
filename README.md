# Portfólio · Desenvolvimento de software sob medida

Site de portfólio e captação de clientes: apresenta serviços e projetos e converte visitantes em conversas pelo **WhatsApp**.

Feito em **HTML, CSS e JavaScript puros**, sem frameworks e sem etapa de build. Abre direto no navegador e publica no Netlify em segundos.

## ✏️ Personalizar (5 minutos)

Tudo o que é pessoal fica em **um único arquivo**: [`assets/js/config.js`](assets/js/config.js).

| Campo | O que colocar |
|---|---|
| `name`, `fullName`, `role` | Seu nome e seu título |
| `whatsapp` | **55 + DDD + número**, só dígitos. Ex.: `5511987654321` |
| `whatsappMessage` | A mensagem que já vem escrita quando o cliente clica |
| `email`, `linkedin`, `github` | Seus contatos. Se deixar algum vazio (`""`), o botão some sozinho |
| `projects` | Seus projetos: nome, descrição, funcionalidades, tecnologias, links e imagem |

As imagens dos projetos ficam em `assets/img/`. O ideal é 1366×854 px.

### Sua foto (protegida)

A foto da seção "Sobre" **não fica como arquivo de imagem** no site. Ela é embaralhada dentro de `assets/js/photo-data.js` e desenhada na tela por script. Além disso, o site:

- bloqueia o botão direito, o arrastar e o "segurar para salvar" do celular na foto;
- bloqueia os atalhos F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S e Ctrl+P;
- **borra a foto na hora** ao apertar a tecla Windows (início do Win+Shift+S), ao apertar Print Screen, quando o mouse sai da página (ex.: indo abrir a Ferramenta de Captura) ou quando a página perde o foco;
- esconde a foto na impressão e coloca uma marca d'água discreta.

> Nenhum site consegue impedir 100%: alguém sempre pode fotografar a tela com o celular, e quem entende de programação contorna qualquer bloqueio. Essas proteções dificultam a cópia para a grande maioria das pessoas.

**Para trocar a foto** (quadrada, de preferência), rode na pasta do projeto, apontando para o arquivo da nova foto:

```bash
node tools/proteger-foto.mjs "C:\caminho\da\nova-foto.jpg" assets/js/photo-data.js
```

Não coloque a foto original dentro da pasta do projeto: tudo o que está nela fica público quando o site é publicado.

> Enquanto o `whatsapp` estiver com o número de exemplo (`5500000000000`), os botões abrem o WhatsApp sem destinatário válido. Troque antes de publicar.

## ▶️ Ver no computador

Dê dois cliques no `index.html`, ou rode um servidor local na pasta:

```bash
python -m http.server 5500
```

Depois acesse `http://localhost:5500`. Também funciona com a extensão **Live Server** do VS Code.

## 🚀 Publicar no Netlify (grátis)

1. Suba esta pasta para um repositório no GitHub.
2. No Netlify: **Add new project → Import from Git →** escolha o repositório → **Deploy**. O `netlify.toml` já está configurado.
3. Depois de publicado, troque no `index.html` o `og:image` por um endereço completo (ex.: `https://seu-site.netlify.app/assets/img/og.png`). Assim a prévia com imagem aparece quando o link é compartilhado no WhatsApp e no LinkedIn.

## 🧩 Estrutura

```
├── index.html            # Estrutura e textos de todas as seções
├── netlify.toml          # Configuração de publicação
└── assets/
    ├── css/styles.css    # Identidade visual, layout e animações
    ├── js/config.js      # ← seus dados (edite aqui)
    ├── js/main.js        # Projetos, WhatsApp, menu, animações e pipeline do hero
    └── img/              # Imagens dos projetos, favicon e prévia de compartilhamento
```

## 🎨 Identidade visual

- **Conceito "do papel ao deploy":** o hero mostra um pipeline animado (Ideia → Planejamento → Desenvolvimento → Deploy) com log de terminal. É a assinatura do site e mostra, sem precisar explicar, como você trabalha.
- **Dark mode** com um único acento **verde-sinal** (`#c8f257`), a cor de "build passou".
- **Tipografia:** Geist (textos), Geist Mono (detalhes técnicos) e Instrument Serif em itálico para dar personalidade às palavras-chave.
- **Microinterações:** brilho que segue o mouse nos cards, entrada suave das seções, botão flutuante do WhatsApp que aparece depois do topo.
- **Acessibilidade:** navegação por teclado, link "pular para o conteúdo" e respeito à opção do sistema "reduzir movimento".

## Seções

1. **Hero:** headline, chamada para o WhatsApp e botão para o portfólio
2. **Sobre:** apresentação, abordagem e tecnologias
3. **Serviços:** 6 serviços em grade
4. **Projetos:** cards com imagem, descrição, funcionalidades, tecnologias e links (vêm do `config.js`)
5. **Processo e diferenciais:** como o trabalho acontece, do primeiro contato à entrega
6. **Contato:** chamada final para o WhatsApp, além de LinkedIn, GitHub e e-mail

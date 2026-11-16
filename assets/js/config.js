/**
 * ============================================================
 *  CONFIGURAÇÃO DO PORTFÓLIO — edite só este arquivo
 * ============================================================
 *  Tudo o que é pessoal (nome, WhatsApp, redes, projetos) fica aqui.
 *  O resto do site lê estas informações automaticamente.
 */
window.PORTFOLIO = {
  // ---------- Quem é você ----------
  name: "Antônio Lucas",                 // Seu nome (aparece no "Sobre", na foto e nos textos)
  fullName: "Antônio Lucas",             // Nome completo (rodapé)
  brand: "antoniolucas",                 // Logo do topo: aparece como "antoniolucas.dev"
  role: "Desenvolvedor de Software",     // Seu título profissional

  // ---------- Contato ----------
  // WhatsApp no formato 55 + DDD + número, só dígitos. Ex.: "5511987654321"
  whatsapp: "559184029763",
  whatsappMessage: "Olá! Conheci seu portfólio e gostaria de conversar sobre o desenvolvimento de um projeto.",
  email: "antoniolucas9014@gmail.com",    // Seu e-mail profissional (vazio = o botão de e-mail não aparece)
  // O botão de e-mail abre o Gmail já com destinatário, assunto e mensagem preenchidos
  emailSubject: "Orçamento de projeto",
  emailMessage: "Olá! Conheci seu portfólio e gostaria de conversar sobre o desenvolvimento de um projeto.\n\nSobre o projeto:\n",
  linkedin: "https://www.linkedin.com/in/antonio-lucas-costa-araujo",
  github: "https://github.com/ALucas314",

  // ---------- Projetos do portfólio ----------
  // image: caminho da imagem em assets/img | demo/code: deixe "" se não houver
  projects: [
    {
      name: "Safe Mind",
      tag: "Freelance · Saúde & bem-estar",
      image: "assets/img/safe-mind.png",
      description:
        "Plataforma web de bem-estar emocional desenvolvida para um cliente: check-in diário de emoções, respiração guiada e histórico com gráficos.",
      features: [
        "Check-in com 8 emoções e reações empáticas personalizadas",
        "Respiração guiada 4-4-6 com animação, som e vibração",
        "Calendário, gráficos semanais e exportação para Excel",
        "Alerta de apoio (CVV 188) ao detectar texto de risco",
      ],
      tech: ["HTML5", "Tailwind CSS", "JavaScript", "SVG", "localStorage"],
      demo: "https://safemind2.netlify.app/",
      code: "https://github.com/ALucas314/Safe-Mind",
    },
  ],
};

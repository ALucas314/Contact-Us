/**
 * proteger-foto.mjs
 * ---------------------------------------------------------
 * Embaralha a sua foto e grava o resultado em um arquivo .js.
 * O site (assets/js/main.js, seção 6) desembaralha esses dados na memória
 * e desenha a foto num <canvas>, sem nunca publicar a imagem como arquivo.
 *
 * Como usar (na pasta do projeto):
 *   node tools/proteger-foto.mjs "C:\caminho\da\foto.jpg" assets/js/photo-data.js
 *
 * Dica: use uma foto quadrada. Não deixe a foto original dentro da pasta do projeto,
 * porque tudo o que está nela fica público quando o site é publicado.
 */
import fs from "node:fs";

// Argumentos da linha de comando: [arquivo da foto, arquivo .js de saída]
const [src, out] = process.argv.slice(2);
if (!src || !out) {
  console.error('Uso: node tools/proteger-foto.mjs "caminho/da/foto.jpg" assets/js/photo-data.js');
  process.exit(1);
}

// Chave do embaralhamento. Precisa ser IGUAL à usada no main.js (seção 6), senão a foto não abre.
const key = Buffer.from("lucas.dev::portfolio::2026");

// Lê a foto como bytes
const data = fs.readFileSync(src);

// Embaralha cada byte com XOR: combina o byte da foto com um byte da chave
// e com um valor que muda conforme a posição (i * 31). Aplicar o mesmo XOR de novo desfaz.
const mixed = Buffer.alloc(data.length);
for (let i = 0; i < data.length; i++) mixed[i] = data[i] ^ key[i % key.length] ^ (i * 31) & 0xff;

// Converte para texto (base64) e inverte a ordem dos caracteres,
// para o conteúdo não parecer uma imagem em base64 comum
const b64 = mixed.toString("base64").split("").reverse().join("");

// Quebra em pedaços de 120 caracteres (arquivo mais fácil de ler e versionar)
const chunks = b64.match(/.{1,120}/g);

// Grava o .js: ele só cria a variável window.__pf com os pedaços
fs.writeFileSync(
  out,
  `/* gerado automaticamente — não edite */\nwindow.__pf=${JSON.stringify(chunks)};\n`,
);
console.log("ok", data.length, "bytes ->", out);

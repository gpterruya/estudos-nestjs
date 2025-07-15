// 🧠 O que você vai aprender hoje:

// 1. O que é NestJS e por que usá-lo
// 2. Como criar seu primeiro projeto
// 3. Estrutura básica do NestJS
// 4. Criar seu primeiro endpoint (rota GET simples)

// 📌 1. O que é o NestJS?

// NestJS é um framework Node.js para construção de aplicações backend escaláveis, modernas e bem organizadas. Ele usa:

// - TypeScript (ou JavaScript)
// - Arquitetura modular e orientada a serviços
// - Baseado em conceitos do Angular e Express

// 💡 Se você já ouviu falar em Spring Boot (Java), Nest é uma versão parecida no ecossistema JS/TS.

// 🛠️ 2. Criando seu primeiro projeto

// 🔧 Requisitos:

// - Node.js instalado
// - npm ou yarn instalado

// ✅ Instalando o Nest CLI:

// npm i -g @nestjs/cli

// ✅ Criando o projeto:

// nest new meu-primeiro-projeto

// Ele vai perguntar qual gerenciador de pacotes usar. Escolha npm ou yarn, o que preferir.

// 📁 3. Estrutura básica do projeto

// Ao entrar no projeto, você verá algo como:

// src/
// ├── app.controller.ts        ← Rota (Controller)
// ├── app.controller.spec.ts   ← Testes
// ├── app.module.ts            ← Módulo principal
// ├── app.service.ts           ← Lógica de negócio
// ├── main.ts                  ← Ponto de entrada

// O que cada um faz?

// - main.ts: inicia o servidor.
// - app.module.ts: define os módulos usados (é como o cérebro do app).
// - app.controller.ts: cuida das rotas (ex: GET /hello).
// - app.service.ts: onde vai a lógica da sua aplicação.

// 🚀 4. Rodando o projeto

// Entre na pasta do projeto e execute:

// npm run start:dev

// O servidor será iniciado normalmente em:

// http://localhost:3000

// ✅ Recapitulando (Primeira aula)
// | Conceito        | O que é                                                       |
// | --------------- | ------------------------------------------------------------- |
// | NestJS          | Framework backend baseado em TypeScript e arquitetura modular |
// | `@Controller()` | Define uma classe que responde às rotas HTTP                  |
// | `@Get()`        | Define uma rota GET                                           |
// | `@Injectable()` | Torna uma classe injetável (como serviço)                     |
// | `app.module.ts` | Módulo principal da aplicação                                 |

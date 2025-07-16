// 📘 Aula 2 – Criando Rota POST, Usando DTO e Validação

// Hoje vamos aprender a:

// 1. Criar uma rota POST
// 2. Enviar dados no corpo da requisição (body)
// 3. Usar DTOs para tipagem
// 4. Validar os dados com class-validator

// 🧠 Conceitos de hoje

// | Termo                          | Explicação Rápida                                      |
// | ------------------------------ | ------------------------------------------------------ |
// | **POST**                       | Método HTTP para **enviar/criar** dados                |
// | **DTO** (Data Transfer Object) | Objeto que define os **dados esperados** na requisição |
// | **class-validator**            | Biblioteca para **validar** os dados recebidos         |

// 👷‍♂️ 1. Criando um novo módulo

// Vamos criar um recurso chamado users (usuários).

// nest g resource users

// Responda:

// - REST API: Yes
// - CRUD: No

// 📁 A estrutura criada:

// src/users/
// ├── dto/
// │   └── create-user.dto.ts
// ├── users.controller.ts
// ├── users.module.ts
// ├── users.service.ts
// 

// ✍️ 2. Editando o DTO (create-user.dto.ts)
// Abra o arquivo src/users/dto/create-user.dto.ts e adicione:

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}

// ✅ 3. Instalando dependências de validação

// No terminal:

// npm install class-validator class-transformer

// E no main.ts, ative a validação global:

// src/main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

// 🔧 4. Criando a rota POST
// No users.controller.ts:

import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}

// E no users.service.ts:

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return {
      message: 'Usuário criado com sucesso!',
      user: createUserDto,
    };
  }
}

// 🚀 5. Testando com o Insomnia/Postman/Swagger

// Faça um POST para:

// http://localhost:3000/users

// Corpo da requisição (JSON):

// {
//   "name": "Gabriel",
//   "email": "gabriel@example.com",
//   "password": "123456"
// }

// Resposta:

// {
//   "message": "Usuário criado com sucesso!",
//   "user": {
    // "name": "Gabriel",
    // "email": "gabriel@example.com",
    // "password": "123456"
//   }
// }

// Se faltar algum campo ou tiver valor inválido, o Nest vai retornar erro automaticamente 🎉

// ✅ Recapitulando (Segunda aula)

// | Conceito          | Explicação                                                      |
// | ----------------- | --------------------------------------------------------------- |
// | `@Post()`         | Cria uma rota POST                                              |
// | `@Body()`         | Captura o corpo da requisição                                   |
// | DTO               | Define o formato e tipos dos dados esperados                    |
// | `class-validator` | Valida os dados com decorators (`@IsEmail`, `@MinLength`, etc.) |
// | `ValidationPipe`  | Valida os DTOs automaticamente no NestJS                        |
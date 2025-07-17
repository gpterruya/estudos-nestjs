// 📘 Aula 3 – Armazenando dados em memória + rota GET

// Hoje vamos:

// 1. Armazenar dados em memória (array)
// 2. Listar usuários com GET /users
// 3. Buscar um usuário pelo ID com GET /users/:id
// 4. Validar o ID recebido

// 📁 Como estamos até agora

// Você já deve ter o módulo users com o CreateUserDto e a rota POST /users.

// Agora vamos:
// - Criar um "banco de dados em memória" usando um array.
// - Criar um ID único para cada usuário.

// ✨ 1. Adicionando uma estrutura de armazenamento em users.service.ts

// Abra src/users/users.service.ts e modifique:

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  create(createUserDto: CreateUserDto) {
    const newUser = {
      id: this.nextId++,
      ...createUserDto,
    };

    this.users.push(newUser);
    return {
      message: 'Usuário criado com sucesso!',
      user: newUser,
    };
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }
    return user;
  }
}

// 🧭 2. Criando rotas GET em users.controller.ts

// Abra src/users/users.controller.ts e adicione:

import { Controller, Get, Param, ParseIntPipe, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
}

// Explicando:

// - @Get(): retorna todos os usuários.
// - @Get(':id'): retorna 1 usuário por ID.
// - @Param('id', ParseIntPipe): converte o id para número e valida.

// 📬 3. Testando as rotas

// a) Criar usuário (POST):

// POST http://localhost:3000/users
// Body (JSON):
// {
//   "name": "Maria",
//   "email": "maria@example.com",
//   "password": "123456"
// }

// b) Listar todos (GET):

// GET http://localhost:3000/users

// c) Buscar por ID (GET):

// GET http://localhost:3000/users/1

// Se não existir, retorna:

// {
//   "statusCode": 404,
//   "message": "Usuário com id 999 não encontrado",
//   "error": "Not Found"
// }

// ✅ Recapitulando (Terceira aula)

// | Conceito                 | Explicação                                       |
// | ------------------------ | ------------------------------------------------ |
// | Armazenamento em array   | Usamos um array para simular o banco de dados    |
// | ID incremental           | Cada usuário tem um ID único gerado              |
// | `@Get()` e `@Get(':id')` | Rota para listar todos e buscar por ID           |
// | `@Param()`               | Captura parâmetros da URL                        |
// | `ParseIntPipe`           | Valida e converte o parâmetro `id` para `number` |
// | `NotFoundException`      | Retorna 404 caso o recurso não seja encontrado   |

// 📘 Aula 5 – Separando Regras e Preparando para o Banco de Dados

// Hoje você vai aprender:

// 1. O que é um repositório
// 2. Como separar a lógica de dados do Service
// 3. A preparar a aplicação para usar TypeORM ou Prisma
// 4. Como simular um repositório antes de ter um banco real

// 🧠 1. O que é um repositório?

// Um repositório é responsável por acessar os dados (buscar, criar, atualizar, deletar). Ele isola a lógica de acesso aos dados, facilitando testes e mudanças (como trocar o array por banco real).

// Em resumo:

// - Controller: recebe a requisição e chama o Service
// - Service: contém regras de negócio
// - Repository: lida com os dados

// 🏗️ 2. Estrutura do que vamos criar

// src/users/
// ├── dto/
// │   ├── create-user.dto.ts
// │   └── update-user.dto.ts
// ├── entities/
// │   └── user.entity.ts      👈 novo
// ├── users.controller.ts
// ├── users.module.ts
// ├── users.service.ts
// ├── users.repository.ts     👈 novo

// 🧱 3. Criando a entidade User

// Crie o arquivo src/users/entities/user.entity.ts:

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// 💾 4. Criando o UsersRepository

// Crie o arquivo src/users/users.repository.ts:

import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  private users: User[] = [];
  private nextId = 1;

  create(dto: CreateUserDto): User {
    const user: User = {
      id: this.nextId++,
      ...dto,
    };
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  update(id: number, dto: UpdateUserDto): User | undefined {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return undefined;
    this.users[index] = {
      ...this.users[index],
      ...dto,
    };
    return this.users[index];
  }

  remove(id: number): User | undefined {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return undefined;
    return this.users.splice(index, 1)[0];
  }
}

// 🔁 5. Refatorando o UsersService

// Abra users.service.ts:

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UsersRepository) {}

  create(dto: CreateUserDto) {
    const user = this.repo.create(dto);
    return {
      message: 'Usuário criado com sucesso!',
      user,
    };
  }

  findAll() {
    return this.repo.findAll();
  }

  findOne(id: number) {
    const user = this.repo.findOne(id);
    if (!user) throw new NotFoundException(`Usuário ${id} não encontrado`);
    return user;
  }

  update(id: number, dto: UpdateUserDto) {
    const user = this.repo.update(id, dto);
    if (!user) throw new NotFoundException(`Usuário ${id} não encontrado`);
    return {
      message: 'Usuário atualizado!',
      user,
    };
  }

  remove(id: number) {
    const user = this.repo.remove(id);
    if (!user) throw new NotFoundException(`Usuário ${id} não encontrado`);
    return {
      message: 'Usuário deletado!',
      user,
    };
  }
}

// 🧩 6. Registrando o repositório no módulo

// Abra users.module.ts e adicione o UsersRepository no providers:

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}

// 🔌 7. Preparando para usar um banco real (TypeORM ou Prisma)

// Agora que sua lógica de dados está separada, trocar o repositório para banco real será fácil.

// Com TypeORM (exemplo futuro):

// - Criar UserEntity com decorators (@Entity(), @Column())
// - Trocar o UsersRepository para usar @InjectRepository(UserEntity)

// Com Prisma:

// - Instalar Prisma, gerar client
// - Criar um PrismaService
// - Substituir métodos do repositório pelos do prisma.user

// 👉 Vamos fazer isso na próxima aula!

// ✅ Recapitulando (Quinta aula)

// | Conceito                       | Explicação                                 |
// | ------------------------------ | ------------------------------------------ |
// | Repositório                    | Lida com persistência de dados             |
// | Entidade (`User`)              | Define a estrutura do objeto salvo ou lido |
// | Service                        | Regras de negócio; chama o repositório     |
// | Separação de responsabilidades | Controller → Service → Repository          |
// | Preparação para banco          | Facilita trocar array por banco real       |

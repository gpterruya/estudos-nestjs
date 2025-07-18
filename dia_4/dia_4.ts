// 📘 Aula 4 – Atualizando e Deletando Usuários (PUT e DELETE)

// Hoje vamos:

// 1. Criar uma rota PUT para atualizar um usuário
// 2. Criar uma rota DELETE para remover um usuário
// 3. Usar DTO para atualização
// 4. Continuar com o armazenamento em memória

// 🔁 1. Criando o DTO de atualização

// Vamos criar um DTO onde todos os campos são opcionais, já que nem todo campo precisa ser atualizado.

// 🧠 Lembrete:

// PartialType transforma todos os campos do DTO em opcionais.

// nest g dto update-user --flat --no-spec --path src/users/dto

// No arquivo src/users/dto/update-user.dto.ts, adicione:

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

// ✍️ 2. Atualizando o serviço (users.service.ts)

// Adicione:

import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  // ... create, findAll, findOne como antes

  update(id: number, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }

    this.users[index] = {
      ...this.users[index],
      ...updateUserDto,
    };

    return {
      message: 'Usuário atualizado com sucesso!',
      user: this.users[index],
    };
  }

  remove(id: number) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }

    const removedUser = this.users.splice(index, 1)[0];

    return {
      message: 'Usuário removido com sucesso!',
      user: removedUser,
    };
  }
}

// 🌐 3. Criando as rotas PUT e DELETE no controller

// No users.controller.ts, adicione:

import { Put, Delete } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

// ...

@Put(':id')
update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
  return this.usersService.update(id, updateUserDto);
}

@Delete(':id')
remove(@Param('id', ParseIntPipe) id: number) {
  return this.usersService.remove(id);
}

// 📬 4. Testando as novas rotas

// a) Atualizar usuário (PUT)

// PUT http://localhost:3000/users/1

// Body:
// {
//   "name": "Maria Clara",
//   "password": "novaSenha123"
// }

// b) Deletar usuário (DELETE)

// DELETE http://localhost:3000/users/1

// ❗ Tratamento de Erros

// Se tentar atualizar ou deletar um ID que não existe, você verá:

// {
//   "statusCode": 404,
//   "message": "Usuário com id 999 não encontrado",
//   "error": "Not Found"
// }

// Isso é gerado automaticamente pelo NotFoundException.

// ✅ Recapitulando (Quarta aula)

// | Conceito               | Explicação                                                |
// | ---------------------- | --------------------------------------------------------- |
// | `@Put()`               | Cria rota para atualizar                                  |
// | `@Delete()`            | Cria rota para remover                                    |
// | `PartialType`          | Transforma um DTO em versão com todos os campos opcionais |
// | `@Body()`              | Captura o corpo da requisição                             |
// | `findIndex` + `splice` | Usado para localizar e remover um item do array           |
// | `NotFoundException`    | Retorna 404 se o recurso não for encontrado               |

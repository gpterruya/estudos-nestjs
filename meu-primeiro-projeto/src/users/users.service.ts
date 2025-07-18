import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface User {
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

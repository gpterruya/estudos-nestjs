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

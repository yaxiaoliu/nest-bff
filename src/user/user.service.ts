import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersReposotory: Repository<User>,
  ) {}

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.usersReposotory.findOneBy({
      id,
    });
  }

  findAll() {
    return this.usersReposotory.find();
  }

  removeOne(id: number) {
    this.usersReposotory.delete(id);
  }

  async update(id: number, user: User) {
    const oldUser = await this.findOne(id);
    if (!oldUser) {
      throw new BadRequestException(`User ${id} not found.`);
    }

    const entity = new User();
    entity.email = user.email;
    entity.sex = user.sex;
    entity.name = user.name;
    entity.cardId = user.cardId;

    const errors = await validate(entity, {
      skipMissingProperties: true,
    });
    if (errors.length > 0) {
      throw new BadRequestException(
        errors.map((it) => it.property).join(', ') + ' validate failed.',
      );
    }

    this.usersReposotory.update(
      {
        id,
      },
      entity,
    );
  }

  async insert(user: User) {
    const exist = await this.usersReposotory.exist({
      where: {
        cardId: user.cardId,
      },
    });
    if (exist) {
      throw new BadRequestException(`User has exist.`);
    }
    const entity = new User();

    entity.name = user.name;
    entity.email = user.email;
    entity.cardId = user.cardId;
    entity.sex = user.sex;
    entity.password = user.password;
    this.usersReposotory.save(entity);
  }
}

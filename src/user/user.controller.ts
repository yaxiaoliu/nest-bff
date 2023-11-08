import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findUser(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.removeOne(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() user: User) {
    return this.userService.update(id, user);
  }

  @Post()
  createUser(@Body() user: User) {
    return this.userService.insert(user);
  }
}

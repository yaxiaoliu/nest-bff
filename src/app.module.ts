import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChatgptModule } from './chatgpt/chatgpt.module';

@Module({
  imports: [
    UserModule,
    ChatgptModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'nest_bff',
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": process.env.HOST || "localhost",
      "port": 3306,
      "username": process.env.DB_USER || "root",
      "password": process.env.DB_PASSWORD || "",
      "database": process.env.DB_NAME || "todo-list",
      "entities":  ["dist/**/*.entity{.ts,.js}"],
      "synchronize": true
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

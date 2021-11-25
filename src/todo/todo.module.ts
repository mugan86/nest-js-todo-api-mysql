import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  controllers: [TodoController],
  imports: [TodoService],
  exports: [TodoService]
})
export class TodoModule {}

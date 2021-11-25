import { CreateTodoDto } from './dto/todo.dto';
import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
  ) {}

  create(todo: CreateTodoDto): Promise<Todo> {
    const newTodo = new Todo();
    newTodo.id = todo.id;
    newTodo.label = todo.label;
    newTodo.complete = todo.complete;
    return this.todosRepository.save(newTodo);
  }

  async findAll(): Promise<Array<Todo>> {
    return await this.todosRepository.find();
  }

  async findById(id: number): Promise<Todo> {
    return await this.todosRepository.findOne(id);
  }

  async update(id: number, todo: CreateTodoDto) {
      const selectUpdateTodo = await this.todosRepository.findOne(id);
      selectUpdateTodo.label = todo.label;
      selectUpdateTodo.complete = todo.complete;
      return this.todosRepository.save(selectUpdateTodo);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.todosRepository.delete(id);
  }
}

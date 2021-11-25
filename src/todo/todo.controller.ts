import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/todo.dto';
import { Todo } from './todo.interface';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  private readonly logger = new Logger(TodoController.name);
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Res() response) {
    this.logger.log('Handling create() request...');
    this.todoService
      .create(createTodoDto)
      .then((todo: Todo) => {
        response.status(HttpStatus.CREATED).json(todo);
      })
      .catch(() =>
        response.status(HttpStatus.FORBIDDEN).json('Todo NOT Create'),
      );
  }
  @Get()
  findAll(@Res() response) {
    this.logger.log('Handling findAll() request...');
    this.todoService
      .findAll()
      .then((todosList) => {
        response.status(HttpStatus.OK).json(todosList);
      })
      .catch(() =>
        response.status(HttpStatus.FORBIDDEN).json('Todo List not load'),
      );
  }
  @Get(':id')
  findById(@Param('id') id: number, @Res() response) {
    this.logger.log(`Handling findOne() request with id=${id}...`);
    this.todoService
      .findById(id)
      .then((todo) => {
        response.status(HttpStatus.OK).json(todo);
      })
      .catch(() =>
        response.status(HttpStatus.FORBIDDEN).json('Todo item not load'),
      );
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateTodoDto: CreateTodoDto,
    @Res() response,
  ) {
    this.logger.log(`Handling update() request with id=${id}...`);
    return this.todoService
      .update(id, updateTodoDto)
      .then((updateTodo) => {
        response.status(HttpStatus.OK).json(updateTodo);
      })
      .catch(() =>
        response.status(HttpStatus.FORBIDDEN).json('Todo item not update'),
      );
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Res() response) {
    this.logger.log(`Handling delete() request with id=${id}...`);
    return this.todoService
      .delete(id)
      .then((updateTodo) => {
        response.status(HttpStatus.OK).json(updateTodo);
      })
      .catch(() =>
        response.status(HttpStatus.FORBIDDEN).json('Todo item not delete'),
      );
  }
}

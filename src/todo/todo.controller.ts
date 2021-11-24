import { Body, Controller, Get, Post } from '@nestjs/common';
import { Todo } from './todo.interface';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    create(@Body() todo: Todo): void {
        this.todoService.create(todo);
    }
    @Get()
    findAddl(): Todo[] {
        return this.todoService.findAddl();
    }
}

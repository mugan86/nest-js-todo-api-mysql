import { Injectable } from '@nestjs/common';
import { Todo } from './todo.interface';

@Injectable()
export class TodoService {
    private storage: Todo[] = [];

    create(todo: Todo): void {
        const currentMaxId = Math.max(...this.storage.map((t: Todo) => t.id));
        todo.id = currentMaxId > 0 ? currentMaxId + 1 : 0;
        this.storage.push(todo);
    }

    findAddl(): Todo[] {
        return this.storage;
    }
}

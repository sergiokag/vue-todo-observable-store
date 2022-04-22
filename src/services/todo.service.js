import { catchError, map, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { TodoClass } from "../models/todo.model";

class TodoService {
    fetchTodos() {
        return ajax("https://jsonplaceholder.typicode.com/todos").pipe(
            map(({ response }) => {
                return response.splice(0, 10)
            }),
            map((list) => {
                return list.map(obj => ({
                    ...new TodoClass(obj.title),
                    id: obj.id,
                    isCompleted: obj.completed,
                }));
            }),
            catchError(error => {
                console.warn('error: ', error);
                return of([]);
            })
        );
    }
}

const todoService = new TodoService();

export default todoService;

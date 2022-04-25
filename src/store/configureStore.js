import { filter, map, take, tap } from 'rxjs';
import { ObservableStore } from '@codewithdan/observable-store';

import { storeActions } from './actions';
import { TodoClass } from '../models/todo.model';

class Store extends ObservableStore {
    #todoService;

    constructor(todoService) {
        super({ trackStateHistory: true });
        this.#todoService = todoService;

        this.todos$ = this.stateChanged.pipe(
            filter(Boolean),
            map(state => {
                return state.todos.filter(obj => !obj.isCompleted);
            }),
        );

        this.completed$ = this.stateChanged.pipe(
            filter(Boolean),
            map(state => {
                return state.todos.filter(obj => obj.isCompleted);
            }),
        );
    }

    fetchTodos() {
        return this.#todoService.fetchTodos().pipe(
            take(1),
            tap((todos) => {
                this.setState({ todos }, storeActions.INITIAL_STATE);
            })
        )
    }

    addTodo(todoName) {
        const todoItem = new TodoClass(todoName);
        const state = this.getState();
        const todos = [todoItem, ...state.todos];
        this.setState({ todos }, storeActions.ADD_TODO);
    }

    updateTodo(todo) {
        const state = this.getState();
        const foundTodo = state.todos.find((obj) => obj.id === todo.id);
        if (foundTodo) {
            const todos = state.todos.map(obj => {
                if (obj.id === todo.id) {
                    return {
                        ...obj,
                        ...todo,
                    };
                }

                return obj;
            });
            this.setState({ todos }, storeActions.UPDATE_TODO);
        }
    }

    clearLists() {
        const todos = [];
        this.setState({ todos }, storeActions.CLEAR_LISTS);
    }
}

const configureStore = (todoService) => new Store(todoService);

export default configureStore;

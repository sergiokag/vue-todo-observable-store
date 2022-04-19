import { filter, map, take, tap } from 'rxjs';
import { ObservableStore } from '@codewithdan/observable-store';

import { storeActions } from './actions';
import { TodoClass } from '../models/todo.model';
import todoService from '../services/todo.service';

class Store extends ObservableStore {

    constructor() {
        super({ trackStateHistory: true });

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

        this.fetchTodos().subscribe();
    }

    fetchTodos() {
        return todoService.fetchTodos().pipe(
            take(1),
            tap((todos) => {
                this.setState({ todos }, storeActions.INITIAL_STATE);
            })
        )
    }

    addTodo(todoName) {
        const todoItem = new TodoClass(todoName);
        const state = this.getState();
        const todos = [...state.todos, todoItem];
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
        this.setState({ todos }, storeActions.ClEAR_LISTS);
    }
}

const configureStore = () => new Store();

export default configureStore;

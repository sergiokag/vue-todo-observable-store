import { ObservableStore } from '@codewithdan/observable-store';
import { storeActions } from './actions';

class Store extends ObservableStore {
    constructor() {
        const initialState = {
            todos: []
        };
        super({ trackStateHistory: true });
        this.setState(initialState, storeActions.INITIAL_STATE);
    }

    addTodo(todo) {
        const state = this.getState();
        const todos = [...state.todos, todo];
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
}

const store = new Store();

export default store;

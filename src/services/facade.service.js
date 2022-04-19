import configureStore from '../store/configureStore';

class FacadeService {
    #store;

    constructor() {
        this.#store = configureStore();
        this.stateChanged$ = this.#store.stateChanged;
        this.selectTodos$ = this.#store.todos$;
        this.completed$ = this.#store.completed$;
    }

    addTodo(todoName) {
        this.#store.addTodo(todoName);
    }

    getTodos() {
        return this.#store.getTodos();
    }

    updateList(todo) {
        this.#store.updateTodo(todo);
    }

    clearLists() {
        this.#store.clearLists();
    }
}

const facadeService = new FacadeService();

export default facadeService;

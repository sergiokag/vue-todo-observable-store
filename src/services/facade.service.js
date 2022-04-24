import store from "../store";

class FacadeService {
    #store;

    constructor(store) {
        this.#store = store;
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

    fetchTodos() {
        return this.#store.fetchTodos();
    }

    updateList(todo) {
        this.#store.updateTodo(todo);
    }

    clearLists() {
        this.#store.clearLists();
    }
}

const facadeService = new FacadeService(store);

export default facadeService;

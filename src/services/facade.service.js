import store from '../store/configureStore';

class FacadeService {
    constructor() {
        this.stateChanged$ = store.stateChanged;
        this.selectTodos$ = store.todos$;
        this.completed$ = store.completed$;
    }

    addTodo(todoName) {
        store.addTodo(todoName);
    }

    getTodos() {
        return store.getTodos();
    }

    updateList(todo) {
        store.updateTodo(todo);
    }

    clearLists() {
        store.clearLists();
    }
}

const facadeService = new FacadeService();

export default facadeService;

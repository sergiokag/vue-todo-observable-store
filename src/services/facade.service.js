import store from '../store/configureStore';

class FacadeService {
    constructor() {
        this.stateChanged$ = store.stateChanged;
    }

    addTodo(todo) {
        store.addTodo(todo);
    }

    getTodos() {
        return store.getTodos();
    }

    updateList(todo) {
        store.updateTodo(todo);
    }

}

const facadeService = new FacadeService();

export default facadeService;

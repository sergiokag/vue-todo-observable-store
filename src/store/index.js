import todoService from "../services/todo.service";
import configureStore from "./configureStore";

const store = configureStore(todoService);
export default store;
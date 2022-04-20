import configureStore from "./configureStore"
import todoService from "../services/todo.service";
import { of } from "rxjs";

describe('Store', () => {
    let store;
    let mockFetchTodos;

    beforeEach(() => {
        // Arrange
        const resp = [{ id: 0, title: 'test todo', isCompleted: false }];
        mockFetchTodos = jest.spyOn(todoService, "fetchTodos").mockImplementation(() => of(resp));
        // Act
        store = configureStore(todoService);
    });

    it('should be created successfully', () => {
        // Arrange
        const length = store.getState().todos.length;

        // Assert
        expect(store).toBeTruthy();
        expect(mockFetchTodos).toHaveBeenCalled();
        expect(length).toBe(1);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    })
})
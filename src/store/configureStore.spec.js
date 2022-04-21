import configureStore from "./configureStore"
import todoService from "../services/todo.service";
import { of } from "rxjs";

describe('Store', () => {
    it('should be created successfully', () => {
        // Arrange
        // Act
        const store = configureStore(todoService);

        // Assert
        expect(store).toBeTruthy();
    });

    it('should have one list item in the store', () => {
        // Arrange
        const resp = [{ id: 0, title: 'test todo', isCompleted: false }];
        const mockFetchTodos = jest.spyOn(todoService, "fetchTodos").mockImplementation(() => of(resp));

        // Act
        const store = configureStore(todoService);

        // Assert
        expect(mockFetchTodos).toHaveBeenCalled();
        expect(store.getState().todos.length).toBe(1);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    })
})
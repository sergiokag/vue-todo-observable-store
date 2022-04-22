import { of } from "rxjs";
import configureStore from "./configureStore"
import todoService from "../services/todo.service";

describe('Store', () => {
    it('should be created successfully', () => {
        // Arrange
        // Act
        const store = configureStore(todoService);

        // Assert
        expect(store).toBeTruthy();
    });

    it('should have one list item in the store', (done) => {
        // Arrange
        const resp = [{ id: 0, title: 'test todo', isCompleted: false }];
        jest.spyOn(todoService, "fetchTodos").mockImplementation(() => of(resp));

        const store = configureStore(todoService);

        // Act
        store.fetchTodos().subscribe(() => {
            // Assert
            expect(store.getState().todos.length).toBe(1);
            done();
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    })
})
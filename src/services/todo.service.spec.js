import { of, throwError } from "rxjs";
import { ajax } from "rxjs/ajax";
import todoService from "./todo.service";

jest.mock('rxjs/ajax', () => {
    return {
        ajax: jest.fn()
    }
});

describe('fetchTodos', () => {
    beforeEach(() => jest.resetModules());

    it('should return an appropiate ui list', (done) => {
        // Arrange
        ajax.mockImplementation(() => of({
            response: [{
                "userId": 1,
                "id": 1,
                "title": "delectus aut autem",
                "completed": false
            }]
        }));
        const service = todoService;

        // Act
        service.fetchTodos().subscribe((list) => {
            // Assert
            expect(list.length).toBe(1);
            expect(list[0].isCompleted).toBe(false);
            done();
        })
    });

    it('should return an empty todo list', (done) => {
        // Arrange
        ajax.mockImplementation(() => throwError(() => 'Something went wrong!'));
        const service = todoService;
        // Act
        service.fetchTodos().subscribe((list) => {
            // Assert
            expect(list.length).toBe(0);
            done();
        })
    });
});

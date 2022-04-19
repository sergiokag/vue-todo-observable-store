import configureStore from "./configureStore"

describe('Store', () => {
    it('should be created successfully', () => {
        // Arrange
        // Act
        const store = configureStore();
        // Assert
        expect(store).toBeTruthy();
    })
})
export class TodoClass {
    title = '';
    id = -1;
    isCompleted = false;

    constructor(title) {
        this.title = title;
        this.id = Math.random() * Date.now();
    }
}

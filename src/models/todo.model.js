export class TodoClass {
    name = '';
    id = -1;
    isCompleted = false;

    constructor(name) {
        this.name = name;
        this.id = Math.random() * Date.now();
    }
}

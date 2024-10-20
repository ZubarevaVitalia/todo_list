import { makeAutoObservable } from "mobx";

class TodoStore {
    todos = [];
    highlighted = 'none';

    constructor() {
        makeAutoObservable(this);
    }

    get completedTodosCount() {
        return this.todos.filter(
          todo => todo.completed === true
        ).length;
    }

    addTodoItem(text, id) {
        const completedTodos = this.completedTodosCount;
        this.todos.splice(this.todos.length - completedTodos, 0, {
            id,
            text,
            completed: false,
            highlighted: false,
        })
        switch(this.highlighted){
            case 'odd':
                this.highlighted = 'none';
                this.highlightOdd();
                break;
            case 'even':
                this.highlighted = 'none';
                this.highlightEven();
                break;
            default:
                break;
        }
    }

    removeTodoItem(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
    }

    completeTodoItem(id) {
        const todoIndx = this.todos.findIndex((todo) => todo.id === id);
        const todo = this.todos[todoIndx];
        if (todoIndx !== -1) {
            if(todo.completed){
                todo.completed = false;

                const completedTodos = this.completedTodosCount;
                this.todos.splice(todoIndx, 1);
                this.todos.splice(this.todos.length - completedTodos, 0, todo);
            } else {
                todo.completed = true;
                this.todos.splice(todoIndx, 1);
                this.todos.push(todo);
            }
            switch(this.highlighted){
                case 'odd':
                    this.highlighted = 'none';
                    this.highlightOdd();
                    break;
                case 'even':
                    this.highlighted = 'none';
                    this.highlightEven();
                    break;
                default:
                    break;
            }
        }
    }

    updateTodoItem(id, newText) {
        const todo = this.todos.find((todo) => todo.id === id);
        if (todo) {
            todo.text = newText;
        }
    }

    highlightEven() {
        switch(this.highlighted){
            case 'even':
                this.highlighted = 'none'
                this.todos = this.todos.map((todo, index) => ({
                    ...todo,
                    highlighted: false,
                }));
                break;
            default:
                this.highlighted = 'even'
                this.todos = this.todos.map((todo, index) => ({
                    ...todo,
                    highlighted: index % 2 === 0 ? true : false,
                }));
        }
    }

    highlightOdd() {
        switch(this.highlighted){
            case 'odd':
                this.highlighted = 'none'
                this.todos = this.todos.map((todo, index) => ({
                    ...todo,
                    highlighted: false,
                }));
                break;
            default:
                this.highlighted = 'odd'
                this.todos = this.todos.map((todo, index) => ({
                    ...todo,
                    highlighted: index % 2 !== 0 ? true : false,
                }));
        }
    }

    removeFirstItem() {
        if (this.todos.length > 0) {
            this.todos.shift();
        }
    }

    removeLastItem() {
        if (this.todos.length > 0) {
            this.todos.pop();
        }
    }
}

const todoStore = new TodoStore();
export default todoStore;
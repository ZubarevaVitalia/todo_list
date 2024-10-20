import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import todoStore from "./stores/TodoStore";
import "./TodoList.css";

const TodoList = observer(() => {
    const [newTodo, setNewTodo] = useState("");
    const [ids, setNewIds] = useState(0);

    const handleAddTodo = () => {
        if (newTodo.trim()) {
        todoStore.addTodoItem(newTodo, ids);
        setNewTodo("");
        setNewIds(ids + 1);
        }
    };

  return (
    <div>
        <div class="header">
            <h1>Todo List</h1>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Enter a new todo"
            />
            <button onClick={handleAddTodo} className="addBtn">Add</button>
        </div>
      

      <ul>
        {todoStore.todos.map((todo) => {
            return(
          <li
            key={todo.id}
            style={{
                textDecoration: todo.completed ? "line-through" : "none",
                backgroundColor:  todo.completed 
                    ? todo.highlighted ? "#ce6808" : "#888" 
                    : todo.highlighted ? "#ff993a" : "white",
                color: todo.completed ? "white" : "black",
                
            }}
          >
            {todo.text}
            <div className="todoButtons">
                <button className="close" onClick={() => todoStore.completeTodoItem(todo.id)}>Complete</button>
                <button className="close" onClick={() => todoStore.removeTodoItem(todo.id)}>Remove</button>
            </div>
          </li>
        )})}
      </ul>

      <div className="buttons">
        <button onClick={() => todoStore.highlightEven()}>Highlight Even</button>
        <button onClick={() => todoStore.highlightOdd()}>Highlight Odd</button>
        <button onClick={() => todoStore.removeFirstItem()}>Remove First</button>
        <button onClick={() => todoStore.removeLastItem()}>Remove Last</button>
      </div>
    </div>
  );
});

export default TodoList;
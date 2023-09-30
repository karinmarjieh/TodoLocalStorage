import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (task.trim() !== "") {
      setTodos([...todos, { task: task, completed: false }]);
      setTask("");
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <>
      <div className="App">
        <h1>Todo App</h1>
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTodo}>Add Task</button>
        <ul>
          {todos.map((todo, index) => (
            <li
              key={index}
              className={todo.completed ? "completed" : ""}
              onClick={() => toggleTodo(index)}
            >
              {todo.task}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTodo(index);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import "./Todo.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export const TodoWrapper = () => {
  const { user, isAuthenticated } = useAuth0();
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []); // Load todos from local storage or initialize as empty array
  const [editingId, setEditingId] = useState(null); // Track the id of the todo being edited

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos)); // Update local storage whenever todos change
  }, [todos]);

  const addTodo = (todo) => {
    console.log('test')
    const newTodo = { id: uuidv4(), task: todo, completed: false, isEditing: false };
    
    setTodos([...todos, newTodo]);
    const titleTest = {
      user:user
    };
    axios.post("http://localhost:5000/addTodo", titleTest, {
      headers: {
        "Content-Type": "application/json", 
      }
    })
    .then((response) => {
      console.log('Todo added:', response.data);
    })
    .catch((error) => {
      console.error('There has been a problem with your post operation:', error);
    });
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));

    const todoData = {user: user};
    axios.post("http://localhost:5000/todosDelete", todoData, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response) => {
      console.log('Todo deleted:', response.data);
      
    })
    .catch((error) => {
      console.error('There has been a problem with your post operation:', error);
    });
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const editTodo = (id) => {
    setEditingId(id); // Set the editingId to the id of the todo being edited
  };

  const editTask = (task, id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task } : todo
    );
    setTodos(updatedTodos);
    setEditingId(null); // Reset editingId after editing is done
  };

  return (
    <div className="TodoWrapper">
      <h1 className="task-title">My Tasks for Today</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) =>
        editingId === todo.id ? (
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
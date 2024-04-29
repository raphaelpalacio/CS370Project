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
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track the id of the todo being edited

  // Load todos from local storage when the component mounts
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Update local storage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    const newTodo = { id: uuidv4(), task: todo, completed: false }; // Removed isEditing
    setTodos([...todos, newTodo]);
    console.log("User ID:", user.sub);
    console.log(user);

    const titleTest = {
      user: user,
    };

    axios
      .post("http://localhost:5000/addTodo", titleTest, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Todo added:", response.data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your post operation:",
          error
        );
      });
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    console.log("User ID:", user.sub);
    console.log(user);
    const todoData = { user: user };
    axios
      .post("http://localhost:5000/todosDelete", todoData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Todo deleted:", response.data);
        // You might want to update your state here if needed
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your post operation:",
          error
        );
        // Handle any errors here
        // Optionally, remove the optimistically added todo if the POST fails
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

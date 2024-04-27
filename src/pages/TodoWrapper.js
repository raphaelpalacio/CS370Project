import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import "./Todo.css";
import axios from "axios";
import { User, useAuth0 } from "@auth0/auth0-react";

export const TodoWrapper = () => {
  const { user, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
   
  }

  const [todos, setTodos] = useState([]);

  // similar logic to this: user_id = session.get('user_id')
  // how to check session in inspector
  const addTodo = (todo) => {
    console.log('test')
    // Optimistically add the todo to the UI
    const newTodo = { id: uuidv4(), task: todo, completed: false, isEditing: false };
    
    setTodos([...todos, newTodo]);
    console.log('User ID:', user.sub); 
    console.log(user)
   

    const titleTest = {
      user:user
    };

    axios.post("http://localhost:5000/addTodo", titleTest, {
      headers: {
        "Content-Type": "application/json",
        // Remove the Access-Control-Allow-Origin header, it's a response header set by the server
        // Add Authorization header with your actual JWT token
        // "Authorization": "Bearer your_actual_token_here",

        // comment out the JTW function 
      }
    })
    .then((response) => {
      console.log('Todo added:', response.data);
      // You might want to update your state here if needed
    })
    .catch((error) => {
      console.error('There has been a problem with your post operation:', error);
      // Handle any errors here
      // Optionally, remove the optimistically added todo if the POST fails
    });
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    console.log('User ID:', user.sub); 
    console.log(user)

    const todoData = {user: user};
    axios.post("http://localhost:5000/todosDelete", todoData, {
      headers: {
        "Content-Type": "application/json",
        // Remove the Access-Control-Allow-Origin header, it's a response header set by the server
        // Add Authorization header with your actual JWT token
        // "Authorization": "Bearer your_actual_token_here",

        // comment out the JTW function 
      }
    })
    .then((response) => {
      console.log('Todo deleted:', response.data);
      // You might want to update your state here if needed
    })
    .catch((error) => {
      console.error('There has been a problem with your post operation:', error);
      // Handle any errors here
      // Optionally, remove the optimistically added todo if the POST fails
    });
  };

  const toggleComplete = async (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    try {
      const response = await axios.put(
        `http://localhost:5000/todos/togglecomplete/${id}`
      );
      console.log(response.data);
    } catch (error) {
      console.error("Failed to toggle todo completion:", error);
    }
  };

  const editTask = async (task, id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    );
    setTodos(updatedTodos);

    try {
      const response = await axios.put(`http://localhost:5000/todos/${id}`, {
        description: task,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Failed to edit task:", error);
    }
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1 className="task-title">My Tasks for Today</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) =>
        todo.isEditing ? (
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
import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import "./Todo.css";
import axios from 'axios';

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
    const todoData = {
      title: todo,
      description: "",
    };
    fetch("http://localhost:5000/todos",
      {
        method: "POST", 
        headers: {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin' :  '*'
        },
        body: JSON.stringify(todoData),
      }
    ).then((res) => 
      res.json().then((data) => {
        console.log(data);
      })
    );
    
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));

    const todoData = {
      
    };
    fetch("http://localhost:5000/todos/"+ id.toString(),
      {
        method: "DELETE", 
        headers: {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin' :  '*'
        },
        body: JSON.stringify(todoData),
      }
    ).then((res) => 
      res.json().then((data) => {
        console.log(data);
      })
    );

  };
  
  

  const toggleComplete = async (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    try {
      const response = await axios.put(`http://localhost:5000/todos/togglecomplete/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error('Failed to toggle todo completion:', error);
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
      console.error('Failed to edit task:', error);
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
      {todos.map((todo) => (
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

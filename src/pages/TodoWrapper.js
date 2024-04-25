import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import "./Todo.css";
import axios from 'axios';

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = async (todo) => {
    const newTodo = { id: uuidv4(), task: todo, completed: false, isEditing: false };
    setTodos([...todos, newTodo]);

    try {
      const res = await axios({
        method: 'post',
        url: "http://localhost:5000/todos",
        data: {
          title: todo,
          description: "",
        }
      });
      console.log(res.data);
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/todos/${id}`);
      console.log(res.data);
      if (res.status === 200) {
        setTodos(todos.filter((todo) => todo.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
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
      ))}
    </div>
  );
};

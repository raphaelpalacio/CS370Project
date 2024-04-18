import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import "./Todo.css";


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
  
  

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    const todoData = {
      
    };
    fetch("http://localhost:5000/todos/togglecomplete/" + id.toString(),
      {
        method: "PUT", 
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

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
    const todoData = {
      description: task,
    };
    fetch("http://localhost:5000/todos/" + id.toString(),
      {
        method: "PUT", 
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

  return (
    <div className="TodoWrapper">
      <h1 className="task-title">My Tasks for Today</h1>
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
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

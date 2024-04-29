import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import "./Todo.css";
<<<<<<< HEAD
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
=======
import axios from 'axios';
>>>>>>> 0c40313596243e7f08ce873033781ca0ffe1d070

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

<<<<<<< HEAD
  const addTodo = (todo) => {
    const newTodo = { id: uuidv4(), task: todo, completed: false }; // Removed isEditing
    setTodos([...todos, newTodo]);
    console.log('User ID:', user.sub); 
    console.log(user)
   

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
    console.log('User ID:', user.sub); 
    console.log(user)
    const todoData = {user: user};
    axios.post("http://localhost:5000/todosDelete", todoData, {
      headers: {
        "Content-Type": "application/json",
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

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
=======
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
>>>>>>> 0c40313596243e7f08ce873033781ca0ffe1d070
  };

  const editTodo = (id) => {
    setEditingId(id); // Set the editingId to the id of the todo being edited
  };

<<<<<<< HEAD
  const editTask = (task, id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task } : todo
    );
    setTodos(updatedTodos);
    setEditingId(null); // Reset editingId after editing is done
  };

=======
>>>>>>> 0c40313596243e7f08ce873033781ca0ffe1d070
  return (
    <div className="TodoWrapper">
      <h1 className="task-title">My Tasks for Today</h1>
      <TodoForm addTodo={addTodo} />
<<<<<<< HEAD
      {todos.map((todo) =>
        editingId === todo.id ? (
=======
      {todos.map((todo) => (
        todo.isEditing ? (
>>>>>>> 0c40313596243e7f08ce873033781ca0ffe1d070
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

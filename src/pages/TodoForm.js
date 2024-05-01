import React, {useState} from 'react'
import "./Todo.css";

export const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState('');
  

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value) {
          addTodo(value);
          setValue('');
        }
      };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='task' />
    <button type="submit" className='todo-btn'>Add</button>
  </form>
  )
}

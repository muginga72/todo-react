import React, { useState, useRef } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

// Retained local state for input, passed new todo to parent via onAddTodo
function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (workingTodoTitle.trim()) {
      onAddTodo(workingTodoTitle.trim());
      setWorkingTodoTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInputWithLabel
        elementId="todoTitle"
        labelText="Todo"
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        inputRef={inputRef}
        style={{ marginRight: "20px" }}
      />
      <button
        type="submit"
        disabled={workingTodoTitle.trim() === ''}
        style={{ color: "darkgreen", marginLeft: "10px", borderBottom: "2px solid darkgreen" }}
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
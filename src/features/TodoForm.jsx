import React, { useState, useRef } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle('');
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
      <button type="submit" disabled={workingTodoTitle.trim() === ''}
        style={{color: "blue", marginLeft: "10px", borderBottom: "2px solid blue" }}
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
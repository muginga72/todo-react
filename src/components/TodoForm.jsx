import React, { useState } from 'react';

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="todoTitle" style={{ marginRight: '10px' }}>Todo</label>
      <input
        type="text"
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        placeholder="Enter a todo"
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
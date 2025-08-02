import React from 'react';

function TodoForm({ onAddTodo }) {
  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    const title = e.target.title.value; // Get input value

    if (!title.trim()) return; // prevent empty todos

    const newTodo = {
      title,
      id: Date.now(), // Unique ID based on timestamp

    };

    onAddTodo(newTodo); // Call the parent handler with new todo
    e.target.title.value = ''; // Clear input
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="todoTitle" style={{ marginRight: '10px' }}>Todo</label>
      <input
        type="text"
        name="title"
        placeholder="Enter a todo"
        required
      />
      <button type="submit" style={{color: "blue", marginLeft: "10px", borderBottom: "2px solid blue" }}>Add</button>
    </form>
  );
}

export default TodoForm;
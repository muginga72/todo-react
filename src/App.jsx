import React from 'react';
import TodoListItem from './TodoListItem';
import TodoForm from './components/TodoForm';

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      {/* Rendering todo list and the form */}
      <TodoForm/>
      <TodoListItem />
    </div>
  );
}

export default App;

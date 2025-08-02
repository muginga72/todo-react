import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todoList, setTodoList] = useState([]); // Initial empty array

  // Updater function to add new todos
  const addTodo = (newTodo) => {
    setTodoList((prevTodos) => [...prevTodos, newTodo]);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;

import React from 'react';

function TodoListItem({ todo, onCompleteTodo }) {
  return (
    <form>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => onCompleteTodo(todo.id)} // triggers favorite-style logic
      />
      {todo.title}
    </form>
  );
}

export default TodoListItem;
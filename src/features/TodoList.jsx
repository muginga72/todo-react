import React from 'react';
import TodoListItem from './TodoListItem';

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, onToggleTodo }) {
  // Filter out completed todos
  const activeTodos = todoList.filter(todo => !todo.isCompleted);

  return (
    <div>
      {activeTodos.length === 0 ? (
        <p style={{ marginLeft: "30px" }}>Add todo above to get started</p>
      ) : (
        <ul>
          {activeTodos.map(todo => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
              onToggleTodo={onToggleTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
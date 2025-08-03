import React from 'react';
import TodoListItem from './TodoListItem';

function TodoList({ todoList, onCompleteTodo, onUpdateTodo }) {
  // Filter out completed todos
  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);

  return (
    <div>
      {filteredTodoList.length === 0 ? (
        <p style={{marginLeft: "30px"}}>Add todo above to get started</p>
      ) : (
        <ul>
          {filteredTodoList.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
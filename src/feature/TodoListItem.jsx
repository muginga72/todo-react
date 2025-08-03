// import React from 'react';

// function TodoListItem({ todo, onCompleteTodo }) {
//   return (
//     <form>
//       <input
//         type="checkbox"
//         checked={todo.isCompleted}
//         onChange={() => onCompleteTodo(todo.id)} // triggers favorite-style logic
//       />
//       {todo.title}
//     </form>
//   );
// }

// export default TodoListItem;

import React, { useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabelTextInputWithLabel';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  const handleEdit = (e) => {
    setWorkingTitle(e.target.value);
  };

  const handleCancel = () => {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  };

  const handleUpdate = (e) => {
    if (!isEditing) return;
    e.preventDefault();

    onUpdateTodo({ ...todo, title: workingTitle });
    setIsEditing(false);
  };

  return (
    <>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel
              elementId={`edit-${todo.id}`}
              labelText="Edit Todo"
              value={workingTitle}
              onChange={handleEdit}
            />
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="button" onClick={handleUpdate}>
              Update
            </button>
          </>
        ) : (
          <>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => onCompleteTodo(todo.id)}
            />
            <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          </>
        )}
      </form>
    </>
  );
}

export default TodoListItem;
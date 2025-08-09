import React, { useState } from 'react';
import styles from './styles/TodoListItem.module.css';
import TextInputWithLabel from '../shared/TextInputWithLabel';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  const handleEdit = (e) => setWorkingTitle(e.target.value);
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
    <div className={`${styles.item} ${todo.isCompleted ? styles.completed : ''}`}>
      <form onSubmit={handleUpdate} className={styles.form}>
        {isEditing ? (
          <>
            <TextInputWithLabel
              elementId={`edit-${todo.id}`}
              labelText="Edit Todo"
              value={workingTitle}
              onChange={handleEdit}
            />
            <button type="button" onClick={handleCancel} className={`${styles.button} ${styles.cancel}`}>
              Cancel
            </button>
            <button type="submit" className={styles.button}>
              Update
            </button>
          </>
        ) : (
          <>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => onCompleteTodo(todo.id)}
              className={styles.checkbox}
            />
            <span className={styles.title} onClick={() => setIsEditing(true)}>
              {todo.title}
            </span>
          </>
        )}
      </form>
    </div>
  );
}

export default TodoListItem;
import React from 'react';

/* Array to store a variable TodoList */
const todoList = [
  {
    id: '0',
    title: 'Complete assignment Lesson 1-1'
  },
  {
    id: '1',
    title: 'Upload it to GitHub'
  },
  {
    id: '2',
    title: 'Submit your PR!'
  },
];

function TodoList() {
  return (
    <ul>
      {/* Rendering todo list */}
      {todoList.map(function (listItem) {
        return <li key={listItem.id}>
          <span>{listItem.title}</span>
        </li>
        }
      )}
    </ul>
  );
}

export default TodoList;
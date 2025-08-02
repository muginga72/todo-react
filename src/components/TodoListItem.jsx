import React from "react";
function TodoListItem({ todo: { title } }) {
  return <li>{title}</li>;
}

export default TodoListItem;
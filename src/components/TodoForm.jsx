import React, {useState} from "react";

function TodoForm() {
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = (e) => {
    console.log(e);
    e.preventDefault();
    onAddTodo();
    setNewTodo('');
  }

  return(
    <form onSubmit={handleAddTodo}>
      <div>
        <label htmlFor="todoTitle">Title </label>
        <input type="text" name="title" id="todoTitle" required
          value={newTodo}
          placeholder="Add new todo"
        />
        <button style={{color: "blue"}}>Add</button>
      </div>
    </form>
  )
}

export default TodoForm;
import React from "react";

function TodoForm() {
  return(
    <form>
      <div>
        {/* <label>
          <html></html>
        </label> */}
        <input
          type="text"
          name="title"
          id="todoTitle"
          placeholder="Add new todo"
        />
        <button>Add</button>
      </div>
    </form>
  )
}

export default TodoForm;
import React, { useState, useEffect } from 'react';
import TodoList from './features/TodoList'
import TodoForm from './features/TodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [sortDirection, setSortDirection] = useState(null); // 'asc' | 'desc' | null
  const [filterTodos, SetFilterTodos] = useState('');

  const filteredAndSortedTodos = [...todoList]
  .filter((todo) =>
    todo.title.toLowerCase().includes(filterTodos.toLowerCase())
  )
  .sort((a, b) => {
    if (sortDirection === 'asc') {
      return a.title.localeCompare(b.title);
    } else if (sortDirection === 'desc') {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  // Fetch todos from API on mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        // Make a GET request to the mock API, limiting to 5 todos
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
        const data = await response.json(); // Parse the JSON response
        
        // Format the data to match our app's todo structure
        const formattedTodos = data.map((todo) => ({
          id: todo.id,                      // Unique identifier
          title: todo.title,                // Todo text
          isCompleted: todo.completed,      // Completion status 
        }));

        // Update the state with the fetched and formatted todos
        setTodoList(formattedTodos);

        // Log any errors that occur during the fetch
      } catch (error) {

        // This runs regardless of success or failure
        console.error('Error fetching todos:', error);
      } finally {
        console.log('Fetch attempt completed.');
      }
    };

    // Immediately invoke the async function
    fetchTodos();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleAddTodo = (title) => {
    const newTodo = {
      id: Date.now(),                         // Unique identifier
      title,                                  // Todo title
      isCompleted: false,                     // Completion status
    };
    
    // Add the new todo to the existing list by spreading the current array and appending the new item
    setTodoList([...todoList, newTodo]);  
  };

  const updateTodo = (editedTodo) => {
    const updatedTodos = todoList.map((todo) =>
      todo.id === editedTodo.id ? { ...editedTodo } : todo
    );
    setTodoList(updatedTodos);
  };

  const completeTodo = (id) => {
    const updatedTodos = todoList.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: true } : todo // favorite-style logic
    );
    setTodoList(updatedTodos); // update state with new array
  };

  console.log(todoList)

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList
        todoList={filteredAndSortedTodos}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search todos..."
          value={filterTodos}
          onChange={(e) => SetFilterTodos(e.target.value)}
          style={{ padding: '6px', marginRight: '10px' }}
        />

        <button onClick={() => SetFilterTodos('')} style={{ color: "darkgreen", borderBottom: "2px solid darkgreen"  }}>
          Search Todo
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setSortDirection('asc')} style={{ color: "blue", marginLeft: "10px", borderBottom: "2px solid blue" }}>
          Ascending
        </button>
        <button onClick={() => setSortDirection('desc')} style={{ marginRight: '10px', color: "blue", marginLeft: "10px", borderBottom: "2px solid blue"  }}>
          Descending
        </button>
        <button onClick={() => setSortDirection(null)} style={{ color: "brawn", borderBottom: "2px solid brown"  }}>
          Reset Sort
        </button>
      </div>
    </div>
  );
}

export default App;
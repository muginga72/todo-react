import React, { useReducer, useEffect, useMemo, useCallback, useRef, useState } from 'react';
import { todoReducer, initialState } from './reducers/todoReducer';
import TodoList from './features/TodoList'; 
import TodoForm from './features/TodoForm'; 
import Header from './features/Header';

function App() {
  // useReducer replaces multiple useState calls with centralized state logic
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Destructure state values from reducer-managed state
  const { todoList, sortDirection, filterTodos } = state;

  // Ref to directly manipulate the search input field (uncontrolled component)
  const searchInputRef = useRef(null);

  // Local state to cache search inputs for performance optimization
  const [cachedResults, setCachedResults] = useState({});

  // Ref to manage throttling of search input changes
  const throttleTimeout = useRef(null);

  // Fetch initial todos from external API when component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5'); // Fetch 5 todos
        const data = await response.json(); // Parse JSON response
        const formattedTodos = data.map(todo => ({
          id: todo.id,
          title: todo.title,
          isCompleted: todo.completed,
        }));
        dispatch({ type: 'SET_TODOS', payload: formattedTodos }); // Store todos in reducer state
      } catch (error) {
        console.error('Error fetching todos:', error); // Log any errors
      }
    };
    fetchTodos(); // Trigger fetch
  }, []); // Empty dependency array ensures this runs only once

  // Memoize filtered and sorted todos to avoid unnecessary recalculations
  const filteredAndSortedTodos = useMemo(() => {
    const filtered = todoList.filter(todo =>
      todo.title.toLowerCase().includes(filterTodos.toLowerCase()) // Filter by search term
    );

    const sorted = [...filtered].sort((a, b) => {
      if (sortDirection === 'asc') return a.title.localeCompare(b.title); // Ascending sort
      if (sortDirection === 'desc') return b.title.localeCompare(a.title); // Descending sort
      return 0; // No sort
    });

    return sorted; // Return final list
  }, [todoList, filterTodos, sortDirection]); // Recompute only when dependencies change

  // Handle search input changes with throttling and caching
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;

    if (cachedResults[value]) {
      dispatch({ type: 'SET_FILTER', payload: value }); // Use cached result
      return;
    }

    if (throttleTimeout.current) clearTimeout(throttleTimeout.current); // Clear previous timeout

    throttleTimeout.current = setTimeout(() => {
      dispatch({ type: 'SET_FILTER', payload: value }); // Dispatch filter update
      setCachedResults(prev => ({ ...prev, [value]: true })); 
    }, 300); // Delay execution by 300ms
  }, [cachedResults]); // Recreate callback only when cache changes

  // Clear search input and reset filter state
  const handleClearSearch = () => {
    dispatch({ type: 'SET_FILTER', payload: '' }); // Reset filter
    if (searchInputRef.current) {
      searchInputRef.current.value = ''; // Clear input field manually
    }
  };

  // Add a new todo item
  const handleAddTodo = useCallback((title) => {
    const newTodo = {
      id: Date.now(), // Unique ID based on timestamp
      title,
      isCompleted: false,
    };
    dispatch({ type: 'ADD_TODO', payload: newTodo }); // Dispatch add action
  }, []);

  // Update an existing todo item
  const updateTodo = useCallback((editedTodo) => {
    dispatch({ type: 'UPDATE_TODO', payload: editedTodo }); // Dispatch update action
  }, []);

  // Mark a todo as completed
  const completeTodo = useCallback((id) => {
    dispatch({ type: 'COMPLETE_TODO', payload: id }); // Dispatch complete action
  }, []);

  // Render the UI
  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column', // Stack children vertically
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', // Full viewport height
      textAlign: 'center' 
    }}>
      <div style={{ marginTop: '50px' }}>
        <Header /> {/* Optional header */}
      </div>

      <h1>Todo List</h1>

      <TodoForm onAddTodo={handleAddTodo} /> {/* Form to add new todos */}

      <div style={{ textAlign: 'left' }}>
        <TodoList
          todoList={filteredAndSortedTodos} // Pass filtered/sorted todos
          onCompleteTodo={completeTodo} // Handler to complete todos
          onUpdateTodo={updateTodo} // Handler to update todos
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search todos..."
          onChange={handleSearchChange} // Throttled search handler
          ref={searchInputRef} // Ref for manual clearing
          style={{ padding: '6px', marginRight: '10px' }}
        />
        <button
          onClick={handleClearSearch} // Clear search input
          style={{ color: "darkgreen", borderBottom: "2px solid darkgreen" }}
        >
          Clear Search
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => dispatch({ type: 'SET_SORT', payload: 'asc' })} // Sort ascending
          style={{ color: "blue", marginLeft: "10px", borderBottom: "2px solid blue" }}
        >
          Ascending
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_SORT', payload: 'desc' })} // Sort descending
          style={{ color: "blue", marginLeft: "10px", borderBottom: "2px solid blue" }}
        >
          Descending
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_SORT', payload: null })} // Reset sort
          style={{ color: "brown", borderBottom: "2px solid brown" }}
        >
          Reset Sort
        </button>
      </div>
    </div>
  );
}

export default App;
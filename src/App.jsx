import React, {
  useMemo,
  useCallback,
  useRef,
  useState,
  useContext,
  useEffect
} from 'react';

// Import the context provider and context object
import { TodoProvider, TodoContext } from './context/TodoContext';

// Import feature components
import TodoList from './features/TodoList';
import TodoForm from './features/TodoForm';
import Header from './features/Header';

// Main content component that consumes context
function AppContent() {
  // Access global state and dispatch from context
  const { state, dispatch } = useContext(TodoContext);

  // Destructure relevant pieces of state
  const { todoList, sortDirection, filterTodos } = state;

  // Ref for the search input field
  const searchInputRef = useRef(null);

  // Local state to cache search results and throttle input
  const [cachedResults, setCachedResults] = useState({});
  const throttleTimeout = useRef(null);

  // Fetch initial todos from external API on mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
        const data = await response.json();

        // Format the fetched todos to match local structure
        const formattedTodos = data.map(todo => ({
          id: todo.id,
          title: todo.title,
          isCompleted: todo.completed,
        }));

        // Dispatch action to set todos in global state
        dispatch({ type: 'SET_TODOS', payload: formattedTodos });
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [dispatch]); // Only re-run if dispatch changes

  // Memoize filtered and sorted todos for performance
  const filteredAndSortedTodos = useMemo(() => {
    // Filter todos based on search input
    const filtered = todoList.filter(todo =>
      todo.title.toLowerCase().includes(filterTodos.toLowerCase())
    );

    // Sort based on selected direction
    const sorted = [...filtered].sort((a, b) => {
      if (sortDirection === 'asc') return a.title.localeCompare(b.title);
      if (sortDirection === 'desc') return b.title.localeCompare(a.title);
      return 0; // No sort
    });

    return sorted;
  }, [todoList, filterTodos, sortDirection]);

  // Handle search input changes with throttling and caching
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;

    // Use cached result if available
    if (cachedResults[value]) {
      dispatch({ type: 'SET_FILTER', payload: value });
      return;
    }

    // Throttle input to avoid excessive dispatches
    if (throttleTimeout.current) clearTimeout(throttleTimeout.current);
    throttleTimeout.current = setTimeout(() => {
      dispatch({ type: 'SET_FILTER', payload: value });
      setCachedResults(prev => ({ ...prev, [value]: true }));
    }, 300);
  }, [cachedResults, dispatch]);

  // Clear search input and reset filter
  const handleClearSearch = () => {
    dispatch({ type: 'SET_FILTER', payload: '' });
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  };

  // Add a new todo item
  const handleAddTodo = useCallback((title) => {
    const newTodo = {
      id: Date.now(), // Unique ID based on timestamp
      title,
      isCompleted: false,
    };

    dispatch({ type: 'ADD_TODO', payload: newTodo });
  }, [dispatch]);

  // Render the UI
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        textAlign: 'center'
      }}
    >
      {/* Header section */}
      <div style={{ marginTop: '50px' }}>
        <Header />
      </div>

      <h1>Todo List</h1>

      {/* Form to add new todos */}
      <TodoForm onAddTodo={handleAddTodo} />

      {/* Display filtered and sorted todos */}
      <div style={{ textAlign: 'left' }}>
        <TodoList todoList={filteredAndSortedTodos} />
      </div>

      {/* Search input and clear button */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search todos..."
          onChange={handleSearchChange}
          ref={searchInputRef}
          style={{ padding: '6px', marginRight: '10px' }}
        />
        <button
          onClick={handleClearSearch}
          style={{ color: "darkgreen", borderBottom: "2px solid darkgreen" }}
        >
          Clear Search
        </button>
      </div>

      {/* Sorting buttons */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => dispatch({ type: 'SET_SORT', payload: 'asc' })}
          style={{ color: "blue", borderBottom: "2px solid blue" }}
        >
          Ascending
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_SORT', payload: 'desc' })}
          style={{ color: "blue", borderBottom: "2px solid blue" }}
        >
          Descending
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_SORT', payload: null })}
          style={{ color: "brown", borderBottom: "2px solid brown" }}
        >
          Reset Sort
        </button>
      </div>
    </div>
  );
}

// Wrap the AppContent with TodoProvider to provide context
export default function App() {
  return (
    <TodoProvider>
      <AppContent />
    </TodoProvider>
  );
}
// src/AppContent.jsx
import React, {
  useMemo,
  useCallback,
  useRef,
  useState,
  useContext,
  useEffect
} from 'react';

import { TodoContext } from './context/TodoContext';
import TodoList from './features/TodoList';
import TodoForm from './features/TodoForm';
import Header from './features/Header';

function AppContent() {
  const { state, dispatch } = useContext(TodoContext);
  const { todoList, sortDirection, filterTodos } = state;

  const searchInputRef = useRef(null);
  const [cachedResults, setCachedResults] = useState({});
  const throttleTimeout = useRef(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
        const data = await response.json();
        const formattedTodos = data.map(todo => ({
          id: todo.id,
          title: todo.title,
          isCompleted: todo.completed,
        }));
        dispatch({ type: 'SET_TODOS', payload: formattedTodos });
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, [dispatch]);

  const filteredAndSortedTodos = useMemo(() => {
    const filtered = todoList.filter(todo =>
      todo.title.toLowerCase().includes(filterTodos.toLowerCase())
    );
    const sorted = [...filtered].sort((a, b) => {
      if (sortDirection === 'asc') return a.title.localeCompare(b.title);
      if (sortDirection === 'desc') return b.title.localeCompare(a.title);
      return 0;
    });
    return sorted;
  }, [todoList, filterTodos, sortDirection]);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    if (cachedResults[value]) {
      dispatch({ type: 'SET_FILTER', payload: value });
      return;
    }
    if (throttleTimeout.current) clearTimeout(throttleTimeout.current);
    throttleTimeout.current = setTimeout(() => {
      dispatch({ type: 'SET_FILTER', payload: value });
      setCachedResults(prev => ({ ...prev, [value]: true }));
    }, 300);
  }, [cachedResults, dispatch]);

  const handleClearSearch = () => {
    dispatch({ type: 'SET_FILTER', payload: '' });
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  };

  const handleAddTodo = useCallback((title) => {
    const newTodo = {
      id: Date.now(),
      title,
      isCompleted: false,
    };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  }, [dispatch]);

  const handleCompleteTodo = useCallback((id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, [dispatch]);

  const handleUpdateTodo = useCallback((updatedTodo) => {
    dispatch({ type: 'UPDATE_TODO', payload: updatedTodo });
  }, [dispatch]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      textAlign: 'center'
    }}>
      <div style={{ marginTop: '50px' }}>
        <Header />
      </div>

      <h1>Todo List</h1>

      <TodoForm onAddTodo={handleAddTodo} />

      <div style={{ textAlign: 'left' }}>
        <TodoList
          todoList={filteredAndSortedTodos}
          onCompleteTodo={handleCompleteTodo}
          onUpdateTodo={handleUpdateTodo}
        />
      </div>

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

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => dispatch({ type: 'SET_SORT', payload: 'asc' })}
          style={{ color: "blue", borderBottom: "2px solid blue", marginRight: "10px" }}
        >
          Ascending
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_SORT', payload: 'desc' })}
          style={{ color: "blue", borderBottom: "2px solid blue", marginRight: "10px" }}
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

export default AppContent;
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import TodoList from './features/TodoList';
import TodoForm from './features/TodoForm';
import Header from './features/Header';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [sortDirection, setSortDirection] = useState(null);
  const [filterTodos, setFilterTodos] = useState('');
  const [cachedResults, setCachedResults] = useState({});
  const throttleTimeout = useRef(null);

  // Fetch todos from API once on component mount
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
        setTodoList(formattedTodos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      } finally {
        console.log('Fetch attempt completed.');
      }
    };

    fetchTodos();
  }, []);

  // Memoized filtered and sorted todos
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

  // Throttled search input handler using useCallback
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;

    // If result is cached, use it immediately
    if (cachedResults[value]) {
      setFilterTodos(value);
      return;
    }

    // Clear any existing throttle timeout
    if (throttleTimeout.current) clearTimeout(throttleTimeout.current);

    // Set a new throttle timeout to delay search processing
    throttleTimeout.current = setTimeout(() => {
      setFilterTodos(value);
      setCachedResults(prev => ({ ...prev, [value]: true }));
    }, 300); // 300ms throttle
  }, [cachedResults]);

  // Memoized function to add a new todo
  const handleAddTodo = useCallback((title) => {
    const newTodo = {
      id: Date.now(),
      title,
      isCompleted: false,
    };
    setTodoList(prev => [...prev, newTodo]);
  }, []);

  // Memoized function to update an existing todo
  const updateTodo = useCallback((editedTodo) => {
    setTodoList(prev =>
      prev.map(todo => (todo.id === editedTodo.id ? { ...editedTodo } : todo))
    );
  }, []);

  // Memoized function to mark a todo as completed
  const completeTodo = useCallback((id) => {
    setTodoList(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, isCompleted: true } : todo))
    );
  }, []);

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh', // optional: centers vertically
        textAlign: 'center' // optional: centers text inside child elements
      }}>

      <div style={{marginTop: '50px'}}>
        <Header />
      </div>

      <h1>Todo List</h1>
      <TodoForm onAddTodo={handleAddTodo} />

      <div style={{textAlign: 'left'}}>
        <TodoList
          todoList={filteredAndSortedTodos}
          onCompleteTodo={completeTodo}
          onUpdateTodo={updateTodo}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search todos..."
          onChange={handleSearchChange}
          style={{ padding: '6px', marginRight: '10px' }}
        />
        <button onClick={() => setFilterTodos('')} style={{ color: "darkgreen", borderBottom: "2px solid darkgreen" }}>
          Clear Search
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setSortDirection('asc')} style={{ color: "blue", marginLeft: "10px", borderBottom: "2px solid blue" }}>
          Ascending
        </button>
        <button onClick={() => setSortDirection('desc')} style={{ marginRight: '10px', color: "blue", marginLeft: "10px", borderBottom: "2px solid blue" }}>
          Descending
        </button>
        <button onClick={() => setSortDirection(null)} style={{ color: "brown", borderBottom: "2px solid brown" }}>
          Reset Sort
        </button>
      </div>
    </div>
  );
}

export default App;
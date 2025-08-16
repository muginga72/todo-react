import React, { createContext, useReducer } from 'react';
import { todoReducer, initialState } from '../reducers/todoReducer';

// Create context
const TodoContext = createContext();

// Provider component
function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

// Use named exports only
export { TodoContext, TodoProvider };
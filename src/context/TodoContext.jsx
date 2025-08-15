import React, { createContext, useReducer } from 'react';
import { todoReducer, initialState } from '../reducers/todoReducer';

// Create context
export const TodoContext = createContext();

// Provider component
export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}
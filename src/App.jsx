import React from 'react';
import { TodoProvider } from './context/TodoContext';
import AppContent from './AppContent'; // Move AppContent to its own file

function App() {
  return (
    <TodoProvider>
      <AppContent />
    </TodoProvider>
  );
}

export default App;
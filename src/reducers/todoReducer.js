export const initialState = {
  todoList: [],
  sortDirection: null,
  filterTodos: '',
};

export function todoReducer(state, action) {
  switch (action.type) {
    case 'SET_TODOS':
      return { ...state, todoList: action.payload };
    case 'ADD_TODO':
      return { ...state, todoList: [...state.todoList, action.payload] };
    case 'UPDATE_TODO':
      return {
        ...state,
        todoList: state.todoList.map(todo =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case 'COMPLETE_TODO':
      return {
        ...state,
        todoList: state.todoList.map(todo =>
          todo.id === action.payload ? { ...todo, isCompleted: true } : todo
        ),
      };
    case 'SET_FILTER':
      return { ...state, filterTodos: action.payload };
    case 'SET_SORT':
      return { ...state, sortDirection: action.payload };
    default:
      return state;
  }
}
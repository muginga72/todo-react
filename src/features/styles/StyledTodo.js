// src/components/styles/StyledTodo.js
import styled from 'styled-components';

export const TodoItem = styled.li`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  color: ${(props) => (props.completed ? '#888' : '#000')};
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
`;
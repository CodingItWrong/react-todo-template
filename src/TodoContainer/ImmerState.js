import produce from 'immer';
import {useState} from 'react';

const initialTodos = [];

export default function TodoContainer({children}) {
  const [todos, setTodos] = useState(initialTodos);

  function createTodo(name) {
    const id = 1 + Math.max(0, ...todos.map(todo => todo.id));
    const newTodo = {id, name, complete: false};
    setTodos([...todos, newTodo]);
  }

  function completeTodo(id) {
    const updatedTodos = produce(todos, draft => {
      draft.find(todo => todo.id === id).complete = true;
    });
    setTodos(updatedTodos);
  }

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return children({todos, createTodo, completeTodo, deleteTodo});
}

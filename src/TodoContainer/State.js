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
    const todo = todos.find(todo => todo.id === id);
    const updatedTodo = {
      ...todo,
      complete: true,
    };
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return updatedTodo;
        } else {
          return todo;
        }
      }),
    );
  }

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return children({todos, createTodo, completeTodo, deleteTodo});
}

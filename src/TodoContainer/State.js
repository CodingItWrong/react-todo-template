import {useState} from 'react';

const initialTodos = [];

export default function TodoContainer({children}) {
  const [todos, setTodos] = useState(initialTodos);

  function createTodo(name) {
    const id = 1 + Math.max(0, ...todos.map(todo => todo.id));
    const newTodo = {id, name, complete: false};
    setTodos([...todos, newTodo]);
  }

  function completeTodo(todoToComplete) {
    const completedTodo = {
      ...todoToComplete,
      complete: true,
    };
    setTodos(
      todos.map(todo => {
        if (todo.id === completedTodo.id) {
          return completedTodo;
        } else {
          return todo;
        }
      }),
    );
  }

  function deleteTodo(todoToDelete) {
    setTodos(todos.filter(todo => todo.id !== todoToDelete.id));
  }

  return children({todos, createTodo, completeTodo, deleteTodo});
}

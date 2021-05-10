import {useState} from 'react';

export default function TodoList({
  todos,
  createTodo,
  completeTodo,
  deleteTodo,
}) {
  const [newTodoName, setNewTodoName] = useState('');

  function handleCreate(submitEvent) {
    submitEvent.preventDefault();
    if (!newTodoName) {
      return;
    }
    createTodo(newTodoName);
    setNewTodoName('');
  }

  const incompleteTodos = todos.filter(todo => !todo.complete);
  const completeTodos = todos.filter(todo => todo.complete);

  return (
    <main>
      <h1>Todos</h1>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="New Todo"
          value={newTodoName}
          onChange={e => setNewTodoName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <h2>Incomplete Todos</h2>
      <ul>
        {incompleteTodos.map(todo => (
          <li key={todo.id}>
            {todo.name}
            <button onClick={() => completeTodo(todo)}>Complete</button>
            <button onClick={() => deleteTodo(todo)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Complete Todos</h2>
      <ul>
        {completeTodos.map(todo => (
          <li key={todo.id}>
            {todo.name}
            <button onClick={() => deleteTodo(todo)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

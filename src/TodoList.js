import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteIcon from '@material-ui/icons/Delete';
import {useState} from 'react';

function NewTodoForm({createTodo}) {
  const [newTodoName, setNewTodoName] = useState('');

  function handleCreate(submitEvent) {
    submitEvent.preventDefault();
    if (!newTodoName) {
      return;
    }
    createTodo(newTodoName).catch(console.error);
    setNewTodoName('');
  }

  return (
    <form onSubmit={handleCreate}>
      <Box display="flex">
        <TextField
          placeholder="New Todo"
          value={newTodoName}
          onChange={e => setNewTodoName(e.target.value)}
          fullWidth
          variant="filled"
        />
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </Box>
    </form>
  );
}

function Todo({todo, completeTodo, deleteTodo}) {
  return (
    <ListItem>
      <ListItemText>{todo.name}</ListItemText>
      {!todo.complete && (
        <IconButton
          edge="end"
          aria-label="Complete"
          onClick={() => completeTodo(todo)}
        >
          <CheckBoxIcon />
        </IconButton>
      )}
      <IconButton
        edge="end"
        aria-label="Delete"
        onClick={() => deleteTodo(todo)}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}

export default function TodoList({
  todos,
  createTodo,
  completeTodo,
  deleteTodo,
}) {
  const incompleteTodos = todos.filter(todo => !todo.complete);
  const completeTodos = todos.filter(todo => todo.complete);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Todos</Typography>
        <NewTodoForm createTodo={createTodo} />
        <Typography variant="h6">Incomplete Todos</Typography>
        <List>
          {incompleteTodos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </List>
        <Typography variant="h6">Complete Todos</Typography>
        <List>
          {completeTodos.map(todo => (
            <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} />
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

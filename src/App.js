import TodoContainer from './TodoContainer/ImmerState';
import TodoList from './TodoList';
import initializeAxe from './axe';

initializeAxe();

const App = () => {
  return (
    <TodoContainer>{todoProps => <TodoList {...todoProps} />}</TodoContainer>
  );
};

export default App;

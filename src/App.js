import TodoContainer from './TodoContainer/State';
import TodoList from './TodoList';
import initializeAxe from './axe';

initializeAxe();

const App = () => {
  return (
    <TodoContainer>{todoProps => <TodoList {...todoProps} />}</TodoContainer>
  );
};

export default App;

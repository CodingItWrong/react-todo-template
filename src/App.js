import green from '@material-ui/core/colors/green';
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import AppLayout from './AppLayout';
import TodoContainer from './TodoContainer/ImmerPouch';
import TodoList from './TodoList';
import initializeAxe from './axe';

initializeAxe();

const theme = createMuiTheme({
  palette: {primary: green},
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppLayout>
        <TodoContainer>
          {todoProps => <TodoList {...todoProps} />}
        </TodoContainer>
      </AppLayout>
    </ThemeProvider>
  );
};

export default App;

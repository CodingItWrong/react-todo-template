import usePouch from './usePouch';

const DB_SERVER = process.env.REACT_APP_COUCH_URL;
const DATABASE_NAME = 'reacttodotemplate';

export default function TodoContainer({children}) {
  const {
    docs: todos,
    createDoc,
    updateDoc,
    deleteDoc,
  } = usePouch({dbServer: DB_SERVER, databaseName: DATABASE_NAME});

  const createTodo = name => createDoc({name});

  const completeTodo = todo => updateDoc(todo, {complete: true});

  const deleteTodo = deleteDoc;

  if (todos) {
    return children({todos, createTodo, completeTodo, deleteTodo});
  } else {
    return null;
  }
}

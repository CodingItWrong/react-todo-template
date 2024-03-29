import produce from 'immer';
import usePouch from '../usePouch';

export default function useImmerPouch({dbServer, databaseName}) {
  const {
    docs,
    createDoc,
    updateDoc: rawUpdateDoc,
    deleteDoc,
  } = usePouch({dbServer, databaseName});

  const updateDoc = (doc, callback) =>
    rawUpdateDoc(doc, doc => produce(doc, callback));

  return {docs, createDoc, updateDoc, deleteDoc};
}

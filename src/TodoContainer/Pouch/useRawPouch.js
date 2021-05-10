import usePouch from '../usePouch';

export default function useRawPouch({dbServer, databaseName}) {
  const {
    docs,
    createDoc,
    updateDoc: rawUpdateDoc,
    deleteDoc,
  } = usePouch({dbServer, databaseName});

  const updateDoc = (doc, attributes) =>
    rawUpdateDoc(doc, doc => ({
      ...doc,
      ...attributes,
    }));

  return {docs, createDoc, updateDoc, deleteDoc};
}

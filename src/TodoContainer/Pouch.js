import PouchDB from 'pouchdb';
import {useEffect, useState} from 'react';
import {v4 as uuid} from 'uuid';

const DB_SERVER = process.env.REACT_APP_COUCH_URL;
const DATABASE_NAME = 'reacttodotemplate';

export default function TodoContainer({children}) {
  const [db, setDb] = useState(null);
  const [docs, setDocs] = useState(null);

  function syncToRemote({localDb}) {
    const remoteIdentifier = `${DB_SERVER}/${DATABASE_NAME}`;
    const remoteDb = new PouchDB(remoteIdentifier);
    const syncHandler = localDb
      .sync(remoteDb, {
        live: true,
        retry: true,
      })
      .on('change', function (change) {
        console.log('POUCHDB CHANGE', change);
        // yo, something changed!
      })
      .on('paused', function (info) {
        console.log('POUCHDB PAUSED', info);
      })
      .on('active', function (info) {
        console.log('POUCHDB ACTIVE', info);
      })
      .on('error', function (err) {
        console.log('POUCHDB ERROR', err);
      });
    return syncHandler;
  }

  useEffect(() => {
    if (!db) {
      const localDb = new PouchDB(DATABASE_NAME);
      const syncHandler = syncToRemote({localDb});
      setDb(localDb);

      const loadDocumentsIntoState = () =>
        localDb.allDocs({include_docs: true}).then(result => {
          const newDocs = result.rows.map(row => row.doc);
          setDocs(newDocs);
        });

      loadDocumentsIntoState();

      localDb.changes({since: 'now', live: true}).on('change', change => {
        loadDocumentsIntoState();
      });
      return () => {
        syncHandler.cancel();
      };
    }
  }, [db]);

  function createDoc(attributes) {
    const id = uuid();
    const newDocWithId = {
      _id: id,
      id,
      ...attributes,
    };
    return db.put(newDocWithId).catch(console.error);
  }

  function updateDoc(doc, attributes) {
    return db
      .get(doc._id)
      .then(doc => {
        return db.put({
          ...doc,
          ...attributes,
        });
      })
      .catch(console.error);
  }

  function deleteDoc(doc) {
    return db
      .get(doc._id)
      .then(doc => db.remove(doc))
      .catch(console.error);
  }

  function createTodo(name) {
    return createDoc({name});
  }

  function completeTodo(todo) {
    return updateDoc(todo, {complete: true});
  }

  function deleteTodo(todo) {
    return deleteDoc(todo);
  }

  if (docs) {
    return children({todos: docs, createTodo, completeTodo, deleteTodo});
  } else {
    return null;
  }
}

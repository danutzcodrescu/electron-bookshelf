import { openDB, DBSchema } from 'idb';
import { InsertAuthorMutationVariables, InsertBookMutationVariables } from '../generated/graphql';

interface AssetTypesDB extends DBSchema {
  insertedData: {
    key: string;
    value: InsertBookMutationVariables | InsertAuthorMutationVariables;
  };
}

const dbName = 'insertedData';

export async function connectToIndexDB() {
  return openDB<AssetTypesDB>('localData', 1, {
    upgrade(db) {
      db.createObjectStore(dbName);
    },
  });
}

export async function saveDataLocally(value: InsertAuthorMutationVariables | InsertBookMutationVariables) {
  const db = await connectToIndexDB();
  const key = new Date().getTime().toString();
  db.add(dbName, value, key);
  return db.get(dbName, key);
}

export async function getLocalData() {
  const db = await connectToIndexDB();
  const data = await db.getAll(dbName);
  await db.clear(dbName);
  return data;
}

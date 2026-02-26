import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { AttemptRecord } from './attempts';

type PracticeDB = DBSchema & {
  attempts: {
    key: number;
    value: AttemptRecord;
    indexes: {
      problemKey: string;
      dateISO: string;
    };
  };
};

const DB_NAME = 'coding-practice-db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<PracticeDB>> | null = null;

export function getDB(): Promise<IDBPDatabase<PracticeDB>> {
  if (!dbPromise) {
    dbPromise = openDB<PracticeDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const store = db.createObjectStore('attempts', {
          keyPath: 'id',
        });
        store.createIndex('problemKey', 'problemKey');
        store.createIndex('dateISO', 'dateISO');
      },
    });
  }

  return dbPromise;
}

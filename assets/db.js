import {Dexie} from 'dexie';

const db = new Dexie('Todo App')
db.version(1).stores({ todos: '++id, todo' })

export {db};

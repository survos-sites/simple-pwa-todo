//creating database structure
import {Dexie} from 'dexie';

const db = new Dexie('Todo App')
db.version(1).stores({ todos: '++id, todo' })

const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const list_el = document.querySelector("#tasks");

//display todo

//delete todo


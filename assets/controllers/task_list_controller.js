import { Controller } from '@hotwired/stimulus';
import {db} from './../db.js';
console.log(db.verno);
/*
* The following line makes this controller "lazy": it won't be downloaded until needed
* See https://github.com/symfony/stimulus-bridge#lazy-controllers
*/
/* stimulusFetch: 'lazy' */
export default class extends Controller {

    initialize() {
        this.boundHandleMyEvent = this.handleMyEvent.bind(this);
    }

    // ...
    connect() {
        super.connect();

        // this.myTarget.addEventListener(`${this.identifier}:world`,
        //     this.world.bind(this), {})
        this.element.addEventListener('todo:submitted', (event) => {
            console.error(event);
        });
        this.element.addEventListener('hello:world', (event) => {
            console.error(event);
        });

        console.log('listener added.');
        this.element.innerHTML=this.loadTasks(db);
    }

    handleMyEvent(event) {
        console.log("I got an event", event)
    }

    async loadTasks(db) {

        const allTodos = await db.todos.reverse().toArray();
        this.element.innerHTML = allTodos.map(todo => `

	<div class="task">
	<div class="content">
	<input id="edit" class="text" readonly="readonly" type="text" value= ${todo.todo}>
	</div>
	<div class="actions">
	<button class="delete" 
	    data-todo-id="${todo.id}">
        Delete</button>
	</div>
	</div>
	`).join("")

    }

    async deleteTodo(id) {
        await db.todos.delete(id)
        await getTodos()
    }
}

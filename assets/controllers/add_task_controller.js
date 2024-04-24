import {Controller} from '@hotwired/stimulus';
import {db} from './../db.js';
import {useDispatch} from 'stimulus-use';
/*
* The following line makes this controller "lazy": it won't be downloaded until needed
* See https://github.com/symfony/stimulus-bridge#lazy-controllers
*/
/* stimulusFetch: 'lazy' */
export default class extends Controller {
    static targets = ['newTaskInput']

    // ...
    connect() {
        useDispatch(this);
    }

    submit(event) {
        const todo = this.newTaskInputTarget.value;
        event.preventDefault();
        db.todos.add({todo}).then(
            () => {
                this.element.dispatchEvent(new Event('hello:world'))

                console.log('dispatch event to reload list');
                let x = this.dispatch('todo:submitted',
                    {
                        detail: {new: value},
                        prefix: false
                    });
                console.error(x);
            });
        this.element.reset()
    }
}

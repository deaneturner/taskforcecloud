import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'register',
    styleUrls: [ './register.style.scss' ],
    templateUrl: './register.template.html',
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'register-page app'
    }
})
export class Register {
    constructor() {

    }
}

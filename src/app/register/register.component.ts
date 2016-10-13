import { Component, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/authservice';

@Component({
    selector: 'register',
    styleUrls: [ './register.style.scss' ],
    templateUrl: './register.template.html',
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'register-page app'
    },
    providers: [AuthService]
})
export class Register {
    constructor(private service: AuthService, public router: Router) {

    }

    register(event, username, password) {
        event.preventDefault();

        this.service.loginfn({username: username, password: password}).then((res) => {
            if (res) {
                this.router.navigate(['/app/dashboard']);
            } else {
                console.log(res);
            }
        });
    }
}

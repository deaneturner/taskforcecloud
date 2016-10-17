import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/authservice';

@Component({
    selector: 'login',
    styleUrls: ['./login.style.scss'],
    templateUrl: './login.template.html',
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'login-page app'
    },
    providers: [AuthService]
})
export class Login {
    constructor(private service: AuthService, public router: Router) {

    }

    login(event, username, password) {
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

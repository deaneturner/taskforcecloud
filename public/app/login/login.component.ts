import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/authservice';
import {User} from '../model/user.interface';

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
export class Login implements OnInit {

    constructor(private service: AuthService, public router: Router) {

    }

    public user: User;

    ngOnInit() {
        this.user = {
            username: '',
            password: '',
            isKeepLoggedIn: false
        }
    }

    login(isValid: boolean, loginForm: User) {
        this.service.loginfn(loginForm).then((res) => {
            if (res) {
                this.router.navigate(['/app/dashboard']);
            } else {
                console.log(res);
            }
        });
    }
}

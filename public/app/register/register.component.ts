import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/authservice';
import {User} from '../model/user.interface';

@Component({
    selector: 'register',
    styleUrls: ['./register.style.scss'],
    templateUrl: './register.template.html',
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'register-page app'
    },
    providers: [AuthService]
})
export class Register implements OnInit {
    constructor(private service: AuthService, public router: Router) {

    }

    public user: User;

    ngOnInit() {
        this.user = {
            username: '',
            password: '',
            confirmPassword: '',
            isKeepLoggedIn: false
        }
    }

    register(isValid: boolean, f: User) {
        this.service.registerfn({
            username: f.username,
            password: f.password,
            confirmPassword: f.confirmPassword,
            isKeepLoggedIn: f.isKeepLoggedIn
        }).then((res) => {
            if (res) {
                this.router.navigate(['/app/dashboard']);
            } else {
                console.log(res);
            }
        });
    }
}

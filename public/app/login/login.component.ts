import {Component, ViewEncapsulation, OnInit, AfterViewChecked, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
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
export class Login implements OnInit, AfterViewChecked {

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
        if (isValid) {
            this.service.loginfn(loginForm).then((res) => {
                if (res) {
                    this.router.navigate(['/app/dashboard']);
                } else {
                    console.log(res);
                }
            });
        } else {
            // notify validation errors
            this.onValueChanged(null, true);
        }
    }

    /*
     * FORM
     */

    loginForm: NgForm;
    @ViewChild('loginForm') currentForm: NgForm;

    ngAfterViewChecked() {
        this.formChanged();
    }

    formChanged() {
        if (this.currentForm === this.loginForm) { return; }
        this.loginForm = this.currentForm;
        if (this.loginForm) {
            this.loginForm.valueChanges
                .subscribe(data => this.onValueChanged(data));
        }
    }

    onValueChanged(data?: any, ignoreDirty: boolean = false) {
        if (!this.loginForm) { return; }
        const form = this.loginForm.form;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = [];
            const control = form.get(field);

            if (control && (control.dirty || ignoreDirty) && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field].push(messages[key]);
                }
            }
        }
    }

    formErrors = {
        'username': [],
        'password': []
    };

    validationMessages = {
        'username': {
            'required': 'User name is required.',
            'email': 'User name must be formatted as as an email address.'
        },
        'password': {
            'required': 'Password is required.'
        }
    };
}

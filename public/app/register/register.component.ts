import {Component, ViewEncapsulation, OnInit, AfterViewChecked, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
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

    register(isValid: boolean, registrationForm: User) {
        isValid && this.service.registerfn(registrationForm).then((res) => {
            if (res) {
                this.router.navigate(['/app/dashboard']);
            } else {
                console.log(res);
            }
        });
    }

    /*
     * FORM
     */

    registrationForm: NgForm;
    @ViewChild('registrationForm') currentForm: NgForm;

    ngAfterViewChecked() {
        this.formChanged();
    }

    formChanged() {
        if (this.currentForm === this.registrationForm) { return; }
        this.registrationForm = this.currentForm;
        if (this.registrationForm) {
            this.registrationForm.valueChanges
                .subscribe(data => this.onValueChanged(data));
        }
    }

    onValueChanged(data?: any) {
        if (!this.registrationForm) { return; }
        const form = this.registrationForm.form;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = [];
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field].push(messages[key]);
                }
            }
        }
    }

    formErrors = {
        'username': [],
        'password': [],
        'confirmPassword': []
    };

    validationMessages = {
        'username': {
            'required': 'User name is required.',
            'email': 'User name must be formatted as as an email address.'
        },
        'password': {
            'required': 'Password is required.'
        },
        'confirmPassword': {
            'required': 'Password confirmation is required.'
        }
    };
}

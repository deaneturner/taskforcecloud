import { Component, ViewEncapsulation, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { User } from '../model/user.interface';
import { MessageBusService } from '../services/message.bus.service';

@Component({
    styleUrls: ['./login.style.scss'],
    templateUrl: './login.template.html',
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'login-page app'
    },
    providers: [AuthService]
})
export class LoginComponent implements OnInit, AfterViewChecked {
    appConfig: any;
    user: User;
    loginForm: NgForm;
    formErrors: any  = {
        'username': [],
        'password': []
    };
    validationMessages: any = {
        'username': {
            'required': 'User name is required.',
            'pattern': 'User name must be formatted as as an email address.',
            'exists': 'Authentication failed, user not found.'
        },
        'password': {
            'required': 'Password is required.',
            'match': 'Authentication failed, wrong password.'
        }
    };

    @ViewChild('loginForm')
    currentForm: NgForm;

    constructor(private service: AuthService,
                private messageBusService: MessageBusService,
                public router: Router) {
    }

    ngOnInit() {
        this.user = {
            username: '',
            firstName: '',
            lastName: '',
            password: '',
            role: '',
            email: '',
            phone: '',
            isKeepLoggedIn: true
        };
    }

    login(isValid: boolean, loginForm: User) {
        let user = loginForm;
        if (isValid) {
            this.service.loginfn(loginForm).then((res: any) => {
                if (res.success) {
                    this.router.navigate(['/app/dashboard']);
                    this.messageBusService.publishCurrentUser(user);
                } else if (res.success === false) {
                    const field = res.field;
                    // clear any previous errors
                    this.formErrors[field] = [];
                    this.formErrors[field].push(this.validationMessages[field][res.msgKey]);
                }
            });
        }
    }

    /*
     * FORM
     */
    ngAfterViewChecked() {
        this.formChanged();
    }

    formChanged() {
        if (this.currentForm === this.loginForm) {
            return;
        }
        this.loginForm = this.currentForm;
        if (this.loginForm) {
            this.loginForm.valueChanges
                .subscribe(data => this.onValueChanged(data));
        }
    }

    onValueChanged(data?: any) {
        if (!this.loginForm) {
            return;
        }
        const form = this.loginForm.form;

        for (let field in this.formErrors) {
            if (field) {
                // clear previous error message (if any)
                this.formErrors[field] = [];
                const control = form.get(field);

                if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (let key in control.errors) {
                        if (key) {
                            this.formErrors[field].push(messages[key]);
                        }
                    }
                }
            }
        }
    }
}

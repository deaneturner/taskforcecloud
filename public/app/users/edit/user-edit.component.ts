import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/user.service';
import { AppState } from '../../app.service';
import { User } from '../../model/user.interface';

@Component({
    selector: 'user-edit',
    templateUrl: 'user-edit.template.html',
    styleUrls: ['user-edit.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserEditComponent implements OnInit {
    user: User;
    userForm: NgForm;
    formErrors: any = {
        'username': [],
        'password': [],
        'confirmPassword': []
    };
    validationMessages: any = {
        'username': {
            'required': 'User name is required.',
            'pattern': 'User name must be formatted as as an email address.',
            'exists': 'A user with this user name currently exists.'
        },
        'password': {
            'required': 'Password is required.',
            'validateEqual': 'Password and Confirm Password must match.',
            'pattern': 'Length must be between 8 and 32 characters and contain ' +
            '[one or more uppercase letters], ' +
            '[one or more lowercase letters], ' +
            'and [one or more numbers].'
        },
        'confirmPassword': {
            'required': 'Confirmation of password is required.',
            'validateEqual': 'Password and Confirm Password must match.'
        }
    };

    @ViewChild('userForm')
    currentForm: NgForm;

    constructor(private appState: AppState,
                private activatedRoute: ActivatedRoute,
                private userService: UserService) {
    }

    ngOnInit(): void {
        const self = this;

        // TODO: refactor to base controller
        this.activatedRoute.params
            .subscribe(
                params => {
                    if (params['id'] !== self.appState.get('selectedUser')._id) {
                        self.userService.getUser(params['id'])
                            .subscribe(
                                user => {
                                    self.user = user;
                                },
                                error => {
                                } // error is handled by service
                            );
                    } else {
                        self.user = self.appState.get('selectedUser');
                    }
                }
            );

        this.user = {
            username: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            isKeepLoggedIn: false
        };
    }

    // register(isValid: boolean, registrationForm: User) {
    //     if (isValid) {
    //         this.service.registerfn(registrationForm).then((res: any) => {
    //             if (res.success) {
    //                 this.router.navigate(['/app/dashboard']);
    //             } else if (res.success === false) {
    //                 const field = res.field;
    //                 // clear previous error message (if any)
    //                 this.formErrors[field] = [];
    //                 this.formErrors[field].push(this.validationMessages[field][res.msgKey]);
    //             }
    //         });
    //     }
    // }

    /*
     * FORM
     */

    ngAfterViewChecked() {
        this.formChanged();
    }

    formChanged() {
        if (this.currentForm === this.userForm) {
            return;
        }
        this.userForm = this.currentForm;
        if (this.userForm) {
            this.userForm.valueChanges
                .subscribe(data => this.onValueChanged(data));
        }
    }

    onValueChanged(data?: any) {
        if (!this.userForm) {
            return;
        }
        const form = this.userForm.form;

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

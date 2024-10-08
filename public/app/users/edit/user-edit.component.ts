import { Component, ViewEncapsulation, ViewChild, OnInit, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MessageBusService } from '../../services/message.bus.service';
import { UserService } from '../../services/user.service';
import { AppState } from '../../app.service';
import { User } from '../../model/user.interface';

@Component({
    templateUrl: 'user-edit.template.html',
    styleUrls: ['user-edit.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserEditComponent implements OnInit, AfterViewChecked {
    user: any = {};
    userForm: NgForm;
    formErrors: any = {
        'email': [],
        'password': [],
        'confirmPassword': []
    };
    validationMessages: any = {
        'email': {
            'required': 'E-mail is required.',
            'pattern': 'E-mail must be formatted as as an email address.'
        },
        'password': {
            'required': 'Password is required.',
            'tfcDirValidateEqual': 'Password and Confirm Password must match.',
            'pattern': 'Length must be between 8 and 32 characters and contain ' +
            '[one or more uppercase letters], ' +
            '[one or more lowercase letters], ' +
            'and [one or more numbers].'
        },
        'confirmPassword': {
            'required': 'Confirmation of password is required.',
            'tfcDirValidateEqual': 'Password and Confirm Password must match.'
        }
    };

    @ViewChild('userForm')
    currentForm: NgForm;

    constructor(private appState: AppState,
                private router: Router,
                private messageBusService: MessageBusService,
                private activatedRoute: ActivatedRoute,
                private userService: UserService) {
    }

    ngOnInit(): void {
        const self = this;

        // TODO: refactor to base controller
        this.activatedRoute.params
            .subscribe(
                params => {
                    const selectedUser = self.userService.cacheManager
                            .getCache('cachedUserObservable') || {};
                    if (params['id'] !== selectedUser._id) {
                        self.userService.getUser(params['id'])
                            .subscribe(
                                user => {
                                    self.user = user;
                                    self.userService.cacheManager
                                        .setCache('cachedUserObservable', user);
                                },
                                error => {
                                } // error is handled by service
                            );
                    } else if (selectedUser) {
                        self.user = selectedUser;
                    }
                }
            );
    }

    updateUser(isValid: boolean, userForm: User) {
        const self = this;
        if (isValid) {
            // temp
            delete userForm.password;
            this.userService.updateUser(this.user._id, userForm)
                .subscribe(
                    res => {
                        if (res.success) {
                            /*
                             * If updating the current user, publish the change via the message bus
                             */
                            if (// is the current user
                                self.appState.get('currentUser')._id === res.data._id) {
                                // publish new user data
                                this.messageBusService.publishCurrentUser(res.data);
                            }
                            self.router.navigate(['/app/users/detail', self.user._id]);
                        } else if (res.success === false) {
                            const field = res.field;
                            // clear previous error message (if any)
                            self.formErrors[field] = [];
                            self.formErrors[field].push(self.validationMessages[field][res.msgKey]);
                        }
                    },
                    error => {
                    }  // error is handled by service
                );
        }
    }

    cancel(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.user._id) {
            this.userService.cacheManager.selectUser(['/app/users/detail/', this.user._id]);
        } else {
            this.router.navigate(['/app/users']);
        }
    }

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

    onValueChanged(data ?: any) {
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

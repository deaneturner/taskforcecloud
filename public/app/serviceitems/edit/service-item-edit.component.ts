import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientService } from '../../services/client.service';
import { AppState } from '../../app.service';
import { Client } from '../../model/client.interface';

@Component({
    selector: 'service-item-edit',
    templateUrl: 'service-item-edit.template.html',
    styleUrls: ['service-item-edit.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ServiceItemEditComponent implements OnInit {
    client: any = {};
    clientForm: NgForm;
    formErrors: any = {
        'company': [],
        'firstName': [],
        'lastName': [],
        'email': [],
        'phone': []
    };
    validationMessages: any = {
        'email': {
            'required': 'E-mail is required.',
            'pattern': 'E-mail must be formatted as as an email address.'
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

    @ViewChild('clientForm')
    currentForm: NgForm;

    constructor(private appState: AppState,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private clientService: ClientService) {
    }

    ngOnInit(): void {
        const self = this;

        this.activatedRoute.params
            .subscribe(
                params => {
                    const paramId = params['id'];
                    if (paramId === 'new') {
                        self.client = {
                            company: '',
                            firstName: '',
                            lastName: '',
                            address1: '',
                            address2: '',
                            email: '',
                            phone: ''
                        };
                    } else {
                        this.clientService.getClient(paramId)
                            .subscribe(
                                client => {
                                    self.client = client;
                                },
                                error => {
                                } // error is handled by service
                            );
                    }
                }
            );
    }

    upsertClient(isValid: boolean, clientForm: Client) {
        const self = this;
        if (isValid) {
            if (this.client._id) {
                // update
                this.clientService.updateClient(this.client._id, clientForm)
                    .subscribe(
                        res => {
                            if (res.success) {
                                self.router.navigate(['/app/clients/detail', self.client._id]);
                            } else if (res.success === false) {
                                const field = res.field;
                                // clear previous error message (if any)
                                self.formErrors[field] = [];
                                self.formErrors[field]
                                    .push(self.validationMessages[field][res.msgKey]);
                            }
                        },
                        error => {
                        }  // error is handled by service
                    );
            } else {
                // insert
                this.clientService.insertClient(clientForm)
                    .subscribe(
                        res => {
                            if (res.success) {
                                self.router.navigate(['/app/clients/detail', res.data._id]);
                            } else if (res.success === false) {
                                const field = res.field;
                                // clear previous error message (if any)
                                self.formErrors[field] = [];
                                self.formErrors[field]
                                    .push(self.validationMessages[field][res.msgKey]);
                            }
                        },
                        error => {
                        }  // error is handled by service
                    );
            }
        }
    }

    goToDetail(event) {
        event.preventDefault();
        event.stopPropagation();
        this.router.navigate(['/app/clients/detail/', this.client._id]);

    }

    /*
     * FORM
     */

    ngAfterViewChecked() {
        this.formChanged();
    }

    formChanged() {
        if (this.currentForm === this.clientForm) {
            return;
        }
        this.clientForm = this.currentForm;
        if (this.clientForm) {
            this.clientForm.valueChanges
                .subscribe(data => this.onValueChanged(data));
        }
    }

    onValueChanged(data ?: any) {
        if (!this.clientForm) {
            return;
        }
        const form = this.clientForm.form;

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

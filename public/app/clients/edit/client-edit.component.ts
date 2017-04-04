import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientService } from '../../services/client.service';
import { AppState } from '../../app.service';
import { Client } from '../../model/client.interface';

@Component({
    selector: 'client-edit',
    templateUrl: 'client-edit.template.html',
    styleUrls: ['client-edit.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientEditComponent implements OnInit {
    client = <Client>{};
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
                    if (paramId !== 'new') {
                        self.client = self.clientService.getClientContext();
                        if (self.client && self.client._id !== paramId) {
                            this.clientService.getClient(paramId)
                                .subscribe(
                                    client => {
                                        self.client = client;
                                        self.clientService.setClientContext(client);
                                    },
                                    error => {
                                    } // error is handled by service
                                );
                        }
                    } else {
                        // add new
                        self.client = self.clientService.clearClientContext();
                    }
                }
            );
    }

    upsertClient(isValid: boolean, clientForm: Client) {
        const self = this;
        let newClient: Client;
        if (isValid) {
            if (this.client._id) {
                // update
                this.clientService.updateClient(this.client._id, <Client>clientForm)
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
                newClient = Object.assign({ clientItems: []}, clientForm);
                this.clientService.insertClient(newClient)
                    .subscribe(
                        res => {
                            if (res.success) {
                                self.clientService.setClientContext(res.data);
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

    cancel(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.client._id) {
            this.router.navigate(['/app/clients/detail/', this.client._id]);
        } else {
            this.router.navigate(['/app/clients']);
        }
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

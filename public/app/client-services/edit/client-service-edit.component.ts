import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientServiceService } from '../../services/client-service.service';
import { AppState } from '../../app.service';
import { ClientService } from '../../model/client-service.interface';

@Component({
    selector: 'client-service-edit',
    templateUrl: 'client-service-edit.template.html',
    styleUrls: ['client-service-edit.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientServiceEditComponent implements OnInit {
    clientService: any = {};
    clientServiceForm: NgForm;
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

    @ViewChild('clientServiceForm')
    currentForm: NgForm;

    constructor(private appState: AppState,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private clientServiceService: ClientServiceService) {
    }

    ngOnInit(): void {
        const self = this;

        this.activatedRoute.params
            .subscribe(
                params => {
                    const paramId = params['id'];
                    if (paramId === 'new') {
                        self.clientService = {
                            company: '',
                            firstName: '',
                            lastName: '',
                            address1: '',
                            address2: '',
                            email: '',
                            phone: ''
                        };
                    } else {
                        this.clientServiceService.getClientService(paramId)
                            .subscribe(
                                clientService => {
                                    self.clientService = clientService;
                                },
                                error => {
                                } // error is handled by service
                            );
                    }
                }
            );
    }

    upsertClient(isValid: boolean, clientServiceForm: ClientService) {
        const self = this;
        if (isValid) {
            if (this.clientService._id) {
                // update
                this.clientServiceService
                    .updateClientService(this.clientService._id, clientServiceForm)
                    .subscribe(
                        res => {
                            if (res.success) {
                                self.router
                                    .navigate([
                                        '/app/clientservices/detail',
                                        self.clientService._id
                                    ]);
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
                this.clientServiceService.insertClientService(clientServiceForm)
                    .subscribe(
                        res => {
                            if (res.success) {
                                self.router.navigate(['/app/clientservices/detail', res.data._id]);
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
        this.router.navigate(['/app/clientservices/detail/', this.clientService._id]);

    }

    /*
     * FORM
     */

    ngAfterViewChecked() {
        this.formChanged();
    }

    formChanged() {
        if (this.currentForm === this.clientServiceForm) {
            return;
        }
        this.clientServiceForm = this.currentForm;
        if (this.clientServiceForm) {
            this.clientServiceForm.valueChanges
                .subscribe(data => this.onValueChanged(data));
        }
    }

    onValueChanged(data ?: any) {
        if (!this.clientServiceForm) {
            return;
        }
        const form = this.clientServiceForm.form;

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

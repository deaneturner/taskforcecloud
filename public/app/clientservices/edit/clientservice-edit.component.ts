import { Component, ViewEncapsulation, ViewChild, OnInit, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientServiceService } from '../../services/clientservice.service';
import { ClientService } from '../../model/clientservice.interface';

@Component({
    templateUrl: 'clientservice-edit.template.html',
    styleUrls: ['clientservice-edit.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientServiceEditComponent implements OnInit, AfterViewChecked {
    clientService = <ClientService>{};
    clientServiceForm: NgForm;
    formErrors: any = {
        'name': []
    };
    validationMessages: any = {};

    @ViewChild('clientServiceForm')
    currentForm: NgForm;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private clientServiceSvc: ClientServiceService) {
    }

    ngOnInit(): void {
        const self = this;

        this.activatedRoute.params
            .subscribe(
                params => {
                    const paramId = params['id'];
                    if (paramId !== 'new') {
                        self.clientService = self.clientServiceSvc.getClientServiceContext();
                        if (self.clientService && self.clientService._id !== paramId) {
                            this.clientServiceSvc.getClientService(paramId)
                                .subscribe(
                                    clientService => {
                                        self.clientService = clientService;
                                        self.clientServiceSvc
                                            .setClientServiceContext(clientService);
                                    },
                                    error => {
                                    } // error is handled by service
                                );
                        }
                    } else {
                        // add new
                        self.clientService = self.clientServiceSvc.clearClientServiceContext();
                    }
                }
            );
    }

    upsertClientService(isValid: boolean, clientServiceForm: ClientService) {
        const self = this;
        if (isValid) {
            if (this.clientService._id) {
                // update
                this.clientServiceSvc
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
                this.clientServiceSvc.insertClientService(clientServiceForm)
                    .subscribe(
                        res => {
                            if (res.success) {
                                self.clientServiceSvc.setClientServiceContext(res.data);
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

    cancel(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.clientService._id) {
            this.router.navigate(['/app/clientservices/detail/', this.clientService._id]);
        } else {
            this.router.navigate(['/app/clientservices']);
        }
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

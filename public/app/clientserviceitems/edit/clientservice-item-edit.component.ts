import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientServiceService } from '../../services/clientservice.service';
import { ClientServiceItemService } from '../../services/clientserviceitem.service';
import { ClientServiceItem } from '../../model/clientserviceitem.interface';

@Component({
    selector: 'client-service-item-edit',
    templateUrl: 'clientservice-item-edit.template.html',
    styleUrls: ['clientservice-item-edit.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientServiceItemEditComponent implements OnInit {
    clientService: any = {};
    clientServiceItem: any = {};
    clientServiceItemForm: NgForm;
    formErrors: any = {
        'name': []
    };
    validationMessages: any = {};

    @ViewChild('clientServiceItemForm')
    currentForm: NgForm;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private clientServiceService: ClientServiceService,
                private clientServiceItemService: ClientServiceItemService) {
    }

    ngOnInit(): void {
        const self = this;

        this.activatedRoute.params
            .subscribe(
                params => {
                    const paramId = params['clientserviceitemid'];
                    if (paramId === 'new') {
                        self.clientServiceItem = {
                            name: ''
                        };
                    } else {
                        this.clientServiceItem.getClientServiceItem(paramId)
                            .subscribe(
                                clientServiceItem => {
                                    self.clientServiceItem = clientServiceItem;
                                },
                                error => {
                                } // error is handled by service
                            );
                    }

                    this.clientServiceService.getClientService(params['id'])
                        .subscribe(
                            clientService => {
                                self.clientService = clientService;
                            },
                            error => {
                            } // error is handled by service
                        );
                }
            );
    }

    upsertClient(isValid: boolean, clientServiceItemForm: ClientServiceItem) {
        const self = this;
        if (isValid) {
            if (this.clientServiceItem._id) {
                // update
                this.clientServiceItemService
                    .updateClientServiceItem(this.clientServiceItem._id, clientServiceItemForm)
                    .subscribe(
                        res => {
                            if (res.success) {
                                self.router
                                    .navigate([
                                        'app',
                                        'clientservices',
                                        self.clientService._id,
                                        'clientserviceitems',
                                        'detail',
                                        self.clientServiceItem._id
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
                this.clientServiceItemService.insertClientServiceItem(clientServiceItemForm)
                    .subscribe(
                        res => {
                            if (res.success) {
                                self.router.navigate([
                                    'app',
                                    'clientservices',
                                    self.clientService._id,
                                    'clientserviceitems',
                                    'detail',
                                    res.data._id
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
            }
        }
    }

    cancel(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.clientServiceItem._id) {
            this.router.navigate(['/app/clientservices/detail/', this.clientServiceItem._id]);
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
        if (this.currentForm === this.clientServiceItemForm) {
            return;
        }
        this.clientServiceItemForm = this.currentForm;
        if (this.clientServiceItemForm) {
            this.clientServiceItemForm.valueChanges
                .subscribe(data => this.onValueChanged(data));
        }
    }

    onValueChanged(data ?: any) {
        if (!this.clientServiceItemForm) {
            return;
        }
        const form = this.clientServiceItemForm.form;

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

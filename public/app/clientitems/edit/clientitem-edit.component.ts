import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientService } from '../../services/client.service';
import { ClientItemService } from '../../services/clientitem.service';

import { Client } from '../../model/client.interface';
import { ClientItem } from '../../model/clientitem.interface';

@Component({
    selector: 'clientitem-edit',
    templateUrl: 'clientitem-edit.template.html',
    styleUrls: ['clientitem-edit.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientItemEditComponent implements OnInit {
    iconClass = ['fa', 'fa-dot-circle-o'];
    client = <Client>{};
    clientItem = <ClientItem>{};
    clientItemForm: NgForm;
    formErrors: any = {
        'name': []
    };
    validationMessages: any = {};

    @ViewChild('clientItemForm')
    currentForm: NgForm;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private clientItemService: ClientItemService,
                private clientService: ClientService) {
    }

    ngOnInit(): void {
        const self = this;

        this.activatedRoute.params
            .subscribe(
                params => {
                    // client item
                    const paramId = params['clientitemid'];
                    if (paramId !== 'new') {
                        self.clientItem = self.clientItemService.getClientItemContext();
                        if (self.clientItem && self.clientItem._id !== paramId) {
                            this.clientItemService.getClientItem(paramId)
                                .subscribe(
                                    clientItem => {
                                        self.clientItem = clientItem;
                                        self.clientItemService.setClientItemContext(clientItem);
                                    },
                                    error => {
                                    } // error is handled by service
                                );
                        }
                    } else {
                        // add new
                        self.clientItem = self.clientItemService.clearClientItemContext();
                    }

                    // client
                    self.client = self.clientService.getClientContext();
                    if (self.client && self.client._id !== params['id']) {
                        self.clientService.getClient(params['id'])
                            .subscribe(
                                client => {
                                    self.client = client;
                                    self.clientService.setClientContext(client);
                                },
                                error => {
                                } // error is handled by service
                            );
                    }
                }
            );
    }

    upsertClientItem(isValid: boolean, clientItemForm: ClientItem) {
        const self = this;
        let clientItem = <ClientItem>clientItemForm;
        if (isValid) {
            if (this.clientItem._id) {
                // update
                this.clientItemService
                    .updateClientItem(this.clientItem._id, clientItem)
                    .subscribe(
                        res => {
                            if (res.success) {
                                self.router
                                    .navigate([
                                        'app',
                                        'clients',
                                        self.client._id,
                                        'clientitems',
                                        'detail',
                                        self.clientItem._id
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
                clientItem._clientId = self.client._id;
                this.clientItemService.insertClientItem(clientItem)
                    .subscribe(
                        res => {
                            if (res.success) {
                                self.clientItemService.setClientItemContext(res.data);
                                self.router.navigate([
                                    'app',
                                    'clients',
                                    self.client._id,
                                    'clientitems',
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
        if (this.clientItem._id) {
            this.router.navigate(['/app/clients/' + this.client._id + '/clientitems/detail/',
                this.clientItem._id]);
        } else {
            this.router.navigate(['/app/clients/detail/', this.client._id]);
        }
    }

    /*
     * FORM
     */

    ngAfterViewChecked() {
        this.formChanged();
    }

    formChanged() {
        if (this.currentForm === this.clientItemForm) {
            return;
        }
        this.clientItemForm = this.currentForm;
        if (this.clientItemForm) {
            this.clientItemForm.valueChanges
                .subscribe(data => this.onValueChanged(data));
        }
    }

    onValueChanged(data ?: any) {
        if (!this.clientItemForm) {
            return;
        }
        const form = this.clientItemForm.form;

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

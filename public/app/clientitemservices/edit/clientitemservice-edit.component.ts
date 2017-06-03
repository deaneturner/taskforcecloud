import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientService } from '../../services/client.service';
import { ClientItemService } from '../../services/clientitem.service';
import { ClientItemServiceService } from '../../services/clientitemservice.service';

import { Client } from '../../model/client.interface';
import { ClientItem } from '../../model/clientitem.interface';
import { ClientItemServiceI } from '../../model/clientitemservice.interface';

@Component({
    selector: 'tfc-cmp-clientitemservice-edit',
    templateUrl: 'clientitemservice-edit.template.html',
    styleUrls: ['clientitemservice-edit.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientItemServiceEditComponent implements OnInit {
    iconClass = ['fa', 'fa-dot-circle-o'];
    client = <Client>{};
    clientItem = <ClientItem>{};
    clientItemService = <ClientItemServiceI>{};
    clientItemServiceForm: NgForm;
    formErrors: any = {
        'name': []
    };
    validationMessages: any = {};

    @ViewChild('clientItemForm')
    currentForm: NgForm;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private clientItemSvc: ClientItemService,
                private clientItemServiceSvc: ClientItemServiceService,
                private clientService: ClientService) {
    }

    ngOnInit(): void {
        const self = this;

        this.activatedRoute.params
            .subscribe(
                params => {
                    // client item
                    const paramId = params['clientitemserviceid'];
                    if (paramId !== 'new') {
                        self.clientItemService = self
                            .clientItemServiceSvc.getClientItemServiceContext();
                        if (self.clientItemService && self.clientItemService._id !== paramId) {
                            this.clientItemServiceSvc.getClientItem(paramId)
                                .subscribe(
                                    clientItemService => {
                                        self.clientItemService = clientItemService;
                                        self.clientItemServiceSvc
                                            .setClientItemServiceContext(clientItemService);
                                    },
                                    error => {
                                    } // error is handled by service
                                );
                        }
                    } else {
                        // add new
                        self.clientItemService = self
                            .clientItemServiceSvc.clearClientItemServiceContext();
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

                    // client item
                    self.clientItem = self.clientItemSvc.getClientItemContext();
                    if (self.clientItem && self.clientItem._id !== params['clientitemid']) {
                        self.clientItemSvc.getClientItem(params['clientitemid'])
                            .subscribe(
                                clientItem => {
                                    self.clientItem = clientItem;
                                    self.clientItemSvc.setClientItemContext(clientItem);
                                },
                                error => {
                                } // error is handled by service
                            );
                    }
                }
            );
    }

    upsertClientItemService(isValid: boolean, clientItemServiceForm: ClientItemServiceI) {
        const self = this;
        let clientItemService = <ClientItemServiceI>clientItemServiceForm;
        if (isValid) {
            if (this.clientItemService._id) {
                // update
                this.clientItemServiceSvc
                    .updateClientItemService(this.clientItemService._id, clientItemService)
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
                clientItemService._clientItemId = self.clientItem._id;
                this.clientItemServiceSvc.insertClientItemService(clientItemService)
                    .subscribe(
                        res => {
                            if (res.success) {
                                self.clientItemServiceSvc.setClientItemServiceContext(res.data);
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
        if (this.clientItemService._id) {
            this.router.navigate(['app', 'clients' + this.client._id + 'clientitems',
                this.clientItem._id, 'clientitemservices', 'detail', this.clientItemService._id]);
        } else {
            this.router.navigate(['app', 'clients', this.client._id, 'clientitems',
                'detail', this.clientItem._id]);
        }
    }

    /*
     * FORM
     */

    ngAfterViewChecked() {
        this.formChanged();
    }

    formChanged() {
        if (this.currentForm === this.clientItemServiceForm) {
            return;
        }
        this.clientItemServiceForm = this.currentForm;
        if (this.clientItemServiceForm) {
            this.clientItemServiceForm.valueChanges
                .subscribe(data => this.onValueChanged(data));
        }
    }

    onValueChanged(data ?: any) {
        if (!this.clientItemServiceForm) {
            return;
        }
        const form = this.clientItemServiceForm.form;

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

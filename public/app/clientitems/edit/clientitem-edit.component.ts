import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientService } from '../../services/client.service';
import { ClientItemService } from '../../services/clientitem.service';
import { ClientItem } from '../../model/clientitem.interface';

@Component({
    selector: 'clientitem-edit',
    templateUrl: 'clientitem-edit.template.html',
    styleUrls: ['clientitem-edit.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientItemEditComponent implements OnInit {
    client: any = {};
    clientItem: any = {};
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
                    const paramId = params['clientitemid'];
                    if (paramId === 'new') {
                        self.clientItem = {
                            name: ''
                        };
                    } else {
                        this.clientItemService.getClientItem(paramId)
                            .subscribe(
                                clientItem => {
                                    self.clientItem = clientItem;
                                },
                                error => {
                                } // error is handled by service
                            );
                    }

                    this.clientService.getClient(params['id'])
                        .subscribe(
                            client => {
                                self.client = client;
                            },
                            error => {
                            } // error is handled by service
                        );
                }
            );
    }

    upsertClient(isValid: boolean, clientItemForm: ClientItem) {
        const self = this;
        if (isValid) {
            if (this.clientItem._id) {
                // update
                this.clientItemService
                    .updateClientItem(this.clientItem._id, clientItemForm)
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
                this.clientItemService.insertClientItem(clientItemForm)
                    .subscribe(
                        res => {
                            if (res.success) {
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

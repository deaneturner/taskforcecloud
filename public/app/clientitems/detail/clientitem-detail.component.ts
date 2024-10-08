import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationService } from '../../services/notification.service';
import { ClientService } from '../../services/client.service';
import { ClientItemService } from '../../services/clientitem.service';
import { ClientServiceService } from '../../services/clientservice.service';

import { Client } from '../../model/client.interface';
import { ClientItem } from '../../model/clientitem.interface';

import { ServicesModalComponent } from './services-modal-window/services-modal.component';

@Component({
    selector: 'tfc-cmp-clientitem-detail',
    templateUrl: 'clientitem-detail.template.html',
    styleUrls: ['clientitem-detail.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientItemDetailComponent implements OnInit {
    iconClass = ['fa', 'fa-dot-circle-o'];
    panel: any;
    clientItemServicePanel: any;
    client = <Client>{};
    clientItem = <ClientItem>{};

    @ViewChild(ServicesModalComponent)
    public servicesModal: ServicesModalComponent;

    constructor(private router: Router,
                private notificationService: NotificationService,
                private clientService: ClientService,
                private clientItemService: ClientItemService,
                private clientServiceSvc: ClientServiceService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        const self = this;

        this.panel = {
            title: '',
            menu: [{
                title: 'Edit',
                onMenuSelect: () => this.onMenuSelect('edit')
            }, {
                title: 'Delete',
                onMenuSelect: () => this.onMenuSelect('delete')
            }]
        };

        this.clientItemServicePanel = {
            iconClass: ['fa', 'fa-dot-circle-o'],
            title: 'Services',
            collapsible: true,
            menu: [{
                title: 'Add',
                onMenuSelect: () => this.onMenuClientItemServiceSelect('add')
            }]
        };

        this.activatedRoute.params
            .subscribe(
                params => {
                    // client item
                    self.clientItem = self.clientItemService.getClientItemContext();
                    if (self.clientItem && self.clientItem._id !== params['clientitemid']) {
                        self.clientItemService
                            .getClientItem(params['clientitemid'])
                            .subscribe(
                                clientItem => {
                                    self.clientItem = clientItem;
                                    self.clientItemService.setClientItemContext(clientItem);
                                },
                                error => {
                                } // error is handled by service
                            );
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

    onMenuSelect(action: string) {
        const self = this;
        switch (action) {
            case 'edit':
                this.router.navigate(['app', 'clients', self.client._id, 'clientitems', 'edit',
                    self.clientItem._id]);
                break;
            case 'delete':
                this.notificationService.showModal({
                    title: 'Confirm Delete',
                    subTitle: null,
                    content: 'Are you sure you want to delete client item:',
                    subContent: self.clientItem.name,
                    buttons: [{
                        title: 'Cancel',
                        onClick: ($event) => {
                            self.notificationService.closeModal();
                        },
                        class: 'btn btn-gray'
                    }, {
                        title: 'Yes, delete',
                        onClick: ($event) => {
                            self.clientItemService
                                .deleteClientItem(self.clientItem._id)
                                .subscribe(
                                    clientItem => {
                                        self.notificationService.displayMessage({
                                            message: 'Deleted ' +
                                            clientItem.name,
                                            type: 'success'
                                        });

                                        self.clientItemService.clearClientItemContext();

                                        self.notificationService.closeModal();
                                        self.router.navigate(['/app/clients/detail',
                                            self.client._id]);
                                    },
                                    error => {
                                    }  // error is handled by service
                                );
                        },
                        class: 'btn btn-success'
                    }]
                });
                break;
            default: // do nothing
        }
    }

    onMenuClientItemServiceSelect(action: string) {
        const self = this;
        switch (action) {
            case 'add':
                self.activatedRoute.params
                    .subscribe(
                        params => {
                            this.clientServiceSvc.getClientServices()
                                .subscribe(
                                    clientServices => {
                                        self.openServiceModal({
                                            subContent: self.clientItem.name,
                                            services: clientServices,
                                            buttons: [{
                                                title: 'Cancel',
                                                onClick: ($event) => {
                                                    self.servicesModal.close();
                                                },
                                                class: 'btn btn-gray'
                                            }, {
                                                title: 'Add',
                                                onClick: ($event) => {
                                                    self.updateClientItemServices(
                                                        self.servicesModal.selectedServices);
                                                },
                                                class: 'btn btn-success'
                                            }]
                                        });
                                    },
                                    error => {
                                    }  // error is handled by service
                                );
                        }
                    );
                break;
            default: // do nothing
        }
    }

    openServiceModal(config: any) {
        Object.assign(this.servicesModal.config, config);
        this.servicesModal.open();
    }

    updateClientItemServices(services: string[]) {
        const self = this;
        if (services.length) {
            if (this.clientItem._id) {
                // update
                // this.clientItem.services = services;
                this.clientItemService
                    .updateClientItem(this.clientItem._id, this.clientItem)
                    .subscribe(
                        res => {
                            if (res.success) {
                                self.servicesModal.close();
                            } else if (res.success === false) {
                                const field = res.field;
                                // clear previous error message (if any)
                                // self.formErrors[field] = [];
                                // self.formErrors[field]
                                //    .push(self.validationMessages[field][res.msgKey]);
                            }
                        },
                        error => {
                        }  // error is handled by service
                    );
            }
        }
    }
}

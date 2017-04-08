import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppState } from '../../app.service';
import { NotificationService } from '../../services/notification.service';
import { ClientService } from '../../services/client.service';
import { ClientEditComponent } from '../edit/client-edit.component';

@Component({
    selector: 'client-detail',
    templateUrl: 'client-detail.template.html',
    styleUrls: ['client-detail.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientDetailComponent implements OnInit {
    iconClass = ['fa', 'fa-5x', 'fa-handshake-o'];
    panel: any;
    clientItemPanel: any;
    client: any = {};

    @ViewChild(ClientEditComponent)
    public clientEditComponent: ClientEditComponent;

    constructor(private appState: AppState,
                private router: Router,
                private notificationService: NotificationService,
                private clientService: ClientService,
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

        this.clientItemPanel = {
            iconClass: ['fa', 'fa-dot-circle-o'],
            title: 'Targets',
            collapsible: true,
            menu: [{
                title: 'Add',
                onMenuSelect: () => this.onMenuClientItemSelect('add')
            }]
        };

        this.activatedRoute.params
            .subscribe(
                params => {
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
                this.router.navigate(['/app/clients/edit/', this.client._id]);
                break;
            case 'delete':
                this.notificationService.showModal({
                    title: 'Confirm Delete',
                    subTitle: null,
                    content: 'Are you sure you want to delete client:',
                    subContent: self.client.firstName + ' ' +
                    self.client.lastName +
                    ' (' + self.client.company + ')',
                    buttons: [{
                        title: 'Cancel',
                        onClick: ($event) => {
                            self.notificationService.closeModal();
                        },
                        class: 'btn btn-gray'
                    }, {
                        title: 'Yes, delete',
                        onClick: ($event) => {
                            self.clientService
                                .deleteClient(self.activatedRoute.snapshot.params['id'])
                                .subscribe(
                                    client => {
                                        self.notificationService.displayMessage({
                                            message: 'Deleted ' +
                                            (client.company || (client.firstName + ' ' +
                                            client.lastName)),
                                            type: 'success'
                                        });

                                        self.clientService.clearClientContext();

                                        self.notificationService.closeModal();
                                        self.router.navigate(['/app/clients']);
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

    onMenuClientItemSelect(action: string) {
        const self = this;
        switch (action) {
            case 'add':
                self.activatedRoute.params
                    .subscribe(
                        params => {
                            this.router.navigate(['app', 'clients', params['id'],
                                'clientitems', 'edit', 'new']);
                        }
                    );
                break;
            default: // do nothing
        }
    }
}

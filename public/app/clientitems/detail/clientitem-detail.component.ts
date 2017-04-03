import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationService } from '../../services/notification.service';
import { ClientService } from '../../services/client.service';
import { ClientItemService } from '../../services/clientitem.service';

@Component({
    selector: 'clientitem-detail',
    templateUrl: 'clientitem-detail.template.html',
    styleUrls: ['clientitem-detail.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientItemDetailComponent implements OnInit {
    panel: any;
    client: any = {};
    clientItem: any = {};

    constructor(private router: Router,
                private notificationService: NotificationService,
                private clientService: ClientService,
                private clientItemService: ClientItemService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        const self = this;

        this.panel = {
            title: '',
            collapsed: false,
            close: false,
            fullScreen: false,
            menu: [{
                title: 'Edit',
                onMenuSelect: () => this.onMenuSelect('edit')
            }, {
                title: 'Delete',
                onMenuSelect: () => this.onMenuSelect('delete')
            }]
        };

        this.activatedRoute.params
            .subscribe(
                params => {
                    self.clientItemService
                        .getClientItem(params['clientitemid'])
                        .subscribe(
                            clientItem => {
                                self.clientItem = clientItem;
                            },
                            error => {
                            } // error is handled by service
                        );
                    self.clientService.getClient(params['id'])
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

    onMenuSelect(action: string) {
        const self = this;
        switch (action) {
            case 'edit':
                this.router.navigate(['app', 'clients', self.client._id, 'clientitems', 'edit',
                    this.clientItem._id]);
                break;
            case 'delete':
                this.notificationService.showModal({
                    title: 'Confirm Delete',
                    subTitle: null,
                    content: 'Are you sure you want to delete client:',
                    subContent: self.clientItem.firstName + ' ' +
                    self.clientItem.lastName +
                    ' (' + self.clientItem.company + ')',
                    buttons: [{
                        title: 'Cancel',
                        onClick: ($event) => {
                            self.notificationService.closeModal();
                        },
                        class: 'btn btn-gray'
                    }, {
                        title: 'Yes, delete',
                        onClick: ($event) => {
                            self.clientItem
                                .deleteClient(self.activatedRoute.snapshot.params['id'])
                                .subscribe(
                                    clientItem => {
                                        self.notificationService.displayMessage({
                                            message: 'Deleted ' +
                                            clientItem.firstName + ' ' +
                                            clientItem.lastName +
                                            ' (' + clientItem.email + ')',
                                            type: 'success'
                                        });

                                        self.notificationService.closeModal();
                                        self.router.navigate(['/app/clientsserviceitems']);
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
}

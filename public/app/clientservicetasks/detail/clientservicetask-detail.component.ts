import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationService } from '../../services/notification.service';
import { ClientServiceService } from '../../services/clientservice.service';
import { ClientServiceItemService } from '../../services/clientservicetask.service';

@Component({
    selector: 'clientservicetask-detail',
    templateUrl: 'clientservicetask-detail.template.html',
    styleUrls: ['clientservicetask-detail.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientServiceItemDetailComponent implements OnInit {
    panel: any;
    clientService: any = {};
    clientServiceItem: any = {};

    constructor(private router: Router,
                private notificationService: NotificationService,
                private clientServiceService: ClientServiceService,
                private clientServiceItemService: ClientServiceItemService,
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
                    self.clientServiceItemService
                        .getClientServiceItem(params['clientservicetaskid'])
                        .subscribe(
                            clientServiceItem => {
                                self.clientServiceItem = clientServiceItem;
                            },
                            error => {
                            } // error is handled by service
                        );
                    self.clientServiceService.getClientService(params['id'])
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

    onMenuSelect(action: string) {
        const self = this;
        switch (action) {
            case 'edit':
                this.router.navigate(['/app/clientservicetasks/edit/', this.clientServiceItem._id]);
                break;
            case 'delete':
                this.notificationService.showModal({
                    title: 'Confirm Delete',
                    subTitle: null,
                    content: 'Are you sure you want to delete client:',
                    subContent: self.clientServiceItem.firstName + ' ' +
                    self.clientServiceItem.lastName +
                    ' (' + self.clientServiceItem.company + ')',
                    buttons: [{
                        title: 'Cancel',
                        onClick: ($event) => {
                            self.notificationService.closeModal();
                        },
                        class: 'btn btn-gray'
                    }, {
                        title: 'Yes, delete',
                        onClick: ($event) => {
                            self.clientServiceItem
                                .deleteClient(self.activatedRoute.snapshot.params['id'])
                                .subscribe(
                                    clientServiceItem => {
                                        self.notificationService.displayMessage({
                                            message: 'Deleted ' +
                                            clientServiceItem.firstName + ' ' +
                                            clientServiceItem.lastName +
                                            ' (' + clientServiceItem.email + ')',
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

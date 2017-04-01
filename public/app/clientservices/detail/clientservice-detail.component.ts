import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppState } from '../../app.service';
import { NotificationService } from '../../services/notification.service';
import { ClientServiceService } from '../../services/clientservice.service';
import { ClientServiceEditComponent } from '../edit/clientservice-edit.component';

@Component({
    selector: 'clientservice-detail',
    templateUrl: 'clientservice-detail.template.html',
    styleUrls: ['clientservice-detail.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientServiceDetailComponent implements OnInit {
    panel: any;
    clientService: any = {};
    serviceItemPanel: any;

    @ViewChild(ClientServiceEditComponent)
    public clientServiceEditComponent: ClientServiceEditComponent;

    constructor(private router: Router,
                private notificationService: NotificationService,
                private clientServiceService: ClientServiceService,
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

        this.serviceItemPanel = {
            title: 'Service Items',
            collapsed: false,
            close: false,
            fullScreen: false,
            menu: [{
                title: 'Add',
                onMenuSelect: () => this.onMenuServiceItemSelect('add')
            }]
        };

        this.activatedRoute.params
            .subscribe(
                params => {
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

    onMenuServiceItemSelect(action: string) {
        const self = this;
        switch (action) {
            case 'add':
                // this.router.navigate(['/app/clientserviceitems/edit/new']);
                self.activatedRoute.params
                    .subscribe(
                        params => {
                            this.router.navigate(['app', 'clientservices', params['id'],
                                'clientserviceitems', 'new']);
                        }
                    );
                break;
            default: // do nothing
        }
    }

    onMenuSelect(action: string) {
        const self = this;
        switch (action) {
            case 'edit':
                this.router.navigate(['/app/clientservices/edit/', this.clientService._id]);
                break;
            case 'delete':
                this.notificationService.showModal({
                    title: 'Confirm Delete',
                    subTitle: null,
                    content: 'Are you sure you want to delete this client service:',
                    subContent: self.clientService.name,
                    buttons: [{
                        title: 'Cancel',
                        onClick: ($event) => {
                            self.notificationService.closeModal();
                        },
                        class: 'btn btn-gray'
                    }, {
                        title: 'Yes, delete',
                        onClick: ($event) => {
                            self.clientServiceService
                                .deleteClientService(self.activatedRoute.snapshot.params['id'])
                                .subscribe(
                                    clientService => {
                                        self.notificationService.displayMessage({
                                            message: 'Deleted ' +
                                            clientService.name,
                                            type: 'success'
                                        });

                                        self.notificationService.closeModal();
                                        self.router.navigate(['/app/clientservices']);
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

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
    panel: any;
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
                    self.clientService.getClient('5861eb74d9191d001179586c')
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
                                            client.firstName + ' ' +
                                            client.lastName +
                                            ' (' + client.email + ')',
                                            type: 'success'
                                        });

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
}

import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationService } from '../../services/notification.service';
import { ClientServiceService } from '../../services/clientservice.service';
import { ClientServiceTaskService } from '../../services/clientservicetask.service';

@Component({
    selector: 'clientservicetask-detail',
    templateUrl: 'clientservicetask-detail.template.html',
    styleUrls: ['clientservicetask-detail.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientServiceTaskDetailComponent implements OnInit {
    panel: any;
    clientService: any = {};
    clientServiceTask: any = {};

    constructor(private router: Router,
                private notificationService: NotificationService,
                private clientServiceService: ClientServiceService,
                private clientServiceTaskService: ClientServiceTaskService,
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
                    self.clientServiceTaskService
                        .getClientServiceTask(params['clientservicetaskid'])
                        .subscribe(
                            clientServiceTask => {
                                self.clientServiceTask = clientServiceTask;
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
                this.router.navigate(['app', 'clientservices', self.clientService._id,
                    'clientservicetasks', 'edit', this.clientServiceTask._id]);
                break;
            case 'delete':
                this.notificationService.showModal({
                    title: 'Confirm Delete',
                    subTitle: null,
                    content: 'Are you sure you want to delete client:',
                    subContent: self.clientServiceTask.firstName + ' ' +
                    self.clientServiceTask.lastName +
                    ' (' + self.clientServiceTask.company + ')',
                    buttons: [{
                        title: 'Cancel',
                        onClick: ($event) => {
                            self.notificationService.closeModal();
                        },
                        class: 'btn btn-gray'
                    }, {
                        title: 'Yes, delete',
                        onClick: ($event) => {
                            self.clientServiceTask
                                .deleteClient(self.activatedRoute.snapshot.params['id'])
                                .subscribe(
                                    clientServiceTask => {
                                        self.notificationService.displayMessage({
                                            message: 'Deleted ' +
                                            clientServiceTask.firstName + ' ' +
                                            clientServiceTask.lastName +
                                            ' (' + clientServiceTask.email + ')',
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

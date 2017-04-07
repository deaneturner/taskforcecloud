import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationService } from '../../services/notification.service';
import { ClientServiceService } from '../../services/clientservice.service';
import { ClientServiceTaskService } from '../../services/clientservicetask.service';

import { ClientService } from '../../model/clientservice.interface';
import { ClientServiceTask } from '../../model/clientservicetask.interface';

@Component({
    selector: 'clientservicetask-detail',
    templateUrl: 'clientservicetask-detail.template.html',
    styleUrls: ['clientservicetask-detail.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientServiceTaskDetailComponent implements OnInit {
    iconClass = ['fa', 'fa-cube'];
    panel: any;
    clientService = <ClientService>{};
    clientServiceTask = <ClientServiceTask>{};

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
                    // service task
                    self.clientServiceTask = self.clientServiceTaskService
                        .getClientServiceTaskContext();
                    if (self.clientServiceTask
                        && self.clientServiceTask._id !== params['clientservicetaskid']) {
                        self.clientServiceTaskService
                            .getClientServiceTask(params['clientservicetaskid'])
                            .subscribe(
                                clientServiceTask => {
                                    self.clientServiceTask = clientServiceTask;
                                    self.clientServiceTaskService
                                        .setClientServiceTaskContext(clientServiceTask);
                                },
                                error => {
                                } // error is handled by service
                            );

                    }

                    self.clientService = self.clientServiceService.getClientServiceContext();
                    if (self.clientService && self.clientService._id !== params['id']) {
                        self.clientServiceService.getClientService(params['id'])
                            .subscribe(
                                clientService => {
                                    self.clientService = clientService;
                                    self.clientServiceService
                                        .setClientServiceContext(clientService);
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
                this.router.navigate(['app', 'clientservices', self.clientService._id,
                    'clientservicetasks', 'edit', this.clientServiceTask._id]);
                break;
            case 'delete':
                this.notificationService.showModal({
                    title: 'Confirm Delete',
                    subTitle: null,
                    content: 'Are you sure you want to delete client service task:',
                    subContent: self.clientServiceTask.name,
                    buttons: [{
                        title: 'Cancel',
                        onClick: ($event) => {
                            self.notificationService.closeModal();
                        },
                        class: 'btn btn-gray'
                    }, {
                        title: 'Yes, delete',
                        onClick: ($event) => {
                            self.clientServiceTaskService
                                .deleteClientServiceTask(self.clientServiceTask._id)
                                .subscribe(
                                    clientServiceTask => {
                                        self.notificationService.displayMessage({
                                            message: 'Deleted ' +
                                            clientServiceTask.name,
                                            type: 'success'
                                        });

                                        self.clientServiceService.clearClientServiceContext();

                                        self.notificationService.closeModal();
                                        self.router.navigate(['/app/clientservices/detail',
                                            self.clientService._id]);
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

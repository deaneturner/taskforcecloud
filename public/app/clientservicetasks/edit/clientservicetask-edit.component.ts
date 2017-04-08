import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientServiceService } from '../../services/clientservice.service';
import { ClientServiceTaskService } from '../../services/clientservicetask.service';

import { ClientService } from '../../model/clientservice.interface';
import { ClientServiceTask } from '../../model/clientservicetask.interface';

@Component({
    selector: 'clientservicetask-edit',
    templateUrl: 'clientservicetask-edit.template.html',
    styleUrls: ['clientservicetask-edit.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientServiceTaskEditComponent implements OnInit {
    iconClass = ['fa', 'fa-cube'];
    clientService = <ClientService>{};
    clientServiceTask = <ClientServiceTask>{};
    clientServiceTaskForm: NgForm;
    formErrors: any = {
        'name': []
    };
    validationMessages: any = {};

    @ViewChild('clientServiceTaskForm')
    currentForm: NgForm;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private clientServiceService: ClientServiceService,
                private clientServiceTaskService: ClientServiceTaskService) {
    }

    ngOnInit(): void {
        const self = this;

        this.activatedRoute.params
            .subscribe(
                params => {
                    const paramId = params['clientservicetaskid'];
                    if (paramId !== 'new') {
                        self.clientServiceTask = self.clientServiceTaskService
                            .getClientServiceTaskContext();
                        if (self.clientServiceTask && self.clientServiceTask._id !== paramId) {
                            this.clientServiceTaskService.getClientServiceTask(paramId)
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
                    } else {
                        // add new
                        self.clientServiceTask = self.clientServiceTaskService
                            .clearClientServiceTaskContext();
                    }

                    // client
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

    upsertClientServiceTask(isValid: boolean, clientServiceTaskForm: ClientServiceTask) {
        const self = this;
        let clientServiceTask = <ClientServiceTask>clientServiceTaskForm;
        if (isValid) {
            if (this.clientServiceTask._id) {
                // update
                this.clientServiceTaskService
                    .updateClientServiceTask(this.clientServiceTask._id, clientServiceTask)
                    .subscribe(
                        res => {
                            if (res.success) {
                                self.router
                                    .navigate([
                                        'app',
                                        'clientservices',
                                        self.clientService._id,
                                        'clientservicetasks',
                                        'detail',
                                        self.clientServiceTask._id
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
                clientServiceTask._clientServiceId = self.clientService._id;
                this.clientServiceTaskService.insertClientServiceTask(clientServiceTask)
                    .subscribe(
                        res => {
                            if (res.success) {
                                self.router.navigate([
                                    'app',
                                    'clientservices',
                                    self.clientService._id,
                                    'clientservicetasks',
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
        if (this.clientServiceTask._id) {
            this.router.navigate(['/app/clientservices', this.clientService._id,
                'clientservicetasks', 'detail', this.clientServiceTask._id]);
        } else {
            this.router.navigate(['/app/clientservices/detail/', this.clientService._id]);
        }
    }

    /*
     * FORM
     */

    ngAfterViewChecked() {
        this.formChanged();
    }

    formChanged() {
        if (this.currentForm === this.clientServiceTaskForm) {
            return;
        }
        this.clientServiceTaskForm = this.currentForm;
        if (this.clientServiceTaskForm) {
            this.clientServiceTaskForm.valueChanges
                .subscribe(data => this.onValueChanged(data));
        }
    }

    onValueChanged(data ?: any) {
        if (!this.clientServiceTaskForm) {
            return;
        }
        const form = this.clientServiceTaskForm.form;

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

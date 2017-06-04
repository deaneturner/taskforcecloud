import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Client } from '../../model/client.interface';
import { ClientServiceTaskService } from '../../services/clientservicetask.service';

@Component({
    selector: 'tfc-cmp-clientservicetask-list',
    templateUrl: './clientservicetask-list.template.html',
    styleUrls: ['./clientservicetask-list.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientServiceTaskListComponent implements OnInit {
    @Input() iconClass: any;
    clientService: any = {};
    clientServiceTasks: Array<Client>;

    constructor(public router: Router,
                private activatedRoute: ActivatedRoute,
                private clientServiceTaskService: ClientServiceTaskService) {
    }


    ngOnInit(): void {
        this.clientService._id = this.activatedRoute.snapshot.params['id'];
        this.getClientServiceTasks(this.clientService._id);
    }

    getClientServiceTasks(clientServiceId: string) {
        this.clientServiceTaskService.getClientServiceTasks(clientServiceId)
            .subscribe(
                clientServiceTasks => this.clientServiceTasks = clientServiceTasks,
                error => {
                }  // error is handled by service
            );
    }
}

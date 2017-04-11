import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { ClientService } from '../../model/clientservice.interface';
import { ClientServiceSvc } from '../../services/clientservice.service';

@Component({
    selector: 'tfc-client-service-list',
    templateUrl: './clientservice-list.template.html',
    styleUrls: ['./clientservice-list.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientServiceListComponent {
    @Input() iconClass: any;
    clientServices: Array<ClientService>;

    constructor(private router: Router,
                private clientServiceSvc: ClientServiceSvc) {
    }


    ngOnInit(): void {
        this.getClientServices();
    };

    getClientServices() {
        this.clientServiceSvc.getClientServices()
            .subscribe(
                clientServices => this.clientServices = clientServices,
                error => {
                }  // error is handled by service
            );
    }
}

import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { ClientService } from '../../model/clientservice.interface';
import { ClientServiceService } from '../../services/clientservice.service';

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
                private clientServiceService: ClientServiceService) {
    }


    ngOnInit(): void {
        this.getClientServices();
    };

    getClientServices() {
        this.clientServiceService.getClientServices()
            .subscribe(
                clientServices => this.clientServices = clientServices,
                error => {
                }  // error is handled by service
            );
    }
}

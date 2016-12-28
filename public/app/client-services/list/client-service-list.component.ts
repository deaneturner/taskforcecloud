import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { ClientService } from '../../model/client-service.interface';
import { ClientServiceService } from '../../services/client-service.service';

@Component({
    selector: 'tfc-client-service-list',
    templateUrl: './client-service-list.template.html',
    styleUrls: ['./client-service-list.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientServiceListComponent {
    selectedClientService: string;
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

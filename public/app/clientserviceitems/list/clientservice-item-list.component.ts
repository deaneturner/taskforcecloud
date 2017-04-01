import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Client } from '../../model/client.interface';
import { ClientService } from '../../services/client.service';

@Component({
    selector: 'tfc-client-service-item-list',
    templateUrl: './clientservice-item-list.template.html',
    styleUrls: ['./clientservice-item-list.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientServiceItemListComponent {
    selectedClient: string;
    clients: Array<Client>;

    constructor(private router: Router,
                private clientService: ClientService) {
    }


    ngOnInit(): void {
        this.getClients();
    };

    getClients() {
        this.clientService.getClients()
            .subscribe(
                clients => this.clients = clients,
                error => {
                }  // error is handled by service
            );
    }
}

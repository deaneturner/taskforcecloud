import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Client } from '../../model/client.interface';
import { ClientService } from '../../services/client.service';

@Component({
    selector: 'tfc-cmp-client-list',
    templateUrl: './client-list.template.html',
    styleUrls: ['./client-list.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientListComponent implements OnInit {
    @Input() iconClass: any;
    clients: Array<Client>;

    constructor(public router: Router,
                private clientService: ClientService) {
    }


    ngOnInit(): void {
        this.getClients();
    }

    getClients() {
        this.clientService.getClients()
            .subscribe(
                clients => this.clients = clients,
                error => {
                }  // error is handled by service
            );
    }
}

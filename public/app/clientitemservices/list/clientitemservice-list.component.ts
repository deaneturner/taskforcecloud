import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Client } from '../../model/client.interface';
import { ClientItem } from '../../model/clientitem.interface';

import { ClientItemService } from '../../services/clientitem.service';

@Component({
    selector: 'tfc-cmp-clientitemservice-list',
    templateUrl: './clientitemservice-list.template.html',
    styleUrls: ['./clientitemservice-list.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientItemServiceListComponent implements OnInit {
    @Input() iconClass: any;
    client = <Client>{};
    clientItem = <ClientItem>{};
    clientItemServices: Array<ClientItem>;

    constructor(public router: Router,
                private activatedRoute: ActivatedRoute,
                private clientItemServiceSvc: ClientItemService) {
    }


    ngOnInit(): void {
        this.client._id = this.activatedRoute.snapshot.params['id'];
        this.clientItem._id = this.activatedRoute.snapshot.params['clientitemid'];
        this.getClientItems(this.client._id);
    }

    getClientItems(clientId: string) {
        this.clientItemServiceSvc.getClientItems(clientId)
            .subscribe(
                clientItemServices => this.clientItemServices = clientItemServices,
                error => {
                }  // error is handled by service
            );
    }
}

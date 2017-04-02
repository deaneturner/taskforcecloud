import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Client } from '../../model/client.interface';
import { ClientServiceItemService } from '../../services/clientservicetask.service';

@Component({
    selector: 'tfc-clientservicetask-list',
    templateUrl: './clientservicetask-list.template.html',
    styleUrls: ['./clientservicetask-list.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientServiceItemListComponent {
    clientService: any = {};
    clientServiceItems: Array<Client>;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private clientServiceItemService: ClientServiceItemService) {
    }


    ngOnInit(): void {
        this.clientService._id = this.activatedRoute.snapshot.params['id'];
        this.getClientServiceItems();
    };

    getClientServiceItems() {
        this.clientServiceItemService.getClientServiceItems()
            .subscribe(
                clientServiceItems => this.clientServiceItems = clientServiceItems,
                error => {
                }  // error is handled by service
            );
    }
}

import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Client } from '../../model/client.interface';
import { ClientItemService } from '../../services/clientitem.service';

@Component({
    selector: 'tfc-clientitem-list',
    templateUrl: './clientitem-list.template.html',
    styleUrls: ['./clientitem-list.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientItemListComponent {
    client: any = {};
    clientItems: Array<Client>;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private clientItemService: ClientItemService) {
    }


    ngOnInit(): void {
        this.client._id = this.activatedRoute.snapshot.params['id'];
        this.getClientItems();
    };

    getClientItems() {
        this.clientItemService.getClientItems()
            .subscribe(
                clientItems => this.clientItems = clientItems,
                error => {
                }  // error is handled by service
            );
    }
}

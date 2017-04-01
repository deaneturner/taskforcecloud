import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientServiceItemDetailComponent } from './detail/client-service-item-detail.component';
import { ClientServiceItemEditComponent } from './edit/client-service-item-edit.component';
import { ClientServiceItemListModule } from './list/client-service-item-list.module';
import { PanelModule } from '../shared/panel/panel.module';
import { ClientServiceService } from '../services/clientservice.service';

import { ROUTES }       from './clientserviceitems.routes';

@NgModule({
    imports: [PanelModule, CommonModule, FormsModule, ROUTES, ClientServiceItemListModule],
    declarations: [ClientServiceItemDetailComponent, ClientServiceItemEditComponent],
    providers: [ClientServiceService],
    exports: [ClientServiceItemListModule]
})

export class ClientServiceItemsModule {
}

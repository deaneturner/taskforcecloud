import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientsComponent } from './clients.component';
import { ClientDetailComponent } from './detail/client-detail.component';
import { ClientEditComponent } from './edit/client-edit.component';
import { ClientListComponent } from './list/client-list.component';
import { ClientServiceItemService } from '../services/clientserviceitem.service';
import { ClientServiceItemListModule }
    from '../clientservicetasks/list/clientservicetask-list.module';
import { PanelModule } from '../shared/panel/panel.module';
import { ClientService } from '../services/client.service';

import { ROUTES }       from './clients.routes';

@NgModule({
    imports: [PanelModule, CommonModule, FormsModule, ROUTES, ClientServiceItemListModule],
    declarations: [ClientsComponent, ClientDetailComponent, ClientEditComponent,
        ClientListComponent],
    providers: [ClientService, ClientServiceItemService]
})
export default class ClientModule {
}

import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientsComponent } from './clients.component';
import { ClientDetailComponent } from './detail/client-detail.component';
import { ClientEditComponent } from './edit/client-edit.component';
import { ClientListModule } from './list/client-list.module';
import { ServiceItemListComponent } from '../serviceitems/list/service-item-list.component';
import { PanelModule } from '../shared/panel/panel.module';
import { ClientService } from '../services/client.service';

import { ROUTES }       from './clients.routes';

@NgModule({
    imports: [PanelModule, ClientListModule, CommonModule, FormsModule, ROUTES],
    declarations: [ClientsComponent, ClientDetailComponent, ClientEditComponent,
        ServiceItemListComponent],
    providers: [ClientService]
})
export default class ClientModule {
}

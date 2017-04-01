import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientServicesComponent } from './clientservices.component';
import { ClientServiceDetailComponent } from './detail/clientservice-detail.component';
import { ClientServiceEditComponent } from './edit/clientservice-edit.component';
import { ClientServiceListModule } from './list/clientservice-list.module';
import { ClientServiceItemListModule }
    from '../clientserviceitems/list/clientservice-item-list.module';
import { ClientServiceItemEditComponent }
    from '../clientserviceitems/edit/clientservice-item-edit.component';
import { PanelModule } from '../shared/panel/panel.module';
import { ClientServiceService } from '../services/clientservice.service';
import { ClientService } from '../services/client.service';

import { ROUTES }       from './clientservices.routes';

@NgModule({
    imports: [PanelModule,
        ClientServiceListModule,
        CommonModule,
        FormsModule,
        ROUTES,
        ClientServiceItemListModule],
    declarations: [
        ClientServicesComponent,
        ClientServiceDetailComponent,
        ClientServiceEditComponent,
        ClientServiceItemEditComponent],
    providers: [
        ClientServiceService,
        ClientService]
})
export default class ClientServiceModule {
}

import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ServiceItemDetailComponent } from './detail/service-item-detail.component';
import { ServiceItemEditComponent } from './edit/service-item-edit.component';
import { ServiceItemListModule } from './list/service-item-list.module';
import { PanelModule } from '../shared/panel/panel.module';
import { ClientService } from '../services/client.service';

import { ROUTES }       from './serviceitems.routes';

@NgModule({
    imports: [PanelModule, CommonModule, FormsModule, ROUTES, ServiceItemListModule],
    declarations: [ServiceItemDetailComponent, ServiceItemEditComponent],
    providers: [ClientService]
})
export default class ServiceItemsModule {
}

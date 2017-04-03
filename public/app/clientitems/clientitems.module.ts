import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientItemDetailComponent } from './detail/clientitem-detail.component';
import { ClientItemEditComponent } from './edit/clientitem-edit.component';
import { ClientItemListModule } from './list/clientitem-list.module';
import { PanelModule } from '../shared/panel/panel.module';
import { ClientItemService } from '../services/clientitem.service';

import { ROUTES } from './clientitems.routes';

@NgModule({
    imports: [PanelModule, CommonModule, FormsModule, ROUTES, ClientItemListModule],
    declarations: [
        ClientItemDetailComponent,
        ClientItemEditComponent],
    providers: [ClientItemService],
    exports: [ClientItemDetailComponent, ClientItemEditComponent, ClientItemListModule]
})

export class ClientItemsModule {
}

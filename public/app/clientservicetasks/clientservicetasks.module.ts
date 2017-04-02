import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientServiceItemDetailComponent } from './detail/clientservicetask-detail.component';
import { ClientServiceItemEditComponent } from './edit/clientservicetask-edit.component';
import { ClientServiceItemListModule } from './list/clientservicetask-list.module';
import { PanelModule } from '../shared/panel/panel.module';

import { ROUTES }       from './clientservicetasks.routes';

@NgModule({
    imports: [PanelModule, CommonModule, FormsModule, ROUTES, ClientServiceItemListModule],
    declarations: [
        ClientServiceItemDetailComponent,
        ClientServiceItemEditComponent],
    exports: [ClientServiceItemListModule]
})

export class ClientServiceItemsModule {
}

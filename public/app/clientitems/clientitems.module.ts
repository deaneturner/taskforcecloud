import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-modal';

import { ClientItemListModule } from './list/clientitem-list.module';
import { PanelModule } from '../shared/panel/panel.module';
import { ClientItemServiceListModule } from
    '../clientitemservices/list/clientitemservice-list.module';

import { ClientServiceService } from '../services/clientservice.service';
import { ClientItemService } from '../services/clientitem.service';

import { ClientItemDetailComponent } from './detail/clientitem-detail.component';
import { ClientItemEditComponent } from './edit/clientitem-edit.component';
import { ServicesModalComponent } from './detail/services-modal-window/services-modal.component';

import { ROUTES } from './clientitems.routes';

@NgModule({
    imports: [PanelModule, CommonModule, FormsModule, ROUTES,
        ClientItemServiceListModule, ModalModule],
    declarations: [
        ClientItemDetailComponent,
        ClientItemEditComponent,
        ServicesModalComponent],
    providers: [ClientItemService, ClientServiceService],
    exports: [ClientItemDetailComponent, ClientItemEditComponent, ClientItemListModule]
})

export class ClientItemsModule {
}

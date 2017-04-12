import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientItemServiceDetailComponent } from './detail/clientitemservice-detail.component';
import { ClientItemServiceEditComponent } from './edit/clientitemservice-edit.component';
import { ClientItemServiceListModule } from './list/clientitemservice-list.module';
import { PanelModule } from '../shared/panel/panel.module';
import { ClientItemService } from '../services/clientitem.service';
import { ClientItemServiceService } from '../services/clientitemservice.service';

import { ROUTES } from './clientitemservices.routes';

@NgModule({
    imports: [PanelModule, CommonModule, FormsModule, ROUTES, ClientItemServiceListModule],
    declarations: [
        ClientItemServiceDetailComponent,
        ClientItemServiceEditComponent],
    providers: [ClientItemService, ClientItemServiceService],
    exports: [ClientItemServiceDetailComponent, ClientItemServiceEditComponent,
        ClientItemServiceListModule]
})

export class ClientItemServicesModule {
}

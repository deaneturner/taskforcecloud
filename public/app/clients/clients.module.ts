import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientsComponent } from './clients.component';
import { ClientEditComponent } from './edit/client-edit.component';
import { ClientListModule } from './list/client-list.module';
import { PanelModule } from '../shared/panel/panel.module';

import { ROUTES }       from './clients.routes';

@NgModule({
    imports: [PanelModule, ClientListModule, CommonModule, FormsModule, ROUTES],
    declarations: [ClientsComponent, ClientEditComponent]
})
export default class ClientModule {
}

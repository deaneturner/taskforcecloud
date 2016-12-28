import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientServicesComponent } from './client-services.component';
import { ClientServiceDetailComponent } from './detail/client-service-detail.component';
import { ClientServiceEditComponent } from './edit/client-service-edit.component';
import { ClientServiceListModule } from './list/client-service-list.module';
import { PanelModule } from '../shared/panel/panel.module';
import { ClientServiceService } from '../services/client-service.service';

import { ROUTES }       from './client-services.routes';

@NgModule({
    imports: [PanelModule, ClientServiceListModule, CommonModule, FormsModule, ROUTES],
    declarations: [
        ClientServicesComponent,
        ClientServiceDetailComponent,
        ClientServiceEditComponent],
    providers: [
        ClientServiceService]
})
export default class ClientServiceModule {
}

import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientServicesComponent } from './clientservices.component';
import { ClientServiceDetailComponent } from './detail/clientservice-detail.component';
import { ClientServiceEditComponent } from './edit/clientservice-edit.component';
import { ClientServiceListModule } from './list/clientservice-list.module';
import { ClientServiceTaskListModule }
    from '../clientservicetasks/list/clientservicetask-list.module';
import { ClientServiceTaskEditComponent }
    from '../clientservicetasks/edit/clientservicetask-edit.component';
import { ClientServiceTaskDetailComponent }
    from '../clientservicetasks/detail/clientservicetask-detail.component';
import { PanelModule } from '../shared/panel/panel.module';
import { ClientServiceService } from '../services/clientservice.service';
import { ClientServiceTaskService } from '../services/clientservicetask.service';
import { ClientService } from '../services/client.service';

import { ROUTES }       from './clientservices.routes';

@NgModule({
    imports: [PanelModule,
        ClientServiceListModule,
        CommonModule,
        FormsModule,
        ROUTES,
        ClientServiceTaskListModule],
    declarations: [
        ClientServicesComponent,
        ClientServiceDetailComponent,
        ClientServiceEditComponent,
        ClientServiceTaskEditComponent,
        ClientServiceTaskDetailComponent],
    providers: [
        ClientServiceService,
        ClientServiceTaskService,
        ClientService]
})
export default class ClientServiceModule {
}

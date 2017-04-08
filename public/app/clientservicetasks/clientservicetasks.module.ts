import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientServiceTaskDetailComponent } from './detail/clientservicetask-detail.component';
import { ClientServiceTaskEditComponent } from './edit/clientservicetask-edit.component';
import { ClientServiceTaskListModule } from './list/clientservicetask-list.module';
import { PanelModule } from '../shared/panel/panel.module';

import { ROUTES }       from './clientservicetasks.routes';

@NgModule({
    imports: [PanelModule, CommonModule, FormsModule, ROUTES, ClientServiceTaskListModule],
    declarations: [
        ClientServiceTaskDetailComponent,
        ClientServiceTaskEditComponent],
    exports: [ClientServiceTaskListModule]
})

export class ClientServiceTasksModule {
}

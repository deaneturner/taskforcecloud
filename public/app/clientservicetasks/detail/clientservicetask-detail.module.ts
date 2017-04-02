import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule } from '@angular/router';

import { ClientServiceTaskDetailComponent } from './clientservicetask-detail.component';
import { PanelModule } from '../shared/panel/panel.module';

import { AppGuard } from '../app.guard';

export const routes = [
    {   path: '',
        component: ClientServiceTaskDetailComponent,
        pathMatch: 'full',
        canActivate: [AppGuard]
    }
];

@NgModule({
    imports: [PanelModule, CommonModule, RouterModule.forChild(routes)],
    declarations: [ClientServiceTaskDetailComponent]
})
export default class ClientServiceTaskDetailModule {
    static routes = routes;
}

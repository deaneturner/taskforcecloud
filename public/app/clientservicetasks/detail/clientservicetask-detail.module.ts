import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule } from '@angular/router';

import { ClientServiceItemDetailComponent } from './clientservicetask-detail.component';
import { PanelModule } from '../shared/panel/panel.module';

import { AppGuard } from '../app.guard';

export const routes = [
    {   path: '',
        component: ClientServiceItemDetailComponent,
        pathMatch: 'full',
        canActivate: [AppGuard]
    }
];

@NgModule({
    imports: [PanelModule, CommonModule, RouterModule.forChild(routes)],
    declarations: [ClientServiceItemDetailComponent]
})
export default class ClientServiceItemDetailModule {
    static routes = routes;
}

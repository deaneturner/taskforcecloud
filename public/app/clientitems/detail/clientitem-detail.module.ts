import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule } from '@angular/router';

import { ClientItemDetailComponent } from './clientitem-detail.component';
import { PanelModule } from '../shared/panel/panel.module';

import { AppGuard } from '../app.guard';

export const routes = [
    {   path: '',
        component: ClientItemDetailComponent,
        pathMatch: 'full',
        canActivate: [AppGuard]
    }
];

@NgModule({
    imports: [PanelModule, CommonModule, RouterModule.forChild(routes)],
    declarations: [ClientItemDetailComponent]
})
export default class ClientItemDetailModule {
    static routes = routes;
}

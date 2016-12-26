import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule } from '@angular/router';

import { ClientsComponent } from './clients.component';
import { PanelModule } from '../shared/panel/panel.module';
import { ClientListModule } from './list/client-list.module';

import { AppGuard } from '../app.guard';

export const routes = [
    {path: '', component: ClientsComponent, pathMatch: 'full', canActivate: [AppGuard]}
];

@NgModule({
    imports: [PanelModule, ClientListModule, CommonModule, RouterModule.forChild(routes)],
    declarations: [ClientsComponent]
})
export default class ClientModule {
    static routes = routes;
}

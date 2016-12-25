import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule } from '@angular/router';

import { ClientDetailComponent } from './client-detail.component';
import { PanelModule } from '../shared/panel/panel.module';
import { ObjectiveListModule } from '../objective/list/objective-list.module';

import { AppGuard } from '../app.guard';

export const routes = [
    {path: '', component: ClientDetailComponent, pathMatch: 'full', canActivate: [AppGuard]}
];

@NgModule({
    imports: [PanelModule, ObjectiveListModule, CommonModule, RouterModule.forChild(routes)],
    declarations: [ClientDetailComponent]
})
export default class ClientDetailModule {
    static routes = routes;
}

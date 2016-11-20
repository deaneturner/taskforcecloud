import 'jquery-ui/ui/sortable.js';

import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';
import {RouterModule} from '@angular/router';

import {AdminComponent} from './admin.component';
import {PanelModule} from '../shared/panel/panel.module';
import {UserListModule} from '../users/list/user-list.module';

import {AppGuard} from '../app.guard';

export const routes = [
    {path: '', component: AdminComponent, pathMatch: 'full', canActivate: [AppGuard]}
];


@NgModule({
    imports: [PanelModule, UserListModule, CommonModule, RouterModule.forChild(routes)],
    declarations: [AdminComponent]
})
export default class AdminModule {
    static routes = routes;
}

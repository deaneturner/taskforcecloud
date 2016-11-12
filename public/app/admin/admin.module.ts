import 'jquery-ui/ui/sortable.js';

import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';
import {RouterModule} from '@angular/router';

import {Admin} from './admin.component';
import {PanelModule} from '../shared/panel/panel.module';
import {UserListModule} from '../user/list/user-list.module';

import {AppGuard} from '../app.guard';

export const routes = [
    {path: '', component: Admin, pathMatch: 'full', canActivate: [AppGuard]}
];


@NgModule({
    imports: [PanelModule, UserListModule, CommonModule, RouterModule.forChild(routes)],
    declarations: [Admin]
})
export default class AdminModule {
    static routes = routes;
}

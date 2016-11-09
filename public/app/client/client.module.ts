import 'jquery-ui/ui/sortable.js';

import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';
import {RouterModule} from '@angular/router';

import {Client} from './client.component';
import {PanelModule} from '../shared/panel/panel.module';
import {ObjectiveListModule} from '../objective/list/objective-list.module';

import {AppAuth} from '../app.auth';

export const routes = [
    {path: '', component: Client, pathMatch: 'full', canActivate: [AppAuth]}
];

@NgModule({
    imports: [PanelModule, ObjectiveListModule, CommonModule, RouterModule.forChild(routes)],
    declarations: [Client]
})
export default class ClientModule {
    static routes = routes;
}

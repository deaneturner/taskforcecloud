import 'jquery-ui/ui/sortable.js';

import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';
import {RouterModule} from '@angular/router';

import {ClientComponent} from './client.component';
import {SharedModule} from '../shared/shared.module';
import {ObjectiveListModule} from '../objective/list/objective-list.module';

import {AppGuard} from '../app.guard';

export const routes = [
    {path: '', component: ClientComponent, pathMatch: 'full', canActivate: [AppGuard]}
];

@NgModule({
    imports: [SharedModule, ObjectiveListModule, CommonModule, RouterModule.forChild(routes)],
    declarations: [ClientComponent]
})
export default class ClientModule {
    static routes = routes;
}

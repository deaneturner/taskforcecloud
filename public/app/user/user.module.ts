import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';
import {RouterModule} from '@angular/router';

import {UserComponent} from './user.component';
import {AppGuard} from '../app.guard';

export const routes = [
    {path: '', component: UserComponent, pathMatch: 'full', canActivate: [AppGuard]}
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [UserComponent]
})

export default class UserModule {
    static routes = routes;
}

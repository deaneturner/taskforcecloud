import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {UserDetailComponent} from './user-detail.component';
import {UserEditComponent} from './user-edit.component';

export const routes = [
    {path: '', component: UserDetailComponent, pathMatch: 'full'}
];

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        UserDetailComponent,
        UserEditComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})
export default class UserDetailModule {
    static routes = routes;
}

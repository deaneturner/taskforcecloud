import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {UserEditComponent} from './user-edit.component';
import {UserService} from '../../services/user.service';

export const routes = [
    {path: '', component: UserEditComponent, pathMatch: 'full'}
];

@NgModule({
    declarations: [
        UserEditComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    providers: [UserService]
})
export default class UserEditModule {
    static routes = routes;
}

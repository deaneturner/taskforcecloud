import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';

import {UserDetailComponent} from './detail/user-detail.component';
import {UserEditComponent} from './edit/user-edit.component';

import {ROUTES}       from './user.routes';

@NgModule({
    imports: [CommonModule, ROUTES],
    declarations: [UserDetailComponent, UserEditComponent]
})

export default class UserModule {
}

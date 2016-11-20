import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';

import {UserDetailComponent} from './detail/user-detail.component';
import {UserEditComponent} from './edit/user-edit.component';
import {UserListModule} from '../users/list/user-list.module';
import {PanelModule} from '../shared/panel/panel.module';

import {ROUTES}       from './users.routes';

@NgModule({
    imports: [CommonModule, UserListModule, PanelModule, ROUTES],
    declarations: [UserDetailComponent, UserEditComponent]
})

export default class UserModule {
}

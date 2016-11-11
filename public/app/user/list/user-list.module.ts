import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';

import {UserList} from './user-list.component';
import {UserService} from '../../services/userservice'

@NgModule({
    imports: [CommonModule],
    declarations: [UserList],
    exports: [UserList],
    providers: [UserService]
})
export class UserListModule {
}

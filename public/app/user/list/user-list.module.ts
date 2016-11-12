import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';

import {UserListComponent} from './user-list.component';
import {UserService} from '../../services/userservice'

@NgModule({
    imports: [CommonModule],
    declarations: [UserListComponent],
    exports: [UserListComponent],
    providers: [UserService]
})

export class UserListModule {
}

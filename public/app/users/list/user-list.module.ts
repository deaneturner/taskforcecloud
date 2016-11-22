import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';
import {RouterModule} from '@angular/router';

import {UserListComponent} from './user-list.component';
import {UserService} from '../../services/user.service'

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [UserListComponent],
    exports: [UserListComponent],
    providers: [UserService]
})

export class UserListModule {
}

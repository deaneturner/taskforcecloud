import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';

import {UserList} from './user-list.component';

@NgModule({
    imports: [CommonModule],
    declarations: [UserList],
    exports: [UserList]
})
export class UserListModule {
}

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserDetailComponent } from './user-detail.component';
import { UserService } from '../../services/user.service';

export const routes = [
    {path: '', component: UserDetailComponent, pathMatch: 'full'}
];

@NgModule({
    declarations: [
        UserDetailComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    providers: [UserService]
})
export default class UserDetailModule {
    static routes = routes;
}

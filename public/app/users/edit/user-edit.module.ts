import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EqualValidator } from '../forms/equal-validator.directive';

import { UserEditComponent } from './user-edit.component';

export const routes = [
    {path: '', component: UserEditComponent, pathMatch: 'full'}
];

@NgModule({
    declarations: [
        UserEditComponent,
        EqualValidator
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export default class UserEditModule {
    static routes = routes;
}

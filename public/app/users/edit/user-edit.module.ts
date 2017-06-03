import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EqualValidatorDirective } from '../forms/equal-validator.directive';

import { UserEditComponent } from './user-edit.component';

export const routes = [
    {path: '', component: UserEditComponent, pathMatch: 'full'}
];

@NgModule({
    declarations: [
        UserEditComponent,
        EqualValidatorDirective
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export default class UserEditModule {
    static routes = routes;
}

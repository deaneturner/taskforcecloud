import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EqualValidator } from '../forms/equal-validator.directive';

import { Register } from './register.component';

export const routes = [
    {path: '', component: Register, pathMatch: 'full'}
];

@NgModule({
    declarations: [
        Register,
        EqualValidator
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ]
})
export default class RegisterModule {
    static routes = routes;
}

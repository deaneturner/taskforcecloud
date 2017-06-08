import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EqualValidatorDirective } from '../forms/equal-validator.directive';

import { ClientEditComponent } from './client-edit.component';

export const routes = [
    {path: '', component: ClientEditComponent, pathMatch: 'full'}
];

@NgModule({
    declarations: [
        ClientEditComponent,
        EqualValidatorDirective
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export default class ClientEditModule {
    static routes = routes;
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EqualValidator } from '../forms/equal-validator.directive';

import { ClientServiceEditComponent } from './clientservice-edit.component';

export const routes = [
    {path: '', component: ClientServiceEditComponent, pathMatch: 'full'}
];

@NgModule({
    declarations: [
        ClientServiceEditComponent,
        EqualValidator
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export default class ClientServiceEditModule {
    static routes = routes;
}

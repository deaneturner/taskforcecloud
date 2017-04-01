import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EqualValidator } from '../forms/equal-validator.directive';

import { ClientServiceItemEditComponent } from './client-service-item-edit.component';

export const routes = [
    {path: '', component: ClientServiceItemEditComponent, pathMatch: 'full'}
];

@NgModule({
    declarations: [
        ClientServiceItemEditComponent,
        EqualValidator
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export default class ClientEditModule {
    static routes = routes;
}

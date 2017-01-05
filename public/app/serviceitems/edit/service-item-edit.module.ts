import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EqualValidator } from '../forms/equal-validator.directive';

import { ServiceItemEditComponent } from './service-item-edit.component';

export const routes = [
    {path: '', component: ServiceItemEditComponent, pathMatch: 'full'}
];

@NgModule({
    declarations: [
        ServiceItemEditComponent,
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

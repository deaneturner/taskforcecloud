import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EqualValidator } from '../../forms/equal-validator.directive';

import { ClientItemEditComponent } from './clientitem-edit.component';

export const routes = [
    {path: '', component: ClientItemEditComponent, pathMatch: 'full'}
];

@NgModule({
    declarations: [
        ClientItemEditComponent,
        EqualValidator
    ],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [ClientItemEditComponent]
})
export class ClientItemEditModule {
    static routes = routes;
}

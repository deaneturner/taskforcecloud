import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EqualValidator } from '../../forms/equal-validator.directive';

import { ClientServiceItemEditComponent } from './clientservicetask-edit.component';

export const routes = [
    {path: '', component: ClientServiceItemEditComponent, pathMatch: 'full'}
];

@NgModule({
    declarations: [
        ClientServiceItemEditComponent,
        EqualValidator
    ],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [ClientServiceItemEditComponent]
})
export class ClientServiceItemEditModule {
    static routes = routes;
}

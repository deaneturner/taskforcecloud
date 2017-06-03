import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EqualValidatorDirective } from '../../forms/equal-validator.directive';

import { ClientServiceTaskEditComponent } from './clientservicetask-edit.component';

export const routes = [
    {path: '', component: ClientServiceTaskEditComponent, pathMatch: 'full'}
];

@NgModule({
    declarations: [
        ClientServiceTaskEditComponent,
        EqualValidatorDirective
    ],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [ClientServiceTaskEditComponent]
})
export class ClientServiceTaskEditModule {
    static routes = routes;
}

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { ClientListComponent } from './client-list.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ClientListComponent],
    exports: [ClientListComponent]
})
export class ClientListModule {
}

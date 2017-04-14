import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { ClientItemListComponent } from './clientitem-list.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ClientItemListComponent],
    exports: [ClientItemListComponent]
})
export class ClientItemListModule {
}

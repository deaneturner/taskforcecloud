import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { ClientServiceItemListComponent } from './clientservice-item-list.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ClientServiceItemListComponent],
    exports: [ClientServiceItemListComponent]
})
export class ClientServiceItemListModule {
}

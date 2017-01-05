import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { ServiceItemListComponent } from './service-item-list.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ServiceItemListComponent],
    exports: [ServiceItemListComponent]
})
export class ClientListModule {
}

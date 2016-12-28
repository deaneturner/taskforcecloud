import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { ClientServiceListComponent } from './client-service-list.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ClientServiceListComponent],
    exports: [ClientServiceListComponent]
})
export class ClientServiceListModule {
}

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { ClientServiceListComponent } from './clientservice-list.component';
import { ClientServiceService } from '../../services/clientservice.service';

@NgModule({
    imports: [CommonModule],
    declarations: [ClientServiceListComponent],
    providers: [ClientServiceService],
    exports: [ClientServiceListComponent]
})
export class ClientServiceListModule {
}

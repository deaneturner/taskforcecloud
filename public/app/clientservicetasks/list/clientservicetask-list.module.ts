import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { ClientServiceTaskListComponent } from './clientservicetask-list.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ClientServiceTaskListComponent],
    exports: [ClientServiceTaskListComponent]
})
export class ClientServiceTaskListModule {
}

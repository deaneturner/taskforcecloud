import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { ClientItemServiceListComponent } from './clientitemservice-list.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ClientItemServiceListComponent],
    exports: [ClientItemServiceListComponent]
})
export class ClientItemServiceListModule {
}

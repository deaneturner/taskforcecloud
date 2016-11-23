import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { ObjectiveListComponent } from './objective-list.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ObjectiveListComponent],
    exports: [ObjectiveListComponent]
})
export class ObjectiveListModule {
}

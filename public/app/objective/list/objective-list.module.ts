import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';

import {ObjectiveList} from './objective-list.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ObjectiveList],
    exports: [ObjectiveList]
})
export class ObjectiveListModule {
}

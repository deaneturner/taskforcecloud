import {NgModule}            from '@angular/core';
import {CommonModule}        from '@angular/common';
import {ListComponent} from './list.component';
import {ListWidget} from './list.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [ListComponent, ListWidget],
    exports: [ListComponent]
})
export class ListModule {
}

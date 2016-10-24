import {NgModule}            from '@angular/core';
import {CommonModule}        from '@angular/common';
import {ListComponent} from './list/list.component';
import {ListWidget} from './list/list.widget';
@NgModule({
    imports: [CommonModule],
    declarations: [ListComponent, ListWidget],
    exports: [ListComponent, ListWidget,
        CommonModule]
})
export class SharedModule {
}
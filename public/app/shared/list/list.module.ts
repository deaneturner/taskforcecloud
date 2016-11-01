import {NgModule}            from '@angular/core';
import {CommonModule}        from '@angular/common';
import {ListComponent} from './list.component';
import {ListWidget} from './list.widget';
import {ListItemModule} from './item/list-item.module';

@NgModule({
    imports: [CommonModule, ListItemModule],
    declarations: [ListComponent,  ListWidget],
    exports: [ListComponent, ListWidget,
        CommonModule]
})
export class ListModule {
}

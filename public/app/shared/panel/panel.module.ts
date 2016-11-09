import {NgModule}            from '@angular/core';
import {CommonModule}        from '@angular/common';
import {PanelComponent} from './panel.component';
import {PanelWidget} from './panel.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [PanelComponent, PanelWidget],
    exports: [PanelComponent]
})
export class PanelModule {
}

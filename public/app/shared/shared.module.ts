import {NgModule}            from '@angular/core';
import {CommonModule}        from '@angular/common';
import {PanelComponent} from './panel/panel.component';
import {PanelWidget} from './panel/panel.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [PanelComponent, PanelWidget],
    exports: [PanelComponent]
})
export class SharedModule {
}

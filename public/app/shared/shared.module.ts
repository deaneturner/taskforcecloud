import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { PanelComponent } from './panel/panel.component';
import { PanelDirective } from './panel/panel.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [PanelComponent, PanelDirective],
    exports: [PanelComponent, PanelDirective]
})
export class SharedModule {
}

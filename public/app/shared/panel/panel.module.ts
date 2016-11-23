import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { PanelComponent } from './panel.component';
import { PanelDirective } from './panel.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [PanelComponent, PanelDirective],
    exports: [PanelComponent, PanelDirective]
})
export class PanelModule {
}

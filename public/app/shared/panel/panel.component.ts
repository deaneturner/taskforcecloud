import {Component, ViewEncapsulation, Input} from '@angular/core';
declare var jQuery: any;

@Component({
    selector: 'tfc-panel',
    templateUrl: './panel.template.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./panel.style.scss']
})
export class PanelComponent {
    @Input() config: PanelConfig;

    ngOnInit(): void {

    }
}

export class PanelConfig {
    display: any;
    header: any;

    constructor(header: any, data?: Array<any>, display?: any) {
        this.header = header;
        this.display = display || {
            load: false,
            close: false
        };
    }
}

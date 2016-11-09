import {Component, ViewEncapsulation, Input} from '@angular/core';
declare var jQuery: any;

@Component({
    selector: 'tfc-list',
    templateUrl: './list.template.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./list.style.scss']
})
export class ListComponent {
    @Input() config: ListConfig;

    ngOnInit(): void {

    }
}

export class ListConfig {
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

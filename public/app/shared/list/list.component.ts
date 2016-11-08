import {Component, ViewEncapsulation, Input} from '@angular/core';
declare var jQuery: any;

@Component({
    selector: 'tfc-list',
    templateUrl: './list.template.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./list.style.scss']
})
export class ListComponent {
    @Input() listConfig: any;

    ngOnInit(): void {

    }
}

export class ListConfig {
    displayCtrls: any;
    title: string;
    data: any;

    constructor(title: string, data?: Array<any>, displayCtrls?: any) {
        this.title = title;
        this.data = data;
        this.displayCtrls = displayCtrls || {
            load: false,
            close: false
        };
    }
}

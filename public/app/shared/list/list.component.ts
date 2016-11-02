import {Component, ViewEncapsulation, Input} from '@angular/core';
import {ListItemComponent} from './item/list-item.component';
declare var jQuery: any;

@Component({
    selector: '[list]',
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
        this.displayCtrls = displayCtrls || {
            load: false,
            close: false
        };
    }
}

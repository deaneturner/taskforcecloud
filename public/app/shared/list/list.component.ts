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
    display: any;
    title: string;
    data: any;

    constructor(title: string, data?: Array<any>, display?: any) {
        this.title = title;
        this.display = display || {
            load: false,
            close: false
        }
    }
}

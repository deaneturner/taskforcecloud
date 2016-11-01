import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: '[list-item]',
    templateUrl: './list-item.template.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./list-item.style.scss']
})
export class ListItemComponent {
    ngOnInit(): void {

    }
}

export class ListConfig {
    constructor() {

    }
}
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AppConfig } from '../../app.config';
declare var jQuery: any;

@Component({
    selector: 'tfc-objective-list',
    templateUrl: './objective-list.template.html',
    styleUrls: ['./objective-list.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ObjectiveListComponent {
    @Input() data: any;
    appConfig: any;

    constructor(appConfig: AppConfig) {
        this.appConfig = appConfig.getConfig();
    }

    ngOnInit(): void {
    };
}

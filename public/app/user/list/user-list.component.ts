import {Component, Input, ViewEncapsulation} from '@angular/core';
import {AppConfig} from '../../app.config';
declare var jQuery: any;

@Component({
    selector: 'tfc-user-list',
    templateUrl: './user-list.template.html',
    styleUrls: ['./user-list.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserList {
    @Input() data: any;
    appConfig: any;

    constructor(appConfig: AppConfig) {
        this.appConfig = appConfig.getConfig();
    }

    ngOnInit(): void {};
}

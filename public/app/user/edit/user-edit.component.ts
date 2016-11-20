import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { AppConfig } from '../../app.config';

@Component({
    selector: 'user-edit',
    templateUrl: 'user-edit.template.html',
    styleUrls: ['user-edit.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserEditComponent {
    appConfig: any;

    constructor(appConfig: AppConfig) {
        this.appConfig = appConfig.getConfig();
    }
}
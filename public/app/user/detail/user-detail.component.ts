import { Component, ViewEncapsulation } from '@angular/core';
import { AppConfig } from '../../app.config';

@Component({
    selector: 'user-detail',
    templateUrl: 'user-detail.template.html',
    styleUrls: ['user-detail.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserDetailComponent {
    appConfig: any;

    constructor(appConfig: AppConfig) {
        this.appConfig = appConfig.getConfig();
    }

    ngOnInit(): void {}
}
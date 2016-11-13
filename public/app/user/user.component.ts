import { Component, ViewEncapsulation } from '@angular/core';
import { AppConfig } from '../app.config';

@Component({
    selector: 'user',
    templateUrl: './user.template.html',
    styleUrls: ['./user.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserComponent {
    appConfig: any;

    constructor(appConfig: AppConfig) {
        this.appConfig = appConfig.getConfig();
    }

    ngOnInit(): void {}
}
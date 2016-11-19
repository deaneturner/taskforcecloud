import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { AppConfig } from '../../app.config';

@Component({
    selector: 'user-edit-modal',
    templateUrl: 'user-edit.template.html',
    styleUrls: ['user-edit.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserEditComponent {
    appConfig: any;

    @ViewChild('myModal')
    public modal: any;  // HTML element, but syntax checker does not like modal.open()

    constructor(appConfig: AppConfig) {
        this.appConfig = appConfig.getConfig();
    }

    ngOnInit(): void {}
}
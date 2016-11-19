import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { AppConfig } from '../../app.config';
declare var jQuery: any;

@Component({
    selector: 'user-edit-modal',
    templateUrl: 'user-edit.template.html',
    styleUrls: ['user-edit.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserEditComponent {
    appConfig: any;

    @ViewChild('userEditModal')
    public modal: any;

    constructor(appConfig: AppConfig, private router: Router) {
        this.appConfig = appConfig.getConfig();
    }

    ngOnInit(): void {
        // hook to modal close so navigation returns to detail
        this.modal.onClose.subscribe(() => this.navigateOnClose());
    }

    navigateOnClose () {
        this.modal.close();
        this.router.navigate(['app/user/detail', 1]);
    }
}
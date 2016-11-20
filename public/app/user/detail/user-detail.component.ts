import {Component, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AppConfig} from '../../app.config';

import {NotificationService} from '../../services/notification.service'
import {UserEditComponent} from '../edit/user-edit.component';

@Component({
    selector: 'user-detail',
    templateUrl: 'user-detail.template.html',
    styleUrls: ['user-detail.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserDetailComponent implements OnInit {
    appConfig: any;
    panel: any;

    @ViewChild(UserEditComponent)
    public userEditComponent: UserEditComponent;

    constructor(appConfig: AppConfig,
                private router: Router,
                private notificationService: NotificationService,
                private activatedRoute: ActivatedRoute) {
        this.appConfig = appConfig.getConfig();
    }

    ngOnInit(): void {
        this.panel = {
            title: 'Profile',
            collapsed: false,
            close: false,
            fullScreen: false,
            menu: [{
                title: 'Edit',
                onMenuSelect: () => this.onMenuSelect('edit')
            }, {
                title: 'Delete',
                onMenuSelect: () => this.onMenuSelect('delete')
            }]
        };
    }

    onMenuSelect(action: string) {
        switch (action) {
            case 'edit':
                // affect browser url
                this.router.navigate(['app/user/edit', 1]);
                break;
            case 'delete':
                this.notificationService.modal.open();
                break;
        }
    }
}
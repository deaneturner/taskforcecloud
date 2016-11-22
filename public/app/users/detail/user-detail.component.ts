import {Component, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AppConfig} from '../../app.config';
import {AppState} from '../../app.service';

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
    user: any;

    @ViewChild(UserEditComponent)
    public userEditComponent: UserEditComponent;

    constructor(appConfig: AppConfig,
                private router: Router,
                private notificationService: NotificationService,
                private appState: AppState,
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

        if (this.activatedRoute.snapshot.params['id'] !== this.appState.get('selectedUser')._id) {
            this.user = this.appState.get('selectedUser');
        } else {
            this.user = this.appState.get('selectedUser');
        }
    }

    onMenuSelect(action: string) {
        switch (action) {
            case 'edit':
                // affect browser url
                this.router.navigate(['app/users/edit', 1]);
                break;
            case 'delete':
                this.notificationService.showModal({
                    title: 'TITLE2',
                    subTitle: 'SUBTITLE2',
                    content: 'CONTENT',
                    subContent: 'SUBCONTENT'
                });
                break;
        }
    }
}
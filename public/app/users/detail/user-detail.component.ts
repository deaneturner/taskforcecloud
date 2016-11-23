import {Component, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AppConfig} from '../../app.config';
import {AppState} from '../../app.service';

import {NotificationService} from '../../services/notification.service'
import {UserService} from '../../services/user.service';
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
                private userService: UserService,
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
        var self = this;
        switch (action) {
            case 'edit':
                this.router.navigate(['app/users/edit', 1]);
                break;
            case 'delete':
                this.notificationService.showModal({
                    title: 'Confirm Delete',
                    subTitle: null,
                    content: 'Are you sure you want to delete user:',
                    subContent: self.user.firstName + ' ' +self.user.lastName + ' (' + self.user.username + ')',
                    buttons: [{
                        title: 'Cancel',
                        onClick: ($event) => {
                            self.notificationService.closeModal()
                        },
                        class: 'btn btn-gray'
                    }, {
                        title: 'Yes, delete',
                        onClick: ($event) => {
                            self.userService.deleteUser(self.activatedRoute.snapshot.params['id'])
                                .subscribe(
                                    user => {
                                        self.notificationService.displayMessage({
                                            message: 'Deleted ' + user.username,
                                            type: 'success'
                                        });

                                        self.notificationService.closeModal();
                                        self.router.navigate(['/app/users']);
                                    },
                                    error => {
                                    }  // error is handled by service
                                );
                        },
                        class: 'btn btn-success'
                    }]
                });
                break;
        }
    }
}
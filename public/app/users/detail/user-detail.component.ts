import {Component, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {BaseComponent} from '../../shared/component/base.component';
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
export class UserDetailComponent extends BaseComponent implements OnInit {
    panel: any;
    user: any = {};

    @ViewChild(UserEditComponent)
    public userEditComponent: UserEditComponent;

    constructor(appConfig: AppConfig,
                appState: AppState,
                router: Router,
                private notificationService: NotificationService,
                private userService: UserService,
                private activatedRoute: ActivatedRoute) {
        super(appState, router);
    }

    ngOnInit(): void {
        var self = this;

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

        // TODO: refactor to base controller
        this.activatedRoute.params
            .subscribe(
                params => {
                    if (params['id'] !== self.appState.get('selectedUser')._id) {
                        self.userService.getUser(params['id'])
                            .subscribe(
                                user => {
                                    self.user = user
                                },
                                error => {
                                } // error is handled by service
                            );
                    } else {
                        self.user = self.appState.get('selectedUser');
                    }
                }
            );
    }

    onMenuSelect(action: string) {
        var self = this;
        switch (action) {
            case 'edit':
                this.navigate(['app/users/edit', this.user._id], {selectedUser: this.user});
                break;
            case 'delete':
                // check current user is not selected user
                if(this.appState.get('currentUser')._id === this.user._id) {
                    // prevent delete current user
                    this.notificationService.showModal({
                        title: 'Cancel delete',
                        subTitle: null,
                        content: 'Cannot delete the currently logged in user:',
                        subContent: self.user.firstName + ' ' + self.user.lastName + ' (' + self.user.username + ')',
                        buttons: [{
                            title: 'OK',
                            onClick: ($event) => {
                                self.notificationService.closeModal()
                            },
                            class: 'btn btn-success'
                        }]
                    });
                } else {
                    this.notificationService.showModal({
                        title: 'Confirm Delete',
                        subTitle: null,
                        content: 'Are you sure you want to delete user:',
                        subContent: self.user.firstName + ' ' + self.user.lastName + ' (' + self.user.username + ')',
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
                                                message: 'Deleted ' + user.firstName + ' ' + user.lastName + ' (' + user.username + ')',
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
                }
                break;
        }
    }
}
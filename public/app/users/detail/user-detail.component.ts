import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppState } from '../../app.service';
import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';
import { UserEditComponent } from '../edit/user-edit.component';

@Component({
    selector: 'user-detail',
    templateUrl: 'user-detail.template.html',
    styleUrls: ['user-detail.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserDetailComponent implements OnInit {
    iconClass = ['fa', 'fa-user-o'];
    panel: any;
    user: any = {};

    @ViewChild(UserEditComponent)
    public userEditComponent: UserEditComponent;

    constructor(private appState: AppState,
                private router: Router,
                private notificationService: NotificationService,
                private userService: UserService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        const self = this;

        this.panel = {
            title: 'Profile',
            menu: [{
                title: 'Edit',
                onMenuSelect: () => this.onMenuSelect('edit')
            }, {
                title: 'Delete',
                onMenuSelect: () => this.onMenuSelect('delete')
            }]
        };

        this.activatedRoute.params
            .subscribe(
                params => {
                    const selectedUser = self.userService.cacheManager
                            .getCache('cachedUserObservable') || {};
                    if (params['id'] !== selectedUser._id) {
                        self.userService.getUser(params['id'])
                            .subscribe(
                                user => {
                                    self.user = user;
                                    self.userService.cacheManager
                                        .setCache('cachedUserObservable', user);
                                },
                                error => {
                                } // error is handled by service
                            );
                    } else if (selectedUser) {
                        self.user = selectedUser;
                    }
                }
            );
    }

    onMenuSelect(action: string) {
        const self = this;
        switch (action) {
            case 'edit':
                this.userService.cacheManager.selectUser(['/app/users/edit/', this.user._id]);
                break;
            case 'delete':
                // check current user is not selected user
                if (this.appState.get('currentUser')._id === this.user._id) {
                    // prevent delete current user
                    this.notificationService.showModal({
                        title: 'Cancel delete',
                        subTitle: null,
                        content: 'Cannot delete the currently logged in user:',
                        subContent: self.user.firstName +
                        ' ' + self.user.lastName + ' (' + self.user.username + ')',
                        buttons: [{
                            title: 'OK',
                            onClick: ($event) => {
                                self.notificationService.closeModal();
                            },
                            class: 'btn btn-success'
                        }]
                    });
                } else {
                    this.notificationService.showModal({
                        title: 'Confirm Delete',
                        subTitle: null,
                        content: 'Are you sure you want to delete user:',
                        subContent: self.user.firstName + ' ' +
                        self.user.lastName +
                        ' (' + self.user.username + ')',
                        buttons: [{
                            title: 'Cancel',
                            onClick: ($event) => {
                                self.notificationService.closeModal();
                            },
                            class: 'btn btn-gray'
                        }, {
                            title: 'Yes, delete',
                            onClick: ($event) => {
                                self.userService
                                    .deleteUser(self.activatedRoute.snapshot.params['id'])
                                    .subscribe(
                                        user => {
                                            self.notificationService.displayMessage({
                                                message: 'Deleted ' +
                                                user.firstName + ' ' +
                                                user.lastName +
                                                ' (' + user.username + ')',
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
            default: // do nothing
        }
    }
}

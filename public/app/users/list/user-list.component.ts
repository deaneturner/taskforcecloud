import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {AppState} from '../../app.service';
import {BaseComponent} from '../../shared/component/base.component';

import {User} from '../../model/user.interface';
import {UserService} from '../../services/userservice';

@Component({
    selector: 'tfc-user-list',
    templateUrl: './user-list.template.html',
    styleUrls: ['./user-list.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserListComponent extends BaseComponent {
    appConfig: any;

    users: Array<User>;

    constructor(appState: AppState,
                router: Router,
                private userService: UserService) {
        super(appState, router);
    }

    ngOnInit(): void {
        this.getUsers();
    };

    getUsers() {
        this.userService.getUsers()
            .subscribe(
                users => this.users = users,
                error => {
                }  // error is handled by service
            );
    }
}

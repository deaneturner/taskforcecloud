import {Component, Input, ViewEncapsulation} from '@angular/core';
import {AppConfig} from '../../app.config';

import {User} from '../../model/user.interface';
import {UserService} from '../../services/userservice';

declare var jQuery: any;

@Component({
    selector: 'tfc-user-list',
    templateUrl: './user-list.template.html',
    styleUrls: ['./user-list.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserListComponent {
    appConfig: any;

    users: Array<User>;

    constructor(appConfig: AppConfig, private userService: UserService) {
        this.appConfig = appConfig.getConfig();
    }

    ngOnInit(): void {
        this.getUsers();
    };

    getUsers() {
        this.userService.getUsers()
            .subscribe(
                users => this.users = users,
                error => {}  // error is handled by service
            );
    }
}

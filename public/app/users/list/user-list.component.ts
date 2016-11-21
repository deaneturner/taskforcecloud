import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {AppConfig} from '../../app.config';
import {AppState} from '../../app.service';

import {User} from '../../model/user.interface';
import {UserService} from '../../services/userservice';

@Component({
    selector: 'tfc-user-list',
    templateUrl: './user-list.template.html',
    styleUrls: ['./user-list.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserListComponent {
    appConfig: any;

    users: Array<User>;

    constructor(appConfig: AppConfig,
                private userService: UserService,
                private appState: AppState,
                private router: Router) {
        this.appConfig = appConfig.getConfig();
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

    /*
     * Navigate and pass data (e.g. selected user) to shared app state service
     */
    navigate(routerLink: Array<string>, data: any) {
        if (data) {
            Object.keys(data).forEach(key => {
                if (data.hasOwnProperty(key)) {
                    this.appState.set(key, data[key]);
                }
            });
        }
        this.router.navigate(routerLink);
    }
}

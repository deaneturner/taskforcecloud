import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../model/user.interface';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'tfc-user-list',
    templateUrl: './user-list.template.html',
    styleUrls: ['./user-list.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserListComponent {
    selectedUser: string;
    users: Array<User>;

    constructor(private router: Router,
                private userService: UserService) {
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

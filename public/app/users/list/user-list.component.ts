import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { User } from '../../model/user.interface';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'tfc-cmp-user-list',
    templateUrl: './user-list.template.html',
    styleUrls: ['./user-list.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {
    @Input() iconClass: any;
    users: Array<User>;

    constructor(public userService: UserService) {
    }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers() {
        this.userService.getUsers()
            .subscribe(
                users => this.users = users,
                error => {
                }  // error is handled by service
            );
    }
}

import {Injectable} from '@angular/core';

import {UserService} from './user.service';

@Injectable()
export class AppContextService {
    currentUser: any;

    constructor(private userService: UserService) {
    }

    getUser() {
        if (!this.currentUser) {
            this.userService.getUserByToken()
                .subscribe(
                    currentUser => this.currentUser = currentUser,
                    error => {
                    }  // error is handled by service
                );
        } else {
            return this.currentUser;
        }

    }
}

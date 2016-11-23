import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/user.service';
import { AppState } from '../../app.service';

@Component({
    selector: 'user-edit',
    templateUrl: 'user-edit.template.html',
    styleUrls: ['user-edit.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserEditComponent implements OnInit {
    user: any = {};

    constructor(private appState: AppState,
                private activatedRoute: ActivatedRoute,
                private userService: UserService) {
    }

    ngOnInit(): void {
        const self = this;

        // TODO: refactor to base controller
        this.activatedRoute.params
            .subscribe(
                params => {
                    if (params['id'] !== self.appState.get('selectedUser')._id) {
                        self.userService.getUser(params['id'])
                            .subscribe(
                                user => {
                                    self.user = user;
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
}

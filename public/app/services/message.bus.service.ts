import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { UserService } from './user.service';

@Injectable()
export class MessageBusService {
    private currentUserSubject = new Subject<string>();
    private currentUserObservable$ = this.currentUserSubject.asObservable();

    constructor(private userService: UserService) {
    }

    getCurrentUser(): Observable<string> {
        return this.currentUserObservable$;
    }

    publishCurrentUser(currentUser: any): void {
        this.currentUserSubject.next(currentUser);
    }

    retrieveCurrentUser() {
        const self = this;
        this.userService.getUserByToken()
            .subscribe(
                currentUser => this.publishCurrentUser(currentUser),
                error => {
                }  // error is handled by service
            );
    }
}

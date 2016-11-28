import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Wove } from 'aspect.js-angular';

import { NotificationService } from './notification.service';

import { User } from '../model/user.interface';

import * as _ from 'lodash';

@Wove()
@Injectable()
export class UserService {
    cachedUserObservable: any;
    cacheManager: any;
    httpOptions: any = {};  // parameter hook for aspect

    constructor(private http: Http,
                private notificationService: NotificationService,
                private router: Router) {

        this.cacheManager = {
            selectedUser: {},
            clearCache: (cachedObservable: string) => {
                this[cachedObservable] = null;
            },
            selectUser: (routerLink: any[]) => {
                if (this.cacheManager.selectedUser &&
                    (this.cacheManager.selectedUser._id !== routerLink[routerLink.length - 1])) {
                    this.cacheManager.clearCache('cachedUserObservable');
                }
                this.router.navigate(routerLink);
            }
        };
    }

    getUser(id: string) {
        if (!this.cachedUserObservable) {
            this.cachedUserObservable = this.http.get('/api/users/' + id)
                .map((res: Response) => <User>(res.json()))
                .publishReplay(1)
                .refCount()
                .catch(this.notificationService.handleError);
        }
        return this.cachedUserObservable;
    }

    getUsers(query ?: any) {
        return this.http.get('/api/users')
            .map((response: Response) => <User[]>_.values(response.json()))
            .catch(this.notificationService.handleError);
    }

    getUserByToken() {
        return this.http.get('/api/users/token/' +
            window.localStorage.getItem('id_token'), this.httpOptions)
            .map((response: Response) => <string>response.json())
            .catch(this.notificationService.handleError);
    }

    updateUser(id: string, user: any) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this.http.put('/api/users/' + id, user, {headers: headers})
            .map((response: Response) => <User>(response.json()))
            .catch(this.notificationService.handleError);
    }

    deleteUser(id: string) {
        return this.http.delete('/api/users/' + id)
            .map((response: Response) => <User>(response.json()))
            .catch(this.notificationService.handleError);
    }
}

import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { NotificationService } from './notification.service';
import { AppState } from '../app.service';

import { User } from '../model/user.interface';

import * as _ from 'lodash';

@Injectable()
export class UserService {
    cachedUserObservable: any;
    cacheManager: any;

    constructor(private http: Http,
                private notificationService: NotificationService,
                private appState: AppState,
                private router: Router) {

        /*
         * Cache Manager - reduce repeated http requests for working objects by caching them
         *
         *  Current objects:
         *  - User (property key = cachedUserObservable)
         */
        this.cacheManager = {
            /*
             * Get the cache for an object using its property key
             */
            getCache: (cachedObservableKey: string) => {
                return this[cachedObservableKey];
            },
            /*
             * Set the cache for an object using its property key
             */
            setCache: (cachedObservableKey: string, cachedObservable: any) => {
                this[cachedObservableKey] = cachedObservable;
            },
            /*
             * Clear the cache for an object using its property key
             */
            clearCache: (cachedObservable: string) => {
                this[cachedObservable] = null;
            },
            /*
             * Route to the given router link and clear the cache if the user id has changed
             */
            selectUser: (routerLink: any[]) => {
                /*
                 * If router link navigates to another user,
                 * clear the cache using the associate property key
                 */
                const userCache = this.cacheManager.getCache('cachedUserObservable');
                if (// there is a cached user
                    userCache &&
                    // and the route is not a link to the currently selected user id
                    (userCache._id !== routerLink[routerLink.length - 1])) {
                    // clear the cache stored via the cachedUserObservable property
                    this.cacheManager.clearCache('cachedUserObservable');
                }
                // route to link
                this.router.navigate(routerLink);
            }
        };
    }

    /*
     * Retrieve a user observable - either the cached observable or new http response observable.
     */
    getUser(id: string) {
        if (!this.cachedUserObservable || (this.cachedUserObservable.id !== id)) {
            this.cachedUserObservable = this.http.get('/api/users/' + id)
                .map((res: Response) => <User>(res.json()))
                // keep one item in stack
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
        let headers = new Headers({
            'jwt': window.localStorage.getItem('id_token')
        });
        let options = new RequestOptions({headers: headers});
        return this.http.get('/api/users/token/' +
            window.localStorage.getItem('id_token'), options)
            .map((response: Response) => <string>response.json())
            .catch(this.notificationService.handleError);
    }

    updateUser(id: string, user: any) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this.http.put('/api/users/' + id, user, {headers: headers})
            .map((response: any) => {
                const res = response.json();
                // update the cache with the latest model
                this.cacheManager.setCache('cachedUserObservable', res.data);
                return <User>(res);
            })
            .catch(this.notificationService.handleError);
    }

    deleteUser(id: string) {
        return this.http.delete('/api/users/' + id)
            .map((response: Response) => <User>(response.json()))
            .catch(this.notificationService.handleError);
    }
}

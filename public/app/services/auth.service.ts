import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { User } from '../model/user.interface';

@Injectable()
export class AuthService {
    isLoggedin: boolean;

    constructor(private http: Http) {

    }

    setIsLoggedIn(isLoggedIn: boolean, token?: string) {
        if (isLoggedIn) {
            window.localStorage.setItem('id_token', token);
        } else {
            window.localStorage.removeItem('id_token');
        }
        this.isLoggedin = isLoggedIn;
    }

    returnLoginResult(data, resolve) {
        const json = data.json();
        if (json.success) {
            const token = json.id_token;
            if (token) {
                this.setIsLoggedIn(true, token);
            }
        }
        resolve(json);
    }

    loginfn(user: User) {
        this.isLoggedin = false;
        const headers = new Headers();
        const creds = 'username=' + user.username +
            '&password=' + user.password + '&isKeepLoggedIn=' + user.isKeepLoggedIn;

        headers.append('Content-Type', 'application/X-www-form-urlencoded');

        return new Promise((resolve) => {

            this.http.post('/login', creds, {headers: headers}).subscribe((data) => {
                this.returnLoginResult(data, resolve);
            });
        });
    }

    logoutfn() {
        return new Promise((resolve) => {
            this.setIsLoggedIn(false);
            resolve(this.isLoggedin);
        });
    }


    registerfn(user: User) {
        this.isLoggedin = false;
        const headers = new Headers();
        const creds = 'username=' + user.username +
            '&password=' + user.password +
            '&confirmPassword=' + user.confirmPassword + '&isKeepLoggedIn=' + user.isKeepLoggedIn +
            '&firstName=' + user.firstName +
            '&lastName=' + user.lastName;

        headers.append('Content-Type', 'application/X-www-form-urlencoded');

        return new Promise((resolve) => {
            this.http.post('/register', creds, {headers: headers}).subscribe((data) => {
                    this.returnLoginResult(data, resolve);
                }
            );
        });
    }
}

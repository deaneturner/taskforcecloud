import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

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

    loginfn(usercreds) {
        this.isLoggedin = false;
        var headers = new Headers();
        var creds = 'username=' + usercreds.username + '&password=' + usercreds.password + '&isKeepLoggedIn=' + usercreds.isKeepLoggedIn;

        headers.append('Content-Type', 'application/X-www-form-urlencoded');

        return new Promise((resolve) => {

            this.http.post('/login', creds, {headers: headers}).subscribe((data) => {
                var token = data.json().id_token;
                    if (token) {
                        this.setIsLoggedIn(true, token);
                    }
                    resolve(this.isLoggedin);
                }
            );
        });
    }

    logoutfn() {
        return new Promise((resolve) => {
            this.setIsLoggedIn(false);

            resolve(this.isLoggedin);
        });
    }


    registerfn(usercreds) {
        this.isLoggedin = false;
        var headers = new Headers();
        var creds = 'username=' + usercreds.username + '&password=' + usercreds.password + '&confirmPassword=' + usercreds.confirmPassword + '&isKeepLoggedIn=' + usercreds.isKeepLoggedIn;

        headers.append('Content-Type', 'application/X-www-form-urlencoded');

        return new Promise((resolve) => {
            this.http.post('/register', creds, {headers: headers}).subscribe((data) => {
                    var token = data.json().id_token;
                    if (token) {
                        this.setIsLoggedIn(true, token);
                    }
                    resolve(this.isLoggedin);
                }
            );
        });
    }
}

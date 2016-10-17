import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class AuthService {
    isLoggedin: boolean;

    constructor(private http: Http) {

    }

    loginfn(usercreds) {
        this.isLoggedin = false;
        var headers = new Headers();
        var creds = 'username=' + usercreds.username + '&password=' + usercreds.password;

        headers.append('Content-Type', 'application/X-www-form-urlencoded');

        return new Promise((resolve) => {

            this.http.post('/login', creds, {headers: headers}).subscribe((data) => {
                    if (data.json().id_token) {
                        window.localStorage.setItem('id_token', data.json().id_token);
                        this.isLoggedin = true;
                    }
                    resolve(this.isLoggedin);
                }
            );
        });
    }
    logoutfn() {
        return new Promise((resolve) => {
            window.localStorage.removeItem('id_token');
            this.isLoggedin = false;

            resolve(this.isLoggedin);
        });
    }


    registerfn(usercreds) {
        this.isLoggedin = false;
        var headers = new Headers();
        var creds = 'username=' + usercreds.username + '&password=' + usercreds.password;

        headers.append('Content-Type', 'application/X-www-form-urlencoded');

        return new Promise((resolve) => {

            this.http.post('/register', creds, {headers: headers}).subscribe((data) => {
                    if (data.json().id_token) {
                        window.localStorage.setItem('id_token', data.json().id_token);
                        this.isLoggedin = true;
                    }
                    resolve(this.isLoggedin);
                }
            );
        });
    }
}

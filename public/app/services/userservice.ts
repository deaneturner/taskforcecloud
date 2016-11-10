import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {User} from '../model/user.interface';

@Injectable()
export class UserService {
    constructor(private http: Http) {

    }

    getUsers(query?: any) {
        return this.http.get('/users')
            .map((response: Response) => {
                console.log(response);
                return <User[]>response.json().data;
            });
            //.catch(this.handleError);
    }

    private handleError(error: Response) {
        let msg = 'Status code error.status on url error.url';
        console.error(msg);
    }
}

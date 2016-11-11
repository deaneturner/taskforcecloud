import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {User} from '../model/user.interface';

import * as _ from 'lodash';

@Injectable()
export class UserService {
    constructor(private http: Http) {

    }

    getUsers(query?: any) {
        return this.http.get('/api/users')
            .map((response: Response) => <User[]>_.values(response.json()));
    }

    private handleError(error: Response) {
        let msg = 'Status code error.status on url error.url';
        console.error(msg);
    }
}

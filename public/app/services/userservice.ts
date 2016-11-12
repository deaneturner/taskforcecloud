import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {BaseService} from '../shared/base.service';

import {User} from '../model/user.interface';

import * as _ from 'lodash';

@Injectable()
export class UserService extends BaseService {
    constructor(private http: Http) {
        super();
    }

    getUsers(query?: any) {
        return this.http.get('/api/usersgg')
            .map((response: Response) => <User[]>_.values(response.json()))
            .catch(this.handleError);
    }
}

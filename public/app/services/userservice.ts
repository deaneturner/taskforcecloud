import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {NotificationService} from './notification.service';

import {User} from '../model/user.interface';

import * as _ from 'lodash';

@Injectable()
export class UserService {
    constructor(private http: Http, private notificationService: NotificationService) {
    }

    getUsers(query?: any) {
        return this.http.get('/api/users')
            .map((response: Response) => <User[]>_.values(response.json()))
            .catch(this.notificationService.handleError);
    }
}

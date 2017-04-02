import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { NotificationService } from './notification.service';

import { ClientServiceItem } from '../model/clientserviceitem.interface';

import * as _ from 'lodash';

@Injectable()
export class ClientServiceItemService {

    constructor(private http: Http,
                private notificationService: NotificationService) {
    }

    getClientServiceItem(id: string) {
        return this.http.get('/api/clientservicetasks/' + id)
                .map((res: Response) => <ClientServiceItem>(res.json()))
                .catch(this.notificationService.handleError);
    }

    getClientServiceItems(query ?: any) {
        return this.http.get('/api/clientservicetasks')
            .map((response: Response) => <ClientServiceItem[]>_.values(response.json()))
            .catch(this.notificationService.handleError);
    }

    updateClientServiceItem(id: string, clientServiceItem: any) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this.http.put('/api/clientservicetasks/' + id, clientServiceItem, {headers: headers})
            .map((response: any) => <ClientServiceItem>(response.json()))
            .catch(this.notificationService.handleError);
    }

    insertClientServiceItem(clientServiceItem: any) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this.http.post('/api/clientservicetasks', clientServiceItem, {headers: headers})
            .map((response: any) => <ClientServiceItem>(response.json()))
            .catch(this.notificationService.handleError);
    }

    deleteClientServiceItem(id: string) {
        return this.http.delete('/api/clientservicetasks/' + id)
            .map((response: Response) => <ClientServiceItem>(response.json()))
            .catch(this.notificationService.handleError);
    }
}

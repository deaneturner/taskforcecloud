import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { NotificationService } from './notification.service';

import { Client } from '../model/client.interface';

import * as _ from 'lodash';

@Injectable()
export class ClientService {

    clientContext = <Client>{};

    constructor(private http: Http,
                private notificationService: NotificationService) {
    }

    getClient(id: string) {
        return this.http.get('/api/clients/' + id)
            .map((res: Response) => <Client>(res.json()))
            .catch(this.notificationService.handleError);
    }

    getClients(query ?: any) {
        return this.http.get('/api/clients')
            .map((response: Response) => <Client[]>_.values(response.json()))
            .catch(this.notificationService.handleError);
    }

    updateClient(id: string, client: Client) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this.http.put('/api/clients/' + id, client, {headers: headers})
            .map((response: any) => <Client>(response.json()))
            .catch(this.notificationService.handleError);
    }

    insertClient(client: Client) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this.http.post('/api/clients', client, {headers: headers})
            .map((response: any) => <Client>(response.json()))
            .catch(this.notificationService.handleError);
    }

    deleteClient(id: string) {
        return this.http.delete('/api/clients/' + id)
            .map((response: Response) => <Client>(response.json()))
            .catch(this.notificationService.handleError);
    }

    setClientContext(clientContext: Client) {
        this.clientContext = clientContext;
    }

    getClientContext() {
        return this.clientContext;
    }

    clearClientContext() {
        this.clientContext = <Client>{};
        return this.clientContext;
    }
}

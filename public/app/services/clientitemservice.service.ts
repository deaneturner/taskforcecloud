import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { NotificationService } from './notification.service';

import { ClientItem } from '../model/clientitem.interface';
import { ClientItemServiceI } from '../model/clientitemservice.interface';

import * as _ from 'lodash';

@Injectable()
export class ClientItemServiceService {

    clientItemServiceContext =  <ClientItemServiceI>{};

    constructor(private http: Http,
                private notificationService: NotificationService) {
    }

    getClientItem(id: string) {
        return this.http.get('/api/clientitems/' + id)
            .map((res: Response) => <ClientItem>(res.json()))
            .catch(this.notificationService.handleError);
    }

    getClientItems(clientId: string) {
        let url = '/api/clientitems';
        if (clientId) {
            url = '/api/clients/' + clientId + '/clientitems';
        }
        return this.http.get(url)
            .map((response: Response) => <ClientItem[]>_.values(response.json()))
            .catch(this.notificationService.handleError);
    }

    updateClientItemService(id: string, clientitem: ClientItemServiceI) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this.http.put('/api/clientitems/' + id, clientitem, {headers: headers})
            .map((response: any) => <ClientItem>(response.json()))
            .catch(this.notificationService.handleError);
    }

    insertClientItemService(clientitem: ClientItemServiceI) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this.http.post('/api/clientitems', clientitem, {headers: headers})
            .map((response: any) => <ClientItem>(response.json()))
            .catch(this.notificationService.handleError);
    }

    deleteClientItem(id: string) {
        return this.http.delete('/api/clientitems/' + id)
            .map((response: Response) => <ClientItem>(response.json()))
            .catch(this.notificationService.handleError);
    }

    setClientItemServiceContext(clientItemServiceContext: ClientItemServiceI) {
        this.clientItemServiceContext = clientItemServiceContext;
    }

    getClientItemServiceContext() {
        return this.clientItemServiceContext;
    }

    clearClientItemServiceContext() {
        this.clientItemServiceContext = <ClientItemServiceI>{};
        return this.clientItemServiceContext;
    }

}

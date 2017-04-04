import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { NotificationService } from './notification.service';

import { ClientItem } from '../model/clientitem.interface';

import * as _ from 'lodash';

@Injectable()
export class ClientItemService {

    clientItemContext =  <ClientItem>{};

    constructor(private http: Http,
                private notificationService: NotificationService) {
    }

    getClientItem(id: string) {
        return this.http.get('/api/clientitems/' + id)
            .map((res: Response) => <ClientItem>(res.json()))
            .catch(this.notificationService.handleError);
    }

    getClientItems(query ?: any) {
        return this.http.get('/api/clientitems')
            .map((response: Response) => <ClientItem[]>_.values(response.json()))
            .catch(this.notificationService.handleError);
    }

    updateClientItem(id: string, clientitem: any) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this.http.put('/api/clientitems/' + id, clientitem, {headers: headers})
            .map((response: any) => <ClientItem>(response.json()))
            .catch(this.notificationService.handleError);
    }

    insertClientItem(clientitem: any) {
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

    setClientItemContext(clientItemContext: ClientItem) {
        this.clientItemContext = clientItemContext;
    }

    getClientItemContext() {
        return this.clientItemContext;
    }

}

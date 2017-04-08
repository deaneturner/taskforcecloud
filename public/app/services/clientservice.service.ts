import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { NotificationService } from './notification.service';

import { ClientService } from '../model/clientservice.interface';

import * as _ from 'lodash';

@Injectable()
export class ClientServiceService {

    clientServiceContext = <ClientService>{};

    constructor(private http: Http,
                private notificationService: NotificationService) {
    }

    getClientService(id: string) {
        return this.http.get('/api/clientservices/' + id)
            .map((res: Response) => <ClientService>(res.json()))
            .catch(this.notificationService.handleError);
    }

    getClientServices(query ?: any) {
        return this.http.get('/api/clientservices')
            .map((response: Response) => <ClientService[]>_.values(response.json()))
            .catch(this.notificationService.handleError);
    }

    updateClientService(id: string, clientService: ClientService) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this.http.put('/api/clientservices/' + id, clientService, {headers: headers})
            .map((response: any) => <ClientService>(response.json()))
            .catch(this.notificationService.handleError);
    }

    insertClientService(clientService: ClientService) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this.http.post('/api/clientservices', clientService, {headers: headers})
            .map((response: any) => <ClientService>(response.json()))
            .catch(this.notificationService.handleError);
    }

    deleteClientService(id: string) {
        return this.http.delete('/api/clientservices/' + id)
            .map((response: Response) => <ClientService>(response.json()))
            .catch(this.notificationService.handleError);
    }

    setClientServiceContext(clientServiceContext: ClientService) {
        this.clientServiceContext = clientServiceContext;
    }

    getClientServiceContext() {
        return this.clientServiceContext;
    }

    clearClientServiceContext() {
        this.clientServiceContext = <ClientService>{};
        return this.clientServiceContext;
    }
}

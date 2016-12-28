import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { NotificationService } from './notification.service';

import { ClientService } from '../model/client-service.interface';

import * as _ from 'lodash';

@Injectable()
export class ClientServiceService {

    constructor(private http: Http,
                private notificationService: NotificationService) {
    }

    getClientService(id: string) {
        return this.http.get('/api/clients/' + id)
                .map((res: Response) => <ClientService>(res.json()))
                .catch(this.notificationService.handleError);
    }

    getClientServices(query ?: any) {
        return this.http.get('/api/client-services')
            .map((response: Response) => <ClientService[]>_.values(response.json()))
            .catch(this.notificationService.handleError);
    }

    updateClientService(id: string, clientService: any) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this.http.put('/api/client-services/' + id, clientService, {headers: headers})
            .map((response: any) => <ClientService>(response.json()))
            .catch(this.notificationService.handleError);
    }

    insertClientService(clientService: any) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this.http.post('/api/client-services', clientService, {headers: headers})
            .map((response: any) => <ClientService>(response.json()))
            .catch(this.notificationService.handleError);
    }

    deleteClientService(id: string) {
        return this.http.delete('/api/client-services/' + id)
            .map((response: Response) => <ClientService>(response.json()))
            .catch(this.notificationService.handleError);
    }
}

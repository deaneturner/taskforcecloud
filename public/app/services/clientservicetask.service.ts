import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { NotificationService } from './notification.service';

import { ClientServiceTask } from '../model/clientservicetask.interface';

import * as _ from 'lodash';

@Injectable()
export class ClientServiceTaskService {

    clientServiceTaskContext = <ClientServiceTask>{};

    constructor(private http: Http,
                private notificationService: NotificationService) {
    }

    getClientServiceTask(id: string) {
        return this.http.get('/api/clientservicetasks/' + id)
            .map((res: Response) => <ClientServiceTask>(res.json()))
            .catch(this.notificationService.handleError);
    }

    getClientServiceTasks(query ?: any) {
        return this.http.get('/api/clientservicetasks')
            .map((response: Response) => <ClientServiceTask[]>_.values(response.json()))
            .catch(this.notificationService.handleError);
    }

    updateClientServiceTask(id: string, clientServiceTask: any) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this.http.put('/api/clientservicetasks/' + id, clientServiceTask, {headers: headers})
            .map((response: any) => <ClientServiceTask>(response.json()))
            .catch(this.notificationService.handleError);
    }

    insertClientServiceTask(clientServiceTask: any) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this.http.post('/api/clientservicetasks', clientServiceTask, {headers: headers})
            .map((response: any) => <ClientServiceTask>(response.json()))
            .catch(this.notificationService.handleError);
    }

    deleteClientServiceTask(id: string) {
        return this.http.delete('/api/clientservicetasks/' + id)
            .map((response: Response) => <ClientServiceTask>(response.json()))
            .catch(this.notificationService.handleError);
    }

    setClientServiceTaskContext(clientServiceTaskContext: ClientServiceTask) {
        this.clientServiceTaskContext = clientServiceTaskContext;
    }

    getClientServiceTaskContext() {
        return this.clientServiceTaskContext;
    }

    clearClientServiceTaskContext() {
        this.clientServiceTaskContext = <ClientServiceTask>{};
        return this.clientServiceTaskContext;
    }
}

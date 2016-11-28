import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export abstract class HttpDecorator extends Http {
    constructor(private delegate: Http) {
        super(null, null);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.delegate.get(url, options);
    }

    put(url: string, data: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.delegate.put(url, data, options);
    }

    post(url: string, data: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.delegate.post(url, data, options);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.delegate.delete(url, options);
    }
}

@Injectable()
export class HttpTokenDecorator extends HttpDecorator {
    constructor(http: Http) {
        super(http);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        const token = window.localStorage.getItem('id_token');
        const headers = new Headers({
            'jwt': token
        });
        if (!options) {
            options = new RequestOptions({headers: headers});
        } else if (!options.headers) {
            options.headers = headers;
        } else if (options.headers) {
            options.headers.set('jwt', token);
        }
        return super.get(url, options);
    }

    put(url: string, data: any, options?: RequestOptionsArgs): Observable<Response> {
        const token = window.localStorage.getItem('id_token');
        const headers = new Headers({
            'jwt': token
        });
        if (!options) {
            options = new RequestOptions({headers: headers});
        } else if (!options.headers) {
            options.headers = headers;
        } else if (options.headers) {
            options.headers.set('jwt', token);
        }
        return super.put(url, data, options);
    }

    post(url: string, data: any, options?: RequestOptionsArgs): Observable<Response> {
        const token = window.localStorage.getItem('id_token');
        const headers = new Headers({
            'jwt': token
        });
        if (!options) {
            options = new RequestOptions({headers: headers});
        } else if (!options.headers) {
            options.headers = headers;
        } else if (options.headers) {
            options.headers.set('jwt', token);
        }
        return super.post(url, data, options);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        const token = window.localStorage.getItem('id_token');
        const headers = new Headers({
            'jwt': token
        });
        if (!options) {
            options = new RequestOptions({headers: headers});
        } else if (!options.headers) {
            options.headers = headers;
        } else if (options.headers) {
            options.headers.set('jwt', token);
        }
        return super.delete(url, options);
    }
}

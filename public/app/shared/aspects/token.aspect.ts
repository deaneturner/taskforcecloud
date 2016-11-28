import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { beforeMethod, afterMethod, Metadata } from 'aspect.js';

@Injectable()
export class TokenAspect {
    @beforeMethod({
        classNamePattern: /(User)Service/,
        methodNamePattern: /^(get)/
    })
    setJwtTokenOnHeader(meta: Metadata) {
        let headers = new Headers({
            'jwt': window.localStorage.getItem('id_token')
        });
        let options = new RequestOptions({headers: headers});
        meta.method.context.httpOptions = options;
    }
}

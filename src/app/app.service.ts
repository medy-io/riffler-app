import { Injectable } from '@angular/core';
import { AppProxy } from './app.proxy';
import { Card } from './app.model';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AppService {

    constructor(private appProxy: AppProxy) { }

    // return JSOM from proxy to component
    getDeckData(): Observable<Card[]> {
        return this.appProxy.getDeckDataStream();
    }
}

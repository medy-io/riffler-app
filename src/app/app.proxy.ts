import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Card } from './app.model';

@Injectable()
export class AppProxy {

    constructor(private http: Http) { }

    // call deck data from JSON file
    getDeckDataStream(): Observable<Card[]> {
        return this.http.get('../assets/mtg_elves.json')
        .map((res: any) => res.json());
    }
}

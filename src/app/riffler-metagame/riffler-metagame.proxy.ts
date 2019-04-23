import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as request from 'request';
import * as cheerio from 'cheerio';
import { MetagameResponse } from './riffler-metagame.component.model';

// import { of } from 'rxjs';
import 'rxjs/add/observable/of';

@Injectable()
export class RifflerMetagameProxy {

    API_URL: string = 'https://api.scryfall.com/';
    CARD_URL: string = 'cards/named?exact=';
    COLLECTION_URL: string = 'cards/collection';
    DECKLIST_URL: string = this.API_URL + this.COLLECTION_URL;

    constructor(private http: Http) { }

    getMetagameDataLegacy(format: string): any {
        if (format === 'MO') {
            return this.http.get('../assets/testJSON/modern-metagame-data.json')
                .map((res: any) => res.json());
        } else {
            return this.http.get('../assets/testJSON/legacy-metagame-data.json')
                .map((res: any) => res.json());
        }

    }

}
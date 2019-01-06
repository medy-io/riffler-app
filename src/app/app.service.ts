import { Injectable } from '@angular/core';
import { AppProxy } from './app.proxy';
import { Card, CardsResponse, CardItem, CardRequest, CardName } from './app.model';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AppService {

    constructor(private appProxy: AppProxy) { }

    // return JSOM from proxy to component
    getDeckData(data: string): Observable<Card[]> {
        // const deckListRequest: string = deck.replace(/(\||,)/g, '|');
        return this.appProxy.getDeckDataStream(this.convertToRequest(data));
    }

    convertToRequest(data: string) {
        const cardArray: string[] = /d(b+)d/g.exec(data);
        const cardRequest: CardRequest = null;
        cardRequest.identifiers = [];
        cardArray.forEach(card => {
            const cardObj: CardName = null;
            cardObj.name = card;
            cardRequest.identifiers.push(cardObj);
        });
        // {
        //     "identifiers": [
        //         {
        //             "name": "Wasteland"
        //         },
        //         {
        //             "name": "Ancient Tomb"
        //         },
        //         {
        //             "name": "Blood Moon"
        //         }
        //     ]
        // }
        console.log(cardRequest);
        return cardRequest;
    }
}

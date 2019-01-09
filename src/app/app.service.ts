import { Injectable } from '@angular/core';
import { AppProxy } from './app.proxy';
import { Card, CardsResponse, CardItem, CardRequest, CardName } from './app.model';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AppService {

    constructor(private appProxy: AppProxy) { }

    // return JSOM from proxy to component
    getDeckData(data: string): any {
        // const deckListRequest: string = deck.replace(/(\||,)/g, '|');
        return this.appProxy.getDeckList(this.convertToRequest(data));
    }

    convertToRequest(data: string) {
        const cardArrayNumber: string[] = data.match(/\d+/g);
        console.log('$$$$$$$$$$$$$$$$$');
        console.log(cardArrayNumber);
        let cardArrayName: string[] = data.split(/[\d]/);
        cardArrayName = cardArrayName.filter(val => val != '')
        console.log('CARD STRING FOR REQUEST');
        console.log(cardArrayName);
        const cardRequest: CardRequest = {
            identifiers: []
        };
        // cardArrayName.shift();
        cardArrayNumber.forEach((card, index) => {
            if (cardArrayName[index] !== '') {
            for(let i = 0; i < +cardArrayNumber[index];i++) {
                const cardObj: CardName = {
                    name: cardArrayName[index].substr(1)
                };
                cardRequest.identifiers.push(cardObj);
            }
        }
        });
        console.log('=======================');
        console.log(cardRequest);
        return cardRequest;
    }
}

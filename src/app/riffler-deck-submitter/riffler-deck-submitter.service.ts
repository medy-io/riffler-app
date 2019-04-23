import { Injectable } from '@angular/core';
import { RifflerProxy } from './../riffler.proxy';
import { CardRequest, CardName } from './riffler-deck-submitter.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DeckSubmitterService {

    constructor(private appProxy: RifflerProxy) { }
    cardObjectArray: any[] = [];
    card: Observable<any>;
    private scryFallDeckData = new Subject<any>();
    private userDeckList = new Subject<any>();
    scryFallDeckData$ = this.scryFallDeckData.asObservable();
    userDeckList$ = this.userDeckList.asObservable();

    // return JSON from proxy to component
    getDeckData(data: string) {
        this.userDeckList.next(data);
        this.scryFallDeckData.next(this.appProxy.getDeckList(this.convertToRequest(data)));
    }

    convertToRequest(data: string) {
        const cardArrayNumber: string[] = data.match(/\d+/g);
        let cardArrayName: string[] = data.split(/[\d]/);
        cardArrayName = cardArrayName.filter(val => val !== '');
        const cardRequest: CardRequest = {
            identifiers: []
        };
        cardArrayNumber.forEach((card, index) => {
            if (cardArrayName[index] !== '') {
                for (let i = 0; i < +cardArrayNumber[index]; i++) {
                    const cardObj: CardName = {
                        name: cardArrayName[index].substr(1)
                    };
                    cardRequest.identifiers.push(cardObj);
                }
            }
        });

        return cardRequest;
    }

    public assignAmountOfSiblingCardsInDeck(data: any[], deckListRequestData?) {
        const cardArrayNumber: string[] = deckListRequestData.match(/\d+/g);
        let cardArrayName: string[] = deckListRequestData.split(/[\d]/);
        let deck = [];
        deck = data;
        cardArrayName = cardArrayName.filter(val => val !== '');
        cardArrayName.forEach(val => {
          val.trim();
        });
        cardArrayName.forEach((cardName, index) => {
          deck.map(val => {
            if (cardName.trim() === val.name || val.name.includes(cardName.trim())) {
              val.numberOfInDeck = cardArrayNumber[index];
            }
          });
        });
        return deck;
      }
}

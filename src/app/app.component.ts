import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { AppService } from './app.service';
import { HyperGeometricCalcService } from './hyper-geometric-calc.service';
import { MatSnackBar } from '@angular/material';
import { Card, DeckProbabilityContext, CardsResponse, CardItem, CardObject } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Riffler';
  // drawn cards list
  mtgDrawnCards: any[] = [];
  // opening hand
  mtgHand: any = [];
  // users deck
  testMtgDeck: CardObject[] = [];
  // default mulligan number
  mull: number = 6;
  // user input for  deck data. Initializes a sample deck
  deckListRequestData: string = `1 Chart a Course
4 Curious Obsession
4 Dive Down
20 Island
1 Lookout's Dispersal
4 Merfolk Trickster
4 Mist-Cloaked Herald
4 Opt
4 Siren Stormtamer
2 Spell Pierce
4 Tempest Djinn
4 Warkite Marauder
4 Wizard's Retort`;
  // page loading animation
  loadingData: boolean = false;
  // response errors
  errorOnCardDataResp: any = 'error';
  selectedTab: number = 0;
  baseDeckList: CardObject[] = [];

  constructor(private appService: AppService,
    private hyperGeometricCalcService: HyperGeometricCalcService,
    public matSnackBar: MatSnackBar) { }

  getDeckData() {
    this.loadingData = true;
    setTimeout(() => {
      this.appService.getDeckData(this.deckListRequestData).subscribe(resp => {
        this.baseDeckList = resp.data;
        this.testMtgDeck = this.assignAmountOfSiblingCardsInDeck(resp.data);
        this.calculateEachCardDrawPercentage();
        this.selectedTab += 1;
        this.selectedTab > 1 ? this.selectedTab = 0 : this.selectedTab = 1;
        this.loadingData = false;
      }, (error) => {
        this.errorOnCardDataResp = error.status + ' ' + error.statusText + '  |  Check your deck and try again.';
        this.matSnackBar.open(this.errorOnCardDataResp, 'OK', {
          duration: 8000,
        });
        this.loadingData = false;
      });
    }, 50);
  }

  // draw your opening hand
  public drawOpeningHand(): void {
    this.resetSim();
    if (this.mtgHand && this.mtgHand.length > 0) {
      for (let i = 0; i < 7; i++) {
        const card = this.mtgHand.shift();
        this.testMtgDeck.push(card);
      }
      for (let i = 0; i < 7; i++) {
        const index = (Math.floor(Math.random() * this.testMtgDeck.length));
        const card = this.testMtgDeck.splice((Math.floor(Math.random() * this.testMtgDeck.length)), 1);
        this.mtgHand.push(card[0]);
      }
    } else {
      for (let i = 0; i < 7; i++) {
        const index = (Math.floor(Math.random() * this.testMtgDeck.length));
        const card = this.testMtgDeck.splice((Math.floor(Math.random() * this.testMtgDeck.length)), 1);
        this.mtgHand.push(card[0]);
        this.testMtgDeck.map(value => {
          if (value.name === card[0].name) {
            value.numberOfInDeck--;
          }
        });
      }
    }
  }

  // clear opening hand and drawn cards
  public resetSim(): void {
    if (this.mtgDrawnCards && this.mtgDrawnCards.length > 0) {
      this.testMtgDeck = this.testMtgDeck.concat(this.mtgDrawnCards);
      this.mtgDrawnCards = [];
    }
    if (this.mtgHand && this.mtgHand.length > 0) {
      this.testMtgDeck = this.testMtgDeck.concat(this.mtgHand);
      this.mtgHand = [];
    }
    this.testMtgDeck = this.baseDeckList;
    this.mull = 6;
    this.assignAmountOfSiblingCardsInDeck(this.testMtgDeck);
    this.calculateEachCardDrawPercentage();
  }

  public drawCard(): void {
    const index = (Math.floor(Math.random() * this.testMtgDeck.length));
    const card = this.testMtgDeck.splice((Math.floor(Math.random() * this.testMtgDeck.length)), 1);
    this.mtgDrawnCards.push(card[0]);
    this.calculateEachCardDrawPercentage();
  }

  public mulligan(): void {
    if (this.mull === 0) {
      this.mull = 6;
    }
    this.testMtgDeck = this.testMtgDeck.concat(this.mtgHand);
    this.mtgHand = [];
    for (let i = 0; i < this.mull; i++) {
      const index = (Math.floor(Math.random() * this.testMtgDeck.length));
      const card = this.testMtgDeck.splice((Math.floor(Math.random() * this.testMtgDeck.length)), 1);
      this.mtgHand.push(card[0]);
    }
    this.mull--;
    this.calculateEachCardDrawPercentage();
  }

  private calculateEachCardDrawPercentage() {
    if (this.testMtgDeck.length <= 60 && this.testMtgDeck.length !== 0) {
      this.testMtgDeck.forEach(card => {
        card.percentageToDraw = +(card.numberOfInDeck / this.testMtgDeck.length).toFixed(6);
      });
    }
  }

  assignAmountOfSiblingCardsInDeck(data: any[]) {
    const cardArrayNumber: string[] = this.deckListRequestData.match(/\d+/g);
    let cardArrayName: string[] = this.deckListRequestData.split(/[\d]/);
    let i = 0;
    let deck = [];
    deck = data;
    cardArrayName = cardArrayName.filter(val => val !== '');
    cardArrayName.forEach(val => {
      val.trim();
    });
    deck.forEach(cardObj => {
      if (cardObj && cardObj.name) {
        let name = cardArrayName[i];
        console.log(name);
        if (cardObj.name === name.trim()) {
          cardObj.numberOfInDeck = +cardArrayNumber[i];
        } else {
          i++;
          cardObj.numberOfInDeck = +cardArrayNumber[i];
        }
      }
    });
    return deck;
  }

}

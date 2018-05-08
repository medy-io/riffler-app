import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppService } from './app.service';
import { Card } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'MTG Deck Edit';
  // drawn cards list
  mtgDrawnCards: Card[] = [];
  // deck list
  mtgDeck: Card[] = [];
  // opening hand
  mtgHand: Card[] = [];
  // default mulligan number
  mull = 6;
  // experiment deck
  controlDeck: Card[] = [];
  // experiment hand
  controlHand: Card[] = [];

  constructor(private appService: AppService) { }

  ngOnInit() {
    // retrieve JSON data and store as mtgDeck
    this.appService.getDeckData().subscribe(deckDataResponse => {
      this.mtgDeck = deckDataResponse;
    });
  }

  // draw your opening hand
  public drawOpeningHand() {
    this.resetSim();
    if (this.mtgHand && this.mtgHand.length > 0) {
      for (let i = 0; i < 7; i++) {
        const card = this.mtgHand.shift();
        this.mtgDeck.push(card);
      }
      for (let i = 0; i < 7; i++) {
        const index = (Math.floor(Math.random() * this.mtgDeck.length));
        const card = this.mtgDeck.splice((Math.floor(Math.random() * this.mtgDeck.length)), 1);
        this.mtgHand.push(card[0]);
      }
    } else {
      for (let i = 0; i < 7; i++) {
        const index = (Math.floor(Math.random() * this.mtgDeck.length));
        const card = this.mtgDeck.splice((Math.floor(Math.random() * this.mtgDeck.length)), 1);
        this.mtgHand.push(card[0]);
      }
    }
  }

  // clear opening hand and drawn cards
  public resetSim() {
    if (this.mtgDrawnCards && this.mtgDrawnCards.length > 0) {
      this.mtgDeck = this.mtgDeck.concat(this.mtgDrawnCards);
      this.mtgDrawnCards = [];
    }
    if (this.mtgHand && this.mtgHand.length > 0) {
      this.mtgDeck = this.mtgDeck.concat(this.mtgHand);
      this.mtgHand = [];
    }
    this.mull = 6;
  }

  public drawCard() {
    const index = (Math.floor(Math.random() * this.mtgDeck.length));
    const card = this.mtgDeck.splice((Math.floor(Math.random() * this.mtgDeck.length)), 1);
    this.mtgDrawnCards.push(card[0]);
  }

  public mulligan() {
    if (this.mull === 0) {
      this.mull = 6;
    }
    this.mtgDeck = this.mtgDeck.concat(this.mtgHand);
    this.mtgHand = [];
    for (let i = 0; i < this.mull; i++) {
      const index = (Math.floor(Math.random() * this.mtgDeck.length));
      const card = this.mtgDeck.splice((Math.floor(Math.random() * this.mtgDeck.length)), 1);
      this.mtgHand.push(card[0]);
    }
    this.mull--;
  }

  // runAHundredThousandTimes() {
  //   this.landInHand = [];
  //   for (let i = 0; i < 100000; i++) {
  //     this.draw100000Hands();
  //   }
  // }

  // private draw100000Hands() {
  //   for (let i = 0; i < 7; i++) {
  //     let index = (Math.floor(Math.random() * this.mtgDeck.length));
  //     let card = this.mtgDeck.splice((Math.floor(Math.random() * this.mtgDeck.length)), 1);
  //     this.mtgHand.push(card[0]);
  //   }
  //   let land = this.mtgHand.find(land => land.type === 0 && land.name !== `Gaea's Cradle`);
  //   if (land && land.type === 0) {
  //     this.landInHand.push('success');
  //   }
  //   for (let i = 0; i < 7; i++) {
  //     let card = this.mtgHand.shift();
  //     this.mtgDeck.push(card);
  //   }
  // }

}

import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppService } from './app.service';
import { Card, DeckProbabilityContext, CardsResponse, CardItem } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Riffler';
  // drawn cards list
  mtgDrawnCards: Card[] = [];
  // deck list
  mtgDeck: Card[] = [];
  // opening hand
  mtgHand: Card[] = [];
  // default mulligan number
  mull: number = 6;
  // experiment deck
  controlDeck: Card[] = [];
  // experiment hand
  controlHand: Card[] = [];
  deckProbContext: DeckProbabilityContext;
  probabilityResults: number[] = [];
  drawResults: number[] = [];
  deckCount: number;
  deckList: string;
  textPlaceHolder: string = `1 Cancel \n 1 Ponder \n 1 Unsummon`;
  deckDataInput: string = '';

  constructor(private appService: AppService) { }

  ngOnInit() {
    // retrieve JSON data and store as mtgDeck
    // this.appService.getDeckData().subscribe(deckDataResponse => {
    //   this.mtgDeck = deckDataResponse;
    // });
  }

  // public getDeckList() {
  //   // this.appService.getDeckData(this.deckList);
  //   this.appService.getDeckData(this.deckList).subscribe(val => {
  //     this.mtgDeck = val.cards;
  //   });
  // }

  getDeckData() {
    this.appService.getDeckData(this.deckDataInput);
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
    this.deckCount = 53;
    this.calcHypGeo(this.deckCount--);
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

  private calcHypGeo(deckCount?: number) {
    const cardGroup1 = 1;
    const cardGroup2 = 2;
    const cardGroup3 = 3;
    const cardGroup4 = 4;
    const arr: number[] = [];
    if (!deckCount) {
      for (let i = 1; i < 5; i++) {
        this.deckProbContext = {
          deckCardCount: 60,
          subPopSize: i,
          sampleSize: 7,
          xValue: 1
        };
        this.compute();
      }
    } else if (deckCount) {
      for (let i = 1; i < 5; i++) {
        this.deckProbContext = {
          deckCardCount: deckCount,
          subPopSize: i,
          sampleSize: 1,
          xValue: 1
        };
        this.compute();
      }
    }
  }

  private compute() {
    const nn = Math.floor(this.deckProbContext.deckCardCount);
    const m = Math.floor(this.deckProbContext.subPopSize);
    const n = Math.floor(this.deckProbContext.sampleSize);
    const x = Math.floor(this.deckProbContext.xValue);
    let Prob;
    if (n <= 0 || m <= 0 || nn <= 0) {
      alert('Parameters must be positive integers');
      Prob = 0;
    } else if (m > nn || n > nn) {
      alert('m and n must be less than N');
      Prob = 0;
    } else if (x < 0 || x < n + m - nn) {
      Prob = 0;
    } else if (x >= n || x >= m) {
      Prob = 1;
    } else {
      if (2 * m > nn) {
        if (2 * n > nn) {
          Prob = this.hyp(nn - m - n + x, nn - n, nn - m, nn);
        } else {
          Prob = 1 - this.hyp(n - x - 1, n, nn - m, nn);
        }
      } else if (2 * n > nn) {
        Prob = 1 - this.hyp(m - x - 1, m, nn - n, nn);
      } else {
        Prob = this.hyp(x, n, m, nn);
      }
    }
    Prob = Math.round(Prob * 100000) / 100000;
    if (!this.deckCount) {
      this.probabilityResults.push(Prob);
    } else if (this.deckCount) {
      this.drawResults.push(Prob);
    }
  }

  private hyp(x, n, m, nn) {
    let nz, mz;
    // best to have n<m
    if (m < n) {
      nz = m;
      mz = n;
    } else {
      nz = n;
      mz = m;
    }
    let h = 1;
    let s = 1;
    let k = 0;
    let i = 0;
    while (i < x) {
      while (s > 1 && k < nz) {
        h = h * (1 - mz / (nn - k));
        s = s * (1 - mz / (nn - k));
        k = k + 1;
      }
      h = h * (nz - i) * (mz - i) / (i + 1) / (nn - nz - mz + i + 1);
      s = s + h;
      i = i + 1;
    }
    while (k < nz) {
      s = s * (1 - mz / (nn - k));
      k = k + 1;
    }
    return s;
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

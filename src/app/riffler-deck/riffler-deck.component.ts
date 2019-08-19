import { Component, EventEmitter, Output, Pipe, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin'
import { switchMap, flatMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { DeckSubmitterService } from '../riffler-deck-submitter/riffler-deck-submitter.service';
import { CardObject, SwitcherList, PercentByCardType } from './riffler-deck.model';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'riffler-deck',
  templateUrl: './riffler-deck.component.html',
  styleUrls: ['./riffler-deck.component.css']
})
export class RifflerDeckComponent implements OnInit {
  // user input for  deck data. Initializes a sample deck
  // page loading animation
  loadingData: boolean = false;
  // response errors
  errorOnCardDataResp: string = 'error';
  selectedTab: number = 0;
  disabledReset: boolean = true;
  disabledOpeningHand: boolean = false;
  disableMulligan: boolean = true;
  disableScry: boolean = true;
  disableDraw: boolean = false;
  testMtgDeck: CardObject[] = [];
  mtgHand: CardObject[] = [];
  mtgDrawnCards: CardObject[] = [];
  scriedCard = [];
  mull: number = 0;
  userDeckList: any;
  subscription: Subscription;
  cardTypes: SwitcherList[] = [];
  cardNames: SwitcherList[] = [];
  cardTypeList: string[] = [];
  cardNameList: string[] = [];
  cardTypePercentLists: PercentByCardType[] = [];
  cardNamePercentLists: PercentByCardType[] = [];
  types = new FormControl();
  names = new FormControl();
  handsWithDiamondAndTwoLands: number = 0;
  handsWithDiamondAndOneLand: number = 0;
  handsWithNoDiamond: number = 0;
  index: number = 0;
  mulligan: boolean = false;
  applyBottomButton: boolean = false;
  @Output() stopLoadingData: EventEmitter<boolean> = new EventEmitter();
  @Output() enableTab: EventEmitter<boolean> = new EventEmitter();

  constructor(private deckSubmitterService: DeckSubmitterService,
    public matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.initCardTypeSelector();
    this.deckSubmitterService.userDeckList$.subscribe(userDeckList => {
      this.deckSubmitterService.scryFallDeckData$.subscribe(resp => {
        resp.subscribe(val => {
          this.userDeckList = userDeckList;
          this.initCardNameSelector();
          this.testMtgDeck = this.deckSubmitterService.assignAmountOfSiblingCardsInDeck(val.data, userDeckList);
          this.calculateEachCardDrawPercentage();
          this.selectedTab += 1;
          this.selectedTab > 1 ? this.selectedTab = 0 : this.selectedTab = 1;
          this.stopLoadingData.emit(false);
          this.enableTab.emit(false);
        });
      }, (error) => {
        this.errorOnCardDataResp = error.status + ' - ' + '   Check your deck and try again.';
        this.matSnackBar.open(this.errorOnCardDataResp, 'OK', {
          duration: 8000,
        });
        this.loadingData = false;
      });;
    })
  }

  // // draw your opening hand
  public drawOpeningHand(): void {
    // this.resetSim();
    if (this.mtgHand && this.mtgHand.length > 0) {
      for (let i = 0; i < 7; i++) {
        const card = this.mtgHand.shift();
        this.testMtgDeck.push(card);
      }
      for (let i = 0; i < 7; i++) {
        const card = this.testMtgDeck.splice((Math.floor(Math.random() * this.testMtgDeck.length)), 1);
        this.mtgHand.push(card[0]);
      }
    } else {
      for (let i = 0; i < 7; i++) {
        const card = this.testMtgDeck.splice((Math.floor(Math.random() * this.testMtgDeck.length)), 1);
        this.mtgHand.push(card[0]);
        this.testMtgDeck.map(value => {
          if (value.name === card[0].name) {
            value.numberOfInDeck--;
          }
        });
      }
      this.calculateEachCardDrawPercentage();
      this.cardTypePercentLists.length > 0 && this.cardTypeList.length > 0 ? this.findPercentByCardType(this.cardTypeList) : console.log('none');
      this.cardNamePercentLists.length > 0 && this.cardNameList.length > 0 ? this.findPercentByCardName(this.cardNameList) : console.log('none');
      this.disabledReset = false;
      this.disabledOpeningHand = true;
      this.disableMulligan = false;
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
    this.mull = 6;
    this.deckSubmitterService.assignAmountOfSiblingCardsInDeck(this.testMtgDeck, this.userDeckList);
    this.calculateEachCardDrawPercentage();
    this.disabledOpeningHand = false;
    this.disabledReset = true;
    this.disableScry = true;
    this.disableDraw = false;
    this.disableMulligan = true;
    this.scriedCard = [];
    this.cardTypePercentLists = [];
    this.cardNamePercentLists = [];
    this.cardTypeList = [];
    this.cardNameList = [];
  }

  public drawCard(): void {
    if (this.scriedCard.length === 0) {
      const index = (Math.floor(Math.random() * this.testMtgDeck.length));
      const card = this.testMtgDeck.splice((Math.floor(Math.random() * this.testMtgDeck.length)), 1);
      this.mtgDrawnCards.push(card[0]);
      this.testMtgDeck.map(c => {
        if (c.name === card[0].name) {
          c.numberOfInDeck--;
        }
      });
    } else if (this.scriedCard && this.scriedCard.length > 0) {
      const cardIndex = this.testMtgDeck.findIndex(val => val.name === this.scriedCard[0].name);
      const card = this.testMtgDeck.splice(cardIndex, 1);
      this.mtgDrawnCards.push(card[0]);
    }
    this.calculateEachCardDrawPercentage();
    this.cardTypePercentLists.length > 0 && this.cardTypeList.length > 0 ? this.findPercentByCardType(this.cardTypeList) : console.log('none');
    this.cardNamePercentLists.length > 0 && this.cardNameList.length > 0 ? this.findPercentByCardName(this.cardNameList) : console.log('none');
    this.disableMulligan = true;
  }

  // public mulligan(): void {
  //   this.deckSubmitterService.assignAmountOfSiblingCardsInDeck(this.testMtgDeck, this.userDeckList);
  //   if (this.mull === 0) {
  //     this.mull = 6;
  //   }
  //   this.testMtgDeck = this.testMtgDeck.concat(this.mtgHand);
  //   this.mtgHand = [];
  //   for (let i = 0; i < this.mull; i++) {
  //     const index = (Math.floor(Math.random() * this.testMtgDeck.length));
  //     const card = this.testMtgDeck.splice((Math.floor(Math.random() * this.testMtgDeck.length)), 1);
  //     this.mtgHand.push(card[0]);
  //     this.testMtgDeck.map(value => {
  //       if (value.name === card[0].name) {
  //         value.numberOfInDeck--;
  //       }
  //     });
  //   }
  //   this.mull--;
  //   this.calculateEachCardDrawPercentage();
  //   this.disableScry = false;
  //   this.disableDraw = true;
  // }

  public londonMulliganRule() {
    this.mulligan = true;
    this.deckSubmitterService.assignAmountOfSiblingCardsInDeck(this.testMtgDeck, this.userDeckList);
    this.testMtgDeck = this.testMtgDeck.concat(this.mtgHand);
    this.mtgHand = [];

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
    this.mull++;
    this.calculateEachCardDrawPercentage();
    this.disableScry = true;
    this.disableDraw = true;
  }

  public scryCard() {
    const index = (Math.floor(Math.random() * this.testMtgDeck.length));
    this.scriedCard.push(this.testMtgDeck[index]);
    this.disableScry = true;
  }

  public scryTop() {
    this.disableDraw = false;
    this.drawCard();
    this.scriedCard = [];
  }

  public scryBottom() {
    this.disableDraw = false;
    this.scriedCard = [];
  }

  public putBackCards(): void {
    this.disableMulligan = true;
    this.mulligan = false;
    this.applyBottomButton = true;
  }

  public bottomCard(val, bottomedCardIndex): void {
    this.testMtgDeck.push(this.mtgHand[bottomedCardIndex]);
    this.mtgHand.splice(bottomedCardIndex, 1);
  }

  public checkCardChance(num: number) {
    let classChecker: any;
    if (num <= 0.033) {
      return classChecker = {
        'low-chance-1': true
      };
    } else if (num > 0.033 && num < 0.05) {
      return classChecker = {
        'low-chance-2': true
      };
    } else if (num >= 0.05 && num < 0.15) {
      return classChecker = {
        'low-chance-3': true
      };
    } else if (num >= 0.15 && num < 0.20) {
      return classChecker = {
        'medium-chance-1': true
      };
    } else if (num >= 0.20 && num < 0.25) {
      return classChecker = {
        'medium-chance-2': true
      };
    } else if (num >= 0.25 && num < 0.35) {
      return classChecker = {
        'medium-chance-3': true
      };
    } else {
      return classChecker = {
        'high-chance': true
      };
    }
  }

  public findPercentByCardType(value) {
    this.cardTypePercentLists = [];
    this.cardTypeList = value;
    value.map(cardType => {
      let i: number = 1;
      let cardTypePercent;
      this.testMtgDeck.map(deckItem => {
        if (deckItem.type_line.includes(cardType)) {
          cardTypePercent = {
            name: cardType,
            numberOfInDeck: i++,
            percentageToDraw: 0
          }
        }
      });
      cardTypePercent.percentageToDraw = +(cardTypePercent.numberOfInDeck / this.testMtgDeck.length).toFixed(6);
      this.cardTypePercentLists.push(cardTypePercent);
    });
  }

  public findPercentByCardName(value) {
    this.cardNamePercentLists = [];
    this.cardNameList = value;
    value.map(cardName => {
      let i: number = 1;
      let cardTypePercent;
      this.testMtgDeck.map(deckItem => {
        if (deckItem.name === cardName) {
          cardTypePercent = {
            name: cardName,
            numberOfInDeck: i++,
            percentageToDraw: 0
          }
        }
      });
      cardTypePercent.percentageToDraw = +(cardTypePercent.numberOfInDeck / this.testMtgDeck.length).toFixed(6);
      this.cardNamePercentLists.push(cardTypePercent);
    });
  }

  private calculateEachCardDrawPercentage() {
    if (this.testMtgDeck.length <= 75 && this.testMtgDeck.length !== 0) {
      this.testMtgDeck.forEach(card => {
        card.percentageToDraw = +(card.numberOfInDeck / this.testMtgDeck.length).toFixed(6);
      });
    }
  }

  private initCardTypeSelector() {
    this.cardTypes = [
      { value: 'Land', viewValue: 'Land' },
      { value: 'Creature', viewValue: 'Creature' },
      { value: 'Sorcery', viewValue: 'Sorcery' },
      { value: 'Instant', viewValue: 'Instant' },
      { value: 'Artifact', viewValue: 'Artifact' },
      { value: 'Enchantment', viewValue: 'Enchantment' },
      { value: 'Planeswalker', viewValue: 'Planeswalker' },
      { value: 'Tribal Sorcery', viewValue: 'Tribal Sorcery' },
      { value: 'Tribal Instant', viewValue: 'Tribal Instant' },
      { value: 'Tribal Artifact', viewValue: 'Tribal Artifact' },
      { value: 'Tribal Enchantment', viewValue: 'Tribal Enchantment' }
    ]
  }

  private initCardNameSelector() {
    let tempCardList = this.userDeckList.replace(/[0-9]/g, '');
    let cardList = tempCardList.match(/.+\n/g);
    cardList.map(cardValues => {
      this.cardNames.push({
        value: cardValues.trim(),
        viewValue: cardValues.trim()
      });
    });
  }

}

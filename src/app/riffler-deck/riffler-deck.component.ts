import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import "rxjs/add/operator/map";
import { MatSnackBar } from "@angular/material";
import { DeckSubmitterService } from "../riffler-deck-submitter/riffler-deck-submitter.service";
import { RifflerDeckPresentationService } from "../riffler-deck/riffler-deck-presentation.service";
import {
  CardObject,
  SwitcherList,
  PercentByCardType,
} from "./riffler-deck.model";
import { Subscription } from "rxjs/Subscription";
import { FormControl } from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "riffler-deck",
  templateUrl: "./riffler-deck.component.html",
  styleUrls: ["./riffler-deck.component.css"],
})
export class RifflerDeckComponent implements OnInit {
  // user input for  deck data. Initializes a sample deck
  // page loading animation
  loadingData: boolean = false;

  // button inputs
  resetButtonLabel: string = "Reset";
  disabledReset: boolean = true;

  drawOpeningHandButton: string = "Draw Opening Hand";

  mulliganButtonLabel: string = "Mulligan";
  keepButtonLabel: string = "Keep";
  drawCardButtonLabel: string = "Draw a Card";

  // response errors
  errorOnCardDataResp: string = "error";
  selectedTab: number = 0;

  filterLabelPercent: string = "Find % by card type:";
  filterLabelCardName: string = "Find % by card name:";
  filterPlaceholder: string = "Choose a card type...";
  filterPlaceholderName: string = "Choose a card name...";

  deckStatsLabel: string = "Deck:";
  handStatsLabel: string = "Hand:";
  drawnCardsStatsLabel: string = "Cards Drawn:";

  showDeckStats: boolean = true;

  cardHeaderLabel: string = "Chance to Draw:";

  createOpenHandDataLabel: string = "Generate Opening Hand Data";

  analyzeOpenHandData: string = "Analyze Open Hand Data";

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

  name = 'Angular 5';
  fileUrl;
  downloadData: any[] = [];

  @Output() stopLoadingData: EventEmitter<boolean> = new EventEmitter();
  @Output() enableTab: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private rifflerDeckPresentationService: RifflerDeckPresentationService,
    private deckSubmitterService: DeckSubmitterService,
    public matSnackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.initCardTypeSelector();
    // TODO: turn this into a declaritive observable
    this.deckSubmitterService.userDeckList$.subscribe((userDeckList) => {
      this.deckSubmitterService.scryFallDeckData$.subscribe(
        (resp) => {
          resp.subscribe((val) => {
            this.userDeckList = userDeckList;
            this.initCardNameSelector();
            this.testMtgDeck = this.deckSubmitterService.assignAmountOfSiblingCardsInDeck(
              val.json().data,
              userDeckList
            );
            this.calculateEachCardDrawPercentage();
            this.selectedTab += 1;
            this.selectedTab > 1
              ? (this.selectedTab = 0)
              : (this.selectedTab = 1);
            this.stopLoadingData.emit(false);
            this.enableTab.emit(false);
          });
        },
        (error) => {
          this.errorOnCardDataResp =
            error.status + " - " + "   Check your deck and try again.";
          this.matSnackBar.open(this.errorOnCardDataResp, "OK", {
            duration: 8000,
          });
          this.loadingData = false;
        }
      );
    });
  }

  // public drawOpeningHand(): void {
  //   this.rifflerDeckPresentationService.drawOpeningHand();
  // }

  // public createOpeningHandData(): void {
  //   this.rifflerDeckPresentationService.generateOpeningHandData();
  // }

  // private addDeckData(data: any): void {
  //   this.rifflerDeckPresentationService.addData(data);
  // }

  // draw your opening hand
  public drawOpeningHand(): void {
    // this.resetSim();
    if (this.mtgHand && this.mtgHand.length > 0) {
      for (let i = 0; i < 7; i++) {
        const card = this.mtgHand.shift();
        this.testMtgDeck.push(card);
      }
      for (let i = 0; i < 7; i++) {
        const card = this.testMtgDeck.splice(
          Math.floor(Math.random() * this.testMtgDeck.length),
          1
        );
        this.mtgHand.push(card[0]);
      }
    } else {
      for (let i = 0; i < 7; i++) {
        const card = this.testMtgDeck.splice(
          Math.floor(Math.random() * this.testMtgDeck.length),
          1
        );
        this.mtgHand.push(card[0]);
        this.testMtgDeck.map((value) => {
          if (value.name === card[0].name) {
            value.numberOfInDeck--;
          }
        });
      }
      this.calculateEachCardDrawPercentage();
      this.cardTypePercentLists.length > 0 && this.cardTypeList.length > 0
        ? this.findPercentByCardType(this.cardTypeList)
        : console.log("none");
      this.cardNamePercentLists.length > 0 && this.cardNameList.length > 0
        ? this.findPercentByCardName(this.cardNameList)
        : console.log("none");
      this.disabledReset = false;
      this.disabledOpeningHand = true;
      this.disableMulligan = false;
    }
  }

  // private resetSim(): void {
  //   this.rifflerDeckPresentationService.resetSim();
  // }

  // clear opening hand and drawn cards
  public resetSim(event?): void {
    if (this.mtgDrawnCards && this.mtgDrawnCards.length > 0) {
      this.testMtgDeck = this.testMtgDeck.concat(this.mtgDrawnCards);
      this.mtgDrawnCards = [];
    }
    if (this.mtgHand && this.mtgHand.length > 0) {
      this.testMtgDeck = this.testMtgDeck.concat(this.mtgHand);
      this.mtgHand = [];
    }
    this.mull = 6;
    this.deckSubmitterService.assignAmountOfSiblingCardsInDeck(
      this.testMtgDeck,
      this.userDeckList
    );
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

  // private drawCard(): void {
  //   this.rifflerDeckPresentationService.drawCard();
  // }

  public drawCard(): void {
    if (this.scriedCard.length === 0) {
      const index = Math.floor(Math.random() * this.testMtgDeck.length);
      const card = this.testMtgDeck.splice(
        Math.floor(Math.random() * this.testMtgDeck.length),
        1
      );
      this.mtgDrawnCards.push(card[0]);
      this.testMtgDeck.map((c) => {
        if (c.name === card[0].name) {
          c.numberOfInDeck--;
        }
      });
    } else if (this.scriedCard && this.scriedCard.length > 0) {
      const cardIndex = this.testMtgDeck.findIndex(
        (val) => val.name === this.scriedCard[0].name
      );
      const card = this.testMtgDeck.splice(cardIndex, 1);
      this.mtgDrawnCards.push(card[0]);
    }
    this.calculateEachCardDrawPercentage();
    this.cardTypePercentLists.length > 0 && this.cardTypeList.length > 0
      ? this.findPercentByCardType(this.cardTypeList)
      : console.log("none");
    this.cardNamePercentLists.length > 0 && this.cardNameList.length > 0
      ? this.findPercentByCardName(this.cardNameList)
      : console.log("none");
    this.disableMulligan = true;
  }

  // private londonMulliganRule(): void {
  //   this.rifflerDeckPresentationService.londonMulliganRule();
  // }

  public londonMulliganRule(): void {
    this.mulligan = true;
    this.deckSubmitterService.assignAmountOfSiblingCardsInDeck(
      this.testMtgDeck,
      this.userDeckList
    );
    this.testMtgDeck = this.testMtgDeck.concat(this.mtgHand);
    this.mtgHand = [];

    for (let i = 0; i < 7; i++) {
      const index = Math.floor(Math.random() * this.testMtgDeck.length);
      const card = this.testMtgDeck.splice(
        Math.floor(Math.random() * this.testMtgDeck.length),
        1
      );
      this.mtgHand.push(card[0]);
      this.testMtgDeck.map((value) => {
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

  public createOpeningHandData (): void {
    let limit: number = 10;
    for (let i = 0; i < limit; i++) {
      // run sim code here
      this.drawOpeningHand();
      console.log(i);
      let list: string = "";
      let cardType: string = ""
      this.mtgHand.forEach(val => {
        list = list + val.name + " ";
        cardType = cardType + val.type_line + "|";
      })
      this.downloadData.push({list: list, type: cardType});
      this.resetSim();
    }
    console.log("DONE!")
  }

  public analyzeData(): void {
    let keepScore: number = 0;
    let MulliganScore: number = 0;
    this.downloadData.forEach(hand => {
      if (this.checkForIMS(hand.list) &&
      this.checkHandQuality(hand.type)) {
        keepScore++;
      } else {
        MulliganScore++;
      }
    })
    console.log({KeepPercentage: keepScore, MullScore: MulliganScore});
  }

  public checkForIMS(hand: any): boolean {
    if (hand.includes("Forest") ||
      hand.includes("Snow-Covered Forest") ||
      hand.includes("Bayou") ||
      hand.includes("Savannah") ||
      hand.includes("Verdant Catacombs") ||
      hand.includes("Windswept Heath") ||
      hand.includes("Misty Rainforest") ||
      hand.includes("Wooded Foothills") ||
      hand.includes("Once Upon a Time")) {
        return true;
      } else {
        return false;
      }
  }

  public checkForCradle(hand: any): boolean {
    if (hand.includes("Gaea's Cradle") ||
    hand.includes("Once Upon a Time")) {
      return true;
    } else {
      return false;
    }
  }

  public checkHandQuality(hand: string): boolean {
    // "Creature — Elf Ranger|Sorcery|Creature — Elf Shaman|Land|Sorcery|Creature — Elf Shaman|Sorcery|"
    /**
     *  1. Contains at least 1 Land
     *  2. Contains no more than 4 Lands
     *  3. 
     */
    let typeCount: any = {land: 0, creature: 0, instant: 0, sorcery: 0};
    let handArr = hand.split("|");
    handArr.pop();
    handArr.forEach(card => {
      if (card.includes("Land")) {
        typeCount.land++
      } else if (card.includes("Creature")) {
        typeCount.creature++
      } else if (card.includes("Instant")) {
        typeCount.instant++
      } else {
        typeCount.sorcery++
      }
    });
    if (
      (typeCount.land < 4 || typeCount.land === 0) && (typeCount.creature >= 1 || typeCount.sorcery >= 1 || typeCount.instant >= 1)) || (typeCount.land < 4 && typeCount.creature >= 1)) {
      console.log("HAND QUALUTY");
      console.log(typeCount);
      return true;
    } else {
      return false;
    }
  }

  dynamicDownloadTxt() {
    this.dyanmicDownloadByHtmlTag({
      fileName: 'My Report',
      text: JSON.stringify(this.downloadData)
    });
  }

  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }

  public dyanmicDownloadByHtmlTag(arg: any) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }

  // private putBackCards(): void {
  //   this.rifflerDeckPresentationService.putBackCards();
  // }

  public putBackCards(): void {
    this.disableMulligan = true;
    this.mulligan = false;
    this.applyBottomButton = true;
  }

  // private bottomCard(hand, bottomedCardIndex): void {
  //   this.rifflerDeckPresentationService.bottomCard(hand, bottomedCardIndex);
  // }

  public bottomCard(hand, bottomedCardIndex): void {
    this.testMtgDeck.push(this.mtgHand[bottomedCardIndex]);
    this.mtgHand.splice(bottomedCardIndex, 1);
    this.disableDraw = false;
  }

  // private findPercentByCardType(value): void {
  //   this.rifflerDeckPresentationService.findPercentByCardType(value);
  // }

  public findPercentByCardType(value): void {
    this.cardTypePercentLists = [];
    this.cardTypeList = value;
    value.map((cardType) => {
      let i: number = 1;
      let cardTypePercent;
      this.testMtgDeck.map((deckItem) => {
        if (deckItem.type_line.includes(cardType)) {
          cardTypePercent = {
            name: cardType,
            numberOfInDeck: i++,
            percentageToDraw: 0,
          };
        }
      });
      cardTypePercent.percentageToDraw = +(
        cardTypePercent.numberOfInDeck / this.testMtgDeck.length
      ).toFixed(6);
      this.cardTypePercentLists.push(cardTypePercent);
    });
  }

  // private findPercentByCardName(value): void {
  //   this.rifflerDeckPresentationService.findPercentByCardName(value);
  // }

  public findPercentByCardName(value): void {
    this.cardNamePercentLists = [];
    this.cardNameList = value;
    value.map((cardName) => {
      let i: number = 1;
      let cardTypePercent;
      this.testMtgDeck.map((deckItem) => {
        if (deckItem.name === cardName) {
          cardTypePercent = {
            name: cardName,
            numberOfInDeck: i++,
            percentageToDraw: 0,
          };
        }
      });
      cardTypePercent.percentageToDraw = +(
        cardTypePercent.numberOfInDeck / this.testMtgDeck.length
      ).toFixed(6);
      this.cardNamePercentLists.push(cardTypePercent);
    });
  }

  // private calculateEachCardDrawPercentage(): void {
  //   this.rifflerDeckPresentationService.calculateEachCardDrawPercentage();
  // }

  public calculateEachCardDrawPercentage(): void {
    if (this.testMtgDeck.length <= 75 && this.testMtgDeck.length !== 0) {
      this.testMtgDeck.forEach((card) => {
        card.percentageToDraw = +(
          card.numberOfInDeck / this.testMtgDeck.length
        ).toFixed(6);
      });
    }
  }

  // private initCardTypeSelector(): void {
  //   this.rifflerDeckPresentationService.initCardTypeSelector();
  // }

  public initCardTypeSelector(): void {
    this.cardTypes = [
      { value: "Land", viewValue: "Land" },
      { value: "Creature", viewValue: "Creature" },
      { value: "Sorcery", viewValue: "Sorcery" },
      { value: "Instant", viewValue: "Instant" },
      { value: "Artifact", viewValue: "Artifact" },
      { value: "Enchantment", viewValue: "Enchantment" },
      { value: "Planeswalker", viewValue: "Planeswalker" },
      { value: "Tribal Sorcery", viewValue: "Tribal Sorcery" },
      { value: "Tribal Instant", viewValue: "Tribal Instant" },
      { value: "Tribal Artifact", viewValue: "Tribal Artifact" },
      { value: "Tribal Enchantment", viewValue: "Tribal Enchantment" },
    ];
  }

  // private initCardNameSelector(): void {
  //   this.rifflerDeckPresentationService.initCardNameSelector();
  // }

  public initCardNameSelector(): void {
    let tempCardList = this.userDeckList.replace(/[0-9]/g, "");
    let cardList = tempCardList.match(/.+\n/g);
    cardList.map((cardValues) => {
      this.cardNames.push({
        value: cardValues.trim(),
        viewValue: cardValues.trim(),
      });
    });
  }

  public scryCard(): void {
    const index = Math.floor(Math.random() * this.testMtgDeck.length);
    this.scriedCard.push(this.testMtgDeck[index]);
    this.disableScry = true;
  }

  public scryTop(): void {
    this.disableDraw = false;
    this.drawCard();
    this.scriedCard = [];
  }

  public scryBottom(): void {
    this.disableDraw = false;
    this.scriedCard = [];
  }
}

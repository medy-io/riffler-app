import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { DeckSubmitterService } from "../riffler-deck-submitter/riffler-deck-submitter.service";
import {
  CardObject,
  SwitcherList,
  PercentByCardType,
} from "./riffler-deck.model";
import { Subscription } from "rxjs/Subscription";
import { FormControl } from "@angular/forms";

@Injectable()
export class RifflerDeckPresentationService {
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
  bigOlArray: any[] = [];

  constructor(private deckSubmitterService: DeckSubmitterService) {}

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

  public putBackCards(): void {
    this.disableMulligan = true;
    this.mulligan = false;
    this.applyBottomButton = true;
  }

  public bottomCard(hand, bottomedCardIndex): void {
    this.testMtgDeck.push(this.mtgHand[bottomedCardIndex]);
    this.mtgHand.splice(bottomedCardIndex, 1);
    this.disableDraw = false;
  }

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

  public calculateEachCardDrawPercentage(): void {
    if (this.testMtgDeck.length <= 75 && this.testMtgDeck.length !== 0) {
      this.testMtgDeck.forEach((card) => {
        card.percentageToDraw = +(
          card.numberOfInDeck / this.testMtgDeck.length
        ).toFixed(6);
      });
    }
  }

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

  public addData(data: any): void {
    this.userDeckList = data;
  }

  public generateOpeningHandData(): void {
    let limit: number = 10000;
    for (let i = 0; i < limit; i++) {
      // run sim code here
      this.drawOpeningHand();
      console.log(this.mtgHand);
      this.resetSim();
    }
  }

  private scryCard(): void {
    const index = Math.floor(Math.random() * this.testMtgDeck.length);
    this.scriedCard.push(this.testMtgDeck[index]);
    this.disableScry = true;
  }

  private scryTop(): void {
    this.disableDraw = false;
    this.drawCard();
    this.scriedCard = [];
  }

  private scryBottom(): void {
    this.disableDraw = false;
    this.scriedCard = [];
  }
}

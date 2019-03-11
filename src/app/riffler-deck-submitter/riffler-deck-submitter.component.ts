import { Component, EventEmitter, Input, Output } from '@angular/core';
import 'rxjs/add/operator/map';
import { DeckSubmitterService } from './riffler-deck-submitter.service';
import { MatSnackBar } from '@angular/material';
// import { CardObject } from './riffler-deck-submitter.model';

@Component({
  selector: 'riffler-deck-submitter',
  templateUrl: './riffler-deck-submitter.component.html',
  styleUrls: ['./riffler-deck-submitter.component.css']
})
export class RifflerDeckSubmitterComponent {
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
  errorOnCardDataResp: string;

  disabledReset: boolean = true;
  disabledOpeningHand: boolean = false;
  disableMulligan: boolean = false;
  selectedTab: number = 0;
  deck: string = '';
  @Input() tab: number;
  @Output() activeTab: EventEmitter<number> = new EventEmitter();
  @Output() isLoadingData: EventEmitter<boolean> = new EventEmitter();

  constructor(private deckSubmitterService: DeckSubmitterService,
    public matSnackBar: MatSnackBar) { }

  getDeckData() {
    this.disabledReset = true;
    this.disabledOpeningHand = false;
    this.disableMulligan = false;
    this.selectedTab = 0;
    this.loadingData = true;
    this.isLoadingData.emit(true);
    setTimeout(() => {
      this.deckSubmitterService.getDeckData(this.deckListRequestData);
    }, 50);
    this.deckSubmitterService.subby$.subscribe(resp => {
      resp.subscribe(val => {
        if (resp.error) {
          console.log(val.data[0].name);
          this.deck = val.data[0].name;
        }
      }, (error) => {
        this.isLoadingData.emit(false);
        this.errorOnCardDataResp = error.status + ' ' + error.statusText + '  |  Check your deck and try again.';
        this.matSnackBar.open(this.errorOnCardDataResp, 'OK', {
          duration: 8000,
        });
        
      });
    })
  }
}

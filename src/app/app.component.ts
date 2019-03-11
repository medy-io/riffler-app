import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { DeckSubmitterService } from './riffler-deck-submitter/riffler-deck-submitter.service';

@Component({
  selector: 'riffler-root',
  templateUrl: './app.component.html',
  providers: [DeckSubmitterService],
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedTab: number = 0;
  loadingData: boolean = false;
  disableDeckTab: boolean = true;

  constructor() { }

  enableTab() {
    this.disableDeckTab = false;
    this.loadingData = false;
    this.selectedTab += 1;
    this.selectedTab > 1 ? this.selectedTab = 0 : this.selectedTab = 1;
  }

  setLoadingScreen(bol: boolean) {
    this.loadingData = bol;
  }

}

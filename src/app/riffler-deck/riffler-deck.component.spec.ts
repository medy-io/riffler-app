import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/observable/of';

import { RifflerDeckComponent } from './riffler-deck.component';
import { RifflerDeckSubmitterComponent } from './../riffler-deck-submitter/riffler-deck-submitter.component';
import { RifflerHeaderComponent } from './../riffler-header/riffler-header.component';
import { AppComponent } from './../app.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardObject } from './riffler-deck.model';

import { RifflerProxy } from './../riffler.proxy';
import { DeckSubmitterService } from '../riffler-deck-submitter/riffler-deck-submitter.service';
import { HttpModule } from '@angular/http';
import { doesNotThrow } from 'assert';

xdescribe('AppComponent', () => {

  let fixture: ComponentFixture<RifflerDeckComponent>;
  let app: any;
  const de: DebugElement = undefined;

  let httpClientSpy: { post: jasmine.Spy };
  let service: DeckSubmitterService;

  let usersDeck: string = `1 Chart a Course
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

  // let appService: AppService;
  // let spy: jasmine.Spy;

  // execute before tests
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule, MatCardModule, MatProgressSpinnerModule, MatButtonModule,
        BrowserAnimationsModule, MatTabsModule, MatExpansionModule,
        MatInputModule, MatMenuModule, MatFormFieldModule, FormsModule,
        ReactiveFormsModule, MatSnackBarModule, MatTableModule, MatSelectModule, HttpModule
      ],
      providers: [
        DeckSubmitterService, RifflerProxy
      ],
      declarations: [
        RifflerDeckComponent, RifflerDeckSubmitterComponent, RifflerHeaderComponent, AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(RifflerDeckComponent);
    app = fixture.debugElement.componentInstance;

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new DeckSubmitterService(<any>httpClientSpy);
  });

  it('should create the deck component', () => {
    expect(app).toBeTruthy();
  });

  it(`should have a 'deck response'`, async () => {
    expect(service.scryFallDeckData$).toBeDefined();
    expect(app.testMtgDeck.length).toEqual(0);

    await service.getDeckData(usersDeck);

    expect(app.testMtgDeck.length).toBeGreaterThan(0);
    expect(app.testMtgDeck.length).toEqual(60);
    expect(app.testMtgDeck).toContain('Merfolk Trickster');
    expect(app.testMtgDeck).toContain('Tempest Djinn');
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it(`should draw a hand of seven cards`, async () => {
    expect(app.mtgHand.length).toEqual(0);
    expect(app.mtgHand).toBeTruthy();
    expect(app.disabledReset).toBe(true);
    expect(app.disabledOpeningHand).toBe(false);
    expect(app.disableMulligan).toBe(true);

    await service.getDeckData(usersDeck);
    await app.drawOpeningHand();

    expect(app.testMtgDeck.length).toEqual(60);
    expect(app.mtgHand.length).toEqual(7);
    expect(app.disabledReset).toBe(false);
    expect(app.disabledOpeningHand).toBe(true);
    expect(app.disableMulligan).toBe(false);
    expect(app.testMtgDeck.length).toEqual(53);
  });

  it(`should mulligan to a hand of six or less cards`, async () => {
    expect(app.mtgHand.length).toEqual(0);
    expect(app.mtgHand).toBeTruthy();
    expect(app.disableScry).toBe(true);
    expect(app.disableDraw).toBe(false);
    expect(app.mull).toEqual(6);

    await service.getDeckData(usersDeck);
    await app.drawOpeningHand();
    await app.mulligan();

    expect(app.mull).toEqual(5);
    expect(app.disableScry).toBe(false);
    expect(app.disableDraw).toBe(true);
    expect(app.mtgHand.length).toBeLessThan(7);
  });

  it(`should mulligan to a hand of six or less cards, keep and scry to top`, async () => {
    expect(app.mtgHand.length).toEqual(0);
    expect(app.disableDraw).toBe(false);
    expect(app.mull).toEqual(6);
    expect(app.disableScry).toEqual(true);

    await service.getDeckData(usersDeck);
    await app.drawOpeningHand();
    await app.mulligan();

    expect(app.disableScry).toEqual(false);
    
    app.scryCard();
    let card = app.scriedCard[0];
    app.scryTop();

    expect(app.mtgDrawnCards[0].name).toContain(card[0].name);
    expect(app.disableScry).toEqual(true);
    expect(app.mull).toEqual(5);
    expect(app.disableDraw).toBe(false);
    expect(app.mtgHand.length).toBeLessThan(7);
    expect(app.testMtgDeck.length).toEqual(53);
  });

  it(`should mulligan to a hand of six or less cards, keep and scry to bottom`, async () => {
    expect(app.mtgHand.length).toEqual(0);
    expect(app.disableDraw).toBe(false);
    expect(app.mull).toEqual(6);
    expect(app.disableScry).toEqual(true);

    await service.getDeckData(usersDeck);
    await app.drawOpeningHand();
    await app.mulligan();

    expect(app.disableScry).toEqual(false);
    
    app.scryCard();
    app.scryBottom();
    
    expect(app.disableScry).toEqual(true);
    expect(app.mull).toEqual(5);
    expect(app.disableDraw).toBe(false);
    expect(app.mtgHand.length).toBeLessThan(7);
    expect(app.testMtgDeck.length).toEqual(53);
  });

  it(`should reset a hand of seven or any mulligan of 6 or less cards`, async () => {
    await service.getDeckData(usersDeck);
    await app.drawOpeningHand();
    await app.mulligan();
    await app.reset();

    expect(app.mull).toEqual(6);
    expect(app.disabledOpeningHand).toBe(false);
    expect(app.disabledReset).toBe(true);
    expect(app.disableScry).toBe(true);
    expect(app.disableDraw).toBe(false);
    expect(app.disableMulligan).toBe(true);
    expect(app.mtgHand.length).toEqual(0);
  });

  it(`should draw a card after keeping 7 cards`, async () => {
    expect(app.mtgDrawnCards.length).toEqual(0);
    expect(app.testMtgDeck.length).toEqual(0);
    expect(app.mtgHand.length).toEqual(0);
    
    await service.getDeckData(usersDeck);
    await app.drawOpeningHand();
    await app.drawCard();

    expect(app.mtgDrawnCards.length).toEqual(1);
    expect(app.testMtgDeck.length).toEqual(52);
    expect(app.disableMulligan).toBe(true);
    expect(app.mtgHand.length).toEqual(7);
  });

});

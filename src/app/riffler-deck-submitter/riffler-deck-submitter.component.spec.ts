import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/observable/of';

import { RifflerDeckSubmitterComponent } from './riffler-deck-submitter.component';
import { RifflerHeaderComponent } from './../riffler-header/riffler-header.component';
import { RifflerDeckComponent } from './../riffler-deck/riffler-deck.component';
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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardObject } from './../riffler-deck/riffler-deck.model';

import { RifflerProxy } from './../riffler.proxy';
import { DeckSubmitterService } from './riffler-deck-submitter.service';
import { HttpModule } from '@angular/http';
import { doesNotThrow } from 'assert';
describe('RifflerDeckSubmitterComponent', () => {

  let fixture: ComponentFixture<RifflerDeckSubmitterComponent>;
  let app: any;
  let component: RifflerDeckSubmitterComponent;
  const de: DebugElement = undefined;

  // let appService: AppService;
  // let spy: jasmine.Spy;

  // execute before tests
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule, MatCardModule, MatProgressSpinnerModule, MatButtonModule,
        BrowserAnimationsModule, MatTabsModule, MatExpansionModule,
        MatInputModule, MatMenuModule, MatFormFieldModule, FormsModule,
        ReactiveFormsModule, MatSnackBarModule, HttpModule
      ],
      providers: [
        DeckSubmitterService, RifflerProxy
      ],
      declarations: [
        RifflerDeckSubmitterComponent, RifflerDeckComponent, RifflerHeaderComponent, AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach((() => {
    fixture = TestBed.createComponent(RifflerDeckSubmitterComponent);
    app = fixture.debugElement.componentInstance;
    component = fixture.componentInstance;
    app.deckListRequestData = `1 Delver of Secrets`;
    app.getDeckData();
  }));

  it('should create the deck submitter', async(() => {
    expect(app).toBeTruthy();
  }));

  it('should fetch card data', async(() => {
    // app.deckListRequestData = `1 Delver of Secrets`;
    // app.getDeckData();
    // fixture.detectChanges();
    expect(app.deckListRequestData).toContain(`1 Delver of Secrets`);
  }));

//   it('should do its thing and fail', async(() => {
//     app.deckListRequestData = `  1 D  el  ve r o f Sec  r ets  `;
//     app.getDeckData();
//     expect(app.errorOnCardDataResp).toBeTruthy();
//   }));

});

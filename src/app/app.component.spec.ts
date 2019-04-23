import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/observable/of';

import { AppComponent } from './app.component';
import { RifflerDeckComponent } from './riffler-deck/riffler-deck.component';
import { RifflerDeckSubmitterComponent } from './riffler-deck-submitter/riffler-deck-submitter.component';
import { RifflerHeaderComponent } from './riffler-header/riffler-header.component';

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

import { CardObject } from './riffler-deck/riffler-deck.model';

import { RifflerProxy } from './riffler.proxy';
import { DeckSubmitterService } from './riffler-deck-submitter/riffler-deck-submitter.service';
import { HttpModule } from '@angular/http';
import { doesNotThrow } from 'assert';
xdescribe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let app: any;
  let component: AppComponent;
  const de: DebugElement = undefined;

  // let appService: AppService;
  // let spy: jasmine.Spy;

  // const data: any = require('./../assets/testJSON/mockCardData.json');

  // const mockCardData: CardObject[] = [];
  // mockCardData.push(data);

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
        AppComponent, RifflerDeckComponent, RifflerDeckSubmitterComponent, RifflerHeaderComponent
      ],
    }).compileComponents();
  }));

  beforeEach((() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    component = fixture.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

});

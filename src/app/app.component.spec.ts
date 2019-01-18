import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/observable/of';
import { AppComponent } from './app.component';
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
import {MatSnackBarModule} from '@angular/material/snack-bar';


import { HyperGeometricCalcService } from './hyper-geometric-calc.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardObject } from './app.model';

import { AppProxy } from './app.proxy';
import { AppService } from './app.service';
import { HttpModule } from '@angular/http';
import { doesNotThrow } from 'assert';
describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let app: any;
  let component: AppComponent;
  const de: DebugElement = undefined;

  // let appService: AppService;
  // let spy: jasmine.Spy;

  const data: any = require('./../assets/testJSON/mockCardData.json');

  const mockCardData: CardObject[] = [];
  mockCardData.push(data);

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
        AppService, HyperGeometricCalcService, AppProxy
      ],
      declarations: [
        AppComponent
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

  it(`should have as title 'app'`, async(() => {
    expect(app.title).toEqual('Riffler');
  }));

  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Riffler');
  }));

  // it('should have deck data on deck submission', async(() => {
  //   app.deckDataInput = `1 Delver of Secrets`;
  //   fixture.detectChanges();
  //   spyOn(component, 'getDeckData');
  //   const submitButton = fixture.debugElement.nativeElement.query(By.css('#submit'));
  //   submitButton.click();

  //   fixture.whenStable().then(() => {
  //     expect(app.loadingData).toBeTruthy();
  //     expect(app.testMtgDeck).toBeDefined();
  //     expect(app.testMtgDeck.length).toBeGreaterThan(0);
  //     expect(app.testMtgDeck[0].card_faces[0].name).toEqual('Delver of Secrets');
  //     expect(app.loadingData).toBeFalsy();
  //   });


  // }));

  // describe('Async Calls', () => {

  //   beforeEach(() => {
  //     appService = de.injector.get(AppService);
  //     spyOn(appService, 'getDeckData').and.returnValue(of(mockCardData));
  //     app.deckDataInput = `1 Delver of Secrets`;
  //     fixture.detectChanges();
  //     // await app.getDeckData();
  //   });

  //   it('should have deck data on deck submission', () => {
  //     expect(spy).toHaveBeenCalled();
  //     expect( spy.calls.all().length ).toEqual(1);
  //     // expect(app.testMtgDeck).toBeDefined();
  //     expect(app.testMtgDeck.length).toBeGreaterThan(0);
  //     expect(app.testMtgDeck[0].name).toEqual('Delver of Secrets');
  //   });

  // });

});

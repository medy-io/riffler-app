import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
// angular material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// riffler component imports
import { RifflerHeaderComponent } from './riffler-header/riffler-header.component';
import { RifflerDeckSubmitterComponent } from './riffler-deck-submitter/riffler-deck-submitter.component';
import { RifflerDeckComponent } from './riffler-deck/riffler-deck.component';
import { RifflerProxy } from './riffler.proxy';
import { DeckSubmitterService } from './riffler-deck-submitter/riffler-deck-submitter.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { AppService } from './app.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    // app components
    RifflerHeaderComponent,
    RifflerDeckComponent,
    RifflerDeckSubmitterComponent,
    AppComponent
  ],
  imports: [
    // angular material components
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatInputModule,
    MatSnackBarModule,
    // app modules
    HttpModule,
    BrowserModule,
    FormsModule
  ],
  providers: [RifflerProxy, DeckSubmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }

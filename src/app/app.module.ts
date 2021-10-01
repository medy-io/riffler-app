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
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
// riffler component imports
import { RifflerHeaderComponent } from './riffler-header/riffler-header.component';
import { RifflerDeckSubmitterComponent } from './riffler-deck-submitter/riffler-deck-submitter.component';
import { RifflerMetagameComponent } from './riffler-metagame/riffler-metagame.component';
import { RifflerDeckComponent } from './riffler-deck/riffler-deck.component';
import { RifflerProxy } from './riffler.proxy';
import { RifflerMetagameProxy } from './riffler-metagame/riffler-metagame.proxy';
import { DeckSubmitterService } from './riffler-deck-submitter/riffler-deck-submitter.service';
import { RifflerMetagameService } from './riffler-metagame/riffler-metagame.service';
import { RifflerDeckPresentationService } from './riffler-deck/riffler-deck-presentation.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { RifflerButtonComponent } from './riffler-button/riffler-button.component';
import { RifflerFilterComponent } from './riffler-filter/riffler-filter.component';
import { DeckStatsComponent } from './deck-stats/deck-stats.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    // app components
    RifflerHeaderComponent,
    RifflerDeckComponent,
    RifflerDeckSubmitterComponent,
    RifflerMetagameComponent,
    AppComponent,
    RifflerButtonComponent,
    RifflerFilterComponent,
    DeckStatsComponent,
    CardComponent
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
    MatTableModule,
    MatSelectModule,

    ReactiveFormsModule,
    // app modules
    HttpModule,
    BrowserModule,
    FormsModule
  ],
  providers: [RifflerProxy, RifflerMetagameProxy, DeckSubmitterService, RifflerMetagameService, RifflerDeckPresentationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

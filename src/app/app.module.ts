import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AppProxy } from './app.proxy';
import { AppService } from './app.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    HttpModule,
    BrowserModule
  ],
  providers: [AppProxy, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }

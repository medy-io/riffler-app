import { Component } from '@angular/core';

@Component({
  selector: 'riffler-header',
  templateUrl: './riffler-header.component.html',
  styleUrls: ['./riffler-header.component.css']
})
export class RifflerHeaderComponent {
  appTitle: string = 'Riffler';
  appTagLine: string = ': a deck simulator';
  logoUrl: string = './../assets/logo.png';

  constructor() { }

}

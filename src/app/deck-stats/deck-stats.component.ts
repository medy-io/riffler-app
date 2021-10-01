import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "riffler-deck-stats",
  templateUrl: "./deck-stats.component.html",
  styleUrls: ["./deck-stats.component.css"],
})
export class DeckStatsComponent implements OnInit {
  @Input() deckStatLabel: string;
  @Input() collection: any[];
  @Input() showHide: boolean;

  constructor() {}

  ngOnInit() {}
}

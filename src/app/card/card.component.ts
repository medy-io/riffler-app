import { Component, OnInit, Output, Input } from "@angular/core";

@Component({
  selector: "riffler-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent implements OnInit {
  @Input() cardHeader: string;
  @Input() totalDeck: any;

  constructor() {}

  ngOnInit() {}

  public checkCardChance(num: number) {
    let classChecker: any;
    if (num <= 0.033) {
      return (classChecker = {
        "low-chance-1": true,
      });
    } else if (num > 0.033 && num < 0.05) {
      return (classChecker = {
        "low-chance-2": true,
      });
    } else if (num >= 0.05 && num < 0.15) {
      return (classChecker = {
        "low-chance-3": true,
      });
    } else if (num >= 0.15 && num < 0.2) {
      return (classChecker = {
        "medium-chance-1": true,
      });
    } else if (num >= 0.2 && num < 0.25) {
      return (classChecker = {
        "medium-chance-2": true,
      });
    } else if (num >= 0.25 && num < 0.35) {
      return (classChecker = {
        "medium-chance-3": true,
      });
    } else {
      return (classChecker = {
        "high-chance": true,
      });
    }
  }
}

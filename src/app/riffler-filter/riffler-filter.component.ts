import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "riffler-riffler-filter",
  templateUrl: "./riffler-filter.component.html",
  styleUrls: ["./riffler-filter.component.css"],
})
export class RifflerFilterComponent implements OnInit {
  chanceToDrawLabel: string = "Chance to Draw:";
  @Input() filterLabel: string;
  @Input() selectPlaceholderLabel: string;
  @Input() formControlType: FormControl;
  @Input() cardAttrs: any[];
  @Input() cardPercentLists: any[];
  @Output() selectionToEmit = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  emitSelectionChange(value) {
    console.log(value);
    this.selectionToEmit.emit(value);
  }
}

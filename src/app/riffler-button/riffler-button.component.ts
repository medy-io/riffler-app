import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "riffler-riffler-button",
  templateUrl: "./riffler-button.component.html",
  styleUrls: ["./riffler-button.component.css"],
})
export class RifflerButtonComponent implements OnInit {
  @Input() label: string;
  @Input() isDisabled: boolean;
  @Output() clickEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onClickEvent(event) {
    this.clickEvent.emit(event);
  }
}

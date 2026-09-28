import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-button',
  styleUrl: './button.css',
  templateUrl: './button.html',
})
export class Button {

  @Input() textButton! : String;
  @Output() buttonClick = new EventEmitter<boolean>();

  onClickButton(){
    this.buttonClick.emit(true);
  }
}

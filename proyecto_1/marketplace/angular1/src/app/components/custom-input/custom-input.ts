import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-custom-input',
  styleUrl: './custom-input.css',
  templateUrl: './custom-input.html',
})
export class CustomInput {
  @Input() inputLabel: String = "";
  @Input() inputType: String = "text";
  @Input() inputClass: String="";

  @Input() value: String | number = "";
  @Output() valueChange = new EventEmitter<String | number>();

  onHandleChange(nuevoValor: String | number) {
    this.value = nuevoValor;
    this.valueChange.emit(nuevoValor);   
  }
}
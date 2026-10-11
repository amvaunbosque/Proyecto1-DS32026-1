import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({ //declaración de elementos
  imports: [FormsModule],
  selector: 'app-custom-input',
  styleUrl: './custom-input.css',
  templateUrl: './custom-input.html',
})

export class CustomInput {
  @Input() inputLabel: String = ""; //etiqueta label encima que se muestra encima del input
  @Input() inputType: String = "text"; //tipo de input htlml ya sea text, emial o wtv
  @Input() inputClass: String=""; 

  @Input() value: String | number = "";//valor actual del pinut
  @Output() valueChange = new EventEmitter<String | number>();//evento que se emite cada que el valor cambia

  onHandleChange(nuevoValor: String | number) {//actualiza la propiedad inerna de value, emite el evento valueChange con el nuevo valor para que el padre reciba y actialice su avrubale
    this.value = nuevoValor;
    this.valueChange.emit(nuevoValor);   
  }
}
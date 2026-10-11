import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({ //declaración de elementos
  imports: [],
  selector: 'app-button',
  styleUrl: './button.css',
  templateUrl: './button.html',
})
export class Button {

  @Input() textButton! : String; //reibe el texto del botón desde el padre
  @Output() buttonClick = new EventEmitter<boolean>(); //evento que emite el padre
  @Input() variant: String = 'primary'; //recibe la variante visual del  btn

  onClickButton(){
    console.log('click en el botón');//sirve para depuraar o verificar que el clic realmente se está ejecutando*/
    this.buttonClick.emit(true);//dispara el evento y envia el valor trur como dato adjunto, para que el componente padre lo reciba */
  }
}

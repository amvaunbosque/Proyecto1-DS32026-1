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
  @Input() variant: String = 'primary';

  onClickButton(){
    console.log('click en el botón');/* sirve para depuraar o verificar que el clic realmente se está ejecutando*/
    this.buttonClick.emit(true);/*dispara el evento y envia el valor trur como dato adjunto, para que el componente padre lo reciba */
  }
}

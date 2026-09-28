import { Component, Input } from '@angular/core';
import { Button } from '../button/button';
import { CustomInput } from '../custom-input/custom-input';

@Component({
  imports: [Button, CustomInput],
  selector: 'app-home-page',
  styleUrl: './home-page.css',
  templateUrl: './home-page.html',
})
export class HomePage {
  title: String ="Bienvenido.";

  @Input() subtitle: String = "";

  mensaje: String ="";

  onButtonClick(){
    this.mensaje= "click";
  }

  destino: String | number ="";
}

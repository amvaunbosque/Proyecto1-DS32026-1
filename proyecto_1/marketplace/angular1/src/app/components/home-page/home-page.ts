import { Component, Input } from '@angular/core';
import { Button } from '../button/button';

@Component({
  imports: [Button],
  selector: 'app-home-page.',
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
}

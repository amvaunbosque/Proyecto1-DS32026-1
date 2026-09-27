import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-home-page.',
  styleUrl: './home-page.css',
  templateUrl: './home-page.html',
})
export class HomePage {
  title: String ="Bienvenido.";

  @Input() subtitle: String = "";
}

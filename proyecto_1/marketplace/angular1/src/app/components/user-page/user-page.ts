import { Component } from '@angular/core';
import { Button } from '../button/button';

@Component({
  imports: [Button],
  selector: 'app-user-page',
  styleUrl: './user-page.css',
  templateUrl: './user-page.html',
})
export class UserPage {

  // bloque "reservas" (los 2 recuadros)
  reservaOpciones: String[] = ['Opción 1', 'Opción 2'];
  reservaSeleccionada: number = 0;

  seleccionarReserva(index: number) {
    this.reservaSeleccionada = index;
  }

  // bloque "preferencias" (los círculos)
  preferenciasColores: String[] = ['#88A878', '#C9D4DA', '#C9D4DA', '#C9D4DA'];
  preferenciaSeleccionada: number = 0;

  seleccionarPreferencia(index: number) {
    this.preferenciaSeleccionada = index;
  }

  // laas 2 tarjetas (método de pago u otra selección)
  metodoPago: { seleccionado: boolean }[] = [
    { seleccionado: true },
    { seleccionado: false },
  ];

  seleccionarMetodo(index: number) {
    this.metodoPago.forEach((m, i) => m.seleccionado = (i === index));
  }

  onPagar() {
    console.log('pagar');
    this.mostrarConfiguration = true;
  }
  mostrarConfiguration: boolean = false;
}
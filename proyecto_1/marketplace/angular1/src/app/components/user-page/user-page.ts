import { Component, OnInit, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Button } from '../button/button';
import { HomePage } from '../home-page/home-page';
import { Router } from '@angular/router'; // CAMBIO: Se eliminó RouterLink de aquí, ya no se usa en el TS
import { ReservaService, Reserva } from '../../core/services/reserva.service';
// CAMBIO: Se eliminó import de CASAS

@Component({
  imports: [Button, HomePage, DecimalPipe], // CAMBIO: Se eliminó RouterLink de los imports
  selector: 'app-user-page',
  styleUrl: './user-page.css',
  templateUrl: './user-page.html',
})
export class UserPage implements OnInit {
  private reservaService = inject(ReservaService);
  private router = inject(Router);

  // Lista real de reservas traídas del servicio / localStorage
  misReservas: Reserva[] = [];

  // CAMBIO: Se eliminó mostrarBookings
  // mostrarBookings: boolean = false;
  mostrarConfiguration: boolean = false;

  // Bloque "reservas" superior (los 2 recuadros)
  reservaOpciones: string[] = ['Opción 1', 'Opción 2'];
  reservaSeleccionada: number = 0;

  // Bloque "preferencias" (los círculos)
  preferenciasColores: string[] = ['#88A878', '#C9D4DA', '#C9D4DA', '#C9D4DA'];
  preferenciaSeleccionada: number = 0;

  // Tarjetas con líneas naranjas
  tarjetaActiva: number = 0;

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.misReservas = this.reservaService.obtenerReservas();
  }

  // CAMBIO: Se eliminó el método obtenerCiudad()
  /*
  obtenerCiudad(reserva: Reserva): string {
    if (reserva.ciudad) return reserva.ciudad;
    const casa = CASAS.find(c => c.id === reserva.alojamientoId);
    return casa?.ciudad ?? 'Ciudad no especificada';
  }
  */

  // Obtiene el nombre del usuario de la última reserva o muestra uno por defecto
  get nombreUsuario(): string {
    return this.misReservas.length > 0 
      ? this.misReservas[this.misReservas.length - 1].nombreHuesped 
      : 'Usuario Invitado';
  }

  get correoUsuario(): string {
    return this.misReservas.length > 0 
      ? this.misReservas[this.misReservas.length - 1].correoHuesped 
      : 'usuario@correo.com';
  }

  seleccionarReserva(index: number): void {
    this.reservaSeleccionada = index;
  }

  seleccionarPreferencia(index: number): void {
    this.preferenciaSeleccionada = index;
  }

  seleccionarMetodo(index: number): void {
    this.tarjetaActiva = index;
  }

  onPagar(): void {
    this.mostrarConfiguration = true;
  }
}
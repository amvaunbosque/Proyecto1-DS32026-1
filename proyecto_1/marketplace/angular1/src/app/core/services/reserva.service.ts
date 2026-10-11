import { Injectable } from '@angular/core';

export interface Reserva { //información de la reserva
  idReserva: string;
  alojamientoId: number;
  nombreAlojamiento: string;
  nombreHuesped: string;
  correoHuesped: string;
  huespedes: number;
  noches: number;
  fechaEntrada: string;
  fechaSalida: string;
  valorTotal: number;
  estado: 'PENDIENTE' | 'CONFIRMADA';
  ciudad?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private readonly STORAGE_KEY = 'mis_reservas';
  
  // almacenamiento en memoria
  private reservasEnMemoria: Reserva[] = [];

  constructor() {
    this.cargarDesdeLocalStorage();
  }

  // guarda la reserva tanto en memoria como en localStorage
  guardarReserva(nuevaReserva: Reserva): void {
    this.reservasEnMemoria.push(nuevaReserva);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.reservasEnMemoria));
  }

  // obtiene todas las reservas guardadas
  obtenerReservas(): Reserva[] {
    return this.reservasEnMemoria;
  }

  // recupera los datos de localStorage al iniciar la app
  private cargarDesdeLocalStorage(): void {
    const datosGuardados = localStorage.getItem(this.STORAGE_KEY);
    if (datosGuardados) {
      this.reservasEnMemoria = JSON.parse(datosGuardados);
    }
  }
}
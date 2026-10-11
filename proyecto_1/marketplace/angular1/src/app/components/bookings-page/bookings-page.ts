import { Component, OnInit, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ReservaService, Reserva } from '../../core/services/reserva.service';
import { CASAS } from '../../core/data/data/casas';
import { APARTAMENTOS } from '../../core/data/data/apartamentos';
import { ANIMALES } from '../../core/data/data/animales';

@Component({
  selector: 'app-bookings-page',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './bookings-page.html',
  styleUrl: './bookings-page.css',
})
export class BookingsPage implements OnInit {
  private reservaService = inject(ReservaService);
  private router = inject(Router);

  misReservas: Reserva[] = [];
  mostrarBookings: boolean = true; // <--- Inicia en true para que se muestre apenas entres

  ngOnInit(): void {
    this.misReservas = this.reservaService.obtenerReservas();
  }

  toggleBookings(): void {
    this.mostrarBookings = !this.mostrarBookings;
  }

  obtenerCiudad(reserva: Reserva): string {
    if (reserva.ciudad) return reserva.ciudad;
    const casa = CASAS.find(c => c.id === reserva.alojamientoId);
    const apt = APARTAMENTOS.find(c => c.id === reserva.alojamientoId);
    const anim = ANIMALES.find(c => c.id === reserva.alojamientoId);
    // Busca en los 3 arreglos:
    return casa?.ciudad ?? apt?.ciudad ?? anim?.ciudad ?? 'Ciudad no especificada';
  }

  volver(): void {
    this.router.navigate(['/user']);
  }
}
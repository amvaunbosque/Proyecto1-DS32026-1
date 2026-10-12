import { Component, OnInit, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ReservaService, Reserva } from '../../core/services/reserva.service';

@Component({
  selector: 'app-bookings-page',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './bookings-page.html',
  styleUrl: './bookings-page.css',
})
export class BookingsPage implements OnInit {
  private reservaService = inject(ReservaService);

  misReservas: Reserva[] = [];
  mostrarBookings = true;

  ngOnInit(): void {
    this.misReservas = this.reservaService.obtenerReservas();
  }

  toggleBookings(): void {
    this.mostrarBookings = !this.mostrarBookings;
  }
}
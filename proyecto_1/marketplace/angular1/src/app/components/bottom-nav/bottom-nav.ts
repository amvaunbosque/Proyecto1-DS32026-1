import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    imports: [RouterLink, RouterLinkActive],
    selector: 'app-bottom-nav',
    styleUrl: './bottom-nav.css',
    templateUrl: './bottom-nav.html',
})
export class BottomNav {
    items = [
    { ruta: '/home', icono: '🏠', texto: 'Home' },
    { ruta: '/filter', icono: '🔍', texto: 'Search' },
    { ruta: '/bookings', icono: '📅', texto: 'Bookings' },
    { ruta: '/user', icono: '👤', texto: 'Profile' },
    ];
}
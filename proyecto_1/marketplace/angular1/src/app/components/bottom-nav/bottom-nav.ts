import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    imports: [RouterLink, RouterLinkActive],
    selector: 'app-bottom-nav',
    styleUrl: './bottom-nav.css',
    templateUrl: './bottom-nav.html',
})

//array de items, lista de navegación inferor
export class BottomNav {
    items = [
    { ruta: '/home', icono: '🏠', texto: 'Home' }, //ruta: es el url a la que navega (qué es el /filter)
    { ruta: '/filter', icono: '🔍', texto: 'Search' },
    { ruta: '/bookings', icono: '📅', texto: 'Bookings' },
    { ruta: '/user', icono: '👤', texto: 'Profile' },
    ];
}
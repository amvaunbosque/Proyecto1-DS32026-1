import { Component } from '@angular/core';
import { HousesAccommodationsPage } from '../houses-accommodations-page/houses-accommodations-page';

interface Destino {
  nombre: string;
  calificacion: string;
  ciudad: string;
  pais: string;
  precio: string;
  imagen: string;
}
@Component({
  imports: [HousesAccommodationsPage],
  selector: 'app-home-page',
  styleUrl: './home-page.css',
  templateUrl: './home-page.html',
})
export class HomePage {
mostrarPaginaPrincipal: boolean = false;

  destinos : Destino[] = [
    { nombre: 'USA', calificacion: '4.5', ciudad: 'New York, NY',     pais: 'Unitated States of America', precio: '360.000 COP', imagen: 'NY City.jpg' },
    { nombre: 'Miami Beach',   calificacion: '4.8', ciudad: 'Miami, USA', pais: 'Unitated States of America', precio: '420.000 COP', imagen: 'Miami.jpg' },
    { nombre: 'Dubai Marina',  calificacion: '4.7', ciudad: 'República de Dubai, Dubai',   pais: 'Republica de Emiratos Árabes',  precio: '510.000 COP', imagen: 'Dubai.jpg' },
    { nombre: 'Tailandia', calificacion: '4.5', ciudad: 'Krung Thep, Bangkok',     pais: 'Tailandia', precio: '360.000 COP', imagen: 'Bangkok.jpg' },
    { nombre: 'Caracas',   calificacion: '4.8', ciudad: 'Distrito Capital, Caracas', pais: 'Venezuela', precio: '420.000 COP', imagen: 'Caracas.jpg' },
    { nombre: 'Italia',  calificacion: '4.7', ciudad: 'Lacio, Roma',   pais: 'Italia',  precio: '510.000 COP', imagen: 'Roma.jpg' },
    { nombre: 'Brasil', calificacion: '4.5', ciudad: 'Rio de Janeiro, Rio de Janeiro',     pais: 'Brasil', precio: '360.000 COP', imagen: 'Rio de Janeiro.jpg' },
    { nombre: 'Singapur',   calificacion: '4.8', ciudad: 'Singapur, Singapur', pais: 'Singapur', precio: '420.000 COP', imagen: 'Singapur.jpg' },
    { nombre: 'Estambul',  calificacion: '4.7', ciudad: 'Estambul, Estrecho del Bósforo',   pais: 'Turquía',  precio: '510.000 COP', imagen: 'Istambul.jpg' },
    ];

  visibles: number = 3;

  get destinosVisibles(): Destino[] {
    return this.destinos.slice(0, this.visibles);
  }

  get hayMas(): boolean {
    return this.visibles < this.destinos.length;
  }

  verMas() {
    this.visibles += 3;   // muestra 3 más por clic
  }

  onCasas() {
    console.log('casas');
    this.mostrarPaginaPrincipal = true;
  }
}
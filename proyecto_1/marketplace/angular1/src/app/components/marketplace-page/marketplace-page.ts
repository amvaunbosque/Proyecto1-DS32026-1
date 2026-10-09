import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // 👈 RouterModule
import { Alojamiento } from '../../core/model/model';

@Component({
  selector: 'app-marketplace-page',
  standalone: true,
  imports: [RouterModule], 
  templateUrl: './marketplace-page.html',
  styleUrl: './marketplace-page.css',
})
export class HousesAccommodationsPage {
  private router = inject(Router);

  titulo = 'CASAS';
  categorias = ['Casas', 'Con piscina', 'Con patio', 'Con chimenea'];
  categoriaActiva = 'Casas';
  limiteVisibles = 2;

  alojamientos: Alojamiento[] = [
    { id: 1, nombre: 'Cabaña Bier', calificacion: '4.5', ciudad: 'Colonia Tovar, Caracas', pais: 'Venezuela', precio: '360.000 COP', imagen: 'Colonia Tovar.jpg', categorias: ['Casas', 'Con chimenea'] },
    { id: 2, nombre: 'Anapoimas house', calificacion: '4.8', ciudad: 'Anapoima, Bogotá', pais: 'Colombia', precio: '420.000 COP', imagen: 'Anapoima.jpg', categorias: ['Casas', 'Con parrilla'] },
    { id: 3, nombre: 'Exiliado en Tunja', calificacion: '4.7', ciudad: 'Tunja, Bogotá', pais: 'Colombia', precio: '510.000 COP', imagen: 'Tunja.jpg', categorias: ['Casas'] },
    { id: 4, nombre: 'Delawere', calificacion: '4.5', ciudad: 'North Point, Delawere', pais: 'USA', precio: '360.000 COP', imagen: 'Delawere.jpg', categorias: ['Casas', 'Con chimenea'] },
    { id: 5, nombre: 'Miami surf zone', calificacion: '4.8', ciudad: 'Palm Beach, Miami', pais: 'USA', precio: '420.000 COP', imagen: 'Miami surf.jpg', categorias: ['Casas', 'Con parrilla'] },
    { id: 6, nombre: 'Lisa', calificacion: '4.7', ciudad: 'Wat Tha Phra, Bangkok', pais: 'Tailandia', precio: '510.000 COP', imagen: 'Lisa.jpg', categorias: ['Casas', 'Con parrilla', 'Con piscina'] },
    { id: 7, nombre: 'Habibi', calificacion: '4.7', ciudad: 'Dubai, Dubai', pais: 'Emiratos Árabes Unidos', precio: '510.000 COP', imagen: 'Habibi.jpg', categorias: ['Casas', 'Con piscina'] },
    { id: 8, nombre: 'Urla', calificacion: '4.7', ciudad: 'Urla, Estambul', pais: 'Estambul', precio: '510.000 COP', imagen: 'Urla.jpg', categorias: ['Casas', 'Con chimenea'] },
    { id: 9, nombre: 'Chora', calificacion: '4.7', ciudad: 'Ipanema, Rio de Janeiro', pais: 'Brasil', precio: '510.000 COP', imagen: 'Chora.jpg', categorias: ['Casas', 'Con piscina'] },
    { id: 10, nombre: 'Maranello', calificacion: '4.7', ciudad: 'Garbatella, Roma', pais: 'Italia', precio: '510.000 COP', imagen: 'Maranello.jpg', categorias: ['Casas', 'Con piscina', 'Con parrilla', 'Con chimenea'] },
    { id: 11, nombre: 'Georgie House', calificacion: '4.5', ciudad: 'Barquisimeto, Lara', pais: 'Venezuela', precio: '360.000 COP', imagen: 'Barquisimeto.jpg', categorias: ['Casas', 'Con patio', 'Con parrilla', 'Con chimenea'] },
    { id: 12, nombre: 'Miami Beach', calificacion: '4.8', ciudad: 'Lima, Lima', pais: 'Peru', precio: '420.000 COP', imagen: 'Lima.jpg', categorias: ['Casas', 'Con patio', 'Con parrilla', 'Con chimenea'] },
];

  get filtrados(): Alojamiento[] {
    return this.categoriaActiva === 'Casas'
      ? this.alojamientos
      : this.alojamientos.filter(a => a.categorias.includes(this.categoriaActiva));
  }

  get visibles(): Alojamiento[] {
    return this.filtrados.slice(0, this.limiteVisibles);
  }

  seleccionar(categoria: string): void {
    this.categoriaActiva = categoria;
    this.limiteVisibles = 2;
  }

  verMas(): void {
    this.limiteVisibles += 3;
  }

  volver(): void {
    this.router.navigate(['/home']);
  }
}
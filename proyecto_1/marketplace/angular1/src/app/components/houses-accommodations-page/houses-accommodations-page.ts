import { Component, EventEmitter, Output } from '@angular/core';

interface Destino{
  nombre: string;
  calificacion: string;
  ciudad: string;
  pais:string;
  precio: string;
  imagen: string;
  categorias: string[];
}

@Component({
  selector: 'app-houses-accommodations-page',
  styleUrl: './houses-accommodations-page.css',
  templateUrl: './houses-accommodations-page.html',
})

export class HousesAccommodationsPage {
@Output() volver = new EventEmitter<void>();

mostrarOnHouses: boolean = false;

categoriaActiva: string = 'casas';
categorias: string[] = [
  'Casas',
  'Con piscina',
  'Con patio',
  'Con chimenea',
  'Con parrilla'
];

destinos : Destino[] = [
    { nombre: 'Cabaña Bier', calificacion: '4.5', ciudad: 'Colonia Tovar, Caracas',     pais: 'Venezuela', precio: '360.000 COP', imagen: 'Colonia Tovar.jpg' , categorias: ['Casas', 'Con chimenea']},
    { nombre: 'Anapoimas house',   calificacion: '4.8', ciudad: 'Anapoima, Bogotá', pais: 'Colombia', precio: '420.000 COP', imagen: 'Anapoima.jpg', categorias: ['Casas', 'Con parrilla']},
    { nombre: 'Exiliado en Tunja',  calificacion: '4.7', ciudad: 'Tunja, Bogotá',   pais: 'Colombia',  precio: '510.000 COP', imagen: 'Tunja.jpg', categorias: ['Casas']},
    { nombre: 'Delawere', calificacion: '4.5', ciudad: 'North Point, Delawere',     pais: 'USA', precio: '360.000 COP', imagen: 'Delawere.jpg', categorias: ['Casas', 'Con chimenea']},
    { nombre: 'Miami surf zone',   calificacion: '4.8', ciudad: 'Palm Beach, Miami', pais: 'USA', precio: '420.000 COP', imagen: 'Miami surf.jpg', categorias: ['Casas', 'Con parrilla']},
    { nombre: 'Lisa',  calificacion: '4.7', ciudad: 'Wat Tha Phra, Bangkok',   pais: 'Tailandia',  precio: '510.000 COP', imagen: 'Lisa.jpg', categorias: ['Casas', 'Con parrilla','Con piscina' ] },
    { nombre: 'Habibi',  calificacion: '4.7', ciudad: 'Dubai, Dubai',   pais: 'Emiratos Árabes Unidos',  precio: '510.000 COP', imagen: 'Habibi.jpg', categorias: ['Casas', 'Con piscina'] },
    { nombre: 'Urla',  calificacion: '4.7', ciudad: 'Urla, Estambul',   pais: 'Estambul',  precio: '510.000 COP', imagen: 'Urla.jpg', categorias: ['Casas', 'Con chimenea'] },
    { nombre: 'Chora',  calificacion: '4.7', ciudad: 'Ipanema, Rio de Janeiro',   pais: 'Brasil',  precio: '510.000 COP', imagen: 'Chora.jpg' , categorias: ['Casas', 'Con piscina'],},
    { nombre: 'Maranello',  calificacion: '4.7', ciudad: 'Garbatella, Roma',   pais: 'Italia',  precio: '510.000 COP', imagen: 'Maranello.jpg', categorias: ['Casas', 'Con piscina', 'Con parrilla', 'Con chimenea'],},
    { nombre: 'Georgie House', calificacion: '4.5', ciudad: 'Barquisimeto, Lara',     pais: 'Venezuela', precio: '360.000 COP', imagen: 'Barquisimeto.jpg', categorias: ['Casas', 'Con patio', 'Con parrilla', 'Con chimenea'], },
    { nombre: 'Miami Beach',   calificacion: '4.8', ciudad: 'Lima, Lima', pais: 'Peru', precio: '420.000 COP', imagen: 'Lima.jpg',  categorias: ['Casas', 'Con patio', 'Con parrilla', 'Con chimenea'],},
    { nombre: 'Dubai Marina',  calificacion: '4.7', ciudad: 'Maracay, Aragua',   pais: 'Venezuela',  precio: '510.000 COP', imagen: 'Maracay.jpg',  categorias: ['Casas', 'Con piscina', 'Con patio'], }
    ];


get destinosFiltrados(): Destino[] {
    if (this.categoriaActiva === 'Casas') {
      return this.destinos;  // muestra todos
    }
    return this.destinos.filter(d =>
      d.categorias.includes(this.categoriaActiva)
    );
  }

  seleccionarCategoria(cat: string) {
    this.categoriaActiva = cat;
  }

onVolver(){
  this.volver.emit();
}

onHouses(){
  console.log('houses');
  this.mostrarOnHouses = true;
  }
}

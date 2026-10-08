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
  selector: 'app-apartments-accommodations-page',
  styleUrl: './apartments-accommodations-page.css',
  templateUrl: './apartments-accommodations-page.html',
})

export class ApartmentsAccommodationsPage {
@Output() volver = new EventEmitter<void>();

mostrarOnApartments: boolean = false;

categoriaActiva: string = 'casas';
categorias: string[] = [
  'Apartamentos',
  'Con terraza',
  'Con chimenea',
  'Con aire acondicionado'
];

destinos : Destino[] = [
    { nombre: 'Suite Arequipa', calificacion: '4.5', ciudad: 'Arequipa, Arequipa',     pais: 'Perú', precio: '360.000 COP', imagen: 'Arequipa.jpg' , categorias: ['Apartamentos', 'Con chimenea']},
    { nombre: 'Iquito house',   calificacion: '4.8', ciudad: 'Iquitos, Iquitos', pais: 'Perú', precio: '420.000 COP', imagen: 'Iquito.jpg', categorias: ['Apartamentos']},
    { nombre: 'Brocha',  calificacion: '4.7', ciudad: 'Milán, Milán',   pais: 'Italia',  precio: '510.000 COP', imagen: 'Milan.jpg', categorias: ['Apartamentos', 'Con terraza', 'Con aire acondicionado']},
    { nombre: 'Cicis corner', calificacion: '4.5', ciudad: 'Cecilia, Cecilia',     pais: 'Italia', precio: '360.000 COP', imagen: 'Cecilia.jpg', categorias: ['Apartamentos', 'Con terraza', 'Con aire acondicionado']},
    { nombre: 'El cigarral',   calificacion: '4.8', ciudad: 'El hatillo, Caracas', pais: 'Venezuela', precio: '420.000 COP', imagen: 'El Hatillo.jpg', categorias: ['Apartamentos', 'Con terraza', 'Con aire acondicionado']},
    { nombre: 'Cocotero',  calificacion: '4.7', ciudad: 'Tucacas, Falcón',   pais: 'Tailandia',  precio: '510.000 COP', imagen: 'Tucacas.jpg', categorias: ['Apartamentos','Con terraza' ] },
    { nombre: 'Bahía azul',  calificacion: '4.7', ciudad: 'Cartagena, Cartagena',   pais: 'Colombia',  precio: '510.000 COP', imagen: 'Cartagena.jpg', categorias: ['Apartamentos', 'Con aire acondicionado'] },
    { nombre: 'Terrace mountain',  calificacion: '4.7', ciudad: 'Chapinero, Bogotá',   pais: 'Colombia',  precio: '510.000 COP', imagen: 'Chapinero.jpg', categorias: ['Apartamentos', 'Con chimenea'] },
    { nombre: 'The girl from Ipanema',  calificacion: '4.7', ciudad: 'Ipanema, Rio de Janeiro',   pais: 'Brasil',  precio: '510.000 COP', imagen: 'Ipanema.jpg' , categorias: ['Apartamentos', 'Con aire acondicionado'],},
    { nombre: 'Corazao',  calificacion: '4.7', ciudad: 'Rio Banco, Acre',   pais: 'Brasil',  precio: '510.000 COP', imagen: 'Corazao.jpg', categorias: ['Apartamentos'],},
    { nombre: 'Hash', calificacion: '4.5', ciudad: 'Antioquía, Hatay',     pais: 'Turquía', precio: '360.000 COP', imagen: 'Hash.jpg', categorias: ['Apartamentos', 'Con aire acondicionado'], },
    { nombre: 'Izmit',   calificacion: '4.8', ciudad: 'Kocaeli, Izmit', pais: 'Turquía', precio: '420.000 COP', imagen: 'Izmit.jpg',  categorias: ['Apartamentos','Con chimenea'],},
    ];


get destinosFiltrados(): Destino[] {
    if (this.categoriaActiva === 'Apartamentos') {
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

onApartments(){
  console.log('apartments');
  this.mostrarOnApartments = true;
  }
}

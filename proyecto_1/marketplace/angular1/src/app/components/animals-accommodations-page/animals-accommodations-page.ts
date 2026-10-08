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
  selector: 'app-animals-accommodations-page',
  styleUrl: './animals-accommodations-page.css',
  templateUrl: './animals-accommodations-page.html',
})

export class AnimalsAccommodationsPage {
@Output() volver = new EventEmitter<void>();

mostrarOnAnimals: boolean = false;

categoriaActiva: string = 'animals';
categorias: string[] = [
  'Guarderia',
  'Con entrenamiento',
  'Con patio'
];

destinos : Destino[] = [
    { nombre: 'Paw Days', calificacion: '4.5', ciudad: 'Arequipa, Arequipa',     pais: 'Perú', precio: '360.000 COP', imagen: 'Paw Days.jpg' , categorias: ['Guarderia']},
    { nombre: 'Puppies Halls',   calificacion: '4.8', ciudad: 'Iquitos, Iquitos', pais: 'Perú', precio: '420.000 COP', imagen: 'Puppies Hall.jpg', categorias: ['Guarderia', 'Con patio', 'Con entrenamiento']},
    { nombre: 'Pums and Jumps',  calificacion: '4.7', ciudad: 'Milán, Milán',   pais: 'Italia',  precio: '510.000 COP', imagen: 'Pums and Jumps.jpg', categorias: ['Guarderia', 'Con entrenamiento']},
    { nombre: 'Fuzzy', calificacion: '4.5', ciudad: 'Cecilia, Cecilia',     pais: 'Italia', precio: '360.000 COP', imagen: 'Fuzzy.jpg', categorias: ['Guarderia']},
  ];


get destinosFiltrados(): Destino[] {
    if (this.categoriaActiva === 'Animals') {
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

onAnimals(){
  console.log('animals');
  this.mostrarOnAnimals = true;
  }
}

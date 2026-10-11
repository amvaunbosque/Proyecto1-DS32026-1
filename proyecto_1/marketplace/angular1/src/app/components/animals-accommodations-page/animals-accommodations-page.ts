import { ANIMALES } from './../../core/data/data/animales';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Alojamiento } from '../../core/model/model';

@Component({
  standalone: true,
  selector: 'app-animals-accommodations-page',
  imports: [RouterLink],
  styleUrl: './animals-accommodations-page.css',
  templateUrl: './animals-accommodations-page.html',
})

export class AnimalsAccommodationsPage {
  private router = inject(Router);

   //propiedades de titulo y filtros
  titulo = 'ANIMALES';

  //bloque de categorias que tiene los hospejades para oerros
  categorias = ['Guarderia', 'Con entrenamiento', 'Con patio'];
  categoriaActiva = 'Animales';

  //solo se ven 2 a la vez
  limiteVisibles = 2;

  alojamientos: Alojamiento[] = ANIMALES;//lista completa de alojamientos de tipo casas

  get filtrados(): Alojamiento[] {//devuelve los alojamientos filtrados según la categoría activa
    return this.categoriaActiva === 'Animales'
      ? this.alojamientos
      : this.alojamientos.filter(a => a.categorias.includes(this.categoriaActiva));
  }

  get visibles(): Alojamiento[] {
    return this.filtrados.slice(0, this.limiteVisibles);//recorta el array desde 0 hasta n
  }

  seleccionar(categoria: string): void { //se ejecuta al hacer clic en una categoría
    this.categoriaActiva = categoria; //actualiza la categoría activa
    this.limiteVisibles = 2; // resetea el límite a 2
  }

  verMas(): void {
    this.limiteVisibles += 3;//aumenta el numero visible a 3
  }

  volver(): void {
    this.router.navigate(['/home']);//regresa con el url y ek filtreado
  }
}
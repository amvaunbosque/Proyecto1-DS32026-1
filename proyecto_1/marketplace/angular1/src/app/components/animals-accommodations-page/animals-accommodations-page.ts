import { ANIMALES } from './../../core/data/data/animales';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Alojamiento } from '../../core/model/model';

function normalizar(texto: string): string {
  return (texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

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
  categoriaActiva: string ='Todos';

  //solo se ven 2 a la vez
  limiteVisibles = 2;

  get filtrados(): Alojamiento[] {
    const lista = ANIMALES.filter((a: any) => a.activo !== false);
    if (!this.categoriaActiva || this.categoriaActiva === 'Todos') {
      return lista;
    }
    const catNorm = normalizar(this.categoriaActiva);
    return lista.filter(a =>
      a.categorias?.some(c => normalizar(c) === catNorm)
    );
  }

get visibles(): Alojamiento[] {
  return this.filtrados.slice(0, this.limiteVisibles);
}

  seleccionar(categoria: string): void { //se ejecuta al hacer clic en una categoría
    this.categoriaActiva = this.categoriaActiva === categoria ? 'Todos' : categoria; //actualiza la categoría activa
    this.limiteVisibles = 2; // resetea el límite a 2
  }

  verMas(): void {
    this.limiteVisibles += 3;//aumenta el numero visible a 3
  }

  volver(): void {
    this.router.navigate(['/home']);//regresa con el url y ek filtreado
  }
}
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Alojamiento } from '../../core/model/model';
import { CASAS } from '../../core/data/data/casas';

@Component({
  selector: 'app-houses-accommodations-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './houses-accommodations-page.html',
  styleUrl: './houses-accommodations-page.css',
})
export class HousesAccommodationsPage {
  private router = inject(Router);

  //propiedades de titulo y filtros
  titulo = 'CASAS';
  categorias = ['Casas', 'Con piscina', 'Con patio', 'Con chimenea'];
  categoriaActiva = 'Casas';

  //solo se ven 2 a la vez
  limiteVisibles = 2;

  alojamientos: Alojamiento[] = CASAS; //lista completa de alojamientos de tipo casas

  get filtrados(): Alojamiento[] { //devuelve los alojamientos filtrados según la categoría activa
    return this.categoriaActiva === 'Casas'
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
    this.limiteVisibles += 3; //aumenta el numero visible a 3
  }

  volver(): void { //regresa con el url y ek filtreado
    this.router.navigate(['/home']);
  }
}
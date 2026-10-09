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

  titulo = 'CASAS';
  categorias = ['Casas', 'Con piscina', 'Con patio', 'Con chimenea'];
  categoriaActiva = 'Casas';
  limiteVisibles = 2;

  alojamientos: Alojamiento[] = CASAS;

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
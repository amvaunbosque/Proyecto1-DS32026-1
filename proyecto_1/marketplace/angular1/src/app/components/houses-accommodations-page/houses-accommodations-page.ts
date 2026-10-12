import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Alojamiento } from '../../core/model/model';
import { CASAS } from '../../core/data/data/casas';
import { validarReserva, precioNumerico, esActivo, capacidadDe } from '../../core/utils/reglas-reserva';

@Component({
  selector: 'app-houses-accommodations-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './houses-accommodations-page.html',
  styleUrl: './houses-accommodations-page.css',
})
export class HousesAccommodationsPage {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  //propiedades de titulo y filtros
  titulo = 'CASAS';
  categorias = ['Casas', 'Con piscina', 'Con patio', 'Con chimenea'];
  categoriaActiva = 'Casas';

  //solo se ven 2 a la vez
  limiteVisibles = 2;

  ciudadFiltro: string |null = null;
  alojamientos: Alojamiento[] = CASAS; //lista completa de alojamientos de tipo casas

  constructor() {
    // escucha los cambios en queryParams (por si el usuario navega entre ciudades sin salir de la página)
    this.route.queryParams.subscribe(params => {
      this.ciudadFiltro = params['ciudad'] ?? null;
      this.limiteVisibles = 2; // resetea el límite al cambiar de filtro
    });
  }

  get filtrados(): Alojamiento[] { //devuelve los alojamientos filtrados según la categoría activa
    let lista = this.alojamientos.filter(esActivo);

    //filtro por ciudad (si viene en la URL)
    if (this.ciudadFiltro) {
      lista = lista.filter(a =>
        a.ciudad?.toLowerCase() === this.ciudadFiltro!.toLowerCase()
      );
    }

    //filtro por categoría
    if (this.categoriaActiva !== 'Casas') {
      lista = lista.filter(a => a.categorias.includes(this.categoriaActiva));
    }

    return lista;
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
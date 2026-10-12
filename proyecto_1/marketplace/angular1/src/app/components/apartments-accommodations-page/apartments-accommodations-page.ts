import { APARTAMENTOS } from './../../core/data/data/apartamentos';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Alojamiento } from '../../core/model/model';
import { esActivo } from '../../core/utils/reglas-reserva';
@Component({
  selector: 'app-apartments-accommodations-page',
  standalone: true,
  imports: [RouterLink],
  styleUrl: './apartments-accommodations-page.css',
  templateUrl: './apartments-accommodations-page.html',
})

export class ApartmentsAccommodationsPage {
  private router = inject(Router);

  //propiedades de titulo y filtros
    titulo = 'APARTAMENTOS';

    //bloque de categorias que tiene los hospejades para oerros
    categorias = [  'Apartamentos','Con terraza','Con chimenea','Con aire acondicionado'];
    categoriaActiva = 'Apartamentos';
  
    //solo se ven 2 a la vez
    limiteVisibles = 2;
  
    alojamientos: Alojamiento[] = APARTAMENTOS; //lista completa de alojamientos de tipo casas

  get filtrados(): Alojamiento[] { //devuelve los alojamientos filtrados según la categoría activa
  const activos = this.alojamientos.filter(esActivo);
  return this.categoriaActiva === 'Apartamentos'
    ? activos
    : activos.filter(a => a.categorias.includes(this.categoriaActiva));
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
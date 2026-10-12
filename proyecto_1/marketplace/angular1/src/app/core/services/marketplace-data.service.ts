import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { Alojamiento, AlojamientoJson, MarketplaceData, Resena } from '../model/model';

export type TipoAlojamiento = 'casa' | 'apartamento' | 'animal';

@Injectable({ providedIn: 'root' })
export class MarketplaceDataService {
  private http = inject(HttpClient);
  private readonly URL = 'assets/data/marketplace-data.json';

  // una sola petición; el resultado se comparte entre todos los suscriptores
  private datos$: Observable<MarketplaceData> = this.http
    .get<MarketplaceData>(this.URL)
    .pipe(shareReplay(1));

  getAlojamientos(): Observable<Alojamiento[]> {
    return this.datos$.pipe(map(d => d.alojamientos.map(a => this.adaptar(a))));
  }

  getAlojamientosPorTipo(tipo: TipoAlojamiento): Observable<Alojamiento[]> {
    return this.getAlojamientos().pipe(map(lista => lista.filter(a => a.tipo === tipo)));
  }

  getAlojamientoPorId(tipo: TipoAlojamiento, id: number): Observable<Alojamiento | undefined> {
    return this.getAlojamientosPorTipo(tipo).pipe(map(lista => lista.find(a => a.id === id)));
  }

  getResenas(alojamientoId: number): Observable<Resena[]> {
    return this.datos$.pipe(map(d => d.resenas.filter(r => r.alojamientoId === alojamientoId)));
  }

  // convierte el registro del JSON al modelo que usa la interfaz
  private adaptar(a: AlojamientoJson): Alojamiento {
    const tipo = this.normalizarTipo(a.tipo);
    const categorias = a.categorias ?? this.categoriasPorDefecto(a, tipo);
    return {
      id: a.id,
      nombre: a.nombre,
      calificacion: String(a.calificacion),
      ciudad: a.ciudad,
      pais: a.pais ?? 'Colombia',
      tipo,
      precio: a.precioNoche.toLocaleString('es-CO') + ' COP',
      imagen: a.imagen ?? a.imagenPrincipal,
      imagenes: a.imagenes?.length ? a.imagenes : [a.imagenPrincipal],
      categorias,
      descripcion: a.descripcion,
      habitaciones: a.habitaciones,
      banos: a.banos,
      area: a.area,
      capacidad: a.capacidad,
      activo: a.activo,
      tarifaLimpieza: a.tarifaLimpieza,
      servicios: a.servicios,
      reglas: a.reglas,
    };
  }

  private normalizarTipo(tipo: string): TipoAlojamiento {
    const t = tipo.toLowerCase();
    if (t.startsWith('apart')) return 'apartamento';
    if (t.startsWith('animal')) return 'animal';
    return 'casa'; // Casa, Cabaña
  }

  private categoriasPorDefecto(a: AlojamientoJson, tipo: TipoAlojamiento): string[] {
    const base = tipo === 'apartamento' ? 'Apartamentos' : tipo === 'animal' ? 'Guarderia' : 'Casas';
    const s = a.servicios ?? [];
    const extra: string[] = [];
    if (s.includes('Piscina')) extra.push('Con piscina');
    if (s.includes('Chimenea')) extra.push('Con chimenea');
    if (s.includes('Aire acondicionado')) extra.push('Con aire acondicionado');
    return [base, ...extra];
  }
}

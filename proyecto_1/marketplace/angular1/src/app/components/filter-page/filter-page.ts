import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Alojamiento } from '../../core/model/model';
import { MarketplaceDataService } from '../../core/services/marketplace-data.service';
import { esActivo, capacidadDe, precioNumerico } from '../../core/utils/reglas-reserva';
import { HousesAccommodationsPage } from '../houses-accommodations-page/houses-accommodations-page';
import { ApartmentsAccommodationsPage } from '../apartments-accommodations-page/apartments-accommodations-page';
import { AnimalsAccommodationsPage } from '../animals-accommodations-page/animals-accommodations-page';
import { Button } from '../button/button';
import { CustomInput } from '../custom-input/custom-input';

// función auxiliar en caso de que no esté exportada en reglas-reserva
function normalizar(texto: string): string {
  return (texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

@Component({
  selector: 'app-filter-page',
  standalone: true,
  imports: [HousesAccommodationsPage, ApartmentsAccommodationsPage, AnimalsAccommodationsPage, Button, CustomInput, RouterLink],
  templateUrl: './filter-page.html',
  styleUrl: './filter-page.css',
})
export class FilterPage implements OnInit {
  title: string = "ALOJAMIENTOS";
  subtitle: string = "Encuentra el lugar perfecto para ti";

  // Banderas de control
  mostrarFilter: boolean = false;
  mostrarClean: boolean = false;

  tipoUrl: 'casas' | 'apartamentos' | 'animales' | 'rentar' | '' = '';
  tipo: 'casas' | 'apartamentos' | 'animales' | 'rentar' | '' = '';
  ciudadUrl: string | null = null;

  // Bloque de filtrado
  filtroActivo: boolean = false;
  nombreCompleto: string = "";
  correo: string = "";

  ciudad: string = "";
  nHuespedes: string = "";
  tipoAlojamiento: string = "";
  precioMaximo: string = "";

  private readonly tipoPorUrl: Record<string, string> = {
    casas: 'casa',
    apartamentos: 'apartamento',
    animales: 'animal',
  };

  private datos = inject(MarketplaceDataService);
  private todos = toSignal(this.datos.getAlojamientos(), { initialValue: [] as Alojamiento[] });

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tipoUrl = params['tipo'] || '';
      this.ciudadUrl = params['ciudad'] || null;
    });
  }

  get hayBusqueda(): boolean {
    return !!(this.ciudadUrl || this.tipoUrl || this.filtroActivo);
  }

  get filtrados(): Alojamiento[] {
    let lista = this.todos().filter((a: any) => a.activo !== false);

    if (this.tipoUrl && this.tipoPorUrl[this.tipoUrl]) {
      lista = lista.filter(a => a.tipo === this.tipoPorUrl[this.tipoUrl]);
    }

    if (this.ciudadUrl) {
      const q = normalizar(this.ciudadUrl);
      lista = lista.filter(a => {
    const c = normalizar(a.ciudad || '');
    const p = normalizar(a.pais || '');
    const coincidenciaDirecta = c.includes(q) || q.includes(c) || p.includes(q);
    const coincidenciaNY = (q.includes('ny') || q.includes('new york')) && 
                          (c.includes('ny') || c.includes('new york'));
    return coincidenciaDirecta || coincidenciaNY;});
    }

    if (this.filtroActivo && this.ciudad) {
      const q = normalizar(this.ciudad);
      lista = lista.filter(a => normalizar(a.ciudad).includes(q));
    }

    if (this.filtroActivo && this.nHuespedes) {
      const n = Number(this.nHuespedes);
      lista = lista.filter(a => capacidadDe(a) >= n);
    }

    if (this.filtroActivo && this.tipoAlojamiento) {
      const t = normalizar(this.tipoAlojamiento);
      lista = lista.filter(a => t.startsWith(normalizar(a.tipo || '')));
    }

    if (this.filtroActivo && this.precioMaximo) {
      const max = Number(this.precioMaximo);
      lista = lista.filter(a => precioNumerico(a.precio) <= max);
    }

    return lista;
  }

  rutaDetalle(a: Alojamiento): string[] {
    const base = a.tipo === 'apartamento' ? 'apartamentos' : a.tipo === 'animal' ? 'animales' : 'casas';
    return ['/detalle', base, String(a.id)];
  }

  onFilter(): void {
    if (!this.ciudad && !this.nHuespedes && !this.tipoAlojamiento && !this.precioMaximo) {
      console.warn('Ingresa al menos un criterio de búsqueda');
      return;
    }
    this.filtroActivo = true;
    this.mostrarFilter = true;
  }

  onClean(): void {
    this.nombreCompleto = "";
    this.correo = "";
    this.ciudad = "";
    this.nHuespedes = "";
    this.tipoAlojamiento = "";
    this.precioMaximo = "";
    this.filtroActivo = false;
    this.mostrarFilter = false;
  }
}
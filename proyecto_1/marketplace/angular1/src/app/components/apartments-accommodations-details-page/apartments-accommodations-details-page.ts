import { MarketplaceDataService } from '../../core/services/marketplace-data.service';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Alojamiento } from '../../core/model/model';
import { FormsModule } from '@angular/forms';
import { validarReserva, precioNumerico, esActivo, capacidadDe } from '../../core/utils/reglas-reserva';
import { ReservaService, Reserva } from '../../core/services/reserva.service';

interface CeldaDia {
  numero: number;
  fecha: Date | null;
  pasado: boolean;
}

interface Comentario {
  nombre: string;
  ubicacion: string;
  avatar: string;
  fecha: string;
  tipo: string;
  texto: string;
  expandido: boolean;
}

@Component({
  imports: [DecimalPipe, FormsModule],
  selector: 'app-apartments-accommodations-details-page',
  styleUrl: './apartments-accommodations-details-page.css',
  templateUrl: './apartments-accommodations-details-page.html',
  standalone: true,
})

export class ApartmentsAccommodationsDetailsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private reservaService = inject(ReservaService);
  private datos = inject(MarketplaceDataService);
  private cdr = inject(ChangeDetectorRef);

  alojamiento: Alojamiento | undefined;
  imagenPrincipal = '';

  estadoReserva: 'PENDIENTE' | 'CONFIRMADA' = 'PENDIENTE';
  mostrarModal = false;
  nombreHuesped = '';
  correoHuesped = '';
  codigoReserva = '';
  huespedes = 2;

  private readonly hoy = this.soloFecha(new Date());
  mesBase = new Date(this.hoy.getFullYear(), this.hoy.getMonth(), 1);
  fechaInicio: Date | null = null;
  fechaFin: Date | null = null;

  mesIzquierdo: CeldaDia[] = [];
  mesDerecho: CeldaDia[] = [];
  tituloIzquierdo = '';
  tituloDerecho = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.datos.getAlojamientoPorId('apartamento', id).subscribe(encontrado => {
      this.alojamiento = encontrado && esActivo(encontrado) ? encontrado : undefined;
      if (this.alojamiento) {
        this.imagenPrincipal = this.alojamiento.imagenes?.[0] ?? this.alojamiento.imagen;
        this.cargarResenas(this.alojamiento.id);
      }
      this.cdr.markForCheck();
    });
    
    this.construirCalendario();
  }

  // las reseñas del JSON reemplazan a las de ejemplo cuando el alojamiento tiene alguna
  private cargarResenas(id: number): void {
    this.datos.getResenas(id).subscribe(resenas => {
      if (!resenas.length) return;
      this.comentarios = resenas.map(r => ({
        nombre: r.usuario,
        ubicacion: '',
        avatar: 'https://i.pravatar.cc/150?u=' + encodeURIComponent(r.usuario),
        fecha: '',
        tipo: `Calificación ${r.calificacion}/5`,
        texto: r.comentario,
        expandido: false,
      }));
      this.cdr.markForCheck();
    });
  }

  seleccionarImagen(img: string): void {
    this.imagenPrincipal = img;
  }

  volver(): void {
    this.router.navigate(['/home']);
  }

  reservar(): void {
    if (!this.cotizacionValida) return;
    this.codigoReserva = 'RES-' + Math.floor(100000 + Math.random() * 900000);
    this.estadoReserva = 'PENDIENTE';
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  confirmarReserva(): void {
    if (!this.alojamiento || !this.cotizacionValida) return;
    this.estadoReserva = 'CONFIRMADA';
    const nuevaReserva: Reserva = {
      idReserva: this.codigoReserva,
      alojamientoId: this.alojamiento.id,
      nombreAlojamiento: this.alojamiento.nombre,
      nombreHuesped: this.nombreHuesped || 'Sin especificar',
      correoHuesped: this.correoHuesped || 'Sin especificar',
      huespedes: this.huespedes,
      noches: this.noches,
      fechaEntrada: this.fechaEntrada,
      fechaSalida: this.fechaSalida,
      valorTotal: this.valorTotal,
      estado: this.estadoReserva,
      ciudad: this.alojamiento.ciudad,
    };

    this.reservaService.guardarReserva(nuevaReserva);
    console.log('Reservas guardadas actualmente:', this.reservaService.obtenerReservas());
  }

    get subtotal(): number {
      return this.precioPorNoche * this.noches;
    }
  
    get tarifaLimpieza(): number {
      if (this.noches === 0) return 0;
      return (this.alojamiento as any)?.tarifaLimpieza ?? 60000;
    }
  
    get tarifaServicio(): number {
      return Math.round(this.subtotal * 0.10);
    }

get precioPorNoche(): number {
  return precioNumerico(this.alojamiento?.precio);
}

get capacidad(): number {
  return capacidadDe(this.alojamiento);
}

get errores(): string[] {
  return validarReserva({
    inicio: this.fechaInicio,
    fin: this.fechaFin,
    hoy: this.hoy,
    huespedes: this.huespedes,
    capacidad: this.capacidad,
    precioNoche: this.precioPorNoche,
  });
}


  // reglas 6 y 7: solo hay cotización válida si no hay ningún error
get cotizacionValida(): boolean {
  return this.errores.length === 0;
}

  get valorTotal(): number {
    if (this.noches === 0) return 0;
    return this.subtotal + this.tarifaLimpieza + this.tarifaServicio;
  }

  private soloFecha(f: Date): Date {
    return new Date(f.getFullYear(), f.getMonth(), f.getDate());
  }

  private construirMes(base: Date): CeldaDia[] {
    const celdas: CeldaDia[] = [];
    const anio = base.getFullYear();
    const mes = base.getMonth();
    const offset = (new Date(anio, mes, 1).getDay() + 6) % 7;
    const diasEnMes = new Date(anio, mes + 1, 0).getDate();

    for (let i = 0; i < offset; i++) {
      celdas.push({ numero: 0, fecha: null, pasado: false });
    }
    for (let d = 1; d <= diasEnMes; d++) {
      const fecha = new Date(anio, mes, d);
      celdas.push({ numero: d, fecha, pasado: fecha.getTime() < this.hoy.getTime() });
    }
    return celdas;
  }

  private nombreMes(f: Date): string {
    const t = f.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' });
    return t.charAt(0).toUpperCase() + t.slice(1);
  }

  private construirCalendario(): void {
    const siguiente = new Date(this.mesBase.getFullYear(), this.mesBase.getMonth() + 1, 1);
    this.mesIzquierdo = this.construirMes(this.mesBase);
    this.mesDerecho = this.construirMes(siguiente);
    this.tituloIzquierdo = this.nombreMes(this.mesBase);
    this.tituloDerecho = this.nombreMes(siguiente);
  }

  get puedeRetroceder(): boolean {
    const mesActual = new Date(this.hoy.getFullYear(), this.hoy.getMonth(), 1);
    return this.mesBase.getTime() > mesActual.getTime();
  }

  mesAnterior(): void {
    if (!this.puedeRetroceder) return;
    this.mesBase = new Date(this.mesBase.getFullYear(), this.mesBase.getMonth() - 1, 1);
    this.construirCalendario();
  }

  mesSiguiente(): void {
    this.mesBase = new Date(this.mesBase.getFullYear(), this.mesBase.getMonth() + 1, 1);
    this.construirCalendario();
  }

  seleccionarDia(celda: CeldaDia): void {
    if (!celda.fecha || celda.pasado) return;
    const f = celda.fecha;

    if (!this.fechaInicio || this.fechaFin) {
      this.fechaInicio = f;
      this.fechaFin = null;
    } else if (f.getTime() <= this.fechaInicio.getTime()) {
      this.fechaInicio = f;
    } else {
      this.fechaFin = f;
    }
  }

  borrarFechas(): void {
    this.fechaInicio = null;
    this.fechaFin = null;
  }

  esInicio(c: CeldaDia): boolean {
    return !!c.fecha && !!this.fechaInicio && c.fecha.getTime() === this.fechaInicio.getTime();
  }

  esFin(c: CeldaDia): boolean {
    return !!c.fecha && !!this.fechaFin && c.fecha.getTime() === this.fechaFin.getTime();
  }

  enRango(c: CeldaDia): boolean {
    return !!c.fecha && !!this.fechaInicio && !!this.fechaFin
      && c.fecha.getTime() > this.fechaInicio.getTime()
      && c.fecha.getTime() < this.fechaFin.getTime();
  }

  get noches(): number {
    if (!this.fechaInicio || !this.fechaFin) return 0;
    return Math.round((this.fechaFin.getTime() - this.fechaInicio.getTime()) / 86400000);
  }

  private formatear(f: Date | null): string {
    return f ? f.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
  }

  get fechaEntrada(): string { return this.formatear(this.fechaInicio); }
  get fechaSalida(): string { return this.formatear(this.fechaFin); }

  comentarios: Comentario[] = [
    { nombre: 'Ana Maria', ubicacion: 'Caracas, Venezuela', avatar: 'https://i.pravatar.cc/150?img=5', fecha: 'junio de 2026', tipo: 'Con mascota', texto: 'Nos pareció muy lindo, muy tranquilo, muy cómodo y agradable...', expandido: false },
    { nombre: 'Alberto', ubicacion: 'Maracay, Venezuela', avatar: 'https://i.pravatar.cc/150?img=11', fecha: 'agosto de 2024', tipo: 'Estadía de varias noches', texto: 'Muy agradable el espacio, todo correcto y como se ofreció en la publicación.', expandido: false },
  ];

  toggleComentario(c: Comentario): void {
    c.expandido = !c.expandido;
  }
}
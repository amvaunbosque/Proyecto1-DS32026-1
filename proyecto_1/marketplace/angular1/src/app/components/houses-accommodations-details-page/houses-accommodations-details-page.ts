import { CASAS } from './../../core/data/data/casas';
import { Component, OnInit, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Alojamiento } from '../../core/model/model';
import { FormsModule } from '@angular/forms';
import { validarReserva, precioNumerico, esActivo, capacidadDe } from '../../core/utils/reglas-reserva';
import { ReservaService, Reserva } from '../../core/services/reserva.service'; /*los servicios injectable y las interfaces no van adentro del import */
interface CeldaDia {
  numero: number;
  fecha: Date | null;   // null = espacio vacío al inicio del mes
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
  selector: 'app-houses-accommodations-details-page',
  standalone: true,
  imports: [DecimalPipe, FormsModule],/*en el import solo van componentes, directivas, pipe o modulos*/
  templateUrl: './houses-accommodations-details-page.html',
  styleUrl: './houses-accommodations-details-page.css',
})

export class HousesAccommodationsDetailsPage implements OnInit {
  // inyecciones en un solo lugar
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private reservaService = inject(ReservaService);

  alojamiento: Alojamiento | undefined; //declaración de prop akojamiento que por undefined puede no tener valor
  imagenPrincipal = ''; //siempre es string e inicaliza vacío para evitar problemas en el template (el que define la vista de un componente)

  //variables para el pop up de reserva (unificadas en mayúsculas para coincidir con ReservaService y el html)
  estadoReserva: 'PENDIENTE' | 'CONFIRMADA' = 'PENDIENTE';
  mostrarModal = false;
  nombreHuesped = '';
  correoHuesped = '';
  codigoReserva = '';
  huespedes = 2;

    // ===== calendario =====
  private readonly hoy = this.soloFecha(new Date());
  mesBase = new Date(this.hoy.getFullYear(), this.hoy.getMonth(), 1);
  fechaInicio: Date | null = null;
  fechaFin: Date | null = null;

  mesIzquierdo: CeldaDia[] = [];
  mesDerecho: CeldaDia[] = [];
  tituloIzquierdo = '';
  tituloDerecho = '';
  
  //metodo que se ejecuta automáticamente cuando el componente termina de incializarse
  ngOnInit(): void { //como es void solo ejecuta acciones

    //obtnener el id de la url
    const id = Number(this.
      route.snapshot.//snapshot toma una foto instantanea, si el id cambia al salir del componente, snap no se actualida
      paramMap.get('id')); //paraMap lee parámetro de ruta id, entonces devuleve string

    //buscar alojamiento
    const encontrado = CASAS.find(c => c.id === id);
    this.alojamiento = encontrado && esActivo(encontrado) ? encontrado: undefined;
          
      //calendario
      this.construirCalendario();

    //comprobar y asignar la imagen
    if (this.alojamiento) {
      this.imagenPrincipal = this.alojamiento.imagenes?. //?. es encadenamiento opcional, si img existe devuelve el indice, sino devuelve undefined
      [0] ?? this.alojamiento.imagen; //?? es nulish coalescing, permite asignar valor por defecto solo cuando una expresión es null o undefined
      }
  }

  seleccionarImagen(img: string): void {//función que cambia la imagen principal para pasarla como argumento
    this.imagenPrincipal = img;
  }

  volver(): void { //navega a otra página pasando un paárametro por la url
    this.router.navigate(['/home'], //mueve al usario entre rutas, el navigate ejecuta la navegación al recibir como primer argumento un array
      { queryParams: // son las opciones de navegación 
      { tipo: 'casas' } }); //es el tipo de opción a dónde regresa
  }

  reservar(): void {
    if (!this.cotizacionValida) return;
    this.codigoReserva = 'RES-' + Math.floor(100000 + Math.random() * 900000); //está dando un numero rando al id de reserva, entre los num del math
    this.estadoReserva = 'PENDIENTE'; 
    this.mostrarModal = true; //controla si el modal se ve o no
  }

  cerrarModal(): void {
    this.mostrarModal = false; //cierra el modal
  }

  // bloque confirmación de reserva
  confirmarReserva(): void { 
    if (!this.alojamiento || !this.cotizacionValida) return;//busca si existe o es undefined
    this.estadoReserva = 'CONFIRMADA'; //cambia el estado
    const nuevaReserva: Reserva = { //bloque con todas las cosas qye tiene la constante de reserva (cotización)
      idReserva: this.codigoReserva,
      alojamientoId: this.alojamiento.id,
      nombreAlojamiento: this.alojamiento.nombre,
      nombreHuesped: this.nombreHuesped || 'Sin especificar', //nombre o txt por defecto
      correoHuesped: this.correoHuesped || 'Sin especificar',//correo o txt por defecto
      huespedes: this.huespedes,
      noches: this.noches,
      fechaEntrada: this.fechaEntrada,
      fechaSalida: this.fechaSalida,
      valorTotal: this.valorTotal,
      estado: this.estadoReserva,
      ciudad:this.alojamiento.ciudad
    };

    // se guarda en el servicio (memoria + localStorage)
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
    const offset = (new Date(anio, mes, 1).getDay() + 6) % 7;   // la semana empieza en lunes
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

  // no deja retroceder antes del mes actual
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
      // primer clic, o ya había un rango completo: empieza uno nuevo
      this.fechaInicio = f;
      this.fechaFin = null;
    } else if (f.getTime() <= this.fechaInicio.getTime()) {
      // clic en un día igual o anterior a la entrada: lo toma como nueva entrada
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
    {nombre: 'Anna Maria',ubicacion: 'Caracas, Venezuela',avatar: 'https://i.pravatar.cc/150?img=5',fecha: 'junio de 2026',tipo: 'Con mascota',texto: 'Nos pareció muy lindo, muy tranquilo, muy cómodo y agradable. Don Orlando fue muy atento y siempre estuvo pendiente de nosotros. La habitación estaba limpia y la cama era muy cómoda. Volveremos pronto.',expandido: false,},
    {nombre: 'Alberto',ubicacion: 'Maracay, Venezuela',avatar: 'https://i.pravatar.cc/150?img=11',fecha: 'agosto de 2024',tipo: 'Estadía de varias noches',texto: 'Muy agradable el espacio, todo correcto y como se ofreció en la publicación.',expandido: false,},
  ];

  toggleComentario(c: Comentario): void {
    c.expandido = !c.expandido;
  }
}
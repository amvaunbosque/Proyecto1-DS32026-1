import { Alojamiento } from '../model/model';

export const CAPACIDAD_POR_DEFECTO = 4;

export function precioNumerico(precio: string | number | undefined): number {
  return Number(String(precio ?? '').replace(/[^0-9]/g, ''));
}

// activo salvo que diga false explícitamente
export function esActivo(a: Alojamiento): boolean {
  return a.activo !== false;
}

export function capacidadDe(a: Alojamiento | undefined): number {
  return a?.capacidad ?? CAPACIDAD_POR_DEFECTO;
}

export function validarReserva(p: {
  inicio: Date | null;
  fin: Date | null;
  hoy: Date;
  huespedes: number;
  capacidad: number;
  precioNoche: number;
}): string[] {
  const errores: string[] = [];

  if (!p.inicio || !p.fin) {
    errores.push('Selecciona la fecha de llegada y la de salida.');
  } else {
    if (p.inicio.getTime() < p.hoy.getTime()) {
      errores.push('La fecha de llegada no puede ser anterior a la fecha actual.');
    }
    if (p.fin.getTime() <= p.inicio.getTime()) {
      errores.push('La fecha de salida debe ser posterior a la fecha de llegada.');
    }
  }

  if (!Number.isInteger(p.huespedes) || p.huespedes <= 0) {
    errores.push('El número de huéspedes debe ser mayor que cero.');
  } else if (p.huespedes > p.capacidad) {
    errores.push(`El alojamiento admite máximo ${p.capacidad} huéspedes.`);
  }

  if (!(p.precioNoche > 0)) {
    errores.push('El precio por noche debe ser mayor que cero.');
  }

  return errores;
}
export interface Propiedad { //interface de lso datos de prropiedad
    id: number;
    nombre: string;
    ciudad: string;
    precio: string;
    disponible: boolean;
}

export interface Alojamiento { //información complementaria
    id: number;
    nombre: string;
    calificacion: string;
    ciudad: string;
    tipo?: 'casa'|'apartamento'|'animal';
    pais: string;
    precio: string;
    imagen: string;
    categorias: string[];
    descripcion?: string; //el ? siginifca que puede existir con un string o es opcional
    habitaciones?: number;
    banos?: number;
    area?: number;
    imagenes?: string[];
    capacidad?: number;
    activo?: boolean;
    tarifaLimpieza?: number;
    servicios?: string[];
    reglas?: string[];
}

// Estructura tal como viene en marketplace-data.json
export interface AlojamientoJson {
    id: number;
    nombre: string;
    descripcion: string;
    ciudad: string;
    ubicacion: string;
    tipo: string;
    capacidad?: number;
    habitaciones?: number;
    camas?: number;
    banos?: number;
    area?: number;
    precioNoche: number;
    tarifaLimpieza?: number;
    calificacion: number;
    activo: boolean;
    imagenPrincipal: string;
    imagenes: string[];
    servicios: string[];
    reglas: string[];
    // campos complementarios
    pais?: string;
    imagen?: string;
    categorias?: string[];
}

export interface Resena {
    id: number;
    alojamientoId: number;
    usuario: string;
    calificacion: number;
    comentario: string;
}

export interface MarketplaceData {
    alojamientos: AlojamientoJson[];
    resenas: Resena[];
}

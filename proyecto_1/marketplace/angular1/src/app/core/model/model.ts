export interface Propiedad {
    id: number;
    nombre: string;
    ciudad: string;
    precio: string;
    disponible: boolean;
}

export interface Alojamiento {
    id: number;
    nombre: string;
    calificacion: string;
    ciudad: string;
    pais: string;
    precio: string;
    imagen: string;
    categorias: string[];
    descripcion?: string;
    habitaciones?: number;
    banos?: number;
    area?: number;
    imagenes?: string[];
}
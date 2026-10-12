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
}
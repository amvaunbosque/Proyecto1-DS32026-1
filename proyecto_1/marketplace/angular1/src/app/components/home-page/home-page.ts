import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

//declaracio de objretos
interface Destino {
    ciudad: string;
    pais: string;
    imagen: string;
}

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home-page.html',
    styleUrl: './home-page.css',
})

export class HomePage {

//inyecta el servivio router para poder navegar
    constructor(private router: Router){}

    irAFiltro(tipo: string): void { //navega a la ruta /filter pasando el parámetro
        this.router.navigate(['/filter'], { queryParams: { tipo } });
}

//bloque de los airbnb disponibles
    destinos: Destino[] = [
        { ciudad: 'New York, NY',                   pais: 'United States of America',    imagen: 'NY City.jpg' },
        { ciudad: 'Miami, USA',                     pais: 'United States of America',    imagen: 'Miami.jpg' },
        { ciudad: 'República de Dubai, Dubai',      pais: 'República de Emiratos Árabes', imagen: 'Dubai.jpg' },
        { ciudad: 'Krung Thep, Bangkok',            pais: 'Tailandia',                    imagen: 'Bangkok.jpg' },
        { ciudad: 'Distrito Capital, Caracas',      pais: 'Venezuela',                    imagen: 'Caracas.jpg' },
        { ciudad: 'Lacio, Roma',                    pais: 'Italia',                       imagen: 'Roma.jpg' },
        { ciudad: 'Rio de Janeiro, Rio de Janeiro', pais: 'Brasil',                       imagen: 'Rio de Janeiro.jpg' },
        { ciudad: 'Singapur, Singapur',             pais: 'Singapur',                     imagen: 'Singapur.jpg' },
        { ciudad: 'Estambul, Estrecho del Bósforo', pais: 'Turquía',                      imagen: 'Istambul.jpg' },
    ];

    limiteVisibles = 3; //cantidad de destinos que se ven en el grid

    get destinosVisibles(): Destino[] {
        return this.destinos.slice(0, this.limiteVisibles);
    }

    verMas(): void { //devuleve solo los primeros "limitesVisibles" destnos
        this.limiteVisibles += 3;
        if (this.limiteVisibles > this.destinos.length) {
            this.limiteVisibles = this.destinos.length;
        }
    }
    
}


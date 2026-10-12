import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

interface Destino {
  ciudad: string;
  pais: string;
  imagen: string;
  clave: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  private router = inject(Router);

  destinos: Destino[] = [
    { ciudad: 'New York, NY', clave: 'New York', pais: 'United States of America', imagen: 'NY City.jpg' },
    { ciudad: 'Miami, USA', clave: 'Miami', pais: 'United States of America', imagen: 'Miami.jpg' },
    { ciudad: 'República de Dubai, Dubai', clave: 'Dubai', pais: 'República de Emiratos Árabes', imagen: 'Dubai.jpg' },
    { ciudad: 'Krung Thep, Bangkok', clave: 'Bangkok', pais: 'Tailandia', imagen: 'Bangkok.jpg' },
    { ciudad: 'Distrito Capital, Caracas', clave: 'Caracas', pais: 'Venezuela', imagen: 'Caracas.jpg' },
    { ciudad: 'Lacio, Roma', clave: 'Roma', pais: 'Italia', imagen: 'Roma.jpg' },
    { ciudad: 'Rio de Janeiro, Rio de Janeiro', clave: 'Rio de Janeiro', pais: 'Brasil', imagen: 'Rio de Janeiro.jpg' },
    { ciudad: 'Singapur, Singapur', clave: 'Singapur', pais: 'Singapur', imagen: 'Singapur.jpg' },
    { ciudad: 'Estambul, Estrecho del Bósforo', clave: 'Estambul', pais: 'Turquía', imagen: 'Istambul.jpg' },
  ];

  limiteVisibles = 3;

  get destinosVisibles(): Destino[] {
    return this.destinos.slice(0, this.limiteVisibles);
  }

  irAFiltro(tipo: string): void {
    this.router.navigate(tipo === 'rentar' ? ['/filter'] : [`/${tipo}`]);
  }

  verMas(): void {
    this.limiteVisibles += 3;
    if (this.limiteVisibles > this.destinos.length) {
      this.limiteVisibles = this.destinos.length;
    }
  }
}
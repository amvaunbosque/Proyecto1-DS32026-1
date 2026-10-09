import { CASAS } from './../../core/data/data/casas';
import { Component, OnInit, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Alojamiento } from '../../core/model/model';


@Component({
  selector: 'app-houses-accommodations-details-page',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './houses-accommodations-details-page.html',
  styleUrl: './houses-accommodations-details-page.css',
})
export class HousesAccommodationsDetailsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  alojamiento: Alojamiento | undefined;
  imagenPrincipal = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.alojamiento = CASAS.find(c => c.id === id);

    if (this.alojamiento) {
      this.imagenPrincipal = this.alojamiento.imagenes?.[0] ?? this.alojamiento.imagen;
    }
  }

  seleccionarImagen(img: string): void {
    this.imagenPrincipal = img;
  }

  volver(): void {
    this.router.navigate(['/filter'], { queryParams: { tipo: 'casas' } });
  }

  reservar(): void {
    console.log('Reserva solicitada:', this.alojamiento?.nombre);
  }
}
import { Component } from '@angular/core';
import { HousesAccommodationsPage } from '../houses-accommodations-page/houses-accommodations-page';
import { ApartmentsAccommodationsPage } from '../apartments-accommodations-page/apartments-accommodations-page';
import { CommonModule } from '@angular/common';

type Vista = 'marketplace' | 'casas' |'apartamentos';
interface Destino {
  ciudad: string;
  pais: string;
  imagen: string;
}
@Component({
  imports: [HousesAccommodationsPage, ApartmentsAccommodationsPage, CommonModule],
  standalone: true,
  selector: 'app-home-page',
  styleUrl: './home-page.css',
  templateUrl: './home-page.html',
})

export class HomePage {

  tipoVista: Vista = 'marketplace'; /*controla que vista se muetra en el switch del html*/ 

  irA(vista: Vista): void{ /*cambia la vista actual*/
    this.tipoVista = vista;
  }

  destinos : Destino[] = [/* datos de ejemplo para las cards del marketplace*/
    { ciudad: 'New York, NY',     pais: 'Unitated States of America', imagen: 'NY City.jpg' },
    { ciudad: 'Miami, USA', pais: 'Unitated States of America', imagen: 'Miami.jpg' },
    { ciudad: 'República de Dubai, Dubai',   pais: 'Republica de Emiratos Árabes',  imagen: 'Dubai.jpg' },
    { ciudad: 'Krung Thep, Bangkok',     pais: 'Tailandia', imagen: 'Bangkok.jpg' },
    { ciudad: 'Distrito Capital, Caracas', pais: 'Venezuela', imagen: 'Caracas.jpg' },
    { ciudad: 'Lacio, Roma',   pais: 'Italia',  imagen: 'Roma.jpg' },
    { ciudad: 'Rio de Janeiro, Rio de Janeiro',     pais: 'Brasil', imagen: 'Rio de Janeiro.jpg' },
    { ciudad: 'Singapur, Singapur', pais: 'Singapur', imagen: 'Singapur.jpg' },
    { ciudad: 'Estambul, Estrecho del Bósforo',   pais: 'Turquía',  imagen: 'Istambul.jpg' },
    ];

  limiteVisibles = 2;/*cuántas cards se muestran incialmente */

  get destinosVisibles(): Destino[] { /*subconjunto visible de destinos */
    return this.destinos.slice(0, this.limiteVisibles);
  }

  verMas() : void {
    this.limiteVisibles += 3;   // muestra 3 más por clic 
    if(this.limiteVisibles > this.destinos.length){
      this.limiteVisibles = this.destinos.length;
    }
  }

  onCasas() {
    this.irA('casas');
  }

  onApartments() {
    this.irA('apartamentos');
  }

  onMarketplace() {
    this.irA('marketplace');
  }
}
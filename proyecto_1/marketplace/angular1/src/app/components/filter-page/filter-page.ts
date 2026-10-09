import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousesAccommodationsPage } from '../houses-accommodations-page/houses-accommodations-page';
import { ApartmentsAccommodationsPage } from '../apartments-accommodations-page/apartments-accommodations-page';
import { AnimalsAccommodationsPage } from '../animals-accommodations-page/animals-accommodations-page';
import { RentalsAccommodationsPage } from '../rentals-accommodations-page/rentals-accommodations-page';
import { Button } from '../button/button';
import { CustomInput } from '../custom-input/custom-input';

@Component({
    selector: 'app-filter-page',
    standalone: true,
    imports: [HousesAccommodationsPage, ApartmentsAccommodationsPage, AnimalsAccommodationsPage, Button, CustomInput],
    templateUrl: './filter-page.html',
    styleUrl: './filter-page.css',
})
export class FilterPage implements OnInit {

  title: String = "ALOJAMIENTOS";
  subtitle: String = "Encuentra el lugar perfecto para ti";
  mostrarFilter: boolean = false;

  //======bloque de filtrado======
  // información de contacto
  nombreCompleto: string = "";
  correo: String = "";

  // datos de hospedaje
  ciudad: String = "";
  nHuespedes: String = "";
  tipoAlojamiento: String = "";
  precioMaximo: String = "";
  //=============================

  onFilter() {
    if (!this.nombreCompleto || this.correo){
      console.warn('Faltan datos obligatorios');
      return;
    }
    console.log('Datos enviados:', {
      nombreCompleto: this.nombreCompleto,
      correo: this.correo,
      ciudad: this.ciudad,
      nHuespedes: this.nHuespedes,
      tipoAlojamiento: this.tipoAlojamiento,
      precioMaximo: this.precioMaximo,
      });

    this.mostrarFilter = true;
  }

    tipo: 'casas' | 'apartamentos' | 'animales' | 'rentar' | '' = '';

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.tipo = params['tipo'] || '';
        });
    }

    onConfirmar() {
    this.mostrarFilter = true;
  }
}

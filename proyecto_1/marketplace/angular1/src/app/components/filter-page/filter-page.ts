import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousesAccommodationsPage } from '../houses-accommodations-page/houses-accommodations-page';
import { ApartmentsAccommodationsPage } from '../apartments-accommodations-page/apartments-accommodations-page';
import { AnimalsAccommodationsPage } from '../animals-accommodations-page/animals-accommodations-page';
import { Button } from '../button/button';
import { CustomInput } from '../custom-input/custom-input';

@Component({
    selector: 'app-filter-page',
    standalone: true,
    imports: [HousesAccommodationsPage, ApartmentsAccommodationsPage, AnimalsAccommodationsPage, Button, CustomInput],
    templateUrl: './filter-page.html',
    styleUrl: './filter-page.css',
})

//propiedades de titulo
export class FilterPage implements OnInit {
  title: String = "ALOJAMIENTOS";
  subtitle: String = "Encuentra el lugar perfecto para ti";

  //banderas de control
  mostrarFilter: boolean = false; //si se muestra el bloque de resultados
  mostrarClean: boolean = false;//si se muestra el btn de limpiar

  //bloque de filtrado=============
  // información de contacto
  nombreCompleto: String = "";
  correo: String = "";

  // datos de hospedaje
  ciudad: String = "";
  nHuespedes: String = "";
  tipoAlojamiento: String = "";
  precioMaximo: String = "";
  //=============================

  onFilter() {
    if (!this.nombreCompleto || !this.correo){
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

  //qué propiedades se van a filtrar
    tipo: 'casas' | 'apartamentos' | 'animales' | 'rentar' | '' = '';

  //inyecta el actividadRoute oara leer los queruPrarasm de la url
    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void { // hok que se ejecuta al iniciar el componente.
  // se suscribe a queryParams para leer "tipo" de la URL
  // y asignarlo a la propiedad tipo. Si no existe, queda ''.
  // uso: si el usuario llega a /filter?tipo=casas,
        this.route.queryParams.subscribe(params => {
            this.tipo = params['tipo'] || '';
        });
    }

    onClean() : void {
  this.nombreCompleto = "";
  this.correo = "";
  this.ciudad = "";
  this.nHuespedes = "";
  this.tipoAlojamiento = "";
  this.precioMaximo = "";
  }
}

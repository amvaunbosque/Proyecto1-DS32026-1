import { Component, Input } from '@angular/core';
import { Button } from '../button/button';
import { CustomInput } from '../custom-input/custom-input';
import { PropertyCard } from '../property-card/property-card';
import { Propiedad } from '../../core/model/model';
import { NgClass } from '../../../../node_modules/@angular/common/types/_common_module-chunk';

@Component({
  imports: [Button, CustomInput, PropertyCard],
  selector: 'app-home-page',
  styleUrl: './home-page.css',
  templateUrl: './home-page.html',
})
export class HomePage {
  title: String ="Bienvenido.";

  @Input() subtitle: String = "";

  mensaje: String ="";

  onButtonClick(){
    this.mensaje= "click";
  }

  destino: String | number ="";

  propiedades: Propiedad[]=[
    { id: 1, nombre: 'Apartamento en el centro', ciudad: 'Bogotá', precioNoche: 120000, disponible: true },
    { id: 2, nombre: 'Cabaña con vista', ciudad: 'Villa de Leyva', precioNoche: 200000, disponible: true },
    { id: 3, nombre: 'Casa frente al mar', ciudad: 'Cartagena', precioNoche: 350000, disponible: false },
  ];
}

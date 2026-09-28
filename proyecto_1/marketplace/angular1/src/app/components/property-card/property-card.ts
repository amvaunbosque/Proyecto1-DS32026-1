import { Propiedad } from './../../core/model/model';
import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-property-card',
  styleUrl: './property-card.css',
  templateUrl: './property-card.html',
})
export class PropertyCard {

  @Input() Propiedad! : Propiedad;
}

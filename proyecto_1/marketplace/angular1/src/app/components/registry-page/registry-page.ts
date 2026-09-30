import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CustomInput } from '../custom-input/custom-input';
@Component({
  imports: [CustomInput],
  selector: 'app-registry-page',
  styleUrl: './registry-page.css',
  templateUrl: './registry-page.html',
})
export class RegistryPage {
  title: String = "REGISTRO";
  subtitle: String = "Completa tu registro";

  // Información de contacto
  nombreCompleto: String = "";
  correo: String = "";

  // Residencia 1
  direccion1: String = "";
  telefono1: String = "";

  // Residencia 2
  direccion2: String = "";
  telefono2: String = "";

  // Método de pago
  numeroTarjeta: String = "";
  fechaExp: String = "";
  cvv: String = "";
  nombreTarjeta: String = "";
}

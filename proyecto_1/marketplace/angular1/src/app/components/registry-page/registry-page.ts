import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CustomInput } from '../custom-input/custom-input';
import { Button } from '../button/button';
import { UserPage } from '../user-page/user-page';
@Component({
  imports: [CustomInput, Button, UserPage],
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

  
  onRegister() {
    console.log('iniciar sesión');
    this.mostrarUser = true;
  }
  mostrarUser: boolean = false;
}

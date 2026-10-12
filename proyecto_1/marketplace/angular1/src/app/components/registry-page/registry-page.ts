import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CustomInput } from '../custom-input/custom-input';
import { Button } from '../button/button';
import { HomePage } from '../home-page/home-page';
import { Router } from '@angular/router'; //importar router para la navegación

@Component({
  imports: [CustomInput, Button],
  selector: 'app-registry-page',
  styleUrl: './registry-page.css',
  templateUrl: './registry-page.html',
})
export class RegistryPage {
  title: String = "REGISTRO";
  subtitle: String = "Completa tus datos";

  constructor(private router: Router) {}

  
  // bloque "reservas" (los 2 recuadros)
  reservaOpciones: string[] = ['TARJETA', 'PSE', 'BANCARIO', 'EFECTIVO'];
  tipoPagoSeleccionado: string | null = null;

  
  seleccionarReserva(opcion: string) {
    this.tipoPagoSeleccionado = opcion;
    this.mensajeError='';
  }

  //======bloque de registro======
  // información de contacto
  nombreCompleto: string = "";
  correo: String = "";

  // residencia 1
  ciudad: String = "";
  zipCode: String = "";

  // residencia 2
  departamento: String = "";
  telefono: String = "";
  //=============================

  //======bloque de tarjeta======
  numeroTarjeta: String = "";
  fechaExp: String = "";
  cvv: String = "";
  nombreTarjeta: String = "";
  //=========================
  
  //======bloque de pse======
  // información de banco
  nombreBanco: string = "";

  // datos personales
  nombreCliente: String = "";
  id: String="";

  // clave
  claveTemporal: String = "";
  //=========================

  // datos de cuenta
  numeroCuenta: String = "";

  //bloque de información bancaria ======
  mensajeError = '';

  private pagoValido(): boolean {
    switch (this.tipoPagoSeleccionado) {
      case 'TARJETA':  return !!(this.numeroTarjeta && this.fechaExp && this.cvv && this.nombreTarjeta);
      case 'PSE':      return !!(this.nombreBanco && this.nombreCliente && this.id && this.claveTemporal);
      case 'BANCARIO': return !!(this.nombreBanco && this.numeroCuenta);
      case 'EFECTIVO': return true;
      default:         return false;
    }
  }

  onConfirmar(): void {
    if (!this.nombreCompleto || !this.correo || !this.pagoValido()) {
      this.mensajeError = 'Completa tus datos y el método de pago.';
      return;
    }
    this.mensajeError='';
    this.router.navigate(['/home']);
  }
}
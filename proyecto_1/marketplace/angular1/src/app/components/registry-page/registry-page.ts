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
  subtitle: String = "Completa tus datos";
  mostrarUser: boolean = false;

  
  // bloque "reservas" (los 2 recuadros)
  reservaOpciones: string[] = ['Tarjeta', 'Pse', 'Bancario', 'Efectivo'];
  tipoPagoSeleccionado: string | null = null;

  
  seleccionarReserva(opcion: string) {
    this.tipoPagoSeleccionado = opcion;
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


  //======bloque de banco======
  // información de banco
  entidadBancaria: string = "";

  // datos de cuenta
  numeroCuenta: String = "";
  nombreCuenta: String="";

  // clave
  claveCajero: String = "";
  //======================

  
  //======bloque de efectivo======
  // información de banco
  cantidadEfectivo: string = "";
  //======================


  // laas 2 tarjetas (método de pago u otra selección)
  metodoPago: { seleccionado: boolean }[] = [
    { seleccionado: true },
    { seleccionado: false },
  ];

  seleccionarMetodo(index: number) {
    this.metodoPago.forEach((m, i) => m.seleccionado = (i === index));
  }

  onRegister() {
    if (!this.entidadBancaria || this.numeroCuenta){
      console.warn('Faltan datos obligatorios');
      return;
    }
    console.log('Datos enviados:', {
      nombreCompleto: this.nombreCompleto,
      correo: this.correo,
      ciudad: this.ciudad,
      zipCode: this.zipCode,
      departamento: this.departamento,
      telefono: this.telefono,
      reservaSeleccionada: this.tipoPagoSeleccionado,
      });

    this.mostrarUser = true;
  }

    onTarjeta() {
    if (!this.nombreBanco || this.nombreCliente){
      console.warn('Faltan datos obligatorios');
      return;
    }
    console.log('Tarjeta', {
      numeroTarjeta: this.numeroTarjeta,
      fechaExp: this.fechaExp,
      cvv: this.cvv,
      nombreTarjeta: this.nombreTarjeta,
    });

    this.mostrarUser = true;
  }

  
    onPse() {
    if (!this.nombreBanco || this.nombreCliente){
      console.warn('Faltan datos obligatorios');
      return;
    }
    console.log('Datos enviados:', {
      nombreBanco: this.nombreBanco,
      nombreCliente: this.nombreCliente,
      id: this.id,
      claveTemporal: this.claveTemporal,
    });

    this.mostrarUser = true;
  }

    onBancario() {
    if (!this.entidadBancaria){
      console.warn('Faltan datos obligatorios');
      return;
    }
    console.log('Datos enviados:', {
      numeroCuenta: this.numeroCuenta,
      nombreCuenta: this.nombreCuenta,
      claveCajero: this.claveCajero,
    });

    this.mostrarUser = true;
  }

  
    onEfectivo() {
    if (!this.cantidadEfectivo){
      console.warn('Faltan datos obligatorios');
      return;
    }
    console.log('Datos enviados:', {
      nombreCliente: this.nombreCliente,
      cantidadEfectivo: this.cantidadEfectivo,
    });

    this.mostrarUser = true;
  }

  onConfirmar() {
  switch (this.tipoPagoSeleccionado) {
    case 'Tarjeta':
      this.onTarjeta();
      break;
    case 'Pse':
      this.onPse();
      break;
    case 'Bancario':
      this.onBancario();
      break;
    case 'Efectivo':
      this.onEfectivo();
      break;
    default:
      console.warn('Selecciona un método de pago');
    return;
    }
    this.mostrarUser = true;
  }
}
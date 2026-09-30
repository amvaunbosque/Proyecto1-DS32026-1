import { Component } from '@angular/core';
import { Button } from '../button/button';
import { RegistryPage } from '../registry-page/registry-page';

@Component({
  imports: [Button, RegistryPage],
  selector: 'app-welcome-page',
  styleUrl: './welcome-page.css',
  templateUrl: './welcome-page.html',
})
export class WelcomePage {
  title: String = "BIENVENIDO";
  subtitle: String = "Encuentra tu próximo lugar, siéntete en casa";

  onLogin() {
    console.log('iniciar sesión');
  }

  onRegister() {
    console.log('registrarse');
    this.mostrarRegistro = true;
  }

  mostrarRegistro: boolean = false;
  }

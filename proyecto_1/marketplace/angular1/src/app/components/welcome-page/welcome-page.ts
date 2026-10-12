import { Component, inject } from '@angular/core'; // se importa inject
import { Router } from '@angular/router'; // se importa Router
import { Button } from '../button/button';
@Component({
  imports: [Button],
  selector: 'app-welcome-page',
  styleUrl: './welcome-page.css',
  templateUrl: './welcome-page.html',
})
export class WelcomePage {//declaración de objetos
  title: String = "BIENVENIDO";
  subtitle: String = "Encuentra tu próximo lugar, siéntete en casa";

  // inyección del Router
  private router = inject(Router);

  onLogin(): void {
    // navegación en lugar de console.log
    this.router.navigate(['/home']);
  }

  onRegister(): void {
    // navegación en lugar de console.log y cambio de bandera
    this.router.navigate(['/registry']);
  }
}
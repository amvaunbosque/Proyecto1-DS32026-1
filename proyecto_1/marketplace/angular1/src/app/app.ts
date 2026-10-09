import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { BottomNav } from './components/bottom-nav/bottom-nav';

@Component({
    imports: [RouterOutlet, BottomNav],
    selector: 'app-root',
    styleUrl: './app.css',
    templateUrl: './app.html',
})
export class App {
    private router = inject(Router);
    private urlActual = signal(this.router.url);

    constructor() {
    this.router.events
        .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
        .subscribe(e => this.urlActual.set(e.urlAfterRedirects));
    }

    mostrarBarra = computed(() => {
    const ocultarEn = ['/welcome', '/registry'];
    return !ocultarEn.some(ruta => this.urlActual().startsWith(ruta));
    });
}
import { Component } from '@angular/core';
import { WelcomePage } from './components/welcome-page/welcome-page';

@Component({
  imports: [WelcomePage],  
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  
}
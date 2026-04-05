import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './client/candidat/home/home';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ExchangeHub');
}

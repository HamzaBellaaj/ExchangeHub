import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './client/header/header';
import { Footer } from './client/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ExchangeHub');
}

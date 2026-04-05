import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

interface User {
  firstName: string;
  lastName: string;
  role: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  user: User = {
    firstName: 'Jean',
    lastName: 'Dupont',
    role: 'responsable'
  };

  showUserMenu = false;
  notifCount = 3;

  constructor(private router: Router) {}

  ngOnInit() {}

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  closeUserMenu() {
    this.showUserMenu = false;
  }

  logout() {
    this.showUserMenu = false;
    this.router.navigate(['/login']);
  }

  getRoleLabel(role: string): string {
    const labels: Record<string, string> = {
      responsable:   'Responsable',
      candidat:      'Candidat',
      coordinateur:  'Coordinateur',
      staff:         'Staff Admin',
      enseignant:    'Enseignant',
    };
    return labels[role] || role;
  }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})

export class App{

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  goRecords() {
    this.router.navigate(['/records']);
  }

  goAdd() {
    this.router.navigate(['/records/add']);
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  canAdd() {
    const role = this.auth.getRole();
    return role === 'clerk' || role === 'manager' || role === 'admin';
  }

  canView() {
    const role = this.auth.getRole();
    return role === 'clerk' || role === 'manager' || role === 'admin';
  }
}

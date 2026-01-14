import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = 'http://localhost:3000/api';

  currentUser = signal<User | null>(null);

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<User>(`${this.API_URL}/login`, { email, password });
  }

  logout() {
    this.currentUser.set(null);
  }

  isLoggedIn() {
    return this.currentUser() !== null;
  }

  getRole() {
    return this.currentUser()?.role ?? null;
  }
}

import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.scss',
})
export class LoginComponent {

  error = '';
  form;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
    const { email, password } = this.form.value;

    this.auth.login(email!, password!).subscribe({
      next: user => {
        this.auth.currentUser.set(user);
        this.router.navigate(['/records']);
      },
      error: () => this.error = 'Invalid email or password'
    });
  }
}

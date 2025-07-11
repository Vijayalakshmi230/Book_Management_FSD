import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.token);
        console.log('Login successful');
        this.router.navigate(['/dashboard']);  // ✅ go to dashboard after login
      },
      error: (err: any) => {
        console.error('Login failed', err);
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

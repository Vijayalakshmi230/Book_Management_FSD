import { Component } from '@angular/core';
import { AuthService } from '../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrls: ['./register.css'] // ✅ note: styleUrls (plural)
})
export class Register {
  name = '';
  email = '';
  password = ''

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
    };
    this.auth.register(data).subscribe({
      next: () => {
        console.log('Registration successful');
        this.router.navigate(['/login']); // ✅ redirect to login page
      },
      error: (err: any) => {
        console.error('Registration failed', err);
      }
    });
  }
}

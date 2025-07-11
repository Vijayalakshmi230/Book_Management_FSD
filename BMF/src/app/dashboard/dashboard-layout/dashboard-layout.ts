import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth'; // adjust the import path if needed

@Component({
  selector: 'app-dashboard-layout',
   standalone: false,
  templateUrl: './dashboard-layout.html',
  styleUrls: ['./dashboard-layout.css']
})
export class DashboardLayout {
  username: string = localStorage.getItem('userEmail') || 'Guest'; 
  // You can also fetch username from AuthService if you prefer

  constructor(private router: Router, private authService: AuthService) {}

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.authService.logout(this.username).subscribe({
      next: () => {
        localStorage.removeItem('token');       // Remove saved token
        localStorage.removeItem('userEmail');   // Remove saved email
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error('Logout failed', err);
        alert('Logout failed. Please try again.');
      }
    });
  }

  deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.authService.deleteAccount().subscribe({
        next: () => {
          localStorage.removeItem('token');     // Remove saved token
          localStorage.removeItem('userEmail'); // Remove saved email
          this.router.navigate(['/register']);  // Redirect to register page
        },
        error: err => {
          console.error('Delete account failed', err);
          alert('Delete account failed. Please try again.');
        }
      });
    }
  }

  changePassword() {
    const oldPassword = prompt('Enter your old password:');
    const newPassword = prompt('Enter your new password:');
    if (oldPassword && newPassword) {
      this.authService.changePassword(oldPassword, newPassword).subscribe({
        next: () => {
          alert('Password changed successfully');
        },
        error: err => {
          console.error('Change password failed', err);
          alert('Password change failed. Please try again.');
        }
      });
    }
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
   username = 'John Doe'; // Replace with real username from service
  searchId: number | null = null;

  constructor(private router: Router) {}

  navigateToAddBook() {
    this.router.navigate(['/dashboard/add-book']);
  }

  navigateToViewBooks() {
    this.router.navigate(['/dashboard/view-books']);
  }

  navigateToUpdateBook() {
    this.router.navigate(['/dashboard/update-book/:id']);
  }

  logout() {
    // Call /api/auth/logout
  }

  deleteAccount() {
    // Call /api/auth/delete
  }

  changePassword() {
    // Show form/modal to call /api/auth/change-password
  }

  deleteBookById() {
    if (this.searchId) {
      // Call /api/books/{id} DELETE
    }
  }

  searchBookById() {
    if (this.searchId) {
      // Call /api/books?searchId
    }
  }
}

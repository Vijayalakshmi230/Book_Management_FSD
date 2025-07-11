import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  logout(email: string): Observable<any> {
    // call backend logout
    return this.http.post(`${this.apiUrl}/logout?email=${email}`, {});
  }

  deleteAccount(): Observable<any> {
    return this.http.post(`${this.apiUrl}/delete`, {});
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/change-password?oldPassword=${oldPassword}&newPassword=${newPassword}`,
      {}
    );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}

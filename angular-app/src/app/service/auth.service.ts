import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(
    private http: HttpClient) { }

  registerUser(user: any) {
    return this.http.post('http://localhost:3000/users/register', user);
  }

  authenticateUser(user: any) {
    return this.http.post('http://localhost:3000/users/auth', user);
  }

  getCurrentUser() {
    return this.http.get('http://localhost:3000/users/profile');
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    console.log('loadToken');
    return localStorage.getItem('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}

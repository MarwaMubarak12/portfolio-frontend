import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:3000/api/auth/login';

  constructor(private http: HttpClient) { }

  login(user: any) {
    return this.http.post(this.url, user);
  }
}
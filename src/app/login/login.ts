import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  user = {
    email: 'admin@gmail.com',
    password: '123456admin'
  };

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    console.log('Trying to login now ... :', this.user);
    
    this.auth.login(this.user).subscribe(
      (res: any) => {
        console.log('success:', res);
        
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        console.log('error:', err);
      }
    );
  }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'budgedtify';

  constructor(private authservice: AuthService, private router: Router) {}

  get isLoggedIn() {
    return this.authservice.isLoggedIn();
  }

  logout() {
    this.authservice.logout();
    this.router.navigateByUrl('/login');
  }
}

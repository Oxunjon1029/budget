import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { SpinnerService } from './shared/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'budgedtify';
  isSpinnerVisible: boolean = false;
  constructor(
    private authservice: AuthService,
    private router: Router,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.spinnerService.getIsSpinnerVisible$().subscribe((value: boolean) => {
      this.isSpinnerVisible = value;
    });
  }
  get isLoggedIn(): boolean {
    return this.authservice.isLoggedIn();
  }

  logout() {
    this.authservice.logout();
    this.router.navigateByUrl('/login');
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isLoggedIn!: boolean;
  @Output() menuButtonClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() loggedOutClicked: EventEmitter<void> = new EventEmitter<void>();
  constructor(private authservice: AuthService) {}

  onClick(): boolean {
    this.loggedOutClicked.emit();
    return false;
  }
  logOut(): void {
    return this.authservice.logout();
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountFrontService } from 'src/app/account/account-front.service';
import { Accounts } from 'src/app/account/accounts.interface';
import { AuthService } from '../auth.service';
import { Users } from '../users.interface';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  constructor(
    private authservice: AuthService,
    private router: Router,
    private accountService: AccountFrontService
  ) {}
  hide: boolean = true;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  responsedata: Users[] = [];
  submitted = false;
  responseaccounts: Accounts[] = [];
  get isValidControllers() {
    return this.loginForm.controls;
  }
  onSubmit(): void {
    const { email, password } = this.loginForm.value;
    if (this.loginForm.valid) {
      this.authservice.login(email, password).subscribe(
        (data: Users[]) => {
          if (data != null) {
            this.responsedata = data;
            console.log('successfully login', this.responsedata);
            this.accountService.getAllAccounts().subscribe((data: Accounts[]) => {
              if (data !== null) {
                this.responseaccounts = data;
                data.forEach((item: any) => {
                  if (item.user_id === localStorage.getItem('userId')) {
                    this.router.navigateByUrl('/accountsMain');
                  } else {
                    this.router.navigateByUrl('/accounts');
                  }
                });
              }
            });
          }
        },
        (err) => {
          this.submitted = true;
          console.log(err);
        }
      );
    }
  }
}

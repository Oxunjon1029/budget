import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  constructor(private authservice: AuthService, private router: Router) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', Validators.required),
  });

  responsedata: any;
  submitted = false;

  get isValidControllers() {
    return this.loginForm.controls;
  }
  onSubmit() {
    const { email, password } = this.loginForm.value;
    if (this.loginForm.valid) {
      this.authservice.login(email, password).subscribe(
        (data) => {
          if (data != null) {
            this.responsedata = data;
            console.log('successfully login');
            this.router.navigateByUrl('/accounts');
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

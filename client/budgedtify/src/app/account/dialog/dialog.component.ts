import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AccountFrontService } from '../account-front.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private accountService: AccountFrontService,
    private router: Router,
    private authservice: AuthService
  ) {}
  currencies: any;

  ngOnInit():void {
    console.log(
      this.accountService.getCurrencies().subscribe((data) => {
        this.currencies = data;
      })
    );
    this.authservice.getUsers().subscribe((data) => {
      console.log(data);
    });
  }
  createAccountForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    currency: new FormControl('', Validators.required),
    description: new FormControl(''),
  });
  onNoClick(): void {
    this.dialogRef.close();
  }
  resdata: any;
  onCreateAccount():void {
    const { title, currency, description } = this.createAccountForm.value;
    if (this.createAccountForm.valid) {
      this.accountService.createAccount(title, currency, description).subscribe(
        (res) => {
          if (res !== null) {
            this.resdata = res;
            if (window.location.pathname === '/accountsMain') {
              window.location.reload();
            } else {
              this.router.navigateByUrl('/accountsMain');
            }
            console.log(res);

            this.dialogRef.close();
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}

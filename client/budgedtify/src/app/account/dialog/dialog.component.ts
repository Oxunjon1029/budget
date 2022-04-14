import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AccountFrontService } from '../account-front.service';
import { Accounts } from '../accounts.interface';

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
  ) {}
  currencies: any;
  controlSubject: Subject<boolean> = new Subject();
  ngOnInit(): void {
    console.log(
      this.accountService.getCurrencies().subscribe((data) => {
        this.currencies = data;
      })
    );
    
  }
  createAccountForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
      Validators.pattern('^[a-zA-Z,.!?\\s-]*$'),
    ]),
    currency: new FormControl('', Validators.required),
    description: new FormControl(''),
  });
  onNoClick(): void {
    this.dialogRef.close();
  }

  get isValidControllers() {
    return this.createAccountForm.controls;
  }
  resdata: Accounts[] = [];
  onCreateAccount(): void {
    const { title, currency, description } = this.createAccountForm.value;
    if (this.createAccountForm.valid) {
      this.accountService
        .createAccount(title, currency, description)
        .pipe(takeUntil(this.controlSubject))
        .subscribe(
          (res: Accounts[]) => {
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

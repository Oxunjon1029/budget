import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from 'express';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Users } from 'src/app/auth/users.interface';
import { AccountFrontService } from '../account-front.service';
import { Accounts } from '../accounts.interface';
import { Currencies } from '../currencies.interface';

@Component({
  selector: 'app-dialogedit',
  templateUrl: './dialogedit.component.html',
  styleUrls: ['./dialogedit.component.scss'],
})
export class DialogeditComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DialogeditComponent>,
    private accountService: AccountFrontService,
  ) {}
  currencies: Currencies[] = [];
  controlSubject: Subject<boolean> = new Subject();
  ngOnInit(): void {
    console.log(
      this.accountService.getCurrencies().subscribe((data: Currencies[]) => {
        this.currencies = data;
      })
    );
   
  }
  EditAccountForm: FormGroup = new FormGroup({
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
    return this.EditAccountForm.controls;
  }

  accounts: Accounts[] = [];
  
  editAccounts(id: string) {
    this.accountService.getAccountById(id).subscribe((data: Accounts[]) => {
      this.accounts = data;
    });
    const { title, currency, description } = this.EditAccountForm.value;
    this.accountService
      .editAccount(id, title, currency, description)
      .pipe(takeUntil(this.controlSubject))
      .subscribe((data: Accounts[]) => {
        console.log(data);
      });
  }
}

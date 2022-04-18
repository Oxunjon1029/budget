import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { AccountFrontService } from '../account-front.service';
import { Accounts } from '../accounts.interface';
import { Currencies } from '../currencies.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private accountService: AccountFrontService
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
      this.accountService.createAccount(title, currency, description);

      this.dialogRef.close();
    }
  }
}
